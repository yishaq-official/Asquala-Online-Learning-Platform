"use client";

import * as React from "react";
import Link from "next/link";
import { ArrowLeft, Clock, HelpCircle, AlertTriangle } from "lucide-react";
import { QuizProgressDots } from "./quiz-progress-dots";

interface QuizHeaderProps {
  title: string;
  moduleTitle: string;
  courseSlug: string;
  currentIndex: number;
  totalQuestions: number;
  answeredIndices: number[];
  onSelectIndex: (index: number) => void;
  secondsRemaining: number;
}

export function QuizHeader({
  title,
  moduleTitle,
  courseSlug,
  currentIndex,
  totalQuestions,
  answeredIndices,
  onSelectIndex,
  secondsRemaining,
}: QuizHeaderProps) {
  const minutes = Math.floor(secondsRemaining / 60);
  const seconds = secondsRemaining % 60;
  const formattedTime = `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;
  const isUrgent = secondsRemaining < 180; // less than 3 minutes

  return (
    <div className="bg-card border border-border rounded-2xl p-5 sm:p-6 shadow-2xs space-y-4">
      {/* Top Bar: Back Link, Module Title & Timer */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-2 border-b border-border/80">
        <div className="flex items-center gap-2">
          <Link
            href={`/student/courses/${courseSlug}`}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold text-muted-foreground hover:text-foreground hover:bg-secondary border border-border transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Exit Assessment</span>
          </Link>
          <span className="text-xs text-muted-foreground truncate hidden md:inline">
            {moduleTitle}
          </span>
        </div>

        {/* Timer */}
        <div
          className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-mono font-bold self-start sm:self-auto border ${
            isUrgent
              ? "bg-rose-50 text-rose-700 border-rose-200 animate-pulse"
              : "bg-secondary text-foreground border-border"
          }`}
          title="Time remaining"
        >
          {isUrgent ? (
            <AlertTriangle className="w-3.5 h-3.5 text-rose-600" />
          ) : (
            <Clock className="w-3.5 h-3.5 text-primary" />
          )}
          <span>Time: {formattedTime}</span>
        </div>
      </div>

      {/* Title & Question Counter */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
        <div className="space-y-0.5">
          <h1 className="text-lg sm:text-xl font-bold text-foreground tracking-tight">
            {title}
          </h1>
          <p className="text-xs text-muted-foreground">
            Question <strong className="text-foreground">{currentIndex + 1}</strong> of{" "}
            <strong>{totalQuestions}</strong>
          </p>
        </div>

        {/* Answered Counter Pill */}
        <div className="text-xs font-semibold text-muted-foreground px-3 py-1 bg-secondary rounded-lg border border-border w-fit">
          Answered: <strong className="text-primary">{answeredIndices.length}</strong> / {totalQuestions}
        </div>
      </div>

      {/* Question Jump Dots */}
      <div className="pt-1">
        <QuizProgressDots
          totalQuestions={totalQuestions}
          currentIndex={currentIndex}
          answeredIndices={answeredIndices}
          onSelectIndex={onSelectIndex}
        />
      </div>
    </div>
  );
}
