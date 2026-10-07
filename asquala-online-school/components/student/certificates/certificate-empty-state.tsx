"use client";

import * as React from "react";
import Link from "next/link";
import { Award, BookOpen } from "lucide-react";

export function CertificateEmptyState() {
  return (
    <div className="bg-card border border-border rounded-2xl p-10 text-center max-w-md mx-auto my-12 space-y-4 shadow-2xs">
      <div className="w-16 h-16 rounded-2xl bg-secondary text-primary flex items-center justify-center mx-auto border border-border">
        <Award className="w-8 h-8" />
      </div>

      <div className="space-y-1.5">
        <h3 className="font-bold text-lg text-foreground">No certificates earned yet</h3>
        <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
          Complete all required lessons and pass the final module assessment to unlock your official verified certificate of completion.
        </p>
      </div>

      <div className="pt-2">
        <Link
          href="/student/courses"
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-primary text-white text-xs font-bold hover:bg-primary-hover shadow-xs transition-colors"
        >
          <BookOpen className="w-4 h-4" />
          <span>Resume Your Courses</span>
        </Link>
      </div>
    </div>
  );
}
