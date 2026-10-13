import "server-only";

import { createClient, type SupabaseClient } from "@supabase/supabase-js";
import { env, isSupabaseAdminConfigured } from "@/lib/env";

// Supabase 类型要等数据库生成后才会补齐，所以管理端客户端暂时保持
// 非强类型，避免在 MVP 阶段被未生成的表类型卡住。
let adminClient: SupabaseClient | null = null;

export function createSupabaseAdminClient() {
  if (!isSupabaseAdminConfigured) return null;
  if (!adminClient) {
    adminClient = createClient(env.supabaseUrl, env.supabaseServiceRoleKey, {
      auth: {
        autoRefreshToken: false,
        persistSession: false,
      },
    });
  }
  return adminClient;
}
