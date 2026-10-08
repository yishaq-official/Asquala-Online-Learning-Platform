import React from "react";

export default function InstructorStudioLoading() {
  return (
    <div className="max-w-7xl mx-auto space-y-6 animate-pulse p-4 sm:p-6 lg:p-8">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="space-y-2">
          <div className="h-4 w-32 bg-secondary rounded-md" />
          <div className="h-8 w-64 bg-secondary rounded-md" />
          <div className="h-4 w-96 bg-secondary/80 rounded-md" />
        </div>
        <div className="h-10 w-36 bg-secondary rounded-xl" />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="h-28 bg-card border border-border rounded-2xl" />
        <div className="h-28 bg-card border border-border rounded-2xl" />
        <div className="h-28 bg-card border border-border rounded-2xl" />
        <div className="h-28 bg-card border border-border rounded-2xl" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 h-72 bg-card border border-border rounded-2xl" />
        <div className="h-72 bg-card border border-border rounded-2xl" />
      </div>
    </div>
  );
}
