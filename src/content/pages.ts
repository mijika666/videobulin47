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
    question: "What image works best?",
    answer:
      "Use one sharp, well-lit image of a pet, an animal, a virtual character, or an object. The subject should fill most of the frame. Avoid heavy filters, cluttered backgrounds, and any photograph of a real person.",
  },
  {
    question: "What happens if a generation fails?",
    answer:
      "Reserved credits are refunded automatically when the provider reports a failed, canceled, or moderated generation.",
  },
  {
    question: "What content is not allowed?",
    answer:
      "No pornography or nudity, violence, hate speech, content involving minors, deepfakes or impersonation, copyright infringement, or non-consensual intimate imagery (NCII). NCII is a zero-tolerance violation: reported material is blocked or removed on a priority basis and the account behind it is terminated without refund.",
  },
  {
    question: "Are credits refundable?",
    answer:
      "Unused credit packs can be refunded in full within 7 days of purchase. Credits spent on a completed video are not refundable. EU, UK, and Australian first-time buyers keep their statutory withdrawal rights. See the Refund Policy for the full process.",
  },
  {
    question: "Which AI models power the video generation?",
    answer:
      "VideoBulin47 runs third-party video models served through the fal.ai inference platform: Seedance 2.5 (ByteDance), MiniMax H3 (MiniMax), and Kling O3 Reference and Kling O3 Reference Pro (Kuaishou). Every model follows the built-in motion reference to drive the movement and can keep the original audio. You pick the model in the Studio before you generate, and each job records which model produced it.",
  },
];

