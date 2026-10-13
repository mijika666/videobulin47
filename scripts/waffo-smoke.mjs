// Waffo 支付联调冒烟测试：读取环境变量，尝试创建三种积分包的结账会话。
// 只输出会话 ID 和去掉 token 片段后的结账地址，不打印任何密钥。
import { WaffoPancake, TaxCategory } from "@waffo/pancake-ts";

const merchantId = process.env.WAFFO_MERCHANT_ID;
const privateKey = process.env.WAFFO_PRIVATE_KEY;
const productById = {
  starter: process.env.WAFFO_PRODUCT_SINGLE,
  creator: process.env.WAFFO_PRODUCT_TRIO,
  studio: process.env.WAFFO_PRODUCT_CREW,
};

if (!merchantId || !privateKey || !Object.values(productById).every(Boolean)) {
  console.log("SKIP missing env");
  process.exit(0);
}

const client = new WaffoPancake({ merchantId, privateKey });

const packs = [
  { id: "starter", amount: "9.99", label: "Single" },
  { id: "creator", amount: "24.99", label: "Trio" },
  { id: "studio", amount: "69.99", label: "Crew" },
];

for (const pack of packs) {
  const productId = productById[pack.id];
  try {
    const session = await client.checkout.authenticated.create({
      productId,
      currency: "USD",
      priceSnapshot: { amount: pack.amount, taxCategory: TaxCategory.SaaS },
      buyerIdentity: "smoke-test-user",
      buyerEmail: "smoke-test@example.com",
      successUrl: "https://www.videobulin47.net/studio?checkout=success",
      orderMerchantExternalId: `smoke-${pack.id}-${Date.now()}`,
      metadata: { pack_id: pack.id, kind: "smoke-test" },
    });
    const base = String(session.checkoutUrl).split("#")[0];
    console.log(
      `OK   ${pack.label} $${pack.amount} product=${productId} session=${session.sessionId} url=${base}`,
    );
  } catch (error) {
    const message =
      error && typeof error === "object" && "message" in error
        ? String(error.message)
        : String(error);
    console.log(
      `FAIL ${pack.label} $${pack.amount} product=${productId} :: ${message.slice(0, 400)}`,
    );
  }
}
