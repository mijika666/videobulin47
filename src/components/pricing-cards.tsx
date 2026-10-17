import { Check, CreditCard, ShieldCheck, Zap } from "lucide-react";
import { BuyCreditsButton } from "@/components/buy-credits-button";
import { CREDIT_PACKS } from "@/lib/constants";

export function PricingCards() {
  return (
    <div className="grid gap-5 lg:grid-cols-3">
      {CREDIT_PACKS.map((pack) => (
        <article
          key={pack.id}
          className={
            pack.badge
              ? "relative overflow-hidden rounded-lg border-2 border-acid bg-panel p-7 text-white shadow-2xl"
              : "panel relative overflow-hidden p-7 text-ink"
          }
        >
          {pack.badge ? (
            <div className="absolute right-0 top-0 rounded-bl-lg bg-acid px-4 py-2 text-[10px] font-black uppercase text-white">
              {pack.badge}
            </div>
          ) : null}
          <div className="flex items-center justify-between">
            <h3 className="text-xl font-black">{pack.name}</h3>
            {pack.id === "starter" ? (
              <Zap className="size-5 text-orange" />
            ) : (
              <CreditCard
                className={pack.badge ? "size-5 text-acid" : "size-5 text-orange"}
              />
            )}
          </div>
          <div className="mt-7 flex items-end gap-2">
            <p className="display text-5xl">{pack.priceLabel}</p>
            <p
              className={
                pack.badge
                  ? "pb-1 text-sm font-bold text-white/45"
                  : "pb-1 text-sm font-bold text-muted"
              }
            >
              one-time
            </p>
          </div>
          <p
            className={
              pack.badge
                ? "mt-3 text-sm leading-6 text-white/60"
                : "mt-3 text-sm leading-6 text-muted"
            }
          >
            {pack.description}
          </p>
          <div
            className={
              pack.badge
                ? "my-7 h-px bg-white/12"
                : "my-7 h-px bg-line"
            }
          />
          <p
            className={
              pack.badge
                ? "text-xs font-black uppercase text-white/40"
                : "text-xs font-black uppercase text-muted"
            }
          >
            Includes
          </p>
          <div className="mt-4 grid gap-3">
            {pack.includes.map((benefit) => (
              <div
                key={benefit}
                className={
                  pack.badge
                    ? "flex items-center gap-3 text-sm text-white/70"
                    : "flex items-center gap-3 text-sm text-muted"
                }
              >
                <Check
                  className={
                    pack.badge
                      ? "size-4 shrink-0 text-acid"
                      : "size-4 shrink-0 text-orange"
                  }
                />
                {benefit}
              </div>
            ))}
          </div>
          <div className="mt-8">
            <BuyCreditsButton
              packId={pack.id}
              label={`Buy ${pack.name}`}
              dark={Boolean(pack.badge)}
            />
          </div>
        </article>
      ))}
      <div className="lg:col-span-3">
        <div className="flex flex-wrap items-center justify-center gap-x-7 gap-y-3 rounded-lg border border-line px-5 py-4 text-xs font-bold text-muted">
          <span className="inline-flex items-center gap-2">
            <ShieldCheck className="size-4 text-orange" />
            Secure checkout by Waffo
          </span>
          <span>Visa · Mastercard · Apple Pay · Google Pay</span>
          <span>Digital delivery after verified payment</span>
          <span>Credits are not a subscription</span>
        </div>
      </div>
    </div>
  );
}
