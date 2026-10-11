"use client";

import React from "react";
import Link from "next/link";
import { useAdminUiStore } from "@/stores/admin-ui-store";
import { AdminKpiGrid } from "@/components/admin/dashboard/admin-kpi-grid";
import { PendingApprovalsFeed } from "@/components/admin/dashboard/pending-approvals-feed";
import { TreasuryQuickCard } from "@/components/admin/dashboard/treasury-quick-card";
import { PlatformAuditLog } from "@/components/admin/dashboard/platform-audit-log";
import {
  ShieldCheck,
  Award,
  BookCheck,
  Landmark,
  ArrowRight,
  Sparkles,
  TrendingUp,
} from "lucide-react";

export default function AdminDashboardPage() {
  const { activeAuditor, auditCounts } = useAdminUiStore();

  return (
    <div className="space-y-6">
      {/* Executive Welcome & Action Banner */}
      <div className="rounded-3xl bg-linear-to-r from-emerald-950 via-emerald-900 to-emerald-950 text-white p-6 sm:p-8 shadow-xl relative overflow-hidden">
        {/* Subtle decorative glow */}
        <div className="absolute top-0 right-0 -mr-20 -mt-20 w-80 h-80 rounded-full bg-emerald-600/20 blur-3xl pointer-events-none" />

        <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div className="space-y-2 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-xs font-semibold text-emerald-200">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span>Academic Review Board Control Plane • Strict Governance</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">
              Welcome, {activeAuditor.name}
            </h1>
            <p className="text-xs sm:text-sm text-emerald-100/90 leading-relaxed">
              {activeAuditor.roleTitle} • {activeAuditor.department}. National quality assurance, teacher accreditation, and domestic treasury settlement oversight.
            </p>
          </div>

          {/* Quick Action Buttons */}
          <div className="flex flex-wrap items-center gap-2.5 shrink-0">
            <Link
              href="/admin/accreditation"
              className="flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-bold bg-white/10 hover:bg-white/20 backdrop-blur-md border border-white/20 text-white transition-all shadow-2xs hover:scale-[1.02] cursor-pointer"
            >
              <Award className="w-4 h-4 text-emerald-300" />
              <span>Audit Teachers ({auditCounts.pendingAccreditations})</span>
            </Link>

            <Link
              href="/admin/courses"
              className="flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-bold bg-white/10 hover:bg-white/20 backdrop-blur-md border border-white/20 text-white transition-all shadow-2xs hover:scale-[1.02] cursor-pointer"
            >
              <BookCheck className="w-4 h-4 text-emerald-300" />
              <span>Audit Courses ({auditCounts.pendingCourseReviews})</span>
            </Link>

            <Link
              href="/admin/payouts"
              className="flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-bold bg-emerald-500 hover:bg-emerald-400 text-emerald-950 transition-all shadow-md hover:scale-[1.02] cursor-pointer"
            >
              <Landmark className="w-4 h-4 text-emerald-950" />
              <span>Treasury Desk</span>
            </Link>
          </div>
        </div>
      </div>

      {/* 4-Card Executive KPI Grid */}
      <AdminKpiGrid />

      {/* Main Two-Column Governance Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left / Primary Column: Academic Quality Gates */}
        <div className="lg:col-span-7 space-y-6">
          <PendingApprovalsFeed />
        </div>

        {/* Right / Secondary Column: Treasury & Audit Log */}
        <div className="lg:col-span-5 space-y-6">
          <TreasuryQuickCard />
          <PlatformAuditLog />
        </div>
      </div>
    </div>
  );
}
