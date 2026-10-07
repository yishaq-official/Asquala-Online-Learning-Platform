"use client";

import * as React from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { MOCK_CATALOG_COURSES } from "@/lib/mock-student-data";
import { CourseCatalogCard } from "@/components/student/explore/course-catalog-card";
import { CourseCategoryPills } from "@/components/student/explore/course-category-pills";
import { CourseSearchInput } from "@/components/student/explore/course-search-input";
import {
  CourseFilterBar,
  SortOption,
} from "@/components/student/explore/course-filter-bar";
import { CourseEmptyState } from "@/components/student/explore/course-empty-state";
import { CourseCategory } from "@/types/student";
import { Compass, Sparkles } from "lucide-react";

function ExploreContent() {
  const router = useRouter();
  const searchParams = useSearchParams();

  // Initial states from URL params or defaults
  const initialQuery = searchParams.get("q") || "";
  const initialCategory = (searchParams.get("category") as CourseCategory) || "All";
  const initialLevel = searchParams.get("level") || "All";

  const [searchQuery, setSearchQuery] = React.useState(initialQuery);
  const [selectedCategory, setSelectedCategory] = React.useState<CourseCategory>(initialCategory);
  const [selectedLevel, setSelectedLevel] = React.useState(initialLevel);
  const [selectedSort, setSelectedSort] = React.useState<SortOption>("popular");
  const [hideEnrolled, setHideEnrolled] = React.useState(false);

  // Sync state if URL query param changes (e.g. from global header search)
  React.useEffect(() => {
    const q = searchParams.get("q");
    if (q !== null && q !== searchQuery) {
      setSearchQuery(q);
    }
  }, [searchParams]);

  // Update URL search parameters when filters change
  const updateUrlParams = React.useCallback(
    (q: string, cat: string, lvl: string) => {
      const params = new URLSearchParams();
      if (q) params.set("q", q);
      if (cat && cat !== "All") params.set("category", cat);
      if (lvl && lvl !== "All") params.set("level", lvl);

      const queryString = params.toString();
      router.replace(queryString ? `/student/explore?${queryString}` : "/student/explore", {
        scroll: false,
      });
    },
    [router]
  );

  const handleSearchChange = (query: string) => {
    setSearchQuery(query);
    updateUrlParams(query, selectedCategory, selectedLevel);
  };

  const handleCategorySelect = (category: CourseCategory) => {
    setSelectedCategory(category);
    updateUrlParams(searchQuery, category, selectedLevel);
  };

  const handleLevelSelect = (level: string) => {
    setSelectedLevel(level);
    updateUrlParams(searchQuery, selectedCategory, level);
  };

  const handleResetFilters = () => {
    setSearchQuery("");
    setSelectedCategory("All");
    setSelectedLevel("All");
    setSelectedSort("popular");
    setHideEnrolled(false);
    router.replace("/student/explore", { scroll: false });
  };

  // Filter and sort computation
  const filteredCourses = React.useMemo(() => {
    return MOCK_CATALOG_COURSES.filter((course) => {
      // Search text match
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase().trim();
        const matchesTitle = course.title.toLowerCase().includes(query);
        const matchesSummary = course.summary.toLowerCase().includes(query);
        const matchesInstructor = course.instructor.name.toLowerCase().includes(query);
        const matchesCategory = course.category.toLowerCase().includes(query);
        if (!matchesTitle && !matchesSummary && !matchesInstructor && !matchesCategory) {
          return false;
        }
      }

      // Category match
      if (selectedCategory !== "All" && course.category !== selectedCategory) {
        return false;
      }

      // Difficulty level match
      if (selectedLevel !== "All" && course.level !== selectedLevel) {
        return false;
      }

      // Hide enrolled match
      if (hideEnrolled && course.isEnrolled) {
        return false;
      }

      return true;
    }).sort((a, b) => {
      if (selectedSort === "popular") return b.reviewCount - a.reviewCount;
      if (selectedSort === "highest_rated") return b.rating - a.rating;
      if (selectedSort === "duration") return a.durationHours - b.durationHours;
      return 0;
    });
  }, [searchQuery, selectedCategory, selectedLevel, selectedSort, hideEnrolled]);

  return (
    <div className="space-y-6 animate-in fade-in-0 duration-300">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-primary-light text-primary text-xs font-semibold mb-2 border border-primary-border">
            <Compass className="w-3.5 h-3.5" />
            <span>Course Catalog & Curriculum Discovery</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-foreground">
            Explore Courses
          </h1>
          <p className="text-xs sm:text-sm text-muted-foreground mt-1 max-w-2xl">
            Advance your career with industry-tailored tracks, from full-stack systems to modern design architectures.
          </p>
        </div>

        {/* Results Counter Pill */}
        <div className="text-xs font-semibold px-3 py-1.5 rounded-xl bg-card border border-border text-muted-foreground w-fit">
          Showing <span className="text-foreground font-bold">{filteredCourses.length}</span> of{" "}
          <span>{MOCK_CATALOG_COURSES.length}</span> courses
        </div>
      </div>

      {/* Filter Controls Card */}
      <div className="bg-card border border-border rounded-2xl p-4 sm:p-5 shadow-2xs space-y-4">
        {/* Search Bar */}
        <CourseSearchInput value={searchQuery} onChange={handleSearchChange} />

        {/* Horizontal Category Pills */}
        <CourseCategoryPills
          selectedCategory={selectedCategory}
          onSelectCategory={handleCategorySelect}
        />

        {/* Level, Duration, Sort & Hide Enrolled Bar */}
        <CourseFilterBar
          selectedLevel={selectedLevel}
          onSelectLevel={handleLevelSelect}
          selectedSort={selectedSort}
          onSelectSort={setSelectedSort}
          hideEnrolled={hideEnrolled}
          onToggleHideEnrolled={setHideEnrolled}
        />
      </div>

      {/* Course Catalog Grid */}
      {filteredCourses.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 pt-1">
          {filteredCourses.map((course) => (
            <CourseCatalogCard key={course.id} course={course} />
          ))}
        </div>
      ) : (
        <CourseEmptyState onResetFilters={handleResetFilters} />
      )}
    </div>
  );
}

export default function StudentExplorePage() {
  return (
    <React.Suspense fallback={<div className="h-96 animate-pulse bg-secondary/50 rounded-2xl" />}>
      <ExploreContent />
    </React.Suspense>
  );
}
