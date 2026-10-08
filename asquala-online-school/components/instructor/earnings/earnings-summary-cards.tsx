"use client";

import React from "react";
import {
  Wallet,
  Clock,
  TrendingUp,
  DollarSign,
  ArrowUpRight,
  ShieldCheck,
} from "lucide-react";
import { Button } from "@/components/ui/button";

interface EarningsSummaryCardsProps {
  availableBalanceETB: number;
  pendingClearanceETB: number;
  lifetimeEarningsETB: number;
  totalPaidOutETB: number;
  thisMonthRevenueETB: number;
  onRequestPayout: () => void;
}

export function EarningsSummaryCards({
  availableBalanceETB,
  pendingClearanceETB,
  lifetimeEarningsETB,
  totalPaidOutETB,
  thisMonthRevenueETB,
  onRequestPayout,
}: EarningsSummaryCardsProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
      {/* 1. Available for Payout (Primary) */}
      <div className="bg-card border-2 border-primary/30 rounded-2xl p-5 shadow-xs flex flex-col justify-between relative overflow-hidden bg-gradient-to-br from-card via-card to-primary-light/20">
        <div className="space-y-2">
          <div className="flex items-center justify-between text-muted-foreground">
            <span className="text-xs font-bold uppercase tracking-wider text-primary">
              Available For Payout
            </span>
            <div className="w-8 h-8 rounded-xl bg-primary text-primary-foreground flex items-center justify-center shadow-2xs">
              <Wallet className="w-4 h-4" />
            </div>
          </div>

          <div className="text-2xl sm:text-3xl font-extrabold text-foreground tracking-tight">
            ETB {availableBalanceETB.toLocaleString()}
          </div>

          <p className="text-[11px] text-muted-foreground leading-snug">
            Eligible for immediate withdrawal to your Telebirr or CBE account.
          </p>
        </div>

        <div className="pt-4">
          <Button
            type="button"
            variant="primary"
            size="sm"
            onClick={onRequestPayout}
            disabled={availableBalanceETB < 500}
            className="w-full gap-1.5 text-xs shadow-xs"
          >
            <span>Request Payout</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </Button>
        </div>
      </div>

      {/* 2. Pending Clearance */}
      <div className="bg-card border border-border rounded-2xl p-5 shadow-xs flex flex-col justify-between">
        <div className="space-y-2">
          <div className="flex items-center justify-between text-muted-foreground">
            <span className="text-xs font-semibold text-muted-foreground">
              Pending Clearance
            </span>
            <div className="w-8 h-8 rounded-xl bg-secondary text-foreground flex items-center justify-center">
              <Clock className="w-4 h-4 text-muted-foreground" />
            </div>
          </div>

          <div className="text-2xl sm:text-3xl font-extrabold text-foreground tracking-tight">
            ETB {pendingClearanceETB.toLocaleString()}
          </div>

          <p className="text-[11px] text-muted-foreground leading-snug">
            Protected under Asquala&apos;s standard 14-day student completion policy.
          </p>
        </div>

        <div className="pt-4 text-[11px] text-muted-foreground flex items-center gap-1.5 border-t border-border/80">
          <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
          <span>Settles automatically to available balance</span>
        </div>
      </div>

      {/* 3. This Month Revenue */}
      <div className="bg-card border border-border rounded-2xl p-5 shadow-xs flex flex-col justify-between">
        <div className="space-y-2">
          <div className="flex items-center justify-between text-muted-foreground">
            <span className="text-xs font-semibold text-muted-foreground">
              This Month&apos;s Revenue
            </span>
            <div className="w-8 h-8 rounded-xl bg-emerald-50 text-emerald-700 border border-emerald-200 flex items-center justify-center">
              <TrendingUp className="w-4 h-4" />
            </div>
          </div>

          <div className="text-2xl sm:text-3xl font-extrabold text-foreground tracking-tight">
            ETB {thisMonthRevenueETB.toLocaleString()}
          </div>

          <p className="text-[11px] text-emerald-700 font-semibold flex items-center gap-1">
            <TrendingUp className="w-3 h-3" />
            <span>+18% higher than last month</span>
          </p>
        </div>

        <div className="pt-4 text-[11px] text-muted-foreground border-t border-border/80">
          <span>From 142 new student course enrollments</span>
        </div>
      </div>

      {/* 4. Lifetime Earnings */}
      <div className="bg-card border border-border rounded-2xl p-5 shadow-xs flex flex-col justify-between">
        <div className="space-y-2">
          <div className="flex items-center justify-between text-muted-foreground">
            <span className="text-xs font-semibold text-muted-foreground">
              Lifetime Creator Revenue
            </span>
            <div className="w-8 h-8 rounded-xl bg-primary-light text-primary flex items-center justify-center font-bold">
              <DollarSign className="w-4 h-4" />
            </div>
          </div>

          <div className="text-2xl sm:text-3xl font-extrabold text-foreground tracking-tight">
            ETB {lifetimeEarningsETB.toLocaleString()}
          </div>

          <p className="text-[11px] text-muted-foreground leading-snug">
            All-time net earnings across all published courses.
          </p>
        </div>

        <div className="pt-4 text-[11px] text-muted-foreground border-t border-border/80">
          <span>Total Withdrawn: <strong>ETB {totalPaidOutETB.toLocaleString()}</strong></span>
        </div>
      </div>
    </div>
  );
}
