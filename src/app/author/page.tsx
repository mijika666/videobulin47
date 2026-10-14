import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowRight,
  Code2,
  Globe,
  Layers,
  Sparkles,
} from "lucide-react";
import { absoluteUrl, jsonLd } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Qbit — Founder of VideoBulin47",
  description:
    "Qbit is a senior web developer and the founder of VideoReducer. He built VideoBulin47 end to end: the Next.js app, the Supabase data layer, the fal.ai model integration and the payment flow.",
  alternates: { canonical: absoluteUrl("/author") },
  openGraph: {
    title: "Qbit — Founder of VideoBulin47",
    description:
      "Senior web developer, founder of VideoReducer, and the person who built VideoBulin47 end to end.",
    url: absoluteUrl("/author"),
    type: "profile",
  },
};

const PERSON_ID = absoluteUrl("/author#qbit");

const stack = [
  {
    icon: Layers,
    title: "Web development, small to large",
    copy: "Single-page tools, content sites, and full products with accounts, payments and background job processing.",
  },
  {
    icon: Sparkles,
    title: "Applied AI features",
    copy: "Image, video and text models wired into real products, with the cost and failure paths handled properly.",
  },
  {
    icon: Globe,
    title: "Growth and SEO",
    copy: "Keyword research, technical SEO and content systems that turn a niche tool into steady organic traffic.",
  },
];

const personSchema = {
  "@context": "https://schema.org",
  "@type": "Person",
  "@id": PERSON_ID,
  name: "Qbit",
  url: absoluteUrl("/author"),
  jobTitle: "Founder and developer",
  description:
    "Senior web developer, founder of VideoReducer and builder of VideoBulin47.",
  knowsAbout: [
    "Web development",
    "Next.js",
    "Video compression",
    "AI video generation",
    "Search engine optimization",
  ],
  sameAs: [
    "https://www.videoreducer.com/",
    "https://github.com/mijika666",
  ],
  worksFor: {
    "@type": "Organization",
    name: "VideoBulin47",
    url: absoluteUrl("/"),
  },
};

