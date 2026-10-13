import { NextResponse } from "next/server";
import { z } from "zod";
import { getCurrentUser } from "@/lib/supabase/server";
import { createSupabaseAdminClient } from "@/lib/supabase/admin";
import { findPack, createWaffoCheckout } from "@/lib/waffo";
import { env, isSupabaseAdminConfigured, isWaffoConfigured } from "@/lib/env";

export const runtime = "nodejs";

const inputSchema = z.object({
  packId: z.enum(["starter", "creator", "studio"]),
});

export async function POST(request: Request) {
  const user = await getCurrentUser();
  if (!user) {
    return NextResponse.json(
      { error: "Sign in required", loginUrl: "/login?next=/pricing" },
      { status: 401 },
    );
  }

  const parsed = inputSchema.safeParse(await request.json());
  if (!parsed.success) {
    return NextResponse.json({ error: "Invalid credit pack" }, { status: 400 });
  }

  if (!isWaffoConfigured || !isSupabaseAdminConfigured) {
    return NextResponse.json(
      {
        error:
          "Checkout is not configured yet. Add Waffo and Supabase environment variables.",
      },
      { status: 503 },
    );
  }

  const pack = findPack(parsed.data.packId);
  if (!pack) {
    return NextResponse.json({ error: "Credit pack not found" }, { status: 404 });
  }

  const admin = createSupabaseAdminClient();
  if (!admin) {
    return NextResponse.json(
      { error: "Supabase admin is not configured" },
      { status: 503 },
    );
  }

  const { data: order, error: orderError } = await admin
    .from("orders")
    .insert({
      user_id: user.id,
      pack_id: pack.id,
      credits: pack.credits,
      amount_cents: pack.priceCents,
      currency: "USD",
      status: "pending",
    })
    .select("id")
    .single<{ id: string }>();

  if (orderError || !order) {
    return NextResponse.json(
      { error: orderError?.message || "Could not create order" },
      { status: 500 },
    );
  }

  try {
    const session = await createWaffoCheckout({
      pack,
      userId: user.id,
      email: user.email,
      orderId: order.id,
      successUrl: `${env.appUrl}/studio?checkout=success`,
    });

    await admin
      .from("orders")
      .update({ provider_session_id: session.sessionId })
      .eq("id", order.id);

    return NextResponse.json({
      orderId: order.id,
      checkoutUrl: session.checkoutUrl,
    });
  } catch (error) {
    await admin
      .from("orders")
      .update({ status: "failed" })
      .eq("id", order.id);
    return NextResponse.json(
      {
        error: error instanceof Error ? error.message : "Checkout failed",
      },
      { status: 502 },
    );
  }
}
