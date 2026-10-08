"use client";

import React from "react";
import { Download, CheckCircle2, Clock, AlertCircle, FileText } from "lucide-react";
import { PayoutTransactionItem } from "@/lib/mock-instructor-data";

interface PayoutHistoryTableProps {
  transactions: PayoutTransactionItem[];
}

export function PayoutHistoryTable({ transactions }: PayoutHistoryTableProps) {
  return (
    <div className="bg-card border border-border rounded-2xl p-5 sm:p-6 shadow-xs space-y-4">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-border/80">
        <div>
          <h3 className="text-base font-bold text-foreground">
            Payout History &amp; Settlement Ledger
          </h3>
          <p className="text-xs text-muted-foreground">
            Audit trail of all requested and completed creator withdrawals
          </p>
        </div>

        <span className="text-xs font-semibold text-muted-foreground">
          {transactions.length} Total Settlements
        </span>
      </div>

      {/* Table Container */}
      <div className="overflow-x-auto -mx-5 sm:mx-0">
        <table className="w-full text-left text-xs">
          <thead>
            <tr className="border-b border-border text-[11px] font-bold uppercase tracking-wider text-muted-foreground bg-secondary/30">
              <th className="py-3 px-4">Date</th>
              <th className="py-3 px-4">Reference ID</th>
              <th className="py-3 px-4">Destination Account</th>
              <th className="py-3 px-4">Amount</th>
              <th className="py-3 px-4">Status</th>
              <th className="py-3 px-4 text-right">Receipt</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border/60">
            {transactions.map((tx) => (
              <tr key={tx.id} className="hover:bg-secondary/30 transition-colors">
                <td className="py-3 px-4 font-medium text-foreground whitespace-nowrap">
                  {tx.date}
                </td>
                <td className="py-3 px-4 font-mono font-semibold text-primary whitespace-nowrap">
                  {tx.transactionRef}
                </td>
                <td className="py-3 px-4">
                  <div className="min-w-[140px]">
                    <span className="font-semibold text-foreground block">
                      {tx.methodLabel}
                    </span>
                    <span className="text-[11px] text-muted-foreground font-mono">
                      {tx.accountDetails}
                    </span>
                  </div>
                </td>
                <td className="py-3 px-4 font-extrabold text-foreground whitespace-nowrap">
                  ETB {tx.amountETB.toLocaleString()}
                </td>
                <td className="py-3 px-4 whitespace-nowrap">
                  {tx.status === "completed" && (
                    <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-200">
                      <CheckCircle2 className="w-3 h-3" />
                      <span>COMPLETED</span>
                    </span>
                  )}
                  {tx.status === "processing" && (
                    <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-amber-50 text-amber-700 border border-amber-200">
                      <Clock className="w-3 h-3" />
                      <span>PROCESSING</span>
                    </span>
                  )}
                  {tx.status === "pending" && (
                    <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-slate-100 text-slate-700 border border-slate-200">
                      <span>PENDING</span>
                    </span>
                  )}
                </td>
                <td className="py-3 px-4 text-right whitespace-nowrap">
                  <button
                    type="button"
                    onClick={() =>
                      alert(`Downloading official tax receipt for ${tx.transactionRef}`)
                    }
                    className="p-1.5 rounded-lg border border-border bg-card hover:bg-secondary text-muted-foreground hover:text-primary transition-colors inline-flex items-center gap-1"
                    title="Download Tax / VAT Receipt"
                  >
                    <Download className="w-3.5 h-3.5" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
