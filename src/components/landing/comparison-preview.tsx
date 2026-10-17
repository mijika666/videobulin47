import Link from "next/link";
import { ArrowRight, Check, Minus } from "lucide-react";

const rows = [
  {
    name: "VideoBulin47",
    highlight: true,
    setup: "One image",
    editing: "No editing",
    trendTemplate: "Bulin 47 reference",
    price: "From $9.99",
    href: "/bulin-47-ai-video",
  },
  {
    name: "General AI video tool",
    setup: "Prompt + settings",
    editing: "Some editing",
    trendTemplate: "Bring your own motion",
    price: "Varies by model",
    href: "/higgsfield-bulin-47-ai",
  },
  {
    name: "CapCut-style editor",
    setup: "Footage required",
    editing: "Manual edit",
    trendTemplate: "No template",
    price: "Free + your time",
    href: "/bulin-47-ai-vs-capcut",
  },
];

export function ComparisonPreview() {
  return (
    <section className="py-20 md:py-28">
      <div className="container-shell">
        <div className="grid gap-8 lg:grid-cols-[0.75fr_1.25fr] lg:items-end">
          <div>
            <p className="eyebrow text-orange">Compare the workflow</p>
            <h2 className="display mt-5 text-[clamp(2.5rem,5vw,4.5rem)]">
              Built for the trend, not for a blank timeline.
            </h2>
          </div>
          <p className="max-w-xl text-sm leading-7 text-muted lg:ml-auto">
            General AI tools are flexible. Editors are powerful. VideoBulin47
            removes the setup and keeps the one thing the trend needs: a
            recognizable reference performance.
          </p>
        </div>

        <div className="mt-10 overflow-hidden rounded-lg border border-line bg-card">
          <div className="hidden grid-cols-[1.2fr_1fr_1fr_1.2fr_0.8fr] border-b border-line bg-white/[0.03] px-5 py-4 text-[10px] font-black uppercase text-muted md:grid">
            <span>Workflow</span>
            <span>Setup</span>
            <span>Editing</span>
            <span>Trend template</span>
            <span>Price</span>
          </div>
          {rows.map((row) => (
            <Link
              key={row.name}
              href={row.href}
              className={
                row.highlight
                  ? "grid gap-4 border-b border-acid/40 bg-panel px-5 py-5 text-white last:border-b-0 md:grid-cols-[1.2fr_1fr_1fr_1.2fr_0.8fr] md:items-center"
                  : "grid gap-4 border-b border-line px-5 py-5 transition last:border-b-0 hover:bg-white/[0.03] md:grid-cols-[1.2fr_1fr_1fr_1.2fr_0.8fr] md:items-center"
              }
            >
              <span className="flex items-center gap-3 text-sm font-black">
                {row.highlight ? (
                  <Check className="size-4 text-acid" />
                ) : (
                  <Minus className="size-4 text-muted" />
                )}
                {row.name}
              </span>
              <span className="text-sm text-muted md:text-inherit">
                {row.setup}
              </span>
              <span className="text-sm text-muted md:text-inherit">
                {row.editing}
              </span>
              <span className="text-sm text-muted md:text-inherit">
                {row.trendTemplate}
              </span>
              <span className="flex items-center justify-between gap-2 text-sm font-black">
                {row.price}
                <ArrowRight className="size-4 text-orange" />
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
