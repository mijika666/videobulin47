import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight, Clock3, FileText } from "lucide-react";
import { absoluteUrl } from "@/lib/utils";

const pages = {
  "como-hacer-video-bulin-47-ia": {
    title: "Cómo Hacer un Video de Bulin 47 AI Desde Una Foto",
    description:
      "Guía paso a paso para crear un video de Bulin 47 AI. Sube un retrato de un adulto con permiso, elige duración y descarga un MP4 vertical.",
    intro:
      "El flujo es sencillo: una imagen clara, una plantilla de movimiento y una salida vertical. No necesitas editar ni grabar la coreografía.",
    sections: [
      {
        heading: "1. Elige una buena imagen",
        body: "Usa un retrato claro de un solo adulto. Lo mejor es una foto frontal y bien iluminada donde se vean la cara y la parte superior del cuerpo. Evita filtros fuertes y gafas de sol. Solo puedes subir una imagen propia o con permiso.",
      },
      {
        heading: "2. Elige la duración",
        body: "Cinco segundos sirven para probar. Diez o quince segundos funcionan mejor para TikTok y Reels. La resolución 720p es la opción más económica y 1080p ofrece más detalle.",
      },
      {
        heading: "3. Genera y descarga",
        body: "Confirma el origen de la imagen, reserva los créditos y envía el trabajo. Si el proveedor falla, los créditos vuelven automáticamente. Cuando termina, descarga el MP4.",
      },
    ],
  },
  "tendencia-bulin-47-ia": {
    title: "Tendencia Bulin 47 AI: Qué Es y Por Qué Funciona",
    description:
      "Entiende la tendencia Bulin 47 AI, la plantilla de movimiento y el flujo con una sola imagen.",
    intro:
      "La tendencia conserva el movimiento y el ritmo del video original, pero cambia al sujeto principal. Eso convierte un clip conocido en una versión propia.",
    sections: [
      {
        heading: "El clip original",
        body: "El video de Bulin 47 y Kevin Wai se volvió una referencia por su energía, su ritmo y sus movimientos reconocibles. La gente empezó a crear versiones con su propia imagen.",
      },
      {
        heading: "Cómo funciona la animación",
        body: "Un modelo de referencia recibe la plantilla de movimiento y la imagen que subes. Después sigue el movimiento y la cámara del clip original mientras anima a tu sujeto dentro de esa escena.",
      },
      {
        heading: "Usa la herramienta con cuidado",
        body: "Sube solo retratos que sean tuyos o para los que tengas permiso. No subas menores de edad, celebridades ni figuras públicas sin consentimiento. Publica el video con la etiqueta de contenido generado por IA cuando la plataforma lo requiera.",
      },
    ],
  },
};

type Props = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return Object.keys(pages).map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const page = pages[slug as keyof typeof pages];
  if (!page) return {};
  return {
    title: page.title,
    description: page.description,
    keywords: [
      slug === "como-hacer-video-bulin-47-ia"
        ? "como hacer el video de bulin 47"
        : "tendencia bulin 47 ai",
      "video de bulin 47",
      "bulin 47 ai",
    ],
    alternates: {
      canonical: absoluteUrl(`/es/${slug}`),
    },
  };
}

export default async function SpanishGuide({ params }: Props) {
  const { slug } = await params;
  const page = pages[slug as keyof typeof pages];
  if (!page) notFound();

  return (
    <>
      <section className="section-dark py-20">
        <div className="container-shell">
          <p className="eyebrow text-acid">Guía Bulin 47 AI</p>
          <h1 className="display mt-6 max-w-4xl text-[clamp(2.8rem,7vw,5.5rem)] text-white">
            {page.title}
          </h1>
          <p className="mt-6 max-w-2xl text-base leading-8 text-white/60">
            {page.description}
          </p>
          <p className="mt-6 inline-flex items-center gap-2 text-xs font-bold text-white/45">
            <Clock3 className="size-4 text-acid" />
            Actualizado el 13 de octubre de 2026
          </p>
        </div>
      </section>
      <section className="py-16 md:py-24">
        <div className="container-shell grid gap-12 lg:grid-cols-[minmax(0,760px)_1fr]">
          <article className="prose-custom">
            <p className="text-lg font-semibold leading-8 text-ink">
              {page.intro}
            </p>
            {page.sections.map((section) => (
              <section key={section.heading}>
                <h2>{section.heading}</h2>
                <p>{section.body}</p>
              </section>
            ))}
          </article>
          <aside>
            <div className="section-acid rounded-lg p-7">
              <FileText className="size-6" />
              <h2 className="mt-5 text-2xl font-black leading-tight">
                Crea tu versión con una imagen.
              </h2>
              <p className="mt-3 text-sm leading-6 text-white/80">
                Abre el Studio, sube una imagen y elige la duración del video.
              </p>
              <Link href="/studio" className="btn btn-dark mt-6 w-full">
                Abrir el Studio
                <ArrowRight className="size-4" />
              </Link>
              <div className="mt-6 grid gap-2 border-t border-ink/15 pt-5 text-xs font-bold">
                <Link href="/quien-es-bulin-47" className="hover:underline">
                  Quién es Bulin 47
                </Link>
                <Link href="/dame-hombro" className="hover:underline">
                  Dame Hombro Bulin 47
                </Link>
                <Link href="/bulin-47-ai-video" className="hover:underline">
                  Bulin 47 AI video
                </Link>
              </div>
            </div>
          </aside>
        </div>
      </section>
    </>
  );
}
