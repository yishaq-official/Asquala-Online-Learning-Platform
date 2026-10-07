"use client";

import * as React from "react";
import Link from "next/link";
import { BookOpen, Compass, Award } from "lucide-react";
import { LibraryTab } from "./course-library-tabs";

interface CourseLibraryEmptyStateProps {
  tab: LibraryTab;
  onResetSearch?: () => void;
  isSearching?: boolean;
}

export function CourseLibraryEmptyState({
  tab,
  onResetSearch,
  isSearching = false,
}: CourseLibraryEmptyStateProps) {
  if (isSearching) {
    return (
      <div className="bg-card border border-border rounded-2xl p-10 text-center max-w-md mx-auto my-12 space-y-3 shadow-2xs">
        <h3 className="font-bold text-base text-foreground">No matching courses</h3>
        <p className="text-xs text-muted-foreground">
          No courses in your library match the current search term.
        </p>
        {onResetSearch && (
          <button
            type="button"
            onClick={onResetSearch}
            className="text-xs font-semibold text-primary hover:underline cursor-pointer pt-2"
          >
            Clear search filter
          </button>
        )}
      </div>
    );
  }

  const content = {
    all: {
      icon: BookOpen,
      title: "Your library is empty",
      description: "You haven't enrolled in any courses yet. Browse our course catalog to get started.",
      ctaText: "Explore Courses",
      ctaHref: "/student/explore",
    },
    in_progress: {
      icon: Compass,
      title: "No courses in progress",
      description: "You don't have any active unfinished courses. Find a new topic to master today.",
      ctaText: "Browse Catalog",
      ctaHref: "/student/explore",
    },
    completed: {
      icon: Award,
      title: "No completed courses yet",
      description: "Complete 100% of the lessons in a course to earn verified certificates here.",
      ctaText: "Continue Your Studies",
      ctaHref: "/student/courses",
    },
  }[tab];

  const Icon = content.icon;

  return (
    <div className="bg-card border border-border rounded-2xl p-10 text-center max-w-md mx-auto my-12 space-y-4 shadow-2xs">
      <div className="w-14 h-14 rounded-2xl bg-secondary text-primary flex items-center justify-center mx-auto border border-border">
        <Icon className="w-7 h-7" />
      </div>

      <div className="space-y-1">
        <h3 className="font-bold text-lg text-foreground">{content.title}</h3>
        <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
          {content.description}
        </p>
      </div>

      <div className="pt-2">
        <Link
          href={content.ctaHref}
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-primary text-white text-xs font-bold hover:bg-primary-hover shadow-xs transition-colors"
        >
          <span>{content.ctaText}</span>
        </Link>
      </div>
    </div>
  );
}
