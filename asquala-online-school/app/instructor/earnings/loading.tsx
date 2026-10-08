import React from "react";

export default function EarningsLoading() {
  return (
    <div className="space-y-8 max-w-6xl mx-auto animate-pulse">
      {/* Header skeleton */}
      <div className="space-y-2">
        <div className="w-32 h-5 rounded-full bg-secondary" />
        <div className="w-72 h-8 rounded-lg bg-secondary" />
        <div className="w-96 h-4 rounded-md bg-secondary" />
      </div>

      {/* 4 Cards Skeleton */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {[1, 2, 3, 4].map((i) => (
          <div
            key={i}
            className="bg-card border border-border rounded-2xl p-5 space-y-3"
          >
            <div className="w-24 h-4 rounded-md bg-secondary" />
            <div className="w-32 h-8 rounded-lg bg-secondary" />
            <div className="w-full h-3 rounded-md bg-secondary" />
          </div>
        ))}
      </div>

      {/* Methods skeleton */}
      <div className="bg-card border border-border rounded-2xl p-6 h-48" />

      {/* History table skeleton */}
      <div className="bg-card border border-border rounded-2xl p-6 h-64" />
    </div>
  );
}
