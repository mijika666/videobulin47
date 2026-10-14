import "server-only";

import { createSupabaseAdminClient } from "@/lib/supabase/admin";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import type {
  CreditTransaction,
  Order,
  VideoJob,
  Wallet,
} from "@/lib/types";

export async function getCurrentWallet(userId: string) {
  const supabase = await createSupabaseServerClient();
  if (!supabase) {
    return { user_id: userId, balance: 0, lifetime_purchased: 0 } as Wallet;
  }
  const { data } = await supabase
    .from("credit_wallets")
    .select("user_id,balance,lifetime_purchased")
    .eq("user_id", userId)
    .maybeSingle<Wallet>();
  return data;
}

export async function getRecentJobs(userId: string, limit = 12) {
  const supabase = await createSupabaseServerClient();
  if (!supabase) return [] as VideoJob[];
  const { data } = await supabase
    .from("video_jobs")
    .select("*")
    .eq("user_id", userId)
    .order("created_at", { ascending: false })
    .limit(limit);
  return (data ?? []) as VideoJob[];
}

export async function getRecentOrders(userId: string, limit = 20) {
  const supabase = await createSupabaseServerClient();
  if (!supabase) return [] as Order[];
  const { data } = await supabase
    .from("orders")
    .select("*")
    .eq("user_id", userId)
    .order("created_at", { ascending: false })
    .limit(limit);
  return (data ?? []) as Order[];
}

export async function getRecentTransactions(userId: string, limit = 20) {
  const supabase = await createSupabaseServerClient();
  if (!supabase) return [] as CreditTransaction[];
  const { data } = await supabase
    .from("credit_transactions")
    .select("*")
    .eq("user_id", userId)
    .order("created_at", { ascending: false })
    .limit(limit);
  return (data ?? []) as CreditTransaction[];
}

export async function createJobRecord({
  userId,
  inputPath,
  modelId,
  duration,
  resolution,
  credits,
}: {
  userId: string;
  inputPath: string;
  modelId: string;
  duration: number;
  resolution: string;
  credits: number;
}) {
  const supabase = createSupabaseAdminClient();
  if (!supabase) throw new Error("Supabase admin is not configured");
  const { data, error } = await supabase
    .from("video_jobs")
    .insert({
      user_id: userId,
      input_path: inputPath,
      model_id: modelId,
      duration,
      resolution,
      credits,
      status: "draft",
    })
    .select("*")
    .single<VideoJob>();
  if (error) throw error;
  return data;
}

export async function reserveCredits({
  userId,
  amount,
  jobId,
}: {
  userId: string;
  amount: number;
  jobId: string;
}) {
  const supabase = createSupabaseAdminClient();
  if (!supabase) throw new Error("Supabase admin is not configured");
  const { data, error } = await supabase.rpc("reserve_credits", {
    p_user_id: userId,
    p_amount: amount,
    p_job_id: jobId,
    p_idempotency_key: `reserve:${jobId}`,
  });
  if (error) throw error;
  return Number(data);
}

export async function refundCredits({
  userId,
  amount,
  jobId,
}: {
  userId: string;
  amount: number;
  jobId: string;
}) {
  const supabase = createSupabaseAdminClient();
  if (!supabase) throw new Error("Supabase admin is not configured");
  const { data, error } = await supabase.rpc("refund_credits", {
    p_user_id: userId,
    p_amount: amount,
    p_job_id: jobId,
    p_idempotency_key: `refund:${jobId}`,
  });
  if (error) throw error;
  return Number(data);
}

export async function settleCredits(jobId: string) {
  const supabase = createSupabaseAdminClient();
  if (!supabase) throw new Error("Supabase admin is not configured");
  const { error } = await supabase.rpc("settle_credits", { p_job_id: jobId });
  if (error) throw error;
}

export async function addPurchasedCredits({
  userId,
  amount,
  orderId,
  idempotencyKey,
  description,
}: {
  userId: string;
  amount: number;
  orderId: string;
  idempotencyKey: string;
  description: string;
}) {
  const supabase = createSupabaseAdminClient();
  if (!supabase) throw new Error("Supabase admin is not configured");
  const { data, error } = await supabase.rpc("add_credits", {
    p_user_id: userId,
    p_amount: amount,
    p_idempotency_key: idempotencyKey,
    p_description: description,
    p_order_id: orderId,
  });
  if (error) throw error;
  return Number(data);
}
