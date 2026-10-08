"use client";

import React from "react";
import { useParams } from "next/navigation";
import {
  getInstructorCourseById,
  MOCK_INSTRUCTOR_COURSES,
} from "@/lib/mock-instructor-data";
import { CourseBuilderHeader } from "@/components/instructor/courses/course-builder-header";

export default function CourseBuilderLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const params = useParams();
  const courseId = typeof params?.courseId === "string" ? params.courseId : "";

  // Lookup course or fallback
  const course =
    getInstructorCourseById(courseId) ||
    MOCK_INSTRUCTOR_COURSES[0] || {
      id: courseId || "new-course",
      title: "Untitled Course",
      slug: "untitled-course",
      thumbnailUrl:
        "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&w=800&q=80",
      category: "Web Development",
      status: "draft" as const,
      price: 0,
      enrolledStudentsCount: 0,
      averageRating: 0,
      reviewsCount: 0,
      totalLessonsCount: 0,
      totalDurationMinutes: 0,
      lastUpdatedAt: "Just now",
    };

  return (
    <div className="min-h-full">
      <CourseBuilderHeader course={course} />
      <div className="pb-16">{children}</div>
    </div>
  );
}
