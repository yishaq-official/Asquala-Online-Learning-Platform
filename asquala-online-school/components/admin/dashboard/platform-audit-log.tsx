"use client";

import React from "react";
import Link from "next/link";
import {
  ShieldCheck,
  CheckCircle2,
  AlertTriangle,
  Clock,
  ArrowRight,
  Shield,
  Layers,
} from "lucide-react";
import { PLATFORM_AUDIT_LOG_DATA } from "@/lib/mock-admin-data";

export function PlatformAuditLog() {
  return (
    <div className="bg-card border border-border rounded-3xl p-5 sm:p-6 shadow-2xs space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between pb-3 border-b border-border">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-xl bg-emerald-50 border border-emerald-200 flex items-center justify-center text-emerald-800">
            <ShieldCheck className="w-4 h-4" />
          </div>
          <div>
            <h2 className="text-sm font-bold text-foreground">
              Governance Audit Ledger
            </h2>
            <p className="text-[11px] text-muted-foreground">
              Cryptographically signed board decisions
            </p>
          </div>
        </div>

        <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 border border-emerald-200 flex items-center gap-1">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 animate-pulse" />
          Live Stream
        </span>
      </div>

      {/* Audit Items Stream */}
      <div className="space-y-3">
        {PLATFORM_AUDIT_LOG_DATA.map((entry) => {
          const isApproved = entry.status === "approved";
          const isFlagged = entry.status === "flagged";
          const isSettled = entry.status === "settled";

          return (
            <div
              key={entry.id}
              className="p-3 rounded-2xl bg-secondary/40 hover:bg-secondary/70 border border-border/80 transition-colors flex items-start justify-between gap-3"
            >
              <div className="flex items-start gap-2.5 min-w-0">
                <div
                  className={`w-7 h-7 rounded-lg flex items-center justify-center shrink-0 mt-0.5 ${
                    isApproved
                      ? "bg-emerald-100 text-emerald-800 border border-emerald-200"
                      : isFlagged
                      ? "bg-amber-100 text-amber-800 border border-amber-200"
                      : "bg-emerald-100 text-emerald-800 border border-emerald-200"
                  }`}
                >
                  {isApproved ? (
                    <CheckCircle2 className="w-4 h-4" />
                  ) : isFlagged ? (
                    <AlertTriangle className="w-4 h-4" />
                  ) : (
                    <ShieldCheck className="w-4 h-4" />
                  )}
                </div>

                <div className="min-w-0 flex-1">
                  <div className="flex items-baseline gap-2">
                    <p className="text-xs font-bold text-foreground truncate">
                      {entry.action}
                    </p>
                    <span className="text-[10px] text-muted-foreground font-medium shrink-0">
                      {entry.timestamp}
                    </span>
                  </div>

                  <p className="text-[11px] text-muted-foreground truncate mt-0.5">
                    Target: <span className="font-semibold text-foreground/90">{entry.target}</span>
                  </p>

                  <div className="flex items-center gap-2 mt-1">
                    <span className="text-[10px] text-muted-foreground">
                      Actor: <strong className="text-emerald-950 font-bold">{entry.actor}</strong> ({entry.actorRole})
                    </span>
                  </div>
                </div>
              </div>

              <span
                className={`text-[9px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full shrink-0 border ${
                  isApproved
                    ? "bg-emerald-100 text-emerald-800 border-emerald-200"
                    : isFlagged
                    ? "bg-amber-100 text-amber-900 border-amber-300"
                    : "bg-emerald-100 text-emerald-800 border-emerald-200"
                }`}
              >
                {entry.status}
              </span>
            </div>
          );
        })}
      </div>

      {/* Footer Link */}
      <div className="pt-2 border-t border-border flex justify-between items-center text-xs">
        <Link
          href="/admin/settings"
          className="font-bold text-primary hover:underline flex items-center gap-1"
        >
          <span>View Full Platform Security & Audit Ledger</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </Link>
      </div>
    </div>
  );
}
