"use client";

import Link from "next/link";
import { ExternalLink, Play, VolumeX } from "lucide-react";
import { SHOWCASE_VIDEOS } from "@/config/showcase";

export function VideoShowcase() {
  return (
    <section className="section-dark overflow-hidden py-20 md:py-28">
      <div className="container-shell">
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="eyebrow text-acid">Video examples</p>
            <h2 className="display mt-5 max-w-3xl text-[clamp(2.6rem,5vw,4.8rem)] text-white">
              One image in. A full freestyle out.
            </h2>
          </div>
          <p className="max-w-sm text-sm leading-7 text-white/45">
            Preview the vertical format before you generate. Replace these
            project samples with your newest renders whenever you want.
          </p>
        </div>

        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {SHOWCASE_VIDEOS.map((video, index) => (
            <article
              key={video.id}
              className={
                index === 1
                  ? "rounded-lg border border-white/15 bg-white/[0.04] p-4 md:-translate-y-4"
                  : "rounded-lg border border-white/10 bg-white/[0.03] p-4"
              }
            >
              <div className="relative overflow-hidden rounded-lg bg-black">
                <video
                  src={video.src}
                  poster={video.poster}
                  autoPlay
                  muted
                  loop
                  playsInline
                  preload="auto"
                  className="aspect-[9/14] w-full object-cover"
                  aria-label={video.label}
                />
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/75 via-transparent to-black/20" />
                <span className="absolute left-3 top-3 inline-flex items-center gap-2 rounded-full bg-black/55 px-3 py-1.5 text-[10px] font-black uppercase text-white backdrop-blur">
                  <Play className="size-3 fill-acid text-acid" />
                  Sample render
                </span>
                <span className="absolute right-3 top-3 grid size-9 place-items-center rounded-full bg-black/55 text-white backdrop-blur">
                  <VolumeX className="size-4" />
                </span>
                <div className="absolute inset-x-0 bottom-0 p-5">
                  <p className="text-[10px] font-black uppercase text-acid">
                    {video.label}
                  </p>
                  <p className="mt-2 text-lg font-black leading-tight text-white">
                    {video.note}
                  </p>
                </div>
              </div>
              <div className="flex items-center justify-between gap-3 px-1 pb-1 pt-4">
                <span className="text-[10px] font-bold text-white/35">
                  {video.licensedForProduction
                    ? "Project sample"
                    : "Replace before production"}
                </span>
                <Link
                  href={video.sourceUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-1.5 text-[10px] font-bold text-white/45 transition hover:text-acid"
                >
                  {video.sourceLabel}
                  <ExternalLink className="size-3" />
                </Link>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
