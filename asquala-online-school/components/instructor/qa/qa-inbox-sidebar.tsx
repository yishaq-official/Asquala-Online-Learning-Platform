"use client";

import React from "react";
import {
  Search,
  MessageSquare,
  CheckCircle2,
  AlertCircle,
  ThumbsUp,
  Clock,
  Layers,
} from "lucide-react";
import { InstructorQaThread } from "@/lib/mock-instructor-data";

interface QaInboxSidebarProps {
  threads: InstructorQaThread[];
  activeThreadId: string;
  onSelectThread: (threadId: string) => void;
  activeFilter: "needs_reply" | "all" | "resolved";
  onFilterChange: (filter: "needs_reply" | "all" | "resolved") => void;
  searchQuery: string;
  onSearchChange: (q: string) => void;
  selectedCourseId: string;
  onCourseChange: (courseId: string) => void;
  availableCourses: { id: string; title: string }[];
}

export function QaInboxSidebar({
  threads,
  activeThreadId,
  onSelectThread,
  activeFilter,
  onFilterChange,
  searchQuery,
  onSearchChange,
  selectedCourseId,
  onCourseChange,
  availableCourses,
}: QaInboxSidebarProps) {
  const needsReplyCount = threads.filter(
    (t) => !t.isResolved && t.replies.length === 0
  ).length;

  return (
    <div className="bg-card border border-border rounded-2xl flex flex-col h-[750px] shadow-xs overflow-hidden">
      {/* Top Search & Course Filter */}
      <div className="p-4 border-b border-border space-y-3 bg-secondary/30">
        <div className="relative">
          <Search className="w-3.5 h-3.5 text-muted-foreground absolute left-3 top-2.5" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="Search questions or student names..."
            className="w-full pl-9 pr-3 py-1.5 rounded-xl border border-border text-xs bg-card text-foreground focus:outline-hidden"
          />
        </div>

        {/* Course Filter Dropdown */}
        <select
          value={selectedCourseId}
          onChange={(e) => onCourseChange(e.target.value)}
          className="w-full px-2.5 py-1.5 rounded-xl border border-border text-xs bg-card text-foreground focus:outline-hidden"
        >
          <option value="all">All Courses</option>
          {availableCourses.map((c) => (
            <option key={c.id} value={c.id}>
              {c.title}
            </option>
          ))}
        </select>

        {/* Filter Pills */}
        <div className="flex items-center gap-1.5 pt-1">
          <button
            type="button"
            onClick={() => onFilterChange("needs_reply")}
            className={`flex-1 py-1 px-2 rounded-lg text-xs font-semibold transition-all flex items-center justify-center gap-1.5 ${
              activeFilter === "needs_reply"
                ? "bg-amber-600 text-white shadow-2xs"
                : "bg-secondary text-muted-foreground hover:text-foreground"
            }`}
          >
            <span>Needs Reply</span>
            {needsReplyCount > 0 && (
              <span
                className={`text-[10px] px-1.5 py-0.2 rounded-full font-bold ${
                  activeFilter === "needs_reply"
                    ? "bg-white text-amber-800"
                    : "bg-amber-100 text-amber-800"
                }`}
              >
                {needsReplyCount}
              </span>
            )}
          </button>

          <button
            type="button"
            onClick={() => onFilterChange("all")}
            className={`flex-1 py-1 px-2 rounded-lg text-xs font-semibold transition-all flex items-center justify-center gap-1 ${
              activeFilter === "all"
                ? "bg-primary text-primary-foreground shadow-2xs"
                : "bg-secondary text-muted-foreground hover:text-foreground"
            }`}
          >
            <span>All ({threads.length})</span>
          </button>

          <button
            type="button"
            onClick={() => onFilterChange("resolved")}
            className={`flex-1 py-1 px-2 rounded-lg text-xs font-semibold transition-all flex items-center justify-center gap-1 ${
              activeFilter === "resolved"
                ? "bg-emerald-700 text-white shadow-2xs"
                : "bg-secondary text-muted-foreground hover:text-foreground"
            }`}
          >
            <span>Resolved</span>
          </button>
        </div>
      </div>

      {/* Threads List */}
      <div className="flex-1 overflow-y-auto divide-y divide-border/60">
        {threads.length > 0 ? (
          threads.map((thread) => {
            const isActive = thread.id === activeThreadId;
            const isUnanswered = !thread.isResolved && thread.replies.length === 0;

            return (
              <div
                key={thread.id}
                onClick={() => onSelectThread(thread.id)}
                className={`p-3.5 sm:p-4 text-left transition-all cursor-pointer relative ${
                  isActive
                    ? "bg-primary-light/40 border-l-4 border-l-primary"
                    : "hover:bg-secondary/40"
                }`}
              >
                {/* Header row */}
                <div className="flex items-center justify-between gap-2 mb-1">
                  <div className="flex items-center gap-1.5 min-w-0">
                    {isUnanswered && (
                      <span className="w-2 h-2 rounded-full bg-amber-500 shrink-0" />
                    )}
                    <span className="text-xs font-bold text-foreground truncate">
                      {thread.studentName}
                    </span>
                  </div>

                  <span className="text-[10px] text-muted-foreground whitespace-nowrap">
                    {thread.createdAt}
                  </span>
                </div>

                {/* Title */}
                <h4 className="text-xs font-semibold text-foreground line-clamp-1 leading-snug mb-1">
                  {thread.title}
                </h4>

                {/* Question preview */}
                <p className="text-[11px] text-muted-foreground line-clamp-2 leading-relaxed mb-2">
                  {thread.questionText}
                </p>

                {/* Metadata row */}
                <div className="flex items-center justify-between text-[10px] text-muted-foreground">
                  <span className="px-1.5 py-0.5 rounded bg-secondary text-foreground font-medium truncate max-w-[150px]">
                    {thread.courseTitle}
                  </span>

                  <div className="flex items-center gap-2 shrink-0">
                    <span className="flex items-center gap-0.5">
                      <ThumbsUp className="w-3 h-3" />
                      <span>{thread.upvotesCount}</span>
                    </span>
                    <span className="flex items-center gap-0.5">
                      <MessageSquare className="w-3 h-3" />
                      <span>{thread.replies.length}</span>
                    </span>
                  </div>
                </div>
              </div>
            );
          })
        ) : (
          <div className="p-8 text-center text-xs text-muted-foreground">
            No questions match this filter.
          </div>
        )}
      </div>
    </div>
  );
}
