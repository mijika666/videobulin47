create extension if not exists pgcrypto;

create table if not exists public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  email text,
  full_name text,
  avatar_url text,
  locale text not null default 'en',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.credit_wallets (
  user_id uuid primary key references auth.users(id) on delete cascade,
  balance integer not null default 0 check (balance >= 0),
  lifetime_purchased integer not null default 0 check (lifetime_purchased >= 0),
  updated_at timestamptz not null default now()
);

create table if not exists public.orders (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  provider text not null default 'waffo',
  provider_order_id text,
  provider_session_id text,
  pack_id text not null,
  credits integer not null check (credits > 0),
  amount_cents integer not null check (amount_cents > 0),
  currency text not null default 'USD',
  status text not null default 'pending'
    check (status in ('pending', 'completed', 'failed', 'refunded')),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique (provider, provider_order_id)
);

create table if not exists public.video_jobs (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  template_id text not null default 'bulin-47-main',
  input_path text not null,
  model_id text not null,
  fal_request_id text unique,
  status text not null default 'draft'
    check (status in ('draft', 'queued', 'processing', 'completed', 'failed', 'canceled')),
  duration integer not null check (duration between 3 and 30),
  resolution text not null,
  credits integer not null check (credits > 0),
  output_url text,
  output_path text,
  poster_url text,
  error_code text,
  error_message text,
  metadata jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now(),
  started_at timestamptz,
  completed_at timestamptz
);

create table if not exists public.credit_transactions (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  amount integer not null,
  type text not null check (type in ('purchase', 'reserve', 'refund', 'bonus', 'admin_adjustment')),
  status text not null default 'settled'
    check (status in ('pending', 'settled', 'reversed')),
  job_id uuid references public.video_jobs(id) on delete set null,
  order_id uuid references public.orders(id) on delete set null,
  idempotency_key text not null unique,
  description text,
  metadata jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now(),
  settled_at timestamptz
);

