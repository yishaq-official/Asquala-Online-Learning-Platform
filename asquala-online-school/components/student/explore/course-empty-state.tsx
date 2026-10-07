"use client";

import * as React from "react";
import { SearchX, RotateCcw } from "lucide-react";

interface CourseEmptyStateProps {
  onResetFilters: () => void;
}

export function CourseEmptyState({ onResetFilters }: CourseEmptyStateProps) {
  return (
    <div className="bg-card border border-border rounded-2xl p-10 text-center max-w-md mx-auto my-12 space-y-4 shadow-2xs">
      <div className="w-14 h-14 rounded-2xl bg-secondary text-muted-foreground flex items-center justify-center mx-auto border border-border">
        <SearchX className="w-7 h-7" />
      </div>

      <div className="space-y-1">
        <h3 className="font-bold text-lg text-foreground">No courses found</h3>
        <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
          We couldn&apos;t find any courses matching your current search or filter combination.
        </p>
      </div>

      <div className="pt-2">
        <button
          type="button"
          onClick={onResetFilters}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-primary text-white text-xs font-semibold hover:bg-primary-hover transition-colors shadow-2xs cursor-pointer"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          <span>Reset All Filters</span>
        </button>
      </div>
    </div>
  );
}
