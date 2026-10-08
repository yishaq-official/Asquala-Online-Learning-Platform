import React from "react";

export default function SettingsLoading() {
  return (
    <div className="space-y-8 max-w-4xl mx-auto animate-pulse">
      {/* Header skeleton */}
      <div className="space-y-2">
        <div className="w-32 h-5 rounded-full bg-secondary" />
        <div className="w-72 h-8 rounded-lg bg-secondary" />
        <div className="w-96 h-4 rounded-md bg-secondary" />
      </div>

      {/* Tabs skeleton */}
      <div className="flex gap-4 border-b border-border pb-2">
        <div className="w-32 h-8 rounded-lg bg-secondary" />
        <div className="w-40 h-8 rounded-lg bg-secondary" />
        <div className="w-32 h-8 rounded-lg bg-secondary" />
      </div>

      {/* Body card skeleton */}
      <div className="bg-card border border-border rounded-2xl p-6 space-y-4">
        <div className="flex items-center gap-4">
          <div className="w-20 h-20 rounded-2xl bg-secondary" />
          <div className="space-y-2">
            <div className="w-44 h-6 rounded-md bg-secondary" />
            <div className="w-60 h-4 rounded-md bg-secondary" />
          </div>
        </div>

        <div className="space-y-3 pt-4">
          <div className="h-10 rounded-xl bg-secondary/40" />
          <div className="h-10 rounded-xl bg-secondary/40" />
          <div className="h-28 rounded-xl bg-secondary/40" />
        </div>
      </div>
    </div>
  );
}
