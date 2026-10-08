"use client";

import React from "react";
import {
  GripVertical,
  PlayCircle,
  BookOpen,
  CheckSquare,
  ArrowUp,
  ArrowDown,
  Edit3,
  Trash2,
  Eye,
  EyeOff,
  Clock,
  Paperclip,
} from "lucide-react";
import { CourseLesson } from "@/types/student";

interface CurriculumLessonItemProps {
  lesson: CourseLesson;
  moduleIndex: number;
  lessonIndex: number;
  isFirst: boolean;
  isLast: boolean;
  onMoveUp: () => void;
  onMoveDown: () => void;
  onEdit: () => void;
  onDelete: () => void;
  onTogglePreview: () => void;
}

export function CurriculumLessonItem({
  lesson,
  moduleIndex,
  lessonIndex,
  isFirst,
  isLast,
  onMoveUp,
  onMoveDown,
  onEdit,
  onDelete,
  onTogglePreview,
}: CurriculumLessonItemProps) {
  const isVideo = lesson.type === "video";
  const isReading = lesson.type === "reading";
  const isQuiz = lesson.type === "quiz";

  return (
    <div className="group flex items-center justify-between gap-3 p-3 sm:p-3.5 bg-card hover:bg-secondary/40 border border-border rounded-xl transition-all shadow-2xs">
      {/* Left side: Reorder + Type Icon + Title */}
      <div className="flex items-center gap-2.5 sm:gap-3 flex-1 min-w-0">
        {/* Drag handle & Sequence badge */}
        <div className="flex items-center gap-1 text-muted-foreground shrink-0">
          <GripVertical className="w-3.5 h-3.5 text-muted-foreground/60 group-hover:text-muted-foreground transition-colors cursor-grab" />
          <span className="text-[11px] font-mono font-semibold text-muted-foreground bg-secondary px-1.5 py-0.5 rounded-md">
            {moduleIndex}.{lessonIndex}
          </span>
        </div>

        {/* Type Badge */}
        <div
          className={`shrink-0 flex items-center gap-1.5 px-2 py-1 rounded-lg text-xs font-semibold ${
            isVideo
              ? "bg-primary-light text-primary border border-primary-border"
              : isReading
              ? "bg-emerald-50 text-emerald-800 border border-emerald-200"
              : "bg-amber-50 text-amber-800 border border-amber-200"
          }`}
        >
          {isVideo && <PlayCircle className="w-3.5 h-3.5" />}
          {isReading && <BookOpen className="w-3.5 h-3.5" />}
          {isQuiz && <CheckSquare className="w-3.5 h-3.5" />}
          <span className="capitalize hidden sm:inline">{lesson.type}</span>
        </div>

        {/* Lesson Title & Attachments indicator */}
        <div className="min-w-0 flex-1 flex items-center gap-2">
          <p
            onClick={onEdit}
            className="text-xs sm:text-sm font-semibold text-foreground truncate cursor-pointer hover:text-primary transition-colors"
          >
            {lesson.title}
          </p>

          {lesson.resources && lesson.resources.length > 0 && (
            <span
              className="hidden md:inline-flex items-center gap-1 text-[11px] text-muted-foreground font-medium shrink-0"
              title={`${lesson.resources.length} downloadable attachment(s)`}
            >
              <Paperclip className="w-3 h-3" />
              <span>{lesson.resources.length}</span>
            </span>
          )}
        </div>
      </div>

      {/* Right side: Duration + Preview Toggle + Actions */}
      <div className="flex items-center gap-2 sm:gap-3 shrink-0">
        {/* Duration */}
        <div className="flex items-center gap-1 text-xs text-muted-foreground font-medium">
          <Clock className="w-3 h-3 text-muted-foreground/70" />
          <span>{lesson.durationMinutes}m</span>
        </div>

        {/* Free Preview Toggle Pill */}
        <button
          type="button"
          onClick={onTogglePreview}
          title={lesson.isPreview ? "Free Preview Enabled (Click to lock)" : "Enrolled Only (Click to make free preview)"}
          className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold transition-all ${
            lesson.isPreview
              ? "bg-emerald-50 text-emerald-700 border border-emerald-300 hover:bg-emerald-100"
              : "bg-secondary text-muted-foreground border border-border hover:bg-secondary/80 hover:text-foreground"
          }`}
        >
          {lesson.isPreview ? (
            <>
              <Eye className="w-3 h-3 text-emerald-600" />
              <span className="hidden md:inline">Free Preview</span>
            </>
          ) : (
            <>
              <EyeOff className="w-3 h-3 text-muted-foreground" />
              <span className="hidden md:inline">Enrolled Only</span>
            </>
          )}
        </button>

        {/* Reorder Buttons */}
        <div className="flex items-center gap-0.5">
          <button
            type="button"
            onClick={onMoveUp}
            disabled={isFirst}
            className="p-1 rounded-md text-muted-foreground hover:text-foreground hover:bg-secondary disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
            title="Move lesson up"
          >
            <ArrowUp className="w-3.5 h-3.5" />
          </button>
          <button
            type="button"
            onClick={onMoveDown}
            disabled={isLast}
            className="p-1 rounded-md text-muted-foreground hover:text-foreground hover:bg-secondary disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
            title="Move lesson down"
          >
            <ArrowDown className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Edit Button */}
        <button
          type="button"
          onClick={onEdit}
          className="p-1.5 rounded-lg border border-border bg-card hover:bg-primary-light hover:text-primary hover:border-primary-border text-muted-foreground transition-all shadow-2xs"
          title="Edit lesson content & resources"
        >
          <Edit3 className="w-3.5 h-3.5" />
        </button>

        {/* Delete Button */}
        <button
          type="button"
          onClick={onDelete}
          className="p-1.5 rounded-lg border border-border bg-card hover:bg-rose-50 hover:text-rose-600 hover:border-rose-200 text-muted-foreground transition-all shadow-2xs"
          title="Delete lesson"
        >
          <Trash2 className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
}
