import * as React from "react";

export default function CoursesLoading() {
  return (
    <div className="space-y-6 animate-pulse">
      {/* Header Skeleton */}
      <div className="space-y-2">
        <div className="h-8 w-64 bg-secondary rounded-lg" />
        <div className="h-4 w-96 bg-secondary/70 rounded-md" />
      </div>

      {/* Tabs & Search Skeleton */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
        <div className="h-10 w-72 bg-secondary rounded-xl" />
        <div className="h-10 w-64 bg-secondary rounded-xl" />
      </div>

      {/* Course Cards Skeleton List */}
      <div className="space-y-4 pt-2">
        {[1, 2, 3, 4].map((i) => (
          <div
            key={i}
            className="h-32 w-full bg-card border border-border rounded-2xl p-5 flex items-center gap-5"
          >
            <div className="w-24 h-24 bg-secondary rounded-xl shrink-0" />
            <div className="space-y-3 flex-1">
              <div className="h-4 w-28 bg-secondary rounded" />
              <div className="h-6 w-3/4 bg-secondary rounded" />
              <div className="h-3 w-48 bg-secondary/70 rounded" />
            </div>
            <div className="w-32 h-10 bg-secondary rounded-xl shrink-0 hidden md:block" />
          </div>
        ))}
      </div>
    </div>
  );
}
