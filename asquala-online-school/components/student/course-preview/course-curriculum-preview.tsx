"use client";

import * as React from "react";
import { ChevronDown, Video, FileText, HelpCircle, Lock, Play } from "lucide-react";
import { CourseModule } from "@/types/student";

interface CourseCurriculumPreviewProps {
  modules: CourseModule[];
}

export function CourseCurriculumPreview({ modules }: CourseCurriculumPreviewProps) {
  // By default, open the first module
  const [openModuleIds, setOpenModuleIds] = React.useState<string[]>([
    modules[0]?.id || "",
  ]);

  const toggleModule = (id: string) => {
    setOpenModuleIds((prev) =>
      prev.includes(id) ? prev.filter((mId) => mId !== id) : [...prev, id]
    );
  };

  const expandAll = () => setOpenModuleIds(modules.map((m) => m.id));
  const collapseAll = () => setOpenModuleIds([]);

  const totalLessons = modules.reduce((acc, m) => acc + m.lessons.length, 0);
  const totalDurationMinutes = modules.reduce(
    (acc, m) => acc + m.lessons.reduce((sub, l) => sub + l.durationMinutes, 0),
    0
  );
  const totalHours = (totalDurationMinutes / 60).toFixed(1);

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

  return (
    <div className="space-y-4">
      {/* Header with Stats & Toggle Controls */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-2 border-b border-border">
        <div>
          <h2 className="text-lg sm:text-xl font-bold text-foreground">Course Content</h2>
          <p className="text-xs text-muted-foreground mt-0.5">
            {modules.length} modules • {totalLessons} lessons • {totalHours} total hours
          </p>
        </div>

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

      {/* Accordion Modules */}
      <div className="space-y-3">
        {modules.map((module) => {
          const isOpen = openModuleIds.includes(module.id);
          const moduleMinutes = module.lessons.reduce((acc, l) => acc + l.durationMinutes, 0);

          return (
            <div
              key={module.id}
              className="border border-border rounded-xl bg-card overflow-hidden transition-all shadow-2xs"
            >
              {/* Module Header Trigger */}
              <button
                type="button"
                onClick={() => toggleModule(module.id)}
                className="w-full px-5 py-4 flex items-center justify-between gap-4 text-left hover:bg-secondary/40 cursor-pointer transition-colors"
                aria-expanded={isOpen}
              >
                <div className="space-y-1 min-w-0">
                  <span className="font-bold text-sm sm:text-base text-foreground leading-snug">
                    {module.title}
                  </span>
                  <div className="text-xs text-muted-foreground">
                    {module.lessons.length} lessons • {moduleMinutes} min
                  </div>
                </div>

                <div className="p-1 rounded-md text-muted-foreground hover:text-foreground shrink-0">
                  <ChevronDown
                    className={`w-5 h-5 transition-transform duration-200 ${
                      isOpen ? "rotate-180" : ""
                    }`}
                  />
                </div>
              </button>

              {/* Module Lessons List */}
              {isOpen && (
                <div className="border-t border-border/70 divide-y divide-border/60 bg-muted/15 animate-in fade-in-0 duration-200">
                  {module.lessons.map((lesson) => (
                    <div
                      key={lesson.id}
                      className="px-5 py-3 flex items-center justify-between gap-3 text-xs sm:text-sm hover:bg-card/70 transition-colors"
                    >
                      <div className="flex items-center gap-3 min-w-0">
                        <span className="shrink-0">{getLessonIcon(lesson.type)}</span>
                        <span className="font-medium text-foreground truncate">
                          {lesson.title}
                        </span>
                      </div>

                      <div className="flex items-center gap-3 shrink-0 text-xs text-muted-foreground">
                        {lesson.isPreview ? (
                          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold bg-primary-light text-primary border border-primary-border">
                            <Play className="w-2.5 h-2.5 fill-current" />
                            Preview
                          </span>
                        ) : (
                          <Lock className="w-3.5 h-3.5 text-muted-foreground/60" />
                        )}
                        <span className="w-12 text-right">{lesson.durationMinutes} min</span>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
