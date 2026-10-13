import { Hero } from "@/components/landing/hero";
import { HowItWorks } from "@/components/landing/how-it-works";
import { Features } from "@/components/landing/features";
import { VideoShowcase } from "@/components/landing/video-showcase";
import { TrendingSearches } from "@/components/landing/trending-searches";
import { ComparisonPreview } from "@/components/landing/comparison-preview";
import { PricingSection } from "@/components/landing/pricing-section";
import { FaqSection } from "@/components/landing/faq-section";
import { FinalCta } from "@/components/landing/final-cta";

export default function Home() {
  return (
    <>
      <Hero />
      <VideoShowcase />
      <HowItWorks />
      <Features />
      <TrendingSearches />
      <ComparisonPreview />
      <PricingSection />
      <FaqSection />
      <FinalCta />
    </>
  );
}
