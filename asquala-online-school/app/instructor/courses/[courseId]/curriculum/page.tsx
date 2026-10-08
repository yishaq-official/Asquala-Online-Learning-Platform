"use client";

import React, { useState, useEffect, useMemo, useCallback } from "react";
import { useParams } from "next/navigation";
import {
  getInstructorCourseCurriculum,
  getInstructorCourseById,
} from "@/lib/mock-instructor-data";
import { CourseModule, CourseLesson } from "@/types/student";
import { CurriculumTopBar } from "@/components/instructor/curriculum/curriculum-top-bar";
import { CurriculumModuleItem } from "@/components/instructor/curriculum/curriculum-module-item";
import { AddModuleModal } from "@/components/instructor/curriculum/add-module-modal";
import { AddLessonModal } from "@/components/instructor/curriculum/add-lesson-modal";
import { LessonEditorDrawer } from "@/components/instructor/curriculum/lesson-editor-drawer";
import { Layers, Plus, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function InstructorCourseCurriculumPage() {
  const params = useParams();
  const courseId = typeof params?.courseId === "string" ? params.courseId : "";

  // Curriculum Modules State
  const [modules, setModules] = useState<CourseModule[]>([]);
  const [expandedModuleIds, setExpandedModuleIds] = useState<Record<string, boolean>>({});
  const [saveStatus, setSaveStatus] = useState<"saved" | "saving" | "unsaved">("saved");
  const [lastSavedTime, setLastSavedTime] = useState<string>("Just now");

  // Modals and Drawers
  const [isAddModuleOpen, setIsAddModuleOpen] = useState(false);
  const [targetModuleForLesson, setTargetModuleForLesson] = useState<{
    id: string;
    title: string;
  } | null>(null);
  const [editingLessonState, setEditingLessonState] = useState<{
    lesson: CourseLesson;
    moduleId: string;
  } | null>(null);

  // Toast message
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = useCallback((msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 3500);
  }, []);

  // Initialize data
  useEffect(() => {
    if (courseId) {
      const initialModules = getInstructorCourseCurriculum(courseId);
      setModules(initialModules);
      // Expand all by default
      const initialExpanded: Record<string, boolean> = {};
      initialModules.forEach((m) => {
        initialExpanded[m.id] = true;
      });
      setExpandedModuleIds(initialExpanded);
      setLastSavedTime("Just now");
    }
  }, [courseId]);

  // Trigger simulated autosave on mutation
  const triggerAutosave = useCallback(
    (actionDescription?: string) => {
      setSaveStatus("saving");
      const timer = setTimeout(() => {
        setSaveStatus("saved");
        const now = new Date();
        const timeStr = now.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
        setLastSavedTime(timeStr);
        if (actionDescription) {
          showToast(actionDescription);
        }
      }, 500);
      return () => clearTimeout(timer);
    },
    [showToast]
  );

  // Total metrics
  const totalLessons = useMemo(() => {
    return modules.reduce((acc, m) => acc + m.lessons.length, 0);
  }, [modules]);

  const totalDurationMinutes = useMemo(() => {
    return modules.reduce((acc, m) => {
      return (
        acc +
        m.lessons.reduce((sub, l) => sub + (l.durationMinutes || 0), 0)
      );
    }, 0);
  }, [modules]);

  const allExpanded = useMemo(() => {
    if (modules.length === 0) return false;
    return modules.every((m) => expandedModuleIds[m.id] !== false);
  }, [modules, expandedModuleIds]);

  const handleToggleExpandAll = () => {
    const nextState: Record<string, boolean> = {};
    const target = !allExpanded;
    modules.forEach((m) => {
      nextState[m.id] = target;
    });
    setExpandedModuleIds(nextState);
  };

  const handleToggleModuleExpand = (moduleId: string) => {
    setExpandedModuleIds((prev) => ({
      ...prev,
      [moduleId]: !prev[moduleId],
    }));
  };

  // Module Actions
  const handleAddModule = (title: string) => {
    const newModuleId = `mod-${Date.now()}`;
    const newModule: CourseModule = {
      id: newModuleId,
      title,
      order: modules.length + 1,
      lessons: [],
    };

    setModules((prev) => [...prev, newModule]);
    setExpandedModuleIds((prev) => ({ ...prev, [newModuleId]: true }));
    triggerAutosave(`Module "${title}" added.`);
  };

  const handleRenameModule = (moduleId: string, newTitle: string) => {
    setModules((prev) =>
      prev.map((m) => (m.id === moduleId ? { ...m, title: newTitle } : m))
    );
    triggerAutosave(`Module renamed to "${newTitle}".`);
  };

  const handleDeleteModule = (moduleId: string) => {
    const targetModule = modules.find((m) => m.id === moduleId);
    if (!targetModule) return;

    if (
      confirm(
        `Are you sure you want to delete "${targetModule.title}" and its ${targetModule.lessons.length} lessons?`
      )
    ) {
      setModules((prev) => prev.filter((m) => m.id !== moduleId));
      triggerAutosave(`Module "${targetModule.title}" deleted.`);
    }
  };

  const handleMoveModule = (index: number, direction: "up" | "down") => {
    const targetIndex = direction === "up" ? index - 1 : index + 1;
    if (targetIndex < 0 || targetIndex >= modules.length) return;

    const updated = [...modules];
    const temp = updated[index];
    updated[index] = updated[targetIndex];
    updated[targetIndex] = temp;

    // re-assign orders
    const reordered = updated.map((m, idx) => ({ ...m, order: idx + 1 }));
    setModules(reordered);
    triggerAutosave("Curriculum modules reordered.");
  };

  // Lesson Actions
  const handleAddLesson = (lessonData: {
    title: string;
    type: "video" | "reading" | "quiz";
    durationMinutes: number;
    isPreview: boolean;
    videoUrl?: string;
  }) => {
    if (!targetModuleForLesson) return;

    const newLessonId = `lesson-${Date.now()}`;
    const newLesson: CourseLesson = {
      id: newLessonId,
      title: lessonData.title,
      type: lessonData.type,
      durationMinutes: lessonData.durationMinutes,
      order: 1,
      isPreview: lessonData.isPreview,
      videoUrl: lessonData.videoUrl,
    };

    setModules((prev) =>
      prev.map((m) => {
        if (m.id === targetModuleForLesson.id) {
          const updatedLessons = [
            ...m.lessons,
            { ...newLesson, order: m.lessons.length + 1 },
          ];
          return { ...m, lessons: updatedLessons };
        }
        return m;
      })
    );

    triggerAutosave(`Lesson "${lessonData.title}" created.`);
  };

  const handleSaveEditedLesson = (updatedLesson: CourseLesson) => {
    if (!editingLessonState) return;
    const { moduleId } = editingLessonState;

    setModules((prev) =>
      prev.map((m) => {
        if (m.id === moduleId) {
          return {
            ...m,
            lessons: m.lessons.map((l) =>
              l.id === updatedLesson.id ? updatedLesson : l
            ),
          };
        }
        return m;
      })
    );

    triggerAutosave(`Lesson "${updatedLesson.title}" updated.`);
  };

  const handleDeleteLesson = (moduleId: string, lessonId: string) => {
    setModules((prev) =>
      prev.map((m) => {
        if (m.id === moduleId) {
          const filtered = m.lessons.filter((l) => l.id !== lessonId);
          return {
            ...m,
            lessons: filtered.map((l, idx) => ({ ...l, order: idx + 1 })),
          };
        }
        return m;
      })
    );

    triggerAutosave("Lesson removed.");
  };

  const handleMoveLesson = (
    moduleId: string,
    lessonIndex: number,
    direction: "up" | "down"
  ) => {
    setModules((prev) =>
      prev.map((m) => {
        if (m.id !== moduleId) return m;

        const targetIndex = direction === "up" ? lessonIndex - 1 : lessonIndex + 1;
        if (targetIndex < 0 || targetIndex >= m.lessons.length) return m;

        const updated = [...m.lessons];
        const temp = updated[lessonIndex];
        updated[lessonIndex] = updated[targetIndex];
        updated[targetIndex] = temp;

        return {
          ...m,
          lessons: updated.map((l, idx) => ({ ...l, order: idx + 1 })),
        };
      })
    );

    triggerAutosave("Lessons reordered.");
  };

  const handleToggleLessonPreview = (moduleId: string, lessonId: string) => {
    setModules((prev) =>
      prev.map((m) => {
        if (m.id !== moduleId) return m;
        return {
          ...m,
          lessons: m.lessons.map((l) =>
            l.id === lessonId ? { ...l, isPreview: !l.isPreview } : l
          ),
        };
      })
    );

    triggerAutosave("Lesson preview access updated.");
  };

  return (
    <div className="space-y-6">
      {/* Toast Notification Banner */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 flex items-center gap-2 px-4 py-3 rounded-xl bg-slate-900 text-white shadow-xl text-xs font-semibold animate-in slide-in-from-bottom-2 duration-200">
          <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Curriculum Top Control Bar */}
      <CurriculumTopBar
        totalModules={modules.length}
        totalLessons={totalLessons}
        totalDurationMinutes={totalDurationMinutes}
        saveStatus={saveStatus}
        lastSavedTime={lastSavedTime}
        onAddModule={() => setIsAddModuleOpen(true)}
        allExpanded={allExpanded}
        onToggleExpandAll={handleToggleExpandAll}
      />

      {/* Module List Accordions */}
      {modules.length > 0 ? (
        <div className="space-y-4">
          {modules.map((module, idx) => (
            <CurriculumModuleItem
              key={module.id}
              module={module}
              moduleIndex={idx + 1}
              isFirst={idx === 0}
              isLast={idx === modules.length - 1}
              isExpanded={expandedModuleIds[module.id] !== false}
              onToggleExpand={() => handleToggleModuleExpand(module.id)}
              onMoveUp={() => handleMoveModule(idx, "up")}
              onMoveDown={() => handleMoveModule(idx, "down")}
              onRename={(newTitle) => handleRenameModule(module.id, newTitle)}
              onDelete={() => handleDeleteModule(module.id)}
              onAddLesson={() =>
                setTargetModuleForLesson({ id: module.id, title: module.title })
              }
              onMoveLessonUp={(lessonIdx) =>
                handleMoveLesson(module.id, lessonIdx, "up")
              }
              onMoveLessonDown={(lessonIdx) =>
                handleMoveLesson(module.id, lessonIdx, "down")
              }
              onEditLesson={(lesson) =>
                setEditingLessonState({ lesson, moduleId: module.id })
              }
              onDeleteLesson={(lessonId) =>
                handleDeleteLesson(module.id, lessonId)
              }
              onToggleLessonPreview={(lessonId) =>
                handleToggleLessonPreview(module.id, lessonId)
              }
            />
          ))}

          {/* Add Module Bottom Quick Button */}
          <div className="pt-2">
            <button
              type="button"
              onClick={() => setIsAddModuleOpen(true)}
              className="w-full py-4 px-6 rounded-2xl border-2 border-dashed border-border hover:border-primary bg-card hover:bg-primary-light/30 text-foreground hover:text-primary font-bold text-sm flex items-center justify-center gap-2 transition-all shadow-xs"
            >
              <Plus className="w-5 h-5 text-primary" />
              <span>Add Another Course Module</span>
            </button>
          </div>
        </div>
      ) : (
        /* Empty Curriculum State */
        <div className="text-center py-16 px-4 rounded-3xl border border-dashed border-border bg-card shadow-xs">
          <div className="w-14 h-14 rounded-2xl bg-primary-light border border-primary-border flex items-center justify-center text-primary mx-auto mb-4">
            <Layers className="w-7 h-7" />
          </div>
          <h2 className="text-xl font-bold text-foreground">
            Curriculum is Empty
          </h2>
          <p className="text-sm text-muted-foreground mt-1 max-w-md mx-auto">
            Organize your course into structured modules, video lectures, coding guides, and milestone comprehension quizzes.
          </p>
          <div className="mt-6">
            <Button
              variant="primary"
              size="md"
              onClick={() => setIsAddModuleOpen(true)}
              className="gap-2 shadow-xs"
            >
              <Plus className="w-4 h-4" />
              <span>Add Your First Module</span>
            </Button>
          </div>
        </div>
      )}

      {/* Add Module Modal */}
      <AddModuleModal
        isOpen={isAddModuleOpen}
        onClose={() => setIsAddModuleOpen(false)}
        onAddModule={handleAddModule}
        nextModuleNumber={modules.length + 1}
      />

      {/* Add Lesson Modal */}
      {targetModuleForLesson && (
        <AddLessonModal
          isOpen={Boolean(targetModuleForLesson)}
          targetModuleTitle={targetModuleForLesson.title}
          onClose={() => setTargetModuleForLesson(null)}
          onAddLesson={handleAddLesson}
        />
      )}

      {/* Lesson Editor Drawer */}
      {editingLessonState && (
        <LessonEditorDrawer
          isOpen={Boolean(editingLessonState)}
          lesson={editingLessonState.lesson}
          courseId={courseId}
          onClose={() => setEditingLessonState(null)}
          onSave={handleSaveEditedLesson}
        />
      )}
    </div>
  );
}
