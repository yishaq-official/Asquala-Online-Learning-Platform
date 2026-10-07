import * as React from "react";
import {
  MOCK_STUDENT_STATS,
  MOCK_JUMP_BACK_IN,
  MOCK_UPCOMING_DEADLINES,
  MOCK_ENROLLED_COURSES,
} from "@/lib/mock-student-data";
import { JumpBackInCard } from "@/components/student/dashboard/jump-back-in-card";
import { StudentStatCard } from "@/components/student/dashboard/student-stat-card";
import { EnrolledPreviewList } from "@/components/student/dashboard/enrolled-preview-list";
import { UpcomingDeadlinesCard } from "@/components/student/dashboard/upcoming-deadlines-card";
import { WeeklyGoalWidget } from "@/components/student/dashboard/weekly-goal-widget";
import { BookOpen, Clock, Flame, Award } from "lucide-react";

export default function StudentDashboardPage() {
  return (
    <div className="space-y-8 animate-in fade-in-0 duration-300">
      {/* Welcome & Motivational Greeting */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-foreground">
            Welcome back, Alex! 👋
          </h1>
          <p className="text-sm text-muted-foreground mt-1">
            Consistency is the key to mastery. You have 2 lessons left to complete your current module.
          </p>
        </div>

        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-50 text-amber-700 border border-amber-200 text-xs font-semibold w-fit">
          <Flame className="w-4 h-4 text-amber-500 fill-amber-500 animate-pulse" />
          <span>5-Day Learning Streak Active</span>
        </div>
      </div>

      {/* Hero "Jump Back In" Resumption Card */}
      <JumpBackInCard item={MOCK_JUMP_BACK_IN} />

      {/* 4-Col Learning Metrics Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
        <StudentStatCard
          label="Enrolled Courses"
          value={MOCK_STUDENT_STATS.enrolledCoursesCount}
          subtext="2 active in progress"
          icon={BookOpen}
          variant="primary"
        />
        <StudentStatCard
          label="Hours Learned"
          value={`${MOCK_STUDENT_STATS.totalHoursLearned}h`}
          subtext="+3.5 hrs this week"
          icon={Clock}
          variant="slate"
        />
        <StudentStatCard
          label="Current Streak"
          value={`${MOCK_STUDENT_STATS.currentStreakDays} Days`}
          subtext="Keep studying daily"
          icon={Flame}
          variant="amber"
        />
        <StudentStatCard
          label="Certificates"
          value={MOCK_STUDENT_STATS.completedCertificatesCount}
          subtext="Verified credentials"
          icon={Award}
          variant="primary"
        />
      </div>

      {/* Two-Column Grid: In-Progress Courses & Sidebar Widgets */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8 items-start">
        {/* Main Column: Enrolled Courses Quick View (2 cols wide on desktop) */}
        <div className="lg:col-span-2 space-y-6">
          <EnrolledPreviewList courses={MOCK_ENROLLED_COURSES} />
        </div>

        {/* Sidebar Widgets: Upcoming Deadlines & Weekly Study Goal */}
        <div className="space-y-6">
          <UpcomingDeadlinesCard deadlines={MOCK_UPCOMING_DEADLINES} />
          <WeeklyGoalWidget completedHours={3.5} targetHours={5.0} />
        </div>
      </div>
    </div>
  );
}
