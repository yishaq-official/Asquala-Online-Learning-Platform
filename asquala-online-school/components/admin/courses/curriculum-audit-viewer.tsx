"use client";

import React, { useState } from "react";
import {
  CheckCircle2,
  AlertTriangle,
  Coins,
  Percent,
  Layers,
  Video,
  FileQuestion,
  FileCode2,
  Sparkles,
  ChevronDown,
  ChevronUp,
  PlayCircle,
  ShieldCheck,
  GraduationCap,
} from "lucide-react";
import { CourseAuditDetail } from "@/types/admin";

interface CurriculumAuditViewerProps {
  course: CourseAuditDetail;
}

export function CurriculumAuditViewer({ course }: CurriculumAuditViewerProps) {
  const [expandedModuleId, setExpandedModuleId] = useState<string | null>(
    course.modules[0]?.id || null
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

  const toggleModule = (id: string) => {
    setExpandedModuleId(expandedModuleId === id ? null : id);
  };

  return (
    <div className="space-y-6">
      {/* SECTION 1: Audited Learning Outcomes & Prerequisites */}
      <div className="p-6 rounded-3xl bg-card border border-border shadow-2xs space-y-5">
        <div className="flex items-center justify-between pb-3 border-b border-border">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl bg-emerald-50 border border-emerald-200 flex items-center justify-center text-emerald-800">
              <GraduationCap className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-foreground">
                Audited Learning Outcomes & Competencies
              </h3>
              <p className="text-[11px] text-muted-foreground">
                Verified market-ready engineering skills students will master
              </p>
            </div>
          </div>

          <span className="text-[10px] font-bold px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 border border-emerald-200">
            {course.learningOutcomes.length} Core Outcomes
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Learning Outcomes List */}
          <div className="space-y-2">
            <span className="text-[11px] font-bold text-foreground uppercase tracking-wider block">
              Graduation Competencies Checklist:
            </span>
            <div className="space-y-2">
              {course.learningOutcomes.map((outcome, index) => (
                <div
                  key={index}
                  className="p-3 rounded-2xl bg-secondary/40 border border-border/80 flex items-start gap-2.5 text-xs text-foreground/90"
                >
                  <CheckCircle2 className="w-4 h-4 text-emerald-700 shrink-0 mt-0.5" />
                  <span className="leading-relaxed">{outcome}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Prerequisites */}
          <div className="space-y-2">
            <span className="text-[11px] font-bold text-foreground uppercase tracking-wider block">
              Audited Student Prerequisites:
            </span>
            <div className="space-y-2">
              {course.prerequisites.map((prereq, index) => (
                <div
                  key={index}
                  className="p-3 rounded-2xl bg-secondary/40 border border-border/80 flex items-start gap-2.5 text-xs text-foreground/90"
                >
                  <span className="w-5 h-5 rounded-lg bg-emerald-100 text-emerald-900 font-bold text-[10px] flex items-center justify-center shrink-0 mt-0.5">
                    {index + 1}
                  </span>
                  <span className="leading-relaxed">{prereq}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* SECTION 2: Financial Tuition & 85/15 Revenue Split Breakdown */}
      <div className="p-6 rounded-3xl bg-card border border-border shadow-2xs space-y-4">
        <div className="flex items-center justify-between pb-3 border-b border-border">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl bg-emerald-50 border border-emerald-200 flex items-center justify-center text-emerald-800">
              <Coins className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-foreground">
                ETB Tuition Pricing & 85/15 Platform Revenue Split
              </h3>
              <p className="text-[11px] text-muted-foreground">
                Verified compliance with Asquala Ethiopian marketplace commercial standards
              </p>
            </div>
          </div>

          <span className="text-[10px] font-bold px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 border border-emerald-200">
            Standard 85/15 Split
          </span>
        </div>

        {/* 3-Column Split Card */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Column 1: Listed Tuition */}
          <div className="p-4 rounded-2xl bg-secondary/50 border border-border space-y-1">
            <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider block">
              Listed Student Price
            </span>
            <p className="text-2xl font-bold tracking-tight text-foreground">
              {formatETB(course.priceETB)}
            </p>
            <p className="text-[11px] text-muted-foreground pt-1">
              Lifetime access • Mobile & web streaming in Ethiopia
            </p>
          </div>

          {/* Column 2: Instructor Royalty (85%) */}
          <div className="p-4 rounded-2xl bg-emerald-50/80 border border-emerald-200/80 space-y-1">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-bold text-emerald-950 uppercase tracking-wider">
                Instructor Net Royalty (85%)
              </span>
              <span className="text-[10px] font-bold px-1.5 py-0.2 bg-emerald-200/60 text-emerald-900 rounded">
                85%
              </span>
            </div>
            <p className="text-2xl font-bold tracking-tight text-emerald-950">
              {formatETB(course.instructorRoyaltyETB)}
            </p>
            <p className="text-[11px] text-emerald-800 pt-1">
              Disbursed directly to Telebirr or CBE Bank account
            </p>
          </div>

          {/* Column 3: Asquala Take-Rate (15%) */}
          <div className="p-4 rounded-2xl bg-secondary/50 border border-border space-y-1">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider">
                Asquala Take-Rate (15%)
              </span>
              <span className="text-[10px] font-bold px-1.5 py-0.2 bg-secondary text-foreground rounded">
                15%
              </span>
            </div>
            <p className="text-2xl font-bold tracking-tight text-foreground">
              {formatETB(course.platformTakeRateETB)}
            </p>
            <p className="text-[11px] text-muted-foreground pt-1">
              Video CDN hosting, Telebirr payment webhooks & bandwidth
            </p>
          </div>
        </div>
      </div>

      {/* SECTION 3: Curriculum Structure & Assessment Compliance */}
      <div className="p-6 rounded-3xl bg-card border border-border shadow-2xs space-y-5">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-border">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl bg-emerald-50 border border-emerald-200 flex items-center justify-center text-emerald-800">
              <Layers className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-foreground">
                Syllabus & Assessment Compliance
              </h3>
              <p className="text-[11px] text-muted-foreground">
                Module lesson breakdown and milestone quiz passing threshold verification
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 border border-emerald-200">
              {course.totalModules} Modules
            </span>
            <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 border border-emerald-200">
              {course.totalQuizzes} Milestone Quizzes
            </span>
          </div>
        </div>

        {/* Milestone Threshold Banner */}
        <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 flex items-start gap-3">
          <ShieldCheck className="w-5 h-5 text-emerald-700 shrink-0 mt-0.5" />
          <div className="text-xs space-y-0.5">
            <span className="font-bold text-emerald-950 block">
              Mandatory Milestone Passing Threshold: {course.passingThresholdPercent}%
            </span>
            <p className="text-emerald-900 leading-relaxed">
              Asquala accreditation requires an 80% minimum passing score on all milestone quizzes before students earn verified course completion certificates.
            </p>
          </div>
        </div>

        {/* Modules Accordion List */}
        <div className="space-y-3">
          {course.modules.map((mod) => {
            const isExpanded = expandedModuleId === mod.id;
            const hasQuizWarning = mod.hasMilestoneQuiz && (mod.quizQuestionsCount || 0) < 5;

            return (
              <div
                key={mod.id}
                className="rounded-2xl border border-border bg-card overflow-hidden transition-all shadow-2xs"
              >
                {/* Module Header Toggle */}
                <button
                  type="button"
                  onClick={() => toggleModule(mod.id)}
                  className="w-full p-4 flex items-center justify-between text-left hover:bg-secondary/40 transition-colors cursor-pointer gap-3"
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <span className="w-7 h-7 rounded-xl bg-emerald-100 text-emerald-900 font-bold text-xs flex items-center justify-center shrink-0">
                      {mod.moduleIndex}
                    </span>
                    <div className="min-w-0">
                      <h4 className="text-xs sm:text-sm font-bold text-foreground truncate">
                        {mod.title}
                      </h4>
                      <p className="text-[11px] text-muted-foreground">
                        {mod.lessonsCount} Lessons • {mod.durationMinutes} Minutes total
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 shrink-0">
                    {mod.hasMilestoneQuiz && (
                      <span
                        className={`text-[10px] font-bold px-2 py-0.5 rounded-full border flex items-center gap-1 ${
                          hasQuizWarning
                            ? "bg-amber-100 text-amber-900 border-amber-300"
                            : "bg-emerald-100 text-emerald-800 border-emerald-300"
                        }`}
                      >
                        <FileQuestion className="w-3 h-3" />
                        <span>Quiz ({mod.quizQuestionsCount} questions)</span>
                      </span>
                    )}

                    {isExpanded ? (
                      <ChevronUp className="w-4 h-4 text-muted-foreground" />
                    ) : (
                      <ChevronDown className="w-4 h-4 text-muted-foreground" />
                    )}
                  </div>
                </button>

                {/* Expanded Details */}
                {isExpanded && (
                  <div className="p-4 pt-1 border-t border-border/80 bg-secondary/20 space-y-3 text-xs">
                    {mod.sampleVideoTitle && (
                      <div className="p-3 rounded-xl bg-card border border-border flex items-center justify-between gap-3">
                        <div className="flex items-center gap-2.5 min-w-0">
                          <PlayCircle className="w-4 h-4 text-emerald-700 shrink-0" />
                          <span className="font-semibold text-foreground truncate">
                            Lecture: {mod.sampleVideoTitle}
                          </span>
                        </div>
                        <span className="text-[10px] font-bold text-emerald-800 bg-emerald-100 px-2 py-0.5 rounded-full shrink-0">
                          {mod.sampleVideoQuality || "1080p HD"}
                        </span>
                      </div>
                    )}

                    {mod.hasMilestoneQuiz && (
                      <div className="p-3 rounded-xl bg-card border border-border space-y-1">
                        <div className="flex items-center justify-between">
                          <span className="font-bold text-foreground text-xs">
                            Milestone Assessment Criteria
                          </span>
                          <span className="text-[10px] font-bold text-emerald-800">
                            Required Threshold: {mod.quizPassingThreshold || 80}%
                          </span>
                        </div>
                        <p className="text-[11px] text-muted-foreground">
                          Total Assessment Questions: <strong>{mod.quizQuestionsCount}</strong> (Timed multi-choice & code evaluation).
                        </p>
                        {hasQuizWarning && (
                          <p className="text-[11px] text-amber-900 font-semibold bg-amber-50 p-2 rounded-lg border border-amber-200 mt-1">
                            ⚠️ Action Required: Quiz has only {mod.quizQuestionsCount} questions. Minimum 5 questions required by Asquala curriculum policies.
                          </p>
                        )}
                      </div>
                    )}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
