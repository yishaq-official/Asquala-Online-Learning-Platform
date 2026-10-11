"use client";

import React from "react";
import Link from "next/link";
import {
  Landmark,
  Smartphone,
  Building2,
  ArrowRight,
  ShieldCheck,
  Coins,
  CheckCircle2,
} from "lucide-react";
import { TREASURY_CLEARANCE_DATA } from "@/lib/mock-admin-data";

export function TreasuryQuickCard() {
  const formatETB = (amount: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "ETB",
      maximumFractionDigits: 0,
    })
      .format(amount)
      .replace("ETB", "ETB ");
  };

  return (
    <div className="bg-card border border-border rounded-3xl p-5 sm:p-6 shadow-2xs space-y-4 flex flex-col justify-between">
      <div>
        {/* Card Header */}
        <div className="flex items-center justify-between pb-3 border-b border-border">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl bg-emerald-50 border border-emerald-200 flex items-center justify-center text-emerald-800">
              <Landmark className="w-4 h-4" />
            </div>
            <div>
              <h2 className="text-sm font-bold text-foreground">
                Treasury & Payouts Clearance
              </h2>
              <p className="text-[11px] text-muted-foreground">
                Domestic bank & mobile wallet settlement
              </p>
            </div>
          </div>

          <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 border border-emerald-200">
            National Gateways
          </span>
        </div>

        {/* Total Pending Volume Banner */}
        <div className="my-4 p-4 rounded-2xl bg-emerald-50/80 border border-emerald-200/80 space-y-1">
          <span className="text-[11px] font-bold text-emerald-950 uppercase tracking-wider block">
            Pending Clearance Volume
          </span>
          <div className="flex items-baseline gap-2">
            <p className="text-2xl font-bold tracking-tight text-emerald-950">
              {formatETB(TREASURY_CLEARANCE_DATA.totalPendingETB)}
            </p>
            <span className="text-xs font-semibold text-emerald-800">
              ({TREASURY_CLEARANCE_DATA.totalPendingCount} payout requests)
            </span>
          </div>
          <p className="text-[11px] text-emerald-800">
            Awaiting Board Chair cryptographic disbursement signature
          </p>
        </div>

        {/* Gateway Split List */}
        <div className="space-y-2.5">
          {/* Telebirr Channel */}
          <div className="p-3 rounded-xl bg-secondary/50 border border-border flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-emerald-100 text-emerald-800 flex items-center justify-center shrink-0">
                <Smartphone className="w-4 h-4" />
              </div>
              <div>
                <p className="text-xs font-bold text-foreground">
                  Telebirr Direct
                </p>
                <p className="text-[10px] text-muted-foreground">
                  {TREASURY_CLEARANCE_DATA.telebirrCount} pending instant transfers
                </p>
              </div>
            </div>
            <span className="text-xs font-bold text-foreground">
              {formatETB(TREASURY_CLEARANCE_DATA.telebirrPendingETB)}
            </span>
          </div>

          {/* CBE Channel */}
          <div className="p-3 rounded-xl bg-secondary/50 border border-border flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-emerald-100 text-emerald-800 flex items-center justify-center shrink-0">
                <Building2 className="w-4 h-4" />
              </div>
              <div>
                <p className="text-xs font-bold text-foreground">
                  Commercial Bank of Ethiopia
                </p>
                <p className="text-[10px] text-muted-foreground">
                  {TREASURY_CLEARANCE_DATA.cbeCount} pending branch wire transfer
                </p>
              </div>
            </div>
            <span className="text-xs font-bold text-foreground">
              {formatETB(TREASURY_CLEARANCE_DATA.cbePendingETB)}
            </span>
          </div>
        </div>
      </div>

      {/* CTA Button & Last Batch info */}
      <div className="pt-3 border-t border-border space-y-2">
        <Link
          href="/admin/payouts"
          className="w-full flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl text-xs font-bold bg-primary text-primary-foreground hover:bg-primary-hover shadow-2xs transition-colors"
        >
          <span>Open Settlement Clearance Desk</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </Link>
        <div className="flex items-center justify-between text-[10px] text-muted-foreground px-1">
          <span>Last Batch: {TREASURY_CLEARANCE_DATA.lastSettlementBatchId}</span>
          <span>{TREASURY_CLEARANCE_DATA.lastSettlementTime}</span>
        </div>
      </div>
    </div>
  );
}
