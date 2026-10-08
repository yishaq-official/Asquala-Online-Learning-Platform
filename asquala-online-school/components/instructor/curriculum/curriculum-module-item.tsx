"use client";

import React, { useState } from "react";
import {
  GripVertical,
  ChevronDown,
  ChevronUp,
  Plus,
  ArrowUp,
  ArrowDown,
  Trash2,
  Edit2,
  Check,
  X,
  Layers,
  Clock,
  BookOpen,
} from "lucide-react";
import { CourseModule, CourseLesson } from "@/types/student";
import { CurriculumLessonItem } from "@/components/instructor/curriculum/curriculum-lesson-item";
import { Button } from "@/components/ui/button";

interface CurriculumModuleItemProps {
  module: CourseModule;
  moduleIndex: number;
  isFirst: boolean;
  isLast: boolean;
  isExpanded: boolean;
  onToggleExpand: () => void;
  onMoveUp: () => void;
  onMoveDown: () => void;
  onRename: (newTitle: string) => void;
  onDelete: () => void;
  onAddLesson: () => void;
  onMoveLessonUp: (lessonIndex: number) => void;
  onMoveLessonDown: (lessonIndex: number) => void;
  onEditLesson: (lesson: CourseLesson) => void;
  onDeleteLesson: (lessonId: string) => void;
  onToggleLessonPreview: (lessonId: string) => void;
}

