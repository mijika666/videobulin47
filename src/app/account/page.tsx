import type { Metadata } from "next";
import Link from "next/link";
import { redirect } from "next/navigation";
import {
  ArrowRight,
  Coins,
  Download,
  Receipt,
  Sparkles,
  Wallet as WalletIcon,
} from "lucide-react";
import { BuyCreditsButton } from "@/components/buy-credits-button";
import { SignOutButton } from "@/components/sign-out-button";
import {
  getCurrentWallet,
  getRecentJobs,
  getRecentOrders,
  getRecentTransactions,
} from "@/lib/credits";
import { CREDIT_PACKS } from "@/lib/constants";
import { isSupabaseConfigured } from "@/lib/env";
import { getCurrentUser } from "@/lib/supabase/server";
import type { VideoJob, VideoJobStatus } from "@/lib/types";
import { absoluteUrl } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Your account",
  description:
    "Manage your VideoBulin47 credits, purchases, and generated videos.",
  alternates: { canonical: absoluteUrl("/account") },
  robots: { index: false, follow: false },
};

export const dynamic = "force-dynamic";

const dateFormatter = new Intl.DateTimeFormat("en-US", {
  month: "short",
  day: "numeric",
  year: "numeric",
});

function formatDate(value: string | null | undefined) {
  if (!value) return "—";
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return "—";
  return dateFormatter.format(date);
}

function formatMoney(cents: number, currency = "USD") {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: currency || "USD",
  }).format(cents / 100);
}

function statusLabel(status?: VideoJobStatus | string) {
  if (status === "queued") return "Queued";
  if (status === "processing") return "Generating";
  if (status === "completed") return "Complete";
  if (status === "failed") return "Needs attention";
  if (status === "canceled") return "Canceled";
  return "Draft";
}

function statusTone(status?: string) {
  if (status === "completed") return "bg-acid text-ink";
  if (status === "failed") return "bg-orange text-white";
  if (status === "queued" || status === "processing") {
    return "bg-sky text-ink";
  }
  if (status === "refunded") return "bg-black/10 text-muted";
  return "bg-black/5 text-muted";
}

function packName(packId: string) {
  return CREDIT_PACKS.find((pack) => pack.id === packId)?.name ?? packId;
}

