import * as React from "react";

export default function StudentLoading() {
  return (
    <div className="space-y-6 animate-pulse">
      {/* Top Banner Skeleton */}
      <div className="h-10 w-64 bg-secondary rounded-lg" />
      <div className="h-48 w-full bg-secondary/70 rounded-xl" />

      {/* Stats Cards Skeleton Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className="h-28 bg-secondary/80 rounded-xl" />
        ))}
      </div>

      {/* Content Section Skeleton */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 pt-2">
        <div className="lg:col-span-2 h-72 bg-secondary/60 rounded-xl" />
        <div className="h-72 bg-secondary/60 rounded-xl" />
      </div>
    </div>
  );
}
