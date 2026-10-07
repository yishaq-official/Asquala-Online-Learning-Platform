"use client";

import * as React from "react";
import { Check } from "lucide-react";

interface QuizProgressDotsProps {
  totalQuestions: number;
  currentIndex: number;
  answeredIndices: number[];
  onSelectIndex: (index: number) => void;
}

export function QuizProgressDots({
  totalQuestions,
  currentIndex,
  answeredIndices,
  onSelectIndex,
}: QuizProgressDotsProps) {
  return (
    <div className="flex items-center gap-1.5 sm:gap-2 overflow-x-auto py-1 scrollbar-none">
      {Array.from({ length: totalQuestions }, (_, idx) => {
        const isCurrent = idx === currentIndex;
        const isAnswered = answeredIndices.includes(idx);

        let buttonClasses = "bg-secondary text-muted-foreground border-border hover:bg-border/60";

        if (isCurrent) {
          buttonClasses = "bg-primary text-white font-bold ring-2 ring-primary ring-offset-2 ring-offset-card shadow-xs";
        } else if (isAnswered) {
          buttonClasses = "bg-primary-light text-primary border-primary-border font-bold";
        }

        return (
          <button
            key={idx}
            type="button"
            onClick={() => onSelectIndex(idx)}
            className={`w-8 h-8 sm:w-9 sm:h-9 rounded-xl text-xs font-semibold flex items-center justify-center transition-all cursor-pointer shrink-0 border ${buttonClasses}`}
            title={`Go to Question ${idx + 1}${isAnswered ? " (Answered)" : ""}`}
            aria-label={`Question ${idx + 1}`}
          >
            {isAnswered && !isCurrent ? (
              <Check className="w-3.5 h-3.5 stroke-[2.5]" />
            ) : (
              <span>{idx + 1}</span>
            )}
          </button>
        );
      })}
    </div>
  );
}
