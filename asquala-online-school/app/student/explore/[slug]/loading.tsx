import * as React from "react";

export default function CoursePreviewLoading() {
  return (
    <div className="space-y-8 animate-pulse">
      {/* Breadcrumb Skeleton */}
      <div className="h-4 w-48 bg-secondary rounded" />

      {/* Hero Skeleton */}
      <div className="space-y-3">
        <div className="h-6 w-32 bg-secondary rounded-full" />
        <div className="h-10 w-3/4 bg-secondary rounded-xl" />
        <div className="h-5 w-full max-w-2xl bg-secondary/70 rounded" />
        <div className="h-4 w-80 bg-secondary/60 rounded" />
      </div>

      {/* 2-Column Content Skeleton */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 pt-4">
        <div className="lg:col-span-2 space-y-6">
          <div className="h-48 w-full bg-secondary/80 rounded-2xl" />
          <div className="h-80 w-full bg-secondary/70 rounded-2xl" />
          <div className="h-44 w-full bg-secondary/60 rounded-2xl" />
        </div>

        <div className="lg:col-span-1">
          <div className="h-96 w-full bg-secondary/80 rounded-2xl" />
        </div>
      </div>
    </div>
  );
}
