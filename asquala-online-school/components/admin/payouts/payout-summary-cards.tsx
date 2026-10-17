"use client";

import React from "react";
import {
  Clock,
  Smartphone,
  Landmark,
  CheckCircle2,
  TrendingUp,
  ShieldCheck,
  Zap,
} from "lucide-react";
import { useAdminUiStore } from "@/stores/admin-ui-store";

export function PayoutSummaryCards() {
  const { payoutTransactions } = useAdminUiStore();

  const pendingTransactions = payoutTransactions.filter(
    (p) => p.status === "pending"
  );
  const totalPendingETB = pendingTransactions.reduce(
    (sum, p) => sum + p.amountETB,
    0
  );

  const telebirrPending = pendingTransactions.filter(
    (p) => p.channel === "telebirr"
  );
  const telebirrPendingETB = telebirrPending.reduce(
    (sum, p) => sum + p.amountETB,
    0
  );

  const cbePending = pendingTransactions.filter((p) => p.channel === "cbe");
  const cbePendingETB = cbePending.reduce((sum, p) => sum + p.amountETB, 0);

  const settledTransactions = payoutTransactions.filter(
    (p) => p.status === "settled"
  );
  const settledETB = settledTransactions.reduce(
    (sum, p) => sum + p.amountETB,
    0
  );

  const formatETB = (amount: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "ETB",
      maximumFractionDigits: 0,
    })
      .format(amount)
      .replace("ETB", "ETB ");
  };

  const cards = [
    {
      id: "pending-clearance",
      label: "Pending Clearance Volume",
      value: formatETB(totalPendingETB),
      subtext: `${pendingTransactions.length} pending educator withdrawal requests`,
      badge: "Action Required",
      badgeColor: "bg-amber-50 text-amber-800 border-amber-200",
      icon: Clock,
      iconColor: "text-amber-700 bg-amber-50 border-amber-200",
      accentBorder: "border-l-4 border-l-amber-500",
    },
    {
      id: "telebirr-queue",
      label: "Telebirr Mobile Queue",
      value: formatETB(telebirrPendingETB),
      subtext: `${telebirrPending.length} instant wallet transfer requests`,
      badge: "Instant API Rails",
      badgeColor: "bg-emerald-50 text-emerald-800 border-emerald-200",
      icon: Smartphone,
      iconColor: "text-emerald-800 bg-emerald-50 border-emerald-200",
      accentBorder: "border-l-4 border-l-emerald-600",
    },
    {
      id: "cbe-queue",
      label: "CBE Bank Wire Queue",
      value: formatETB(cbePendingETB),
      subtext: `${cbePending.length} commercial bank RTGS/ACH requests`,
      badge: "Direct Core Banking",
      badgeColor: "bg-emerald-50 text-emerald-800 border-emerald-200",
      icon: Landmark,
      iconColor: "text-emerald-800 bg-emerald-50 border-emerald-200",
      accentBorder: "border-l-4 border-l-emerald-700",
    },
    {
      id: "settled-volume",
      label: "Disbursed This Month",
      value: formatETB(settledETB),
      subtext: `${settledTransactions.length} settled & reconciled disbursements`,
      badge: "100% Reconciled",
      badgeColor: "bg-emerald-100 text-emerald-900 border-emerald-300",
      icon: CheckCircle2,
      iconColor: "text-emerald-800 bg-emerald-100 border-emerald-300",
      accentBorder: "border-l-4 border-l-emerald-800",
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {cards.map((card) => {
        const IconComponent = card.icon;
        return (
          <div
            key={card.id}
            className={`bg-card border border-border rounded-2xl p-4 sm:p-5 shadow-2xs space-y-3 transition-all hover:shadow-xs ${card.accentBorder}`}
          >
            <div className="flex items-center justify-between">
              <div
                className={`w-9 h-9 rounded-xl border flex items-center justify-center ${card.iconColor}`}
              >
                <IconComponent className="w-4 h-4" />
              </div>
              <span
                className={`text-[11px] font-bold px-2 py-0.5 rounded-full border ${card.badgeColor}`}
              >
                {card.badge}
              </span>
            </div>

            <div>
              <span className="text-xs font-semibold text-muted-foreground block mb-0.5">
                {card.label}
              </span>
              <p className="text-xl sm:text-2xl font-bold tracking-tight text-foreground">
                {card.value}
              </p>
            </div>

            <div className="pt-2 border-t border-border flex items-center justify-between text-[11px] text-muted-foreground">
              <span>{card.subtext}</span>
            </div>
          </div>
        );
      })}
    </div>
  );
}
