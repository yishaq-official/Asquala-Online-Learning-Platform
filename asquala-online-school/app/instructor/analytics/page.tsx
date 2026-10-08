"use client";

import React, { useState } from "react";
import {
  BarChart3,
  Users,
  GraduationCap,
  Star,
  TrendingUp,
  Award,
  Calendar,
  Filter,
} from "lucide-react";
import {
  MOCK_INSTRUCTOR_ANALYTICS,
  MOCK_INSTRUCTOR_COURSES,
} from "@/lib/mock-instructor-data";
import { EnrollmentTrendCard } from "@/components/instructor/analytics/enrollment-trend-card";
import { CurriculumDropoffFunnel } from "@/components/instructor/analytics/curriculum-dropoff-funnel";
import { AssessmentStatsCard } from "@/components/instructor/analytics/assessment-stats-card";
import { StudentReviewsFeed } from "@/components/instructor/analytics/student-reviews-feed";

export default function InstructorAnalyticsPage() {
  const [selectedCourseFilter, setSelectedCourseFilter] = useState("all");
  const [selectedPeriod, setSelectedPeriod] = useState<"30d" | "90d" | "all">("all");

  const analytics = MOCK_INSTRUCTOR_ANALYTICS;

  return (
    <div className="space-y-8">
      {/* Page Header & Filtering Controls */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-primary-light text-primary border border-primary-border mb-1.5">
            <BarChart3 className="w-3.5 h-3.5" />
            <span>STUDENT ENGAGEMENT METRICS</span>
          </div>

          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-foreground">
            Student Analytics &amp; Course Insights
          </h1>
          <p className="text-xs sm:text-sm text-muted-foreground mt-1 max-w-2xl">
            Monitor real-time student trajectories, module drop-off rates, assessment difficulty, and reviews across your curriculum.
          </p>
        </div>

        {/* Filters */}
        <div className="flex flex-wrap items-center gap-2.5 self-start md:self-auto">
          {/* Course Selector */}
          <select
            value={selectedCourseFilter}
            onChange={(e) => setSelectedCourseFilter(e.target.value)}
            className="px-3 py-2 rounded-xl border border-border bg-card text-xs font-semibold text-foreground focus:outline-hidden"
          >
            <option value="all">All Teaching Courses</option>
            {MOCK_INSTRUCTOR_COURSES.map((course) => (
              <option key={course.id} value={course.id}>
                {course.title}
              </option>
            ))}
          </select>

          {/* Time Period Filter */}
          <div className="flex items-center p-0.5 rounded-xl border border-border bg-secondary/50">
            {(
              [
                { id: "30d", label: "Last 30 Days" },
                { id: "90d", label: "Last 90 Days" },
                { id: "all", label: "All Time" },
              ] as const
            ).map((period) => (
              <button
                key={period.id}
                type="button"
                onClick={() => setSelectedPeriod(period.id)}
                className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-all ${
                  selectedPeriod === period.id
                    ? "bg-card text-foreground shadow-2xs"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                {period.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Top 4 High-Level Metric KPI Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Total Students */}
        <div className="bg-card border border-border rounded-2xl p-4 sm:p-5 shadow-xs space-y-1">
          <div className="flex items-center justify-between text-muted-foreground">
            <span className="text-xs font-medium">Total Students</span>
            <Users className="w-4 h-4 text-primary" />
          </div>
          <div className="text-2xl sm:text-3xl font-extrabold text-foreground">
            {analytics.overview.totalEnrollments.toLocaleString()}
          </div>
          <p className="text-[11px] text-emerald-700 font-semibold flex items-center gap-1">
            <TrendingUp className="w-3 h-3" />
            <span>+24% vs. previous period</span>
          </p>
        </div>

        {/* Active Students */}
        <div className="bg-card border border-border rounded-2xl p-4 sm:p-5 shadow-xs space-y-1">
          <div className="flex items-center justify-between text-muted-foreground">
            <span className="text-xs font-medium">Active Learners</span>
            <GraduationCap className="w-4 h-4 text-primary" />
          </div>
          <div className="text-2xl sm:text-3xl font-extrabold text-foreground">
            {analytics.overview.activeLearnersThisMonth.toLocaleString()}
          </div>
          <p className="text-[11px] text-muted-foreground">
            Learned within the past 14 days
          </p>
        </div>

        {/* Course Completion Rate */}
        <div className="bg-card border border-border rounded-2xl p-4 sm:p-5 shadow-xs space-y-1">
          <div className="flex items-center justify-between text-muted-foreground">
            <span className="text-xs font-medium">Avg Completion Rate</span>
            <Award className="w-4 h-4 text-primary" />
          </div>
          <div className="text-2xl sm:text-3xl font-extrabold text-foreground">
            {analytics.overview.avgCompletionRate}%
          </div>
          <p className="text-[11px] text-emerald-700 font-semibold">
            Top 5% across Asquala
          </p>
        </div>

        {/* Student Satisfaction */}
        <div className="bg-card border border-border rounded-2xl p-4 sm:p-5 shadow-xs space-y-1">
          <div className="flex items-center justify-between text-muted-foreground">
            <span className="text-xs font-medium">Instructor Rating</span>
            <Star className="w-4 h-4 text-amber-500 fill-amber-500" />
          </div>
          <div className="text-2xl sm:text-3xl font-extrabold text-foreground flex items-center gap-1.5">
            <span>4.9</span>
            <span className="text-xs text-muted-foreground font-normal">/ 5.0</span>
          </div>
          <p className="text-[11px] text-muted-foreground">
            From 385 verified student reviews
          </p>
        </div>
      </div>

      {/* 1. Monthly Enrollment Velocity & Geographic Distribution */}
      <EnrollmentTrendCard
        trends={analytics.monthlyTrends}
        regionalBreakdown={analytics.regionalBreakdown}
      />

      {/* 2. Curriculum Completion Funnel */}
      <CurriculumDropoffFunnel stages={analytics.funnelStages} />

      {/* 3. Assessment Performance & Hardest Concepts */}
      <AssessmentStatsCard insights={analytics.assessmentInsights} />

      {/* 4. Student Reviews & Direct Instructor Replies */}
      <StudentReviewsFeed initialReviews={analytics.reviews} />
    </div>
  );
}
