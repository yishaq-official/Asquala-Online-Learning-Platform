"use client";

import React, { useState } from "react";
import {
  X,
  Play,
  RotateCcw,
  CheckCircle2,
  XCircle,
  Clock,
  Award,
  ChevronRight,
  ChevronLeft,
  Code,
} from "lucide-react";
import { QuizDetail } from "@/types/student";
import { Button } from "@/components/ui/button";

interface QuizPreviewModalProps {
  isOpen: boolean;
  quiz: QuizDetail;
  onClose: () => void;
}

export function QuizPreviewModal({
  isOpen,
  quiz,
  onClose,
}: QuizPreviewModalProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<Record<string, string>>({});
  const [isSubmitted, setIsSubmitted] = useState(false);

  if (!isOpen) return null;

  const questions = quiz.questions || [];
  const currentQuestion = questions[currentIndex];

  const handleSelectOption = (optionId: string) => {
    if (isSubmitted || !currentQuestion) return;
    setSelectedAnswers((prev) => ({
      ...prev,
      [currentQuestion.id]: optionId,
    }));
  };

  const handleReset = () => {
    setSelectedAnswers({});
    setIsSubmitted(false);
    setCurrentIndex(0);
  };

  // Score calculation
  const correctCount = questions.reduce((acc, q) => {
    return selectedAnswers[q.id] === q.correctOptionId ? acc + 1 : acc;
  }, 0);

  const scorePercentage =
    questions.length > 0 ? Math.round((correctCount / questions.length) * 100) : 0;
  const isPassed = scorePercentage >= quiz.passingScorePercentage;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-150">
      <div className="bg-card border border-border rounded-2xl w-full max-w-3xl shadow-2xl overflow-hidden animate-in zoom-in-95 duration-150 max-h-[92vh] flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-4 sm:p-5 border-b border-border bg-secondary/30 shrink-0">
          <div className="flex items-center gap-2.5 min-w-0 pr-3">
            <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-primary text-primary-foreground uppercase tracking-wider">
              Student Simulation
            </span>
            <h2 className="text-sm sm:text-base font-extrabold text-foreground truncate">
              {quiz.title}
            </h2>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <button
              type="button"
              onClick={handleReset}
              className="p-1.5 rounded-lg text-muted-foreground hover:text-foreground hover:bg-secondary transition-colors"
              title="Reset Test Run"
            >
              <RotateCcw className="w-4 h-4" />
            </button>
            <button
              type="button"
              onClick={onClose}
              className="p-1.5 rounded-lg text-muted-foreground hover:text-foreground hover:bg-secondary transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Modal Body */}
        <div className="p-5 sm:p-6 overflow-y-auto flex-1 space-y-5">
          {!isSubmitted ? (
            <>
              {/* Progress and Question Counter */}
              <div className="flex items-center justify-between text-xs font-semibold text-muted-foreground pb-2 border-b border-border/80">
                <span>
                  Question {currentIndex + 1} of {questions.length}
                </span>
                <span className="flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5 text-muted-foreground" />
                  <span>{quiz.durationMinutes} mins allocated</span>
                </span>
              </div>

              {/* Progress dots */}
              <div className="flex items-center gap-1.5 overflow-x-auto pb-1">
                {questions.map((q, idx) => {
                  const isCurrent = idx === currentIndex;
                  const isAnswered = Boolean(selectedAnswers[q.id]);

                  return (
                    <button
                      key={q.id}
                      type="button"
                      onClick={() => setCurrentIndex(idx)}
                      className={`w-7 h-7 rounded-lg text-xs font-mono font-bold transition-all flex items-center justify-center shrink-0 ${
                        isCurrent
                          ? "bg-primary text-primary-foreground ring-2 ring-primary/30"
                          : isAnswered
                          ? "bg-emerald-100 text-emerald-800"
                          : "bg-secondary text-muted-foreground hover:bg-secondary/80"
                      }`}
                    >
                      {idx + 1}
                    </button>
                  );
                })}
              </div>

              {/* Question Card */}
              {currentQuestion && (
                <div className="space-y-4 pt-2">
                  <h3 className="text-base sm:text-lg font-bold text-foreground leading-snug">
                    {currentQuestion.questionText}
                  </h3>

                  {/* Code snippet if present */}
                  {currentQuestion.codeSnippet && (
                    <div className="p-3.5 rounded-xl bg-slate-950 text-slate-100 font-mono text-xs overflow-x-auto border border-slate-800 leading-relaxed">
                      <pre>{currentQuestion.codeSnippet}</pre>
                    </div>
                  )}

                  {/* Options */}
                  <div className="space-y-2.5 pt-2">
                    {currentQuestion.options.map((option, optIdx) => {
                      const isSelected = selectedAnswers[currentQuestion.id] === option.id;
                      const letter = ["A", "B", "C", "D"][optIdx] || String(optIdx + 1);

                      return (
                        <button
                          key={option.id}
                          type="button"
                          onClick={() => handleSelectOption(option.id)}
                          className={`w-full p-3.5 rounded-xl border text-left transition-all flex items-center gap-3 ${
                            isSelected
                              ? "border-primary bg-primary-light/50 ring-1 ring-primary shadow-2xs"
                              : "border-border bg-card hover:bg-secondary/40"
                          }`}
                        >
                          <span
                            className={`w-6 h-6 rounded-md text-xs font-mono font-bold flex items-center justify-center shrink-0 ${
                              isSelected
                                ? "bg-primary text-primary-foreground"
                                : "bg-secondary text-muted-foreground"
                            }`}
                          >
                            {letter}
                          </span>
                          <span className="text-xs sm:text-sm font-medium text-foreground">
                            {option.text}
                          </span>
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}
            </>
          ) : (
            /* Results Screen */
            <div className="py-6 px-4 text-center space-y-6">
              <div
                className={`w-16 h-16 rounded-2xl mx-auto flex items-center justify-center ${
                  isPassed
                    ? "bg-emerald-100 text-emerald-700"
                    : "bg-rose-100 text-rose-700"
                }`}
              >
                {isPassed ? (
                  <CheckCircle2 className="w-10 h-10" />
                ) : (
                  <XCircle className="w-10 h-10" />
                )}
              </div>

              <div>
                <h3 className="text-xl sm:text-2xl font-extrabold text-foreground">
                  {isPassed ? "Assessment Passed!" : "Assessment Not Passed"}
                </h3>
                <p className="text-xs sm:text-sm text-muted-foreground mt-1">
                  Required: {quiz.passingScorePercentage}% • Your Simulation Score:{" "}
                  <strong className="text-foreground font-bold">{scorePercentage}%</strong>
                </p>
              </div>

              {/* Score Metric Cards */}
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 max-w-md mx-auto">
                <div className="p-3 rounded-xl bg-secondary/40 border border-border">
                  <span className="text-xs text-muted-foreground block">Correct</span>
                  <span className="text-lg font-bold text-emerald-700">
                    {correctCount} / {questions.length}
                  </span>
                </div>
                <div className="p-3 rounded-xl bg-secondary/40 border border-border">
                  <span className="text-xs text-muted-foreground block">Percentage</span>
                  <span className="text-lg font-bold text-foreground">
                    {scorePercentage}%
                  </span>
                </div>
                <div className="p-3 rounded-xl bg-secondary/40 border border-border col-span-2 sm:col-span-1">
                  <span className="text-xs text-muted-foreground block">Result</span>
                  <span
                    className={`text-lg font-bold ${
                      isPassed ? "text-emerald-700" : "text-rose-700"
                    }`}
                  >
                    {isPassed ? "PASSED" : "FAILED"}
                  </span>
                </div>
              </div>

              <div className="pt-2">
                <Button
                  type="button"
                  variant="primary"
                  size="md"
                  onClick={handleReset}
                  className="gap-2 text-xs shadow-xs"
                >
                  <RotateCcw className="w-4 h-4" />
                  <span>Retake Student Simulation</span>
                </Button>
              </div>
            </div>
          )}
        </div>

        {/* Modal Footer */}
        {!isSubmitted && (
          <div className="p-4 border-t border-border bg-secondary/30 flex items-center justify-between gap-3 shrink-0">
            <Button
              type="button"
              variant="outline"
              size="sm"
              disabled={currentIndex === 0}
              onClick={() => setCurrentIndex((prev) => Math.max(0, prev - 1))}
              className="gap-1 text-xs"
            >
              <ChevronLeft className="w-4 h-4" />
              <span>Previous</span>
            </Button>

            {currentIndex < questions.length - 1 ? (
              <Button
                type="button"
                variant="primary"
                size="sm"
                onClick={() =>
                  setCurrentIndex((prev) => Math.min(questions.length - 1, prev + 1))
                }
                className="gap-1 text-xs shadow-xs"
              >
                <span>Next</span>
                <ChevronRight className="w-4 h-4" />
              </Button>
            ) : (
              <Button
                type="button"
                variant="primary"
                size="sm"
                onClick={() => setIsSubmitted(true)}
                className="gap-1.5 text-xs shadow-xs"
              >
                <Award className="w-4 h-4" />
                <span>Submit &amp; View Score</span>
              </Button>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
