"use client";

import * as React from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import {
  getCourseDetailBySlug,
  MOCK_COURSE_RESOURCES,
  MOCK_COURSE_ANNOUNCEMENTS,
} from "@/lib/mock-student-data";
import { useCourseProgressStore } from "@/stores/course-progress-store";
import { CourseHubHeader } from "@/components/student/course-hub/course-hub-header";
import { CourseSyllabusAccordion } from "@/components/student/course-hub/course-syllabus-accordion";
import { CourseResourcesList } from "@/components/student/course-hub/course-resources-list";
import { CourseAnnouncementsFeed } from "@/components/student/course-hub/course-announcements-feed";
import { CourseCertificateTracker } from "@/components/student/course-hub/course-certificate-tracker";
import { BookOpen, Download, Megaphone, AlertCircle, Compass } from "lucide-react";

type HubTab = "syllabus" | "resources" | "announcements";

export default function StudentCourseHubPage() {
  const params = useParams();
  const slug = typeof params?.slug === "string" ? params.slug : "";

  const course = React.useMemo(() => {
    return slug ? getCourseDetailBySlug(slug) : null;
  }, [slug]);

  const { completedLessonIds } = useCourseProgressStore();
  const [activeTab, setActiveTab] = React.useState<HubTab>("syllabus");

  // Calculate live progress for this course
  const { allLessons, completedCount, totalCount, progressPercentage, nextLessonId } =
    React.useMemo(() => {
      if (!course) {
        return {
          allLessons: [],
          completedCount: 0,
          totalCount: 0,
          progressPercentage: 0,
          nextLessonId: "lesson-1-1",
        };
      }

      const lessons = course.modules.flatMap((m) => m.lessons);
      const done = lessons.filter((l) => completedLessonIds.includes(l.id)).length;
      const pct = lessons.length > 0 ? Math.round((done / lessons.length) * 100) : 0;
      const firstIncomplete = lessons.find((l) => !completedLessonIds.includes(l.id));

      return {
        allLessons: lessons,
        completedCount: done,
        totalCount: lessons.length,
        progressPercentage: pct,
        nextLessonId: firstIncomplete?.id || lessons[0]?.id || "lesson-1-1",
      };
    }, [course, completedLessonIds]);

  if (!course) {
    return (
      <div className="bg-card border border-border rounded-2xl p-12 text-center max-w-lg mx-auto my-12 space-y-4 shadow-2xs">
        <div className="w-14 h-14 rounded-2xl bg-secondary text-muted-foreground flex items-center justify-center mx-auto border border-border">
          <AlertCircle className="w-7 h-7" />
        </div>
        <h2 className="text-xl font-bold text-foreground">Course Not Found</h2>
        <p className="text-xs sm:text-sm text-muted-foreground">
          The requested course with identifier &ldquo;{slug}&rdquo; could not be loaded.
        </p>
        <div className="pt-2">
          <Link
            href="/student/courses"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-primary text-white text-xs font-semibold hover:bg-primary-hover shadow-2xs transition-colors"
          >
            <Compass className="w-4 h-4" />
            <span>Back to My Courses</span>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8 animate-in fade-in-0 duration-300">
      {/* Top Header Banner */}
      <CourseHubHeader
        course={course}
        completedLessonsCount={completedCount}
        totalLessonsCount={totalCount}
        progressPercentage={progressPercentage}
        nextLessonId={nextLessonId}
      />

      {/* Navigation Tabs */}
      <div className="flex items-center gap-2 p-1 bg-secondary rounded-xl border border-border w-fit overflow-x-auto max-w-full">
        <button
          type="button"
          onClick={() => setActiveTab("syllabus")}
          className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-bold transition-all cursor-pointer shrink-0 ${
            activeTab === "syllabus"
              ? "bg-card text-foreground shadow-xs border border-border"
              : "text-muted-foreground hover:text-foreground"
          }`}
        >
          <BookOpen className="w-4 h-4 text-primary" />
          <span>Syllabus & Modules</span>
          <span className="px-1.5 py-0.2 rounded-full text-[10px] bg-primary-light text-primary font-semibold">
            {course.modules.length}
          </span>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab("resources")}
          className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-bold transition-all cursor-pointer shrink-0 ${
            activeTab === "resources"
              ? "bg-card text-foreground shadow-xs border border-border"
              : "text-muted-foreground hover:text-foreground"
          }`}
        >
          <Download className="w-4 h-4 text-primary" />
          <span>Resources & Code</span>
          <span className="px-1.5 py-0.2 rounded-full text-[10px] bg-secondary text-muted-foreground font-semibold">
            {MOCK_COURSE_RESOURCES.length}
          </span>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab("announcements")}
          className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-bold transition-all cursor-pointer shrink-0 ${
            activeTab === "announcements"
              ? "bg-card text-foreground shadow-xs border border-border"
              : "text-muted-foreground hover:text-foreground"
          }`}
        >
          <Megaphone className="w-4 h-4 text-primary" />
          <span>Announcements</span>
          <span className="px-1.5 py-0.2 rounded-full text-[10px] bg-secondary text-muted-foreground font-semibold">
            {MOCK_COURSE_ANNOUNCEMENTS.length}
          </span>
        </button>
      </div>

      {/* Main 2-Column Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
        {/* Main Column */}
        <div className="lg:col-span-2 space-y-6">
          {activeTab === "syllabus" && (
            <CourseSyllabusAccordion
              courseSlug={course.slug}
              modules={course.modules}
              completedLessonIds={completedLessonIds}
            />
          )}

          {activeTab === "resources" && (
            <CourseResourcesList resources={MOCK_COURSE_RESOURCES} />
          )}

          {activeTab === "announcements" && (
            <CourseAnnouncementsFeed announcements={MOCK_COURSE_ANNOUNCEMENTS} />
          )}
        </div>

        {/* Sidebar Column */}
        <div className="lg:col-span-1">
          <CourseCertificateTracker
            progressPercentage={progressPercentage}
            remainingLessons={Math.max(0, totalCount - completedCount)}
            totalHours={course.durationHours}
            totalLessons={totalCount}
            courseTitle={course.title}
          />
        </div>
      </div>
    </div>
  );
}
