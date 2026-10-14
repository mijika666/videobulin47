const value = (name: string) => process.env[name]?.trim() ?? "";

// 逗号或换行分隔的列表，用于额外的参考视频等场景。
const list = (name: string) =>
  value(name)
    .split(/[\n,]+/)
    .map((item) => item.trim())
    .filter(Boolean);

export const env = {
  appUrl:
    value("NEXT_PUBLIC_APP_URL") ||
    (process.env.VERCEL_URL
      ? `https://${process.env.VERCEL_URL}`
      : "http://localhost:3000"),
  supabaseUrl: value("NEXT_PUBLIC_SUPABASE_URL"),
  supabaseAnonKey: value("NEXT_PUBLIC_SUPABASE_ANON_KEY"),
  supabaseServiceRoleKey: value("SUPABASE_SERVICE_ROLE_KEY"),
  waffoMerchantId: value("WAFFO_MERCHANT_ID"),
  waffoPrivateKey: value("WAFFO_PRIVATE_KEY"),
  waffoProductSingle: value("WAFFO_PRODUCT_SINGLE"),
  waffoProductTrio: value("WAFFO_PRODUCT_TRIO"),
  waffoProductCrew: value("WAFFO_PRODUCT_CREW"),
  waffoWebhookPublicKeyTest: value("WAFFO_WEBHOOK_PUBLIC_KEY_TEST"),
  waffoWebhookPublicKeyProd: value("WAFFO_WEBHOOK_PUBLIC_KEY_PROD"),
  falKey: value("FAL_KEY"),
  falWebhookSecret: value("FAL_WEBHOOK_SECRET"),
  falVideoModel:
    value("FAL_VIDEO_MODEL") ||
    "fal-ai/kling-video/o3/standard/video-to-video/reference",
  templateVideoUrl: value("BULIN47_TEMPLATE_VIDEO_URL"),
  // 第 1 个是主参考视频，后面是来自 BULIN47_TEMPLATE_VIDEO_URLS 的额外参考视频。
  templateVideoUrls: [
    value("BULIN47_TEMPLATE_VIDEO_URL"),
    ...list("BULIN47_TEMPLATE_VIDEO_URLS"),
  ].filter(Boolean),
  templateAudioUrl: value("BULIN47_TEMPLATE_AUDIO_URL"),
  cronSecret: value("CRON_SECRET"),
  adminEmails: value("ADMIN_EMAILS")
    .split(",")
    .map((email) => email.trim().toLowerCase())
    .filter(Boolean),
};

export const isSupabaseConfigured = Boolean(
  env.supabaseUrl && env.supabaseAnonKey,
);

export const isSupabaseAdminConfigured = Boolean(
  env.supabaseUrl && env.supabaseServiceRoleKey,
);

export const isFalConfigured = Boolean(env.falKey);

export const isWaffoConfigured = Boolean(
  env.waffoMerchantId && env.waffoPrivateKey,
);

export const isTemplateConfigured = Boolean(env.templateVideoUrl);
