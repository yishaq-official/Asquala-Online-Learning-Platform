"use client";

import * as React from "react";
import Link from "next/link";
import { Sparkles, ArrowRight, BookOpen } from "lucide-react";
import { EnrolledCourseItem } from "@/types/student";

interface UpcomingCertificatesWidgetProps {
  inProgressCourses: EnrolledCourseItem[];
}

export function UpcomingCertificatesWidget({
  inProgressCourses,
}: UpcomingCertificatesWidgetProps) {
  if (inProgressCourses.length === 0) return null;

  return (
    <div className="bg-card border border-border rounded-2xl p-6 sm:p-7 shadow-2xs space-y-5">
      <div className="flex items-center gap-2.5 pb-1 border-b border-border/80">
        <div className="w-8 h-8 rounded-lg bg-amber-50 text-amber-600 flex items-center justify-center border border-amber-200">
          <Sparkles className="w-4 h-4" />
        </div>
        <div>
          <h3 className="font-bold text-base text-foreground">Upcoming Credentials</h3>
          <p className="text-xs text-muted-foreground">
            Complete the remaining lessons to unlock these verified certificates.
          </p>
        </div>
      </div>

      <div className="space-y-4">
        {inProgressCourses.map((course) => {
          const remaining = course.totalLessons - course.completedLessons;

          return (
            <div
              key={course.courseId}
              className="p-4 rounded-xl border border-border/80 bg-muted/15 flex flex-col sm:flex-row sm:items-center justify-between gap-4"
            >
              <div className="space-y-1.5 min-w-0 flex-1">
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-secondary text-secondary-foreground border border-border">
                  {course.category}
                </span>
                <h4 className="font-bold text-sm text-foreground truncate">
                  {course.title}
                </h4>
                <p className="text-xs text-muted-foreground">
                  <strong className="text-primary">{remaining} lessons remaining</strong> to unlock certificate.
                </p>

                {/* Progress bar */}
                <div className="h-1.5 w-full max-w-sm bg-secondary rounded-full overflow-hidden">
                  <div
                    className="h-full bg-primary rounded-full transition-all duration-500"
                    style={{ width: `${course.progressPercentage}%` }}
                  />
                </div>
              </div>

              <div className="shrink-0">
                <Link
                  href={`/student/courses/${course.slug}`}
                  className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-primary text-white text-xs font-bold hover:bg-primary-hover shadow-2xs transition-colors"
                >
                  <span>Continue</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
