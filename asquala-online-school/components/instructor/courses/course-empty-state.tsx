"use client";

import React from "react";
import Link from "next/link";
import { BookOpen, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";

interface CourseEmptyStateProps {
  hasFilter?: boolean;
  onClearFilter?: () => void;
}

export function CourseEmptyState({
  hasFilter = false,
  onClearFilter,
}: CourseEmptyStateProps) {
  return (
    <div className="bg-card border border-border rounded-2xl p-10 sm:p-14 text-center space-y-4 max-w-lg mx-auto shadow-xs">
      <div className="w-14 h-14 rounded-2xl bg-primary-light text-primary flex items-center justify-center mx-auto border border-primary-border shadow-2xs">
        <BookOpen className="w-7 h-7" />
      </div>

      <div className="space-y-1.5">
        <h3 className="text-base font-bold text-foreground">
          {hasFilter ? "No courses match your filter" : "No courses created yet"}
        </h3>
        <p className="text-xs text-muted-foreground leading-relaxed">
          {hasFilter
            ? "Try resetting your search query or selecting a different status filter tab to view other courses in your portfolio."
            : "Start building your curriculum on Asquala. Create lessons, attach practical assignments, and publish to thousands of Ethiopian learners."}
        </p>
      </div>

      <div className="pt-2 flex items-center justify-center gap-3">
        {hasFilter && onClearFilter ? (
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={onClearFilter}
          >
            Clear Filters
          </Button>
        ) : (
          <Link href="/instructor/courses/create">
            <Button variant="primary" size="md" className="gap-2 shadow-xs">
              <Plus className="w-4 h-4" />
              <span>Create Your First Course</span>
            </Button>
          </Link>
        )}
      </div>
    </div>
  );
}
