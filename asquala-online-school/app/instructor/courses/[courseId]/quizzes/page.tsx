"use client";

import React, { useState, useEffect, useCallback } from "react";
import { useParams } from "next/navigation";
import { getInstructorCourseQuizzes } from "@/lib/mock-instructor-data";
import { QuizDetail, QuizQuestion } from "@/types/student";
import { QuizConfigCard } from "@/components/instructor/quizzes/quiz-config-card";
import { QuestionEditorItem } from "@/components/instructor/quizzes/question-editor-item";
import { AddQuestionModal } from "@/components/instructor/quizzes/add-question-modal";
import { QuizPreviewModal } from "@/components/instructor/quizzes/quiz-preview-modal";
import {
  CheckSquare,
  Plus,
  Save,
  CheckCircle2,
  RefreshCw,
  Sparkles,
  HelpCircle,
} from "lucide-react";
import { Button } from "@/components/ui/button";

export default function CourseQuizzesPage() {
  const params = useParams();
  const courseId = typeof params?.courseId === "string" ? params.courseId : "";

  const [quizzes, setQuizzes] = useState<QuizDetail[]>([]);
  const [activeQuizId, setActiveQuizId] = useState<string>("");
  const [isAddQuestionOpen, setIsAddQuestionOpen] = useState(false);
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = useCallback((msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 3500);
  }, []);

  useEffect(() => {
    if (courseId) {
      const initialQuizzes = getInstructorCourseQuizzes(courseId);
      setQuizzes(initialQuizzes);
      if (initialQuizzes.length > 0) {
        setActiveQuizId(initialQuizzes[0].id);
      }
    }
  }, [courseId]);

  const activeQuiz = quizzes.find((q) => q.id === activeQuizId) || quizzes[0];

  const handleUpdateActiveQuiz = (fields: Partial<QuizDetail>) => {
    if (!activeQuiz) return;
    setQuizzes((prev) =>
      prev.map((q) => (q.id === activeQuiz.id ? { ...q, ...fields } : q))
    );
  };

  const handleCreateNewQuiz = () => {
    const newId = `quiz-${Date.now()}`;
    const newQuiz: QuizDetail = {
      id: newId,
      title: `Module ${quizzes.length + 1} Assessment Checkpoint`,
      courseTitle: activeQuiz?.courseTitle || "Course Assessment",
      courseSlug: activeQuiz?.courseSlug || courseId,
      moduleTitle: `Module ${quizzes.length + 1}`,
      durationMinutes: 15,
      passingScorePercentage: 80,
      questions: [],
    };

    setQuizzes((prev) => [...prev, newQuiz]);
    setActiveQuizId(newId);
    showToast("New quiz assessment created.");
  };

  const handleAddQuestion = (questionData: Omit<QuizQuestion, "id">) => {
    if (!activeQuiz) return;
    const newQuestion: QuizQuestion = {
      ...questionData,
      id: `q-${Date.now()}`,
    };

    setQuizzes((prev) =>
      prev.map((q) =>
        q.id === activeQuiz.id
          ? { ...q, questions: [...q.questions, newQuestion] }
          : q
      )
    );
    showToast("Question added to assessment.");
  };

  const handleUpdateQuestion = (updated: QuizQuestion) => {
    if (!activeQuiz) return;
    setQuizzes((prev) =>
      prev.map((q) =>
        q.id === activeQuiz.id
          ? {
              ...q,
              questions: q.questions.map((question) =>
                question.id === updated.id ? updated : question
              ),
            }
          : q
      )
    );
  };

  const handleDeleteQuestion = (questionId: string) => {
    if (!activeQuiz) return;
    setQuizzes((prev) =>
      prev.map((q) =>
        q.id === activeQuiz.id
          ? {
              ...q,
              questions: q.questions.filter((question) => question.id !== questionId),
            }
          : q
      )
    );
    showToast("Question deleted.");
  };

  const handleDuplicateQuestion = (index: number) => {
    if (!activeQuiz) return;
    const original = activeQuiz.questions[index];
    const duplicated: QuizQuestion = {
      ...original,
      id: `q-${Date.now()}`,
      questionText: `${original.questionText} (Copy)`,
    };

    const nextQuestions = [...activeQuiz.questions];
    nextQuestions.splice(index + 1, 0, duplicated);

    setQuizzes((prev) =>
      prev.map((q) =>
        q.id === activeQuiz.id ? { ...q, questions: nextQuestions } : q
      )
    );
    showToast("Question duplicated.");
  };

  const handleMoveQuestion = (index: number, direction: "up" | "down") => {
    if (!activeQuiz) return;
    const targetIndex = direction === "up" ? index - 1 : index + 1;
    if (targetIndex < 0 || targetIndex >= activeQuiz.questions.length) return;

    const nextQuestions = [...activeQuiz.questions];
    const temp = nextQuestions[index];
    nextQuestions[index] = nextQuestions[targetIndex];
    nextQuestions[targetIndex] = temp;

    setQuizzes((prev) =>
      prev.map((q) =>
        q.id === activeQuiz.id ? { ...q, questions: nextQuestions } : q
      )
    );
    showToast("Question reordered.");
  };

  const handleSaveAssessment = () => {
    setIsSaving(true);
    setTimeout(() => {
      setIsSaving(false);
      showToast("Quiz assessment configuration and questions saved successfully!");
    }, 600);
  };

  if (!activeQuiz) {
    return (
      <div className="space-y-6 animate-pulse">
        <div className="h-44 bg-secondary/50 rounded-2xl border border-border" />
        <div className="h-64 bg-secondary/50 rounded-2xl border border-border" />
      </div>
    );
  }

  return (
    <div className="space-y-8 max-w-4xl mx-auto">
      {/* Toast Alert */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 flex items-center gap-2 px-4 py-3 rounded-xl bg-slate-900 text-white shadow-xl text-xs font-semibold animate-in slide-in-from-bottom-2 duration-200">
          <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-primary-light text-primary border border-primary-border mb-1.5">
            <CheckSquare className="w-3.5 h-3.5" />
            <span>EXAMINATION ENGINE</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-foreground">
            Quizzes &amp; Assessments Builder
          </h1>
          <p className="text-xs sm:text-sm text-muted-foreground mt-1">
            Construct milestone comprehension challenges, multiple-choice questions, and code snippets.
          </p>
        </div>

        {/* Global Save Button */}
        <Button
          type="button"
          variant="primary"
          size="md"
          disabled={isSaving}
          onClick={handleSaveAssessment}
          className="gap-2 text-xs shadow-xs shrink-0 self-start sm:self-auto"
        >
          {isSaving ? (
            <>
              <RefreshCw className="w-4 h-4 animate-spin" />
              <span>Saving...</span>
            </>
          ) : (
            <>
              <Save className="w-4 h-4" />
              <span>Save Assessments</span>
            </>
          )}
        </Button>
      </div>

      {/* Quiz Switcher Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
        {quizzes.map((quiz) => (
          <button
            key={quiz.id}
            type="button"
            onClick={() => setActiveQuizId(quiz.id)}
            className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all whitespace-nowrap flex items-center gap-2 ${
              quiz.id === activeQuiz.id
                ? "bg-primary text-primary-foreground shadow-2xs"
                : "bg-card border border-border text-muted-foreground hover:text-foreground hover:bg-secondary/40"
            }`}
          >
            <span>{quiz.title}</span>
            <span
              className={`px-1.5 py-0.2 rounded-md text-[10px] ${
                quiz.id === activeQuiz.id
                  ? "bg-white/20 text-white"
                  : "bg-secondary text-muted-foreground"
              }`}
            >
              {quiz.questions.length}
            </span>
          </button>
        ))}

        <button
          type="button"
          onClick={handleCreateNewQuiz}
          className="px-3.5 py-2 rounded-xl text-xs font-semibold border border-dashed border-primary/40 hover:border-primary text-primary bg-primary-light/30 hover:bg-primary-light transition-all flex items-center gap-1.5 whitespace-nowrap"
        >
          <Plus className="w-3.5 h-3.5" />
          <span>New Quiz</span>
        </button>
      </div>

      {/* Quiz Config Card */}
      <QuizConfigCard
        title={activeQuiz.title}
        moduleTitle={activeQuiz.moduleTitle}
        durationMinutes={activeQuiz.durationMinutes}
        passingScorePercentage={activeQuiz.passingScorePercentage}
        totalQuestions={activeQuiz.questions.length}
        onChange={handleUpdateActiveQuiz}
        onPreview={() => setIsPreviewOpen(true)}
        onAddQuestion={() => setIsAddQuestionOpen(true)}
      />

      {/* Questions Stack */}
      <div className="space-y-4">
        <div className="flex items-center justify-between pb-1">
          <h2 className="text-base font-bold text-foreground">
            Assessment Questions ({activeQuiz.questions.length})
          </h2>
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={() => setIsAddQuestionOpen(true)}
            className="gap-1.5 text-xs"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Add Question</span>
          </Button>
        </div>

        {activeQuiz.questions.length > 0 ? (
          <div className="space-y-4">
            {activeQuiz.questions.map((question, idx) => (
              <QuestionEditorItem
                key={question.id}
                question={question}
                index={idx}
                isFirst={idx === 0}
                isLast={idx === activeQuiz.questions.length - 1}
                onMoveUp={() => handleMoveQuestion(idx, "up")}
                onMoveDown={() => handleMoveQuestion(idx, "down")}
                onDuplicate={() => handleDuplicateQuestion(idx)}
                onDelete={() => handleDeleteQuestion(question.id)}
                onUpdate={handleUpdateQuestion}
              />
            ))}
          </div>
        ) : (
          /* Empty Questions State */
          <div className="text-center py-12 px-4 rounded-2xl border border-dashed border-border bg-card shadow-xs">
            <CheckSquare className="w-10 h-10 text-muted-foreground/60 mx-auto mb-3" />
            <h3 className="text-sm sm:text-base font-bold text-foreground">
              No Questions in this Assessment Yet
            </h3>
            <p className="text-xs text-muted-foreground mt-1 max-w-sm mx-auto">
              Add multiple-choice coding challenges, code snippets, and explanations to test your students.
            </p>
            <div className="mt-4">
              <Button
                type="button"
                variant="primary"
                size="sm"
                onClick={() => setIsAddQuestionOpen(true)}
                className="gap-1.5 text-xs shadow-xs"
              >
                <Plus className="w-4 h-4" />
                <span>Add First Question</span>
              </Button>
            </div>
          </div>
        )}
      </div>

      {/* Add Question Modal */}
      <AddQuestionModal
        isOpen={isAddQuestionOpen}
        onClose={() => setIsAddQuestionOpen(false)}
        onAddQuestion={handleAddQuestion}
        nextQuestionIndex={activeQuiz.questions.length + 1}
      />

      {/* Quiz Preview Modal (Student Simulator) */}
      <QuizPreviewModal
        isOpen={isPreviewOpen}
        quiz={activeQuiz}
        onClose={() => setIsPreviewOpen(false)}
      />
    </div>
  );
}
