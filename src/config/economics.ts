import {
  MODELS,
  TEMPLATE_CLIP_SECONDS,
  referenceClipCount,
} from "@/lib/constants";

// Waffo Pancake 公开费率：
// 每笔成功交易 3.9% + $0.50；退款每次额外 $1.00。
export const PAYMENT_FEE_RATE = 0.039;
export const PAYMENT_FEE_FIXED_CENTS = 50;

// Studio 包是最差积分单价：
// $69.99 / 100 credits，约等于 $0.70 / credit。
export const MIN_REVENUE_PER_CREDIT_CENTS = 70;
export const TARGET_GROSS_MARGIN = 0.55;
export const MIN_PUBLIC_PRICE_CENTS = 990;

// fal.ai 公开价格。模型调价时，这里的成本值也要同步更新。
export const MODEL_COST_CENTS_PER_SECOND: Record<string, number> = {
  // Seedance 2.5 的精确成本走下面的 token 公式，这里只是兜底估值。
  "seedance-2-5-us-r2v": 34,
  "kling-o3-standard-v2v": 12.6,
  "kling-o3-pro-v2v": 16.8,
  "minimax-h3": 13,
};

export const MODEL_CREDIT_MULTIPLIER: Record<string, number> = {
  "seedance-2-5-us-r2v": 1,
  "kling-o3-standard-v2v": 1,
  "kling-o3-pro-v2v": 1.35,
  "minimax-h3": 1.2,
};

export const BASE_CREDIT_COST: Record<
  number,
  Record<string, number>
> = {
  5: { "720p": 4, "1080p": 8 },
  10: { "720p": 8, "1080p": 15 },
  15: { "720p": 10, "1080p": 22 },
};

// 利润护栏要覆盖的成本率 = 目标毛利 + 支付手续费率。
// 之前这里用 (1 - 目标毛利)，少算了手续费，导致成本偏高的模型会被护栏误杀。
const NET_MARGIN_RATE = 1 - TARGET_GROSS_MARGIN - PAYMENT_FEE_RATE;

// Seedance 2.5 (US) 官方计费：
//   tokens = (height * width * (输入视频秒数 + 输出秒数) * 24) / 1024
//   480p / 720p：$0.02568 每 1000 tokens；1080p：$0.02808 每 1000 tokens
//   带视频输入时价格 x0.6（我们始终会带参考视频，所以固定乘 0.6）
const SEEDANCE_25_RATES: Record<
  string,
  { width: number; height: number; pricePer1kTokens: number }
> = {
  "720p": { width: 1280, height: 720, pricePer1kTokens: 0.02568 },
  "1080p": { width: 1920, height: 1080, pricePer1kTokens: 0.02808 },
};

function estimateSeedance25CostCents({
  duration,
  resolution,
  inputVideoSeconds,
}: {
  duration: number;
  resolution: string;
  inputVideoSeconds: number;
}) {
  const rate = SEEDANCE_25_RATES[resolution] ?? SEEDANCE_25_RATES["720p"];
  const tokens =
    (rate.height * rate.width * (inputVideoSeconds + duration) * 24) / 1024;
  const dollars = (tokens / 1000) * rate.pricePer1kTokens * 0.6;
  return Math.ceil(dollars * 100);
}

// 估算这次渲染会带多少秒参考视频（每个模板片段按 5 秒算）。
// 客户端算预估积分和服务端算实际成本都走这里，保证两边一致。
export function referenceInputSeconds(modelId: string, duration: number) {
  const model = MODELS.find((item) => item.id === modelId);
  if (!model?.usesReferenceVideo) return 0;
  return referenceClipCount(duration, model.maxReferenceVideos) * TEMPLATE_CLIP_SECONDS;
}

export function estimateProviderCostCents({
  modelId,
  duration,
  resolution = "720p",
}: {
  modelId: string;
  duration: number;
  resolution?: string;
}) {
  if (modelId === "seedance-2-5-us-r2v") {
    return estimateSeedance25CostCents({
      duration,
      resolution,
      inputVideoSeconds: referenceInputSeconds(modelId, duration),
    });
  }
  const perSecond =
    MODEL_COST_CENTS_PER_SECOND[modelId] ??
    MODEL_COST_CENTS_PER_SECOND["kling-o3-pro-v2v"];
  return Math.ceil(perSecond * duration);
}

export function calculateCreditsForRender({
  duration,
  resolution,
  modelId,
}: {
  duration: number;
  resolution: string;
  modelId: string;
}) {
  const base = BASE_CREDIT_COST[duration]?.[resolution] ?? 10;
  const multiplier = MODEL_CREDIT_MULTIPLIER[modelId] ?? 1.35;
  const providerCost = estimateProviderCostCents({
    modelId,
    duration,
    resolution,
  });
  const minimumFromCost = Math.ceil(
    (providerCost + PAYMENT_FEE_FIXED_CENTS) /
      (MIN_REVENUE_PER_CREDIT_CENTS * NET_MARGIN_RATE),
  );
  return Math.max(base, minimumFromCost, Math.ceil(base * multiplier));
}

export function estimateRevenueCents(credits: number) {
  return credits * MIN_REVENUE_PER_CREDIT_CENTS;
}

export function estimateMargin({
  credits,
  modelId,
  duration,
  resolution = "720p",
}: {
  credits: number;
  modelId: string;
  duration: number;
  resolution?: string;
}) {
  const revenue = estimateRevenueCents(credits);
  const providerCost = estimateProviderCostCents({
    modelId,
    duration,
    resolution,
  });
  const paymentFee = Math.ceil(revenue * PAYMENT_FEE_RATE + PAYMENT_FEE_FIXED_CENTS);
  const net = revenue - providerCost - paymentFee;
  return {
    revenue,
    providerCost,
    paymentFee,
    net,
    marginRate: revenue > 0 ? net / revenue : 0,
  };
}

export function assertProfitable({
  credits,
  modelId,
  duration,
  resolution = "720p",
}: {
  credits: number;
  modelId: string;
  duration: number;
  resolution?: string;
}) {
  const margin = estimateMargin({ credits, modelId, duration, resolution });
  // 浮点误差可能让刚好达标的组合掉到阈值以下，留一点容差。
  if (margin.marginRate < TARGET_GROSS_MARGIN - 1e-6) {
    throw new Error(
      `Render blocked by margin guard: ${(margin.marginRate * 100).toFixed(
        1,
      )}% < ${(TARGET_GROSS_MARGIN * 100).toFixed(0)}%`,
    );
  }
  return margin;
}

export function modelIsPriced(modelId: string) {
  return MODELS.some((model) => model.id === modelId);
}
