import { NextResponse } from "next/server";
import { createSupabaseAdminClient } from "@/lib/supabase/admin";
import { addPurchasedCredits } from "@/lib/credits";
import { verifyWaffoRequest } from "@/lib/waffo";
import { isSupabaseAdminConfigured, isWaffoConfigured } from "@/lib/env";

export const runtime = "nodejs";

export async function POST(request: Request) {
  if (!isWaffoConfigured || !isSupabaseAdminConfigured) {
    return NextResponse.json(
      { error: "Waffo webhook is not configured" },
      { status: 503 },
    );
  }

  const rawBody = await request.text();
  const signature = request.headers.get("x-waffo-signature");
  const admin = createSupabaseAdminClient();
  if (!admin) {
    return NextResponse.json(
      { error: "Supabase admin is not configured" },
      { status: 503 },
    );
  }

  let event;
  try {
    event = verifyWaffoRequest(rawBody, signature);
  } catch {
    return NextResponse.json({ error: "Invalid signature" }, { status: 401 });
  }

  const { data: eventRow, error: eventError } = await admin
    .from("webhook_events")
    .insert({
      provider: "waffo",
      delivery_id: event.id,
      event_id: event.eventId,
      event_type: event.eventType,
      payload: event as unknown as Record<string, unknown>,
    })
    .select("id")
    .single<{ id: string }>();

  if (eventError && eventError.code !== "23505") {
    return NextResponse.json(
      { error: eventError.message },
      { status: 500 },
    );
  }
  if (!eventRow) {
    return NextResponse.json({ ok: true, duplicate: true });
  }

  try {
    if (event.eventType === "order.completed") {
      const data = event.data as unknown as Record<string, unknown>;
      const orderId = String(
        data.orderMerchantExternalId || data.orderId || data.order_id || "",
      );
      if (!orderId) throw new Error("Missing orderMerchantExternalId");

      const { data: order, error: orderError } = await admin
        .from("orders")
        .select("id,user_id,credits,status")
        .eq("id", orderId)
        .maybeSingle<{
          id: string;
          user_id: string;
          credits: number;
          status: string;
        }>();

      if (orderError || !order) throw new Error("Order not found");

      if (order.status !== "completed") {
        await addPurchasedCredits({
          userId: order.user_id,
          amount: order.credits,
          orderId: order.id,
          idempotencyKey: `waffo:${event.id}`,
          description: "Waffo credit purchase",
        });
        await admin
          .from("orders")
          .update({
            status: "completed",
            provider_order_id: String(data.orderId || data.order_id || ""),
          })
          .eq("id", order.id);
      }
    }

    if (event.eventType === "refund.succeeded") {
      const data = event.data as unknown as Record<string, unknown>;
      const orderId = String(
        data.orderMerchantExternalId || data.orderId || data.order_id || "",
      );
      if (orderId) {
        await admin
          .from("orders")
          .update({ status: "refunded" })
          .eq("id", orderId);
      }
    }

    await admin
      .from("webhook_events")
      .update({ processed_at: new Date().toISOString(), error: null })
      .eq("id", eventRow.id);

    return NextResponse.json({ ok: true });
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Webhook processing failed";
    await admin
      .from("webhook_events")
      .update({ error: message, processed_at: new Date().toISOString() })
      .eq("id", eventRow.id);
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
