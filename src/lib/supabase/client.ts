"use client";

import { createBrowserClient } from "@supabase/ssr";

// 浏览器端必须直接写 process.env.NEXT_PUBLIC_*，Next.js 才会在构建时把值
// 内联进客户端 bundle。
// 如果这里改回 @/lib/env 的动态取值（process.env[name]），构建期无法内联，
// 浏览器里会拿到空字符串，登录页就会报 "Supabase is not configured yet."。
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL?.trim() ?? "";
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY?.trim() ?? "";

let browserClient: ReturnType<typeof createBrowserClient> | null = null;

export function createSupabaseBrowserClient() {
  if (!supabaseUrl || !supabaseAnonKey) return null;
  if (!browserClient) {
    browserClient = createBrowserClient(supabaseUrl, supabaseAnonKey);
  }
  return browserClient;
}
