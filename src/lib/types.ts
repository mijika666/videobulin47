export type VideoJobStatus =
  | "draft"
  | "queued"
  | "processing"
  | "completed"
  | "failed"
  | "canceled";

export type VideoJob = {
  id: string;
  user_id: string;
  template_id: string;
  input_path: string;
  model_id: string;
  fal_request_id: string | null;
  status: VideoJobStatus;
  duration: number;
  resolution: string;
  credits: number;
  output_url: string | null;
  output_path: string | null;
  poster_url: string | null;
  error_code: string | null;
  error_message: string | null;
  created_at: string;
  started_at: string | null;
  completed_at: string | null;
};

export type Wallet = {
  user_id: string;
  balance: number;
  lifetime_purchased: number;
};

export type OrderStatus = "pending" | "completed" | "failed" | "refunded";

export type Order = {
  id: string;
  user_id: string;
  provider: string;
  provider_order_id: string | null;
  provider_session_id: string | null;
  pack_id: string;
  credits: number;
  amount_cents: number;
  currency: string;
  status: OrderStatus;
  created_at: string;
  updated_at: string;
};

export type CreditTransactionType =
  | "purchase"
  | "reserve"
  | "refund"
  | "bonus"
  | "admin_adjustment";

export type CreditTransaction = {
  id: string;
  user_id: string;
  amount: number;
  type: CreditTransactionType;
  status: "pending" | "settled" | "reversed";
  job_id: string | null;
  order_id: string | null;
  description: string | null;
  created_at: string;
};

export type GenerateInput = {
  assetPath: string;
  duration: number;
  resolution: string;
  modelId: string;
  consent: boolean;
};
