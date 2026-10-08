import React from "react";

export default function ApplicationStatusLoading() {
  return (
    <div className="max-w-5xl mx-auto space-y-6 animate-pulse py-8 px-4 sm:px-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="space-y-2">
          <div className="h-4 w-40 bg-secondary rounded-md" />
          <div className="h-8 w-64 bg-secondary rounded-md" />
          <div className="h-4 w-96 bg-secondary/80 rounded-md" />
        </div>
        <div className="h-10 w-36 bg-secondary rounded-xl" />
      </div>

      <div className="h-32 bg-card border border-border rounded-2xl" />
      <div className="h-24 bg-card border border-border rounded-2xl" />
      <div className="h-96 bg-card border border-border rounded-2xl" />
    </div>
  );
}
