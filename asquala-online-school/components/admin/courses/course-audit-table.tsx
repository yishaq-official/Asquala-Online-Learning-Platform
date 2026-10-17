"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import {
  Search,
  X,
  BookCheck,
  Clock,
  AlertTriangle,
  CheckCircle2,
  XCircle,
  Sparkles,
  ArrowRight,
  Video,
  FileQuestion,
  Coins,
  Percent,
  Layers,
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { CourseAuditDetail, CoursePublicationStatus } from "@/types/admin";

export type CourseFilterTab = "all" | "in_audit" | "revision_requested" | "approved";

interface CourseAuditTableProps {
  courses: CourseAuditDetail[];
}

export function CourseAuditTable({ courses }: CourseAuditTableProps) {
  const [activeTab, setActiveTab] = useState<CourseFilterTab>("all");
  const [searchQuery, setSearchQuery] = useState("");

  const formatETB = (amount: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "ETB",
      maximumFractionDigits: 0,
    })
      .format(amount)
      .replace("ETB", "ETB ");
  };

  const counts = useMemo(() => {
    return {
      all: courses.length,
      in_audit: courses.filter(
        (c) => c.status === "pending_review" || c.status === "in_audit"
      ).length,
      revision_requested: courses.filter((c) => c.status === "revision_requested").length,
      approved: courses.filter((c) => c.status === "approved").length,
    };
  }, [courses]);

  const filteredCourses = useMemo(() => {
    return courses.filter((c) => {
      // Tab filter
      if (activeTab === "in_audit") {
        if (c.status !== "pending_review" && c.status !== "in_audit") return false;
      } else if (activeTab === "revision_requested") {
        if (c.status !== "revision_requested") return false;
      } else if (activeTab === "approved") {
        if (c.status !== "approved") return false;
      }

      // Search filter
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchesTitle = c.title.toLowerCase().includes(q);
        const matchesInstructor = c.instructorName.toLowerCase().includes(q);
        const matchesCat = c.category.toLowerCase().includes(q);
        return matchesTitle || matchesInstructor || matchesCat;
      }

      return true;
    });
  }, [courses, activeTab, searchQuery]);

  const tabs: Array<{
    id: CourseFilterTab;
    label: string;
    count: number;
    icon: React.ComponentType<{ className?: string }>;
  }> = [
    { id: "all", label: "All Submissions", count: counts.all, icon: Layers },
    { id: "in_audit", label: "Under Board Audit", count: counts.in_audit, icon: Clock },
    { id: "revision_requested", label: "Revision Needed", count: counts.revision_requested, icon: AlertTriangle },
    { id: "approved", label: "Approved & Live", count: counts.approved, icon: CheckCircle2 },
  ];

  return (
    <div className="space-y-5">
      {/* Search & Tabs Controls */}
      <div className="space-y-4">
        {/* Search Bar */}
        <div className="relative">
          <Search className="w-4 h-4 text-muted-foreground absolute left-3.5 top-3" />
          <Input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search courses by title, instructor name, or subject category..."
            className="pl-10 pr-9 text-xs py-2.5 bg-card"
          />
          {searchQuery && (
            <button
              type="button"
              onClick={() => setSearchQuery("")}
              className="absolute right-3 top-2.5 p-1 text-muted-foreground hover:text-foreground cursor-pointer"
              aria-label="Clear search"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          )}
        </div>

        {/* Status Tabs */}
        <div className="flex flex-wrap items-center gap-2 pb-1 overflow-x-auto">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;

            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-semibold transition-all cursor-pointer whitespace-nowrap border ${
                  isActive
                    ? "bg-primary text-primary-foreground border-primary shadow-2xs font-bold"
                    : "bg-card text-muted-foreground hover:text-foreground hover:bg-secondary border-border"
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                <span>{tab.label}</span>
                <span
                  className={`text-[10px] font-bold px-1.5 py-0.2 rounded-full ${
                    isActive
                      ? "bg-white/20 text-white"
                      : "bg-secondary text-foreground"
                  }`}
                >
                  {tab.count}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Courses List */}
      {filteredCourses.length === 0 ? (
        <div className="p-12 text-center bg-card border border-border rounded-3xl space-y-3">
          <div className="w-12 h-12 rounded-2xl bg-secondary flex items-center justify-center mx-auto text-muted-foreground">
            <Search className="w-6 h-6" />
          </div>
          <h3 className="text-base font-bold text-foreground">
            No course submissions match your criteria
          </h3>
          <p className="text-xs text-muted-foreground max-w-sm mx-auto">
            Try adjusting your search query or selecting a different review status filter.
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          {filteredCourses.map((course) => {
            const isApproved = course.status === "approved";
            const isRevision = course.status === "revision_requested";
            const isInAudit = course.status === "in_audit";
            const isPending = course.status === "pending_review";

            return (
              <div
                key={course.id}
                className="p-5 sm:p-6 rounded-3xl bg-card border border-border hover:border-emerald-300 transition-all shadow-2xs hover:shadow-sm space-y-4"
              >
                {/* Course Header */}
                <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                  <div className="space-y-1.5 min-w-0 flex-1">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200 uppercase tracking-wider">
                        {course.category}
                      </span>
                      <span className="text-[10px] font-semibold text-muted-foreground">
                        {course.difficulty} • {course.language}
                      </span>

                      {/* Status Badge */}
                      {isApproved && (
                        <span className="text-[10px] font-bold px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 border border-emerald-300 flex items-center gap-1">
                          <CheckCircle2 className="w-3 h-3 text-emerald-700" />
                          Approved & Live on Marketplace
                        </span>
                      )}
                      {isRevision && (
                        <span className="text-[10px] font-bold px-2.5 py-0.5 rounded-full bg-amber-100 text-amber-900 border border-amber-300 flex items-center gap-1">
                          <AlertTriangle className="w-3 h-3 text-amber-700" />
                          Revision Required
                        </span>
                      )}
                      {isInAudit && (
                        <span className="text-[10px] font-bold px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 border border-emerald-300 flex items-center gap-1">
                          <Sparkles className="w-3 h-3 text-emerald-700" />
                          Auditor In Progress
                        </span>
                      )}
                      {isPending && (
                        <span className="text-[10px] font-bold px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200 flex items-center gap-1">
                          <Clock className="w-3 h-3 text-emerald-600" />
                          Awaiting Board Audit
                        </span>
                      )}
                    </div>

                    <h3 className="text-base sm:text-lg font-bold text-foreground">
                      {course.title}
                    </h3>
                    <p className="text-xs text-muted-foreground line-clamp-2">
                      {course.subtitle}
                    </p>
                  </div>

                  {/* Instructor Chip */}
                  <div className="flex items-center gap-3 shrink-0 p-2.5 rounded-2xl bg-secondary/50 border border-border/80">
                    <img
                      src={course.instructorAvatar}
                      alt={course.instructorName}
                      className="w-10 h-10 rounded-xl object-cover border border-border shrink-0"
                    />
                    <div className="min-w-0">
                      <p className="text-xs font-bold text-foreground truncate">
                        {course.instructorName}
                      </p>
                      <p className="text-[10px] text-muted-foreground truncate max-w-[180px]">
                        {course.instructorTitle}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Metrics & Revenue Split Row */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3 pt-2 border-t border-border/80 text-xs">
                  {/* Metric 1: Curriculum Volume */}
                  <div className="p-3 rounded-xl bg-secondary/30 border border-border/60 space-y-1">
                    <div className="flex items-center gap-1.5 text-muted-foreground">
                      <Layers className="w-3.5 h-3.5 text-emerald-700" />
                      <span className="text-[11px] font-semibold">Curriculum Volume</span>
                    </div>
                    <p className="font-bold text-foreground text-sm">
                      {course.totalModules} Modules • {course.totalLessons} Lessons
                    </p>
                    <p className="text-[10px] text-muted-foreground">
                      {course.totalDurationHours} hours total runtime
                    </p>
                  </div>

                  {/* Metric 2: Assessments */}
                  <div className="p-3 rounded-xl bg-secondary/30 border border-border/60 space-y-1">
                    <div className="flex items-center gap-1.5 text-muted-foreground">
                      <FileQuestion className="w-3.5 h-3.5 text-emerald-700" />
                      <span className="text-[11px] font-semibold">Milestone Quizzes</span>
                    </div>
                    <p className="font-bold text-foreground text-sm">
                      {course.totalQuizzes} Quizzes ({course.passingThresholdPercent}% Pass)
                    </p>
                    <p className="text-[10px] text-emerald-800 font-semibold">
                      Certificate threshold compliant
                    </p>
                  </div>

                  {/* Metric 3: Video Quality */}
                  <div className="p-3 rounded-xl bg-secondary/30 border border-border/60 space-y-1">
                    <div className="flex items-center gap-1.5 text-muted-foreground">
                      <Video className="w-3.5 h-3.5 text-emerald-700" />
                      <span className="text-[11px] font-semibold">Video Compliance</span>
                    </div>
                    <p className="font-bold text-foreground text-sm">
                      {course.videoQuality}
                    </p>
                    <p className="text-[10px] text-muted-foreground">
                      {course.starterFilesIncluded ? "Starter code files included" : "No starter code"}
                    </p>
                  </div>

                  {/* Metric 4: Tuition & 85/15 Split */}
                  <div className="p-3 rounded-xl bg-emerald-50/80 border border-emerald-200/80 space-y-1">
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] uppercase font-bold text-emerald-950">
                        Tuition & 85/15 Split
                      </span>
                      <Coins className="w-3.5 h-3.5 text-emerald-700" />
                    </div>
                    <p className="font-bold text-foreground text-sm">
                      {formatETB(course.priceETB)}
                    </p>
                    <div className="flex items-center justify-between text-[10px] text-emerald-900">
                      <span>Royalty 85%: <strong>{formatETB(course.instructorRoyaltyETB)}</strong></span>
                      <span>Take 15%: <strong>{formatETB(course.platformTakeRateETB)}</strong></span>
                    </div>
                  </div>
                </div>

                {/* Status Note Callout if present */}
                {course.statusNote && (
                  <div
                    className={`p-3 rounded-xl text-xs font-medium ${
                      isRevision
                        ? "bg-amber-50 text-amber-950 border border-amber-200"
                        : "bg-emerald-50 text-emerald-950 border border-emerald-200/80"
                    }`}
                  >
                    <p className="text-[11px] leading-relaxed">
                      <strong>Auditor Note:</strong> {course.statusNote}
                    </p>
                  </div>
                )}

                {/* Action CTA */}
                <div className="pt-2 flex items-center justify-between text-xs">
                  <span className="text-[11px] text-muted-foreground">
                    Submitted: {course.submittedAt}
                  </span>

                  <Link
                    href={`/admin/courses/${course.id}`}
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-xl font-bold bg-primary text-primary-foreground hover:bg-primary-hover shadow-2xs transition-colors"
                  >
                    <span>Audit Curriculum & Split</span>
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
