"use client";

import * as React from "react";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { getQuizById } from "@/lib/mock-student-data";
import { useCourseProgressStore } from "@/stores/course-progress-store";
import { QuizHeader } from "@/components/student/quiz/quiz-header";
import { QuestionCard } from "@/components/student/quiz/question-card";
import { QuizControlBar } from "@/components/student/quiz/quiz-control-bar";
import { QuizResultsSummary } from "@/components/student/quiz/quiz-results-summary";
import { QuizQuestionReview } from "@/components/student/quiz/quiz-question-review";
import { QuizResult } from "@/types/student";
import { AlertCircle, BookOpen } from "lucide-react";

export default function StudentQuizRunnerPage() {
  const params = useParams();
  const router = useRouter();

  const slug = typeof params?.slug === "string" ? params.slug : "";
  const quizId = typeof params?.quizId === "string" ? params.quizId : "";

  const quiz = React.useMemo(() => {
    return quizId ? getQuizById(quizId) : null;
  }, [quizId]);

  const { markLessonComplete } = useCourseProgressStore();

  // Quiz running state
  const [currentIndex, setCurrentIndex] = React.useState(0);
  const [selectedAnswers, setSelectedAnswers] = React.useState<Record<string, string>>({});
  const [isSubmitted, setIsSubmitted] = React.useState(false);
  const [secondsRemaining, setSecondsRemaining] = React.useState(
    (quiz?.durationMinutes || 15) * 60
  );
  const [elapsedSeconds, setElapsedSeconds] = React.useState(0);

  // Timer countdown
  React.useEffect(() => {
    if (isSubmitted || !quiz) return;

    const timer = setInterval(() => {
      setSecondsRemaining((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          handleSubmit();
          return 0;
        }
        return prev - 1;
      });
      setElapsedSeconds((prev) => prev + 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [isSubmitted, quiz]);

  if (!quiz) {
    return (
      <div className="bg-card border border-border rounded-2xl p-12 text-center max-w-lg mx-auto my-12 space-y-4 shadow-2xs">
        <div className="w-14 h-14 rounded-2xl bg-secondary text-muted-foreground flex items-center justify-center mx-auto border border-border">
          <AlertCircle className="w-7 h-7" />
        </div>
        <h2 className="text-xl font-bold text-foreground">Quiz Not Found</h2>
        <p className="text-xs sm:text-sm text-muted-foreground">
          The requested assessment could not be located in this curriculum.
        </p>
        <div className="pt-2">
          <Link
            href={`/student/courses/${slug}`}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-primary text-white text-xs font-semibold hover:bg-primary-hover shadow-2xs transition-colors"
          >
            <BookOpen className="w-4 h-4" />
            <span>Return to Course Hub</span>
          </Link>
        </div>
      </div>
    );
  }

  const currentQuestion = quiz.questions[currentIndex] || quiz.questions[0];
  const isLastQuestion = currentIndex === quiz.questions.length - 1;

  // Answered question indices
  const answeredIndices = quiz.questions
    .map((q, idx) => (selectedAnswers[q.id] ? idx : -1))
    .filter((idx) => idx !== -1);

  const handleSelectOption = (optionId: string) => {
    setSelectedAnswers((prev) => ({
      ...prev,
      [currentQuestion.id]: optionId,
    }));
  };

  const handlePrev = () => {
    if (currentIndex > 0) setCurrentIndex(currentIndex - 1);
  };

  const handleNext = () => {
    if (currentIndex < quiz.questions.length - 1) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  const handleSubmit = () => {
    // Grade evaluation
    let correctCount = 0;
    quiz.questions.forEach((q) => {
      if (selectedAnswers[q.id] === q.correctOptionId) {
        correctCount += 1;
      }
    });

    const scorePct = Math.round((correctCount / quiz.questions.length) * 100);
    const passed = scorePct >= quiz.passingScorePercentage;

    if (passed) {
      markLessonComplete(quiz.id);
    }

    setIsSubmitted(true);
  };

  const handleRetake = () => {
    setSelectedAnswers({});
    setCurrentIndex(0);
    setIsSubmitted(false);
    setSecondsRemaining((quiz.durationMinutes || 15) * 60);
    setElapsedSeconds(0);
  };

  // Calculation for post-submit results
  const correctCount = quiz.questions.filter(
    (q) => selectedAnswers[q.id] === q.correctOptionId
  ).length;
  const scorePct = Math.round((correctCount / quiz.questions.length) * 100);

  const resultData: QuizResult = {
    scorePercentage: scorePct,
    passed: scorePct >= quiz.passingScorePercentage,
    totalQuestions: quiz.questions.length,
    correctAnswersCount: correctCount,
    timeSpentSeconds: elapsedSeconds,
    answers: selectedAnswers,
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6 animate-in fade-in-0 duration-300">
      {!isSubmitted ? (
        <>
          {/* Header & Question Navigation Dots */}
          <QuizHeader
            title={quiz.title}
            moduleTitle={quiz.moduleTitle}
            courseSlug={slug}
            currentIndex={currentIndex}
            totalQuestions={quiz.questions.length}
            answeredIndices={answeredIndices}
            onSelectIndex={setCurrentIndex}
            secondsRemaining={secondsRemaining}
          />

          {/* Active Question Prompt & Options */}
          <QuestionCard
            question={currentQuestion}
            questionIndex={currentIndex}
            totalQuestions={quiz.questions.length}
            selectedOptionId={selectedAnswers[currentQuestion.id]}
            onSelectOption={handleSelectOption}
          />

          {/* Bottom Control Bar */}
          <QuizControlBar
            currentIndex={currentIndex}
            totalQuestions={quiz.questions.length}
            isLastQuestion={isLastQuestion}
            canSubmit={answeredIndices.length > 0}
            onPrev={handlePrev}
            onNext={handleNext}
            onSubmit={handleSubmit}
          />
        </>
      ) : (
        <div className="space-y-8 animate-in fade-in-0 duration-300">
          {/* Results Summary Card */}
          <QuizResultsSummary
            result={resultData}
            passingScorePercentage={quiz.passingScorePercentage}
            courseSlug={slug}
            onRetake={handleRetake}
          />

          {/* Question-by-question Review */}
          <QuizQuestionReview
            questions={quiz.questions}
            userAnswers={selectedAnswers}
          />
        </div>
      )}
    </div>
  );
}
