import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  Check,
  Play,
  Sparkles,
} from "lucide-react";
import { PricingCards } from "@/components/pricing-cards";
import { absoluteUrl } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Video Bulin 47 AI Desde Una Foto",
  description:
    "Crea tu video de Bulin 47 AI desde una foto. Mantén el movimiento original, el sonido y el formato vertical para TikTok, Reels y Shorts.",
  keywords: [
    "video de bulin 47",
    "bulin 47 ai",
    "como hacer el video de bulin 47",
    "dame hombro bulin 47",
    "quien es bulin 47",
  ],
  alternates: {
    canonical: absoluteUrl("/es"),
    languages: {
      en: absoluteUrl("/"),
      es: absoluteUrl("/es"),
      "x-default": absoluteUrl("/"),
    },
  },
};

export default function SpanishHome() {
  return (
    <>
      <section className="section-dark">
        <div className="container-shell grid min-h-[680px] items-center gap-12 py-16 lg:grid-cols-[1.05fr_0.95fr]">
          <div>
            <p className="eyebrow text-acid">Bulin 47 AI desde una foto</p>
            <h1 className="display mt-6 text-[clamp(3.2rem,8vw,6.5rem)] text-white">
              Tu foto en el
              <span className="block text-acid">freestyle de Bulin 47.</span>
            </h1>
            <p className="mt-6 max-w-xl text-base leading-8 text-white/60">
              Sube un retrato, conserva el movimiento y el sonido original, y
              descarga un video vertical para TikTok, Reels y Shorts.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link href="/studio" className="btn btn-primary">
                <Sparkles className="size-4" />
                Crear mi video
              </Link>
              <Link
                href="/es/como-hacer-video-bulin-47-ia"
                className="btn btn-white"
              >
                Cómo funciona
                <ArrowRight className="size-4" />
              </Link>
            </div>
            <div className="mt-8 flex flex-wrap gap-5 text-xs font-bold text-white/50">
              {[
                "Sin editar",
                "Sonido original",
                "MP4 privado",
                "Reembolso si falla",
              ].map((item) => (
                <span key={item} className="inline-flex items-center gap-2">
                  <Check className="size-3.5 text-acid" />
                  {item}
                </span>
              ))}
            </div>
          </div>
          <div className="flex justify-center">
            <div className="phone-frame">
              <Image
                src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=900&q=85"
                alt="Vista previa de un video Bulin 47 AI"
                fill
                priority
                sizes="310px"
                className="object-cover"
              />
              <div className="absolute inset-0 bg-black/20" />
              <div className="absolute inset-x-0 bottom-0 bg-black/75 p-5">
                <p className="text-[10px] font-black uppercase text-acid">
                  Vista previa IA
                </p>
                <p className="mt-1 text-xl font-black text-white">
                  Una foto.
                  <br />
                  Todo el freestyle.
                </p>
                <span className="mt-4 grid size-11 place-items-center rounded-full bg-white text-ink">
                  <Play className="size-5 fill-current" />
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20">
        <div className="container-shell">
          <p className="eyebrow text-orange">Cómo funciona</p>
          <h2 className="display mt-5 max-w-3xl text-[clamp(2.5rem,5vw,4.5rem)]">
            Tres pasos para crear tu versión.
          </h2>
          <div className="mt-10 grid gap-4 md:grid-cols-3">
            {[
              ["01", "Sube una foto", "Usa un retrato claro de un adulto que haya dado su consentimiento."],
              ["02", "Genera el video", "Elige duración y calidad. El modelo conserva el movimiento y el ritmo."],
              ["03", "Descarga y publica", "Recibe un MP4 vertical listo para TikTok, Reels o Shorts."],
            ].map(([number, title, copy]) => (
              <div key={number} className="panel p-7">
                <p className="text-xs font-black text-orange">{number}</p>
                <h3 className="mt-5 text-xl font-black">{title}</h3>
                <p className="mt-3 text-sm leading-7 text-muted">{copy}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section-dark py-20">
        <div className="container-shell">
          <p className="eyebrow text-acid">Paquetes de créditos</p>
          <h2 className="display mt-5 max-w-3xl text-[clamp(2.5rem,5vw,4.5rem)] text-white">
            Compra una vez. Úsalo cuando quieras.
          </h2>
          <div className="mt-12">
            <PricingCards />
          </div>
        </div>
      </section>
    </>
  );
}
