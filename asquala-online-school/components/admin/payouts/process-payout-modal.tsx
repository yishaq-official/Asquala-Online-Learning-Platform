"use client";

import React, { useState } from "react";
import Image from "next/image";
import {
  X,
  Smartphone,
  Landmark,
  ShieldCheck,
  CheckCircle2,
  AlertCircle,
  Hash,
  Sparkles,
  ArrowRight,
} from "lucide-react";
import { PayoutTransaction } from "@/types/admin";
import { useAdminUiStore } from "@/stores/admin-ui-store";

interface ProcessPayoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  payout: PayoutTransaction | null;
}

export function ProcessPayoutModal({
  isOpen,
  onClose,
  payout,
}: ProcessPayoutModalProps) {
  const { settlePayoutTransaction, activeAuditor } = useAdminUiStore();

  const [transactionRef, setTransactionRef] = useState("");
  const [memo, setMemo] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  if (!isOpen || !payout) return null;

  const formatETB = (amount: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "ETB",
      maximumFractionDigits: 0,
    })
      .format(amount)
      .replace("ETB", "ETB ");
  };

  const handleGenerateRef = () => {
    const randomSuffix = Math.floor(100000 + Math.random() * 900000);
    if (payout.channel === "telebirr") {
      setTransactionRef(`TLB-TX-${randomSuffix}`);
    } else {
      setTransactionRef(`CBE-FT-${randomSuffix}`);
    }
    setError(null);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!transactionRef.trim()) {
      setError("Please provide or generate a valid Transaction Reference ID.");
      return;
    }

    setIsSubmitting(true);
    setTimeout(() => {
      settlePayoutTransaction(
        payout.id,
        transactionRef.trim(),
        memo.trim() || undefined
      );
      setIsSubmitting(false);
      onClose();
    }, 400);
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in duration-200"
      role="dialog"
      aria-modal="true"
      aria-labelledby="payout-modal-title"
    >
      <div className="bg-card border border-border rounded-3xl w-full max-w-xl shadow-xl overflow-hidden animate-in zoom-in-95 duration-200">
        {/* Header */}
        <div className="p-5 sm:p-6 border-b border-border flex items-center justify-between bg-muted/30">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-emerald-50 border border-emerald-200 flex items-center justify-center text-emerald-800">
              {payout.channel === "telebirr" ? (
                <Smartphone className="w-5 h-5" />
              ) : (
                <Landmark className="w-5 h-5" />
              )}
            </div>
            <div>
              <h2
                id="payout-modal-title"
                className="text-base font-bold text-foreground"
              >
                Authorize & Settle Disbursement
              </h2>
              <p className="text-xs text-muted-foreground">
                Domestic royalty payout • Batch #{payout.id.toUpperCase()}
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
            aria-label="Close modal"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Content */}
        <form onSubmit={handleSubmit} className="p-5 sm:p-6 space-y-5">
          {/* Payee & Amount Highlight */}
          <div className="bg-emerald-50/70 border border-emerald-200 rounded-2xl p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="relative w-12 h-12 rounded-full overflow-hidden border-2 border-emerald-300 shrink-0">
                <Image
                  src={payout.instructorAvatar}
                  alt={payout.instructorName}
                  fill
                  className="object-cover"
                />
              </div>
              <div>
                <span className="text-[11px] font-bold text-emerald-900 uppercase tracking-wider block">
                  Educator Payee
                </span>
                <p className="text-sm font-bold text-emerald-950">
                  {payout.instructorName}
                </p>
                <p className="text-xs text-emerald-800/80">
                  {payout.instructorEmail}
                </p>
              </div>
            </div>

            <div className="sm:text-right border-t sm:border-t-0 sm:border-l border-emerald-200 pt-3 sm:pt-0 sm:pl-4">
              <span className="text-[11px] font-bold text-emerald-900 uppercase tracking-wider block">
                Net Disbursement
              </span>
              <p className="text-2xl font-black text-emerald-900">
                {formatETB(payout.amountETB)}
              </p>
            </div>
          </div>

          {/* Channel Specific Details */}
          <div className="bg-card border border-border rounded-2xl p-4 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-foreground flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-emerald-700" />
                Verified Disbursement Channel
              </span>
              <span className="text-[11px] font-bold px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-900 border border-emerald-200">
                {payout.channel === "telebirr"
                  ? "Telebirr Mobile Wallet"
                  : "Commercial Bank of Ethiopia"}
              </span>
            </div>

            {payout.channel === "telebirr" ? (
              <div className="grid grid-cols-2 gap-3 text-xs">
                <div className="p-3 rounded-xl bg-muted/40 border border-border">
                  <span className="text-muted-foreground block text-[11px] mb-1">
                    Registered Mobile Number
                  </span>
                  <p className="font-bold text-foreground font-mono">
                    {payout.telebirrPhone}
                  </p>
                </div>
                <div className="p-3 rounded-xl bg-muted/40 border border-border">
                  <span className="text-muted-foreground block text-[11px] mb-1">
                    Gateway Routing
                  </span>
                  <p className="font-semibold text-emerald-800">
                    Ethio Telecom Instant Rails
                  </p>
                </div>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                <div className="p-3 rounded-xl bg-muted/40 border border-border">
                  <span className="text-muted-foreground block text-[11px] mb-1">
                    CBE Account Number
                  </span>
                  <p className="font-bold text-foreground font-mono">
                    {payout.cbeAccountNumber}
                  </p>
                </div>
                <div className="p-3 rounded-xl bg-muted/40 border border-border">
                  <span className="text-muted-foreground block text-[11px] mb-1">
                    Account Holder Name
                  </span>
                  <p className="font-bold text-foreground">
                    {payout.cbeAccountName}
                  </p>
                </div>
                <div className="sm:col-span-2 p-3 rounded-xl bg-muted/40 border border-border">
                  <span className="text-muted-foreground block text-[11px] mb-1">
                    Designated Branch
                  </span>
                  <p className="font-medium text-foreground">
                    {payout.cbeBranch}
                  </p>
                </div>
              </div>
            )}
          </div>

          {/* Reference ID Input */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <label
                htmlFor="transaction-ref"
                className="text-xs font-bold text-foreground flex items-center gap-1.5"
              >
                <Hash className="w-3.5 h-3.5 text-emerald-700" />
                Bank / Telebirr Transaction Reference ID
                <span className="text-rose-500">*</span>
              </label>

              <button
                type="button"
                onClick={handleGenerateRef}
                className="text-[11px] font-semibold text-emerald-800 hover:text-emerald-950 flex items-center gap-1 transition-colors"
              >
                <Sparkles className="w-3 h-3" />
                Auto-generate Ref
              </button>
            </div>

            <input
              id="transaction-ref"
              type="text"
              placeholder={
                payout.channel === "telebirr"
                  ? "e.g. TLB-TX-998201"
                  : "e.g. CBE-FT-889104"
              }
              value={transactionRef}
              onChange={(e) => {
                setTransactionRef(e.target.value);
                if (error) setError(null);
              }}
              className="w-full px-3.5 py-2.5 rounded-xl border border-border bg-background text-sm font-mono text-foreground focus:outline-hidden focus:ring-2 focus:ring-emerald-600 focus:border-emerald-600 transition-all placeholder:text-muted-foreground/60"
            />

            {error && (
              <p className="text-xs font-semibold text-rose-600 flex items-center gap-1 mt-1">
                <AlertCircle className="w-3.5 h-3.5" />
                {error}
              </p>
            )}
          </div>

          {/* Internal Memo */}
          <div className="space-y-1.5">
            <label
              htmlFor="payout-memo"
              className="text-xs font-semibold text-muted-foreground"
            >
              Treasury Reconciliation Memo (Optional)
            </label>
            <input
              id="payout-memo"
              type="text"
              placeholder="e.g. Cleared via CBE Core Banking direct file upload"
              value={memo}
              onChange={(e) => setMemo(e.target.value)}
              className="w-full px-3.5 py-2 rounded-xl border border-border bg-background text-xs text-foreground focus:outline-hidden focus:ring-2 focus:ring-emerald-600 focus:border-emerald-600 transition-all placeholder:text-muted-foreground/60"
            />
          </div>

          {/* Regulatory / Compliance Notice */}
          <div className="p-3 rounded-xl bg-muted/40 border border-border text-[11px] text-muted-foreground flex items-start gap-2">
            <ShieldCheck className="w-4 h-4 text-emerald-700 shrink-0 mt-0.5" />
            <p>
              By authorizing settlement, you certify that funds have cleared the
              designated Ethiopian banking rail under auditor{" "}
              <strong className="text-foreground">{activeAuditor.name}</strong>.
              Automated SMS remittance advice will be transmitted to the payee.
            </p>
          </div>

          {/* Modal Actions */}
          <div className="pt-2 flex items-center justify-end gap-3 border-t border-border">
            <button
              type="button"
              onClick={onClose}
              disabled={isSubmitting}
              className="px-4 py-2.5 rounded-xl text-xs font-bold text-muted-foreground hover:text-foreground hover:bg-muted border border-border transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-bold bg-primary text-primary-foreground hover:bg-primary-hover shadow-2xs transition-all disabled:opacity-50"
            >
              {isSubmitting ? (
                <span>Reconciling...</span>
              ) : (
                <>
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>Authorize & Settle Disbursement</span>
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
