"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import { Plus, BookOpen, Layers, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  CourseStatusTabs,
  FilterStatusTab,
} from "@/components/instructor/courses/course-status-tabs";
import { CourseSearchBar } from "@/components/instructor/courses/course-search-bar";
import { InstructorCourseCard } from "@/components/instructor/courses/instructor-course-card";
import { CourseEmptyState } from "@/components/instructor/courses/course-empty-state";
import { MOCK_INSTRUCTOR_COURSES } from "@/lib/mock-instructor-data";

export default function InstructorCoursesPage() {
  const [activeTab, setActiveTab] = useState<FilterStatusTab>("all");
  const [searchQuery, setSearchQuery] = useState("");

  // Tab counts calculation
  const counts = useMemo(() => {
    return {
      all: MOCK_INSTRUCTOR_COURSES.length,
      published: MOCK_INSTRUCTOR_COURSES.filter((c) => c.status === "published").length,
      draft: MOCK_INSTRUCTOR_COURSES.filter((c) => c.status === "draft").length,
      under_review: MOCK_INSTRUCTOR_COURSES.filter((c) => c.status === "under_review").length,
      archived: MOCK_INSTRUCTOR_COURSES.filter((c) => c.status === "archived").length,
    };
  }, []);

  // Filtered courses
  const filteredCourses = useMemo(() => {
    return MOCK_INSTRUCTOR_COURSES.filter((course) => {
      // Tab match
      if (activeTab !== "all" && course.status !== activeTab) {
        return false;
      }

      // Query match
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase().trim();
        const matchesTitle = course.title.toLowerCase().includes(q);
        const matchesCategory = course.category.toLowerCase().includes(q);
        return matchesTitle || matchesCategory;
      }

      return true;
    });
  }, [activeTab, searchQuery]);

  return (
    <div className="space-y-6 sm:space-y-8">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-primary-light text-primary border border-primary-border mb-1.5">
            <Layers className="w-3.5 h-3.5" />
            <span>COURSE STUDIO PORTFOLIO</span>
          </div>

          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-foreground">
            My Courses &amp; Curricula
          </h1>
          <p className="text-xs sm:text-sm text-muted-foreground mt-1 max-w-2xl">
            Create, manage modules, edit video lessons, and review technical assessments across your teaching portfolio.
          </p>
        </div>

        <Link href="/instructor/courses/create" className="shrink-0">
          <Button variant="primary" size="md" className="gap-2 shadow-xs">
            <Plus className="w-4 h-4" />
            <span>Create New Course</span>
          </Button>
        </Link>
      </div>

      {/* Filter & Search Toolbar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-2">
        <CourseStatusTabs
          activeTab={activeTab}
          onTabChange={setActiveTab}
          counts={counts}
        />

        <CourseSearchBar
          value={searchQuery}
          onChange={setSearchQuery}
        />
      </div>

      {/* Courses Grid / Empty State */}
      {filteredCourses.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCourses.map((course) => (
            <InstructorCourseCard key={course.id} course={course} />
          ))}
        </div>
      ) : (
        <CourseEmptyState
          hasFilter={Boolean(searchQuery || activeTab !== "all")}
          onClearFilter={() => {
            setSearchQuery("");
            setActiveTab("all");
          }}
        />
      )}
    </div>
  );
}
