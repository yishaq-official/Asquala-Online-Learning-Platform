"use client";

import * as React from "react";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { getCourseDetailBySlug } from "@/lib/mock-student-data";
import { useCourseProgressStore } from "@/stores/course-progress-store";
import { useStudentUiStore } from "@/stores/student-ui-store";
import { LessonPlayerFrame } from "@/components/student/classroom/lesson-player-frame";
import { LessonControlBar } from "@/components/student/classroom/lesson-control-bar";
import { LessonCurriculumDrawer } from "@/components/student/classroom/lesson-curriculum-drawer";
import { LessonTabs } from "@/components/student/classroom/lesson-tabs";
import { AlertCircle, BookOpen } from "lucide-react";

export default function StudentLessonPlayerPage() {
  const params = useParams();
  const router = useRouter();

  const slug = typeof params?.slug === "string" ? params.slug : "";
  const lessonId = typeof params?.lessonId === "string" ? params.lessonId : "";

  const course = React.useMemo(() => {
    return slug ? getCourseDetailBySlug(slug) : null;
  }, [slug]);

  // Find active lesson and adjacent lessons
  const { allLessons, activeLesson, prevLessonId, nextLessonId } = React.useMemo(() => {
    if (!course) {
      return {
        allLessons: [],
        activeLesson: null,
        prevLessonId: null,
        nextLessonId: null,
      };
    }

    const lessons = course.modules.flatMap((m) => m.lessons);
    const activeIdx = lessons.findIndex((l) => l.id === lessonId);
    const active = activeIdx !== -1 ? lessons[activeIdx] : lessons[0] || null;

    const prevId = activeIdx > 0 ? lessons[activeIdx - 1]?.id || null : null;
    const nextId =
      activeIdx < lessons.length - 1 ? lessons[activeIdx + 1]?.id || null : null;

    return {
      allLessons: lessons,
      activeLesson: active,
      prevLessonId: prevId,
      nextLessonId: nextId,
    };
  }, [course, lessonId]);

  // Stores
  const { completedLessonIds, toggleLessonCompletion } = useCourseProgressStore();
  const { isCurriculumDrawerOpen, toggleCurriculumDrawer, setCurriculumDrawerOpen } =
    useStudentUiStore();

  const isCompleted = activeLesson ? completedLessonIds.includes(activeLesson.id) : false;
  const [isTheaterMode, setIsTheaterMode] = React.useState(false);

  if (!course || !activeLesson) {
    return (
      <div className="bg-card border border-border rounded-2xl p-12 text-center max-w-lg mx-auto my-12 space-y-4 shadow-2xs">
        <div className="w-14 h-14 rounded-2xl bg-secondary text-muted-foreground flex items-center justify-center mx-auto border border-border">
          <AlertCircle className="w-7 h-7" />
        </div>
        <h2 className="text-xl font-bold text-foreground">Lesson Not Found</h2>
        <p className="text-xs sm:text-sm text-muted-foreground">
          The requested lesson could not be located in this course curriculum.
        </p>
        <div className="pt-2">
          <Link
            href={`/student/courses/${slug}`}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-primary text-white text-xs font-semibold hover:bg-primary-hover shadow-2xs transition-colors"
          >
            <BookOpen className="w-4 h-4" />
            <span>Return to Course Hub</span>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6 animate-in fade-in-0 duration-300">
      {/* Top Controls Bar */}
      <LessonControlBar
        courseSlug={course.slug}
        courseTitle={course.title}
        prevLessonId={prevLessonId}
        nextLessonId={nextLessonId}
        isCompleted={isCompleted}
        onToggleComplete={() => toggleLessonCompletion(activeLesson.id)}
        isDrawerOpen={isCurriculumDrawerOpen}
        onToggleDrawer={toggleCurriculumDrawer}
      />

      {/* Main Content Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
        {/* Left Column: Player & Tabs */}
        <div
          className={`space-y-6 transition-all ${
            isCurriculumDrawerOpen && !isTheaterMode
              ? "lg:col-span-2"
              : "lg:col-span-3"
          }`}
        >
          {/* Player Frame */}
          <LessonPlayerFrame
            type={activeLesson.type}
            title={activeLesson.title}
            durationMinutes={activeLesson.durationMinutes}
            thumbnailUrl={course.thumbnailUrl}
            readingContent={activeLesson.readingContent}
            isTheaterMode={isTheaterMode}
            onToggleTheater={() => setIsTheaterMode(!isTheaterMode)}
          />

          {/* Lesson Tabs: Overview, Notes & Q&A */}
          <LessonTabs
            lessonId={activeLesson.id}
            lessonTitle={activeLesson.title}
            courseTitle={course.title}
          />
        </div>

        {/* Right Column: Syllabus Drawer (when open and not theater mode) */}
        {isCurriculumDrawerOpen && !isTheaterMode && (
          <div className="lg:col-span-1 sticky top-20">
            <LessonCurriculumDrawer
              courseSlug={course.slug}
              modules={course.modules}
              currentLessonId={activeLesson.id}
              completedLessonIds={completedLessonIds}
              isOpen={isCurriculumDrawerOpen}
              onClose={() => setCurriculumDrawerOpen(false)}
            />
          </div>
        )}
      </div>
    </div>
  );
}
