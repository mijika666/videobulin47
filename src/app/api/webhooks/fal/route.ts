import { NextResponse } from "next/server";
import { env } from "@/lib/env";
import { finalizeFalJob } from "@/lib/fal-result";

export const runtime = "nodejs";

export async function POST(request: Request) {
  const url = new URL(request.url);
  const jobId = url.searchParams.get("job");
  const token = url.searchParams.get("token");

  if (!env.falWebhookSecret) {
    return NextResponse.json(
      { error: "FAL_WEBHOOK_SECRET is not configured" },
      { status: 503 },
    );
  }
  if (token !== env.falWebhookSecret) {
    return NextResponse.json({ error: "Invalid webhook token" }, { status: 401 });
  }
  if (!jobId) {
    return NextResponse.json({ error: "Missing job id" }, { status: 400 });
  }

  try {
    const envelope = (await request.json()) as {
      status?: string;
      payload?: unknown;
      error?: string;
      request_id?: string;
    };
    await finalizeFalJob({ jobId, envelope });
    return NextResponse.json({ ok: true });
  } catch (error) {
    return NextResponse.json(
      {
        error: error instanceof Error ? error.message : "Webhook failed",
      },
      { status: 500 },
    );
  }
}
