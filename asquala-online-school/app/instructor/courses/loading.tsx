import React from "react";

export default function InstructorCoursesLoading() {
  return (
    <div className="space-y-6 animate-pulse">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="space-y-2">
          <div className="h-4 w-32 bg-secondary rounded-md" />
          <div className="h-8 w-64 bg-secondary rounded-md" />
          <div className="h-4 w-96 bg-secondary/80 rounded-md" />
        </div>
        <div className="h-10 w-36 bg-secondary rounded-xl" />
      </div>

      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="h-10 w-80 bg-card border border-border rounded-xl" />
        <div className="h-10 w-64 bg-card border border-border rounded-xl" />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="h-96 bg-card border border-border rounded-2xl" />
        <div className="h-96 bg-card border border-border rounded-2xl" />
        <div className="h-96 bg-card border border-border rounded-2xl" />
      </div>
    </div>
  );
}
