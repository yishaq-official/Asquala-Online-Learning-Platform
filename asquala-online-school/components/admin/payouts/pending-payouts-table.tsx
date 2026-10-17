"use client";

import React, { useState, useMemo } from "react";
import Image from "next/image";
import {
  Search,
  Smartphone,
  Landmark,
  Clock,
  CheckCircle2,
  Filter,
  Copy,
  Check,
  Zap,
  ArrowUpDown,
  ExternalLink,
} from "lucide-react";
import { PayoutTransaction, PayoutChannel, PayoutStatus } from "@/types/admin";
import { useAdminUiStore } from "@/stores/admin-ui-store";

interface PendingPayoutsTableProps {
  onSelectPayout: (payout: PayoutTransaction) => void;
}

export function PendingPayoutsTable({
  onSelectPayout,
}: PendingPayoutsTableProps) {
  const { payoutTransactions } = useAdminUiStore();

  const [statusFilter, setStatusFilter] = useState<"all" | "pending" | "settled">("all");
  const [channelFilter, setChannelFilter] = useState<"all" | PayoutChannel>("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const formatETB = (amount: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "ETB",
      maximumFractionDigits: 0,
    })
      .format(amount)
      .replace("ETB", "ETB ");
  };

  const filteredTransactions = useMemo(() => {
    return payoutTransactions.filter((p) => {
      // Status filter
      if (statusFilter !== "all" && p.status !== statusFilter) {
        return false;
      }
      // Channel filter
      if (channelFilter !== "all" && p.channel !== channelFilter) {
        return false;
      }
      // Search query
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase();
        const matchesName = p.instructorName.toLowerCase().includes(query);
        const matchesEmail = p.instructorEmail.toLowerCase().includes(query);
        const matchesRef = p.transactionRefId?.toLowerCase().includes(query);
        const matchesAccount =
          p.telebirrPhone?.toLowerCase().includes(query) ||
          p.cbeAccountNumber?.toLowerCase().includes(query);
        if (!matchesName && !matchesEmail && !matchesRef && !matchesAccount) {
          return false;
        }
      }
      return true;
    });
  }, [payoutTransactions, statusFilter, channelFilter, searchQuery]);

  const pendingCount = payoutTransactions.filter((p) => p.status === "pending").length;
  const settledCount = payoutTransactions.filter((p) => p.status === "settled").length;

  const handleCopyRef = (refId: string) => {
    navigator.clipboard.writeText(refId);
    setCopiedId(refId);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <div className="bg-card border border-border rounded-3xl shadow-2xs overflow-hidden">
      {/* Table Header & Controls */}
      <div className="p-5 sm:p-6 border-b border-border space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <h2 className="text-base font-bold text-foreground flex items-center gap-2">
              <Landmark className="w-4 h-4 text-emerald-800" />
              Domestic Payout & Royalty Ledger
            </h2>
            <p className="text-xs text-muted-foreground">
              Review educator earnings, reconcile Telebirr mobile wallets, and settle CBE wire transfers
            </p>
          </div>

          {/* Channel Filter Pills */}
          <div className="flex items-center gap-1.5 p-1 rounded-xl bg-muted/50 border border-border self-start sm:self-auto">
            <button
              onClick={() => setChannelFilter("all")}
              className={`px-3 py-1 rounded-lg text-xs font-semibold transition-all ${
                channelFilter === "all"
                  ? "bg-card text-foreground shadow-2xs"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              All Rails
            </button>
            <button
              onClick={() => setChannelFilter("telebirr")}
              className={`flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-semibold transition-all ${
                channelFilter === "telebirr"
                  ? "bg-card text-emerald-900 shadow-2xs"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              <Smartphone className="w-3 h-3 text-emerald-700" />
              Telebirr
            </button>
            <button
              onClick={() => setChannelFilter("cbe")}
              className={`flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-semibold transition-all ${
                channelFilter === "cbe"
                  ? "bg-card text-emerald-900 shadow-2xs"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              <Landmark className="w-3 h-3 text-emerald-700" />
              CBE Bank
            </button>
          </div>
        </div>

        {/* Filter Tabs and Search Bar */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 pt-2">
          {/* Status Tabs */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => setStatusFilter("all")}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all ${
                statusFilter === "all"
                  ? "bg-emerald-50 text-emerald-950 border border-emerald-200"
                  : "text-muted-foreground hover:text-foreground hover:bg-muted"
              }`}
            >
              All Transactions ({payoutTransactions.length})
            </button>

            <button
              onClick={() => setStatusFilter("pending")}
              className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all ${
                statusFilter === "pending"
                  ? "bg-amber-50 text-amber-900 border border-amber-200"
                  : "text-muted-foreground hover:text-foreground hover:bg-muted"
              }`}
            >
              <Clock className="w-3.5 h-3.5 text-amber-600" />
              <span>Pending Clearance</span>
              <span className="px-1.5 py-0.2 rounded-full text-[10px] bg-amber-200/80 text-amber-950">
                {pendingCount}
              </span>
            </button>

            <button
              onClick={() => setStatusFilter("settled")}
              className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all ${
                statusFilter === "settled"
                  ? "bg-emerald-50 text-emerald-950 border border-emerald-200"
                  : "text-muted-foreground hover:text-foreground hover:bg-muted"
              }`}
            >
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-700" />
              <span>Settled</span>
              <span className="px-1.5 py-0.2 rounded-full text-[10px] bg-emerald-200/80 text-emerald-950">
                {settledCount}
              </span>
            </button>
          </div>

          {/* Search Input */}
          <div className="relative w-full sm:w-64">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search payee or ref..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-3 py-1.5 rounded-xl border border-border bg-background text-xs text-foreground placeholder:text-muted-foreground/60 focus:outline-hidden focus:ring-2 focus:ring-emerald-600 focus:border-emerald-600 transition-all"
            />
          </div>
        </div>
      </div>

      {/* Desktop Table View */}
      <div className="hidden md:block overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-border bg-muted/20 text-[11px] font-bold text-muted-foreground uppercase tracking-wider">
              <th className="py-3 px-6">Educator Payee</th>
              <th className="py-3 px-4">Net Royalty</th>
              <th className="py-3 px-4">Payment Rail & Account</th>
              <th className="py-3 px-4">Request Date</th>
              <th className="py-3 px-4">Clearance Status</th>
              <th className="py-3 px-4">Reference / Memo</th>
              <th className="py-3 px-6 text-right">Clearance Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border text-xs">
            {filteredTransactions.length === 0 ? (
              <tr>
                <td colSpan={7} className="py-12 text-center text-muted-foreground">
                  <div className="max-w-xs mx-auto space-y-2">
                    <p className="font-semibold text-foreground">No payout records found</p>
                    <p className="text-[11px]">
                      Try adjusting your filter tabs, payment channel selection, or search query.
                    </p>
                  </div>
                </td>
              </tr>
            ) : (
              filteredTransactions.map((payout) => {
                const isPending = payout.status === "pending";

                return (
                  <tr
                    key={payout.id}
                    className="hover:bg-muted/30 transition-colors group"
                  >
                    {/* Payee Info */}
                    <td className="py-4 px-6">
                      <div className="flex items-center gap-3">
                        <div className="relative w-9 h-9 rounded-full overflow-hidden border border-border shrink-0">
                          <Image
                            src={payout.instructorAvatar}
                            alt={payout.instructorName}
                            fill
                            className="object-cover"
                          />
                        </div>
                        <div>
                          <p className="font-bold text-foreground">
                            {payout.instructorName}
                          </p>
                          <p className="text-[11px] text-muted-foreground">
                            {payout.instructorEmail}
                          </p>
                        </div>
                      </div>
                    </td>

                    {/* Net Royalty */}
                    <td className="py-4 px-4 font-mono font-bold text-foreground text-sm">
                      {formatETB(payout.amountETB)}
                    </td>

                    {/* Channel & Account */}
                    <td className="py-4 px-4">
                      <div className="space-y-1">
                        <div className="flex items-center gap-1.5">
                          {payout.channel === "telebirr" ? (
                            <span className="inline-flex items-center gap-1 text-[11px] font-bold text-emerald-900 bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded-md">
                              <Smartphone className="w-3 h-3 text-emerald-700" />
                              Telebirr Wallet
                            </span>
                          ) : (
                            <span className="inline-flex items-center gap-1 text-[11px] font-bold text-emerald-900 bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded-md">
                              <Landmark className="w-3 h-3 text-emerald-700" />
                              CBE Bank Direct
                            </span>
                          )}
                        </div>

                        <p className="text-[11px] font-mono text-muted-foreground">
                          {payout.channel === "telebirr"
                            ? payout.telebirrPhone
                            : `${payout.cbeAccountNumber} (${payout.cbeBranch?.split(",")[0]})`}
                        </p>
                      </div>
                    </td>

                    {/* Request Date */}
                    <td className="py-4 px-4 text-muted-foreground text-[11px]">
                      {payout.requestedAt}
                    </td>

                    {/* Status Badge */}
                    <td className="py-4 px-4">
                      {isPending ? (
                        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-bold bg-amber-50 text-amber-900 border border-amber-200">
                          <span className="w-1.5 h-1.5 rounded-full bg-amber-500 animate-pulse" />
                          Pending Clearance
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-bold bg-emerald-50 text-emerald-950 border border-emerald-200">
                          <CheckCircle2 className="w-3 h-3 text-emerald-700" />
                          Settled & Cleared
                        </span>
                      )}
                    </td>

                    {/* Reference / Memo */}
                    <td className="py-4 px-4">
                      {payout.transactionRefId ? (
                        <div className="flex items-center gap-1.5">
                          <span className="font-mono text-[11px] font-bold text-emerald-950 bg-muted/60 px-2 py-0.5 rounded border border-border">
                            {payout.transactionRefId}
                          </span>
                          <button
                            onClick={() => handleCopyRef(payout.transactionRefId!)}
                            className="text-muted-foreground hover:text-foreground transition-colors p-1"
                            title="Copy reference code"
                          >
                            {copiedId === payout.transactionRefId ? (
                              <Check className="w-3 h-3 text-emerald-700" />
                            ) : (
                              <Copy className="w-3 h-3" />
                            )}
                          </button>
                        </div>
                      ) : (
                        <span className="text-[11px] text-muted-foreground italic">
                          Awaiting authorization
                        </span>
                      )}
                    </td>

                    {/* Action Button */}
                    <td className="py-4 px-6 text-right">
                      {isPending ? (
                        <button
                          onClick={() => onSelectPayout(payout)}
                          className="inline-flex items-center gap-1.5 py-1.5 px-3 rounded-xl text-xs font-bold bg-primary text-primary-foreground hover:bg-primary-hover shadow-2xs transition-all"
                        >
                          <Zap className="w-3 h-3" />
                          <span>Settle Payout</span>
                        </button>
                      ) : (
                        <div className="text-[11px] text-muted-foreground">
                          <span>Settled {payout.settledAt}</span>
                        </div>
                      )}
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>

      {/* Mobile Card View */}
      <div className="md:hidden divide-y divide-border">
        {filteredTransactions.length === 0 ? (
          <div className="p-8 text-center text-muted-foreground text-xs">
            No matching payout records found.
          </div>
        ) : (
          filteredTransactions.map((payout) => {
            const isPending = payout.status === "pending";

            return (
              <div key={payout.id} className="p-4 space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <div className="relative w-8 h-8 rounded-full overflow-hidden border border-border">
                      <Image
                        src={payout.instructorAvatar}
                        alt={payout.instructorName}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div>
                      <p className="font-bold text-foreground text-xs">
                        {payout.instructorName}
                      </p>
                      <p className="text-[10px] text-muted-foreground">
                        {payout.instructorEmail}
                      </p>
                    </div>
                  </div>

                  <p className="font-mono font-bold text-foreground text-sm">
                    {formatETB(payout.amountETB)}
                  </p>
                </div>

                <div className="flex items-center justify-between text-xs pt-1">
                  <div className="flex items-center gap-1 text-[11px] text-muted-foreground">
                    {payout.channel === "telebirr" ? (
                      <span className="font-semibold text-emerald-800">
                        Telebirr: {payout.telebirrPhone}
                      </span>
                    ) : (
                      <span className="font-semibold text-emerald-800">
                        CBE: {payout.cbeAccountNumber}
                      </span>
                    )}
                  </div>

                  {isPending ? (
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-amber-50 text-amber-900 border border-amber-200">
                      Pending
                    </span>
                  ) : (
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-950 border border-emerald-200">
                      Settled
                    </span>
                  )}
                </div>

                {payout.transactionRefId && (
                  <div className="flex items-center justify-between text-[11px] bg-muted/40 p-2 rounded-xl border border-border">
                    <span className="text-muted-foreground">Ref Code:</span>
                    <span className="font-mono font-bold text-foreground">
                      {payout.transactionRefId}
                    </span>
                  </div>
                )}

                {isPending && (
                  <button
                    onClick={() => onSelectPayout(payout)}
                    className="w-full flex items-center justify-center gap-2 py-2 px-3 rounded-xl text-xs font-bold bg-primary text-primary-foreground hover:bg-primary-hover shadow-2xs transition-all"
                  >
                    <Zap className="w-3.5 h-3.5" />
                    <span>Settle Payout</span>
                  </button>
                )}
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}
