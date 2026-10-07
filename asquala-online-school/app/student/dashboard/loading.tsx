import * as React from "react";

export default function DashboardLoading() {
  return (
    <div className="space-y-8 animate-pulse">
      {/* Header Skeleton */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="space-y-2">
          <div className="h-8 w-64 bg-secondary rounded-lg" />
          <div className="h-4 w-96 bg-secondary/70 rounded-md" />
        </div>
        <div className="h-8 w-44 bg-secondary rounded-full" />
      </div>

      {/* Jump Back In Hero Skeleton */}
      <div className="h-44 w-full bg-secondary/80 rounded-2xl" />

      {/* 4-Col Stats Grid Skeleton */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className="h-28 bg-secondary/80 rounded-xl" />
        ))}
      </div>

      {/* Content Grid Skeleton */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8">
        <div className="lg:col-span-2 h-96 bg-secondary/70 rounded-2xl" />
        <div className="space-y-6">
          <div className="h-64 bg-secondary/70 rounded-2xl" />
          <div className="h-44 bg-secondary/70 rounded-2xl" />
        </div>
      </div>
    </div>
  );
}
