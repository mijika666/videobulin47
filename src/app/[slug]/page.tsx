import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  ArrowRight,
  CircleAlert,
  Clock3,
  FileText,
  ShieldCheck,
  UserRound,
} from "lucide-react";
import { FaqAccordion } from "@/components/faq-accordion";
import { contentPages, type ContentPage } from "@/content/pages";
import { KEYWORD_MAP } from "@/config/keywords";
import { absoluteUrl } from "@/lib/utils";

type PageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return Object.keys(contentPages).map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const page = contentPages[slug];
  if (!page) return {};
  const keywordTarget = KEYWORD_MAP[page.slug];
  return {
    title: page.title,
    description: page.description,
    keywords: keywordTarget
      ? [keywordTarget.primary, ...keywordTarget.secondary]
      : undefined,
    alternates: { canonical: absoluteUrl(`/${page.slug}`) },
    openGraph: {
      title: page.title,
      description: page.description,
      url: absoluteUrl(`/${page.slug}`),
      locale: page.lang === "es" ? "es_ES" : "en_US",
      type: "article",
    },
  };
}

function GuideSchema({ page }: { page: ContentPage }) {
  const data = {
    "@context": "https://schema.org",
    "@type": page.kind === "legal" ? "WebPage" : "Article",
    headline: page.title,
    description: page.description,
    url: absoluteUrl(`/${page.slug}`),
    dateModified: page.updated ?? "2026-10-13",
    inLanguage: page.lang ?? "en",
    author: {
      "@type": "Person",
      name: "Qbit",
      url: absoluteUrl("/author"),
    },
    publisher: {
      "@type": "Organization",
      name: "VideoBulin47",
      url: absoluteUrl("/"),
    },
  };
  const faqData =
    page.faqs && page.faqs.length
      ? {
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: page.faqs.map((faq) => ({
            "@type": "Question",
            name: faq.question,
            acceptedAnswer: {
              "@type": "Answer",
              text: faq.answer,
            },
          })),
        }
      : null;
  const breadcrumbData = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: absoluteUrl("/"),
      },
      {
        "@type": "ListItem",
        position: 2,
        name: page.kind === "legal" ? "Legal" : "Guides",
        item: absoluteUrl(page.kind === "legal" ? "/terms" : "/bulin-47-ai-video"),
      },
      {
        "@type": "ListItem",
        position: 3,
        name: page.title,
        item: absoluteUrl(`/${page.slug}`),
      },
    ],
  };
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
      />
      {faqData ? (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqData) }}
        />
      ) : null}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbData) }}
      />
    </>
  );
}

function relatedHref(slug: string) {
  return slug === "pricing" ? "/pricing" : `/${slug}`;
}

function relatedLabel(slug: string) {
  if (slug === "pricing") return "Bulin 47 AI price";
  const target = KEYWORD_MAP[slug];
  if (target) return target.primary;
  return contentPages[slug]?.title ?? slug;
}

export default async function ContentPageRoute({ params }: PageProps) {
  const { slug } = await params;
  const page = contentPages[slug];
  if (!page) notFound();

  const isLegal = page.kind === "legal";
  const faqs = page.faqs ?? [];
  const keywordTarget = KEYWORD_MAP[page.slug];
  const relatedSlugs = keywordTarget?.relatedSlugs ?? [];

  return (
    <>
      <GuideSchema page={page} />
      <section className="section-dark py-20 md:py-28">
        <div className="container-shell">
          <div className="max-w-4xl">
            <nav
              aria-label="Breadcrumb"
              className="mb-7 flex flex-wrap items-center gap-2 text-xs font-bold text-white/40"
            >
              <Link className="hover:text-white" href="/">
                Home
              </Link>
              <span>/</span>
              <span>{isLegal ? "Legal" : "Guides"}</span>
              <span>/</span>
              <span className="text-white/70">{page.title}</span>
            </nav>
            <p className="eyebrow text-acid">{page.eyebrow}</p>
            <h1 className="display mt-6 text-[clamp(2.8rem,7vw,5.8rem)] text-white">
              {page.title}
            </h1>
            <p className="mt-6 max-w-2xl text-base leading-8 text-white/60">
              {page.description}
            </p>
            <div className="mt-8 flex flex-wrap gap-4 text-xs font-bold text-white/45">
              <span className="inline-flex items-center gap-2">
                <Clock3 className="size-4 text-acid" />
                Last updated {page.updated ?? "October 14, 2026"}
              </span>
              {!isLegal ? (
                <Link
                  href="/author"
                  className="inline-flex items-center gap-2 transition hover:text-white"
                >
                  <UserRound className="size-4 text-acid" />
                  By Qbit
                </Link>
              ) : null}
              <span className="inline-flex items-center gap-2">
                {isLegal ? (
                  <ShieldCheck className="size-4 text-acid" />
                ) : (
                  <FileText className="size-4 text-acid" />
                )}
                {isLegal ? "Policy page" : "Practical guide"}
              </span>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 md:py-24">
        <div className="container-shell grid gap-12 lg:grid-cols-[minmax(0,760px)_1fr] lg:items-start">
          <article className="prose-custom">
            <p className="text-lg font-semibold leading-8 text-ink">
              {page.intro}
            </p>
            {page.sections.map((section) => (
              <section key={section.heading}>
                <h2>{section.heading}</h2>
                {section.paragraphs?.map((paragraph) => (
                  <p key={paragraph}>{paragraph}</p>
                ))}
                {section.bullets ? (
                  <ul>
                    {section.bullets.map((bullet) => (
                      <li key={bullet}>{bullet}</li>
                    ))}
                  </ul>
                ) : null}
              </section>
            ))}
          </article>

          <aside className="lg:sticky lg:top-24">
            {page.cta ? (
              <div className="section-acid rounded-lg p-7">
                <p className="text-xs font-black uppercase">Try the workflow</p>
                <h2 className="mt-4 text-2xl font-black leading-tight">
                  Turn one photo into a vertical freestyle video.
                </h2>
                <p className="mt-3 text-sm leading-6 text-ink/65">
                  Start with a short preview, then choose a longer render when
                  the photo and likeness look right.
                </p>
                <Link href="/studio" className="btn btn-dark mt-6 w-full">
                  Open the Studio
                  <ArrowRight className="size-4" />
                </Link>
              </div>
            ) : null}
            {faqs.length ? (
              <div className="mt-4">
                <FaqAccordion items={faqs} />
              </div>
            ) : null}
            {relatedSlugs.length ? (
              <div className="panel mt-4 p-5">
                <p className="text-sm font-black">
                  {page.lang === "es" ? "Búsquedas relacionadas" : "Related searches"}
                </p>
                <div className="mt-4 grid gap-2">
                  {relatedSlugs.map((slug) => (
                    <Link
                      key={slug}
                      href={relatedHref(slug)}
                      className="flex items-center justify-between gap-3 rounded-lg border border-line px-3 py-3 text-xs font-bold transition hover:border-ink/30"
                    >
                      <span>{relatedLabel(slug)}</span>
                      <ArrowRight className="size-3.5 shrink-0 text-orange" />
                    </Link>
                  ))}
                </div>
              </div>
            ) : null}
            <div className="panel mt-4 p-5">
              <p className="flex items-center gap-2 text-sm font-black">
                <CircleAlert className="size-4 text-orange" />
                Safety reminder
              </p>
              <p className="mt-3 text-xs leading-6 text-muted">
                Only upload a photo of yourself or a consenting adult. Do not
                use minors, celebrities, public figures, or non-consenting
                people.
              </p>
            </div>
          </aside>
        </div>
      </section>
    </>
  );
}
