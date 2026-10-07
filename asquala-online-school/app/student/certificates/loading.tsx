import * as React from "react";

export default function CertificatesLoading() {
  return (
    <div className="space-y-8 animate-pulse">
      {/* Header Skeleton */}
      <div className="space-y-2">
        <div className="h-8 w-64 bg-secondary rounded-lg" />
        <div className="h-4 w-96 bg-secondary/70 rounded-md" />
      </div>

      {/* Grid of Certificates Skeleton */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {[1, 2].map((i) => (
          <div
            key={i}
            className="h-64 bg-card border border-border rounded-2xl p-6 space-y-4"
          >
            <div className="h-6 w-32 bg-secondary rounded" />
            <div className="h-8 w-3/4 bg-secondary rounded-lg" />
            <div className="h-4 w-1/2 bg-secondary/70 rounded" />
            <div className="h-10 w-full bg-secondary/60 rounded-xl mt-6" />
          </div>
        ))}
      </div>

      {/* Upcoming Credentials Skeleton */}
      <div className="h-48 w-full bg-card border border-border rounded-2xl p-6" />
    </div>
  );
}
