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
    default: "Video Bulin 47 AI Generator From One Photo | VideoBulin47",
    template: `%s | ${APP_NAME}`,
  },
  description:
    "Make a video bulin 47 clip from one photo. Keep the original freestyle motion and sound, then download a vertical MP4 for TikTok, Reels, or Shorts.",
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
    title: "Video Bulin 47 AI Generator From One Photo",
    description:
      "One photo. One vertical freestyle video. Built for TikTok, Reels, and Shorts.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Bulin 47 AI Video Generator From One Photo",
    description:
      "Upload a photo, generate a Bulin 47 AI video, and download the MP4.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
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
