import { ChevronDown } from "lucide-react";
import type { ContentFaq } from "@/content/pages";

export function FaqAccordion({ items }: { items: ContentFaq[] }) {
  return (
    <div className="grid gap-3">
      {items.map((item) => (
        <details
          key={item.question}
          className="group panel overflow-hidden p-0"
        >
          <summary className="flex cursor-pointer list-none items-center justify-between gap-5 px-5 py-5 text-left text-base font-bold marker:content-none">
            {item.question}
            <ChevronDown className="size-5 shrink-0 transition-transform group-open:rotate-180" />
          </summary>
          <p className="border-t border-line px-5 py-5 text-sm leading-7 text-muted">
            {item.answer}
          </p>
        </details>
      ))}
    </div>
  );
}
