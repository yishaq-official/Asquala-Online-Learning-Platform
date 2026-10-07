"use client";

import * as React from "react";
import { ChevronLeft, ChevronRight, CheckCircle2 } from "lucide-react";

interface QuizControlBarProps {
  currentIndex: number;
  totalQuestions: number;
  isLastQuestion: boolean;
  canSubmit: boolean;
  onPrev: () => void;
  onNext: () => void;
  onSubmit: () => void;
}

export function QuizControlBar({
  currentIndex,
  totalQuestions,
  isLastQuestion,
  canSubmit,
  onPrev,
  onNext,
  onSubmit,
}: QuizControlBarProps) {
  return (
    <div className="bg-card border border-border rounded-2xl p-4 sm:p-5 shadow-2xs flex items-center justify-between gap-4">
      {/* Previous Button */}
      <button
        type="button"
        onClick={onPrev}
        disabled={currentIndex === 0}
        className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl border border-border bg-card hover:bg-secondary text-xs sm:text-sm font-semibold text-foreground transition-colors cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed"
      >
        <ChevronLeft className="w-4 h-4" />
        <span>Previous</span>
      </button>

      {/* Center Counter */}
      <span className="text-xs text-muted-foreground font-semibold hidden sm:inline">
        {currentIndex + 1} of {totalQuestions}
      </span>

      {/* Next or Submit Button */}
      {isLastQuestion ? (
        <button
          type="button"
          onClick={onSubmit}
          className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-primary text-white hover:bg-primary-hover text-xs sm:text-sm font-bold transition-all shadow-xs hover:shadow cursor-pointer"
        >
          <CheckCircle2 className="w-4 h-4" />
          <span>Submit Assessment</span>
        </button>
      ) : (
        <button
          type="button"
          onClick={onNext}
          className="inline-flex items-center gap-1.5 px-5 py-2.5 rounded-xl bg-primary text-white hover:bg-primary-hover text-xs sm:text-sm font-bold transition-colors shadow-2xs cursor-pointer"
        >
          <span>Next Question</span>
          <ChevronRight className="w-4 h-4" />
        </button>
      )}
    </div>
  );
}