export default function AuthorPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: jsonLd(personSchema) }}
      />

      <section className="section-dark py-20 md:py-28">
        <div className="container-shell">
          <div className="max-w-3xl">
            <p className="eyebrow text-acid">Who builds this</p>
            <h1 className="display mt-6 text-[clamp(3rem,8vw,6rem)] text-white">
              Qbit
            </h1>
            <p className="mt-6 text-lg leading-9 text-white/70">
              Founder of VideoReducer. Builder of VideoBulin47.
            </p>
            <div className="mt-8 flex flex-wrap gap-3 text-xs font-bold text-white/50">
              <a
                href="https://www.videoreducer.com/"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 rounded-full border border-white/15 px-4 py-2 transition hover:border-white/40 hover:text-white"
              >
                <Globe className="size-3.5" />
                videoreducer.com
              </a>
              <a
                href="https://github.com/mijika666"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 rounded-full border border-white/15 px-4 py-2 transition hover:border-white/40 hover:text-white"
              >
                <Code2 className="size-3.5" />
                github.com/mijika666
              </a>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 md:py-24">
        <div className="container-shell grid gap-12 lg:grid-cols-[minmax(0,760px)_1fr] lg:items-start">
          <article className="prose-custom">
            <p className="text-lg font-semibold leading-8 text-ink">
              I have worked in the internet industry for years, mostly on the
              engineering side. I have built websites of every size and shipped
              a long list of small tools and software along the way.
            </p>

            <section>
              <h2>The short version</h2>
              <p>
                My work runs from single-page utilities to content sites to full
                products with accounts, payments and background job processing.
                I like the small, sharp end of that range: a tool that does one
                job properly, for a specific audience, instead of another
                general-purpose app that tries to cover everything.
              </p>
              <p>
                I handle the whole build myself. That means product decisions,
                the front end, the database and storage layer, the third-party
                model integrations, and the checkout flow. When something
                breaks, I am also the person who fixes it.
              </p>
            </section>

            <section>
              <h2>What I run today: VideoReducer</h2>
              <p>
                I am the founder of{" "}
                <a
                  href="https://www.videoreducer.com/"
                  target="_blank"
                  rel="noreferrer"
                >
                  VideoReducer
                </a>
                , a free browser-based video compressor. It reduces video file
                size by up to 90% without uploading anything: the compression
                runs locally in your browser with GPU acceleration, so your
                files never leave your device. It supports 40+ input formats up
                to 4GB, with trimming and format conversion on top.
              </p>
              <p>
                Running a video tool taught me how much time people lose to file
                sizes, codecs and format mismatches. That experience shapes how
                VideoBulin47 handles uploads, output files and cleanup.
              </p>
            </section>

            <section>
              <h2>Why I built VideoBulin47</h2>
              <p>
                VideoReducer solves the video you already have. VideoBulin47
                solves the video you want to make: it turns one photo into a
                vertical clip for a specific trend, using a reference video to
                carry the motion, camera work and audio.
              </p>
              <p>
                I picked a single, well-defined format on purpose. A
                reference-video model can only be tuned well when the input is
                consistent, so one clear trend is easier to get right than a
                general-purpose editor. It also keeps the pricing honest: you
                see the exact credit reservation before a job is submitted, and
                a failed render returns the reservation automatically.
              </p>
            </section>

            <section>
              <h2>How I build</h2>
              <p>
                VideoBulin47 is a Next.js app on Vercel. Supabase handles
                authentication, Postgres and private storage buckets. Video
                generation runs on third-party reference-to-video models
                through fal.ai — MiniMax H3, Kling O3 Reference, Kling O3
                Reference Pro and Seedance 2.5. Waffo Pancake handles checkout
                and tax as the merchant of record.
              </p>
              <p>
                Uploads and generated videos stay in private buckets and are
                served through expiring signed URLs. Card details never reach my
                servers. Credits never expire, and failed generations refund
                themselves.
              </p>
            </section>

            <section>
              <h2>Get in touch</h2>
              <p>
                For product questions, billing, privacy requests or takedown
                notices, email support@videobulin47.net. For anything about
                VideoReducer, use the contact form on videoreducer.com.
              </p>
            </section>
          </article>

          <aside className="lg:sticky lg:top-24">
            <div className="panel p-6">
              <p className="text-sm font-black">What I work on</p>
              <div className="mt-5 grid gap-5">
                {stack.map((item) => (
                  <div key={item.title} className="flex gap-3">
                    <item.icon className="mt-0.5 size-4 shrink-0 text-orange" />
                    <div>
                      <p className="text-sm font-bold">{item.title}</p>
                      <p className="mt-1 text-xs leading-6 text-muted">
                        {item.copy}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="section-acid mt-4 rounded-lg p-6">
              <p className="text-xs font-black uppercase">Try the tool</p>
              <p className="mt-3 text-sm leading-6 text-ink/70">
                One portrait, one reference clip, one vertical video. The credit
                reservation is shown before you generate.
              </p>
              <Link href="/studio" className="btn btn-dark mt-5 w-full">
                Open the Studio
                <ArrowRight className="size-4" />
              </Link>
            </div>

            <div className="panel mt-4 p-5">
              <p className="text-sm font-black">Also on this site</p>
              <div className="mt-4 grid gap-2">
                <Link
                  href="/about"
                  className="flex items-center justify-between gap-3 rounded-lg border border-line px-3 py-3 text-xs font-bold transition hover:border-ink/30"
                >
                  About VideoBulin47
                  <ArrowRight className="size-3.5 text-orange" />
                </Link>
                <Link
                  href="/how-to-make-bulin-47-ai-video"
                  className="flex items-center justify-between gap-3 rounded-lg border border-line px-3 py-3 text-xs font-bold transition hover:border-ink/30"
                >
                  How to make a video bulin 47
                  <ArrowRight className="size-3.5 text-orange" />
                </Link>
                <Link
                  href="/contact"
                  className="flex items-center justify-between gap-3 rounded-lg border border-line px-3 py-3 text-xs font-bold transition hover:border-ink/30"
                >
                  Contact
                  <ArrowRight className="size-3.5 text-orange" />
                </Link>
              </div>
            </div>
          </aside>
        </div>
      </section>
    </>
  );
}
