export type ContentSection = {
  heading: string;
  paragraphs?: string[];
  bullets?: string[];
};

export type ContentFaq = {
  question: string;
  answer: string;
};

export type ContentPage = {
  slug: string;
  kind: "guide" | "legal" | "page";
  lang?: "en" | "es";
  eyebrow: string;
  title: string;
  description: string;
  intro: string;
  updated?: string;
  sections: ContentSection[];
  faqs?: ContentFaq[];
  cta?: boolean;
};

const commonFaqs: ContentFaq[] = [
  {
    question: "Is VideoBulin47 affiliated with Bulin 47?",
    answer:
      "No. VideoBulin47 is an independent fan-made tool. It is not affiliated with, endorsed by, or sponsored by Bulin 47, Kevin Wai, their labels, or TikTok.",
  },
  {
    question: "What photo works best?",
    answer:
      "Use a sharp, well-lit portrait of one consenting adult. The face and upper body should be visible. Avoid sunglasses, heavy filters, group photos, and images of celebrities or public figures.",
  },
  {
    question: "What happens if a generation fails?",
    answer:
      "Reserved credits are refunded automatically when the provider reports a failed, canceled, or moderated generation.",
  },
  {
    question: "Are credits refundable?",
    answer:
      "Unused credit packs can be requested for review within 14 days. Spent credits are not refundable once a video has completed. See the Refund Policy for the full process.",
  },
];

