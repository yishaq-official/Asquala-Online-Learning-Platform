"use client";

import * as React from "react";
import Link from "next/link";
import { Star, Users, Globe, Calendar, ChevronRight } from "lucide-react";
import { CourseDetail } from "@/types/student";

interface CoursePreviewHeroProps {
  course: CourseDetail;
}

export function CoursePreviewHero({ course }: CoursePreviewHeroProps) {
  const levelStyles = {
    Beginner: "bg-primary-light text-primary border-primary-border/70",
    Intermediate: "bg-secondary text-secondary-foreground border-border",
    Advanced: "bg-amber-50 text-amber-700 border-amber-200",
  }[course.level];

  return (
    <div className="space-y-4">
      {/* Breadcrumb Navigation */}
      <nav className="flex items-center gap-1.5 text-xs text-muted-foreground flex-wrap">
        <Link
          href="/student/explore"
          className="hover:text-foreground transition-colors font-medium"
        >
          Explore Courses
        </Link>
        <ChevronRight className="w-3.5 h-3.5" />
        <Link
          href={`/student/explore?category=${encodeURIComponent(course.category)}`}
          className="hover:text-foreground transition-colors font-medium"
        >
          {course.category}
        </Link>
        <ChevronRight className="w-3.5 h-3.5" />
        <span className="text-foreground font-semibold truncate max-w-xs">{course.title}</span>
      </nav>

      {/* Course Title & Summary */}
      <div className="space-y-3">
        <div className="flex items-center gap-2 flex-wrap">
          <span className="px-3 py-1 rounded-full text-xs font-bold bg-secondary text-secondary-foreground border border-border">
            {course.category}
          </span>
          <span className={`px-3 py-1 rounded-full text-xs font-bold border ${levelStyles}`}>
            {course.level} Level
          </span>
        </div>

        <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-foreground leading-tight">
          {course.title}
        </h1>

        <p className="text-sm sm:text-base text-muted-foreground leading-relaxed max-w-3xl">
          {course.description}
        </p>
      </div>

      {/* Meta Information Bar */}
      <div className="flex items-center gap-4 sm:gap-6 flex-wrap text-xs sm:text-sm text-muted-foreground pt-2 border-t border-border/60">
        <div className="flex items-center gap-1.5 text-amber-500 font-bold">
          <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
          <span>{course.rating.toFixed(1)}</span>
          <span className="text-muted-foreground font-normal">
            ({course.reviewCount.toLocaleString()} reviews)
          </span>
        </div>

        <div className="flex items-center gap-1.5">
          <Users className="w-4 h-4 text-muted-foreground" />
          <span>3,840+ Students Enrolled</span>
        </div>

        <div className="flex items-center gap-1.5">
          <Calendar className="w-4 h-4 text-muted-foreground" />
          <span>Updated {course.lastUpdated}</span>
        </div>

        <div className="flex items-center gap-1.5">
          <Globe className="w-4 h-4 text-muted-foreground" />
          <span>{course.language}</span>
        </div>
      </div>
    </div>
  );
}
