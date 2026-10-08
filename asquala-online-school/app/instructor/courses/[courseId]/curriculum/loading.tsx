import React from "react";

export default function CurriculumLoading() {
  return (
    <div className="space-y-6 animate-pulse">
      {/* Top Bar Skeleton */}
      <div className="h-16 bg-secondary/60 rounded-2xl border border-border" />

      {/* Module 1 Skeleton */}
      <div className="bg-card border border-border rounded-2xl overflow-hidden p-5 space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-secondary" />
            <div className="w-48 h-5 rounded-md bg-secondary" />
          </div>
          <div className="w-24 h-8 rounded-lg bg-secondary" />
        </div>

        <div className="space-y-2.5 pt-2">
          <div className="h-12 bg-secondary/40 rounded-xl" />
          <div className="h-12 bg-secondary/40 rounded-xl" />
          <div className="h-12 bg-secondary/40 rounded-xl" />
        </div>
      </div>

      {/* Module 2 Skeleton */}
      <div className="bg-card border border-border rounded-2xl overflow-hidden p-5 space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-secondary" />
            <div className="w-56 h-5 rounded-md bg-secondary" />
          </div>
          <div className="w-24 h-8 rounded-lg bg-secondary" />
        </div>

        <div className="space-y-2.5 pt-2">
          <div className="h-12 bg-secondary/40 rounded-xl" />
          <div className="h-12 bg-secondary/40 rounded-xl" />
        </div>
      </div>
    </div>
  );
}