export const contentPages: Record<string, ContentPage> = {
  "how-to-make-bulin-47-ai-video": {
    slug: "how-to-make-bulin-47-ai-video",
    kind: "guide",
    eyebrow: "Step-by-step guide",
    title: "How to Make a Bulin 47 AI Video From One Photo",
    description:
      "Learn how to make a Bulin 47 AI video from one photo. Upload a portrait, choose the clip length, generate the video, and post it to TikTok, Reels, or Shorts.",
    intro:
      "The fastest way to join the trend is to start with one clear photo. VideoBulin47 keeps the original freestyle motion, camera movement, and rhythm, then replaces the performer with the person in your photo.",
    sections: [
      {
        heading: "1. Pick the right photo",
        paragraphs: [
          "Use a front-facing photo of one consenting adult. The best results come from a sharp image with even lighting, a visible face, and the upper body in frame. Avoid sunglasses, busy filters, and photos where another person overlaps the subject.",
          "Do not upload a celebrity, politician, minor, or anyone who has not agreed to appear in an AI-generated video.",
        ],
      },
      {
        heading: "2. Choose the clip length and quality",
        paragraphs: [
          "A 5-second clip is the fastest way to test the result. A 15-second 720p video matches the most common TikTok and Reels format. Use 1080p when you want a sharper file for a larger screen.",
        ],
        bullets: [
          "5 seconds: quick preview",
          "10 seconds: good balance between speed and length",
          "15 seconds: the standard social clip",
          "720p: best value for mobile",
          "1080p: sharper output for bigger screens",
        ],
      },
      {
        heading: "3. Generate the video",
        paragraphs: [
          "Open the Studio, upload the photo, confirm that you have permission to use it, and select Generate. Credits are reserved when the request is submitted. If the render fails or is blocked, the reservation is returned automatically.",
        ],
      },
      {
        heading: "4. Download and post",
        paragraphs: [
          "When the job finishes, download the MP4 from your account. The output is designed for vertical 9:16 feeds. Add an AI-generated label when the platform asks for one, and follow the music and synthetic media rules for TikTok, Instagram, and YouTube.",
        ],
      },
    ],
    faqs: commonFaqs,
    cta: true,
  },
  "bulin-47-ai-trend": {
    slug: "bulin-47-ai-trend",
    kind: "guide",
    eyebrow: "Trend explainer",
    title: "Bulin 47 AI Trend: Why One Photo Is Enough",
    description:
      "Understand the Bulin 47 AI trend, the original freestyle format, and why people use one photo to create their own version for TikTok and Reels.",
    intro:
      "The Bulin 47 AI trend keeps the recognizable freestyle performance while replacing the main performer. That simple change turns a familiar clip into a personalized social video.",
    sections: [
      {
        heading: "What the trend is",
        paragraphs: [
          "Bulin 47 is a Dominican dembow artist. A short freestyle clip filmed with creator Kevin Wai spread across TikTok and Instagram, and viewers began making their own versions.",
          "Instead of learning the dance or filming on location, creators use an AI reference workflow. The source clip supplies the action and camera language, while a portrait supplies the new appearance.",
        ],
      },
      {
        heading: "Why it spread so quickly",
        paragraphs: [
          "The format is easy to understand in a few seconds. It has a clear before-and-after reveal, a recognizable rhythm, and a result that friends can compare in a group chat. Those are the same ingredients that make many social trends travel quickly.",
        ],
      },
      {
        heading: "How AI video reference works",
        paragraphs: [
          "A reference-to-video model reviews the source motion and the uploaded portrait, then generates a new take that follows the original timing and camera path. The quality depends on the photo, the source clip, and the model.",
          "VideoBulin47 uses a staged workflow: reserve credits, submit the job to the provider queue, wait for the webhook, and save the completed MP4 to the user account.",
        ],
      },
      {
        heading: "Use it responsibly",
        paragraphs: [
          "Only use photos of people who have agreed to appear. Do not use public figures, private individuals without consent, or content intended to deceive. Label synthetic media when you post it.",
        ],
      },
    ],
    faqs: commonFaqs,
    cta: true,
  },
  "bulin-47-ai-video": {
    slug: "bulin-47-ai-video",
    kind: "guide",
    eyebrow: "Product guide",
    title: "Bulin 47 AI Video Generator",
    description:
      "Create a Bulin 47 AI video online. Upload one photo, keep the original motion and sound, and download a vertical MP4 for TikTok, Reels, and Shorts.",
    intro:
      "VideoBulin47 is a one-photo AI video generator for the Bulin 47 freestyle trend. It removes the need to film, learn choreography, or edit a timeline.",
    sections: [
      {
        heading: "One template, one clear result",
        paragraphs: [
          "The product is deliberately narrow. You are not asked to write a prompt or build a shot list. The source template defines the motion and pacing, and your photo supplies the identity.",
        ],
      },
      {
        heading: "Built for mobile posting",
        paragraphs: [
          "Every render is prepared for a vertical 9:16 feed. Download the MP4 and upload it directly to TikTok, Instagram Reels, or YouTube Shorts. Keeping the original audio helps the clip feel connected to the trend.",
        ],
      },
      {
        heading: "Credits are transparent",
        paragraphs: [
          "The Studio shows the credit cost before submission. A failed generation does not keep your credits. The job page shows whether the request is queued, processing, complete, or refunded.",
        ],
      },
    ],
    faqs: commonFaqs,
    cta: true,
  },
  "bulin-47-template": {
    slug: "bulin-47-template",
    kind: "guide",
    eyebrow: "Template guide",
    title: "Bulin 47 AI Template for TikTok and Reels",
    description:
      "See what the Bulin 47 AI template does, how the source clip controls motion, and why the template gives more consistent results than a generic video prompt.",
    intro:
      "A template is not just a preset style. It is a reference performance that supplies movement, timing, and camera behavior for every generation.",
    sections: [
      {
        heading: "Why a template beats a prompt",
        paragraphs: [
          "A text-only prompt has to invent the scene, motion, camera, and identity at the same time. A video template already contains those decisions, so the model can focus on the character replacement.",
        ],
      },
      {
        heading: "What stays the same",
        paragraphs: [
          "The reference video keeps the freestyle motion, timing, background action, and overall camera language. The upload changes the appearance of the main performer.",
        ],
      },
      {
        heading: "What can change",
        paragraphs: [
          "Clothing, hair, body proportions, and the exact final likeness can shift as the model interprets the portrait. A clear photo gives the model less to guess.",
        ],
      },
      {
        heading: "Rights and permissions",
        paragraphs: [
          "Before publishing a public template, the operator needs the rights required for the source video, music, and performer likeness. Users also need permission to upload the people shown in their photos.",
        ],
      },
    ],
    faqs: commonFaqs,
    cta: true,
  },
  "bulin-47-meme": {
    slug: "bulin-47-meme",
    kind: "guide",
    eyebrow: "Ideas",
    title: "Bulin 47 AI Meme Ideas",
    description:
      "Get clean Bulin 47 AI meme ideas for friend groups, social pages, and short-form video. Use consenting photos and keep the joke easy to read.",
    intro:
      "The best versions of this trend are easy to understand without setup. The reveal does the work. Keep the joke short and make the person in the photo the star.",
    sections: [
      {
        heading: "Group chat cast",
        paragraphs: [
          "Make one version for each friend and post them as a carousel or a stitched sequence. The contrast between different photos is usually funnier than a complex edit.",
        ],
      },
      {
        heading: "Before-and-after",
        paragraphs: [
          "Show the uploaded photo for one second, then cut to the generated freestyle. This format makes the change obvious and gives viewers a reason to watch until the end.",
        ],
      },
      {
        heading: "Office or hobby jokes",
        paragraphs: [
          "A caption can set up a simple context, such as the quietest person in the group finally taking the microphone. Keep the caption under ten words and avoid targeting anyone in a harmful way.",
        ],
      },
      {
        heading: "Safety rules",
        bullets: [
          "Use photos only from consenting adults",
          "Do not use minors, celebrities, or public figures",
          "Label the video as AI-generated",
          "Do not use the result to impersonate or mislead",
        ],
      },
    ],
    faqs: commonFaqs,
    cta: true,
  },
  "bulin-47-ai-free": {
    slug: "bulin-47-ai-free",
    kind: "guide",
    eyebrow: "Pricing",
    title: "Is Bulin 47 AI Free?",
    description:
      "The honest answer about free Bulin 47 AI generation, why video models cost money, and how to test the workflow before buying a larger credit pack.",
    intro:
      "You can preview the workflow and example material for free, but video generation itself is not free. Every render uses a paid model and storage service.",
    sections: [
      {
        heading: "Why generation costs money",
        paragraphs: [
          "A video model has to process the source clip, the portrait, motion, frames, audio, and encoding. The provider charges the website per second of output. Payment processing and storage add more cost.",
        ],
      },
      {
        heading: "How to keep the first test small",
        paragraphs: [
          "Start with the lowest-cost pack and a five-second preview. Once the photo and likeness look right, use the same photo for a longer social render.",
        ],
      },
      {
        heading: "What you get for the price",
        bullets: [
          "Private photo upload",
          "A queued video generation job",
          "Vertical MP4 output",
          "Download history in your account",
          "Automatic refund when the provider reports a failure",
        ],
      },
    ],
    faqs: commonFaqs,
    cta: true,
  },
  "bulin-47-original-video": {
    slug: "bulin-47-original-video",
    kind: "guide",
    eyebrow: "Context",
    title: "The Original Bulin 47 Video and Why AI Versions Exist",
    description:
      "Learn what the original Bulin 47 freestyle clip is, how the AI versions started, and what creators should know before making their own.",
    intro:
      "The original clip became the reference because it has a strong rhythm, clear movement, and an instantly recognizable location. AI versions reuse those qualities.",
    sections: [
      {
        heading: "The source performance",
        paragraphs: [
          "The source is a short freestyle moment filmed by Kevin Wai and shared on social media. Viewers reacted to the energy, the beat, and the way the performance fills the frame.",
        ],
      },
      {
        heading: "From clip to template",
        paragraphs: [
          "AI tools turn the footage into a reusable motion reference. The model follows the original performance while replacing the main subject with the person in the uploaded portrait.",
        ],
      },
      {
        heading: "Do not reupload someone else's version",
        paragraphs: [
          "The source clip, the music, and the likeness of the original performers may be protected. Do not claim ownership of another creator's file or present a fan tool as officially affiliated.",
        ],
      },
      {
        heading: "Make your own version",
        paragraphs: [
          "If you have a clear photo and permission from the person shown, the Studio can create a new vertical video from the reference template.",
        ],
      },
    ],
    faqs: commonFaqs,
    cta: true,
  },
  "how-to-add-bulin-47-sound": {
    slug: "how-to-add-bulin-47-sound",
    kind: "guide",
    eyebrow: "Audio guide",
    title: "How to Add the Bulin 47 Sound to Your AI Video",
    description:
      "Learn how the original sound is handled in a Bulin 47 AI video and what to do when the audio is missing after export.",
    intro:
      "The model can preserve the original reference audio when the template includes it. If the platform strips or mutes the audio, add the licensed sound inside the social app before publishing.",
    sections: [
      {
        heading: "Keep the original audio",
        paragraphs: [
          "VideoBulin47 submits the template with an audio-preservation flag. That tells the provider to carry the reference sound into the generated file.",
        ],
      },
      {
        heading: "If the file has no sound",
        paragraphs: [
          "Download the MP4, open TikTok, Reels, or Shorts, and add the available trend sound from the platform library. This also keeps you inside the app's music licensing rules.",
        ],
      },
      {
        heading: "Check the export",
        paragraphs: [
          "Play the downloaded file before posting. Some phone galleries mute videos by default. Check the device volume and the file's audio track before generating a second version.",
        ],
      },
    ],
    faqs: commonFaqs,
    cta: true,
  },
  "dame-hombro": {
    slug: "dame-hombro",
    kind: "guide",
    eyebrow: "Search guide",
    title: "Dame Hombro Bulin 47 AI Video",
    description:
      "Looking for the Dame Hombro Bulin 47 trend? Learn how the phrase is used online and how to create a portrait-led AI video version.",
    intro:
      "Dame Hombro is one of the phrases people use while searching for the song, the dance, or a related social clip. Use the same one-photo workflow to create your own version.",
    sections: [
      {
        heading: "What people are looking for",
        paragraphs: [
          "Some searches are for the original audio. Others are looking for a dance clip, a lyric, or a way to join the trend with a photo. The search intent is mixed, so the result should make the next step obvious.",
        ],
      },
      {
        heading: "Create with one portrait",
        paragraphs: [
          "Upload one clear photo, select the clip length, and generate a vertical video. The reference clip supplies the motion and rhythm.",
        ],
      },
      {
        heading: "Post with the right label",
        paragraphs: [
          "Use the in-app AI label and credit the original creator or sound where the platform requires it. Do not present the result as official footage.",
        ],
      },
    ],
    faqs: commonFaqs,
    cta: true,
  },
  "higgsfield-bulin-47-ai": {
    slug: "higgsfield-bulin-47-ai",
    kind: "guide",
    eyebrow: "Comparison",
    title: "Higgsfield vs VideoBulin47 for the Bulin 47 Trend",
    description:
      "Compare a general AI video platform with a focused Bulin 47 one-photo workflow. Choose based on speed, control, and the type of result you need.",
    intro:
      "General video platforms are flexible. A focused trend tool is faster. The right choice depends on whether you want to direct a new scene or simply join an existing format.",
    sections: [
      {
        heading: "General AI video platform",
        paragraphs: [
          "A platform such as Higgsfield gives you more controls, more models, and more ways to build a scene from scratch. That flexibility also means more setup and more room for inconsistent output.",
        ],
      },
      {
        heading: "Focused one-photo workflow",
        paragraphs: [
          "VideoBulin47 fixes the template and asks for one portrait. This reduces the number of decisions and keeps the output centered on the freestyle replacement.",
        ],
      },
      {
        heading: "Which should you use?",
        bullets: [
          "Choose a general platform for original scenes and full creative control",
          "Choose VideoBulin47 for a faster trend-specific clip",
          "Test one short render before buying a larger credit pack",
          "Always check model terms, likeness rights, and content policies",
        ],
      },
    ],
    faqs: commonFaqs,
    cta: true,
  },
  "bulin-47-viral-video": {
    slug: "bulin-47-viral-video",
    kind: "guide",
    eyebrow: "Viral video",
    title: "Bulin 47 Viral Video: Why the Freestyle Took Over",
    description:
      "Understand the Bulin 47 viral video, its TikTok and Instagram spread, and how to make your own one-photo version.",
    intro:
      "The Bulin 47 viral video works because the format is instantly readable: one memorable freestyle, one camera angle, and a clear before-and-after reveal.",
    sections: [
      {
        heading: "Why it went viral",
        paragraphs: [
          "The clip combines a recognizable dembow rhythm, a compact performance, and a camera position that keeps the main subject in frame. That makes it easy to remix and easy to recognize in a short-form feed.",
        ],
      },
      {
        heading: "From viral clip to repeatable template",
        paragraphs: [
          "Viewers started asking how to put a different person into the clip. The most consistent answer is a reference-video workflow: keep the original motion and replace the performer with the person in a photo.",
        ],
      },
      {
        heading: "Make the viral version with one photo",
        paragraphs: [
          "VideoBulin47 uses a reference video plus one portrait. The source clip supplies the timing and movement, while the portrait supplies the new identity.",
        ],
      },
      {
        heading: "Post it the right way",
        paragraphs: [
          "Use the in-app AI label, credit the original creator or sound where required, and do not present the result as official footage.",
        ],
      },
    ],
    faqs: commonFaqs,
    cta: true,
  },
  "bulin-47-freestyle-lyrics": {
    slug: "bulin-47-freestyle-lyrics",
    kind: "guide",
    eyebrow: "Freestyle guide",
    title: "Bulin 47 Freestyle Lyrics, Meaning, and Sound Guide",
    description:
      "A practical guide to the Bulin 47 freestyle lyrics, the Dame Hombro phrase, the original sound, and how to use the track in a video.",
    intro:
      "This page does not reproduce the full lyrics. It explains where the phrases appear in the trend, how to find an official lyrics source, and how the sound is used in a Bulin 47 AI video.",
    sections: [
      {
        heading: "The freestyle format",
        paragraphs: [
          "The freestyle is short, rhythmic, and built around a few recognizable phrases. The visual performance matters as much as the words, which is why the clip works so well as a video template.",
        ],
      },
      {
        heading: "Dame Hombro and other search phrases",
        paragraphs: [
          "People often search for Dame Hombro, Bulin 47 letra, or Bulin 47 freestyle lyrics while looking for the same moment. Use the official music service or the creator's channel for the accurate lyrics.",
        ],
      },
      {
        heading: "Use the original sound in your video",
        paragraphs: [
          "The safest path is to use the platform's licensed sound library when you post. If the generated file contains the reference audio, check the audio track before publishing.",
        ],
      },
      {
        heading: "Create the video",
        paragraphs: [
          "Upload one clear portrait, choose the clip length, and let the reference video handle the motion and rhythm. The result is a vertical AI video made for short-form feeds.",
        ],
      },
    ],
    faqs: commonFaqs,
    cta: true,
  },
  "kevin-wai-bulin-47": {
    slug: "kevin-wai-bulin-47",
    kind: "guide",
    eyebrow: "Creator context",
    title: "Kevin Wai and the Bulin 47 Freestyle Clip",
    description:
      "Learn who Kevin Wai is in the Bulin 47 story, why the freestyle clip spread, and how the AI version relates to the original video.",
    intro:
      "Kevin Wai is closely connected to the short freestyle clip that became the visual reference for the trend. Searches for Kevin Way and Kevincito usually point to the same creator context.",
    sections: [
      {
        heading: "The creator context",
        paragraphs: [
          "The clip gained attention because it captured a live performance with a strong rhythm and a memorable camera angle. The creator and the original moment are part of the trend's identity.",
        ],
      },
      {
        heading: "Why the AI versions appeared",
        paragraphs: [
          "Once the clip became a recognizable format, viewers wanted to see themselves or their friends in the same performance. A reference-video model makes that possible without filming a new scene.",
        ],
      },
      {
        heading: "Respect the original rights",
        paragraphs: [
          "The source footage, music, and likeness may be protected. A fan-made tool should not claim official affiliation, and a public template needs permission from the rights holders.",
        ],
      },
      {
        heading: "Create your own version",
        paragraphs: [
          "Use a photo of a consenting adult, keep the original motion, and label the output as AI-generated when you post it.",
        ],
      },
    ],
    faqs: commonFaqs,
    cta: true,
  },
  "quien-es-bulin-47": {
    slug: "quien-es-bulin-47",
    kind: "guide",
    lang: "es",
    eyebrow: "Guía del artista",
    title: "Quién es Bulin 47: Edad, Freestyle y Video Viral",
    description:
      "Quién es Bulin 47, por qué se hizo viral el freestyle, qué significa Dame Hombro y cómo crear tu propia versión con una foto.",
    intro:
      "Bulin 47 es un artista de dembow dominicano relacionado con un freestyle corto que se volvió viral en TikTok e Instagram. Esta página reúne el contexto principal.",
    sections: [
      {
        heading: "Datos principales",
        paragraphs: [
          "Las búsquedas sobre quién es Bulin 47, su edad, su biografía y su página de Wikipedia suelen aparecer al mismo tiempo que el video viral. Para datos personales, usa fuentes oficiales y verificadas.",
        ],
      },
      {
        heading: "El freestyle y Dame Hombro",
        paragraphs: [
          "El freestyle combina un ritmo de dembow, una puesta en escena sencilla y frases que se repiten en los videos. Dame Hombro es una de las búsquedas relacionadas más frecuentes.",
        ],
      },
      {
        heading: "Cómo se crea la versión AI",
        paragraphs: [
          "La versión AI usa el video original como referencia de movimiento y una foto como referencia de identidad. El resultado conserva el ritmo y el encuadre del clip original.",
        ],
      },
      {
        heading: "Publica con responsabilidad",
        paragraphs: [
          "Sube solo fotos de adultos que hayan dado su permiso. No uses menores, celebridades ni figuras públicas. Etiqueta el video como generado por IA.",
        ],
      },
    ],
    faqs: commonFaqs,
    cta: true,
  },
  "bulin-47-ai-vs-dreamina": {
    slug: "bulin-47-ai-vs-dreamina",
    kind: "guide",
    eyebrow: "Comparison",
    title: "Bulin 47 AI vs Dreamina: Which Workflow Fits the Trend?",
    description:
      "Compare Dreamina and VideoBulin47 for the Bulin 47 trend. Learn when a general AI video editor is better and when a one-photo tool is faster.",
    intro:
      "Dreamina is a flexible AI creation platform. VideoBulin47 is intentionally narrow. The right choice depends on whether you want an open editor or a trend-specific one-photo workflow.",
    sections: [
      {
        heading: "Dreamina strengths",
        paragraphs: [
          "Dreamina gives creators more room to experiment with image generation, video prompts, and editing controls. It is useful when the goal is a new scene rather than a fixed trend template.",
        ],
      },
      {
        heading: "VideoBulin47 strengths",
        paragraphs: [
          "VideoBulin47 fixes the reference motion and asks for a portrait. There are fewer decisions, the credit cost is visible before submission, and the output is made for a vertical feed.",
        ],
      },
      {
        heading: "Cost and margin",
        paragraphs: [
          "Every render has a provider cost. VideoBulin47 calculates the credit cost before submission and blocks a render if the provider cost would fall below the configured margin.",
        ],
      },
      {
        heading: "Which one should you choose?",
        bullets: [
          "Choose Dreamina for open-ended AI generation",
          "Choose VideoBulin47 for the Bulin 47 format",
          "Test the cheapest clip before a longer render",
          "Compare the final likeness before buying a larger pack",
        ],
      },
    ],
    faqs: commonFaqs,
    cta: true,
  },
  "bulin-47-ai-vs-capcut": {
    slug: "bulin-47-ai-vs-capcut",
    kind: "guide",
    eyebrow: "Comparison",
    title: "Bulin 47 AI vs CapCut: Generate First or Edit First?",
    description:
      "Compare CapCut editing with a one-photo Bulin 47 AI workflow. Learn when to edit manually and when to generate the full trend clip.",
    intro:
      "CapCut is a manual editor. VideoBulin47 is a generation workflow. They solve different parts of the same social video problem.",
    sections: [
      {
        heading: "CapCut is for editing",
        paragraphs: [
          "CapCut is useful for captions, cutting, color, sound alignment, and platform-specific polish. It assumes you already have footage or a generated clip to work with.",
        ],
      },
      {
        heading: "VideoBulin47 is for generation",
        paragraphs: [
          "The Studio turns one portrait into a vertical freestyle clip. You do not need a timeline or a manual motion-matching workflow.",
        ],
      },
      {
        heading: "A practical workflow",
        bullets: [
          "Generate the base video in the Studio",
          "Open the MP4 in CapCut if you need captions or trims",
          "Add the platform's licensed sound when required",
          "Label the video as AI-generated before posting",
        ],
      },
    ],
    faqs: commonFaqs,
    cta: true,
  },
  "bulin-47-ai-vs-kling": {
    slug: "bulin-47-ai-vs-kling",
    kind: "guide",
    eyebrow: "Model guide",
    title: "Bulin 47 AI and Kling: The Model Behind the Motion",
    description:
      "See why a Kling-style reference-video model fits the Bulin 47 trend and how VideoBulin47 packages the workflow for one-photo generation.",
    intro:
      "The quality of a one-photo trend video depends on the model underneath. Kling O3 Reference V2V is used because it accepts a reference video and a portrait image.",
    sections: [
      {
        heading: "Why reference video matters",
        paragraphs: [
          "A generic image-to-video model invents the motion. A video-to-video reference model follows the source motion, camera language, and timing instead.",
        ],
      },
      {
        heading: "What VideoBulin47 adds",
        paragraphs: [
          "The app handles private uploads, credit reservation, asynchronous jobs, provider webhooks, failure refunds, and download history. The user only has to provide one portrait and choose a length.",
        ],
      },
      {
        heading: "Model alternatives",
        paragraphs: [
          "Kling O3 Standard is the default. Kling O3 Pro and MiniMax H3 are available as higher-cost alternatives. Every option runs through the same margin guard.",
        ],
      },
    ],
    faqs: commonFaqs,
    cta: true,
  },
  faq: {
    slug: "faq",
    kind: "page",
    eyebrow: "Help",
    title: "Frequently Asked Questions",
    description:
      "Answers about Bulin 47 AI videos, photos, credits, payments, refunds, privacy, and AI content rules.",
    intro:
      "Everything important about the product is summarized here. For an account or billing issue, contact support with the order email or payment reference.",
    sections: [
      {
        heading: "Product",
        paragraphs: [
          "VideoBulin47 creates a vertical AI video from one portrait and a reference video template. The completed MP4 is available in your account.",
        ],
      },
      {
        heading: "Payments and credits",
        paragraphs: [
          "Credit packs are sold as one-time purchases. Unused credits remain in your account. A failed generation is refunded automatically.",
        ],
      },
      {
        heading: "Safety",
        paragraphs: [
          "Do not upload minors, public figures, celebrities, or people who have not consented. Do not use the service to impersonate or deceive.",
        ],
      },
    ],
    faqs: commonFaqs,
  },
  about: {
    slug: "about",
    kind: "page",
    eyebrow: "About",
    title: "About VideoBulin47",
    description:
      "VideoBulin47 is an independent fan-made AI video tool for creating a personalized Bulin 47 freestyle clip from one photo.",
    intro:
      "VideoBulin47 is a small web app for a specific trend. It is not an official artist page, music service, or social network.",
    sections: [
      {
        heading: "What we do",
        paragraphs: [
          "We connect a reference-video AI model, a private upload flow, and a simple credit system. The goal is to make one specific video format fast and predictable.",
        ],
      },
      {
        heading: "Independence",
        paragraphs: [
          "VideoBulin47 is not affiliated with Bulin 47, Kevin Wai, their labels, TikTok, Instagram, or YouTube. Names and trademarks belong to their respective owners.",
        ],
      },
      {
        heading: "Contact",
        paragraphs: [
          "For product help, billing questions, or takedown requests, email support@videobulin47.net.",
        ],
      },
    ],
  },
  terms: {
    slug: "terms",
    kind: "legal",
    eyebrow: "Legal",
    title: "Terms of Service",
    description:
      "The terms governing access to VideoBulin47, accounts, credit purchases, AI generation, and acceptable use.",
    intro:
      "By using VideoBulin47, you agree to these terms. If you do not agree, do not use the service.",
    updated: "October 13, 2026",
    sections: [
      {
        heading: "The service",
        paragraphs: [
          "VideoBulin47 provides a hosted interface for submitting a portrait to an AI video generation provider and receiving a generated output. The service is offered as-is and may change or stop.",
        ],
      },
      {
        heading: "Accounts",
        paragraphs: [
          "You are responsible for the activity on your account, for keeping your login secure, and for providing accurate contact information. You must be at least 18 years old to purchase credits.",
        ],
      },
      {
        heading: "Credits and payments",
        paragraphs: [
          "Credit packs are one-time digital purchases. Credits have no cash value, cannot be transferred, and are used to reserve generation jobs. Waffo Pancake processes payments as the Merchant of Record and handles applicable taxes.",
        ],
      },
      {
        heading: "AI outputs",
        paragraphs: [
          "AI outputs can be inaccurate, unexpected, or visually imperfect. You are responsible for reviewing the result before posting it and for following platform rules on synthetic media and music.",
        ],
      },
      {
        heading: "Prohibited use",
        paragraphs: [
          "You may not upload minors, public figures, non-consenting people, illegal content, sexual content, hateful content, or material intended to impersonate or deceive. The Acceptable Use Policy is part of these terms.",
        ],
      },
      {
        heading: "Limitation of liability",
        paragraphs: [
          "To the maximum extent permitted by law, VideoBulin47 is not liable for indirect or consequential damages. Our total liability is limited to the amount paid for the affected credit pack.",
        ],
      },
    ],
  },
  privacy: {
    slug: "privacy",
    kind: "legal",
    eyebrow: "Legal",
    title: "Privacy Policy",
    description:
      "How VideoBulin47 collects, uses, stores, and deletes account, payment, upload, and generation data.",
    intro:
      "We collect only the data needed to run the account, process payments, generate videos, and keep the service safe.",
    updated: "October 13, 2026",
    sections: [
      {
        heading: "Data we collect",
        bullets: [
          "Account email and authentication information",
          "Credit wallet, order, and transaction records",
          "Uploaded photos and generated video files",
          "Device, browser, and security logs",
          "Support messages and content reports",
        ],
      },
      {
        heading: "How we use data",
        paragraphs: [
          "We use the data to authenticate you, deliver credits, submit generation jobs, display your history, prevent abuse, provide support, and meet legal or payment-provider obligations.",
        ],
      },
      {
        heading: "Subprocessors",
        paragraphs: [
          "Supabase provides authentication, database, and storage. fal.ai provides model inference. Waffo Pancake provides checkout, tax handling, and payment processing. Email and analytics providers may process limited operational data.",
        ],
      },
      {
        heading: "Retention",
        paragraphs: [
          "Uploads and outputs are kept for as long as needed to provide the service or until you delete them. Some payment and security records must be retained longer to meet legal and fraud-prevention requirements.",
        ],
      },
      {
        heading: "Your choices",
        paragraphs: [
          "You can request access, correction, deletion, or a copy of your account data by emailing support@videobulin47.net. Deletion may be limited by legal retention requirements.",
        ],
      },
    ],
  },
  refund: {
    slug: "refund",
    kind: "legal",
    eyebrow: "Legal",
    title: "Refund Policy",
    description:
      "Refund rules for digital credit packs, failed generations, duplicate charges, and unused credits.",
    intro:
      "We want the credit system to be clear. Failed generations are refunded automatically. Unused packs can be reviewed manually.",
    updated: "October 13, 2026",
    sections: [
      {
        heading: "Failed generations",
        paragraphs: [
          "If the provider reports a failed, canceled, moderated, or invalid generation, the reserved credits are returned to your wallet automatically. No support ticket is required for the automatic refund.",
        ],
      },
      {
        heading: "Unused credits",
        paragraphs: [
          "You may request a refund for an unused credit pack within 14 days of purchase. Credits that have been spent on a completed video are not refundable.",
        ],
      },
      {
        heading: "Duplicate or unauthorized charges",
        paragraphs: [
          "Contact support@videobulin47.net with the order email, payment reference, and purchase date. We will investigate the payment record and coordinate any approved refund through Waffo Pancake.",
        ],
      },
      {
        heading: "Digital delivery",
        paragraphs: [
          "Credits are delivered immediately after verified payment. In the EU and UK, requesting immediate delivery may affect the statutory withdrawal right once credits are used.",
        ],
      },
    ],
  },
  "acceptable-use": {
    slug: "acceptable-use",
    kind: "legal",
    eyebrow: "Legal",
    title: "Acceptable Use Policy",
    description:
      "Content and behavior rules for AI video generation, including consent, likeness, deepfakes, copyright, and enforcement.",
    intro:
      "This policy applies to uploads, prompts, generated outputs, account names, and any use of the service.",
    updated: "October 13, 2026",
    sections: [
      {
        heading: "Prohibited content",
        bullets: [
          "Pornography, sexual content, or nudity",
          "Violence, gore, or threats",
          "Hate speech, harassment, or discrimination",
          "Child-unsafe content or any content involving minors",
          "Deepfakes, impersonation, or misleading identity use",
          "Copyright or trademark infringement",
        ],
      },
      {
        heading: "Consent and likeness",
        paragraphs: [
          "Only upload a photo if you are the person shown or have documented permission from that person. Public figures, celebrities, politicians, and minors may not be used. You must not use the result to deceive viewers or damage another person.",
        ],
      },
      {
        heading: "Moderation",
        paragraphs: [
          "We may screen prompts, uploads, and outputs with automated tools. A request may be blocked before generation or removed after review. Repeated violations can lead to suspension and credit forfeiture.",
        ],
      },
      {
        heading: "Reporting",
        paragraphs: [
          "Reports can be sent to support@videobulin47.net. Include the video ID or page URL, the reason for the report, and your relationship to the person or rights holder.",
        ],
      },
    ],
  },
  dmca: {
    slug: "dmca",
    kind: "legal",
    eyebrow: "Legal",
    title: "DMCA and Content Removal",
    description:
      "Submit a copyright or likeness removal request for content hosted or generated through VideoBulin47.",
    intro:
      "If you believe your rights are being infringed, send a complete notice so we can review and act.",
    updated: "October 13, 2026",
    sections: [
      {
        heading: "What to include",
        bullets: [
          "Your name, address, phone number, and email",
          "Identification of the protected work or right",
          "The URL or video ID of the disputed material",
          "A statement that the use is unauthorized",
          "A statement that your notice is accurate",
          "Your physical or electronic signature",
        ],
      },
      {
        heading: "Where to send it",
        paragraphs: [
          "Email support@videobulin47.net with the subject line DMCA Notice. We may ask for additional information before removing content.",
        ],
      },
      {
        heading: "Counter notices",
        paragraphs: [
          "If your content was removed and you believe the removal was mistaken, send a counter notice with the same contact information and a statement explaining why the material should be restored.",
        ],
      },
    ],
  },
  contact: {
    slug: "contact",
    kind: "legal",
    eyebrow: "Support",
    title: "Contact VideoBulin47",
    description:
      "Contact VideoBulin47 for account help, billing questions, content reports, refunds, and removal requests.",
    intro:
      "Email is the fastest way to reach us. Include the email used at checkout or your account email.",
    sections: [
      {
        heading: "Product and account support",
        paragraphs: [
          "Email support@videobulin47.net with the subject line Account Help. Include your account email and a short description of the issue.",
        ],
      },
      {
        heading: "Billing and refunds",
        paragraphs: [
          "Use the subject line Billing. Include the order email, payment date, amount, and payment reference. Do not send full card numbers or passwords.",
        ],
      },
      {
        heading: "Content reports",
        paragraphs: [
          "Use the subject line Content Report. Include the video ID or page URL and the reason for the report.",
        ],
      },
      {
        heading: "Business",
        paragraphs: [
          "For licensing, media, or partnership inquiries, email support@videobulin47.net with the subject line Business.",
        ],
      },
    ],
  },
};

export const guidePages = Object.values(contentPages).filter(
  (page) => page.kind === "guide",
);

export const legalPages = Object.values(contentPages).filter(
  (page) => page.kind === "legal",
);
