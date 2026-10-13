import { absoluteUrl } from "@/lib/utils";
import { CREDIT_PACKS } from "@/lib/constants";

export function ProductSchema() {
  const data = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: "VideoBulin47",
    applicationCategory: "MultimediaApplication",
    operatingSystem: "Web",
    url: absoluteUrl("/"),
    description:
      "Create a Bulin 47 AI video from one photo with a reference video model.",
    offers: CREDIT_PACKS.map((pack) => ({
      "@type": "Offer",
      name: `${pack.name} credit pack`,
      price: (pack.priceCents / 100).toFixed(2),
      priceCurrency: "USD",
      availability: "https://schema.org/InStock",
      url: absoluteUrl("/pricing"),
    })),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
