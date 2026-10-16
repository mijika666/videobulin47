import Link from "next/link";
import { ArrowRight, Sparkles } from "lucide-react";

export function FinalCta() {
  return (
    <section className="pb-20 md:pb-28">
      <div className="container-shell">
        <div className="section-acid relative overflow-hidden rounded-lg px-6 py-12 md:px-12 md:py-16">
          <div className="absolute -right-10 -top-20 text-[220px] font-black leading-none text-ink/5 md:text-[320px]">
            47
          </div>
          <div className="relative grid gap-9 lg:grid-cols-[1fr_auto] lg:items-end">
            <div>
              <p className="eyebrow">Ready when your image is</p>
              <h2 className="display mt-5 max-w-3xl text-[clamp(2.6rem,5vw,5rem)]">
                Make the version they send to the group chat.
              </h2>
            </div>
            <Link href="/studio" className="btn btn-dark">
              <Sparkles className="size-4" />
              Open the Studio
              <ArrowRight className="size-4" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