export const contentPages: Record<string, ContentPage> = {
  "how-to-make-bulin-47-ai-video": {
    slug: "how-to-make-bulin-47-ai-video",
    kind: "guide",
    updated: "October 14, 2026",
    eyebrow: "Step-by-step guide",
    title: "How to Make a Bulin 47 AI Video From One Photo",
    description:
      "Learn how to make a Bulin 47 AI video from one image. Upload a pet, an animal, or a virtual character, choose the clip length, generate the video, and post it to TikTok, Reels, or Shorts.",
    intro:
      "The fastest way to join the trend is to start with one clear image. VideoBulin47 keeps the freestyle motion, camera movement, and rhythm, then animates the subject you uploaded inside that scene.",
    sections: [
      {
        heading: "1. Pick the right image",
        paragraphs: [
          "Use one clear image of a pet, an animal, or a virtual character. The best results come from a sharp image with even lighting where the subject fills most of the frame. Avoid busy filters and images where another subject overlaps yours.",
          "This service does not accept photographs of real people, including yourself, celebrities, politicians, and minors.",
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
          "Open the Studio, upload the image, confirm the image source, and select Generate. Credits are reserved when the request is submitted. If the render fails or is blocked, the reservation is returned automatically.",
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
    updated: "October 14, 2026",
    eyebrow: "Trend explainer",
    title: "Bulin 47 AI Trend: Why One Photo Is Enough",
    description:
      "Understand the Bulin 47 AI trend, the original freestyle format, and why creators animate one image into their own version for TikTok and Reels.",
    intro:
      "The Bulin 47 AI trend keeps the recognizable freestyle rhythm while swapping in a subject you supply. Because that subject is a pet, an animal, or a virtual character, no real performer is copied.",
    sections: [
      {
        heading: "What the trend is",
        paragraphs: [
          "Bulin 47 is a Dominican dembow artist. A short freestyle clip filmed with creator Kevin Wai spread across TikTok and Instagram, and viewers began making their own versions.",
          "Instead of learning the dance or filming on location, creators use an AI image-to-video workflow. A built-in motion reference supplies the rhythm and camera language, while one image supplies the subject.",
        ],
      },
      {
        heading: "Why it spread so quickly",
        paragraphs: [
          "The format is easy to understand in a few seconds. It has a clear before-and-after reveal, a recognizable rhythm, and a result that friends can compare in a group chat. Those are the same ingredients that make many social trends travel quickly.",
        ],
      },
      {
        heading: "How the motion reference works",
        paragraphs: [
          "A reference-to-video model reviews the motion template and the image you uploaded, then generates a new take that follows the original timing and camera path. The quality depends on the image, the template, and the model.",
          "VideoBulin47 uses a staged workflow: reserve credits, submit the job to the provider queue, wait for the webhook, and save the completed MP4 to the user account.",
        ],
      },
      {
        heading: "Use it responsibly",
        paragraphs: [
          "Upload non-human subjects only: pets, animals, virtual characters, or objects. Photographs of real people are not accepted, and results must never be used to impersonate or mislead anyone. Label synthetic media when you post it.",
        ],
      },
    ],
    faqs: commonFaqs,
    cta: true,
  },
  "bulin-47-ai-video": {
    slug: "bulin-47-ai-video",
    kind: "guide",
    updated: "October 14, 2026",
    eyebrow: "Product guide",
    title: "Bulin 47 AI Video Generator",
    description:
      "Create a Bulin 47 AI video online. Upload one image of a non-human subject, keep the original motion and sound, and download a vertical MP4 for TikTok, Reels, and Shorts.",
    intro:
      "VideoBulin47 is a one-image AI video generator for the Bulin 47 freestyle trend. It removes the need to film, learn choreography, or edit a timeline.",
    sections: [
      {
        heading: "One template, one clear result",
        paragraphs: [
          "The product is deliberately narrow. You are not asked to write a prompt or build a shot list. The template defines the motion and pacing, and your image supplies the subject.",
        ],
      },
      {
        heading: "Built for mobile posting",
        paragraphs: [
          "Every render is prepared for a vertical 9:16 feed. Download the MP4 and upload it directly to TikTok, Instagram Reels, or YouTube Shorts. The export stays in sync with the beat of the scene, so the clip lands correctly in a feed.",
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
    updated: "October 14, 2026",
    eyebrow: "Template guide",
    title: "Bulin 47 AI Template for TikTok and Reels",
    description:
      "See what the Bulin 47 AI template does, how the source clip controls motion, and why the template gives more consistent results than a generic video prompt.",
    intro:
      "A template is not just a preset style. It is a motion reference that supplies movement, timing, and camera behaviour for every generation.",
    sections: [
      {
        heading: "Why a template beats a prompt",
        paragraphs: [
          "A text-only prompt has to invent the scene, motion, camera, and subject at the same time. A template already contains those decisions, so the model can focus on animating the subject you supplied.",
        ],
      },
      {
        heading: "What stays the same",
        paragraphs: [
          "The motion template keeps the freestyle timing, background action, and overall camera language. Your image supplies the subject that the model animates inside that motion.",
          "Every other figure in the frame is a generated virtual character. The finished clip is not built from footage of real people, and no real person's face is reproduced.",
        ],
      },
      {
        heading: "What can change",
        paragraphs: [
          "Colour, texture, proportions, and the exact silhouette can shift as the model interprets the image. One clear image gives the model less to guess.",
        ],
      },
      {
        heading: "Rights and permissions",
        paragraphs: [
          "Before publishing a public template, the operator needs the rights required for the source video and music. Users confirm that each image they upload is their own material, or that they hold documented permission to use it, and that it shows no real person.",
        ],
      },
    ],
    faqs: commonFaqs,
    cta: true,
  },
  "bulin-47-meme": {
    slug: "bulin-47-meme",
    kind: "guide",
    updated: "October 14, 2026",
    eyebrow: "Ideas",
    title: "Bulin 47 AI Meme Ideas",
    description:
      "Get clean Bulin 47 AI meme ideas for pets, virtual characters, and short-form video. Keep the joke easy to read and the subject non-human.",
    intro:
      "The best versions of this trend are easy to understand without setup. The reveal does the work. Keep the joke short and make your subject the star.",
    sections: [
      {
        heading: "Group chat cast",
        paragraphs: [
          "Make one version for each pet, avatar, or mascot in your circle and post them as a carousel or a stitched sequence. The contrast between different subjects is usually funnier than a complex edit.",
        ],
      },
      {
        heading: "Before-and-after",
        paragraphs: [
          "Show the uploaded image for one second, then cut to the generated freestyle. This format makes the change obvious and gives viewers a reason to watch until the end.",
        ],
      },
      {
        heading: "Office or hobby jokes",
        paragraphs: [
          "A caption can set up a simple context, such as the smallest pet in the house finally taking the microphone. Keep the caption under ten words and avoid targeting anyone in a harmful way.",
        ],
      },
      {
        heading: "Safety rules",
        bullets: [
          "Upload images of non-human subjects only",
          "Never upload photographs of real people, minors, celebrities, or public figures",
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
    updated: "October 14, 2026",
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
          "A video model has to process the motion template, the uploaded image, motion, frames, audio, and encoding. The provider charges the website per second of output. Payment processing and storage add more cost.",
        ],
      },
      {
        heading: "How to keep the first test small",
        paragraphs: [
          "Start with the lowest-cost pack and a five-second preview. Once the subject and motion look right, use the same image for a longer social render.",
        ],
      },
      {
        heading: "What you get for the price",
        bullets: [
          "Private image upload",
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
    updated: "October 14, 2026",
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
          "AI tools turn the footage into a reusable motion reference. The model follows the original rhythm and camera work while animating the subject from your uploaded image.",
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
          "If you have a clear image of a pet, an animal, or a virtual character, the Studio can create a new vertical video from the motion template.",
        ],
      },
    ],
    faqs: commonFaqs,
    cta: true,
  },
  "how-to-add-bulin-47-sound": {
    slug: "how-to-add-bulin-47-sound",
    kind: "guide",
    updated: "October 14, 2026",
    eyebrow: "Audio guide",
    title: "How to Add the Bulin 47 Sound to Your AI Video",
    description:
      "Learn how audio is handled in a Bulin 47 AI video, and what to do when a clip needs a licensed sound before you publish it.",
    intro:
      "An export carries the audio track that came with the motion template. If you want the track that is trending on a platform, add it from that app's licensed sound library before you publish.",
    sections: [
      {
        heading: "Audio in the export",
        paragraphs: [
          "VideoBulin47 asks the provider to keep the template's audio track, so the movement stays in sync with the beat that was used to build the clip.",
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
    updated: "October 14, 2026",
    eyebrow: "Search guide",
    title: "Dame Hombro Bulin 47 AI Video",
    description:
      "Looking for the Dame Hombro Bulin 47 trend? Learn how the phrase is used online and how to create an image-led AI video version.",
    intro:
      "Dame Hombro is one of the phrases people use while searching for the song, the dance, or a related social clip. Use the same one-image workflow to create your own version.",
    sections: [
      {
        heading: "What people are looking for",
        paragraphs: [
          "Some searches are for the original audio. Others are looking for a dance clip, a lyric, or a way to join the trend with an image. The search intent is mixed, so the result should make the next step obvious.",
        ],
      },
      {
        heading: "Create with one image",
        paragraphs: [
          "Upload one clear image of a non-human subject, select the clip length, and generate a vertical video. The template supplies the motion and rhythm.",
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
    updated: "October 14, 2026",
    eyebrow: "Comparison",
    title: "Higgsfield vs VideoBulin47 for the Bulin 47 Trend",
    description:
      "Compare a general AI video platform with a focused Bulin 47 one-image workflow. Choose based on speed, control, and the type of result you need.",
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
        heading: "Focused one-image workflow",
        paragraphs: [
          "VideoBulin47 fixes the template and asks for one image. This reduces the number of decisions and keeps the output centered on the freestyle motion.",
        ],
      },
      {
        heading: "Which should you use?",
        bullets: [
          "Choose a general platform for original scenes and full creative control",
          "Choose VideoBulin47 for a faster trend-specific clip",
          "Test one short render before buying a larger credit pack",
          "Always check model terms and content policies",
        ],
      },
    ],
    faqs: commonFaqs,
    cta: true,
  },
  "bulin-47-viral-video": {
    slug: "bulin-47-viral-video",
    kind: "guide",
    updated: "October 14, 2026",
    eyebrow: "Viral video",
    title: "Bulin 47 Viral Video: Why the Freestyle Took Over",
    description:
      "Understand the Bulin 47 viral video, its TikTok and Instagram spread, and how to make your own one-image version.",
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
          "Viewers started asking how to put their own subject into the clip. The most consistent answer is a reference-video workflow: keep the original motion and animate a subject you supply from one image.",
        ],
      },
      {
        heading: "Make the viral version with one image",
        paragraphs: [
          "VideoBulin47 pairs a motion template with one image. The template supplies the timing and movement, while the image supplies the subject that gets animated.",
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
    updated: "October 14, 2026",
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
          "Upload one clear image of a non-human subject, choose the clip length, and let the template handle the motion and rhythm. The result is a vertical AI video made for short-form feeds.",
        ],
      },
    ],
    faqs: commonFaqs,
    cta: true,
  },
  "kevin-wai-bulin-47": {
    slug: "kevin-wai-bulin-47",
    kind: "guide",
    updated: "October 14, 2026",
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
          "Once the clip became a recognizable format, viewers wanted to drop their own subject into the same performance. An image-to-video model makes that possible without filming a new scene.",
        ],
      },
      {
        heading: "Respect the original rights",
        paragraphs: [
          "The source footage and music may be protected. A fan-made tool should not claim official affiliation, and a public template needs a licence for the source footage and music.",
        ],
      },
      {
        heading: "Create your own version",
        paragraphs: [
          "Upload an image of a non-human subject, keep the original motion, and label the output as AI-generated when you post it.",
        ],
      },
    ],
    faqs: commonFaqs,
    cta: true,
  },
  "quien-es-bulin-47": {
    slug: "quien-es-bulin-47",
    kind: "guide",
    updated: "October 14, 2026",
    lang: "es",
    eyebrow: "Guía del artista",
    title: "Quién es Bulin 47: Edad, Freestyle y Video Viral",
    description:
      "Quién es Bulin 47, por qué se hizo viral el freestyle, qué significa Dame Hombro y cómo crear tu propia versión con una imagen.",
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
          "La versión AI usa una plantilla de movimiento y la imagen de un sujeto no humano como referencia. El resultado conserva el ritmo y el encuadre del clip original.",
        ],
      },
      {
        heading: "Publica con responsabilidad",
        paragraphs: [
          "Sube solo imágenes de sujetos no humanos: mascotas, animales o personajes virtuales. No subas fotos de personas reales, menores, celebridades ni figuras públicas. Etiqueta el video como generado por IA.",
        ],
      },
    ],
    faqs: commonFaqs,
    cta: true,
  },
  "bulin-47-ai-vs-dreamina": {
    slug: "bulin-47-ai-vs-dreamina",
    kind: "guide",
    updated: "October 14, 2026",
    eyebrow: "Comparison",
    title: "Bulin 47 AI vs Dreamina: Which Workflow Fits the Trend?",
    description:
      "Compare Dreamina and VideoBulin47 for the Bulin 47 trend. Learn when a general AI video editor is better and when a one-image tool is faster.",
    intro:
      "Dreamina is a flexible AI creation platform. VideoBulin47 is intentionally narrow. The right choice depends on whether you want an open editor or a trend-specific one-image workflow.",
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
          "VideoBulin47 fixes the reference motion and asks for one image. There are fewer decisions, the credit cost is visible before submission, and the output is made for a vertical feed.",
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
          "Compare the final result before buying a larger pack",
        ],
      },
    ],
    faqs: commonFaqs,
    cta: true,
  },
  "bulin-47-ai-vs-capcut": {
    slug: "bulin-47-ai-vs-capcut",
    kind: "guide",
    updated: "October 14, 2026",
    eyebrow: "Comparison",
    title: "Bulin 47 AI vs CapCut: Generate First or Edit First?",
    description:
      "Compare CapCut editing with a one-image Bulin 47 AI workflow. Learn when to edit manually and when to generate the full trend clip.",
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
          "The Studio turns one image into a vertical freestyle clip. You do not need a timeline or a manual motion-matching workflow.",
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
    updated: "October 14, 2026",
    eyebrow: "Model guide",
    title: "Bulin 47 AI and Kling: The Model Behind the Motion",
    description:
      "See why a Kling-style reference-video model fits the Bulin 47 trend and how VideoBulin47 packages the workflow for one-image generation.",
    intro:
      "The quality of a one-image trend video depends on the model underneath. VideoBulin47 runs reference-video models that accept one image together with a motion clip, so the result follows the source choreography instead of inventing it.",
    sections: [
      {
        heading: "Why the motion reference matters",
        paragraphs: [
          "A generic image-to-video model invents the motion. A video-to-video reference model follows the source motion, camera language, and timing instead.",
        ],
      },
      {
        heading: "What VideoBulin47 adds",
        paragraphs: [
          "The app handles private uploads, credit reservation, asynchronous jobs, provider webhooks, failure refunds, and download history. The user only has to provide one image and choose a length.",
        ],
      },
      {
        heading: "Model alternatives",
        paragraphs: [
          "MiniMax H3 is the default: it takes multiple reference clips at a reasonable cost. Seedance 2.5 is the highest-detail option and accepts the most reference clips, while Kling O3 Reference and Kling O3 Reference Pro follow a single reference clip each. Every option shows its exact credit reservation in the Studio before you generate.",
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
      "Answers about Bulin 47 AI videos, supported image types, credits, payments, refunds, privacy, and AI content rules.",
    intro:
      "Everything important about the product is summarized here. For an account or billing issue, contact support with the order email or payment reference.",
    sections: [
      {
        heading: "Product",
        paragraphs: [
          "VideoBulin47 creates a vertical AI video from one image of a non-human subject and a built-in motion template. The completed MP4 is available in your account.",
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
          "Photographs of real people are not accepted. That includes minors, public figures, celebrities, and yourself. Do not use the service to impersonate or deceive.",
          "Non-consensual intimate imagery (NCII) is banned outright. Do not create, alter, or share sexual or intimate depictions of a real person without their consent, including nonconsensual sexual deepfakes, nudified images, revenge imagery, or sextortion material. Reports of NCII are removed on a priority basis and the account behind them is terminated.",
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
      "VideoBulin47 is an independent fan-made AI video tool for animating one image of a pet, an animal, or a virtual character into a Bulin 47 freestyle clip.",
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
        heading: "Models we use",
        paragraphs: [
          "Video generation is powered by third-party video models served through the fal.ai inference platform. The current models are Seedance 2.5 (built by ByteDance), MiniMax H3 (built by MiniMax), and Kling O3 Reference and Kling O3 Reference Pro (built by Kuaishou).",
          "Every model uses the built-in motion template to drive the movement and can keep the original audio. Uploads and generated videos stay in private storage buckets.",
          "You choose the model in the Studio before you generate, and every job stores the model that produced it. We disclose the model names here so you know exactly which system is processing your image, rather than only naming the inference provider.",
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
      "The terms governing access to VideoBulin47, accounts, credit purchases, the underlying AI models, AI generation, and acceptable use.",
    intro:
      "By using VideoBulin47, you agree to these terms. If you do not agree, do not use the service.",
    updated: "October 14, 2026",
    sections: [
      {
        heading: "1. Acceptance of terms",
        paragraphs: [
          "Welcome to VideoBulin47 (\"VideoBulin47\", \"we\", \"us\" or \"our\"). VideoBulin47 is an independent business operated by an individual operator based in Nanning, Guangxi, China. These Terms of Service (\"Terms\") govern your access to and use of our AI video service, available at https://www.videobulin47.net (the \"Service\").",
          "By creating an account, buying credits, or otherwise using the Service, you confirm that: (a) you are at least 18 years old; (b) you have read, understood, and agree to be bound by these Terms; (c) you agree to our Privacy Policy; and (d) you have authority to enter into this agreement on your own behalf or on behalf of the organization you represent.",
          "Important: if you do not agree to these Terms, stop using the Service. Continuing to use the Service after an update means you accept the revised Terms.",
        ],
      },
      {
        heading: "2. The service",
        paragraphs: [
          "2.1 What we provide. VideoBulin47 is a hosted interface that turns one uploaded image of a non-human subject into a vertical AI-generated video using a built-in motion template. The Service is a digital software-as-a-service product delivered over the internet.",
          "2.2 Nature of the service. The Service is a digital, intangible product. Access is granted immediately after your payment is confirmed. Because delivery is immediate, refunds are subject to the limits in Section 7.",
          "2.3 AI model dependency. We rely on third-party AI model providers. Video generation is performed by the Seedance 2.5 model (built by ByteDance), the MiniMax H3 model (built by MiniMax), and the Kling O3 Reference and Kling O3 Reference Pro models (built by Kuaishou), each served through the fal.ai inference platform. Output quality and availability depend on those models, and the Service may be affected by their uptime and behavior. We will notify users of significant outages.",
        ],
      },
      {
        heading: "3. Accounts",
        paragraphs: [
          "3.1 Account creation. Using the Service requires an account created with accurate and complete information. You are responsible for keeping your login credentials confidential and for all activity under your account.",
          "3.2 Account security. If you discover unauthorized use, contact support@videobulin47.net immediately. Do not share your login credentials with anyone. Keep the email address on your account current and reachable.",
          "3.3 Business accounts. If you register on behalf of a company or organization, you confirm that you are authorized to enter into this agreement for that entity.",
        ],
      },
      {
        heading: "4. Credits and top-up packs",
        paragraphs: [
          "The Service is credit-based. You buy one-time credit packs and spend credits to run generation jobs. Credits are used to access the Service, and a job reserves credits from your wallet before it is submitted.",
          "Credits are not a subscription. You are never charged on a recurring basis. You can buy another pack at any time. Current packs and prices are listed at https://www.videobulin47.net/pricing.",
          "Credits do not expire, have no cash value, and cannot be transferred or exchanged.",
        ],
      },
      {
        heading: "5. Billing and payment",
        paragraphs: [
          "5.1 Single top-up authorization. Every top-up is a one-time transaction. Completing a purchase authorizes VideoBulin47 to charge the amount shown at checkout to your payment method.",
          "5.2 Auto-recharge. We do not currently offer auto-recharge. If we introduce it, we will first update these Terms and ask for your explicit authorization.",
          "5.3 Taxes. Prices shown do not include applicable taxes unless stated otherwise. Waffo Pancake acts as the Merchant of Record, handles checkout, and collects and remits applicable taxes where required by law.",
        ],
      },
      {
        heading: "6. Credit validity and account termination",
        paragraphs: [
          "6.1 Credit validity. Purchased credits do not expire. Because credits never lapse, no expiry reminder is required.",
          "6.2 Account termination. If your account is terminated, unused credits remain available for 30 days. After that period they expire and are non-refundable, unless applicable law requires otherwise.",
        ],
      },
      {
        heading: "7. Refund policy",
        paragraphs: [
          "Spent credits are non-refundable in principle. The following are exceptions:",
        ],
        bullets: [
          "Unused credits within 7 days of purchase: full refund.",
          "Duplicate charges caused by a billing error: full refund.",
          "Failed generations: reserved credits are returned to your wallet automatically, with no support ticket required.",
          "Statutory rights (EU, UK, and Australia): first-time buyers keep their 14-day withdrawal right; it no longer applies once credits have been used.",
        ],
      },
      {
        heading: "8. Billing disputes",
        paragraphs: [
          "If you believe a charge is wrong, email support@videobulin47.net before opening a dispute with your bank. We aim to reply within 2 business days and to resolve confirmed billing errors within 5 business days.",
        ],
      },
      {
        heading: "9. AI content and intellectual property",
        paragraphs: [
          "9.1 Output ownership. Subject to these Terms, the AI content generated from your input (the \"Output\") belongs to you, and you may use it for any lawful purpose permitted by Section 10.",
          "9.2 Input license. By submitting content to the Service (\"Input\"), you grant VideoBulin47 a limited, non-exclusive license to use that Input only to provide the Service to you. We will not use your Input to train AI models without your explicit consent.",
          "9.3 Third-party AI models. The Service uses third-party AI model providers, namely ByteDance (Seedance), MiniMax, and Kuaishou (Kling), served through fal.ai. Output may be influenced by those providers' models. We do not guarantee any specific output quality and are not responsible for content produced by a third-party model.",
          "9.4 AI output accuracy. AI-generated content may contain errors or inaccuracies. You are responsible for reviewing and verifying Output before relying on it.",
        ],
      },
      {
        heading: "10. Acceptable use",
        paragraphs: [
          "10.1 Allowed use. You may use the Service only for lawful purposes consistent with these Terms and the Acceptable Use Policy, which forms part of these Terms.",
        ],
        bullets: [
          "Do not generate illegal, defamatory, harassing, or fraudulent content.",
          "Do not create deepfakes or synthetic media that impersonates a real person or misleads viewers about its origin or authenticity.",
          "Do not create, alter, or distribute non-consensual intimate imagery (NCII), including nonconsensual sexual deepfakes, nudified images, revenge imagery, or sextortion material.",
          "Do not generate sexualized content involving minors or content that violates child protection laws.",
          "Do not create malware, phishing content, or attack tooling.",
          "Do not infringe any third party's intellectual property, publicity, or privacy rights.",
          "Do not bypass or interfere with the Service's security features.",
          "Do not resell or sublicense access without prior written approval.",
          "Do not violate any applicable law, regulation, or card network rule.",
          "Do not use the Input, Output, model responses, or derived data to train, fine-tune, benchmark, distill, or otherwise develop a competing AI or machine learning model.",
          "Do not systematically scrape or harvest model outputs for any purpose beyond your own authorized use.",
          "Do not present AI-generated content as the work of a licensed human professional such as a doctor, lawyer, or financial adviser.",
        ],
      },
      {
        heading: "11. Data, privacy, and security",
        paragraphs: [
          "Your use of the Service is governed by our Privacy Policy at https://www.videobulin47.net/privacy. Payment card data is handled exclusively by our PCI-DSS compliant payment processor, Waffo Pancake, and is never stored on our servers. Account data is retained for 90 days after cancellation and is then deleted.",
        ],
      },
      {
        heading: "12. Disclaimers and limitation of liability",
        paragraphs: [
          "12.1 Disclaimer. The Service is provided \"as is\" and \"as available\", without warranties of any kind, whether express or implied, including merchantability, fitness for a particular purpose, or accuracy of AI output.",
          "12.2 AI content disclaimer. AI Output may be inaccurate, incomplete, or outdated. Do not rely on it for legal, medical, financial, or other professional advice. Always verify with a qualified professional before acting on AI content.",
          "12.3 Limitation of liability. To the maximum extent permitted by law, VideoBulin47 is not liable for any indirect, incidental, consequential, or punitive damages. Our total liability is limited to the amount you paid us in the 12 months before the event giving rise to the claim.",
        ],
      },
      {
        heading: "13. Term and termination",
        paragraphs: [
          "These Terms remain in effect while you use the Service. We may suspend or terminate your account if you materially breach these Terms, if we suspect fraud, or if the law requires it. If we terminate the Service for reasons that are not your fault, we will refund the unused prepaid portion on a pro-rata basis. You may delete your account at any time by emailing support@videobulin47.net.",
        ],
      },
      {
        heading: "14. Governing law and dispute resolution",
        paragraphs: [
          "These Terms are governed by the laws of the People's Republic of China, without regard to conflict-of-law rules. Before starting formal proceedings, please email support@videobulin47.net to try to resolve the issue informally.",
        ],
      },
      {
        heading: "15. General",
        paragraphs: [
          "We may update these Terms at any time. For material changes we will give at least 14 days' notice by email before the effective date. Continuing to use the Service means you accept the update. If any provision is found unenforceable, the remaining provisions stay in full force. These Terms and the Privacy Policy together form the entire agreement between you and VideoBulin47.",
        ],
      },
      {
        heading: "16. Contact",
        paragraphs: [
          "For any question about these Terms or billing, contact support@videobulin47.net with a clear subject line: Billing, Refund, Account, Privacy, or Legal. We are an email-only support operation and monitor messages on business days.",
          "By using the Service, you confirm that you have read and agree to these Terms. Last updated: October 14, 2026.",
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
      "How VideoBulin47 collects, uses, stores, shares, and deletes account, payment, upload, and generation data, including the AI models that process your image.",
    intro:
      "VideoBulin47 respects your privacy. This policy explains what we collect when you use the service, how we use and share it, and the rights you have.",
    updated: "October 14, 2026",
    sections: [
      {
        heading: "1. Data controller",
        paragraphs: [
          "The data controller for the service is VideoBulin47, operated by an individual operator based in Nanning, Guangxi, China, contactable at support@videobulin47.net. A separate Data Protection Officer has not been appointed; privacy requests are handled through the same support address.",
        ],
      },
      {
        heading: "2. Information we collect",
        paragraphs: [
          "2.1 Information you provide. Account information such as your email address and authentication identifiers. Payment information such as the transaction amount and payment status; we never store full card numbers, which are handled by our payment processor (see Section 5). Content you submit, including the image you upload and the video we generate from it. Support messages and content reports you send us.",
          "2.2 Information collected automatically. Device and network data such as IP address, device type, operating system, browser type, and timezone. Usage and log data such as pages visited, actions taken, session duration, request times, error logs, and performance data.",
          "2.3 Third-party sign-in. If you sign in with Google, we receive basic profile information authorized by you, such as your email address and account identifier. Email magic-link sign-in does not share data with a third party beyond our email provider.",
        ],
      },
      {
        heading: "3. How we use your information",
        bullets: [
          "Provide and maintain the service - performance of a contract.",
          "Process credits, orders, and payments - performance of a contract.",
          "Customer support - performance of a contract or legitimate interest.",
          "Service notices such as billing, security, and policy updates - legitimate interest.",
          "Security and fraud prevention - legitimate interest.",
          "Product analysis and improvement - legitimate interest.",
          "Legal compliance - legal obligation.",
        ],
      },
      {
        heading: "4. Cookies and tracking",
        paragraphs: [
          "We use strictly necessary cookies to keep you signed in and to operate core features; these cannot be disabled. We use Plausible Analytics for privacy-friendly, aggregate usage statistics; Plausible does not use cookies and does not build a personal profile of you. We do not run advertising or cross-site tracking pixels. You can restrict cookies through your browser settings, though disabling essential cookies will prevent sign-in.",
        ],
      },
      {
        heading: "5. Sharing and disclosure",
        paragraphs: [
          "We do not sell your personal information, including as \"sale\" is defined under laws such as the CCPA. We share information only as follows:",
        ],
        bullets: [
          "Service providers, bound by confidentiality obligations: Supabase (authentication, database, private storage), fal.ai (model inference), Waffo Pancake (checkout, tax, payment processing), and Vercel (hosting).",
          "Payment card data is handled exclusively by our PCI-DSS compliant payment processor, Waffo Pancake, and is never stored on our servers.",
          "AI model processing: when you generate a video, your uploaded image and, for the models that use it, the motion template are transmitted to fal.ai and then to the underlying model provider you selected - ByteDance (Seedance), MiniMax, or Kuaishou (Kling) - solely to produce your video.",
          "Legal and regulatory requirements: in response to a lawful request from a court or authority, including cooperation on reports of non-consensual intimate imagery (NCII) or child-safety concerns.",
          "Business transactions: in a merger or acquisition, with advance notice and continued protection.",
          "With your consent: for any other purpose only with your explicit prior consent.",
        ],
      },
      {
        heading: "6. Data security",
        bullets: [
          "Transport encryption: TLS / HTTPS for all traffic.",
          "Storage security: uploaded images and generated videos are stored in a private storage bucket and served through expiring signed URLs.",
          "Access control: least-privilege access, with secrets held in the hosting platform rather than in source code.",
          "Payment isolation: card data never reaches our servers.",
        ],
      },
      {
        heading: "7. Data retention",
        paragraphs: [
          "Account data is retained while your account is active and for up to 90 days after cancellation, after which it is deleted. Uploaded images and generated videos are retained while your account is active or until you delete them. Order, transaction, and security records may be retained longer where tax, accounting, or fraud-prevention law requires. Support records are kept only as long as needed to resolve and document the request.",
        ],
      },
      {
        heading: "8. Your rights",
        paragraphs: [
          "You can request access to, correction of, deletion of, or a copy of your personal data, and you can object to or restrict certain processing, by emailing support@videobulin47.net. We will respond within 30 calendar days. Deletion may be limited by legal retention requirements. If you believe we have handled your data improperly, you have the right to complain to your local data protection authority.",
        ],
      },
      {
        heading: "9. Marketing communications",
        paragraphs: [
          "We currently send only transactional and service emails, such as payment confirmations, generation finished notices, and security or policy alerts. We do not send marketing email. If we ever do, it will be opt-in, with an unsubscribe link in every message and a toggle in your account settings, separate from service notices.",
        ],
      },
      {
        heading: "10. International data transfers",
        paragraphs: [
          "Our service providers may store and process data in countries other than yours, including the United States. Where required, transfers are protected by appropriate safeguards such as standard contractual clauses or an adequacy decision, and we only transfer to recipients that provide a comparable level of protection.",
        ],
      },
      {
        heading: "11. Children's privacy",
        paragraphs: [
          "The service is for users aged 18 and over. We do not knowingly collect information from anyone under 18. If you believe a minor has provided us with information, contact us and we will delete it promptly.",
        ],
      },
      {
        heading: "12. Third-party links and services",
        paragraphs: [
          "The service may link to or integrate with third-party services, including checkout and sign-in providers. This policy applies only to information we collect directly. We are not responsible for the data practices of third parties, and we encourage you to review their policies.",
        ],
      },
      {
        heading: "13. Changes to this policy",
        paragraphs: [
          "If we make a material change, we will give at least 15 days' notice by site notice or email and update the \"last updated\" date at the top of this page. Continuing to use the service after the effective date means you accept the change.",
        ],
      },
      {
        heading: "14. Contact us",
        paragraphs: [
          "Privacy and data requests: support@videobulin47.net (subject line: Privacy). General support: support@videobulin47.net. VideoBulin47, https://www.videobulin47.net. This policy is provided for information and is not legal advice. Last updated: October 14, 2026.",
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
      "Refund rules for credit packs: unused credits, failed generations, duplicate charges, and statutory withdrawal rights.",
    intro:
      "We want the credit system to be clear. Failed generations are refunded automatically, and unused credits can be refunded in full within 7 days of purchase.",
    updated: "October 14, 2026",
    sections: [
      {
        heading: "1. Refundable situations",
        bullets: [
          "Unused credits within 7 days of purchase: full refund.",
          "Duplicate charges caused by a billing error: full refund.",
          "Failed, canceled, moderated, or invalid generations: the reserved credits are returned to your wallet automatically.",
          "Statutory rights (EU, UK, and Australia): first-time buyers keep their 14-day withdrawal right; it no longer applies once credits have been used.",
        ],
      },
      {
        heading: "2. Failed generations",
        paragraphs: [
          "If the provider reports a failed, canceled, moderated, or invalid generation, the reserved credits are returned to your wallet automatically. This includes failures caused by the underlying AI model or inference provider. No support ticket is required for the automatic refund.",
        ],
      },
      {
        heading: "3. How to request a refund",
        paragraphs: [
          "Email support@videobulin47.net with the subject line Refund. Include your account email and the transaction ID or order reference. We aim to confirm your request within 2 business days.",
        ],
      },
      {
        heading: "4. Duplicate or unauthorized charges",
        paragraphs: [
          "Contact support@videobulin47.net with the order email, payment reference, and purchase date before opening a dispute with your bank. We will investigate the payment record and coordinate any approved refund through Waffo Pancake, the Merchant of Record. We reply within 2 business days and resolve confirmed billing errors within 5 business days.",
        ],
      },
      {
        heading: "5. Not refundable",
        bullets: [
          "Credits that have been spent on a completed video.",
          "Unused-credit requests made more than 7 days after purchase, unless a statutory withdrawal right applies.",
          "Accounts closed for violating the Terms of Service or Acceptable Use Policy.",
        ],
      },
      {
        heading: "6. Digital delivery",
        paragraphs: [
          "Credits are delivered immediately after verified payment. Because the service is digital and delivered instantly, requesting immediate access may affect the statutory withdrawal right once credits are used. Refunds are processed back to the original payment method.",
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
      "Content standards, moderation, reporting and enforcement for the VideoBulin47 image-to-video service, including the zero-tolerance list, source-of-material rules and the deepfake prohibition.",
    intro:
      "VideoBulin47 is an image-to-video generator for non-human subjects. This policy sets out what you may not generate, how we moderate content, how to report a problem, and what happens when the rules are broken.",
    updated: "October 16, 2026",
    sections: [
      {
        heading: "1. Scope",
        paragraphs: [
          "This policy applies to everything that passes through the Service: the image you upload, the prompt and settings you submit, the video we generate, and any content you publish from it. It applies to every user and forms part of our Terms of Service.",
        ],
      },
      {
        heading: "2. Content standards and prohibited categories",
        paragraphs: [
          "The Service is an image-to-video generator. It does not accept reference video uploads, and it does not offer face swapping. We prohibit the following six categories of generated content:",
        ],
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
        heading: "2.1 Zero tolerance",
        paragraphs: [
          "The following are removed on sight, the account behind them is terminated, and we reserve the right to report them to law enforcement:",
        ],
        bullets: [
          "Child sexual abuse material (CSAM), or any sexual content involving a minor.",
          "Content that promotes or assists terrorism, extremism, or mass violence.",
          "Instructions for building weapons of mass destruction.",
          "Content inciting genocide or ethnic hatred.",
          "Deepfake content aimed at a real person, including face swaps, nudification, intimate-scene synthesis, and fabricated statements or actions - whether or not that person consented.",
        ],
      },
      {
        heading: "2.2 Non-consensual intimate imagery (NCII)",
        paragraphs: [
          "Non-consensual intimate imagery is strictly prohibited. You must not use the Service to create, alter, request, or distribute sexual or intimate depictions of any real person without that person's explicit consent.",
          "This covers nonconsensual sexual deepfakes, digitally undressed or nudified images, and any intimate image or video made or shared to harass, humiliate, coerce, or extort someone, including revenge imagery and sextortion.",
          "This ban applies even when the person is not named or identifiable in the prompt, and even when you are the person shown.",
        ],
      },
      {
        heading: "2.3 General prohibitions",
        bullets: [
          "Do not generate or spread disinformation or rumours.",
          "Do not impersonate a real person, brand, or organisation.",
          "Do not infringe anyone's intellectual property, likeness, or privacy rights.",
          "Do not use AI output to deceive people, or present it as human-made.",
          "Do not mass-produce spam or fraudulent content.",
          "Do not use jailbreak prompts to bypass our safety systems.",
          "Do not use inputs, outputs, model responses, or any derived data to train, fine-tune, benchmark, distill, or otherwise develop a competing AI or machine learning model.",
          "Do not scrape or harvest model outputs at scale for any purpose beyond your own authorized use.",
          "Do not present AI-generated content as the work of a licensed human professional, such as a doctor, lawyer, or financial adviser.",
          "Do not remove or hide the AI-generated label that platform rules or applicable law require.",
        ],
      },
      {
        heading: "2.4 Source of uploaded material",
        paragraphs: [
          "The Service is built for non-human subjects: pets, animals, virtual characters, and objects. Uploading a photograph of a real person - including yourself, a public figure, a celebrity, or a minor - is prohibited.",
          "Before you upload, you must confirm that the image is your own material, or that you hold documented permission from whoever owns it. Uploading someone else's photograph without permission is prohibited.",
          "Holding permission does not make deepfake content allowable. The zero-tolerance list in section 2.1 applies regardless of consent.",
        ],
      },
      {
        heading: "2.5 Deepfake prohibition",
        paragraphs: [
          "The Service has no face-swap feature, no swap entry point, and no swap menu item. It does not accept reference video uploads. It cannot replace one real person's face or identity with another's.",
          "Using the Service to create a deepfake - by uploading a real person's photograph, or by prompting the model toward a specific real individual - violates this policy and results in account termination.",
        ],
      },
      {
        heading: "3. Content moderation",
        paragraphs: [
          "We run a layered moderation process: automated screening at the model endpoint, a self-declaration check before every generation, and human review of reports and appeals.",
          "3.1 Automated screening. Every generation request runs through the safety checker built into the model endpoint we call. If the checker flags the output, the generation is cancelled and the reserved credits are returned to you.",
          "3.2 Source confirmation. Before a job is submitted you must confirm, in the Studio, that the image is your own material or used with documented permission, and that the subject is not a real person. A submission cannot proceed without that confirmation.",
          "3.3 Human review. Content reported by a user or a rights holder is reviewed by a person. Reviewers are bound by confidentiality.",
          "3.4 Severity levels. L1 critical - child safety and terrorism: immediate ban and referral to authorities. L2 high risk: priority review, removal, account suspension. L3 medium risk: human review, warning, removal. L4 low risk: report-driven, warning and a request to change the content.",
        ],
      },
      {
        heading: "4. Reporting",
        paragraphs: [
          "You can report content that breaks this policy, including child-safety issues, AI impersonation, or an infringement of your own rights. Reports are treated confidentially and reviewed independently. Malicious or knowingly false reports are recorded and may be acted on.",
        ],
      },
      {
        heading: "5. Reporting channels",
        bullets: [
          "Email support@videobulin47.net with the subject line Content Report.",
          "If the material is intimate imagery of you, use the subject line NCII Report instead. You do not need to be the copyright owner.",
          "For copyright, trademark, or likeness removal, see the DMCA and Content Removal page.",
        ],
      },
      {
        heading: "6. Response times",
        paragraphs: [
          "We aim to meet the targets below. If a case needs longer, we tell the reporter why.",
        ],
        bullets: [
          "L1 critical: first response within 2 hours, action complete within 24 hours.",
          "L2 high risk: first response within 24 hours, action complete within 3 business days.",
          "L3 medium risk: first response within 3 business days, action complete within 7 business days.",
          "L4 low risk: first response within 5 business days, action complete within 15 business days.",
        ],
      },
      {
        heading: "7. Enforcement actions",
        bullets: [
          "Content warning - a written warning asking you to delete or amend the content, for a first minor breach.",
          "Content removal - the offending item is taken down, for confirmed L3 and L4 cases.",
          "Feature limits - reduced generation quota or restricted model access, for repeated minor breaches or a single L3 breach.",
          "Account suspension - temporary suspension pending review, for an L2 breach or accumulated breaches.",
          "Permanent ban - permanent loss of access with credits forfeited, for an L1 breach or repeated L2 breaches.",
          "Legal referral - reported to law enforcement with cooperation on the investigation, for L1 cases that may be criminal.",
        ],
      },
      {
        heading: "8. Appeals",
        paragraphs: [
          "If you believe an enforcement action was wrong, email support@videobulin47.net within 14 days with the subject line Appeal. A reviewer who was not involved in the original decision re-examines the case, normally within 10 business days.",
        ],
      },
      {
        heading: "9. Transparency and changes",
        paragraphs: [
          "We may update this policy. Material changes are announced at least 15 days before they take effect. Continuing to use the Service means you accept the updated policy.",
        ],
      },
      {
        heading: "10. Contact",
        paragraphs: [
          "Content safety, reports, and appeals: support@videobulin47.net. VideoBulin47 is operated by an individual operator based in Nanning, Guangxi, China.",
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
      "Submit a copyright, likeness, or non-consensual intimate imagery removal request for content hosted or generated through VideoBulin47.",
    intro:
      "If you believe your rights are being infringed, send a complete notice so we can review and act.",
    updated: "October 14, 2026",
    sections: [
      {
        heading: "What to include",
        bullets: [
          "Your name, address, phone number, and email",
          "Identification of the protected work or the right that is being infringed, including your relationship to the person or rights holder",
          "The URL or video ID of the disputed material",
          "A statement that the use is unauthorized",
          "A statement that your notice is accurate",
          "Your physical or electronic signature",
        ],
      },
      {
        heading: "Where to send it",
        paragraphs: [
          "Email support@videobulin47.net with the subject line DMCA Notice. We may ask for additional information before removing content, and we aim to acknowledge complete notices within 2 business days.",
        ],
      },
      {
        heading: "Non-consensual intimate imagery",
        paragraphs: [
          "If the material is a sexual or intimate depiction of you created or shared without your consent, use the subject line NCII Report instead. You do not need to be the copyright owner and you do not need to identify yourself publicly.",
          "These reports are handled on a priority basis: we block or remove the material, terminate the account responsible, and keep the evidence only as long as needed to handle the report and any legal obligation.",
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
          "Use the subject line Billing or Refund. Include the order email, payment date, amount, and payment reference. Do not send full card numbers or passwords. Refund requests follow the Refund Policy.",
        ],
      },
      {
        heading: "Privacy and data requests",
        paragraphs: [
          "Use the subject line Privacy to request access, correction, deletion, or a copy of your data. We respond within 30 calendar days. See the Privacy Policy for details.",
        ],
      },
      {
        heading: "Legal and security",
        paragraphs: [
          "Use the subject line Legal for terms or licensing questions, or Security to report a vulnerability or an account compromise. For copyright or likeness removal, use the subject line DMCA Notice and follow the DMCA and Content Removal page.",
        ],
      },
      {
        heading: "Content reports",
        paragraphs: [
          "Use the subject line Content Report. Include the video ID or page URL and the reason for the report.",
          "If the content is a sexual or intimate image of you made or shared without your consent, use the subject line NCII Report instead. Those reports are prioritised, and you do not need to be the copyright owner to send one.",
        ],
      },
      {
        heading: "Business",
        paragraphs: [
          "For licensing, media, or partnership inquiries, email support@videobulin47.net with the subject line Business.",
        ],
      },
      {
        heading: "Response times",
        paragraphs: [
          "Every address above is the same monitored support inbox, staffed on business days. We aim to reply to billing issues within 2 business days. VideoBulin47 is an independent business operated by an individual operator based in Nanning, Guangxi, China.",
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
