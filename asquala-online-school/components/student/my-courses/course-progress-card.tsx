"use client";

import * as React from "react";
import Link from "next/link";
import Image from "next/image";
import { Play, CheckCircle2, Award, Clock, ArrowRight, BookOpen } from "lucide-react";
import { EnrolledCourseItem } from "@/types/student";

interface CourseProgressCardProps {
  course: EnrolledCourseItem;
}

export function CourseProgressCard({ course }: CourseProgressCardProps) {
  const isFinished = course.isCompleted || course.progressPercentage === 100;

  return (
    <div className="group bg-card border border-border hover:border-primary-border/80 rounded-2xl p-5 sm:p-6 shadow-2xs hover:shadow-md transition-all duration-200 flex flex-col md:flex-row md:items-center justify-between gap-6">
      {/* Thumbnail & Main Course Info */}
      <div className="flex items-start sm:items-center gap-4 sm:gap-5 flex-1 min-w-0">
        {/* Thumbnail */}
        <div className="relative w-20 h-20 sm:w-28 sm:h-24 rounded-xl overflow-hidden bg-secondary shrink-0 border border-border shadow-2xs">
          <Image
            src={course.thumbnailUrl}
            alt={course.title}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-300"
            sizes="(max-width: 640px) 80px, 112px"
          />
          {isFinished && (
            <div className="absolute top-1.5 right-1.5 p-1 rounded-full bg-primary text-white shadow-xs">
              <CheckCircle2 className="w-3.5 h-3.5" />
            </div>
          )}
        </div>

        {/* Content Details */}
        <div className="space-y-2 flex-1 min-w-0">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-secondary text-secondary-foreground border border-border">
              {course.category}
            </span>
            <span className="text-[11px] text-muted-foreground flex items-center gap-1">
              <Clock className="w-3 h-3" />
              Active {course.lastAccessedAt}
            </span>
          </div>

          <Link
            href={`/student/courses/${course.slug}`}
            className="block text-base sm:text-lg font-bold text-foreground hover:text-primary transition-colors leading-snug line-clamp-1"
          >
            {course.title}
          </Link>

          <p className="text-xs text-muted-foreground">
            Instructor: <span className="text-foreground font-semibold">{course.instructorName}</span>
          </p>

          {/* Progress Bar & Next Lesson indicator */}
          <div className="space-y-1.5 pt-1 max-w-md">
            <div className="flex items-center justify-between text-xs font-semibold">
              <span className="text-muted-foreground">
                {course.completedLessons} of {course.totalLessons} lessons completed
              </span>
              <span className={isFinished ? "text-primary font-bold" : "text-foreground font-bold"}>
                {course.progressPercentage}%
              </span>
            </div>

            <div className="h-2 w-full bg-secondary rounded-full overflow-hidden">
              <div
                className={`h-full rounded-full transition-all duration-500 ${
                  isFinished ? "bg-primary" : "bg-primary"
                }`}
                style={{ width: `${course.progressPercentage}%` }}
              />
            </div>

            {!isFinished && course.nextLessonTitle && (
              <p className="text-[11px] text-muted-foreground truncate pt-0.5">
                Up next: <span className="text-foreground font-medium">{course.nextLessonTitle}</span>
              </p>
            )}
          </div>
        </div>
      </div>

      {/* Action CTA Buttons */}
      <div className="shrink-0 flex items-center md:flex-col justify-end gap-2.5 pt-2 md:pt-0 border-t md:border-t-0 border-border/60">
        {isFinished ? (
          <>
            <Link
              href="/student/certificates"
              className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-primary text-white text-xs font-bold hover:bg-primary-hover shadow-xs transition-colors w-full sm:w-auto"
            >
              <Award className="w-4 h-4" />
              <span>View Certificate</span>
            </Link>
            <Link
              href={`/student/courses/${course.slug}`}
              className="inline-flex items-center justify-center gap-1.5 px-4 py-2 rounded-xl bg-secondary hover:bg-card border border-border text-foreground text-xs font-semibold transition-colors w-full sm:w-auto"
            >
              <BookOpen className="w-3.5 h-3.5 text-muted-foreground" />
              <span>Review Syllabus</span>
            </Link>
          </>
        ) : (
          <>
            <Link
              href={`/student/courses/${course.slug}/lessons/${course.nextLessonId || "lesson-1-1"}`}
              className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-primary text-white text-xs font-bold hover:bg-primary-hover shadow-xs transition-colors w-full sm:w-auto"
            >
              <Play className="w-3.5 h-3.5 fill-current" />
              <span>Continue Learning</span>
            </Link>
            <Link
              href={`/student/courses/${course.slug}`}
              className="inline-flex items-center justify-center gap-1 text-xs font-semibold text-muted-foreground hover:text-primary transition-colors py-1"
            >
              <span>Course Syllabus</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </>
        )}
      </div>
    </div>
  );
}
