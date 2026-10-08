"use client";

import React from "react";
import { PieChart, ShieldCheck, Zap, Server, Award } from "lucide-react";

export function RevenueBreakdownChart() {
  return (
    <div className="bg-card border border-border rounded-2xl p-5 sm:p-6 shadow-xs space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-border/80">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-primary-light text-primary flex items-center justify-center font-bold">
            <PieChart className="w-4 h-4" />
          </div>
          <div>
            <h3 className="text-base font-bold text-foreground">
              Fair &amp; Transparent Revenue Model
            </h3>
            <p className="text-xs text-muted-foreground">
              How course enrollment fees are distributed
            </p>
          </div>
        </div>

        <span className="px-3 py-1 rounded-full text-xs font-extrabold bg-primary text-primary-foreground">
          85% Instructor Share
        </span>
      </div>

      {/* Visual Bar Split */}
      <div className="space-y-2">
        <div className="h-5 rounded-xl overflow-hidden flex shadow-2xs">
          <div
            style={{ width: "85%" }}
            className="bg-primary flex items-center justify-center text-[11px] font-bold text-primary-foreground"
          >
            85% Educator Payout
          </div>
          <div
            style={{ width: "15%" }}
            className="bg-slate-700 flex items-center justify-center text-[10px] font-bold text-white"
          >
            15%
          </div>
        </div>

        <div className="flex items-center justify-between text-xs font-semibold text-muted-foreground pt-1">
          <span className="text-primary font-bold">
            85% Direct Net Earnings to your Bank / Telebirr
          </span>
          <span className="text-muted-foreground">
            15% Platform Infrastructure &amp; Processing
          </span>
        </div>
      </div>

      {/* What the 15% platform fee covers */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
        <div className="p-3.5 rounded-xl border border-border bg-secondary/30 space-y-1">
          <div className="flex items-center gap-2 text-foreground font-semibold text-xs">
            <Server className="w-3.5 h-3.5 text-primary" />
            <span>High-Def Video CDN</span>
          </div>
          <p className="text-[11px] text-muted-foreground leading-snug">
            Low-latency video streaming optimized for Ethiopian mobile network connectivity.
          </p>
        </div>

        <div className="p-3.5 rounded-xl border border-border bg-secondary/30 space-y-1">
          <div className="flex items-center gap-2 text-foreground font-semibold text-xs">
            <Zap className="w-3.5 h-3.5 text-primary" />
            <span>Payment Settlement</span>
          </div>
          <p className="text-[11px] text-muted-foreground leading-snug">
            Telebirr and CBE Birr transaction gateway costs are absorbed directly by Asquala.
          </p>
        </div>

        <div className="p-3.5 rounded-xl border border-border bg-secondary/30 space-y-1">
          <div className="flex items-center gap-2 text-foreground font-semibold text-xs">
            <Award className="w-3.5 h-3.5 text-primary" />
            <span>Accredited Certificates</span>
          </div>
          <p className="text-[11px] text-muted-foreground leading-snug">
            Cryptographic certificate generation and verifiable public student credentials.
          </p>
        </div>
      </div>
    </div>
  );
}
