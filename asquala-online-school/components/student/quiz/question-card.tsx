"use client";

import * as React from "react";
import { QuizQuestion } from "@/types/student";
import { CheckCircle2, Circle } from "lucide-react";

interface QuestionCardProps {
  question: QuizQuestion;
  questionIndex: number;
  totalQuestions: number;
  selectedOptionId?: string;
  onSelectOption: (optionId: string) => void;
}

const OPTION_LETTERS = ["A", "B", "C", "D", "E"];

export function QuestionCard({
  question,
  questionIndex,
  totalQuestions,
  selectedOptionId,
  onSelectOption,
}: QuestionCardProps) {
  return (
    <div className="bg-card border border-border rounded-2xl p-6 sm:p-8 shadow-xs space-y-6 animate-in fade-in-0 duration-200">
      {/* Question Header & Text */}
      <div className="space-y-3">
        <span className="text-xs font-bold text-primary uppercase tracking-wider">
          Question {questionIndex + 1} of {totalQuestions}
        </span>
        <h2 className="text-base sm:text-lg lg:text-xl font-bold text-foreground leading-relaxed">
          {question.questionText}
        </h2>
      </div>

      {/* Code Snippet (if applicable) */}
      {question.codeSnippet && (
        <div className="bg-slate-950 text-slate-100 p-4 sm:p-5 rounded-xl font-mono text-xs overflow-x-auto border border-border/80 shadow-inner">
          <pre>{question.codeSnippet}</pre>
        </div>
      )}

      {/* Options List */}
      <div className="space-y-3 pt-2">
        {question.options.map((option, optIdx) => {
          const isSelected = selectedOptionId === option.id;
          const letter = OPTION_LETTERS[optIdx] || String(optIdx + 1);

          return (
            <button
              key={option.id}
              type="button"
              onClick={() => onSelectOption(option.id)}
              className={`w-full p-4 sm:p-4.5 rounded-xl text-left flex items-start gap-3.5 transition-all cursor-pointer ${
                isSelected
                  ? "border-2 border-primary bg-primary-light/40 text-foreground font-semibold shadow-xs"
                  : "border border-border bg-card hover:bg-secondary/60 text-foreground/90 hover:border-primary-border/60"
              }`}
            >
              {/* Option Letter Pill */}
              <div
                className={`w-7 h-7 rounded-lg flex items-center justify-center text-xs font-bold shrink-0 transition-colors ${
                  isSelected
                    ? "bg-primary text-white"
                    : "bg-secondary text-muted-foreground border border-border"
                }`}
              >
                {letter}
              </div>

              {/* Option Text */}
              <div className="flex-1 text-xs sm:text-sm leading-relaxed pt-0.5">
                {option.text}
              </div>

              {/* Radio Indicator */}
              <div className="shrink-0 pt-0.5">
                {isSelected ? (
                  <CheckCircle2 className="w-5 h-5 text-primary" />
                ) : (
                  <Circle className="w-5 h-5 text-muted-foreground/40" />
                )}
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}
