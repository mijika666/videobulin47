import Image from "next/image";
import {
  Download,
  ImagePlus,
  Sparkles,
} from "lucide-react";

const steps = [
  {
    icon: ImagePlus,
    number: "01",
    title: "Upload one portrait",
    copy: "Choose a clear, well-lit photo of one consenting adult. Face and upper body visible works best.",
  },
  {
    icon: Sparkles,
    number: "02",
    title: "Generate the switch",
    copy: "Pick the length and quality. The model follows the reference motion and keeps the original rhythm.",
  },
  {
    icon: Download,
    number: "03",
    title: "Download and post",
    copy: "Get a vertical MP4 from your account, then post it to TikTok, Reels, or Shorts.",
  },
];

export function HowItWorks() {
  return (
    <section id="how-it-works" className="py-20 md:py-28">
      <div className="container-shell">
        <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:items-end">
          <div>
            <p className="eyebrow text-orange">How it works</p>
            <h2 className="display mt-5 text-[clamp(2.5rem,5vw,4.5rem)]">
              A trend video in three steps.
            </h2>
          </div>
          <p className="max-w-2xl text-base leading-8 text-muted lg:ml-auto">
            No timeline, no choreography, no camera work. The reference template
            handles the performance. Your photo handles the identity.
          </p>
        </div>

        <div className="mt-12 grid gap-4 lg:grid-cols-3">
          {steps.map((step, index) => (
            <div
              key={step.number}
              className="panel relative overflow-hidden p-6 md:p-8"
            >
              {index === 0 ? (
                <Image
                  src="https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=900&q=85"
                  alt="Illustrative portrait upload for a Bulin 47 AI video"
                  width={700}
                  height={430}
                  className="mb-6 h-56 w-full rounded-lg object-cover"
                />
              ) : (
                <div className="mb-6 grid h-56 place-items-center rounded-lg bg-ink">
                  <div className="grid size-20 place-items-center rounded-full border border-white/15 bg-white/5 text-acid">
                    <step.icon className="size-8" />
                  </div>
                </div>
              )}
              <div className="flex items-center justify-between gap-4">
                <p className="text-xs font-black text-orange">{step.number}</p>
                <step.icon className="size-5 text-muted" />
              </div>
              <h3 className="mt-4 text-xl font-black">{step.title}</h3>
              <p className="mt-3 text-sm leading-7 text-muted">{step.copy}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
