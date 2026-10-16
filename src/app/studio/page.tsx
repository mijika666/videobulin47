import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { StudioClient } from "@/components/studio/studio-client";
import { getRecentJobs, getCurrentWallet } from "@/lib/credits";
import { isFalConfigured, isSupabaseConfigured, isTemplateConfigured, isWaffoConfigured } from "@/lib/env";
import { getCurrentUser } from "@/lib/supabase/server";
import { absoluteUrl } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Bulin 47 AI Video Studio",
  description:
    "Upload your own image, reserve credits, and generate a Bulin 47 AI video from the Studio.",
  alternates: { canonical: absoluteUrl("/studio") },
};

export const dynamic = "force-dynamic";

export default async function StudioPage() {
  const user = await getCurrentUser();
  if (isSupabaseConfigured && !user) {
    redirect("/login?next=/studio");
  }

  const wallet = user ? await getCurrentWallet(user.id) : null;
  const jobs = user ? await getRecentJobs(user.id) : [];

  return (
    <StudioClient
      userEmail={user?.email ?? null}
      initialBalance={wallet?.balance ?? 0}
      initialJobs={jobs}
      services={{
        supabase: isSupabaseConfigured,
        fal: isFalConfigured,
        waffo: isWaffoConfigured,
        template: isTemplateConfigured,
      }}
    />
  );
}
