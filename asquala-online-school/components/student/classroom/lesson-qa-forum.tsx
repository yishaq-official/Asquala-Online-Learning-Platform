"use client";

import * as React from "react";
import { MessageSquare, Send, ThumbsUp, CheckCircle2, User } from "lucide-react";

interface QaItem {
  id: string;
  authorName: string;
  avatarLetter: string;
  question: string;
  timestamp: string;
  upvotes: number;
  instructorReply?: {
    authorName: string;
    text: string;
    timestamp: string;
  };
}

const DEFAULT_QA: QaItem[] = [
  {
    id: "qa-1",
    authorName: "Marcus Vance",
    avatarLetter: "M",
    question:
      "When running multiple Docker containers in local dev, should the PostgreSQL host in DATABASE_URL be 'localhost' or 'host.docker.internal'?",
    timestamp: "2 days ago",
    upvotes: 4,
    instructorReply: {
      authorName: "Yishaq Abreham (Instructor)",
      text: "If Next.js is running directly on your host machine (outside Docker), use 'localhost:5432'. If Next.js is running inside a Docker network alongside PostgreSQL, use the container service name (e.g. 'postgres:5432').",
      timestamp: "1 day ago",
    },
  },
  {
    id: "qa-2",
    authorName: "Elena Rostova",
    avatarLetter: "E",
    question:
      "Does Drizzle ORM automatically run migrations on server start, or do we need a separate npm script?",
    timestamp: "3 days ago",
    upvotes: 2,
    instructorReply: {
      authorName: "Yishaq Abreham (Instructor)",
      text: "We recommend running 'drizzle-kit push' or 'drizzle-kit migrate' in a pre-deploy build hook or dedicated CI pipeline rather than inside Next.js bootstrap.",
      timestamp: "2 days ago",
    },
  },
];

interface LessonQaForumProps {
  lessonId: string;
}

export function LessonQaForum({ lessonId }: LessonQaForumProps) {
  const [questions, setQuestions] = React.useState<QaItem[]>(DEFAULT_QA);
  const [newQuestionText, setNewQuestionText] = React.useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newQuestionText.trim()) return;

    const newQa: QaItem = {
      id: `qa-${Date.now()}`,
      authorName: "Alex Rivera",
      avatarLetter: "A",
      question: newQuestionText.trim(),
      timestamp: "Just now",
      upvotes: 0,
    };

    setQuestions([newQa, ...questions]);
    setNewQuestionText("");
  };

  return (
    <div className="bg-card border border-border rounded-2xl p-5 sm:p-6 shadow-2xs space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between pb-2 border-b border-border/80">
        <div>
          <h3 className="font-bold text-sm sm:text-base text-foreground">
            Lesson Q&A & Discussion ({questions.length})
          </h3>
          <p className="text-xs text-muted-foreground">
            Ask questions or join the discussion with instructors and fellow students.
          </p>
        </div>
      </div>

      {/* New Question Form */}
      <form onSubmit={handleSubmit} className="space-y-3">
        <textarea
          value={newQuestionText}
          onChange={(e) => setNewQuestionText(e.target.value)}
          rows={3}
          placeholder="Have a question about this lesson? Ask here..."
          className="w-full p-3.5 rounded-xl bg-secondary/50 border border-border text-foreground placeholder:text-muted-foreground text-xs sm:text-sm focus:outline-hidden focus:ring-2 focus:ring-ring focus:bg-card transition-all"
        />
        <div className="flex justify-end">
          <button
            type="submit"
            disabled={!newQuestionText.trim()}
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-primary text-white text-xs font-semibold hover:bg-primary-hover shadow-2xs transition-colors cursor-pointer disabled:opacity-40"
          >
            <Send className="w-3.5 h-3.5" />
            <span>Post Question</span>
          </button>
        </div>
      </form>

      {/* Questions Thread */}
      <div className="space-y-4 pt-2">
        {questions.map((q) => (
          <div
            key={q.id}
            className="p-4 rounded-xl border border-border/80 bg-muted/15 space-y-3"
          >
            {/* Student Question */}
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 rounded-full bg-secondary text-foreground font-bold text-xs flex items-center justify-center shrink-0 border border-border">
                {q.avatarLetter}
              </div>

              <div className="space-y-1 flex-1 min-w-0">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-bold text-foreground">{q.authorName}</span>
                  <span className="text-[11px] text-muted-foreground">{q.timestamp}</span>
                </div>
                <p className="text-xs sm:text-sm text-foreground/90 leading-relaxed font-medium">
                  {q.question}
                </p>
              </div>
            </div>

            {/* Instructor Reply (if present) */}
            {q.instructorReply && (
              <div className="ml-6 sm:ml-10 p-3.5 rounded-xl bg-primary-light/30 border border-primary-border/60 space-y-1.5">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-bold text-primary flex items-center gap-1 text-[11px]">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    {q.instructorReply.authorName}
                  </span>
                  <span className="text-[10px] text-muted-foreground">
                    {q.instructorReply.timestamp}
                  </span>
                </div>
                <p className="text-xs text-foreground/90 leading-relaxed">
                  {q.instructorReply.text}
                </p>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
