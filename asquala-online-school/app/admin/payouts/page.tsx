"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  ChevronLeft,
  Landmark,
  Smartphone,
  ShieldCheck,
  Building2,
  RefreshCw,
  DownloadCloud,
  CheckCircle2,
} from "lucide-react";
import { PayoutSummaryCards } from "@/components/admin/payouts/payout-summary-cards";
import { PendingPayoutsTable } from "@/components/admin/payouts/pending-payouts-table";
import { ProcessPayoutModal } from "@/components/admin/payouts/process-payout-modal";
import { PayoutTransaction } from "@/types/admin";

export default function AdminPayoutsPage() {
  const [selectedPayout, setSelectedPayout] = useState<PayoutTransaction | null>(
    null
  );
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isExporting, setIsExporting] = useState(false);

  const handleSelectPayout = (payout: PayoutTransaction) => {
    setSelectedPayout(payout);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedPayout(null);
  };

  const handleExportBatch = () => {
    setIsExporting(true);
    setTimeout(() => {
      setIsExporting(false);
      alert("Domestic Settlement File (CBE ACH format & Telebirr Bulk CSV) downloaded successfully.");
    }, 600);
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-12">
      {/* Top Header & Breadcrumb */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold text-muted-foreground mb-1.5">
            <Link
              href="/admin/dashboard"
              className="flex items-center gap-1 hover:text-foreground transition-colors"
            >
              <ChevronLeft className="w-3.5 h-3.5" />
              <span>Dashboard</span>
            </Link>
            <span>•</span>
            <span className="text-foreground">Treasury & Settlements</span>
          </div>

          <div className="flex items-center gap-3">
            <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-foreground">
              Treasury & Domestic Royalty Disbursements
            </h1>
            <span className="hidden sm:inline-flex items-center gap-1.5 text-[11px] font-bold px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-950 border border-emerald-200">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-600" />
              National Rails Active
            </span>
          </div>
          <p className="text-xs text-muted-foreground mt-0.5">
            Authorize and settle educator course royalties via Ethiopian mobile wallets (Telebirr) & commercial banking rails (CBE)
          </p>
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-2.5 self-start sm:self-auto">
          <button
            onClick={handleExportBatch}
            disabled={isExporting}
            className="flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-bold bg-card border border-border text-foreground hover:bg-muted shadow-2xs transition-all"
          >
            <DownloadCloud className="w-3.5 h-3.5 text-emerald-800" />
            <span>{isExporting ? "Generating..." : "Export Bank Batch (ACH)"}</span>
          </button>
        </div>
      </div>

      {/* Gateway Status Banner */}
      <div className="bg-emerald-50/70 border border-emerald-200/80 rounded-2xl p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs text-emerald-950">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-xl bg-emerald-100 border border-emerald-200 flex items-center justify-center text-emerald-800 shrink-0">
            <ShieldCheck className="w-4 h-4" />
          </div>
          <div>
            <p className="font-bold">
              National Payment Gateway Integration Status
            </p>
            <p className="text-[11px] text-emerald-800/90">
              Telebirr Merchant Gateway: <span className="font-bold text-emerald-950">Online</span> • Commercial Bank of Ethiopia (CBE) Direct Wire API: <span className="font-bold text-emerald-950">Operational</span>
            </p>
          </div>
        </div>

        <div className="flex items-center gap-4 text-[11px] font-semibold text-emerald-900 border-t sm:border-t-0 pt-2 sm:pt-0">
          <span className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-emerald-600 animate-pulse" />
            Next Settlement Window: 04:00 PM
          </span>
        </div>
      </div>

      {/* 4 Summary Cards */}
      <PayoutSummaryCards />

      {/* Payouts Ledger Table */}
      <PendingPayoutsTable onSelectPayout={handleSelectPayout} />

      {/* Settlement Processing Modal */}
      <ProcessPayoutModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        payout={selectedPayout}
      />
    </div>
  );
}
