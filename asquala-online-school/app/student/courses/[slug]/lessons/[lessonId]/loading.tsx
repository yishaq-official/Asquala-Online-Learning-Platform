import * as React from "react";

export default function LessonLoading() {
  return (
    <div className="space-y-6 animate-pulse">
      {/* Control Bar Skeleton */}
      <div className="h-16 w-full bg-card border border-border rounded-2xl" />

      {/* Main Player & Drawer Grid Skeleton */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          {/* Player Frame Skeleton */}
          <div className="aspect-video w-full bg-slate-950 rounded-2xl border border-border" />
          {/* Tabs Skeleton */}
          <div className="h-64 w-full bg-card border border-border rounded-2xl p-6" />
        </div>

        <div className="lg:col-span-1">
          {/* Drawer Skeleton */}
          <div className="h-[600px] w-full bg-card border border-border rounded-2xl" />
        </div>
      </div>
    </div>
  );
}
