import Link from "next/link";
import { ArrowUpRight, Search } from "lucide-react";
import { PRIMARY_KEYWORD, TRENDING_SEARCHES } from "@/config/keywords";

export function TrendingSearches() {
  return (
    <section className="border-y border-line bg-paper py-20 md:py-24">
      <div className="container-shell">
        <div className="grid gap-10 lg:grid-cols-[0.75fr_1.25fr] lg:items-start">
          <div>
            <p className="eyebrow text-orange">Search hub</p>
            <h2 className="display mt-5 text-[clamp(2.5rem,5vw,4.5rem)]">
              What people search for before they make the video.
            </h2>
            <p className="mt-5 max-w-md text-sm leading-7 text-muted">
              Start with the main term,{" "}
              <strong className="text-ink">{PRIMARY_KEYWORD}</strong>, then
              explore the trend, the original clip, the freestyle lyrics, and
              the tools people compare before generating.
            </p>
          </div>
          <div className="grid gap-3 sm:grid-cols-2">
            {TRENDING_SEARCHES.map((item) => (
              <Link
                key={`${item.label}-${item.slug}`}
                href={item.slug ? `/${item.slug}` : "/"}
                className="group flex items-center justify-between gap-4 rounded-lg border border-line bg-card px-4 py-4 transition hover:border-acid/50 hover:bg-panel"
              >
                <span className="flex items-center gap-3">
                  <Search className="size-4 shrink-0 text-orange" />
                  <span className="text-sm font-bold">{item.label}</span>
                </span>
                <ArrowUpRight className="size-4 shrink-0 text-muted transition group-hover:text-ink" />
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
