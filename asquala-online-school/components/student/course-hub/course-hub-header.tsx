"use client";

import * as React from "react";
import Link from "next/link";
import { Play, ChevronRight, BookOpen } from "lucide-react";
import { CourseDetail } from "@/types/student";

interface CourseHubHeaderProps {
  course: CourseDetail;
  completedLessonsCount: number;
  totalLessonsCount: number;
  progressPercentage: number;
  nextLessonId: string;
}

export function CourseHubHeader({
  course,
  completedLessonsCount,
  totalLessonsCount,
  progressPercentage,
  nextLessonId,
}: CourseHubHeaderProps) {
  const isFinished = progressPercentage === 100;

  return (
    <div className="bg-card border border-border rounded-2xl p-6 sm:p-7 shadow-xs space-y-6">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-1.5 text-xs text-muted-foreground flex-wrap">
        <Link
          href="/student/courses"
          className="hover:text-foreground transition-colors font-medium"
        >
          My Courses
        </Link>
        <ChevronRight className="w-3.5 h-3.5" />
        <span className="text-foreground font-semibold truncate max-w-sm">{course.title}</span>
      </nav>

      {/* Main Header & Resumption Action */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
        <div className="space-y-2 flex-1 min-w-0">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-primary-light text-primary border border-primary-border">
              {course.category}
            </span>
            <span className="text-xs text-muted-foreground">
              Instructor: <strong className="text-foreground">{course.instructor.name}</strong>
            </span>
          </div>

          <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold text-foreground tracking-tight leading-tight">
            {course.title}
          </h1>

          {/* Progress Bar & Statistics */}
          <div className="space-y-1.5 pt-2 max-w-lg">
            <div className="flex items-center justify-between text-xs font-semibold">
              <span className="text-muted-foreground">
                Overall Progress: {completedLessonsCount} of {totalLessonsCount} lessons completed
              </span>
              <span className="font-bold text-primary">{progressPercentage}%</span>
            </div>
            <div className="h-2.5 w-full bg-secondary rounded-full overflow-hidden">
              <div
                className="h-full bg-primary rounded-full transition-all duration-700"
                style={{ width: `${progressPercentage}%` }}
              />
            </div>
          </div>
        </div>

        {/* Resumption CTA Button */}
        <div className="shrink-0 pt-1 lg:pt-0">
          <Link
            href={`/student/courses/${course.slug}/lessons/${nextLessonId}`}
            className="inline-flex items-center justify-center gap-2.5 px-6 py-3.5 rounded-xl bg-primary text-white font-bold text-sm hover:bg-primary-hover shadow-xs hover:shadow transition-all group w-full sm:w-auto"
          >
            {isFinished ? (
              <>
                <BookOpen className="w-4 h-4" />
                <span>Review First Lesson</span>
              </>
            ) : (
              <>
                <Play className="w-4 h-4 fill-current transition-transform group-hover:scale-110" />
                <span>Continue Learning</span>
              </>
            )}
          </Link>
        </div>
      </div>
    </div>
  );
}
