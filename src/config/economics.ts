import { MODELS } from "@/lib/constants";

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
  "kling-o3-standard-v2v": 12.6,
  "kling-o3-pro-v2v": 16.8,
  "minimax-h3": 13,
};

export const MODEL_CREDIT_MULTIPLIER: Record<string, number> = {
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

export function estimateProviderCostCents({
  modelId,
  duration,
}: {
  modelId: string;
  duration: number;
}) {
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
  const providerCost = estimateProviderCostCents({ modelId, duration });
  const minimumFromCost = Math.ceil(
    (providerCost + PAYMENT_FEE_FIXED_CENTS) /
      (MIN_REVENUE_PER_CREDIT_CENTS * TARGET_GROSS_MARGIN),
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
}: {
  credits: number;
  modelId: string;
  duration: number;
}) {
  const revenue = estimateRevenueCents(credits);
  const providerCost = estimateProviderCostCents({ modelId, duration });
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
}: {
  credits: number;
  modelId: string;
  duration: number;
}) {
  const margin = estimateMargin({ credits, modelId, duration });
  if (margin.marginRate < TARGET_GROSS_MARGIN) {
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
