"use client";

import { useState } from "react";
import {
  ArrowRight,
  ChevronDown,
  LoaderCircle,
  Mail,
  ShieldCheck,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { createSupabaseBrowserClient } from "@/lib/supabase/client";

export function LoginForm({ nextPath = "/studio" }: { nextPath?: string }) {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState<"google" | "email" | null>(null);
  // Google 是主路径；邮箱魔法链接收在折叠区里，避免用户点到收不到邮件的入口。
  const [showEmail, setShowEmail] = useState(false);

  const configured = Boolean(
    process.env.NEXT_PUBLIC_SUPABASE_URL &&
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
  );

  function buildCallbackUrl() {
    return `${window.location.origin}/auth/callback?next=${encodeURIComponent(
      nextPath,
    )}`;
  }

  async function signInWithGoogle() {
    setError("");
    setMessage("");
    const supabase = createSupabaseBrowserClient();
    if (!supabase) {
      setError("Supabase is not configured yet.");
      return;
    }
    setLoading("google");
    const { error: authError } = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: buildCallbackUrl(),
      },
    });
    if (authError) {
      setError(authError.message);
      setLoading(null);
    }
  }

  async function signInWithEmail(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");
    setMessage("");
    const supabase = createSupabaseBrowserClient();
    if (!supabase) {
      setError("Supabase is not configured yet.");
      return;
    }
    setLoading("email");
    const { error: authError } = await supabase.auth.signInWithOtp({
      email,
      options: {
        emailRedirectTo: buildCallbackUrl(),
      },
    });
    if (authError) {
      setError(authError.message);
    } else {
      setMessage(
        "Check your inbox for the sign-in link. It can take a minute to arrive - if it does not show up, look in your spam folder.",
      );
      setEmail("");
    }
    setLoading(null);
  }

  return (
    <div className="w-full">
      <p className="text-xs font-black uppercase text-orange">Sign in</p>
      <h2 className="mt-4 text-3xl font-black leading-tight">
        Continue to the Studio.
      </h2>
      <p className="mt-3 text-sm leading-6 text-muted">
        One tap with Google. No password to remember.
      </p>

      {!configured ? (
        <div className="mt-6 rounded-lg border border-orange/25 bg-orange/10 p-4 text-sm leading-6 text-orange">
          Preview mode: add Supabase environment variables to enable real
          authentication.
        </div>
      ) : null}

      <div className="mt-7 grid gap-4">
        <button
          type="button"
          onClick={signInWithGoogle}
          disabled={loading !== null}
          className="btn btn-dark h-14 w-full text-base"
        >
          {loading === "google" ? (
            <LoaderCircle className="size-4 animate-spin" />
          ) : (
            <span className="grid size-5 place-items-center rounded bg-white text-xs font-black text-ink">
              G
            </span>
          )}
          Continue with Google
        </button>

        <button
          type="button"
          onClick={() => setShowEmail((value) => !value)}
          aria-expanded={showEmail}
          className="inline-flex items-center justify-center gap-2 text-xs font-bold text-muted transition hover:text-ink"
        >
          <Mail className="size-3.5" />
          {showEmail ? "Hide email sign-in" : "Sign in with email instead"}
          <ChevronDown
            className={cn(
              "size-3.5 transition-transform",
              showEmail && "rotate-180",
            )}
          />
        </button>

        {showEmail ? (
          <form onSubmit={signInWithEmail} className="grid gap-3">
            <label className="grid gap-2">
              <span className="text-sm font-bold">Email address</span>
              <span className="relative">
                <Mail className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted" />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                  placeholder="you@example.com"
                  className="h-12 w-full rounded-lg border border-line bg-white pl-10 pr-4 text-sm outline-none transition focus:border-ink"
                />
              </span>
            </label>
            <button
              type="submit"
              disabled={loading !== null}
              className="btn btn-outline w-full"
            >
              {loading === "email" ? (
                <LoaderCircle className="size-4 animate-spin" />
              ) : (
                <ArrowRight className="size-4" />
              )}
              Email me a sign-in link
            </button>
          </form>
        ) : null}
      </div>

      {message ? (
        <p className="mt-5 rounded-lg bg-acid/30 p-4 text-sm font-bold">
          {message}
        </p>
      ) : null}
      {error ? (
        <p className="mt-5 rounded-lg bg-orange/10 p-4 text-sm font-bold text-orange">
          {error}
        </p>
      ) : null}

      <div className="mt-8 flex gap-3 border-t border-line pt-6 text-xs leading-5 text-muted">
        <ShieldCheck className="mt-0.5 size-4 shrink-0 text-orange" />
        <p>
          We only use email to authenticate your account, send operational
          notices, and connect payment records. Do not upload minors, public
          figures, or people without consent.
        </p>
      </div>
    </div>
  );
}
