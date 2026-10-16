import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Script from "next/script";
import { APP_NAME } from "@/lib/constants";
import { TRENDING_SEARCHES } from "@/config/keywords";
import { absoluteUrl } from "@/lib/utils";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { ProductSchema } from "@/components/product-schema";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL(absoluteUrl("/")),
  title: {
    default: "Video Bulin 47 Image to Video Generator | VideoBulin47",
    template: `%s | ${APP_NAME}`,
  },
  description:
    "Turn one image of a pet, an animal, or a virtual character into a short vertical AI video. Image-to-video generation with no reference video upload, and nobody from the source footage reused.",
  applicationName: APP_NAME,
  keywords: TRENDING_SEARCHES.map((item) => item.label),
  alternates: {
    canonical: "/",
    languages: {
      en: "/",
      es: "/es",
      "x-default": "/",
    },
  },
  openGraph: {
    type: "website",
    url: absoluteUrl("/"),
    siteName: APP_NAME,
    title: "Video Bulin 47 Image to Video Generator",
    description:
      "One image in, one vertical AI video out. Built for TikTok, Reels, and Shorts.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Bulin 47 Image to Video Generator",
    description:
      "Upload an image of a pet or a virtual character, generate a short vertical video, and download the MP4.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  // globals.css 里设了 scroll-behavior: smooth。Next.js 16 默认不再在路由切换
  // 时覆盖它，加上 data-scroll-behavior="smooth" 可以保留「跳转瞬间置顶、
  // 页内锚点平滑滚动」的原有行为。
  return (
    <html
      lang="en"
      data-scroll-behavior="smooth"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col">
        <Script
          id="plausible-script"
          src="https://plausible.io/js/pa-NHDcP1yDi384EqFPCIbGv.js"
          strategy="afterInteractive"
        />
        <Script id="plausible-init" strategy="afterInteractive">
          {`window.plausible=window.plausible||function(){(plausible.q=plausible.q||[]).push(arguments)},plausible.init=plausible.init||function(i){plausible.o=i||{}};
plausible.init();`}
        </Script>
        <ProductSchema />
        <SiteHeader />
        <main className="flex-1">{children}</main>
        <SiteFooter />
      </body>
    </html>
  );
}
