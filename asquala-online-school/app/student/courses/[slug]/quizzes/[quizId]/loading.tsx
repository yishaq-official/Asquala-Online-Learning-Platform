import * as React from "react";

export default function QuizLoading() {
  return (
    <div className="space-y-6 animate-pulse max-w-4xl mx-auto">
      {/* Header Skeleton */}
      <div className="h-36 w-full bg-card border border-border rounded-2xl p-6 space-y-4">
        <div className="flex justify-between items-center">
          <div className="h-6 w-36 bg-secondary rounded" />
          <div className="h-6 w-24 bg-secondary rounded-full" />
        </div>
        <div className="h-6 w-72 bg-secondary rounded" />
        <div className="flex gap-2">
          {[1, 2, 3, 4, 5].map((i) => (
            <div key={i} className="h-8 w-8 bg-secondary rounded-xl" />
          ))}
        </div>
      </div>

      {/* Question Card Skeleton */}
      <div className="h-80 w-full bg-card border border-border rounded-2xl p-8 space-y-4">
        <div className="h-4 w-28 bg-secondary rounded" />
        <div className="h-6 w-full bg-secondary rounded" />
        <div className="h-6 w-3/4 bg-secondary rounded" />
        <div className="space-y-2 pt-4">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="h-14 w-full bg-secondary/70 rounded-xl" />
          ))}
        </div>
      </div>

      {/* Control Bar Skeleton */}
      <div className="h-16 w-full bg-card border border-border rounded-2xl" />
    </div>
  );
}
