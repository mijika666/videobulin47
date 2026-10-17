import Link from "next/link";
import { Play } from "lucide-react";
import { cn } from "@/lib/utils";

export function Logo({ dark = false }: { dark?: boolean }) {
  return (
    <Link
      href="/"
      className={cn(
        "inline-flex items-center gap-2.5 text-sm font-black uppercase",
        dark ? "text-white" : "text-ink",
      )}
    >
      <span className="grid size-8 place-items-center rounded-lg bg-acid text-white">
        <Play className="size-4 fill-current" />
      </span>
      <span>
        Video<span className="text-acid">Bulin47</span>
      </span>
    </Link>
  );
}