create table if not exists public.templates (
  id text primary key,
  name text not null,
  slug text not null unique,
  source_video_url text,
  source_audio_url text,
  poster_url text,
  active boolean not null default true,
  credits integer not null default 10,
  metadata jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.webhook_events (
  id uuid primary key default gen_random_uuid(),
  provider text not null,
  delivery_id text not null,
  event_id text,
  event_type text not null,
  payload jsonb not null,
  processed_at timestamptz,
  error text,
  created_at timestamptz not null default now(),
  unique (provider, delivery_id)
);

create index if not exists credit_transactions_user_created_idx
  on public.credit_transactions (user_id, created_at desc);

create index if not exists video_jobs_user_created_idx
  on public.video_jobs (user_id, created_at desc);

create index if not exists video_jobs_status_idx
  on public.video_jobs (status, created_at desc);

create index if not exists orders_user_created_idx
  on public.orders (user_id, created_at desc);

create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  insert into public.profiles (id, email, full_name, avatar_url)
  values (
    new.id,
    new.email,
    coalesce(new.raw_user_meta_data ->> 'full_name', new.raw_user_meta_data ->> 'name'),
    new.raw_user_meta_data ->> 'avatar_url'
  )
  on conflict (id) do nothing;

  insert into public.credit_wallets (user_id, balance)
  values (new.id, 0)
  on conflict (user_id) do nothing;

  return new;
end;
$$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function public.handle_new_user();

create or replace function public.add_credits(
  p_user_id uuid,
  p_amount integer,
  p_idempotency_key text,
  p_description text default 'Credit purchase',
  p_order_id uuid default null
)
returns integer
language plpgsql
security definer
set search_path = public
as $$
declare
  v_balance integer;
  v_inserted uuid;
begin
  if p_amount <= 0 then
    raise exception 'amount must be positive';
  end if;

  insert into public.credit_transactions (
    user_id, amount, type, status, order_id, idempotency_key, description, settled_at
  )
  values (
    p_user_id, p_amount, 'purchase', 'settled', p_order_id, p_idempotency_key, p_description, now()
  )
  on conflict (idempotency_key) do nothing
  returning id into v_inserted;

  if v_inserted is not null then
    update public.credit_wallets
      set balance = balance + p_amount,
          lifetime_purchased = lifetime_purchased + p_amount,
          updated_at = now()
      where user_id = p_user_id
      returning balance into v_balance;
  else
    select balance into v_balance
      from public.credit_wallets
      where user_id = p_user_id;
  end if;

  return coalesce(v_balance, 0);
end;
$$;

create or replace function public.reserve_credits(
  p_user_id uuid,
  p_amount integer,
  p_job_id uuid,
  p_idempotency_key text
)
returns integer
language plpgsql
security definer
set search_path = public
as $$
declare
  v_balance integer;
begin
  if p_amount <= 0 then
    raise exception 'amount must be positive';
  end if;

  select balance into v_balance
    from public.credit_wallets
    where user_id = p_user_id;

  if exists (
    select 1 from public.credit_transactions
    where idempotency_key = p_idempotency_key
  ) then
    return coalesce(v_balance, 0);
  end if;

  update public.credit_wallets
    set balance = balance - p_amount,
        updated_at = now()
    where user_id = p_user_id and balance >= p_amount
    returning balance into v_balance;

  if v_balance is null then
    return -1;
  end if;

  insert into public.credit_transactions (
    user_id, amount, type, status, job_id, idempotency_key, description
  )
  values (
    p_user_id, -p_amount, 'reserve', 'pending', p_job_id, p_idempotency_key, 'Video generation reserved'
  )
  on conflict (idempotency_key) do nothing;

  return v_balance;
end;
$$;

create or replace function public.refund_credits(
  p_user_id uuid,
  p_amount integer,
  p_job_id uuid,
  p_idempotency_key text
)
returns integer
language plpgsql
security definer
set search_path = public
as $$
declare
  v_balance integer;
  v_inserted uuid;
begin
  if p_amount <= 0 then
    raise exception 'amount must be positive';
  end if;

  insert into public.credit_transactions (
    user_id, amount, type, status, job_id, idempotency_key, description, settled_at
  )
  values (
    p_user_id, p_amount, 'refund', 'settled', p_job_id, p_idempotency_key, 'Failed generation refunded', now()
  )
  on conflict (idempotency_key) do nothing
  returning id into v_inserted;

  if v_inserted is not null then
    update public.credit_wallets
      set balance = balance + p_amount,
          updated_at = now()
      where user_id = p_user_id
      returning balance into v_balance;

    update public.credit_transactions
      set status = 'reversed', settled_at = now()
      where job_id = p_job_id and type = 'reserve' and status = 'pending';
  else
    select balance into v_balance
      from public.credit_wallets
      where user_id = p_user_id;
  end if;

  return coalesce(v_balance, 0);
end;
$$;

create or replace function public.settle_credits(p_job_id uuid)
returns void
language plpgsql
security definer
set search_path = public
as $$
begin
  update public.credit_transactions
    set status = 'settled', settled_at = now()
    where job_id = p_job_id and type = 'reserve' and status = 'pending';
end;
$$;

alter table public.profiles enable row level security;
alter table public.credit_wallets enable row level security;
alter table public.orders enable row level security;
alter table public.video_jobs enable row level security;
alter table public.credit_transactions enable row level security;
alter table public.templates enable row level security;
alter table public.webhook_events enable row level security;

drop policy if exists "profiles_select_own" on public.profiles;
create policy "profiles_select_own"
  on public.profiles for select
  using (auth.uid() = id);

drop policy if exists "profiles_update_own" on public.profiles;
create policy "profiles_update_own"
  on public.profiles for update
  using (auth.uid() = id)
  with check (auth.uid() = id);

drop policy if exists "wallets_select_own" on public.credit_wallets;
create policy "wallets_select_own"
  on public.credit_wallets for select
  using (auth.uid() = user_id);

drop policy if exists "orders_select_own" on public.orders;
create policy "orders_select_own"
  on public.orders for select
  using (auth.uid() = user_id);

drop policy if exists "jobs_select_own" on public.video_jobs;
create policy "jobs_select_own"
  on public.video_jobs for select
  using (auth.uid() = user_id);

drop policy if exists "transactions_select_own" on public.credit_transactions;
create policy "transactions_select_own"
  on public.credit_transactions for select
  using (auth.uid() = user_id);

drop policy if exists "templates_select_active" on public.templates;
create policy "templates_select_active"
  on public.templates for select
  using (active = true);

insert into public.templates (
  id, name, slug, source_video_url, source_audio_url, credits, metadata
)
values (
  'bulin-47-main',
  'Bulin 47 Main Freestyle',
  'bulin-47-main',
  null,
  null,
  10,
  '{"orientation":"9:16","default_duration":15}'::jsonb
)
on conflict (id) do nothing;

insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values
  ('uploads', 'uploads', false, 10485760, array['image/jpeg', 'image/png', 'image/webp']),
  ('renders', 'renders', false, 104857600, array['video/mp4'])
on conflict (id) do nothing;
