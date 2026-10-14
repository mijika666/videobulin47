"use client";

import { useState } from "react";
import { ArrowRight, LoaderCircle, Mail, ShieldCheck } from "lucide-react";
import { createSupabaseBrowserClient } from "@/lib/supabase/client";

export function LoginForm({ nextPath = "/studio" }: { nextPath?: string }) {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState<"google" | "email" | null>(null);

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
      setMessage("Check your inbox for a secure sign-in link.");
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
        Use Google or an email magic link. No password to remember.
      </p>

      {!configured ? (
        <div className="mt-6 rounded-lg border border-orange/25 bg-orange/10 p-4 text-sm leading-6 text-orange">
          Preview mode: add Supabase environment variables to enable real
          authentication.
        </div>
      ) : null}

      <div className="mt-7 grid gap-3">
        <button
          type="button"
          onClick={signInWithGoogle}
          disabled={loading !== null}
          className="btn btn-dark w-full"
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

        <div className="flex items-center gap-3 py-2">
          <span className="h-px flex-1 bg-line" />
          <span className="text-xs font-bold uppercase text-muted">or</span>
          <span className="h-px flex-1 bg-line" />
        </div>

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
