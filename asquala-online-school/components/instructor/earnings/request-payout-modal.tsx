"use client";

import React, { useState } from "react";
import { X, ArrowUpRight, ShieldCheck, Wallet, CheckCircle2 } from "lucide-react";
import { InstructorPayoutMethod } from "@/lib/mock-instructor-data";
import { Button } from "@/components/ui/button";

interface RequestPayoutModalProps {
  isOpen: boolean;
  availableBalanceETB: number;
  payoutMethods: InstructorPayoutMethod[];
  onClose: () => void;
  onRequestPayout: (amount: number, methodId: string) => void;
}

export function RequestPayoutModal({
  isOpen,
  availableBalanceETB,
  payoutMethods,
  onClose,
  onRequestPayout,
}: RequestPayoutModalProps) {
  const [amount, setAmount] = useState<number>(availableBalanceETB);
  const [selectedMethodId, setSelectedMethodId] = useState<string>(
    payoutMethods.find((m) => m.isDefault)?.id || payoutMethods[0]?.id || ""
  );
  const [error, setError] = useState("");

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (amount < 500) {
      setError("Minimum withdrawal amount is 500 ETB.");
      return;
    }
    if (amount > availableBalanceETB) {
      setError(`Amount cannot exceed available balance of ETB ${availableBalanceETB.toLocaleString()}.`);
      return;
    }
    if (!selectedMethodId) {
      setError("Please select a payout destination.");
      return;
    }

    onRequestPayout(amount, selectedMethodId);
    setError("");
    onClose();
  };

  const handleSetPercentage = (pct: number) => {
    const calc = Math.floor(availableBalanceETB * pct);
    setAmount(calc);
    if (error) setError("");
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs animate-in fade-in duration-150">
      <div className="bg-card border border-border rounded-2xl w-full max-w-lg shadow-xl overflow-hidden animate-in zoom-in-95 duration-150">
        {/* Header */}
        <div className="flex items-center justify-between p-5 border-b border-border bg-secondary/30">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-primary text-primary-foreground flex items-center justify-center font-bold shadow-2xs">
              <Wallet className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-base font-bold text-foreground">
                Request Earnings Payout
              </h2>
              <p className="text-xs text-muted-foreground">
                Transfer eligible earnings directly to your domestic account
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="p-1.5 rounded-lg text-muted-foreground hover:text-foreground hover:bg-secondary transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Body */}
        <form onSubmit={handleSubmit} className="p-5 space-y-5">
          {error && (
            <div className="p-3 rounded-xl bg-rose-50 text-rose-700 border border-rose-200 text-xs font-semibold">
              {error}
            </div>
          )}

          {/* Available balance indicator */}
          <div className="p-3 rounded-xl bg-secondary/30 border border-border flex items-center justify-between text-xs">
            <span className="text-muted-foreground">Available for Withdrawal</span>
            <span className="font-extrabold text-foreground">
              ETB {availableBalanceETB.toLocaleString()}
            </span>
          </div>

          {/* Amount input */}
          <div>
            <label className="block text-xs font-semibold text-foreground mb-1.5">
              Withdrawal Amount (ETB)
            </label>
            <div className="relative">
              <span className="absolute left-3.5 top-2.5 text-xs font-bold text-muted-foreground">
                ETB
              </span>
              <input
                type="number"
                min={500}
                max={availableBalanceETB}
                step={100}
                value={amount}
                onChange={(e) => {
                  setAmount(Number(e.target.value));
                  if (error) setError("");
                }}
                className="w-full pl-13 pr-3.5 py-2.5 rounded-xl border border-border focus:border-primary text-base font-bold bg-card text-foreground focus:outline-hidden ring-2 ring-primary/20"
                autoFocus
              />
            </div>

            {/* Quick Pills */}
            <div className="flex items-center gap-2 mt-2">
              <button
                type="button"
                onClick={() => handleSetPercentage(0.25)}
                className="px-2.5 py-1 rounded-lg text-[11px] font-semibold bg-secondary text-muted-foreground hover:text-foreground"
              >
                25%
              </button>
              <button
                type="button"
                onClick={() => handleSetPercentage(0.5)}
                className="px-2.5 py-1 rounded-lg text-[11px] font-semibold bg-secondary text-muted-foreground hover:text-foreground"
              >
                50%
              </button>
              <button
                type="button"
                onClick={() => handleSetPercentage(1.0)}
                className="px-2.5 py-1 rounded-lg text-[11px] font-semibold bg-secondary text-muted-foreground hover:text-foreground"
              >
                All (100%)
              </button>
            </div>
          </div>

          {/* Select Payout Destination */}
          <div>
            <label className="block text-xs font-semibold text-foreground mb-2">
              Select Destination Account
            </label>
            <div className="space-y-2">
              {payoutMethods.map((m) => {
                const isSelected = selectedMethodId === m.id;

                return (
                  <div
                    key={m.id}
                    onClick={() => setSelectedMethodId(m.id)}
                    className={`p-3 rounded-xl border transition-all cursor-pointer flex items-center justify-between ${
                      isSelected
                        ? "border-primary bg-primary-light/40 ring-1 ring-primary"
                        : "border-border bg-card hover:bg-secondary/40"
                    }`}
                  >
                    <div>
                      <h4 className="text-xs font-bold text-foreground">
                        {m.title}
                      </h4>
                      <p className="text-[11px] font-mono text-muted-foreground">
                        {m.accountIdentifier} ({m.accountHolderName})
                      </p>
                    </div>

                    <span
                      className={`w-4 h-4 rounded-full border flex items-center justify-center shrink-0 ${
                        isSelected
                          ? "border-primary bg-primary text-white"
                          : "border-muted-foreground/50"
                      }`}
                    >
                      {isSelected && <span className="w-1.5 h-1.5 rounded-full bg-white" />}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Policy footer */}
          <div className="p-3 rounded-xl bg-secondary/30 border border-border text-[11px] text-muted-foreground flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
            <span>
              Zero Asquala transaction fee. Payouts are dispatched within 24 to 48 business hours.
            </span>
          </div>

          {/* Actions */}
          <div className="flex items-center justify-end gap-2.5 pt-3 border-t border-border">
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={onClose}
              className="text-xs"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              variant="primary"
              size="sm"
              className="gap-1.5 text-xs shadow-xs"
            >
              <span>Confirm Withdrawal</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
