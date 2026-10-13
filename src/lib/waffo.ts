import "server-only";

import {
  WaffoPancake,
  verifyWebhook,
  type WebhookEvent,
} from "@waffo/pancake-ts";
import { CREDIT_PACKS, type CreditPack } from "@/lib/constants";
import { env, isWaffoConfigured } from "@/lib/env";

export function getWaffoClient() {
  if (!isWaffoConfigured) return null;
  return new WaffoPancake({
    merchantId: env.waffoMerchantId,
    privateKey: env.waffoPrivateKey,
    webhookPublicKey: {
      test: env.waffoWebhookPublicKeyTest || undefined,
      prod: env.waffoWebhookPublicKeyProd || undefined,
    },
  });
}

export function getWaffoProductId(pack: CreditPack) {
  return env[pack.envKey];
}

export function findPack(packId: string) {
  return CREDIT_PACKS.find((pack) => pack.id === packId) ?? null;
}

export async function createWaffoCheckout({
  pack,
  userId,
  email,
  orderId,
  successUrl,
}: {
  pack: CreditPack;
  userId: string;
  email?: string | null;
  orderId: string;
  successUrl: string;
}) {
  const client = getWaffoClient();
  const productId = getWaffoProductId(pack);
  if (!client) throw new Error("Waffo is not configured");
  if (!productId) throw new Error(`Missing Waffo product ID for ${pack.id}`);

  return client.checkout.authenticated.create({
    productId,
    currency: "USD",
    buyerIdentity: userId,
    buyerEmail: email ?? undefined,
    successUrl,
    orderMerchantExternalId: orderId,
    metadata: {
      user_id: userId,
      pack_id: pack.id,
      credits: String(pack.credits),
    },
  });
}

export function verifyWaffoRequest(rawBody: string, signature: string | null) {
  const publicKeys =
    env.waffoWebhookPublicKeyTest || env.waffoWebhookPublicKeyProd
      ? {
          test: env.waffoWebhookPublicKeyTest || undefined,
          prod: env.waffoWebhookPublicKeyProd || undefined,
        }
      : undefined;
  return verifyWebhook(
    rawBody,
    signature,
    publicKeys ? { publicKeys } : undefined,
  ) as WebhookEvent;
}