export default async function AccountPage() {
  const user = await getCurrentUser();
  if (isSupabaseConfigured && !user) {
    redirect("/login?next=/account");
  }

  const wallet = user ? await getCurrentWallet(user.id) : null;
  const jobs = user ? await getRecentJobs(user.id, 24) : ([] as VideoJob[]);
  const orders = user ? await getRecentOrders(user.id) : [];
  const transactions = user ? await getRecentTransactions(user.id) : [];

  const balance = wallet?.balance ?? 0;
  const lifetime = wallet?.lifetime_purchased ?? 0;
  const completedJobs = jobs.filter((job) => job.status === "completed");

  return (
    <section className="py-10 md:py-14">
      <div className="container-shell">
        <div className="flex flex-col gap-6 border-b border-line pb-8 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="eyebrow text-orange">Personal center</p>
            <h1 className="display mt-5 text-[clamp(2.5rem,6vw,4.5rem)]">
              Your account.
            </h1>
            <p className="mt-4 max-w-2xl text-sm leading-7 text-muted">
              {user?.email ?? "Preview mode"}
              {user?.created_at
                ? ` · Member since ${formatDate(user.created_at)}`
                : ""}
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-3">
            <Link href="/studio" className="btn btn-dark">
              <Sparkles className="size-4" />
              Create video
            </Link>
            <SignOutButton />
          </div>
        </div>

        {!isSupabaseConfigured ? (
          <div className="mt-6 rounded-lg border border-orange/25 bg-orange/10 p-4 text-sm text-orange">
            Preview mode. Add Supabase environment variables to enable real
            accounts, credits, and purchase history.
          </div>
        ) : null}

        <div className="mt-8 grid gap-5 sm:grid-cols-3">
          <div className="section-dark rounded-lg p-6">
            <p className="flex items-center gap-2 text-[10px] font-black uppercase text-white/40">
              <WalletIcon className="size-3.5" />
              Credit balance
            </p>
            <p className="mt-3 text-4xl font-black text-white">{balance}</p>
            <p className="mt-1 text-xs text-white/45">credits available</p>
          </div>
          <div className="panel p-6">
            <p className="flex items-center gap-2 text-[10px] font-black uppercase text-muted">
              <Coins className="size-3.5" />
              Lifetime purchased
            </p>
            <p className="mt-3 text-4xl font-black">{lifetime}</p>
            <p className="mt-1 text-xs text-muted">credits bought to date</p>
          </div>
          <div className="panel p-6">
            <p className="flex items-center gap-2 text-[10px] font-black uppercase text-muted">
              <Sparkles className="size-3.5" />
              Videos completed
            </p>
            <p className="mt-3 text-4xl font-black">{completedJobs.length}</p>
            <p className="mt-1 text-xs text-muted">ready to download</p>
          </div>
        </div>

        <div className="mt-10">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-black">Buy more credits</h2>
            <Link
              href="/pricing"
              className="text-xs font-bold text-muted hover:text-ink"
            >
              Full pricing
            </Link>
          </div>
          <div className="mt-4 grid gap-4 md:grid-cols-3">
            {CREDIT_PACKS.map((pack) => (
              <div key={pack.id} className="panel flex flex-col p-5">
                <div className="flex items-center justify-between">
                  <p className="text-sm font-black">{pack.name}</p>
                  {pack.badge ? (
                    <span className="rounded-full bg-acid px-2 py-1 text-[10px] font-black uppercase">
                      {pack.badge}
                    </span>
                  ) : null}
                </div>
                <p className="mt-3 text-2xl font-black">{pack.priceLabel}</p>
                <p className="mt-1 text-xs text-muted">
                  {pack.credits} credits · {pack.description}
                </p>
                <div className="mt-4">
                  <BuyCreditsButton packId={pack.id} label={`Buy ${pack.name}`} />
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-10 grid gap-6 lg:grid-cols-2">
          <div className="panel p-6">
            <div className="flex items-center justify-between">
              <h2 className="flex items-center gap-2 text-lg font-black">
                <Sparkles className="size-4 text-orange" />
                Render history
              </h2>
              <Link
                href="/studio"
                className="text-xs font-bold text-muted hover:text-ink"
              >
                New render
              </Link>
            </div>
            <div className="mt-4 grid gap-3">
              {jobs.length ? (
                jobs.map((job) => (
                  <div
                    key={job.id}
                    className="flex items-center justify-between gap-3 rounded-lg border border-line p-3"
                  >
                    <div>
                      <p className="text-sm font-black">
                        {job.duration}s · {job.resolution}
                      </p>
                      <p className="mt-1 text-[10px] font-bold uppercase text-muted">
                        {formatDate(job.created_at)} · {job.credits} credits
                      </p>
                    </div>
                    <div className="flex items-center gap-2">
                      <span
                        className={`rounded-full px-2.5 py-1 text-[10px] font-black uppercase ${statusTone(
                          job.status,
                        )}`}
                      >
                        {statusLabel(job.status)}
                      </span>
                      {job.output_url ? (
                        <a
                          href={job.output_url}
                          target="_blank"
                          rel="noreferrer"
                          className="grid size-8 place-items-center rounded-full border border-line transition hover:border-ink"
                          aria-label="Open rendered video"
                        >
                          <Download className="size-3.5" />
                        </a>
                      ) : null}
                    </div>
                  </div>
                ))
              ) : (
                <p className="rounded-lg border border-dashed border-line p-4 text-xs leading-5 text-muted">
                  No renders yet. Your completed videos will appear here.
                </p>
              )}
            </div>
          </div>

          <div className="panel p-6">
            <h2 className="flex items-center gap-2 text-lg font-black">
              <Receipt className="size-4 text-orange" />
              Orders
            </h2>
            <div className="mt-4 grid gap-3">
              {orders.length ? (
                orders.map((order) => (
                  <div
                    key={order.id}
                    className="flex items-center justify-between gap-3 rounded-lg border border-line p-3"
                  >
                    <div>
                      <p className="text-sm font-black">
                        {packName(order.pack_id)} · {order.credits} credits
                      </p>
                      <p className="mt-1 text-[10px] font-bold uppercase text-muted">
                        {formatDate(order.created_at)}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-black">
                        {formatMoney(order.amount_cents, order.currency)}
                      </p>
                      <span
                        className={`mt-1 inline-block rounded-full px-2.5 py-1 text-[10px] font-black uppercase ${statusTone(
                          order.status,
                        )}`}
                      >
                        {order.status}
                      </span>
                    </div>
                  </div>
                ))
              ) : (
                <p className="rounded-lg border border-dashed border-line p-4 text-xs leading-5 text-muted">
                  No orders yet. Buy a credit pack to start generating.
                </p>
              )}
            </div>
          </div>
        </div>

        <div className="panel mt-6 p-6">
          <h2 className="text-lg font-black">Credit activity</h2>
          <div className="mt-4 grid gap-2">
            {transactions.length ? (
              transactions.map((tx) => (
                <div
                  key={tx.id}
                  className="flex items-center justify-between gap-3 border-b border-line py-3 last:border-b-0"
                >
                  <div>
                    <p className="text-sm font-bold">
                      {tx.description ?? tx.type}
                    </p>
                    <p className="mt-1 text-[10px] font-bold uppercase text-muted">
                      {formatDate(tx.created_at)} · {tx.type}
                    </p>
                  </div>
                  <p
                    className={`text-sm font-black ${
                      tx.amount >= 0 ? "text-ink" : "text-orange"
                    }`}
                  >
                    {tx.amount >= 0 ? "+" : ""}
                    {tx.amount}
                  </p>
                </div>
              ))
            ) : (
              <p className="rounded-lg border border-dashed border-line p-4 text-xs leading-5 text-muted">
                Credit purchases and reservations will be listed here.
              </p>
            )}
          </div>
        </div>

        <div className="mt-8 flex flex-wrap items-center gap-3 text-xs font-bold text-muted">
          <Link href="/studio" className="inline-flex items-center gap-1 hover:text-ink">
            Go to Studio
            <ArrowRight className="size-3.5" />
          </Link>
          <span>·</span>
          <Link href="/pricing" className="inline-flex items-center gap-1 hover:text-ink">
            Pricing
            <ArrowRight className="size-3.5" />
          </Link>
        </div>
      </div>
    </section>
  );
}
