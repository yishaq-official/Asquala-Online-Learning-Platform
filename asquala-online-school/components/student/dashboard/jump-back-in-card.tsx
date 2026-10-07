"use client";

import * as React from "react";
import Link from "next/link";
import { PlayCircle, Clock, Sparkles, ArrowRight } from "lucide-react";
import { JumpBackInItem } from "@/types/student";

interface JumpBackInCardProps {
  item: JumpBackInItem;
}

export function JumpBackInCard({ item }: JumpBackInCardProps) {
  return (
    <div className="relative overflow-hidden rounded-2xl bg-card border border-primary-border/60 shadow-sm hover:shadow-md transition-all">
      {/* Decorative emerald gradient glow */}
      <div className="absolute top-0 right-0 -mr-16 -mt-16 w-64 h-64 rounded-full bg-primary-light/40 blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-1/3 -mb-20 w-48 h-48 rounded-full bg-accent/30 blur-2xl pointer-events-none" />

      <div className="relative p-6 sm:p-7 flex flex-col lg:flex-row lg:items-center justify-between gap-6">
        <div className="space-y-3 flex-1 min-w-0">
          {/* Header pill */}
          <div className="flex items-center gap-2">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-primary-light text-primary border border-primary-border/80">
              <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
              Jump Back In
            </span>
            <span className="text-xs text-muted-foreground flex items-center gap-1">
              <Clock className="w-3.5 h-3.5" />
              {item.durationMinutesRemaining} min left in lesson
            </span>
          </div>

          {/* Course & Lesson Titles */}
          <div>
            <h2 className="text-lg sm:text-xl font-bold text-foreground tracking-tight line-clamp-1">
              {item.courseTitle}
            </h2>
            <p className="text-xs sm:text-sm font-medium text-muted-foreground mt-1 line-clamp-1">
              {item.moduleTitle} • <span className="text-foreground font-semibold">{item.lessonTitle}</span>
            </p>
          </div>

          {/* Progress bar */}
          <div className="space-y-1.5 pt-1 max-w-lg">
            <div className="flex items-center justify-between text-xs">
              <span className="font-semibold text-foreground">Course Progress</span>
              <span className="font-bold text-primary">{item.progressPercentage}%</span>
            </div>
            <div className="h-2.5 w-full bg-secondary rounded-full overflow-hidden">
              <div
                className="h-full bg-primary rounded-full transition-all duration-700 ease-out"
                style={{ width: `${item.progressPercentage}%` }}
              />
            </div>
          </div>
        </div>

        {/* Action Button */}
        <div className="shrink-0 pt-2 lg:pt-0">
          <Link
            href={`/student/courses/${item.courseSlug}/lessons/${item.lessonId}`}
            className="inline-flex items-center justify-center gap-2.5 px-6 py-3.5 rounded-xl bg-primary text-white font-semibold text-sm hover:bg-primary-hover shadow-sm hover:shadow transition-all group w-full sm:w-auto"
          >
            <PlayCircle className="w-5 h-5 transition-transform group-hover:scale-110" />
            <span>Continue Lesson</span>
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>
      </div>
    </div>
  );
}
