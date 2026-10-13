"use client";

import Link from "next/link";
import { useState } from "react";
import { Menu, Sparkles, X } from "lucide-react";
import { Logo } from "@/components/logo";
import { cn } from "@/lib/utils";

const links = [
  { href: "/#how-it-works", label: "How it works" },
  { href: "/pricing", label: "Pricing" },
  { href: "/how-to-make-bulin-47-ai-video", label: "Guides" },
  { href: "/faq", label: "FAQ" },
];

export function SiteHeader() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 border-b border-black/10 bg-paper/90 backdrop-blur-xl">
      <div className="container-shell flex h-16 items-center justify-between">
        <Logo />
        <nav className="hidden items-center gap-7 md:flex">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm font-semibold text-muted transition-colors hover:text-ink"
            >
              {link.label}
            </Link>
          ))}
        </nav>
        <div className="hidden items-center gap-3 md:flex">
          <Link href="/login" className="text-sm font-bold text-ink">
            Sign in
          </Link>
          <Link href="/studio" className="btn btn-dark">
            <Sparkles className="size-4" />
            Create video
          </Link>
        </div>
        <button
          type="button"
          aria-label="Open menu"
          className="grid size-10 place-items-center rounded-lg border border-line md:hidden"
          onClick={() => setOpen((value) => !value)}
        >
          {open ? <X className="size-5" /> : <Menu className="size-5" />}
        </button>
      </div>
      <div
        className={cn(
          "border-t border-line bg-paper px-4 pb-4 md:hidden",
          open ? "block" : "hidden",
        )}
      >
        <nav className="container-shell grid gap-1 pt-3">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setOpen(false)}
              className="rounded-lg px-3 py-3 text-sm font-bold hover:bg-black/5"
            >
              {link.label}
            </Link>
          ))}
          <Link
            href="/studio"
            onClick={() => setOpen(false)}
            className="btn btn-dark mt-2"
          >
            <Sparkles className="size-4" />
            Create video
          </Link>
        </nav>
      </div>
    </header>
  );
}
