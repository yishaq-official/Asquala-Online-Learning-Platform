"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Users,
  Star,
  BookOpen,
  Clock,
  Settings,
  ListOrdered,
  CheckSquare,
  ExternalLink,
  MoreVertical,
} from "lucide-react";
import { InstructorCourseItem } from "@/types/instructor";

interface InstructorCourseCardProps {
  course: InstructorCourseItem;
}

export function InstructorCourseCard({ course }: InstructorCourseCardProps) {
  const isPublished = course.status === "published";
  const isUnderReview = course.status === "under_review";
  const isDraft = course.status === "draft";

  const totalHours = Math.round(course.totalDurationMinutes / 60);

  return (
    <div className="bg-card border border-border rounded-2xl overflow-hidden shadow-xs hover:border-primary/40 hover:shadow-sm transition-all flex flex-col justify-between group">
      <div>
        {/* Thumbnail & Floating Badges */}
        <div className="relative aspect-video w-full overflow-hidden bg-secondary">
          <Image
            src={course.thumbnailUrl}
            alt={course.title}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-300"
          />

          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

          {/* Status Badge */}
          <div className="absolute top-3 left-3">
            <span
              className={`px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider shadow-sm backdrop-blur-xs ${
                isPublished
                  ? "bg-primary text-white"
                  : isUnderReview
                  ? "bg-amber-600 text-white"
                  : "bg-slate-800/90 text-white"
              }`}
            >
              {course.status.replace("_", " ")}
            </span>
          </div>

          {/* Price Pill */}
          <div className="absolute bottom-3 left-3 text-white">
            <span className="text-sm font-extrabold drop-shadow-sm">
              {course.price > 0 ? `ETB ${course.price.toLocaleString()}` : "Free Course"}
            </span>
          </div>
        </div>

        {/* Card Body */}
        <div className="p-5 space-y-3">
          <div className="flex items-center justify-between gap-2">
            <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-primary-light text-primary border border-primary-border">
              {course.category}
            </span>
            <span className="text-[11px] text-muted-foreground">
              Updated {course.lastUpdatedAt}
            </span>
          </div>

          <h3 className="text-base font-bold text-foreground line-clamp-2 leading-snug group-hover:text-primary transition-colors">
            {course.title}
          </h3>

          {/* Metrics summary */}
          <div className="grid grid-cols-3 gap-2 pt-1 border-t border-border/80 text-center">
            <div className="p-2 rounded-xl bg-secondary/30">
              <span className="text-xs font-bold text-foreground block">
                {course.enrolledStudentsCount.toLocaleString()}
              </span>
              <span className="text-[10px] text-muted-foreground block">Students</span>
            </div>

            <div className="p-2 rounded-xl bg-secondary/30">
              <span className="text-xs font-bold text-foreground flex items-center justify-center gap-1">
                <Star className="w-3 h-3 text-amber-500 fill-amber-500" />
                <span>{course.averageRating > 0 ? course.averageRating : "-"}</span>
              </span>
              <span className="text-[10px] text-muted-foreground block">
                {course.reviewsCount > 0 ? `${course.reviewsCount} reviews` : "Rating"}
              </span>
            </div>

            <div className="p-2 rounded-xl bg-secondary/30">
              <span className="text-xs font-bold text-foreground block">
                {course.totalLessonsCount}
              </span>
              <span className="text-[10px] text-muted-foreground block">Lessons</span>
            </div>
          </div>
        </div>
      </div>

      {/* Card Actions Footer */}
      <div className="p-4 bg-secondary/20 border-t border-border/80 flex items-center justify-between gap-2">
        <div className="flex items-center gap-1.5 flex-1">
          <Link
            href={`/instructor/courses/${course.id}/curriculum`}
            className="flex-1 inline-flex items-center justify-center gap-1.5 py-2 px-3 rounded-xl bg-primary text-primary-foreground hover:bg-primary-hover font-semibold text-xs shadow-2xs transition-colors"
          >
            <ListOrdered className="w-3.5 h-3.5" />
            <span>Curriculum</span>
          </Link>

          <Link
            href={`/instructor/courses/${course.id}/quizzes`}
            className="p-2 rounded-xl border border-border bg-card hover:bg-secondary text-muted-foreground hover:text-foreground transition-colors"
            title="Manage Quizzes & Assessments"
          >
            <CheckSquare className="w-4 h-4" />
          </Link>

          <Link
            href={`/instructor/courses/${course.id}/settings`}
            className="p-2 rounded-xl border border-border bg-card hover:bg-secondary text-muted-foreground hover:text-foreground transition-colors"
            title="Course Settings & Pricing"
          >
            <Settings className="w-4 h-4" />
          </Link>
        </div>

        {/* Student preview */}
        <Link
          href={`/student/courses/${course.slug}`}
          target="_blank"
          rel="noopener noreferrer"
          className="p-2 rounded-xl border border-border bg-card hover:bg-secondary text-muted-foreground hover:text-primary transition-colors shrink-0"
          title="Preview as Student"
        >
          <ExternalLink className="w-4 h-4" />
        </Link>
      </div>
    </div>
  );
}
