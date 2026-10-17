"use client";

import React, { useState, use } from "react";
import Link from "next/link";
import {
  ArrowLeft,
  ShieldCheck,
  BookCheck,
  AlertTriangle,
  CheckCircle2,
  XCircle,
  Clock,
  Sparkles,
  History,
} from "lucide-react";
import { useAdminUiStore } from "@/stores/admin-ui-store";
import { CurriculumAuditViewer } from "@/components/admin/courses/curriculum-audit-viewer";
import { CourseDecisionModal } from "@/components/admin/courses/course-decision-modal";
import { Button } from "@/components/ui/button";

export default function SingleCourseAuditPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const resolvedParams = use(params);
  const { courseAudits } = useAdminUiStore();
  const course = courseAudits[resolvedParams.id];

  const [isDecisionModalOpen, setIsDecisionModalOpen] = useState(false);

  if (!course) {
    return (
      <div className="p-12 text-center bg-card border border-border rounded-3xl space-y-4 max-w-lg mx-auto my-12">
        <div className="w-12 h-12 rounded-2xl bg-secondary flex items-center justify-center mx-auto text-muted-foreground">
          <AlertTriangle className="w-6 h-6 text-amber-600" />
        </div>
        <h2 className="text-lg font-bold text-foreground">
          Course Submission Not Found
        </h2>
        <p className="text-xs text-muted-foreground">
          No curriculum submission matches the identifier "{resolvedParams.id}".
        </p>
        <Link
          href="/admin/courses"
          className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold bg-primary text-primary-foreground hover:bg-primary-hover shadow-2xs transition-colors"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Return to Course Audit Queue</span>
        </Link>
      </div>
    );
  }

  const isApproved = course.status === "approved";
  const isRevision = course.status === "revision_requested";
  const isInAudit = course.status === "in_audit";
  const isPending = course.status === "pending_review";

  return (
    <div className="space-y-6">
      {/* Top Breadcrumb & Actions Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <Link
          href="/admin/courses"
          className="inline-flex items-center gap-2 text-xs font-bold text-muted-foreground hover:text-foreground transition-colors group"
        >
          <ArrowLeft className="w-4 h-4 text-emerald-700 group-hover:-translate-x-0.5 transition-transform" />
          <span>Back to Course Audit Queue</span>
          <span className="text-[10px] text-muted-foreground font-mono">
            (Submission #{course.id})
          </span>
        </Link>

        {/* Primary Ruling CTA */}
        <Button
          type="button"
          variant="primary"
          size="md"
          onClick={() => setIsDecisionModalOpen(true)}
          className="gap-2 text-xs font-bold shadow-md cursor-pointer"
        >
          <ShieldCheck className="w-4 h-4" />
          <span>Record Publication Ruling</span>
        </Button>
      </div>

      {/* Course Overview Header */}
      <div className="bg-card border border-border rounded-3xl p-6 sm:p-7 shadow-2xs flex flex-col lg:flex-row lg:items-center justify-between gap-6">
        <div className="space-y-2 min-w-0 flex-1">
          <div className="flex flex-wrap items-center gap-2.5">
            <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200 uppercase tracking-wider">
              {course.category}
            </span>
            <span className="text-xs text-muted-foreground">
              {course.difficulty} • {course.language}
            </span>

            {/* Status Badge */}
            {isApproved && (
              <span className="text-xs font-bold px-2.5 py-1 rounded-full bg-emerald-100 text-emerald-800 border border-emerald-300 flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-700" />
                Approved & Live on Marketplace
              </span>
            )}
            {isRevision && (
              <span className="text-xs font-bold px-2.5 py-1 rounded-full bg-amber-100 text-amber-900 border border-amber-300 flex items-center gap-1.5">
                <AlertTriangle className="w-3.5 h-3.5 text-amber-700" />
                Revision Required (Action Flagged)
              </span>
            )}
            {isInAudit && (
              <span className="text-xs font-bold px-2.5 py-1 rounded-full bg-emerald-100 text-emerald-800 border border-emerald-300 flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-emerald-700" />
                Auditor In Progress
              </span>
            )}
            {isPending && (
              <span className="text-xs font-bold px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200 flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5 text-emerald-600" />
                Awaiting Board Audit
              </span>
            )}
          </div>

          <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-foreground">
            {course.title}
          </h1>
          <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
            {course.subtitle}
          </p>
        </div>

        {/* Author Chip */}
        <div className="flex items-center gap-3 shrink-0 p-3.5 rounded-2xl bg-secondary/50 border border-border">
          <img
            src={course.instructorAvatar}
            alt={course.instructorName}
            className="w-12 h-12 rounded-xl object-cover border border-border"
          />
          <div className="min-w-0">
            <span className="text-[10px] uppercase font-bold text-muted-foreground block">
              Course Creator
            </span>
            <p className="text-xs font-bold text-foreground truncate">
              {course.instructorName}
            </p>
            <p className="text-[10px] text-muted-foreground truncate max-w-[200px]">
              {course.instructorTitle}
            </p>
          </div>
        </div>
      </div>

      {/* Active Board Note Banner */}
      {course.statusNote && (
        <div
          className={`p-4 rounded-2xl flex items-start gap-3 ${
            isRevision
              ? "bg-amber-50 text-amber-950 border border-amber-200"
              : "bg-emerald-50 text-emerald-950 border border-emerald-200"
          }`}
        >
          {isRevision ? (
            <AlertTriangle className="w-5 h-5 text-amber-700 shrink-0 mt-0.5" />
          ) : (
            <ShieldCheck className="w-5 h-5 text-emerald-700 shrink-0 mt-0.5" />
          )}
          <div className="text-xs space-y-0.5">
            <span className="font-bold block">Active Publishing Auditor Note:</span>
            <p className="leading-relaxed">{course.statusNote}</p>
          </div>
        </div>
      )}

      {/* Curriculum & Split Audit Viewer */}
      <CurriculumAuditViewer course={course} />

      {/* Ruling History Log */}
      {course.boardRulingHistory && course.boardRulingHistory.length > 0 && (
        <div className="bg-card border border-border rounded-3xl p-5 sm:p-6 shadow-2xs space-y-3">
          <div className="flex items-center gap-2 pb-2 border-b border-border">
            <History className="w-4 h-4 text-emerald-700" />
            <h3 className="text-sm font-bold text-foreground">
              Publishing Audit History & Decisions
            </h3>
          </div>

          <div className="space-y-2">
            {course.boardRulingHistory.map((h, i) => (
              <div
                key={i}
                className="p-3 rounded-2xl bg-secondary/40 border border-border flex items-start justify-between gap-3 text-xs"
              >
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-foreground capitalize">
                      Ruling: {h.ruling.replace("_", " ")}
                    </span>
                    <span className="text-[10px] text-muted-foreground">
                      • {h.date}
                    </span>
                  </div>
                  <p className="text-[11px] text-muted-foreground">{h.notes}</p>
                </div>
                <span className="text-[10px] font-bold text-emerald-800 bg-emerald-100 px-2 py-0.5 rounded-full shrink-0">
                  Signed: {h.auditor}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Course Decision Ruling Modal */}
      <CourseDecisionModal
        course={course}
        isOpen={isDecisionModalOpen}
        onClose={() => setIsDecisionModalOpen(false)}
      />
    </div>
  );
}
