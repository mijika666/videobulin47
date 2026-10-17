import {
  AudioLines,
  CircleDollarSign,
  Clock3,
  ImageUp,
  LockKeyhole,
  Smartphone,
} from "lucide-react";

const features = [
  {
    icon: ImageUp,
    title: "One-image workflow",
    copy: "One clear portrait is enough. No prompt engineering and no shot list.",
  },
  {
    icon: AudioLines,
    title: "Recast, not re-shoot",
    copy: "The prepared template carries the original choreography, camera work and sound. Only the lead performer changes.",
  },
  {
    icon: Smartphone,
    title: "9:16 output",
    copy: "Vertical MP4 renders are prepared for short-form social feeds.",
  },
  {
    icon: Clock3,
    title: "Job tracking",
    copy: "See queued, processing, complete, and refunded jobs from your account.",
  },
  {
    icon: CircleDollarSign,
    title: "Clear credits",
    copy: "The cost appears before submission, and failed renders return the reservation.",
  },
  {
    icon: LockKeyhole,
    title: "Private buckets",
    copy: "Portraits and finished videos are stored in private Supabase buckets and served over signed links.",
  },
];

export function Features() {
  return (
    <section className="border-y border-line bg-[#ebe6dc] py-20 md:py-28">
      <div className="container-shell">
        <div className="max-w-3xl">
          <p className="eyebrow text-orange">Why this workflow</p>
          <h2 className="display mt-5 text-[clamp(2.5rem,5vw,4.5rem)]">
            Built for the clip, not a full editing suite.
          </h2>
        </div>
        <div className="mt-12 grid gap-px overflow-hidden rounded-lg border border-line bg-line md:grid-cols-2 lg:grid-cols-3">
          {features.map((feature) => (
            <div key={feature.title} className="bg-card p-7">
              <feature.icon className="size-6 text-orange" />
              <h3 className="mt-6 text-lg font-black">{feature.title}</h3>
              <p className="mt-3 text-sm leading-7 text-muted">
                {feature.copy}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
