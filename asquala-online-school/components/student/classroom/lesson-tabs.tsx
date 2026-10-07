"use client";

import * as React from "react";
import { LessonNotesEditor } from "./lesson-notes-editor";
import { LessonQaForum } from "./lesson-qa-forum";
import { BookOpen, MessageSquare, Edit3 } from "lucide-react";

type TabId = "overview" | "notes" | "qa";

interface LessonTabsProps {
  lessonId: string;
  lessonTitle: string;
  courseTitle: string;
}

export function LessonTabs({ lessonId, lessonTitle, courseTitle }: LessonTabsProps) {
  const [activeTab, setActiveTab] = React.useState<TabId>("overview");

  return (
    <div className="space-y-5">
      {/* Tabs Navigation */}
      <div className="flex items-center gap-1.5 p-1 bg-secondary rounded-xl border border-border w-fit overflow-x-auto max-w-full">
        <button
          type="button"
          onClick={() => setActiveTab("overview")}
          className={`flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer shrink-0 ${
            activeTab === "overview"
              ? "bg-card text-foreground shadow-xs border border-border"
              : "text-muted-foreground hover:text-foreground"
          }`}
        >
          <BookOpen className="w-4 h-4 text-primary" />
          <span>Lesson Overview</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab("notes")}
          className={`flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer shrink-0 ${
            activeTab === "notes"
              ? "bg-card text-foreground shadow-xs border border-border"
              : "text-muted-foreground hover:text-foreground"
          }`}
        >
          <Edit3 className="w-4 h-4 text-primary" />
          <span>My Notes</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab("qa")}
          className={`flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer shrink-0 ${
            activeTab === "qa"
              ? "bg-card text-foreground shadow-xs border border-border"
              : "text-muted-foreground hover:text-foreground"
          }`}
        >
          <MessageSquare className="w-4 h-4 text-primary" />
          <span>Q&A Discussion</span>
        </button>
      </div>

      {/* Tab Content Panels */}
      {activeTab === "overview" && (
        <div className="bg-card border border-border rounded-2xl p-6 shadow-2xs space-y-4">
          <div className="space-y-1">
            <h3 className="font-bold text-base text-foreground">{lessonTitle}</h3>
            <p className="text-xs text-muted-foreground">From course: {courseTitle}</p>
          </div>

          <p className="text-xs sm:text-sm text-foreground/90 leading-relaxed">
            In this lesson, we study production architecture patterns, practical code organization, and essential deployment considerations. Review the video lecture, take notes on the right, and mark this lesson as complete once you understand the core concepts.
          </p>

          <div className="pt-2">
            <LessonNotesEditor lessonId={lessonId} />
          </div>
        </div>
      )}

      {activeTab === "notes" && <LessonNotesEditor lessonId={lessonId} />}

      {activeTab === "qa" && <LessonQaForum lessonId={lessonId} />}
    </div>
  );
}
