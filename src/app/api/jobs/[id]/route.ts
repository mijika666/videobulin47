import { NextResponse } from "next/server";
import { getCurrentUser } from "@/lib/supabase/server";
import { createSupabaseAdminClient } from "@/lib/supabase/admin";

export const runtime = "nodejs";

export async function GET(
  _request: Request,
  context: { params: Promise<{ id: string }> },
) {
  const user = await getCurrentUser();
  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const { id } = await context.params;
  const admin = createSupabaseAdminClient();
  if (!admin) {
    return NextResponse.json(
      { error: "Supabase admin is not configured" },
      { status: 503 },
    );
  }

  const { data, error } = await admin
    .from("video_jobs")
    .select(
      "id,status,credits,duration,resolution,model_id,output_url,output_path,poster_url,error_code,error_message,created_at,started_at,completed_at",
    )
    .eq("id", id)
    .eq("user_id", user.id)
    .maybeSingle();

  if (error || !data) {
    return NextResponse.json({ error: "Job not found" }, { status: 404 });
  }

  let outputUrl = data.output_url as string | null;
  const outputPath = data.output_path as string | null;
  if (outputPath) {
    const { data: signed } = await admin.storage
      .from("renders")
      .createSignedUrl(outputPath, 60 * 60);
    outputUrl = signed?.signedUrl || outputUrl;
  }

  return NextResponse.json({ job: { ...data, output_url: outputUrl } });
}
