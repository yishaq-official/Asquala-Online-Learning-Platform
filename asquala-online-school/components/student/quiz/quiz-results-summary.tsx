"use client";

import * as React from "react";
import Link from "next/link";
import { Award, AlertCircle, RotateCcw, ArrowRight, BookOpen, CheckCircle2 } from "lucide-react";
import { QuizResult } from "@/types/student";

interface QuizResultsSummaryProps {
  result: QuizResult;
  passingScorePercentage: number;
  courseSlug: string;
  onRetake: () => void;
}

export function QuizResultsSummary({
  result,
  passingScorePercentage,
  courseSlug,
  onRetake,
}: QuizResultsSummaryProps) {
  const isPassed = result.scorePercentage >= passingScorePercentage;

  const minutes = Math.floor(result.timeSpentSeconds / 60);
  const seconds = result.timeSpentSeconds % 60;
  const timeFormatted = `${minutes}m ${seconds}s`;

  return (
    <div className="bg-card border border-border rounded-2xl p-6 sm:p-8 shadow-xs text-center space-y-6">
      {/* Emblem Header */}
      <div
        className={`w-16 h-16 sm:w-20 sm:h-20 rounded-2xl flex items-center justify-center mx-auto border-2 shadow-xs ${
          isPassed
            ? "bg-primary-light text-primary border-primary-border"
            : "bg-amber-50 text-amber-600 border-amber-200"
        }`}
      >
        {isPassed ? <Award className="w-9 h-9" /> : <AlertCircle className="w-9 h-9" />}
      </div>

      {/* Title & Score */}
      <div className="space-y-2 max-w-md mx-auto">
        <h2 className="text-xl sm:text-2xl font-bold text-foreground">
          {isPassed ? "Assessment Passed! 🎉" : "Assessment Needs Review"}
        </h2>
        <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
          {isPassed
            ? "Great job! You demonstrated mastery of this module's key architectural concepts."
            : `You scored ${result.scorePercentage}%. A passing grade of ${passingScorePercentage}% is required to unlock subsequent modules.`}
        </p>
      </div>

      {/* Metrics Row */}
      <div className="grid grid-cols-3 gap-3 max-w-lg mx-auto pt-2">
        <div className="p-3.5 rounded-xl bg-secondary/50 border border-border">
          <span className="text-[10px] uppercase font-bold text-muted-foreground tracking-wider block">
            Final Score
          </span>
          <span
            className={`text-xl sm:text-2xl font-extrabold ${
              isPassed ? "text-primary" : "text-amber-600"
            }`}
          >
            {result.scorePercentage}%
          </span>
        </div>

        <div className="p-3.5 rounded-xl bg-secondary/50 border border-border">
          <span className="text-[10px] uppercase font-bold text-muted-foreground tracking-wider block">
            Correct Answers
          </span>
          <span className="text-xl sm:text-2xl font-extrabold text-foreground">
            {result.correctAnswersCount}/{result.totalQuestions}
          </span>
        </div>

        <div className="p-3.5 rounded-xl bg-secondary/50 border border-border">
          <span className="text-[10px] uppercase font-bold text-muted-foreground tracking-wider block">
            Time Taken
          </span>
          <span className="text-xl sm:text-2xl font-extrabold text-foreground">
            {timeFormatted}
          </span>
        </div>
      </div>

      {/* Actions */}
      <div className="flex flex-wrap items-center justify-center gap-3 pt-3">
        {isPassed ? (
          <Link
            href={`/student/courses/${courseSlug}`}
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-primary text-white text-xs sm:text-sm font-bold hover:bg-primary-hover shadow-xs transition-colors"
          >
            <span>Proceed in Course</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        ) : (
          <button
            type="button"
            onClick={onRetake}
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-primary text-white text-xs sm:text-sm font-bold hover:bg-primary-hover shadow-xs transition-colors cursor-pointer"
          >
            <RotateCcw className="w-4 h-4" />
            <span>Retake Assessment</span>
          </button>
        )}

        <Link
          href={`/student/courses/${courseSlug}`}
          className="inline-flex items-center gap-2 px-4 py-3 rounded-xl bg-secondary hover:bg-card border border-border text-foreground text-xs sm:text-sm font-semibold transition-colors"
        >
          <BookOpen className="w-4 h-4 text-muted-foreground" />
          <span>Course Hub</span>
        </Link>
      </div>
    </div>
  );
}