export function CurriculumModuleItem({
  module,
  moduleIndex,
  isFirst,
  isLast,
  isExpanded,
  onToggleExpand,
  onMoveUp,
  onMoveDown,
  onRename,
  onDelete,
  onAddLesson,
  onMoveLessonUp,
  onMoveLessonDown,
  onEditLesson,
  onDeleteLesson,
  onToggleLessonPreview,
}: CurriculumModuleItemProps) {
  const [isEditingTitle, setIsEditingTitle] = useState(false);
  const [editedTitle, setEditedTitle] = useState(module.title);

  const totalDuration = module.lessons.reduce(
    (acc, lesson) => acc + (lesson.durationMinutes || 0),
    0
  );

  const handleSaveTitle = () => {
    if (editedTitle.trim()) {
      onRename(editedTitle.trim());
      setIsEditingTitle(false);
    }
  };

  const handleCancelTitle = () => {
    setEditedTitle(module.title);
    setIsEditingTitle(false);
  };

  return (
    <div className="bg-card border border-border rounded-2xl overflow-hidden shadow-xs transition-all">
      {/* Module Header Bar */}
      <div className="p-4 sm:p-5 bg-secondary/30 border-b border-border/80 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        {/* Left: Drag grip + Index badge + Title */}
        <div className="flex items-center gap-2.5 sm:gap-3 flex-1 min-w-0">
          <div className="flex items-center gap-1.5 shrink-0">
            <GripVertical className="w-4 h-4 text-muted-foreground/60 cursor-grab" />
            <span className="px-2 py-0.5 rounded-md text-xs font-mono font-bold bg-primary text-primary-foreground shadow-2xs">
              M{moduleIndex}
            </span>
          </div>

          <div className="flex-1 min-w-0">
            {isEditingTitle ? (
              <div className="flex items-center gap-2">
                <input
                  type="text"
                  value={editedTitle}
                  onChange={(e) => setEditedTitle(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") handleSaveTitle();
                    if (e.key === "Escape") handleCancelTitle();
                  }}
                  autoFocus
                  className="flex-1 px-3 py-1.5 rounded-lg border border-primary text-sm font-bold bg-card text-foreground focus:outline-hidden ring-2 ring-primary/20"
                />
                <button
                  type="button"
                  onClick={handleSaveTitle}
                  className="p-1.5 rounded-lg bg-primary text-primary-foreground hover:bg-primary-hover transition-colors"
                  title="Save title"
                >
                  <Check className="w-4 h-4" />
                </button>
                <button
                  type="button"
                  onClick={handleCancelTitle}
                  className="p-1.5 rounded-lg bg-secondary text-muted-foreground hover:text-foreground transition-colors"
                  title="Cancel edit"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            ) : (
              <div className="flex items-center gap-2 group/title">
                <h3
                  onClick={onToggleExpand}
                  className="text-sm sm:text-base font-bold text-foreground truncate cursor-pointer hover:text-primary transition-colors"
                >
                  {module.title}
                </h3>
                <button
                  type="button"
                  onClick={() => setIsEditingTitle(true)}
                  className="opacity-0 group-hover/title:opacity-100 p-1 text-muted-foreground hover:text-foreground transition-opacity"
                  title="Rename module"
                >
                  <Edit2 className="w-3.5 h-3.5" />
                </button>
              </div>
            )}

            {/* Quick module stats */}
            <div className="flex items-center gap-3 mt-0.5 text-xs text-muted-foreground">
              <span>{module.lessons.length} {module.lessons.length === 1 ? "lesson" : "lessons"}</span>
              <span>•</span>
              <span className="flex items-center gap-1">
                <Clock className="w-3 h-3 text-muted-foreground/80" />
                <span>{totalDuration} mins</span>
              </span>
            </div>
          </div>
        </div>

        {/* Right: Module Controls (Up, Down, Delete, Collapse toggle) */}
        <div className="flex items-center justify-end gap-2 shrink-0 pt-2 sm:pt-0 border-t sm:border-t-0 border-border/60">
          {/* Reorder Buttons */}
          <div className="flex items-center gap-0.5">
            <button
              type="button"
              onClick={onMoveUp}
              disabled={isFirst}
              className="p-1.5 rounded-lg text-muted-foreground hover:text-foreground hover:bg-card disabled:opacity-30 disabled:cursor-not-allowed transition-colors border border-transparent hover:border-border"
              title="Move module up"
            >
              <ArrowUp className="w-4 h-4" />
            </button>
            <button
              type="button"
              onClick={onMoveDown}
              disabled={isLast}
              className="p-1.5 rounded-lg text-muted-foreground hover:text-foreground hover:bg-card disabled:opacity-30 disabled:cursor-not-allowed transition-colors border border-transparent hover:border-border"
              title="Move module down"
            >
              <ArrowDown className="w-4 h-4" />
            </button>
          </div>

          {/* Delete Module */}
          <button
            type="button"
            onClick={onDelete}
            className="p-1.5 rounded-lg border border-border bg-card hover:bg-rose-50 hover:text-rose-600 hover:border-rose-200 text-muted-foreground transition-all shadow-2xs"
            title="Delete entire module"
          >
            <Trash2 className="w-4 h-4" />
          </button>

          {/* Toggle Expand / Collapse Chevron */}
          <button
            type="button"
            onClick={onToggleExpand}
            className="p-1.5 rounded-lg border border-border bg-card hover:bg-secondary text-muted-foreground hover:text-foreground transition-all shadow-2xs"
            title={isExpanded ? "Collapse module" : "Expand module"}
          >
            {isExpanded ? (
              <ChevronUp className="w-4 h-4" />
            ) : (
              <ChevronDown className="w-4 h-4" />
            )}
          </button>
        </div>
      </div>

      {/* Module Lessons List (Collapsible) */}
      {isExpanded && (
        <div className="p-4 sm:p-5 space-y-3 bg-card">
          {module.lessons.length > 0 ? (
            <div className="space-y-2.5">
              {module.lessons.map((lesson, idx) => (
                <CurriculumLessonItem
                  key={lesson.id}
                  lesson={lesson}
                  moduleIndex={moduleIndex}
                  lessonIndex={idx + 1}
                  isFirst={idx === 0}
                  isLast={idx === module.lessons.length - 1}
                  onMoveUp={() => onMoveLessonUp(idx)}
                  onMoveDown={() => onMoveLessonDown(idx)}
                  onEdit={() => onEditLesson(lesson)}
                  onDelete={() => onDeleteLesson(lesson.id)}
                  onTogglePreview={() => onToggleLessonPreview(lesson.id)}
                />
              ))}
            </div>
          ) : (
            <div className="text-center py-8 px-4 rounded-xl border border-dashed border-border bg-secondary/20">
              <BookOpen className="w-8 h-8 text-muted-foreground/60 mx-auto mb-2" />
              <p className="text-xs sm:text-sm font-semibold text-foreground">
                No lessons in this module yet
              </p>
              <p className="text-xs text-muted-foreground mt-0.5">
                Add your first video lecture, reading article, or milestone quiz.
              </p>
            </div>
          )}

          {/* Add Lesson Button */}
          <div className="pt-2">
            <button
              type="button"
              onClick={onAddLesson}
              className="w-full py-2.5 px-4 rounded-xl border border-dashed border-primary/40 hover:border-primary bg-primary-light/40 hover:bg-primary-light text-primary font-semibold text-xs flex items-center justify-center gap-2 transition-all shadow-2xs"
            >
              <Plus className="w-4 h-4" />
              <span>Add Lesson to {module.title}</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
