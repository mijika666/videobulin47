"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { Menu, Sparkles, UserRound, X } from "lucide-react";
import { Logo } from "@/components/logo";
import { createSupabaseBrowserClient } from "@/lib/supabase/client";
import { cn } from "@/lib/utils";

const links = [
  { href: "/#how-it-works", label: "How it works" },
  { href: "/pricing", label: "Pricing" },
  { href: "/how-to-make-bulin-47-ai-video", label: "Guides" },
  { href: "/faq", label: "FAQ" },
];

export function SiteHeader() {
  const [open, setOpen] = useState(false);
  const [email, setEmail] = useState<string | null>(null);
  // 没配置 Supabase 时永远不可能有登录态，直接把 authReady 初始化成 true。
  // 这样 effect 里就不需要同步 setState（会触发级联渲染）。
  const [authReady, setAuthReady] = useState(
    () =>
      !(
        process.env.NEXT_PUBLIC_SUPABASE_URL &&
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
      ),
  );

  // Header stays a client component so the shared layout keeps rendering
  // statically for every SEO page. Auth state is resolved after hydration.
  useEffect(() => {
    const supabase = createSupabaseBrowserClient();
    if (!supabase) return;

    let active = true;
    supabase.auth
      .getUser()
      .then((result: { data: { user: { email?: string | null } | null } }) => {
        if (!active) return;
        setEmail(result.data.user?.email ?? null);
        setAuthReady(true);
      });

    const { data: listener } = supabase.auth.onAuthStateChange(
      (
        _event: string,
        session: { user: { email?: string | null } | null } | null,
      ) => {
        setEmail(session?.user?.email ?? null);
      },
    );

    return () => {
      active = false;
      listener.subscription.unsubscribe();
    };
  }, []);

  const signedIn = authReady && email !== null;

  return (
    <header className="sticky top-0 z-40 border-b border-line bg-paper/90 backdrop-blur-xl">
      <div className="container-shell flex h-16 items-center justify-between">
        <Logo />
        <nav className="hidden items-center gap-7 md:flex">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm font-semibold text-muted transition-colors hover:text-ink"
            >
              {link.label}
            </Link>
          ))}
        </nav>
        <div className="hidden items-center gap-3 md:flex">
          {signedIn ? (
            <Link
              href="/account"
              className="inline-flex items-center gap-2 text-sm font-bold text-ink"
            >
              <span className="grid size-8 place-items-center rounded-full border border-line bg-panel">
                <UserRound className="size-4" />
              </span>
              Account
            </Link>
          ) : (
            <Link href="/login" className="text-sm font-bold text-ink">
              Sign in
            </Link>
          )}
          <Link href="/studio" className="btn btn-primary">
            <Sparkles className="size-4" />
            Create video
          </Link>
        </div>
        <button
          type="button"
          aria-label="Open menu"
          className="grid size-10 place-items-center rounded-lg border border-line md:hidden"
          onClick={() => setOpen((value) => !value)}
        >
          {open ? <X className="size-5" /> : <Menu className="size-5" />}
        </button>
      </div>
      <div
        className={cn(
          "border-t border-line bg-paper px-4 pb-4 md:hidden",
          open ? "block" : "hidden",
        )}
      >
        <nav className="container-shell grid gap-1 pt-3">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setOpen(false)}
              className="rounded-lg px-3 py-3 text-sm font-bold hover:bg-white/5"
            >
              {link.label}
            </Link>
          ))}
          <Link
            href="/studio"
            onClick={() => setOpen(false)}
            className="btn btn-dark mt-2"
          >
            <Sparkles className="size-4" />
            Create video
          </Link>
          {signedIn ? (
            <Link
              href="/account"
              onClick={() => setOpen(false)}
              className="btn btn-outline"
            >
              <UserRound className="size-4" />
              Account
            </Link>
          ) : (
            <Link
              href="/login"
              onClick={() => setOpen(false)}
              className="btn btn-outline"
            >
              Sign in
            </Link>
          )}
        </nav>
      </div>
    </header>
  );
}
