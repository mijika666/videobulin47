import { FaqAccordion } from "@/components/faq-accordion";
import { contentPages } from "@/content/pages";

export function FaqSection() {
  const faqs = contentPages.faq.faqs ?? [];
  return (
    <section className="py-20 md:py-28">
      <div className="container-shell grid gap-12 lg:grid-cols-[0.8fr_1.2fr]">
        <div>
          <p className="eyebrow text-orange">Questions</p>
          <h2 className="display mt-5 text-[clamp(2.5rem,5vw,4.5rem)]">
            Before you upload.
          </h2>
          <p className="mt-5 max-w-sm text-sm leading-7 text-muted">
            The main rules are simple: one image that is yours, one clear
            subject, and a clear AI label when you post.
          </p>
        </div>
        <FaqAccordion items={faqs} />
      </div>
    </section>
  );
}
