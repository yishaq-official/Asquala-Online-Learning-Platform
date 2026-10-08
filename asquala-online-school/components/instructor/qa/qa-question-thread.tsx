"use client";

import React from "react";
import Link from "next/link";
import {
  CheckCircle2,
  AlertCircle,
  ThumbsUp,
  MessageSquare,
  Clock,
  ExternalLink,
  Code,
  ShieldCheck,
  RotateCcw,
} from "lucide-react";
import { InstructorQaThread } from "@/lib/mock-instructor-data";
import { Button } from "@/components/ui/button";

interface QaQuestionThreadProps {
  thread: InstructorQaThread;
  onToggleResolved: () => void;
}

export function QaQuestionThread({
  thread,
  onToggleResolved,
}: QaQuestionThreadProps) {
  return (
    <div className="space-y-6">
      {/* Thread Header Banner */}
      <div className="bg-card border border-border rounded-2xl p-5 shadow-xs space-y-3">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          {/* Lesson context */}
          <div className="space-y-1">
            <div className="flex flex-wrap items-center gap-2">
              <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-primary-light text-primary border border-primary-border uppercase">
                {thread.courseTitle}
              </span>
              {thread.timestampOrSection && (
                <span className="px-2 py-0.5 rounded-full text-[10px] font-mono bg-secondary text-foreground">
                  {thread.timestampOrSection}
                </span>
              )}
            </div>

            <h2 className="text-base sm:text-lg font-bold text-foreground leading-snug">
              {thread.title}
            </h2>

            <p className="text-xs text-muted-foreground flex items-center gap-1.5">
              <span>Originates from:</span>
              <span className="font-semibold text-foreground">
                {thread.lessonTitle}
              </span>
            </p>
          </div>

          {/* Resolve / Reopen Action */}
          <div className="flex items-center gap-2 shrink-0 self-start sm:self-auto">
            <button
              type="button"
              onClick={onToggleResolved}
              className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold border transition-all ${
                thread.isResolved
                  ? "bg-emerald-50 text-emerald-800 border-emerald-300 hover:bg-emerald-100"
                  : "bg-secondary text-muted-foreground border-border hover:text-foreground"
              }`}
            >
              <CheckCircle2
                className={`w-4 h-4 ${
                  thread.isResolved ? "text-emerald-600" : "text-muted-foreground"
                }`}
              />
              <span>{thread.isResolved ? "Resolved" : "Mark Resolved"}</span>
            </button>
          </div>
        </div>
      </div>

      {/* Student Question Post */}
      <div className="bg-card border border-border rounded-2xl p-5 sm:p-6 shadow-xs space-y-4">
        {/* Author info */}
        <div className="flex items-center justify-between gap-3 pb-3 border-b border-border/80">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-secondary text-foreground font-bold text-xs flex items-center justify-center border border-border">
              {thread.studentName
                .split(" ")
                .map((n) => n[0])
                .join("")}
            </div>
            <div>
              <h3 className="text-sm font-bold text-foreground">
                {thread.studentName}
              </h3>
              <p className="text-xs text-muted-foreground">
                {thread.studentRole} • Submitted {thread.createdAt}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-1.5 text-xs text-muted-foreground bg-secondary/50 px-2.5 py-1 rounded-lg">
            <ThumbsUp className="w-3.5 h-3.5 text-primary" />
            <span className="font-semibold">{thread.upvotesCount} upvotes</span>
          </div>
        </div>

        {/* Text */}
        <div className="text-xs sm:text-sm text-foreground/90 leading-relaxed whitespace-pre-wrap">
          {thread.questionText}
        </div>

        {/* Code Snippet (if present) */}
        {thread.codeSnippet && (
          <div className="rounded-xl overflow-hidden border border-border bg-slate-950 p-4 font-mono text-xs text-slate-100 overflow-x-auto leading-relaxed shadow-2xs">
            <pre>{thread.codeSnippet}</pre>
          </div>
        )}
      </div>

      {/* Existing Responses Section */}
      <div className="space-y-4">
        <h3 className="text-xs font-bold uppercase tracking-wider text-muted-foreground flex items-center gap-2">
          <MessageSquare className="w-3.5 h-3.5" />
          <span>Responses &amp; Solutions ({thread.replies.length})</span>
        </h3>

        {thread.replies.length > 0 ? (
          <div className="space-y-3">
            {thread.replies.map((reply) => {
              const isInstructor = reply.authorRole === "instructor";

              return (
                <div
                  key={reply.id}
                  className={`p-4 sm:p-5 rounded-2xl border transition-all space-y-3 ${
                    isInstructor
                      ? "bg-primary-light/30 border-primary/40 shadow-xs"
                      : "bg-card border-border"
                  }`}
                >
                  <div className="flex items-center justify-between gap-3">
                    <div className="flex items-center gap-2.5">
                      <div
                        className={`w-8 h-8 rounded-full font-bold text-xs flex items-center justify-center ${
                          isInstructor
                            ? "bg-primary text-primary-foreground"
                            : "bg-secondary text-foreground"
                        }`}
                      >
                        {reply.authorName
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </div>

                      <div>
                        <div className="flex items-center gap-2">
                          <span className="text-xs font-bold text-foreground">
                            {reply.authorName}
                          </span>
                          {isInstructor && (
                            <span className="inline-flex items-center gap-1 px-2 py-0.2 rounded-full text-[10px] font-extrabold bg-primary text-primary-foreground">
                              <ShieldCheck className="w-3 h-3" />
                              <span>INSTRUCTOR</span>
                            </span>
                          )}
                        </div>
                        <span className="text-[11px] text-muted-foreground">
                          {reply.createdAt}
                        </span>
                      </div>
                    </div>

                    {reply.isOfficialAnswer && (
                      <span className="hidden sm:inline-flex items-center gap-1 text-[11px] font-bold text-emerald-700 bg-emerald-100 px-2.5 py-0.5 rounded-full">
                        <CheckCircle2 className="w-3.5 h-3.5" />
                        <span>Official Solution</span>
                      </span>
                    )}
                  </div>

                  {/* Reply Content */}
                  <div className="text-xs sm:text-sm text-foreground/90 leading-relaxed whitespace-pre-wrap pl-1 sm:pl-10">
                    {reply.content}
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="p-6 rounded-2xl border border-dashed border-border bg-card text-center text-xs text-muted-foreground">
            No responses yet. Write the official instructor solution below to assist this student.
          </div>
        )}
      </div>
    </div>
  );
}
