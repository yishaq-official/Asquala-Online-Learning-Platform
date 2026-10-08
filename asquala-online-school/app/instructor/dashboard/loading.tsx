import React from "react";

export default function InstructorDashboardLoading() {
  return (
    <div className="space-y-6 animate-pulse">
      {/* Header skeleton */}
      <div className="space-y-2">
        <div className="h-4 w-32 bg-secondary rounded-md" />
        <div className="h-8 w-64 bg-secondary rounded-md" />
        <div className="h-4 w-96 bg-secondary/80 rounded-md" />
      </div>

      {/* KPI Cards skeleton */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="h-32 bg-card border border-border rounded-2xl" />
        <div className="h-32 bg-card border border-border rounded-2xl" />
        <div className="h-32 bg-card border border-border rounded-2xl" />
        <div className="h-32 bg-card border border-border rounded-2xl" />
      </div>

      {/* Main Grid skeleton */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <div className="h-80 bg-card border border-border rounded-2xl" />
          <div className="h-64 bg-card border border-border rounded-2xl" />
        </div>
        <div className="space-y-6">
          <div className="h-72 bg-card border border-border rounded-2xl" />
          <div className="h-48 bg-card border border-border rounded-2xl" />
        </div>
      </div>
    </div>
  );
}
