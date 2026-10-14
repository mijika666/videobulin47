import { NextResponse } from "next/server";
import { timingSafeEqual } from "node:crypto";
import { env } from "@/lib/env";
import { finalizeFalJob } from "@/lib/fal-result";

export const runtime = "nodejs";

// 用固定时间比较，避免通过响应时间逐字节猜 webhook token。
function secretMatches(provided: string | null, expected: string) {
  if (!provided) return false;
  const a = Buffer.from(provided);
  const b = Buffer.from(expected);
  if (a.length !== b.length) return false;
  return timingSafeEqual(a, b);
}

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
  if (!secretMatches(token, env.falWebhookSecret)) {
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
