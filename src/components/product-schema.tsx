import { absoluteUrl, jsonLd } from "@/lib/utils";
import { CREDIT_PACKS } from "@/lib/constants";
import { HOMEPAGE_ANSWERS } from "@/components/landing/answer-block";
import { contentPages } from "@/content/pages";

const ORG_ID = absoluteUrl("/#organization");
const SITE_ID = absoluteUrl("/#website");
const APP_ID = absoluteUrl("/#software");

export function ProductSchema() {
  // 组织 + 站点 + 应用 + FAQ 放在一个 @graph 里，实体之间用 @id 互相引用，
  // 这样搜索引擎和 AI 引擎能把它当成一组连贯的实体，而不是零散的片段。
  const organization = {
    "@type": "Organization",
    "@id": ORG_ID,
    name: "VideoBulin47",
    url: absoluteUrl("/"),
    logo: absoluteUrl("/opengraph-image"),
    sameAs: ["https://github.com/mijika666/videobulin47"],
    founder: {
      "@type": "Person",
      "@id": absoluteUrl("/author#qbit"),
      name: "Qbit",
      url: absoluteUrl("/author"),
    },
    contactPoint: {
      "@type": "ContactPoint",
      contactType: "customer support",
      email: "support@videobulin47.net",
      availableLanguage: ["English", "Spanish"],
    },
  };

  const website = {
    "@type": "WebSite",
    "@id": SITE_ID,
    url: absoluteUrl("/"),
    name: "VideoBulin47",
    inLanguage: "en",
    publisher: { "@id": ORG_ID },
  };

  const application = {
    "@type": "SoftwareApplication",
    "@id": APP_ID,
    name: "VideoBulin47",
    applicationCategory: "MultimediaApplication",
    operatingSystem: "Web",
    url: absoluteUrl("/"),
    description:
      "Video bulin 47 generator. Turn one uploaded image into a vertical 9:16 video with motion and sound. Upload your own photo, a pet, an animal or a virtual character; nobody from the source footage is reused.",
    featureList: [
      "Turn one uploaded image into a vertical 9:16 video",
      "Image-to-video animation with no reference video upload",
      "Seedance 2.5, MiniMax H3, Kling O3 Reference and Kling O3 Reference Pro",
      "5, 10 and 15 second clips at 720p or 1080p",
      "No watermark; jobs and downloads stay in your account history",
      "Credits never expire and failed renders are refunded automatically",
    ],
    image: absoluteUrl("/opengraph-image"),
    publisher: { "@id": ORG_ID },
    isPartOf: { "@id": SITE_ID },
    offers: CREDIT_PACKS.map((pack) => ({
      "@type": "Offer",
      name: `${pack.name} credit pack`,
      price: (pack.priceCents / 100).toFixed(2),
      priceCurrency: "USD",
      availability: "https://schema.org/InStock",
      url: absoluteUrl("/pricing"),
    })),
  };

  // 首页可见的问答有两组：快速回答区块 + 页面底部的 FAQ 手风琴。
  // schema 必须和可见内容一致，所以两组都收进来。
  const faqQuestions = [
    ...HOMEPAGE_ANSWERS.map((item) => ({
      question: item.question,
      answer: item.answer,
    })),
    ...(contentPages.faq?.faqs ?? []),
  ];

  const faqPage = {
    "@type": "FAQPage",
    "@id": absoluteUrl("/#faq"),
    mainEntity: faqQuestions.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
  };

  const data = {
    "@context": "https://schema.org",
    "@graph": [organization, website, application, faqPage],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: jsonLd(data) }}
    />
  );
}
