"use client";

import * as React from "react";
import Link from "next/link";
import {
  ChevronDown,
  CheckCircle2,
  CircleDot,
  Circle,
  Video,
  FileText,
  HelpCircle,
  Play,
  RotateCcw,
} from "lucide-react";
import { CourseModule } from "@/types/student";

interface CourseSyllabusAccordionProps {
  courseSlug: string;
  modules: CourseModule[];
  completedLessonIds: string[];
}

export function CourseSyllabusAccordion({
  courseSlug,
  modules,
  completedLessonIds,
}: CourseSyllabusAccordionProps) {
  // Default open all modules or first module
  const [openModuleIds, setOpenModuleIds] = React.useState<string[]>(
    modules.map((m) => m.id)
  );

  const toggleModule = (id: string) => {
    setOpenModuleIds((prev) =>
      prev.includes(id) ? prev.filter((mId) => mId !== id) : [...prev, id]
    );
  };

  const expandAll = () => setOpenModuleIds(modules.map((m) => m.id));
  const collapseAll = () => setOpenModuleIds([]);

  const getLessonIcon = (type: string) => {
    switch (type) {
      case "video":
        return <Video className="w-4 h-4 text-primary" />;
      case "reading":
        return <FileText className="w-4 h-4 text-muted-foreground" />;
      case "quiz":
        return <HelpCircle className="w-4 h-4 text-amber-600" />;
      default:
        return <Video className="w-4 h-4 text-primary" />;
    }
  };

  // Find the first incomplete lesson to mark as current/next
  let foundFirstIncomplete = false;

  return (
    <div className="space-y-4">
      {/* Controls */}
      <div className="flex items-center justify-between pb-1">
        <h2 className="text-base sm:text-lg font-bold text-foreground">Curriculum & Lessons</h2>
        <div className="flex items-center gap-2 text-xs font-semibold">
          <button
            type="button"
            onClick={expandAll}
            className="text-primary hover:text-primary-hover hover:underline cursor-pointer"
          >
            Expand All
          </button>
          <span className="text-border">•</span>
          <button
            type="button"
            onClick={collapseAll}
            className="text-muted-foreground hover:text-foreground hover:underline cursor-pointer"
          >
            Collapse All
          </button>
        </div>
      </div>

      {/* Modules */}
      <div className="space-y-3.5">
        {modules.map((module) => {
          const isOpen = openModuleIds.includes(module.id);
          const completedInModule = module.lessons.filter((l) =>
            completedLessonIds.includes(l.id)
          ).length;
          const isModuleComplete =
            module.lessons.length > 0 && completedInModule === module.lessons.length;

          return (
            <div
              key={module.id}
              className="border border-border rounded-xl bg-card overflow-hidden shadow-2xs transition-all"
            >
              {/* Module Header Trigger */}
              <button
                type="button"
                onClick={() => toggleModule(module.id)}
                className="w-full px-5 py-4 flex items-center justify-between gap-4 text-left hover:bg-secondary/40 cursor-pointer transition-colors"
                aria-expanded={isOpen}
              >
                <div className="space-y-1 min-w-0">
                  <div className="flex items-center gap-2.5">
                    {isModuleComplete ? (
                      <CheckCircle2 className="w-4 h-4 text-primary shrink-0" />
                    ) : (
                      <span className="w-2 h-2 rounded-full bg-primary shrink-0" />
                    )}
                    <span className="font-bold text-sm sm:text-base text-foreground truncate">
                      {module.title}
                    </span>
                  </div>
                  <div className="text-xs text-muted-foreground pl-4.5">
                    {completedInModule} of {module.lessons.length} completed
                  </div>
                </div>

                <div className="flex items-center gap-3 shrink-0">
                  <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-secondary text-secondary-foreground hidden sm:inline-block">
                    {Math.round((completedInModule / (module.lessons.length || 1)) * 100)}%
                  </span>
                  <ChevronDown
                    className={`w-5 h-5 text-muted-foreground transition-transform duration-200 ${
                      isOpen ? "rotate-180" : ""
                    }`}
                  />
                </div>
              </button>

              {/* Lesson Items */}
              {isOpen && (
                <div className="border-t border-border/70 divide-y divide-border/60 bg-muted/10 animate-in fade-in-0 duration-150">
                  {module.lessons.map((lesson) => {
                    const isCompleted = completedLessonIds.includes(lesson.id);
                    let isNext = false;

                    if (!isCompleted && !foundFirstIncomplete) {
                      isNext = true;
                      foundFirstIncomplete = true;
                    }

                    return (
                      <div
                        key={lesson.id}
                        className={`px-5 py-3.5 flex items-center justify-between gap-4 transition-colors ${
                          isNext ? "bg-primary-light/30 border-l-4 border-primary" : "hover:bg-card/70"
                        }`}
                      >
                        {/* Status Icon & Title */}
                        <div className="flex items-center gap-3 min-w-0">
                          {isCompleted ? (
                            <CheckCircle2 className="w-4 h-4 text-primary shrink-0" />
                          ) : isNext ? (
                            <CircleDot className="w-4 h-4 text-primary animate-pulse shrink-0" />
                          ) : (
                            <Circle className="w-4 h-4 text-muted-foreground/60 shrink-0" />
                          )}

                          <div className="flex items-center gap-2 min-w-0">
                            <span className="shrink-0">{getLessonIcon(lesson.type)}</span>
                            <span
                              className={`text-xs sm:text-sm truncate ${
                                isCompleted
                                  ? "text-muted-foreground line-through decoration-border"
                                  : isNext
                                  ? "font-bold text-foreground"
                                  : "font-medium text-foreground"
                              }`}
                            >
                              {lesson.title}
                            </span>
                          </div>
                        </div>

                        {/* Duration & Action CTA */}
                        <div className="flex items-center gap-3 shrink-0">
                          <span className="text-xs text-muted-foreground hidden sm:inline-block">
                            {lesson.durationMinutes} min
                          </span>

                          {lesson.type === "quiz" ? (
                            <Link
                              href={`/student/courses/${courseSlug}/quizzes/${lesson.quizId || "quiz-mod-3"}`}
                              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-amber-50 text-amber-700 hover:bg-amber-100 border border-amber-200 text-xs font-semibold transition-colors"
                            >
                              <HelpCircle className="w-3.5 h-3.5" />
                              <span>{isCompleted ? "Retake Quiz" : "Take Quiz"}</span>
                            </Link>
                          ) : isNext ? (
                            <Link
                              href={`/student/courses/${courseSlug}/lessons/${lesson.id}`}
                              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-primary text-white text-xs font-bold hover:bg-primary-hover shadow-2xs transition-colors"
                            >
                              <Play className="w-3 h-3 fill-current" />
                              <span>Continue</span>
                            </Link>
                          ) : (
                            <Link
                              href={`/student/courses/${courseSlug}/lessons/${lesson.id}`}
                              className="inline-flex items-center gap-1 px-3 py-1 rounded-lg text-xs font-semibold text-muted-foreground hover:text-foreground hover:bg-secondary transition-colors"
                            >
                              {isCompleted ? (
                                <>
                                  <RotateCcw className="w-3 h-3" />
                                  <span>Rewatch</span>
                                </>
                              ) : (
                                <span>Start</span>
                              )}
                            </Link>
                          )}
                        </div>
                      </div>
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
