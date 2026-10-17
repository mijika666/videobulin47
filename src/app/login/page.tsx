import type { Metadata } from "next";
import Image from "next/image";
import { redirect } from "next/navigation";
import { LoginForm } from "@/components/login-form";
import { getCurrentUser } from "@/lib/supabase/server";
import { absoluteUrl, safeInternalPath } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Sign In",
  description:
    "Sign in to VideoBulin47 with Google or an email magic link to create and manage Bulin 47 AI videos.",
  alternates: { canonical: absoluteUrl("/login") },
};

export default async function LoginPage({
  searchParams,
}: {
  searchParams: Promise<{ next?: string; error?: string }>;
}) {
  const params = await searchParams;
  const next = safeInternalPath(params.next, "/studio");
  const user = await getCurrentUser();
  if (user) {
    redirect(next);
  }

  return (
    <section className="py-14 md:py-20">
      <div className="container-shell grid gap-8 lg:grid-cols-[1fr_0.85fr]">
        <div className="section-dark relative min-h-[560px] overflow-hidden rounded-lg px-7 py-12 md:px-12">
          <div className="relative z-10 max-w-xl">
            <p className="eyebrow text-acid">Your account</p>
            <h1 className="display mt-6 text-[clamp(3rem,7vw,5.8rem)] text-white">
              Keep every render in one place.
            </h1>
            <p className="mt-6 max-w-lg text-base leading-8 text-white/60">
              Sign in to buy credits, create jobs, track progress, and download
              completed MP4 files. Your uploads stay in a private bucket.
            </p>
          </div>
          <div className="absolute -bottom-20 -right-24 hidden w-[460px] rotate-[-8deg] md:block">
            <div className="phone-frame ml-auto">
              <Image
                src="/subjects/virtual-character.svg"
                alt="Account preview: a portrait recast into a vertical video"
                fill
                unoptimized
                sizes="310px"
                className="object-cover"
              />
              <div className="absolute inset-0 bg-black/20" />
            </div>
          </div>
        </div>
        <div className="panel flex items-center p-6 md:p-10">
          <LoginForm nextPath={next} />
        </div>
      </div>
    </section>
  );
}
