import Image from "next/image";
import { Play, Sparkles } from "lucide-react";

const examples = [
  {
    image: "/subjects/virtual-character.svg",
    label: "Virtual character",
  },
  {
    image: "/subjects/pet.svg",
    label: "Pet",
  },
  {
    image: "/subjects/animal.svg",
    label: "Animal",
  },
];

export function Gallery() {
  return (
    <section className="py-20 md:py-28">
      <div className="container-shell">
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="eyebrow text-orange">Output preview</p>
            <h2 className="display mt-5 max-w-2xl text-[clamp(2.5rem,5vw,4.5rem)]">
              One format. Any subject.
            </h2>
          </div>
          <p className="max-w-sm text-sm leading-7 text-muted">
            Concept previews show how a single image becomes a full-frame
            social clip. Real renders appear in your private account.
          </p>
        </div>
        <div className="mt-12 grid gap-5 md:grid-cols-3">
          {examples.map((example, index) => (
            <article
              key={example.label}
              className={
                index === 1
                  ? "panel bg-ink p-4 text-white md:-translate-y-5"
                  : "panel p-4"
              }
            >
              <div className="relative aspect-[9/13] overflow-hidden rounded-lg">
                <Image
                  src={example.image}
                  alt={`${example.label} concept preview for a Bulin 47 AI video`}
                  fill
                  unoptimized
                  sizes="(max-width: 768px) 100vw, 360px"
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-black/20" />
                <div className="absolute left-3 top-3 rounded-full bg-white/90 px-3 py-1.5 text-[10px] font-black uppercase text-ink">
                  Concept preview
                </div>
                <span className="absolute bottom-4 right-4 grid size-12 place-items-center rounded-full bg-acid text-ink">
                  <Play className="size-5 fill-current" />
                </span>
              </div>
              <div className="flex items-center justify-between gap-4 px-1 pb-1 pt-4">
                <div>
                  <p className="text-sm font-black">{example.label}</p>
                  <p
                    className={
                      index === 1
                        ? "mt-1 text-xs text-white/45"
                        : "mt-1 text-xs text-muted"
                    }
                  >
                    15 seconds · 9:16
                  </p>
                </div>
                <Sparkles className="size-5 text-orange" />
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
