import React from "react";

export default function StudentSettingsLoading() {
  return (
    <div className="max-w-5xl mx-auto space-y-6 animate-pulse">
      {/* Header Skeleton */}
      <div className="space-y-2">
        <div className="h-4 w-32 bg-secondary rounded-md" />
        <div className="h-8 w-64 bg-secondary rounded-md" />
        <div className="h-4 w-96 bg-secondary/80 rounded-md" />
      </div>

      {/* Nav Tabs Skeleton */}
      <div className="h-16 w-full bg-card border border-border rounded-xl" />

      {/* Main Card Skeleton */}
      <div className="bg-card border border-border rounded-xl p-6 space-y-6">
        <div className="flex items-center gap-4">
          <div className="w-20 h-20 rounded-full bg-secondary shrink-0" />
          <div className="space-y-2">
            <div className="h-4 w-40 bg-secondary rounded-md" />
            <div className="h-8 w-32 bg-secondary rounded-md" />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div className="space-y-2">
            <div className="h-4 w-24 bg-secondary rounded-md" />
            <div className="h-10 w-full bg-secondary rounded-md" />
          </div>
          <div className="space-y-2">
            <div className="h-4 w-24 bg-secondary rounded-md" />
            <div className="h-10 w-full bg-secondary rounded-md" />
          </div>
        </div>

        <div className="space-y-2">
          <div className="h-4 w-32 bg-secondary rounded-md" />
          <div className="h-20 w-full bg-secondary rounded-md" />
        </div>

        <div className="flex justify-end pt-4">
          <div className="h-10 w-36 bg-secondary rounded-md" />
        </div>
      </div>
    </div>
  );
}
