"use client";

import * as React from "react";
import Link from "next/link";
import {
  ChevronLeft,
  ChevronRight,
  CheckCircle2,
  Check,
  PanelRightClose,
  PanelRightOpen,
  ArrowLeft,
} from "lucide-react";

interface LessonControlBarProps {
  courseSlug: string;
  courseTitle: string;
  prevLessonId: string | null;
  nextLessonId: string | null;
  isCompleted: boolean;
  onToggleComplete: () => void;
  isDrawerOpen: boolean;
  onToggleDrawer: () => void;
}

export function LessonControlBar({
  courseSlug,
  courseTitle,
  prevLessonId,
  nextLessonId,
  isCompleted,
  onToggleComplete,
  isDrawerOpen,
  onToggleDrawer,
}: LessonControlBarProps) {
  return (
    <div className="bg-card border border-border rounded-2xl p-4 shadow-2xs flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
      {/* Left: Back to Hub & Drawer Toggle */}
      <div className="flex items-center gap-3">
        <Link
          href={`/student/courses/${courseSlug}`}
          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold text-muted-foreground hover:text-foreground hover:bg-secondary border border-transparent hover:border-border transition-colors"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Course Hub</span>
        </Link>

        <button
          type="button"
          onClick={onToggleDrawer}
          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold text-muted-foreground hover:text-foreground hover:bg-secondary border border-border transition-colors cursor-pointer"
          title={isDrawerOpen ? "Hide syllabus drawer" : "Show syllabus drawer"}
        >
          {isDrawerOpen ? (
            <PanelRightClose className="w-4 h-4 text-primary" />
          ) : (
            <PanelRightOpen className="w-4 h-4 text-primary" />
          )}
          <span>{isDrawerOpen ? "Hide Syllabus" : "View Syllabus"}</span>
        </button>
      </div>

      {/* Right: Prev, Complete Toggle, Next */}
      <div className="flex items-center justify-end gap-2.5 sm:gap-3 flex-wrap">
        {/* Previous Lesson */}
        {prevLessonId ? (
          <Link
            href={`/student/courses/${courseSlug}/lessons/${prevLessonId}`}
            className="inline-flex items-center gap-1 px-3.5 py-2 rounded-xl border border-border bg-card hover:bg-secondary text-xs font-semibold text-foreground transition-colors"
          >
            <ChevronLeft className="w-4 h-4" />
            <span className="hidden sm:inline">Previous</span>
          </Link>
        ) : (
          <span className="inline-flex items-center gap-1 px-3.5 py-2 rounded-xl border border-border/50 bg-secondary/50 text-xs font-semibold text-muted-foreground/50 cursor-not-allowed">
            <ChevronLeft className="w-4 h-4" />
            <span className="hidden sm:inline">Previous</span>
          </span>
        )}

        {/* Mark as Complete Toggle */}
        <button
          type="button"
          onClick={onToggleComplete}
          className={`inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer shadow-2xs ${
            isCompleted
              ? "bg-primary text-white border border-primary hover:bg-primary-hover"
              : "bg-primary-light text-primary border border-primary-border hover:bg-primary hover:text-white"
          }`}
        >
          {isCompleted ? (
            <>
              <Check className="w-3.5 h-3.5" />
              <span>Completed</span>
            </>
          ) : (
            <>
              <CheckCircle2 className="w-3.5 h-3.5" />
              <span>Mark as Complete</span>
            </>
          )}
        </button>

        {/* Next Lesson */}
        {nextLessonId ? (
          <Link
            href={`/student/courses/${courseSlug}/lessons/${nextLessonId}`}
            className="inline-flex items-center gap-1 px-4 py-2 rounded-xl bg-primary text-white hover:bg-primary-hover text-xs font-bold transition-colors shadow-2xs"
          >
            <span>Next</span>
            <ChevronRight className="w-4 h-4" />
          </Link>
        ) : (
          <Link
            href={`/student/courses/${courseSlug}`}
            className="inline-flex items-center gap-1 px-4 py-2 rounded-xl bg-primary text-white hover:bg-primary-hover text-xs font-bold transition-colors shadow-2xs"
          >
            <span>Finish Course</span>
            <CheckCircle2 className="w-4 h-4" />
          </Link>
        )}
      </div>
    </div>
  );
}
