"use client";

import React from "react";
import Link from "next/link";
import { MessageSquare, ArrowRight, Clock, CheckCircle2 } from "lucide-react";

interface PendingQuestion {
  id: string;
  studentName: string;
  studentInitials: string;
  courseTitle: string;
  lessonTitle: string;
  questionSnippet: string;
  timeAgo: string;
}

const MOCK_PENDING_QUESTIONS: PendingQuestion[] = [
  {
    id: "qa-1",
    studentName: "Abel Tesfaye",
    studentInitials: "AT",
    courseTitle: "Next.js 16 Mastery",
    lessonTitle: "Server Actions & Singleton Pool",
    questionSnippet: "How should we handle idle pool disconnections during heavy concurrent bursts?",
    timeAgo: "2 hours ago",
  },
  {
    id: "qa-2",
    studentName: "Sara Mengistu",
    studentInitials: "SM",
    courseTitle: "PostgreSQL & Drizzle",
    lessonTitle: "Composite Primary Keys in Schemas",
    questionSnippet: "Does Drizzle support composite keys without breaking inference types in auth.ts?",
    timeAgo: "5 hours ago",
  },
  {
    id: "qa-3",
    studentName: "Dawit Kebede",
    studentInitials: "DK",
    courseTitle: "Next.js 16 Mastery",
    lessonTitle: "Turbopack Build Configurations",
    questionSnippet: "Getting a font resolution warning when running sandboxed build commands locally.",
    timeAgo: "Yesterday",
  },
];

export function PendingQaAlert() {
  return (
    <div className="bg-card border border-border rounded-2xl p-6 sm:p-7 shadow-xs space-y-4">
      <div className="flex items-center justify-between border-b border-border/80 pb-4">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-xl bg-amber-50 text-amber-700 flex items-center justify-center border border-amber-200">
            <MessageSquare className="w-4 h-4" />
          </div>
          <div>
            <h2 className="text-base font-bold text-foreground">
              Student Q&amp;A Inbox
            </h2>
            <p className="text-xs text-muted-foreground">
              Direct questions from learners enrolled in your active curricula.
            </p>
          </div>
        </div>

        <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-amber-100 text-amber-800 border border-amber-200">
          3 Pending
        </span>
      </div>

      <div className="space-y-3">
        {MOCK_PENDING_QUESTIONS.map((q) => (
          <div
            key={q.id}
            className="p-3.5 rounded-xl border border-border bg-secondary/20 hover:bg-secondary/40 transition-colors space-y-2"
          >
            <div className="flex items-center justify-between gap-2">
              <div className="flex items-center gap-2 min-w-0">
                <div className="w-6 h-6 rounded-full bg-primary-light text-primary font-bold text-[10px] flex items-center justify-center border border-primary-border shrink-0">
                  {q.studentInitials}
                </div>
                <span className="text-xs font-bold text-foreground truncate">
                  {q.studentName}
                </span>
                <span className="text-[11px] text-muted-foreground truncate hidden sm:inline">
                  in {q.courseTitle}
                </span>
              </div>

              <div className="flex items-center gap-1 text-[11px] text-muted-foreground shrink-0">
                <Clock className="w-3 h-3" />
                <span>{q.timeAgo}</span>
              </div>
            </div>

            <p className="text-xs text-foreground font-medium line-clamp-2 pl-8">
              &ldquo;{q.questionSnippet}&rdquo;
            </p>

            <div className="flex justify-end pt-1">
              <Link
                href="/instructor/qa"
                className="text-[11px] font-bold text-primary hover:underline flex items-center gap-1"
              >
                <span>Reply to student</span>
                <ArrowRight className="w-3 h-3" />
              </Link>
            </div>
          </div>
        ))}
      </div>

      <div className="pt-1 border-t border-border/80">
        <Link
          href="/instructor/qa"
          className="w-full inline-flex items-center justify-center gap-1.5 py-2 rounded-xl text-xs font-bold text-primary hover:bg-primary-light transition-colors"
        >
          <span>Open Full Q&amp;A Inbox</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </Link>
      </div>
    </div>
  );
}
