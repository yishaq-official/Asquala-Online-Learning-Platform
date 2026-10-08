"use client";

import React, { useState, useMemo, useCallback } from "react";
import {
  MOCK_INSTRUCTOR_QA_THREADS,
  MOCK_INSTRUCTOR_COURSES,
  InstructorQaThread,
  InstructorQaReply,
} from "@/lib/mock-instructor-data";
import { QaInboxSidebar } from "@/components/instructor/qa/qa-inbox-sidebar";
import { QaQuestionThread } from "@/components/instructor/qa/qa-question-thread";
import { QaReplyComposer } from "@/components/instructor/qa/qa-reply-composer";
import { QaEmptyState } from "@/components/instructor/qa/qa-empty-state";
import { MessageSquare, CheckCircle2 } from "lucide-react";

export default function InstructorQaPage() {
  const [threads, setThreads] = useState<InstructorQaThread[]>(
    MOCK_INSTRUCTOR_QA_THREADS
  );
  const [activeThreadId, setActiveThreadId] = useState<string>(
    MOCK_INSTRUCTOR_QA_THREADS[0]?.id || ""
  );
  const [activeFilter, setActiveFilter] = useState<
    "needs_reply" | "all" | "resolved"
  >("needs_reply");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCourseId, setSelectedCourseId] = useState("all");
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = useCallback((msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 3500);
  }, []);

  // Filtered threads
  const filteredThreads = useMemo(() => {
    return threads.filter((thread) => {
      // Filter tab
      if (activeFilter === "needs_reply") {
        if (thread.isResolved || thread.replies.length > 0) return false;
      } else if (activeFilter === "resolved") {
        if (!thread.isResolved) return false;
      }

      // Course filter
      if (selectedCourseId !== "all" && thread.courseId !== selectedCourseId) {
        return false;
      }

      // Search query
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase().trim();
        const matchesTitle = thread.title.toLowerCase().includes(q);
        const matchesText = thread.questionText.toLowerCase().includes(q);
        const matchesStudent = thread.studentName.toLowerCase().includes(q);
        return matchesTitle || matchesText || matchesStudent;
      }

      return true;
    });
  }, [threads, activeFilter, selectedCourseId, searchQuery]);

  // Active thread
  const activeThread =
    threads.find((t) => t.id === activeThreadId) || filteredThreads[0];

  const handleToggleResolved = (threadId: string) => {
    setThreads((prev) =>
      prev.map((t) =>
        t.id === threadId ? { ...t, isResolved: !t.isResolved } : t
      )
    );
    const target = threads.find((t) => t.id === threadId);
    showToast(
      target?.isResolved ? "Question marked as unresolved." : "Question marked as resolved!"
    );
  };

  const handlePostReply = (content: string, isOfficial: boolean) => {
    if (!activeThread) return;

    const newReply: InstructorQaReply = {
      id: `rep-${Date.now()}`,
      authorName: "Yishaq Abreham",
      authorRole: "instructor",
      createdAt: "Just now",
      content,
      isOfficialAnswer: isOfficial,
      upvotesCount: 0,
    };

    setThreads((prev) =>
      prev.map((t) =>
        t.id === activeThread.id
          ? {
              ...t,
              isResolved: isOfficial ? true : t.isResolved,
              replies: [...t.replies, newReply],
            }
          : t
      )
    );

    showToast("Your solution was published and notification sent to the student!");
  };

  const availableCourses = useMemo(() => {
    return MOCK_INSTRUCTOR_COURSES.map((c) => ({
      id: c.id,
      title: c.title,
    }));
  }, []);

  return (
    <div className="space-y-6">
      {/* Toast Alert */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 flex items-center gap-2 px-4 py-3 rounded-xl bg-slate-900 text-white shadow-xl text-xs font-semibold animate-in slide-in-from-bottom-2 duration-200">
          <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Header */}
      <div>
        <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-primary-light text-primary border border-primary-border mb-1.5">
          <MessageSquare className="w-3.5 h-3.5" />
          <span>STUDENT SUPPORT DESK</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-foreground">
          Student Q&amp;A &amp; Discussion Inbox
        </h1>
        <p className="text-xs sm:text-sm text-muted-foreground mt-1">
          Answer technical queries, inspect lesson context, and publish official solutions for your students.
        </p>
      </div>

      {/* 2-Column Split Workspace */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left: Threads Sidebar (5 cols on lg) */}
        <div className="lg:col-span-5 xl:col-span-4">
          <QaInboxSidebar
            threads={filteredThreads}
            activeThreadId={activeThread?.id || ""}
            onSelectThread={setActiveThreadId}
            activeFilter={activeFilter}
            onFilterChange={setActiveFilter}
            searchQuery={searchQuery}
            onSearchChange={setSearchQuery}
            selectedCourseId={selectedCourseId}
            onCourseChange={setSelectedCourseId}
            availableCourses={availableCourses}
          />
        </div>

        {/* Right: Active Thread & Composer (7 cols on lg) */}
        <div className="lg:col-span-7 xl:col-span-8 space-y-6">
          {activeThread ? (
            <>
              <QaQuestionThread
                thread={activeThread}
                onToggleResolved={() => handleToggleResolved(activeThread.id)}
              />

              <QaReplyComposer
                onPostReply={handlePostReply}
                studentName={activeThread.studentName}
              />
            </>
          ) : (
            <QaEmptyState />
          )}
        </div>
      </div>
    </div>
  );
}
