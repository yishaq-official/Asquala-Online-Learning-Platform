"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { BookOpen, Users, Star, ArrowRight, Settings, ExternalLink } from "lucide-react";
import { InstructorCourseItem } from "@/types/instructor";

interface TopCoursesOverviewProps {
  courses: InstructorCourseItem[];
}

export function TopCoursesOverview({ courses }: TopCoursesOverviewProps) {
  return (
    <div className="bg-card border border-border rounded-2xl p-6 sm:p-7 shadow-xs space-y-5">
      <div className="flex items-center justify-between border-b border-border/80 pb-4">
        <div>
          <h2 className="text-base font-bold text-foreground flex items-center gap-2">
            <BookOpen className="w-5 h-5 text-primary" />
            Top Performing Courses
          </h2>
          <p className="text-xs text-muted-foreground mt-0.5">
            Active curricula ordered by student enrollment volume and revenue.
          </p>
        </div>

        <Link
          href="/instructor/courses"
          className="inline-flex items-center gap-1.5 text-xs font-bold text-primary hover:underline shrink-0"
        >
          <span>All Courses ({courses.length})</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </Link>
      </div>

      <div className="divide-y divide-border/80">
        {courses.slice(0, 3).map((course) => (
          <div
            key={course.id}
            className="py-4 first:pt-0 last:pb-0 flex flex-col sm:flex-row sm:items-center justify-between gap-4 transition-colors hover:bg-secondary/30 rounded-xl p-2 -mx-2"
          >
            {/* Left: Thumbnail & Details */}
            <div className="flex items-center gap-3.5 min-w-0">
              <div className="relative w-16 h-12 sm:w-20 sm:h-14 rounded-xl overflow-hidden bg-secondary shrink-0 border border-border">
                <Image
                  src={course.thumbnailUrl}
                  alt={course.title}
                  fill
                  className="object-cover"
                />
              </div>

              <div className="min-w-0 space-y-1">
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-primary-light text-primary border border-primary-border">
                    {course.category}
                  </span>
                  <span
                    className={`px-2 py-0.5 rounded-full text-[10px] font-bold border ${
                      course.status === "published"
                        ? "bg-primary-light text-primary border-primary-border"
                        : "bg-secondary text-muted-foreground border-border"
                    }`}
                  >
                    {course.status.toUpperCase()}
                  </span>
                </div>

                <h3 className="text-xs sm:text-sm font-bold text-foreground truncate">
                  {course.title}
                </h3>

                <div className="flex items-center gap-3 text-xs text-muted-foreground flex-wrap">
                  <span className="flex items-center gap-1">
                    <Users className="w-3.5 h-3.5 text-muted-foreground" />
                    <strong>{course.enrolledStudentsCount}</strong> students
                  </span>

                  {course.averageRating > 0 && (
                    <span className="flex items-center gap-1 text-foreground font-semibold">
                      <Star className="w-3.5 h-3.5 text-amber-500 fill-amber-500" />
                      <span>{course.averageRating}</span>
                      <span className="text-muted-foreground font-normal">
                        ({course.reviewsCount})
                      </span>
                    </span>
                  )}

                  <span className="font-semibold text-foreground">
                    ETB {course.price.toLocaleString()}
                  </span>
                </div>
              </div>
            </div>

            {/* Right: Actions */}
            <div className="flex items-center gap-2 shrink-0 self-end sm:self-center">
              <Link
                href={`/instructor/courses/${course.id}/curriculum`}
                className="px-3 py-1.5 rounded-lg border border-border bg-card hover:bg-secondary text-xs font-semibold text-foreground transition-colors"
              >
                Curriculum
              </Link>
              <Link
                href={`/instructor/courses/${course.id}/settings`}
                className="p-1.5 rounded-lg border border-border bg-card hover:bg-secondary text-muted-foreground hover:text-foreground transition-colors"
                title="Course settings"
              >
                <Settings className="w-4 h-4" />
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
