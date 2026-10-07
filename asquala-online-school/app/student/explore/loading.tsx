import * as React from "react";

export default function ExploreLoading() {
  return (
    <div className="space-y-6 animate-pulse">
      {/* Header Skeleton */}
      <div className="space-y-2">
        <div className="h-8 w-60 bg-secondary rounded-lg" />
        <div className="h-4 w-96 bg-secondary/70 rounded-md" />
      </div>

      {/* Search & Categories Skeleton */}
      <div className="space-y-3">
        <div className="h-11 w-full bg-secondary/80 rounded-xl" />
        <div className="flex gap-2 overflow-hidden">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <div key={i} className="h-8 w-24 bg-secondary/80 rounded-full shrink-0" />
          ))}
        </div>
      </div>

      {/* Grid of Course Cards Skeleton */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 pt-2">
        {[1, 2, 3, 4, 5, 6].map((i) => (
          <div key={i} className="bg-card border border-border rounded-2xl overflow-hidden h-96">
            <div className="aspect-video w-full bg-secondary" />
            <div className="p-5 space-y-3">
              <div className="h-4 w-28 bg-secondary rounded" />
              <div className="h-6 w-full bg-secondary rounded" />
              <div className="h-4 w-3/4 bg-secondary/70 rounded" />
              <div className="h-8 w-full bg-secondary/60 rounded-xl mt-6" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
