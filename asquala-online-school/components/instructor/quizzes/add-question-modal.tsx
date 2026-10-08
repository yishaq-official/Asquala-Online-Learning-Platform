"use client";

import React, { useState } from "react";
import { X, Plus, Code, CheckCircle2, HelpCircle, Check } from "lucide-react";
import { QuizQuestion } from "@/types/student";
import { CodeSnippetInput } from "@/components/instructor/quizzes/code-snippet-input";
import { Button } from "@/components/ui/button";

interface AddQuestionModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddQuestion: (question: Omit<QuizQuestion, "id">) => void;
  nextQuestionIndex: number;
}

const OPTION_LETTERS = ["A", "B", "C", "D"];

export function AddQuestionModal({
  isOpen,
  onClose,
  onAddQuestion,
  nextQuestionIndex,
}: AddQuestionModalProps) {
  const [prompt, setPrompt] = useState("");
  const [includeCode, setIncludeCode] = useState(false);
  const [codeSnippet, setCodeSnippet] = useState(
    `// Type-safe implementation\nfunction checkSecurity() {\n  return true;\n}`
  );
  const [options, setOptions] = useState([
    { id: "opt-1", text: "" },
    { id: "opt-2", text: "" },
    { id: "opt-3", text: "" },
    { id: "opt-4", text: "" },
  ]);
  const [correctOptionId, setCorrectOptionId] = useState("opt-1");
  const [explanation, setExplanation] = useState("");
  const [error, setError] = useState("");

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!prompt.trim()) {
      setError("Question prompt cannot be empty.");
      return;
    }

    const hasEmptyOptions = options.some((opt) => !opt.text.trim());
    if (hasEmptyOptions) {
      setError("Please fill in text for all 4 options (A, B, C, D).");
      return;
    }

    onAddQuestion({
      questionText: prompt.trim(),
      codeSnippet: includeCode && codeSnippet.trim() ? codeSnippet.trim() : undefined,
      options: options.map((opt) => ({ ...opt, text: opt.text.trim() })),
      correctOptionId,
      explanation:
        explanation.trim() ||
        "The selected answer correctly applies the architectural principles covered in this module.",
    });

    // Reset form
    setPrompt("");
    setIncludeCode(false);
    setOptions([
      { id: "opt-1", text: "" },
      { id: "opt-2", text: "" },
      { id: "opt-3", text: "" },
      { id: "opt-4", text: "" },
    ]);
    setCorrectOptionId("opt-1");
    setExplanation("");
    setError("");
    onClose();
  };

  const handleOptionChange = (id: string, text: string) => {
    setOptions(options.map((opt) => (opt.id === id ? { ...opt, text } : opt)));
    if (error) setError("");
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs animate-in fade-in duration-150">
      <div className="bg-card border border-border rounded-2xl w-full max-w-2xl shadow-xl overflow-hidden animate-in zoom-in-95 duration-150 max-h-[92vh] flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-5 border-b border-border bg-secondary/30 shrink-0">
          <div className="flex items-center gap-2.5">
            <span className="w-8 h-8 rounded-xl bg-primary text-primary-foreground font-mono font-bold text-xs flex items-center justify-center shadow-2xs">
              Q{nextQuestionIndex}
            </span>
            <div>
              <h2 className="text-base font-bold text-foreground">
                Add Assessment Question
              </h2>
              <p className="text-xs text-muted-foreground">
                Create a multiple-choice checkpoint question with rationale
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="p-1.5 rounded-lg text-muted-foreground hover:text-foreground hover:bg-secondary transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Scrollable Form Body */}
        <form onSubmit={handleSubmit} className="p-5 space-y-4 overflow-y-auto flex-1">
          {error && (
            <div className="p-3 rounded-xl bg-rose-50 text-rose-700 border border-rose-200 text-xs font-semibold">
              {error}
            </div>
          )}

          {/* Prompt */}
          <div>
            <label className="block text-xs font-semibold text-foreground mb-1.5">
              Question Prompt <span className="text-rose-500">*</span>
            </label>
            <textarea
              rows={2}
              value={prompt}
              onChange={(e) => {
                setPrompt(e.target.value);
                if (error) setError("");
              }}
              placeholder="e.g. Which PostgreSQL index type is optimal for text search queries?"
              className="w-full p-3 rounded-xl border border-border focus:border-primary text-sm bg-card text-foreground focus:outline-hidden ring-2 ring-primary/20 leading-relaxed resize-y"
              autoFocus
            />
          </div>

          {/* Optional Code Snippet Toggle */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <button
                type="button"
                onClick={() => setIncludeCode(!includeCode)}
                className="inline-flex items-center gap-1.5 text-xs font-semibold text-primary hover:underline"
              >
                <Code className="w-3.5 h-3.5" />
                <span>
                  {includeCode ? "Remove Code Block" : "+ Include Code Block"}
                </span>
              </button>
            </div>

            {includeCode && (
              <CodeSnippetInput
                code={codeSnippet}
                onChange={setCodeSnippet}
              />
            )}
          </div>

          {/* 4 Options */}
          <div className="space-y-2.5">
            <div className="flex items-center justify-between">
              <label className="block text-xs font-semibold text-foreground">
                Multiple-Choice Options (Select Correct Answer){" "}
                <span className="text-rose-500">*</span>
              </label>
            </div>

            {options.map((opt, idx) => {
              const isCorrect = opt.id === correctOptionId;
              const letter = OPTION_LETTERS[idx];

              return (
                <div
                  key={opt.id}
                  className={`flex items-center gap-3 p-3 rounded-xl border transition-all ${
                    isCorrect
                      ? "border-emerald-500 bg-emerald-50/40 ring-1 ring-emerald-500/30"
                      : "border-border bg-card"
                  }`}
                >
                  <button
                    type="button"
                    onClick={() => setCorrectOptionId(opt.id)}
                    className={`w-5 h-5 rounded-full border flex items-center justify-center shrink-0 transition-all ${
                      isCorrect
                        ? "border-emerald-600 bg-emerald-600 text-white"
                        : "border-muted-foreground/40 hover:border-foreground"
                    }`}
                  >
                    {isCorrect && <Check className="w-3 h-3 stroke-[3]" />}
                  </button>

                  <span
                    className={`w-6 h-6 rounded-md text-xs font-mono font-bold flex items-center justify-center shrink-0 ${
                      isCorrect
                        ? "bg-emerald-600 text-white"
                        : "bg-secondary text-foreground"
                    }`}
                  >
                    {letter}
                  </span>

                  <input
                    type="text"
                    value={opt.text}
                    onChange={(e) => handleOptionChange(opt.id, e.target.value)}
                    placeholder={`Option ${letter} description...`}
                    className={`flex-1 px-3 py-1.5 rounded-lg border text-xs sm:text-sm bg-card text-foreground focus:outline-hidden ${
                      isCorrect
                        ? "border-emerald-300 font-semibold"
                        : "border-border focus:border-primary"
                    }`}
                  />

                  {isCorrect && (
                    <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded-full shrink-0">
                      Correct
                    </span>
                  )}
                </div>
              );
            })}
          </div>

          {/* Explanation */}
          <div>
            <label className="block text-xs font-semibold text-foreground mb-1.5 flex items-center gap-1.5">
              <HelpCircle className="w-3.5 h-3.5 text-primary" />
              <span>Explanation / Solution Rationale</span>
            </label>
            <textarea
              rows={2}
              value={explanation}
              onChange={(e) => setExplanation(e.target.value)}
              placeholder="Explain why this option is correct to help students learn when reviewing quiz results..."
              className="w-full p-3 rounded-xl border border-border focus:border-primary text-xs bg-card text-foreground focus:outline-hidden ring-2 ring-primary/20 leading-relaxed resize-y"
            />
          </div>

          {/* Modal Actions */}
          <div className="flex items-center justify-end gap-2.5 pt-4 border-t border-border/80">
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={onClose}
              className="text-xs"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              variant="primary"
              size="sm"
              className="gap-1.5 text-xs shadow-xs"
            >
              <Plus className="w-4 h-4" />
              <span>Add Question</span>
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
