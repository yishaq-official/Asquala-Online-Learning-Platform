import React from "react";

export default function CourseSettingsLoading() {
  return (
    <div className="space-y-8 max-w-4xl mx-auto animate-pulse">
      {/* Header skeleton */}
      <div className="space-y-2">
        <div className="w-32 h-5 rounded-full bg-secondary" />
        <div className="w-64 h-8 rounded-lg bg-secondary" />
        <div className="w-96 h-4 rounded-md bg-secondary" />
      </div>

      {/* Form Card 1 */}
      <div className="bg-card border border-border rounded-2xl p-6 space-y-4">
        <div className="w-48 h-6 rounded-md bg-secondary" />
        <div className="space-y-3 pt-2">
          <div className="h-10 rounded-xl bg-secondary/50" />
          <div className="h-10 rounded-xl bg-secondary/50" />
          <div className="grid grid-cols-3 gap-4">
            <div className="h-10 rounded-xl bg-secondary/50" />
            <div className="h-10 rounded-xl bg-secondary/50" />
            <div className="h-10 rounded-xl bg-secondary/50" />
          </div>
          <div className="h-28 rounded-xl bg-secondary/50" />
        </div>
      </div>

      {/* Form Card 2 */}
      <div className="bg-card border border-border rounded-2xl p-6 space-y-4">
        <div className="w-48 h-6 rounded-md bg-secondary" />
        <div className="h-32 rounded-xl bg-secondary/50" />
      </div>
    </div>
  );
}
