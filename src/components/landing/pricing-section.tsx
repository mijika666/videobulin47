import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { PricingCards } from "@/components/pricing-cards";

export function PricingSection() {
  return (
    <section id="pricing" className="section-dark py-20 md:py-28">
      <div className="container-shell">
        <div className="flex flex-col gap-7 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="eyebrow text-acid">Simple credit packs</p>
            <h2 className="display mt-5 max-w-3xl text-[clamp(2.5rem,5vw,4.5rem)] text-white">
              Buy once. Use when the idea is ready.
            </h2>
          </div>
          <div className="max-w-sm">
            <p className="text-sm leading-7 text-white/55">
              Credits do not expire. A failed render returns the reservation
              automatically. Start small, then choose a larger pack when the
              image works.
            </p>
            <Link
              href="/pricing"
              className="mt-5 inline-flex items-center gap-2 text-sm font-black text-acid"
            >
              Full pricing details
              <ArrowRight className="size-4" />
            </Link>
          </div>
        </div>
        <div className="mt-12">
          <PricingCards />
        </div>
      </div>
    </section>
  );
}
