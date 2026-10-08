import React from "react";

export default function CourseQuizzesLoading() {
  return (
    <div className="space-y-8 max-w-4xl mx-auto animate-pulse">
      {/* Header skeleton */}
      <div className="space-y-2">
        <div className="w-32 h-5 rounded-full bg-secondary" />
        <div className="w-64 h-8 rounded-lg bg-secondary" />
        <div className="w-96 h-4 rounded-md bg-secondary" />
      </div>

      {/* Tabs skeleton */}
      <div className="flex gap-2">
        <div className="w-40 h-9 rounded-xl bg-secondary" />
        <div className="w-40 h-9 rounded-xl bg-secondary" />
      </div>

      {/* Config card skeleton */}
      <div className="bg-card border border-border rounded-2xl p-6 space-y-4">
        <div className="h-6 w-48 rounded-md bg-secondary" />
        <div className="grid grid-cols-2 gap-4 pt-2">
          <div className="h-10 rounded-xl bg-secondary/50" />
          <div className="h-10 rounded-xl bg-secondary/50" />
          <div className="h-10 rounded-xl bg-secondary/50" />
          <div className="h-10 rounded-xl bg-secondary/50" />
        </div>
      </div>

      {/* Question skeleton */}
      <div className="bg-card border border-border rounded-2xl p-6 space-y-4">
        <div className="h-5 w-32 rounded-md bg-secondary" />
        <div className="h-14 rounded-xl bg-secondary/40" />
        <div className="space-y-2 pt-2">
          <div className="h-10 rounded-xl bg-secondary/40" />
          <div className="h-10 rounded-xl bg-secondary/40" />
          <div className="h-10 rounded-xl bg-secondary/40" />
        </div>
      </div>
    </div>
  );
}
