"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import {
  ArrowLeft,
  ListOrdered,
  CheckSquare,
  Settings,
  ExternalLink,
  Users,
  Clock,
  Sparkles,
} from "lucide-react";
import { InstructorCourseItem } from "@/types/instructor";

interface CourseBuilderHeaderProps {
  course: InstructorCourseItem;
}

export function CourseBuilderHeader({ course }: CourseBuilderHeaderProps) {
  const pathname = usePathname();

  const tabs = [
    {
      id: "curriculum",
      label: "Curriculum Builder",
      href: `/instructor/courses/${course.id}/curriculum`,
      icon: ListOrdered,
    },
    {
      id: "quizzes",
      label: "Quizzes & Assessments",
      href: `/instructor/courses/${course.id}/quizzes`,
      icon: CheckSquare,
    },
    {
      id: "settings",
      label: "Course Settings & Pricing",
      href: `/instructor/courses/${course.id}/settings`,
      icon: Settings,
    },
  ];

  const isPublished = course.status === "published";
  const isUnderReview = course.status === "under_review";

  return (
    <div className="bg-card border-b border-border -mx-4 sm:-mx-6 lg:-mx-8 px-4 sm:px-6 lg:px-8 pt-4 sm:pt-6 mb-6 sm:mb-8">
      {/* Top Breadcrumb & Return to Courses link */}
      <div className="flex items-center justify-between gap-4 mb-4">
        <Link
          href="/instructor/courses"
          className="inline-flex items-center gap-2 text-xs sm:text-sm font-medium text-muted-foreground hover:text-foreground transition-colors group"
        >
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-0.5 transition-transform" />
          <span>Back to All Courses</span>
        </Link>

        {/* Student preview CTA */}
        <Link
          href={`/student/courses/${course.slug}`}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-border bg-card hover:bg-secondary text-xs font-semibold text-muted-foreground hover:text-primary transition-colors shadow-2xs"
        >
          <span>Preview as Student</span>
          <ExternalLink className="w-3.5 h-3.5" />
        </Link>
      </div>

      {/* Course Info Banner */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 pb-6">
        <div className="relative w-24 h-16 sm:w-28 sm:h-18 rounded-xl overflow-hidden bg-secondary border border-border shrink-0 shadow-xs">
          <Image
            src={course.thumbnailUrl}
            alt={course.title}
            fill
            className="object-cover"
          />
        </div>

        <div className="flex-1 min-w-0">
          <div className="flex flex-wrap items-center gap-2 mb-1.5">
            <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-primary-light text-primary border border-primary-border uppercase">
              {course.category}
            </span>

            <span
              className={`px-2 py-0.5 rounded-full text-[10px] font-bold uppercase ${
                isPublished
                  ? "bg-emerald-50 text-emerald-700 border border-emerald-200"
                  : isUnderReview
                  ? "bg-amber-50 text-amber-700 border border-amber-200"
                  : "bg-slate-100 text-slate-700 border border-slate-200"
              }`}
            >
              {course.status.replace("_", " ")}
            </span>

            <span className="text-xs text-muted-foreground font-medium hidden sm:inline">
              • ID: {course.id}
            </span>
          </div>

          <h1 className="text-xl sm:text-2xl font-extrabold text-foreground tracking-tight truncate">
            {course.title}
          </h1>

          <div className="flex items-center gap-4 mt-1 text-xs text-muted-foreground">
            <span className="flex items-center gap-1 font-semibold text-foreground">
              {course.price > 0 ? `ETB ${course.price.toLocaleString()}` : "Free Course"}
            </span>
            <span>•</span>
            <span className="flex items-center gap-1">
              <Users className="w-3.5 h-3.5" />
              <span>{course.enrolledStudentsCount.toLocaleString()} enrolled</span>
            </span>
            <span>•</span>
            <span className="flex items-center gap-1">
              <Clock className="w-3.5 h-3.5" />
              <span>{Math.round(course.totalDurationMinutes / 60)}h total</span>
            </span>
          </div>
        </div>
      </div>

      {/* Navigation Sub-Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto border-t border-border/80 pt-2 -mb-px scrollbar-none">
        {tabs.map((tab) => {
          const isActive = pathname.startsWith(tab.href);
          const Icon = tab.icon;

          return (
            <Link
              key={tab.id}
              href={tab.href}
              className={`inline-flex items-center gap-2 px-4 py-2.5 text-xs sm:text-sm font-semibold border-b-2 transition-colors whitespace-nowrap ${
                isActive
                  ? "border-primary text-primary"
                  : "border-transparent text-muted-foreground hover:text-foreground hover:border-border"
              }`}
            >
              <Icon className="w-4 h-4" />
              <span>{tab.label}</span>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
