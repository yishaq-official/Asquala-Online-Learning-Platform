"use client";

import React from "react";
import Link from "next/link";
import { useAdminUiStore } from "@/stores/admin-ui-store";
import {
  ShieldCheck,
  Award,
  BookCheck,
  Landmark,
  ArrowRight,
  Sparkles,
} from "lucide-react";

export default function AdminDashboardPage() {
  const { activeAuditor, auditCounts } = useAdminUiStore();

  return (
    <div className="space-y-6">
      {/* Welcome Banner */}
      <div className="rounded-3xl bg-linear-to-r from-emerald-900 via-emerald-800 to-emerald-950 text-white p-6 sm:p-8 shadow-xl relative overflow-hidden">
        <div className="absolute top-0 right-0 -mr-16 -mt-16 w-64 h-64 rounded-full bg-emerald-600/20 blur-3xl" />
        <div className="relative z-10 max-w-2xl space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-xs font-semibold text-emerald-200">
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
            <span>Academic Control Plane Online</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">
            Welcome, {activeAuditor.name}
          </h1>
          <p className="text-sm text-emerald-100/90 leading-relaxed">
            {activeAuditor.roleTitle} • {activeAuditor.department}. The governance shell and institutional session are operational.
          </p>
        </div>
      </div>

      {/* Quick Overview Cards for Pending Queues */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="p-5 rounded-2xl bg-card border border-border shadow-2xs space-y-3">
          <div className="w-10 h-10 rounded-xl bg-emerald-50 border border-emerald-100 flex items-center justify-center text-emerald-800">
            <Award className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-sm font-bold text-foreground">Teacher Accreditation</h2>
            <p className="text-xs text-muted-foreground mt-0.5">
              Degree scans, engineering tenure & MoE licenses
            </p>
          </div>
          <div className="pt-2 flex items-center justify-between border-t border-border">
            <span className="text-xs font-bold text-emerald-800 bg-emerald-100 px-2 py-0.5 rounded-full">
              {auditCounts.pendingAccreditations} Pending
            </span>
            <Link
              href="/admin/accreditation"
              className="text-xs font-semibold text-primary hover:underline flex items-center gap-1"
            >
              <span>Review</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>

        <div className="p-5 rounded-2xl bg-card border border-border shadow-2xs space-y-3">
          <div className="w-10 h-10 rounded-xl bg-emerald-50 border border-emerald-100 flex items-center justify-center text-emerald-800">
            <BookCheck className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-sm font-bold text-foreground">Course Quality Audit</h2>
            <p className="text-xs text-muted-foreground mt-0.5">
              Syllabus depth, 80% passing quizzes & video quality
            </p>
          </div>
          <div className="pt-2 flex items-center justify-between border-t border-border">
            <span className="text-xs font-bold text-emerald-800 bg-emerald-100 px-2 py-0.5 rounded-full">
              {auditCounts.pendingCourseReviews} Pending
            </span>
            <Link
              href="/admin/courses"
              className="text-xs font-semibold text-primary hover:underline flex items-center gap-1"
            >
              <span>Review</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>

        <div className="p-5 rounded-2xl bg-card border border-border shadow-2xs space-y-3">
          <div className="w-10 h-10 rounded-xl bg-emerald-50 border border-emerald-100 flex items-center justify-center text-emerald-800">
            <Landmark className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-sm font-bold text-foreground">Treasury & Settlements</h2>
            <p className="text-xs text-muted-foreground mt-0.5">
              Telebirr & Commercial Bank of Ethiopia direct accounts
            </p>
          </div>
          <div className="pt-2 flex items-center justify-between border-t border-border">
            <span className="text-xs font-bold text-emerald-800 bg-emerald-100 px-2 py-0.5 rounded-full">
              {auditCounts.pendingPayoutSettlements} Settlements
            </span>
            <Link
              href="/admin/payouts"
              className="text-xs font-semibold text-primary hover:underline flex items-center gap-1"
            >
              <span>Review</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
