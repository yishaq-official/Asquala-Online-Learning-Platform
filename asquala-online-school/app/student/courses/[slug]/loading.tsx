import * as React from "react";

export default function CourseHubLoading() {
  return (
    <div className="space-y-8 animate-pulse">
      {/* Header Skeleton */}
      <div className="h-44 w-full bg-card border border-border rounded-2xl p-6 sm:p-7 space-y-4">
        <div className="h-4 w-40 bg-secondary rounded" />
        <div className="h-8 w-3/4 bg-secondary rounded-lg" />
        <div className="h-4 w-96 bg-secondary/70 rounded" />
      </div>

      {/* Tabs Skeleton */}
      <div className="h-10 w-80 bg-secondary rounded-xl" />

      {/* 2-Column Content Skeleton */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-4">
          {[1, 2, 3].map((i) => (
            <div key={i} className="h-28 bg-card border border-border rounded-xl" />
          ))}
        </div>

        <div className="lg:col-span-1 space-y-5">
          <div className="h-48 bg-card border border-border rounded-2xl" />
          <div className="h-36 bg-card border border-border rounded-2xl" />
        </div>
      </div>
    </div>
  );
}
