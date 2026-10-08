"use client";

import React from "react";
import {
  CheckSquare,
  Clock,
  Award,
  Layers,
  Play,
  Plus,
  Eye,
} from "lucide-react";
import { Button } from "@/components/ui/button";

interface QuizConfigCardProps {
  title: string;
  moduleTitle: string;
  durationMinutes: number;
  passingScorePercentage: number;
  totalQuestions: number;
  onChange: (fields: Partial<{
    title: string;
    moduleTitle: string;
    durationMinutes: number;
    passingScorePercentage: number;
  }>) => void;
  onPreview: () => void;
  onAddQuestion: () => void;
}

export function QuizConfigCard({
  title,
  moduleTitle,
  durationMinutes,
  passingScorePercentage,
  totalQuestions,
  onChange,
  onPreview,
  onAddQuestion,
}: QuizConfigCardProps) {
  return (
    <div className="bg-card border border-border rounded-2xl p-5 sm:p-6 shadow-xs space-y-6">
      {/* Top Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-border/80">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-amber-500/10 text-amber-700 border border-amber-200 flex items-center justify-center font-bold shrink-0">
            <CheckSquare className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-base sm:text-lg font-bold text-foreground">
              Assessment Configuration
            </h2>
            <div className="flex items-center gap-2 mt-0.5 text-xs text-muted-foreground">
              <span>{totalQuestions} questions</span>
              <span>•</span>
              <span className="flex items-center gap-1">
                <Clock className="w-3 h-3" />
                <span>{durationMinutes} mins</span>
              </span>
              <span>•</span>
              <span className="text-primary font-semibold">
                {passingScorePercentage}% Passing Score
              </span>
            </div>
          </div>
        </div>

        {/* Action buttons */}
        <div className="flex items-center gap-2 shrink-0">
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={onPreview}
            disabled={totalQuestions === 0}
            className="gap-1.5 text-xs text-muted-foreground hover:text-foreground"
            title="Simulate quiz run as a student"
          >
            <Play className="w-3.5 h-3.5 text-primary fill-primary" />
            <span>Test Run Quiz</span>
          </Button>

          <Button
            type="button"
            variant="primary"
            size="sm"
            onClick={onAddQuestion}
            className="gap-1.5 text-xs shadow-xs"
          >
            <Plus className="w-4 h-4" />
            <span>Add Question</span>
          </Button>
        </div>
      </div>

      {/* Form Fields Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {/* Title */}
        <div>
          <label className="block text-xs font-semibold text-foreground mb-1.5">
            Assessment Title <span className="text-rose-500">*</span>
          </label>
          <input
            type="text"
            value={title}
            onChange={(e) => onChange({ title: e.target.value })}
            placeholder="e.g. Module 3 Assessment: Authentication & Authorization"
            className="w-full px-3.5 py-2.5 rounded-xl border border-border focus:border-primary text-sm bg-card text-foreground focus:outline-hidden ring-2 ring-primary/20"
          />
        </div>

        {/* Associated Module */}
        <div>
          <label className="block text-xs font-semibold text-foreground mb-1.5">
            Associated Curriculum Module
          </label>
          <div className="relative">
            <input
              type="text"
              value={moduleTitle}
              onChange={(e) => onChange({ moduleTitle: e.target.value })}
              placeholder="e.g. Module 3: Authentication & Role-Based Authorization"
              className="w-full px-3.5 py-2.5 rounded-xl border border-border focus:border-primary text-sm bg-card text-foreground focus:outline-hidden ring-2 ring-primary/20 pl-9"
            />
            <Layers className="w-4 h-4 text-muted-foreground absolute left-3 top-3" />
          </div>
        </div>

        {/* Time Limit */}
        <div>
          <label className="block text-xs font-semibold text-foreground mb-1.5">
            Time Limit (Minutes)
          </label>
          <div className="relative">
            <input
              type="number"
              min={1}
              max={120}
              value={durationMinutes}
              onChange={(e) => onChange({ durationMinutes: Number(e.target.value) })}
              className="w-full px-3.5 py-2.5 rounded-xl border border-border focus:border-primary text-sm bg-card text-foreground focus:outline-hidden ring-2 ring-primary/20 pl-9"
            />
            <Clock className="w-4 h-4 text-muted-foreground absolute left-3 top-3" />
          </div>
          <p className="text-[11px] text-muted-foreground mt-1">
            Timer runs continuously once student begins the milestone assessment.
          </p>
        </div>

        {/* Passing Score Threshold */}
        <div>
          <div className="flex items-center justify-between mb-1.5">
            <label className="text-xs font-semibold text-foreground">
              Passing Score Required
            </label>
            <span className="text-xs font-bold text-primary">
              {passingScorePercentage}%
            </span>
          </div>

          <div className="flex items-center gap-3">
            <input
              type="range"
              min={50}
              max={100}
              step={5}
              value={passingScorePercentage}
              onChange={(e) =>
                onChange({ passingScorePercentage: Number(e.target.value) })
              }
              className="flex-1 accent-primary h-2 bg-secondary rounded-lg cursor-pointer"
            />
            <span className="text-xs font-mono font-bold bg-secondary px-2 py-1 rounded-md text-foreground">
              {passingScorePercentage}%
            </span>
          </div>
          <p className="text-[11px] text-muted-foreground mt-1">
            Students who achieve this score unlock their certificate module credit.
          </p>
        </div>
      </div>
    </div>
  );
}
