"use client";

import React from "react";
import Link from "next/link";
import {
  Coins,
  Users,
  Star,
  BookOpen,
  Plus,
  ShieldCheck,
  Sparkles,
  ArrowRight,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { authClient } from "@/lib/auth-client";
import { StudioKpiCard } from "@/components/instructor/dashboard/studio-kpi-card";
import { TopCoursesOverview } from "@/components/instructor/dashboard/top-courses-overview";
import { PendingQaAlert } from "@/components/instructor/dashboard/pending-qa-alert";
import { RecentEnrollmentsFeed } from "@/components/instructor/dashboard/recent-enrollments-feed";
import { StudioQuickActions } from "@/components/instructor/dashboard/studio-quick-actions";
import {
  MOCK_INSTRUCTOR_KPIS,
  MOCK_INSTRUCTOR_COURSES,
  MOCK_CURRENT_INSTRUCTOR_APPLICATION,
} from "@/lib/mock-instructor-data";

export default function InstructorDashboardPage() {
  const { data: session } = authClient.useSession();
  const userName =
    session?.user?.name || MOCK_CURRENT_INSTRUCTOR_APPLICATION.fullName || "Educator";

  return (
    <div className="space-y-6 sm:space-y-8">
      {/* Welcome Banner */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1.5">
            <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-primary-light text-primary border border-primary-border">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>ACCREDITED EDUCATOR</span>
            </span>
            <span className="text-xs text-muted-foreground hidden sm:inline">
              Ethiopian Academic Board Verified
            </span>
          </div>

          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-foreground">
            Welcome back, {userName}! 👋
          </h1>
          <p className="text-sm text-muted-foreground mt-1 max-w-2xl">
            Here is your live teaching performance, student enrollment volume, and revenue summary across your published courses.
          </p>
        </div>

        {/* Action Header Button */}
        <div className="flex items-center gap-3 shrink-0">
          <Link href="/instructor/courses/create">
            <Button variant="primary" size="md" className="gap-2 shadow-xs">
              <Plus className="w-4 h-4" />
              <span>Create New Course</span>
            </Button>
          </Link>
        </div>
      </div>

      {/* 4 KPI Metrics Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StudioKpiCard
          title="Total Lifetime Revenue"
          value={`ETB ${MOCK_INSTRUCTOR_KPIS.totalRevenueETB.toLocaleString()}`}
          delta={{
            value: "+18%",
            isPositive: true,
            period: "vs last month",
          }}
          icon={Coins}
        />

        <StudioKpiCard
          title="Active Students"
          value={MOCK_INSTRUCTOR_KPIS.totalStudentsCount.toLocaleString()}
          delta={{
            value: `+${MOCK_INSTRUCTOR_KPIS.activeStudentsThisWeek}`,
            isPositive: true,
            period: "active this week",
          }}
          icon={Users}
        />

        <StudioKpiCard
          title="Average Course Rating"
          value={`${MOCK_INSTRUCTOR_KPIS.averageRating} ★`}
          subtitle={`Across ${MOCK_INSTRUCTOR_KPIS.totalReviewsCount} verified student reviews`}
          icon={Star}
        />

        <StudioKpiCard
          title="Course Portfolio"
          value={`${MOCK_INSTRUCTOR_COURSES.length} Courses`}
          subtitle={`${MOCK_INSTRUCTOR_KPIS.publishedCoursesCount} Published • ${MOCK_INSTRUCTOR_KPIS.draftCoursesCount} Draft`}
          icon={BookOpen}
        />
      </div>

      {/* Main Studio Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column (2 Cols on lg): Top Courses & Recent Enrollments */}
        <div className="lg:col-span-2 space-y-6">
          <TopCoursesOverview courses={MOCK_INSTRUCTOR_COURSES} />
          <RecentEnrollmentsFeed />
        </div>

        {/* Right Column: Q&A Alerts & Fast Shortcuts */}
        <div className="space-y-6">
          <PendingQaAlert />
          <StudioQuickActions />
        </div>
      </div>
    </div>
  );
}
