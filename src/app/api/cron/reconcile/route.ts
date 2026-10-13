import { NextResponse } from "next/server";
import { createSupabaseAdminClient } from "@/lib/supabase/admin";
import { getFalClient, resolveModel } from "@/lib/fal";
import { finalizeFalJob } from "@/lib/fal-result";
import { env, isFalConfigured, isSupabaseAdminConfigured } from "@/lib/env";
import type { VideoJob } from "@/lib/types";

export const runtime = "nodejs";

function isAuthorized(request: Request) {
  if (!env.cronSecret) return false;
  const authorization = request.headers.get("authorization");
  const url = new URL(request.url);
  return (
    authorization === `Bearer ${env.cronSecret}` ||
    url.searchParams.get("secret") === env.cronSecret
  );
}

export async function GET(request: Request) {
  if (!isAuthorized(request)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  if (!isFalConfigured || !isSupabaseAdminConfigured) {
    return NextResponse.json(
      { error: "Reconciliation is not configured" },
      { status: 503 },
    );
  }

  const admin = createSupabaseAdminClient();
  const fal = getFalClient();
  if (!admin || !fal) {
    return NextResponse.json(
      { error: "Reconciliation services unavailable" },
      { status: 503 },
    );
  }

  const cutoff = new Date(Date.now() - 15 * 60 * 1000).toISOString();
  const { data: jobs } = await admin
    .from("video_jobs")
    .select("*")
    .in("status", ["queued", "processing"])
    .lt("created_at", cutoff)
    .limit(25);

  const results: Array<{ id: string; status: string }> = [];

  for (const job of (jobs ?? []) as VideoJob[]) {
    if (!job.fal_request_id) continue;
    const model = resolveModel(job.model_id);
    try {
      const status = await fal.queue.status(model.endpoint as never, {
        requestId: job.fal_request_id,
      });
      if (status.status === "COMPLETED") {
        const result = await fal.queue.result(model.endpoint as never, {
          requestId: job.fal_request_id,
        });
        await finalizeFalJob({
          jobId: job.id,
          envelope: {
            status: "OK",
            payload: result.data,
            request_id: job.fal_request_id,
          },
        });
        results.push({ id: job.id, status: "completed" });
      } else if (status.status === "IN_PROGRESS") {
        await admin
          .from("video_jobs")
          .update({ status: "processing" })
          .eq("id", job.id);
        results.push({ id: job.id, status: "processing" });
      } else {
        results.push({ id: job.id, status: "queued" });
      }
    } catch (error) {
      results.push({
        id: job.id,
        status: error instanceof Error ? error.message : "error",
      });
    }
  }

  return NextResponse.json({ checked: results.length, results });
}
