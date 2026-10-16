// 40-60 词的独立答案块。传统 SEO 和 AI 引擎（ChatGPT / Perplexity /
// AI Overviews）都更容易抓取这种「问题 + 直接回答」的结构。
// FAQPage 结构化数据复用同一份数据，保证页面与 schema 完全一致。
export const HOMEPAGE_ANSWERS = [
  {
    question: "What is a video bulin 47?",
    answer:
      "A video bulin 47 is a short vertical clip built on the viral Bulin 47 freestyle. VideoBulin47 generates one from a single image: upload a pet, an animal, or a virtual character, and we animate it. There is no reference video to upload, and photographs of real people are not accepted.",
  },
  {
    question: "How do you make a video bulin 47 from an image?",
    answer:
      "Upload one clear image of a non-human subject, choose the clip length, resolution and AI model, then generate. We animate your subject and keep the original rhythm and audio. The finished vertical MP4 is saved to your account and ready for TikTok, Reels or Shorts.",
  },
  {
    question: "How much does a video bulin 47 cost?",
    answer:
      "Credit packs are one-time purchases: $9.99 for 10 credits, $22.99 for 30 credits and $59.99 for 80 credits. A 10-second 720p clip costs 10 credits on the default model, so the packs cover roughly 1, 3 and 8 clips. Credits never expire, failed renders are refunded automatically, and there is no subscription.",
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
