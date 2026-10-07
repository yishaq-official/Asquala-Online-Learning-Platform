"use client";

import * as React from "react";
import { CheckCircle2, XCircle, Info, ChevronDown } from "lucide-react";
import { QuizQuestion } from "@/types/student";

interface QuizQuestionReviewProps {
  questions: QuizQuestion[];
  userAnswers: Record<string, string>; // questionId -> selectedOptionId
}

export function QuizQuestionReview({
  questions,
  userAnswers,
}: QuizQuestionReviewProps) {
  const [openIds, setOpenIds] = React.useState<string[]>(
    questions.map((q) => q.id)
  );

  const toggleOpen = (id: string) => {
    setOpenIds((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
    );
  };

  return (
    <div className="space-y-4">
      <div className="pb-1">
        <h3 className="font-bold text-base sm:text-lg text-foreground">
          Detailed Question-by-Question Review
        </h3>
        <p className="text-xs text-muted-foreground mt-0.5">
          Review your answers and read comprehensive conceptual explanations.
        </p>
      </div>

      <div className="space-y-4">
        {questions.map((question, idx) => {
          const selectedOptionId = userAnswers[question.id];
          const isCorrect = selectedOptionId === question.correctOptionId;
          const isOpen = openIds.includes(question.id);

          return (
            <div
              key={question.id}
              className={`border rounded-2xl bg-card overflow-hidden shadow-2xs transition-all ${
                isCorrect ? "border-border hover:border-primary-border" : "border-rose-200"
              }`}
            >
              {/* Question Header Accordion Trigger */}
              <button
                type="button"
                onClick={() => toggleOpen(question.id)}
                className="w-full p-4 sm:p-5 flex items-center justify-between gap-4 text-left hover:bg-secondary/30 cursor-pointer transition-colors"
              >
                <div className="flex items-start gap-3 min-w-0">
                  <div className="pt-0.5 shrink-0">
                    {isCorrect ? (
                      <CheckCircle2 className="w-5 h-5 text-primary" />
                    ) : (
                      <XCircle className="w-5 h-5 text-rose-500" />
                    )}
                  </div>

                  <div className="space-y-0.5 min-w-0">
                    <span className="text-[11px] font-bold uppercase tracking-wider text-muted-foreground">
                      Question {idx + 1} • {isCorrect ? "Correct (+20 pts)" : "Incorrect (0 pts)"}
                    </span>
                    <h4 className="font-bold text-sm sm:text-base text-foreground line-clamp-2">
                      {question.questionText}
                    </h4>
                  </div>
                </div>

                <ChevronDown
                  className={`w-5 h-5 text-muted-foreground shrink-0 transition-transform ${
                    isOpen ? "rotate-180" : ""
                  }`}
                />
              </button>

              {/* Review Body */}
              {isOpen && (
                <div className="p-4 sm:p-6 border-t border-border/70 space-y-4 bg-muted/10">
                  {/* Code snippet if present */}
                  {question.codeSnippet && (
                    <div className="bg-slate-950 text-slate-100 p-3.5 rounded-xl font-mono text-xs overflow-x-auto border border-border">
                      <pre>{question.codeSnippet}</pre>
                    </div>
                  )}

                  {/* Options List */}
                  <div className="space-y-2">
                    {question.options.map((opt) => {
                      const wasSelected = selectedOptionId === opt.id;
                      const isTargetCorrect = opt.id === question.correctOptionId;

                      let rowClass = "border-border bg-card/70 text-foreground/80";

                      if (isTargetCorrect) {
                        rowClass = "border-primary bg-primary-light/40 text-primary font-semibold";
                      } else if (wasSelected && !isCorrect) {
                        rowClass = "border-rose-300 bg-rose-50 text-rose-800 font-semibold";
                      }

                      return (
                        <div
                          key={opt.id}
                          className={`p-3 rounded-xl border text-xs sm:text-sm flex items-center justify-between gap-3 ${rowClass}`}
                        >
                          <span>{opt.text}</span>

                          <div className="flex items-center gap-2 shrink-0">
                            {wasSelected && (
                              <span className="text-[10px] uppercase font-bold px-2 py-0.5 rounded-full bg-secondary text-secondary-foreground border border-border">
                                Your Choice
                              </span>
                            )}
                            {isTargetCorrect && (
                              <span className="text-[10px] uppercase font-bold px-2 py-0.5 rounded-full bg-primary text-white">
                                Correct Answer
                              </span>
                            )}
                          </div>
                        </div>
                      );
                    })}
                  </div>

                  {/* Conceptual Explanation Box */}
                  <div className="p-4 rounded-xl bg-primary-light/20 border border-primary-border/60 flex items-start gap-3 text-xs sm:text-sm">
                    <Info className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                    <div className="space-y-1">
                      <span className="font-bold text-primary block">Conceptual Explanation</span>
                      <p className="text-foreground/90 leading-relaxed font-normal">
                        {question.explanation}
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
