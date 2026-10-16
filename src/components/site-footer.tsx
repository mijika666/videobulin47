import Link from "next/link";
import { Logo } from "@/components/logo";
import { contentPages, legalPages } from "@/content/pages";
import { KEYWORD_MAP } from "@/config/keywords";

const footerGuideSlugs = [
  "bulin-47-viral-video",
  "bulin-47-ai-video",
  "bulin-47-template",
  "bulin-47-freestyle-lyrics",
  "kevin-wai-bulin-47",
  "quien-es-bulin-47",
  "dame-hombro",
  "how-to-add-bulin-47-sound",
  "higgsfield-bulin-47-ai",
  "bulin-47-ai-vs-dreamina",
  "bulin-47-ai-vs-capcut",
  "bulin-47-ai-vs-kling",
];

export function SiteFooter() {
  return (
    <footer className="section-dark mt-20">
      <div className="container-shell grid gap-12 py-14 lg:grid-cols-[1.2fr_2fr]">
        <div>
          <Logo dark />
          <p className="mt-5 max-w-sm text-sm leading-6 text-white/60">
            One image. One vertical AI video. Turn your own photo, a pet, an
            animal, or a virtual character into a clip for TikTok, Instagram
            Reels, and YouTube Shorts.
          </p>
          <p className="mt-6 max-w-md text-xs leading-5 text-white/40">
            VideoBulin47 is an independent fan-made tool. Not affiliated with,
            endorsed by, or sponsored by Bulin 47, Kevin Wai, their labels, or
            TikTok. All names and trademarks belong to their respective owners.
          </p>
        </div>
        <div className="grid gap-8 sm:grid-cols-3">
          <div>
            <p className="text-xs font-black uppercase text-white/40">Product</p>
            <div className="mt-4 grid gap-3 text-sm text-white/70">
              <Link className="hover:text-white" href="/studio">
                Studio
              </Link>
              <Link className="hover:text-white" href="/pricing">
                Pricing
              </Link>
              <Link className="hover:text-white" href="/bulin-47-ai-video">
                Bulin 47 AI video
              </Link>
              <Link className="hover:text-white" href="/bulin-47-template">
                Template
              </Link>
            </div>
          </div>
          <div>
            <p className="text-xs font-black uppercase text-white/40">Guides</p>
            <div className="mt-4 grid gap-3 text-sm text-white/70">
              {footerGuideSlugs.map((slug) => {
                const page = contentPages[slug];
                if (!page) return null;
                return (
                <Link
                  key={slug}
                  className="hover:text-white"
                  href={`/${slug}`}
                >
                  {KEYWORD_MAP[slug]?.primary ?? page.title}
                </Link>
                );
              })}
            </div>
          </div>
          <div>
            <p className="text-xs font-black uppercase text-white/40">Legal</p>
            <div className="mt-4 grid gap-3 text-sm text-white/70">
              {legalPages.map((page) => (
                <Link
                  key={page.slug}
                  className="hover:text-white"
                  href={`/${page.slug}`}
                >
                  {page.title}
                </Link>
              ))}
              <Link className="hover:text-white" href="/about">
                {contentPages.about.title}
              </Link>
            </div>
          </div>
        </div>
      </div>
      <div className="border-t border-white/10">
        <div className="container-shell flex flex-col gap-2 py-5 text-xs text-white/40 sm:flex-row sm:items-center sm:justify-between">
          <p>© 2026 VideoBulin47. All rights reserved.</p>
          <p className="flex items-center gap-3">
            <Link className="hover:text-white" href="/author">
              About Qbit
            </Link>
            <span aria-hidden="true">·</span>
            <span>support@videobulin47.net</span>
          </p>
        </div>
      </div>
    </footer>
  );
}
