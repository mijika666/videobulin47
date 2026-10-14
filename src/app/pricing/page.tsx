import type { Metadata } from "next";
import { CircleDollarSign, ShieldCheck, Sparkles } from "lucide-react";
import { FaqAccordion } from "@/components/faq-accordion";
import { PricingCards } from "@/components/pricing-cards";
import { contentPages } from "@/content/pages";
import { KEYWORD_MAP } from "@/config/keywords";
import { MODELS } from "@/lib/constants";
import { absoluteUrl } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Bulin 47 AI Video Pricing",
  description:
    "Bulin 47 AI video pricing: buy one-time credit packs from $9.99. Failed generations are refunded and unused credits never expire.",
  keywords: [
    KEYWORD_MAP.pricing.primary,
    ...KEYWORD_MAP.pricing.secondary,
  ],
  alternates: { canonical: absoluteUrl("/pricing") },
};

export default function PricingPage() {
  const faqs = contentPages.faq.faqs ?? [];
  return (
    <>
      <section className="section-dark py-20 md:py-28">
        <div className="container-shell">
          <div className="max-w-3xl">
            <p className="eyebrow text-acid">Credits without a subscription</p>
            <h1 className="display mt-6 text-[clamp(3rem,7vw,6rem)] text-white">
              Simple pricing for one clear result.
            </h1>
            <p className="mt-6 max-w-2xl text-base leading-8 text-white/60">
              Credit packs are one-time purchases. The Studio shows the exact
              reservation before submission, and a failed render returns the
              credits automatically.
            </p>
          </div>
          <div className="mt-14">
            <PricingCards />
          </div>
          <div className="mt-12 grid gap-4 md:grid-cols-3">
            {[
              {
                label: "Single video",
                market: "$9.90 to $9.99",
                note: "Competitor reference for one 15 to 19 second clip.",
              },
              {
                label: "Three videos",
                market: "$19.90 to $24.99",
                note: "Creator pack range for a small group or a weekend of posts.",
              },
              {
                label: "Five to ten videos",
                market: "$29.90 to $69.99",
                note: "Studio range for pages, creators, and repeated renders.",
              },
            ].map((item) => (
              <div
                key={item.label}
                className="rounded-lg border border-white/10 bg-white/[0.04] p-5"
              >
                <p className="text-xs font-black uppercase text-white/40">
                  {item.label}
                </p>
                <p className="mt-3 text-2xl font-black text-white">
                  {item.market}
                </p>
                <p className="mt-2 text-xs leading-5 text-white/50">
                  {item.note}
                </p>
              </div>
            ))}
          </div>
          <p className="mt-6 text-xs text-white/40">
            Machine-readable pricing for AI agents and procurement tools:{" "}
            <a className="underline hover:text-white" href="/pricing.md">
              /pricing.md
            </a>
          </p>
        </div>
      </section>

      <section className="border-b border-line py-16">
        <div className="container-shell">
          <p className="eyebrow text-orange">Models you can choose</p>
          <h2 className="display mt-5 text-[clamp(2rem,4.5vw,3.4rem)]">
            Powered by named AI models.
          </h2>
          <p className="mt-5 max-w-3xl text-sm leading-7 text-muted">
            Video generation runs on third-party models served through the
            fal.ai inference platform. MiniMax H3, Kling O3 Reference and Kling
            O3 Reference Pro drive the motion from your reference clip.
            Seedance 1.0 Lite uses your photo as a reference image only. You
            pick the model in the Studio before you generate, and every job
            records which model was used.
          </p>
          <div className="mt-8 grid gap-4 md:grid-cols-3">
            {MODELS.map((model) => (
              <div key={model.id} className="panel p-5">
                <p className="text-sm font-black">{model.name}</p>
                <p className="mt-1 text-[11px] font-bold uppercase text-muted">
                  {model.quality}
                </p>
                <p className="mt-3 break-all text-[11px] leading-5 text-muted">
                  {model.endpoint}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 md:py-28">
        <div className="container-shell grid gap-10 lg:grid-cols-[0.8fr_1.2fr]">
          <div>
            <p className="eyebrow text-orange">How credits work</p>
            <h2 className="display mt-5 text-[clamp(2.5rem,5vw,4.5rem)]">
              One wallet. One ledger.
            </h2>
            <div className="mt-8 grid gap-4">
              {[
                {
                  icon: CircleDollarSign,
                  title: "Buy a pack",
                  copy: "Waffo handles checkout, tax, and payment processing.",
                },
                {
                  icon: Sparkles,
                  title: "Reserve on generate",
                  copy: "Credits are held when the video job is submitted.",
                },
                {
                  icon: ShieldCheck,
                  title: "Settle or refund",
                  copy: "A completed render settles. A failure returns the credits.",
                },
              ].map((item) => (
                <div key={item.title} className="panel flex gap-4 p-5">
                  <item.icon className="mt-0.5 size-5 shrink-0 text-orange" />
                  <div>
                    <p className="font-black">{item.title}</p>
                    <p className="mt-1 text-sm leading-6 text-muted">
                      {item.copy}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div>
            <FaqAccordion items={faqs} />
          </div>
        </div>
      </section>
    </>
  );
}
