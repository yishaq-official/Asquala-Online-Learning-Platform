"use client";

import React, { useMemo } from "react";
import {
  BookCheck,
  ShieldCheck,
  Coins,
  FileQuestion,
  Layers,
} from "lucide-react";
import { useAdminUiStore } from "@/stores/admin-ui-store";
import { CourseAuditTable } from "@/components/admin/courses/course-audit-table";

export default function CourseAuditQueuePage() {
  const { courseAudits } = useAdminUiStore();
  const coursesList = useMemo(() => Object.values(courseAudits), [courseAudits]);

  const stats = useMemo(() => {
    return {
      total: coursesList.length,
      underAudit: coursesList.filter(
        (c) => c.status === "pending_review" || c.status === "in_audit"
      ).length,
      revisionRequired: coursesList.filter((c) => c.status === "revision_requested").length,
      liveOnMarketplace: coursesList.filter((c) => c.status === "approved").length,
    };
  }, [coursesList]);

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="rounded-3xl bg-linear-to-r from-emerald-950 via-emerald-900 to-emerald-950 text-white p-6 sm:p-8 shadow-xl relative overflow-hidden">
        <div className="absolute top-0 right-0 -mr-16 -mt-16 w-72 h-72 rounded-full bg-emerald-600/20 blur-3xl pointer-events-none" />

        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="space-y-2 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-xs font-semibold text-emerald-200">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span>National Curriculum Quality Control</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">
              Course Quality & Publishing Audit Queue
            </h1>
            <p className="text-xs sm:text-sm text-emerald-100/90 leading-relaxed">
              Verify video curriculum completeness, ensure 80% passing threshold on milestone quizzes, and audit 85/15 ETB revenue splits before public student enrollment.
            </p>
          </div>

          <div className="flex items-center gap-3 self-start md:self-auto bg-white/10 backdrop-blur-md p-3 rounded-2xl border border-white/20">
            <div className="text-center px-2">
              <span className="block text-xl font-bold text-white">
                {stats.underAudit + stats.revisionRequired}
              </span>
              <span className="text-[10px] text-emerald-200 uppercase tracking-wider font-semibold">
                Needs Audit
              </span>
            </div>
            <div className="h-8 w-[1px] bg-white/20" />
            <div className="text-center px-2">
              <span className="block text-xl font-bold text-white">
                {stats.liveOnMarketplace}
              </span>
              <span className="text-[10px] text-emerald-200 uppercase tracking-wider font-semibold">
                Live Catalog
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Filterable Table Component */}
      <CourseAuditTable courses={coursesList} />
    </div>
  );
}
