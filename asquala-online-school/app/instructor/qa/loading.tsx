import React from "react";

export default function QaLoading() {
  return (
    <div className="space-y-6 animate-pulse">
      {/* Header skeleton */}
      <div className="space-y-2">
        <div className="w-36 h-5 rounded-full bg-secondary" />
        <div className="w-72 h-8 rounded-lg bg-secondary" />
        <div className="w-96 h-4 rounded-md bg-secondary" />
      </div>

      {/* Grid skeleton */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        <div className="lg:col-span-5 xl:col-span-4 bg-card border border-border rounded-2xl h-[700px] p-4 space-y-3">
          <div className="h-9 bg-secondary rounded-xl" />
          <div className="h-9 bg-secondary rounded-xl" />
          <div className="space-y-3 pt-3">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="h-20 bg-secondary/40 rounded-xl" />
            ))}
          </div>
        </div>

        <div className="lg:col-span-7 xl:col-span-8 space-y-6">
          <div className="bg-card border border-border rounded-2xl h-40 p-5" />
          <div className="bg-card border border-border rounded-2xl h-64 p-5" />
        </div>
      </div>
    </div>
  );
}
