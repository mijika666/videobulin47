// 40-60 词的独立答案块。传统 SEO 和 AI 引擎（ChatGPT / Perplexity /
// AI Overviews）都更容易抓取这种「问题 + 直接回答」的结构。
// FAQPage 结构化数据复用同一份数据，保证页面与 schema 完全一致。
export const HOMEPAGE_ANSWERS = [
  {
    question: "What is a video bulin 47?",
    answer:
      "A video bulin 47 is a short vertical clip built on the viral Bulin 47 freestyle. VideoBulin47 takes one uploaded portrait, keeps the dance motion, camera work and audio from a reference clip, and replaces the performer with the person in your photo.",
  },
  {
    question: "How do you make a video bulin 47 from a photo?",
    answer:
      "Upload one clear portrait, choose the clip length and the AI model, then generate. The reference clip drives the motion and the sound while your photo drives the identity. The finished MP4 is saved to your account and ready for TikTok, Reels or Shorts.",
  },
  {
    question: "How much does a video bulin 47 cost?",
    answer:
      "Credit packs are one-time purchases: $9.99 for 10 credits, $24.99 for 30 credits and $69.99 for 100 credits. Credits never expire and failed renders are refunded automatically. There is no subscription and no recurring charge.",
  },
  {
    question: "Which AI models generate the video?",
    answer:
      "Generation runs on third-party models served through fal.ai: Seedance 2.5, MiniMax H3, and Kling O3 Reference or Kling O3 Reference Pro. All of them drive the motion from your reference clip and keep the original audio. You pick the model in the Studio before you generate.",
  },
] as const;

export function AnswerBlock() {
  return (
    <section className="border-b border-line py-16 md:py-20">
      <div className="container-shell">
        <div className="max-w-3xl">
          <p className="eyebrow text-orange">Quick answers</p>
          <h2 className="display mt-5 text-[clamp(2rem,4.6vw,3.4rem)]">
            Video Bulin 47, explained.
          </h2>
        </div>
        <div className="mt-10 grid gap-4 md:grid-cols-2">
          {HOMEPAGE_ANSWERS.map((item) => (
            <article key={item.question} className="panel p-6">
              <h3 className="text-base font-black">{item.question}</h3>
              <p className="mt-3 text-sm leading-7 text-muted">{item.answer}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
