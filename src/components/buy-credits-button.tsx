"use client";

import { useState } from "react";
import { LoaderCircle, ShoppingBag } from "lucide-react";
import { cn } from "@/lib/utils";

export function BuyCreditsButton({
  packId,
  label = "Buy credits",
  dark = false,
}: {
  packId: string;
  label?: string;
  dark?: boolean;
}) {
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  async function handleClick() {
    setLoading(true);
    setMessage("");
    try {
      const response = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ packId }),
      });
      const data = (await response.json()) as {
        checkoutUrl?: string;
        loginUrl?: string;
        error?: string;
      };
      if (response.status === 401 && data.loginUrl) {
        window.location.href = data.loginUrl;
        return;
      }
      if (!response.ok || !data.checkoutUrl) {
        throw new Error(data.error || "Checkout is not available yet.");
      }
      window.open(data.checkoutUrl, "_blank", "noopener,noreferrer");
    } catch (error) {
      setMessage(error instanceof Error ? error.message : "Checkout failed.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div>
      <button
        type="button"
        onClick={handleClick}
        disabled={loading}
        className={cn(
          "btn w-full",
          dark ? "btn-primary" : "btn-dark",
          loading && "cursor-wait opacity-75",
        )}
      >
        {loading ? (
          <LoaderCircle className="size-4 animate-spin" />
        ) : (
          <ShoppingBag className="size-4" />
        )}
        {loading ? "Opening checkout..." : label}
      </button>
      {message ? (
        <p className="mt-3 text-center text-xs font-semibold text-orange">
          {message}
        </p>
      ) : null}
    </div>
  );
}
