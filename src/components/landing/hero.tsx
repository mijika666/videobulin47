import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  Check,
  Clock3,
  LockKeyhole,
  Play,
  Sparkles,
  WandSparkles,
} from "lucide-react";

const heroImage = "/showcase/hero.jpg";

export function Hero() {
  return (
    <section className="section-dark relative overflow-hidden">
      <div className="container-shell grid min-h-[680px] items-center gap-14 py-14 lg:min-h-[760px] lg:grid-cols-[1.05fr_0.95fr] lg:py-20">
        <div className="relative z-10">
          <p className="eyebrow text-acid">
            AI character replacement
          </p>
          <h1 className="display mt-6 max-w-3xl text-[clamp(3rem,6.2vw,5.8rem)] text-white">
            Turn one portrait{" "}
            <span className="block text-acid">into the freestyle video.</span>
          </h1>
          <p className="mt-6 max-w-xl text-base leading-8 text-white/65 md:text-lg">
            Upload a portrait of one adult you have permission to use. We place
            that person into the prepared Bulin 47 freestyle template — the
            choreography, camera work and audio stay — and return a vertical
            9:16 MP4.
          </p>
          <p className="mt-4 max-w-xl text-sm leading-6 text-white/45">
            Independent fan-made tool. Not affiliated with or endorsed by Bulin
            47.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Link href="/studio" className="btn btn-primary">
              <Sparkles className="size-4" />
              Create my video
            </Link>
            <Link
              href="/how-to-make-bulin-47-ai-video"
              className="btn btn-white"
            >
              See how it works
              <ArrowRight className="size-4" />
            </Link>
          </div>
          <div className="mt-9 flex flex-wrap gap-x-6 gap-y-3 text-xs font-bold text-white/55">
            {[
              "One portrait",
              "Vertical 9:16",
              "Consensual use only",
              "Failure refunds",
            ].map((item) => (
              <span key={item} className="inline-flex items-center gap-2">
                <Check className="size-3.5 text-acid" />
                {item}
              </span>
            ))}
          </div>
        </div>

        <div className="relative flex justify-center lg:justify-end">
          <div className="absolute -left-8 top-8 hidden w-44 rounded-lg border border-white/10 bg-white/5 p-4 backdrop-blur md:block">
            <p className="text-[10px] font-black uppercase text-white/40">
              Input
            </p>
            <p className="mt-2 text-sm font-bold text-white">
              1 portrait
            </p>
            <p className="mt-1 text-xs leading-5 text-white/45">
              One adult, with permission.
            </p>
          </div>
          <div className="phone-frame">
            <Image
              src={heroImage}
              alt="AI-generated preview of a recast Bulin 47 freestyle video"
              fill
              priority
              sizes="(max-width: 768px) 260px, 310px"
              className="object-cover"
            />
            <div className="absolute inset-0 bg-black/15" />
            <div className="absolute left-4 right-4 top-8 flex items-center justify-between">
              <span className="rounded-full bg-acid px-3 py-1.5 text-[10px] font-black uppercase text-white">
                Trend preview
              </span>
              <span className="inline-flex items-center gap-1.5 rounded-full bg-black/55 px-3 py-1.5 text-[10px] font-bold text-white backdrop-blur">
                <Clock3 className="size-3" />
                9:16 vertical
              </span>
            </div>
            <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black via-black/70 to-transparent px-5 pb-6 pt-24">
              <div className="flex items-end justify-between gap-4">
                <div>
                  <p className="text-[10px] font-black uppercase text-acid">
                    AI generated preview
                  </p>
                  <p className="mt-1 text-xl font-black leading-tight text-white">
                    Your character.
                    <br />
                    Brought to life.
                  </p>
                </div>
                <span className="grid size-12 shrink-0 place-items-center rounded-full bg-white text-[#0a0506]">
                  <Play className="size-5 fill-current" />
                </span>
              </div>
              <div className="mt-5 flex h-12 items-center gap-1.5">
                {[
                  18, 30, 46, 26, 54, 38, 20, 44, 34, 58, 28, 42, 24, 50,
                  32, 22, 46, 36, 56, 30,
                ].map((height, index) => (
                  <span
                    key={`${height}-${index}`}
                    className="wave-bar"
                    style={{
                      height,
                      animationDelay: `${(index % 5) * 90}ms`,
                    }}
                  />
                ))}
              </div>
            </div>
            <div className="absolute right-4 top-1/3 rounded-lg bg-white p-2.5 text-[#0a0506] shadow-xl">
              <WandSparkles className="size-5 text-orange" />
            </div>
          </div>
          <div className="absolute -right-4 top-24 hidden w-44 rotate-2 rounded-lg bg-acid p-4 text-white shadow-2xl md:block">
            <p className="text-[10px] font-black uppercase">Output</p>
            <p className="mt-2 text-sm font-black">
              9:16 MP4
            </p>
            <p className="mt-1 text-xs leading-5">
              Ready for the group chat.
            </p>
          </div>
        </div>
      </div>
      <div className="border-y border-white/10 bg-white/[0.03]">
        <div className="overflow-hidden py-4">
          <div className="marquee-track">
            {[0, 1].map((set) => (
              <div key={set} className="flex shrink-0">
                {[
                  "ONE PORTRAIT",
                  "PREPARED TEMPLATE",
                  "AI CHARACTER RECAST",
                  "VERTICAL 9:16",
                  "NO EDITING",
                  "AI VIDEO",
                  "TIKTOK READY",
                  "PRIVATE RENDER",
                ].map((item) => (
                  <span
                    key={`${set}-${item}`}
                    className="mx-5 inline-flex items-center gap-5 text-xs font-black text-white/40"
                  >
                    {item}
                    <span className="size-1.5 rounded-full bg-acid" />
                  </span>
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export function HeroFloatingNote() {
  return (
    <div className="fixed bottom-5 left-1/2 z-30 hidden -translate-x-1/2 items-center gap-3 rounded-full border border-line-strong bg-panel px-4 py-3 text-xs font-bold text-white shadow-2xl lg:flex">
      <LockKeyhole className="size-4 text-acid" />
      Uploads are stored in a private bucket.
    </div>
  );
}
