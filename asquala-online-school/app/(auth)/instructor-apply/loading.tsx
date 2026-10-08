import React from "react";

export default function InstructorApplyLoading() {
  return (
    <div className="max-w-4xl mx-auto space-y-6 animate-pulse py-6">
      <div className="text-center space-y-2 mb-8">
        <div className="h-4 w-40 bg-secondary rounded-md mx-auto" />
        <div className="h-8 w-80 bg-secondary rounded-md mx-auto" />
        <div className="h-4 w-96 bg-secondary/80 rounded-md mx-auto" />
      </div>

      <div className="h-20 bg-card border border-border rounded-2xl" />

      <div className="bg-card border border-border rounded-2xl p-7 space-y-6">
        <div className="h-6 w-56 bg-secondary rounded-md" />
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          <div className="h-10 bg-secondary rounded-lg" />
          <div className="h-10 bg-secondary rounded-lg" />
        </div>
        <div className="h-24 bg-secondary rounded-lg" />
      </div>
    </div>
  );
}
