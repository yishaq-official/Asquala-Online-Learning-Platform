"use client";

import React, { useState } from "react";
import {
  GripVertical,
  ArrowUp,
  ArrowDown,
  Copy,
  Trash2,
  Code,
  CheckCircle2,
  HelpCircle,
  Edit2,
  Check,
  X,
} from "lucide-react";
import { QuizQuestion } from "@/types/student";
import { CodeSnippetInput } from "@/components/instructor/quizzes/code-snippet-input";

interface QuestionEditorItemProps {
  question: QuizQuestion;
  index: number;
  isFirst: boolean;
  isLast: boolean;
  onMoveUp: () => void;
  onMoveDown: () => void;
  onDuplicate: () => void;
  onDelete: () => void;
  onUpdate: (updated: QuizQuestion) => void;
}

const OPTION_LETTERS = ["A", "B", "C", "D"];

export function QuestionEditorItem({
  question,
  index,
  isFirst,
  isLast,
  onMoveUp,
  onMoveDown,
  onDuplicate,
  onDelete,
  onUpdate,
}: QuestionEditorItemProps) {
  const [showCodeEditor, setShowCodeEditor] = useState(Boolean(question.codeSnippet));

  const handlePromptChange = (val: string) => {
    onUpdate({ ...question, questionText: val });
  };

  const handleOptionTextChange = (optionId: string, text: string) => {
    const updatedOptions = question.options.map((opt) =>
      opt.id === optionId ? { ...opt, text } : opt
    );
    onUpdate({ ...question, options: updatedOptions });
  };

  const handleSelectCorrectOption = (optionId: string) => {
    onUpdate({ ...question, correctOptionId: optionId });
  };

  const handleExplanationChange = (val: string) => {
    onUpdate({ ...question, explanation: val });
  };

  const handleCodeSnippetChange = (code: string) => {
    onUpdate({ ...question, codeSnippet: code });
  };

  return (
    <div className="bg-card border border-border rounded-2xl p-5 sm:p-6 shadow-xs space-y-5 transition-all">
      {/* Question Header & Controls */}
      <div className="flex items-center justify-between gap-3 pb-3 border-b border-border/80">
        <div className="flex items-center gap-2.5">
          <GripVertical className="w-4 h-4 text-muted-foreground/60 cursor-grab" />
          <span className="w-7 h-7 rounded-lg bg-primary text-primary-foreground font-mono font-bold text-xs flex items-center justify-center shadow-2xs">
            Q{index + 1}
          </span>
          <span className="text-xs font-semibold text-muted-foreground">
            Single Choice Question
          </span>
        </div>

        {/* Action controls */}
        <div className="flex items-center gap-1">
          <button
            type="button"
            onClick={onMoveUp}
            disabled={isFirst}
            className="p-1.5 rounded-lg text-muted-foreground hover:text-foreground hover:bg-secondary disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
            title="Move question up"
          >
            <ArrowUp className="w-3.5 h-3.5" />
          </button>
          <button
            type="button"
            onClick={onMoveDown}
            disabled={isLast}
            className="p-1.5 rounded-lg text-muted-foreground hover:text-foreground hover:bg-secondary disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
            title="Move question down"
          >
            <ArrowDown className="w-3.5 h-3.5" />
          </button>
          <button
            type="button"
            onClick={onDuplicate}
            className="p-1.5 rounded-lg text-muted-foreground hover:text-foreground hover:bg-secondary transition-colors"
            title="Duplicate question"
          >
            <Copy className="w-3.5 h-3.5" />
          </button>
          <button
            type="button"
            onClick={onDelete}
            className="p-1.5 rounded-lg text-muted-foreground hover:text-rose-600 hover:bg-rose-50 transition-colors"
            title="Delete question"
          >
            <Trash2 className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Question Prompt */}
      <div>
        <label className="block text-xs font-semibold text-foreground mb-1.5">
          Question Prompt <span className="text-rose-500">*</span>
        </label>
        <textarea
          rows={2}
          value={question.questionText}
          onChange={(e) => handlePromptChange(e.target.value)}
          placeholder="State the technical question or architectural challenge..."
          className="w-full p-3 rounded-xl border border-border focus:border-primary text-sm bg-card text-foreground focus:outline-hidden ring-2 ring-primary/20 leading-relaxed resize-y"
        />
      </div>

      {/* Code Snippet Block (Optional) */}
      <div>
        <div className="flex items-center justify-between mb-2">
          <button
            type="button"
            onClick={() => {
              if (showCodeEditor && question.codeSnippet) {
                if (confirm("Remove code snippet from this question?")) {
                  onUpdate({ ...question, codeSnippet: undefined });
                  setShowCodeEditor(false);
                }
              } else {
                setShowCodeEditor(!showCodeEditor);
                if (!question.codeSnippet) {
                  onUpdate({ ...question, codeSnippet: `// Example code\n` });
                }
              }
            }}
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-primary hover:underline"
          >
            <Code className="w-3.5 h-3.5" />
            <span>
              {showCodeEditor ? "Remove Code Snippet" : "+ Add Code Snippet"}
            </span>
          </button>
        </div>

        {showCodeEditor && (
          <CodeSnippetInput
            code={question.codeSnippet || ""}
            onChange={handleCodeSnippetChange}
          />
        )}
      </div>

      {/* 4 Multiple-Choice Options */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <label className="block text-xs font-semibold text-foreground">
            Options &amp; Correct Answer
          </label>
          <span className="text-[11px] text-muted-foreground">
            Select the radio button next to the correct answer
          </span>
        </div>

        <div className="space-y-2.5">
          {question.options.map((option, optIdx) => {
            const isCorrect = option.id === question.correctOptionId;
            const letter = OPTION_LETTERS[optIdx] || String(optIdx + 1);

            return (
              <div
                key={option.id}
                className={`flex items-center gap-3 p-3 rounded-xl border transition-all ${
                  isCorrect
                    ? "border-emerald-500 bg-emerald-50/40 ring-1 ring-emerald-500/30"
                    : "border-border bg-card hover:bg-secondary/30"
                }`}
              >
                {/* Radio Selector */}
                <button
                  type="button"
                  onClick={() => handleSelectCorrectOption(option.id)}
                  className={`w-5 h-5 rounded-full border flex items-center justify-center shrink-0 transition-all ${
                    isCorrect
                      ? "border-emerald-600 bg-emerald-600 text-white"
                      : "border-muted-foreground/40 hover:border-foreground"
                  }`}
                  title={isCorrect ? "Correct answer" : "Mark as correct answer"}
                >
                  {isCorrect && <Check className="w-3 h-3 stroke-[3]" />}
                </button>

                {/* Option Letter Badge */}
                <span
                  className={`w-6 h-6 rounded-md text-xs font-mono font-bold flex items-center justify-center shrink-0 ${
                    isCorrect
                      ? "bg-emerald-600 text-white"
                      : "bg-secondary text-foreground"
                  }`}
                >
                  {letter}
                </span>

                {/* Option Text Input */}
                <input
                  type="text"
                  value={option.text}
                  onChange={(e) =>
                    handleOptionTextChange(option.id, e.target.value)
                  }
                  placeholder={`Option ${letter} text...`}
                  className={`flex-1 px-3 py-1.5 rounded-lg border text-xs sm:text-sm bg-card text-foreground focus:outline-hidden ${
                    isCorrect
                      ? "border-emerald-300 font-semibold"
                      : "border-border focus:border-primary"
                  }`}
                />

                {/* Correct Badge */}
                {isCorrect && (
                  <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded-full shrink-0">
                    Correct
                  </span>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Pedagogical Explanation Editor */}
      <div className="pt-2 border-t border-border/80">
        <label className="block text-xs font-semibold text-foreground mb-1.5 flex items-center gap-1.5">
          <HelpCircle className="w-3.5 h-3.5 text-primary" />
          <span>Explanation &amp; Solution Rationale</span>
        </label>
        <textarea
          rows={2}
          value={question.explanation}
          onChange={(e) => handleExplanationChange(e.target.value)}
          placeholder="Explain to students why the correct answer is technically right and why common misconceptions are wrong..."
          className="w-full p-3 rounded-xl border border-border focus:border-primary text-xs bg-card text-foreground focus:outline-hidden ring-2 ring-primary/20 leading-relaxed resize-y"
        />
      </div>
    </div>
  );
}
