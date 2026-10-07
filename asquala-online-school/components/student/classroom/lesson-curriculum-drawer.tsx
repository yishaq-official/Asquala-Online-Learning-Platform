"use client";

import * as React from "react";
import Link from "next/link";
import {
  ChevronDown,
  CheckCircle2,
  Circle,
  CircleDot,
  Video,
  FileText,
  HelpCircle,
  X,
} from "lucide-react";
import { CourseModule } from "@/types/student";

interface LessonCurriculumDrawerProps {
  courseSlug: string;
  modules: CourseModule[];
  currentLessonId: string;
  completedLessonIds: string[];
  isOpen: boolean;
  onClose?: () => void;
}

export function LessonCurriculumDrawer({
  courseSlug,
  modules,
  currentLessonId,
  completedLessonIds,
  isOpen,
  onClose,
}: LessonCurriculumDrawerProps) {
  // Default open module containing current lesson
  const currentModule = modules.find((m) =>
    m.lessons.some((l) => l.id === currentLessonId)
  );
  const [openModuleIds, setOpenModuleIds] = React.useState<string[]>([
    currentModule?.id || modules[0]?.id || "",
  ]);

  const toggleModule = (id: string) => {
    setOpenModuleIds((prev) =>
      prev.includes(id) ? prev.filter((mId) => mId !== id) : [...prev, id]
    );
  };

  const getLessonIcon = (type: string) => {
    switch (type) {
      case "video":
        return <Video className="w-3.5 h-3.5" />;
      case "reading":
        return <FileText className="w-3.5 h-3.5" />;
      case "quiz":
        return <HelpCircle className="w-3.5 h-3.5 text-amber-600" />;
      default:
        return <Video className="w-3.5 h-3.5" />;
    }
  };

  if (!isOpen) return null;

  return (
    <div className="bg-card border border-border rounded-2xl overflow-hidden shadow-sm flex flex-col h-[640px] max-h-[85vh]">
      {/* Drawer Header */}
      <div className="p-4 border-b border-border flex items-center justify-between shrink-0 bg-secondary/30">
        <div>
          <h3 className="font-bold text-sm text-foreground">Course Curriculum</h3>
          <p className="text-[11px] text-muted-foreground">
            Jump to any lesson without leaving the player
          </p>
        </div>

        {onClose && (
          <button
            type="button"
            onClick={onClose}
            className="p-1 rounded-lg text-muted-foreground hover:text-foreground hover:bg-secondary cursor-pointer lg:hidden"
            aria-label="Close drawer"
          >
            <X className="w-4 h-4" />
          </button>
        )}
      </div>

      {/* Modules List (Scrollable) */}
      <div className="flex-1 overflow-y-auto divide-y divide-border/60">
        {modules.map((module) => {
          const isOpen = openModuleIds.includes(module.id);
          const completedCount = module.lessons.filter((l) =>
            completedLessonIds.includes(l.id)
          ).length;

          return (
            <div key={module.id} className="bg-card">
              {/* Module Header Trigger */}
              <button
                type="button"
                onClick={() => toggleModule(module.id)}
                className="w-full px-4 py-3 flex items-center justify-between text-left hover:bg-secondary/40 cursor-pointer transition-colors"
              >
                <div className="space-y-0.5 min-w-0 pr-2">
                  <span className="font-bold text-xs text-foreground block truncate">
                    {module.title}
                  </span>
                  <span className="text-[10px] text-muted-foreground">
                    {completedCount} / {module.lessons.length} completed
                  </span>
                </div>

                <ChevronDown
                  className={`w-4 h-4 text-muted-foreground shrink-0 transition-transform ${
                    isOpen ? "rotate-180" : ""
                  }`}
                />
              </button>

              {/* Module Lessons */}
              {isOpen && (
                <div className="bg-muted/10 divide-y divide-border/40 border-t border-border/40">
                  {module.lessons.map((lesson) => {
                    const isCurrent = lesson.id === currentLessonId;
                    const isCompleted = completedLessonIds.includes(lesson.id);

                    return (
                      <Link
                        key={lesson.id}
                        href={
                          lesson.type === "quiz"
                            ? `/student/courses/${courseSlug}/quizzes/${lesson.quizId || "quiz-mod-3"}`
                            : `/student/courses/${courseSlug}/lessons/${lesson.id}`
                        }
                        className={`px-4 py-2.5 flex items-center justify-between gap-3 text-xs transition-colors ${
                          isCurrent
                            ? "bg-primary-light text-primary font-bold border-l-4 border-primary"
                            : "hover:bg-secondary/60 text-foreground"
                        }`}
                      >
                        <div className="flex items-center gap-2.5 min-w-0">
                          {isCompleted ? (
                            <CheckCircle2 className="w-3.5 h-3.5 text-primary shrink-0" />
                          ) : isCurrent ? (
                            <CircleDot className="w-3.5 h-3.5 text-primary shrink-0 animate-pulse" />
                          ) : (
                            <Circle className="w-3.5 h-3.5 text-muted-foreground/60 shrink-0" />
                          )}

                          <div className="flex items-center gap-1.5 truncate">
                            <span className="shrink-0">{getLessonIcon(lesson.type)}</span>
                            <span className="truncate">{lesson.title}</span>
                          </div>
                        </div>

                        <span className="text-[10px] text-muted-foreground shrink-0">
                          {lesson.durationMinutes}m
                        </span>
                      </Link>
                    );
                  })}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
