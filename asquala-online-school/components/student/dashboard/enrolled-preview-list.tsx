"use client";

import * as React from "react";
import Link from "next/link";
import Image from "next/image";
import { BookOpen, ArrowRight, Play, CheckCircle2 } from "lucide-react";
import { EnrolledCourseItem } from "@/types/student";

interface EnrolledPreviewListProps {
  courses: EnrolledCourseItem[];
}

export function EnrolledPreviewList({ courses }: EnrolledPreviewListProps) {
  return (
    <div className="bg-card border border-border rounded-2xl p-6 shadow-2xs space-y-5">
      {/* Header */}
      <div className="flex items-center justify-between pb-2 border-b border-border">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-primary-light text-primary flex items-center justify-center border border-primary-border/60">
            <BookOpen className="w-4 h-4" />
          </div>
          <div>
            <h3 className="text-base font-bold text-foreground">In-Progress Courses</h3>
            <p className="text-xs text-muted-foreground">Resume your active learning paths</p>
          </div>
        </div>

        <Link
          href="/student/courses"
          className="text-xs font-semibold text-primary hover:text-primary-hover flex items-center gap-1 transition-colors"
        >
          <span>View All</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </Link>
      </div>

      {/* Courses List */}
      <div className="space-y-4">
        {courses.map((course) => {
          const isFinished = course.progressPercentage === 100;

          return (
            <div
              key={course.courseId}
              className="group p-4 rounded-xl border border-border hover:border-primary-border/70 hover:shadow-2xs transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-muted/20 hover:bg-card"
            >
              <div className="flex items-start sm:items-center gap-3.5 min-w-0">
                {/* Course Thumbnail */}
                <div className="relative w-16 h-16 sm:w-20 sm:h-20 rounded-xl overflow-hidden bg-secondary shrink-0 border border-border">
                  <Image
                    src={course.thumbnailUrl}
                    alt={course.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                    sizes="80px"
                  />
                </div>

                <div className="space-y-1.5 min-w-0">
                  <span className="inline-block px-2 py-0.5 rounded-full text-[10px] font-semibold bg-secondary text-secondary-foreground border border-border">
                    {course.category}
                  </span>
                  <h4 className="text-sm font-bold text-foreground leading-snug line-clamp-1 group-hover:text-primary transition-colors">
                    {course.title}
                  </h4>
                  <p className="text-xs text-muted-foreground">
                    By {course.instructorName} • Last active {course.lastAccessedAt}
                  </p>

                  {/* Progress bar */}
                  <div className="space-y-1 pt-0.5 max-w-xs">
                    <div className="flex items-center justify-between text-[11px] text-muted-foreground">
                      <span>
                        {course.completedLessons} of {course.totalLessons} lessons
                      </span>
                      <span className="font-semibold text-foreground">
                        {course.progressPercentage}%
                      </span>
                    </div>
                    <div className="h-1.5 w-full bg-secondary rounded-full overflow-hidden">
                      <div
                        className={`h-full rounded-full transition-all duration-500 ${
                          isFinished ? "bg-emerald-600" : "bg-primary"
                        }`}
                        style={{ width: `${course.progressPercentage}%` }}
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Action Button */}
              <div className="shrink-0 pt-1 sm:pt-0">
                {isFinished ? (
                  <Link
                    href={`/student/courses/${course.slug}`}
                    className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg bg-primary-light text-primary border border-primary-border/80 text-xs font-semibold hover:bg-primary hover:text-white transition-colors"
                  >
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    <span>Review Course</span>
                  </Link>
                ) : (
                  <Link
                    href={`/student/courses/${course.slug}/lessons/${course.nextLessonId || "lesson-1-1"}`}
                    className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg bg-primary text-white text-xs font-semibold hover:bg-primary-hover shadow-2xs transition-colors"
                  >
                    <Play className="w-3 h-3 fill-current" />
                    <span>Resume</span>
                  </Link>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
