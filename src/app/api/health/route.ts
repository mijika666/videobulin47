import { NextResponse } from "next/server";
import {
  isFalConfigured,
  isSupabaseConfigured,
  isTemplateConfigured,
  isWaffoConfigured,
} from "@/lib/env";

export function GET() {
  return NextResponse.json({
    ok: true,
    services: {
      supabase: isSupabaseConfigured,
      fal: isFalConfigured,
      waffo: isWaffoConfigured,
      template: isTemplateConfigured,
    },
  });
}
