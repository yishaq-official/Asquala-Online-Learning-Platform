"use client";

import * as React from "react";
import Link from "next/link";
import { MOCK_ENROLLED_COURSES, MOCK_CATALOG_COURSES } from "@/lib/mock-student-data";
import { useCourseProgressStore } from "@/stores/course-progress-store";
import { CourseProgressCard } from "@/components/student/my-courses/course-progress-card";
import {
  CourseLibraryTabs,
  LibraryTab,
} from "@/components/student/my-courses/course-library-tabs";
import {
  CourseLibrarySearch,
  LibrarySort,
} from "@/components/student/my-courses/course-library-search";
import { CourseLibraryEmptyState } from "@/components/student/my-courses/course-library-empty-state";
import { BookOpen, Compass, Sparkles } from "lucide-react";
import { EnrolledCourseItem } from "@/types/student";

export default function StudentCoursesPage() {
  const { enrolledCourseSlugs } = useCourseProgressStore();

  const [activeTab, setActiveTab] = React.useState<LibraryTab>("all");
  const [searchQuery, setSearchQuery] = React.useState("");
  const [sortOption, setSortOption] = React.useState<LibrarySort>("recent");

  // Merge mock enrolled courses with any newly enrolled courses from store
  const allEnrolledCourses = React.useMemo<EnrolledCourseItem[]>(() => {
    const existingSlugs = new Set(MOCK_ENROLLED_COURSES.map((c) => c.slug));
    const extraCourses: EnrolledCourseItem[] = [];

    enrolledCourseSlugs.forEach((slug) => {
      if (!existingSlugs.has(slug)) {
        const catalogItem = MOCK_CATALOG_COURSES.find((c) => c.slug === slug);
        if (catalogItem) {
          extraCourses.push({
            courseId: catalogItem.id,
            slug: catalogItem.slug,
            title: catalogItem.title,
            thumbnailUrl: catalogItem.thumbnailUrl,
            category: catalogItem.category,
            instructorName: catalogItem.instructor.name,
            lastAccessedAt: "Just now",
            completedLessons: 0,
            totalLessons: catalogItem.lessonsCount,
            progressPercentage: 0,
            nextLessonId: "lesson-1-1",
            nextLessonTitle: "Module 1: Orientation",
            isCompleted: false,
          });
        }
      }
    });

    return [...MOCK_ENROLLED_COURSES, ...extraCourses];
  }, [enrolledCourseSlugs]);

  // Tab counts
  const counts = React.useMemo(() => {
    const inProgress = allEnrolledCourses.filter((c) => !c.isCompleted && c.progressPercentage < 100).length;
    const completed = allEnrolledCourses.filter((c) => c.isCompleted || c.progressPercentage === 100).length;
    return {
      all: allEnrolledCourses.length,
      inProgress,
      completed,
    };
  }, [allEnrolledCourses]);

  // Filtered & Sorted list
  const filteredCourses = React.useMemo(() => {
    return allEnrolledCourses
      .filter((course) => {
        // Tab filter
        const isFinished = course.isCompleted || course.progressPercentage === 100;
        if (activeTab === "in_progress" && isFinished) return false;
        if (activeTab === "completed" && !isFinished) return false;

        // Search text filter
        if (searchQuery.trim()) {
          const q = searchQuery.toLowerCase().trim();
          const matchTitle = course.title.toLowerCase().includes(q);
          const matchInstructor = course.instructorName.toLowerCase().includes(q);
          const matchCategory = course.category.toLowerCase().includes(q);
          if (!matchTitle && !matchInstructor && !matchCategory) return false;
        }

        return true;
      })
      .sort((a, b) => {
        if (sortOption === "progress") return b.progressPercentage - a.progressPercentage;
        if (sortOption === "title") return a.title.localeCompare(b.title);
        return 0; // Default: recent
      });
  }, [allEnrolledCourses, activeTab, searchQuery, sortOption]);

  return (
    <div className="space-y-6 animate-in fade-in-0 duration-300">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-primary-light text-primary text-xs font-semibold mb-2 border border-primary-border">
            <BookOpen className="w-3.5 h-3.5" />
            <span>Student Learning Hub</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-foreground">
            My Course Library
          </h1>
          <p className="text-xs sm:text-sm text-muted-foreground mt-1 max-w-2xl">
            Track your ongoing courses, resume active modules, and review your completed achievements.
          </p>
        </div>

        <Link
          href="/student/explore"
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-secondary hover:bg-card border border-border text-foreground text-xs font-bold transition-all shadow-2xs shrink-0 w-fit"
        >
          <Compass className="w-4 h-4 text-primary" />
          <span>Explore More Courses</span>
        </Link>
      </div>

      {/* Tabs & Search Controls */}
      <div className="flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-4 pt-1">
        <CourseLibraryTabs
          activeTab={activeTab}
          onTabChange={setActiveTab}
          counts={counts}
        />

        <div className="lg:max-w-md w-full">
          <CourseLibrarySearch
            searchValue={searchQuery}
            onSearchChange={setSearchQuery}
            sortOption={sortOption}
            onSortChange={setSortOption}
          />
        </div>
      </div>

      {/* Courses List */}
      {filteredCourses.length > 0 ? (
        <div className="space-y-4 pt-1">
          {filteredCourses.map((course) => (
            <CourseProgressCard key={course.courseId} course={course} />
          ))}
        </div>
      ) : (
        <CourseLibraryEmptyState
          tab={activeTab}
          isSearching={Boolean(searchQuery.trim())}
          onResetSearch={() => setSearchQuery("")}
        />
      )}
    </div>
  );
}
