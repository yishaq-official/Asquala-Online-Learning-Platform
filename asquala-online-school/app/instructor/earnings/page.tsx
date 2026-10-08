"use client";

import React, { useState, useCallback } from "react";
import {
  MOCK_INSTRUCTOR_EARNINGS,
  InstructorEarningsData,
  InstructorPayoutMethod,
  PayoutTransactionItem,
} from "@/lib/mock-instructor-data";
import { EarningsSummaryCards } from "@/components/instructor/earnings/earnings-summary-cards";
import { PayoutMethodsManager } from "@/components/instructor/earnings/payout-methods-manager";
import { RevenueBreakdownChart } from "@/components/instructor/earnings/revenue-breakdown-chart";
import { PayoutHistoryTable } from "@/components/instructor/earnings/payout-history-table";
import { RequestPayoutModal } from "@/components/instructor/earnings/request-payout-modal";
import { DollarSign, CheckCircle2 } from "lucide-react";

export default function InstructorEarningsPage() {
  const [data, setData] = useState<InstructorEarningsData>(MOCK_INSTRUCTOR_EARNINGS);
  const [isPayoutModalOpen, setIsPayoutModalOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = useCallback((msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 4000);
  }, []);

  const handleRequestPayout = (amount: number, methodId: string) => {
    const method = data.payoutMethods.find((m) => m.id === methodId);
    const newTx: PayoutTransactionItem = {
      id: `tx-${Date.now()}`,
      transactionRef: `ASQ-PAY-${new Date().getFullYear()}-${Math.floor(
        100 + Math.random() * 900
      )}`,
      date: "Just now",
      amountETB: amount,
      method: method?.type || "telebirr",
      methodLabel: method?.title || "Domestic Account",
      accountDetails: method?.accountIdentifier || "",
      status: "processing",
    };

    setData((prev) => ({
      ...prev,
      availableBalanceETB: prev.availableBalanceETB - amount,
      totalPaidOutETB: prev.totalPaidOutETB + amount,
      transactions: [newTx, ...prev.transactions],
    }));

    showToast(
      `Withdrawal request for ETB ${amount.toLocaleString()} submitted! Funds will arrive in your ${method?.title || "account"} shortly.`
    );
  };

  const handleSetDefaultMethod = (id: string) => {
    setData((prev) => ({
      ...prev,
      payoutMethods: prev.payoutMethods.map((m) => ({
        ...m,
        isDefault: m.id === id,
      })),
    }));
    showToast("Default payout method updated.");
  };

  const handleAddMethod = (
    newMethodData: Omit<InstructorPayoutMethod, "id" | "isDefault">
  ) => {
    const newMethod: InstructorPayoutMethod = {
      ...newMethodData,
      id: `pm-${Date.now()}`,
      isDefault: data.payoutMethods.length === 0,
    };

    setData((prev) => ({
      ...prev,
      payoutMethods: [...prev.payoutMethods, newMethod],
    }));
    showToast(`${newMethod.title} added successfully!`);
  };

  const handleDeleteMethod = (id: string) => {
    setData((prev) => ({
      ...prev,
      payoutMethods: prev.payoutMethods.filter((m) => m.id !== id),
    }));
    showToast("Payout method removed.");
  };

  return (
    <div className="space-y-8 max-w-6xl mx-auto">
      {/* Toast Alert */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 flex items-center gap-2 px-4 py-3 rounded-xl bg-slate-900 text-white shadow-xl text-xs font-semibold animate-in slide-in-from-bottom-2 duration-200">
          <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Header */}
      <div>
        <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-primary-light text-primary border border-primary-border mb-1.5">
          <DollarSign className="w-3.5 h-3.5" />
          <span>FINANCIAL REVENUE DESK</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-foreground">
          Earnings &amp; Payout Management
        </h1>
        <p className="text-xs sm:text-sm text-muted-foreground mt-1">
          Monitor your course royalties in Ethiopian Birr (ETB), manage domestic banking channels, and request withdrawals.
        </p>
      </div>

      {/* 1. Summary Cards */}
      <EarningsSummaryCards
        availableBalanceETB={data.availableBalanceETB}
        pendingClearanceETB={data.pendingClearanceETB}
        lifetimeEarningsETB={data.lifetimeEarningsETB}
        totalPaidOutETB={data.totalPaidOutETB}
        thisMonthRevenueETB={data.thisMonthRevenueETB}
        onRequestPayout={() => setIsPayoutModalOpen(true)}
      />

      {/* 2. Payout Channels */}
      <PayoutMethodsManager
        methods={data.payoutMethods}
        onSetDefault={handleSetDefaultMethod}
        onAddMethod={handleAddMethod}
        onDeleteMethod={handleDeleteMethod}
      />

      {/* 3. Revenue Model Breakdown */}
      <RevenueBreakdownChart />

      {/* 4. Ledger Table */}
      <PayoutHistoryTable transactions={data.transactions} />

      {/* Request Payout Modal */}
      <RequestPayoutModal
        isOpen={isPayoutModalOpen}
        availableBalanceETB={data.availableBalanceETB}
        payoutMethods={data.payoutMethods}
        onClose={() => setIsPayoutModalOpen(false)}
        onRequestPayout={handleRequestPayout}
      />
    </div>
  );
}
