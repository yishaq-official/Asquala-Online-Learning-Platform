"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  Award,
  BookCheck,
  ArrowRight,
  Clock,
  AlertTriangle,
  CheckCircle2,
  Building2,
  GraduationCap,
  Sparkles,
  ExternalLink,
} from "lucide-react";
import {
  PENDING_TEACHER_APPLICATIONS,
  PENDING_COURSE_REVIEWS,
} from "@/lib/mock-admin-data";

export function PendingApprovalsFeed() {
  const [activeTab, setActiveTab] = useState<"teachers" | "courses">("teachers");

  const pendingTeachersCount = PENDING_TEACHER_APPLICATIONS.filter(
    (t) => t.status !== "approved"
  ).length;

  const pendingCoursesCount = PENDING_COURSE_REVIEWS.filter(
    (c) => c.status !== "approved"
  ).length;

  return (
    <div className="bg-card border border-border rounded-3xl p-5 sm:p-6 shadow-2xs space-y-5">
      {/* Feed Header with Tab Switcher */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-border">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-base font-bold text-foreground">
              Academic Quality Gates
            </h2>
            <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 border border-emerald-200">
              Needs Ruling
            </span>
          </div>
          <p className="text-xs text-muted-foreground mt-0.5">
            Dossier accreditation and pre-publication curriculum validation
          </p>
        </div>

        {/* Tab Switcher */}
        <div className="flex items-center bg-secondary/80 p-1 rounded-xl border border-border self-start sm:self-auto">
          <button
            type="button"
            onClick={() => setActiveTab("teachers")}
            className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
              activeTab === "teachers"
                ? "bg-card text-emerald-900 shadow-2xs border border-border/80"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            <Award className="w-3.5 h-3.5 text-emerald-700" />
            <span>Teacher Applications</span>
            <span
              className={`text-[10px] px-1.5 py-0.2 rounded-full font-bold ${
                activeTab === "teachers"
                  ? "bg-emerald-100 text-emerald-800"
                  : "bg-muted text-muted-foreground"
              }`}
            >
              {pendingTeachersCount}
            </span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab("courses")}
            className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
              activeTab === "courses"
                ? "bg-card text-emerald-900 shadow-2xs border border-border/80"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            <BookCheck className="w-3.5 h-3.5 text-emerald-700" />
            <span>Course Reviews</span>
            <span
              className={`text-[10px] px-1.5 py-0.2 rounded-full font-bold ${
                activeTab === "courses"
                  ? "bg-emerald-100 text-emerald-800"
                  : "bg-muted text-muted-foreground"
              }`}
            >
              {pendingCoursesCount}
            </span>
          </button>
        </div>
      </div>

      {/* Tab 1: Teacher Accreditation Queue */}
      {activeTab === "teachers" && (
        <div className="space-y-3">
          {PENDING_TEACHER_APPLICATIONS.map((applicant) => {
            const isActionReq = applicant.status === "action_required";
            const isApproved = applicant.status === "approved";

            return (
              <div
                key={applicant.id}
                className="p-4 rounded-2xl bg-secondary/40 hover:bg-secondary/70 border border-border transition-all flex flex-col md:flex-row md:items-center justify-between gap-4"
              >
                <div className="flex items-start gap-3.5 min-w-0">
                  <div className="relative shrink-0 mt-0.5">
                    <img
                      src={applicant.avatarUrl}
                      alt={applicant.name}
                      className="w-11 h-11 rounded-2xl object-cover border border-border"
                    />
                    <div className="absolute -bottom-1 -right-1 w-4 h-4 rounded-full bg-emerald-600 ring-2 ring-card flex items-center justify-center text-[9px] text-white font-bold">
                      ✓
                    </div>
                  </div>

                  <div className="min-w-0 flex-1 space-y-1">
                    <div className="flex flex-wrap items-center gap-2">
                      <h3 className="text-sm font-bold text-foreground">
                        {applicant.name}
                      </h3>
                      {isActionReq ? (
                        <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-amber-100 text-amber-900 border border-amber-300 flex items-center gap-1">
                          <AlertTriangle className="w-2.5 h-2.5 text-amber-700" />
                          Action Required
                        </span>
                      ) : isApproved ? (
                        <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 border border-emerald-300 flex items-center gap-1">
                          <CheckCircle2 className="w-2.5 h-2.5 text-emerald-700" />
                          Board Approved
                        </span>
                      ) : (
                        <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200 flex items-center gap-1">
                          <Clock className="w-2.5 h-2.5 text-emerald-600" />
                          Awaiting Ruling
                        </span>
                      )}
                      <span className="text-[10px] text-muted-foreground font-medium">
                        • {applicant.submittedAt}
                      </span>
                    </div>

                    <p className="text-xs text-foreground/90 font-medium">
                      {applicant.headline}
                    </p>

                    <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-[11px] text-muted-foreground">
                      <span className="flex items-center gap-1 text-emerald-900 font-semibold">
                        <GraduationCap className="w-3.5 h-3.5 text-emerald-700" />
                        {applicant.degreeTitle}
                      </span>
                      <span>• {applicant.institution}</span>
                      <span>• {applicant.yearsExperience} yrs tenure ({applicant.currentCompany})</span>
                    </div>

                    {applicant.statusNote && (
                      <p
                        className={`text-[11px] font-medium p-1.5 rounded-lg mt-1 ${
                          isActionReq
                            ? "bg-amber-100/70 text-amber-950 border border-amber-200"
                            : "bg-emerald-50 text-emerald-900 border border-emerald-200/60"
                        }`}
                      >
                        {applicant.statusNote}
                      </p>
                    )}
                  </div>
                </div>

                <div className="flex items-center gap-2 shrink-0 self-end md:self-center">
                  <Link
                    href={`/admin/accreditation/${applicant.id}`}
                    className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold bg-primary text-primary-foreground hover:bg-primary-hover shadow-2xs transition-colors"
                  >
                    <span>Inspect Dossier</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            );
          })}

          <div className="pt-2 flex justify-end">
            <Link
              href="/admin/accreditation"
              className="text-xs font-bold text-primary hover:underline flex items-center gap-1"
            >
              <span>Go to Full Teacher Accreditation Review Desk</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      )}

      {/* Tab 2: Course Publishing Queue */}
      {activeTab === "courses" && (
        <div className="space-y-3">
          {PENDING_COURSE_REVIEWS.map((course) => {
            const isRevisionReq = course.status === "revision_requested";
            const isInAudit = course.status === "in_audit";

            return (
              <div
                key={course.id}
                className="p-4 rounded-2xl bg-secondary/40 hover:bg-secondary/70 border border-border transition-all flex flex-col md:flex-row md:items-center justify-between gap-4"
              >
                <div className="flex items-start gap-3.5 min-w-0">
                  <div className="w-11 h-11 rounded-2xl bg-emerald-50 border border-emerald-200 flex items-center justify-center text-emerald-800 shrink-0 mt-0.5">
                    <BookCheck className="w-5 h-5" />
                  </div>

                  <div className="min-w-0 flex-1 space-y-1">
                    <div className="flex flex-wrap items-center gap-2">
                      <h3 className="text-sm font-bold text-foreground">
                        {course.title}
                      </h3>
                      {isRevisionReq ? (
                        <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-amber-100 text-amber-900 border border-amber-300 flex items-center gap-1">
                          <AlertTriangle className="w-2.5 h-2.5 text-amber-700" />
                          Revision Required
                        </span>
                      ) : isInAudit ? (
                        <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 border border-emerald-300 flex items-center gap-1">
                          <Sparkles className="w-2.5 h-2.5 text-emerald-700" />
                          Auditor In Progress
                        </span>
                      ) : (
                        <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200 flex items-center gap-1">
                          <Clock className="w-2.5 h-2.5 text-emerald-600" />
                          Queue Review
                        </span>
                      )}
                      <span className="text-[10px] text-muted-foreground font-medium">
                        • {course.submittedAt}
                      </span>
                    </div>

                    <div className="flex items-center gap-2 text-xs text-foreground/90">
                      <span className="font-semibold text-emerald-950">
                        Instructor: {course.instructorName}
                      </span>
                      <span>• Category: {course.category}</span>
                    </div>

                    <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-[11px] text-muted-foreground">
                      <span>{course.modulesCount} Modules</span>
                      <span>• {course.lessonsCount} Lessons ({course.durationHours} hrs total)</span>
                      <span>• {course.quizCount} Quizzes (80% pass threshold)</span>
                      <span className="font-bold text-emerald-900">
                        • Tuition: ETB {course.priceETB.toLocaleString()}
                      </span>
                    </div>

                    {course.statusNote && (
                      <p
                        className={`text-[11px] font-medium p-1.5 rounded-lg mt-1 ${
                          isRevisionReq
                            ? "bg-amber-100/70 text-amber-950 border border-amber-200"
                            : "bg-emerald-50 text-emerald-900 border border-emerald-200/60"
                        }`}
                      >
                        {course.statusNote}
                      </p>
                    )}
                  </div>
                </div>

                <div className="flex items-center gap-2 shrink-0 self-end md:self-center">
                  <Link
                    href={`/admin/courses/${course.id}`}
                    className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold bg-primary text-primary-foreground hover:bg-primary-hover shadow-2xs transition-colors"
                  >
                    <span>Audit Curriculum</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            );
          })}

          <div className="pt-2 flex justify-end">
            <Link
              href="/admin/courses"
              className="text-xs font-bold text-primary hover:underline flex items-center gap-1"
            >
              <span>Go to Full Course Quality & Publishing Audit</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}
