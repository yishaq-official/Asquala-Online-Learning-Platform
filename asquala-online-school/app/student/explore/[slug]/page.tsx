"use client";

import * as React from "react";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { getCourseDetailBySlug } from "@/lib/mock-student-data";
import { useCourseProgressStore } from "@/stores/course-progress-store";
import { CoursePreviewHero } from "@/components/student/course-preview/course-preview-hero";
import { WhatYouWillLearn } from "@/components/student/course-preview/what-you-will-learn";
import { CourseCurriculumPreview } from "@/components/student/course-preview/course-curriculum-preview";
import { InstructorProfileCard } from "@/components/student/course-preview/instructor-profile-card";
import { EnrollmentStickyCard } from "@/components/student/course-preview/enrollment-sticky-card";
import { EnrollmentSuccessModal } from "@/components/student/course-preview/enrollment-success-modal";
import { Compass, CheckCircle2, AlertCircle } from "lucide-react";

export default function CoursePreviewPage() {
  const params = useParams();
  const router = useRouter();
  const slug = typeof params?.slug === "string" ? params.slug : "";

  const course = React.useMemo(() => {
    return slug ? getCourseDetailBySlug(slug) : null;
  }, [slug]);

  const { enrolledCourseSlugs, enrollInCourse } = useCourseProgressStore();
  const isEnrolled = enrolledCourseSlugs.includes(slug);

  const [isEnrolling, setIsEnrolling] = React.useState(false);
  const [isSuccessModalOpen, setIsSuccessModalOpen] = React.useState(false);

  const handleEnroll = () => {
    setIsEnrolling(true);
    setTimeout(() => {
      enrollInCourse(slug);
      setIsEnrolling(false);
      setIsSuccessModalOpen(true);
    }, 400);
  };

  if (!course) {
    return (
      <div className="bg-card border border-border rounded-2xl p-12 text-center max-w-lg mx-auto my-12 space-y-4 shadow-2xs">
        <div className="w-14 h-14 rounded-2xl bg-secondary text-muted-foreground flex items-center justify-center mx-auto border border-border">
          <AlertCircle className="w-7 h-7" />
        </div>
        <h2 className="text-xl font-bold text-foreground">Course Not Found</h2>
        <p className="text-xs sm:text-sm text-muted-foreground">
          The requested course with identifier &ldquo;{slug}&rdquo; could not be found in our catalog.
        </p>
        <div className="pt-2">
          <Link
            href="/student/explore"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-primary text-white text-xs font-semibold hover:bg-primary-hover shadow-2xs transition-colors"
          >
            <Compass className="w-4 h-4" />
            <span>Browse All Courses</span>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8 animate-in fade-in-0 duration-300">
      {/* Top Hero Banner */}
      <CoursePreviewHero course={course} />

      {/* Main 2-Column Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
        {/* Left Column: Learning Outcomes, Curriculum & Instructor */}
        <div className="lg:col-span-2 space-y-8">
          {/* What You Will Learn */}
          <WhatYouWillLearn outcomes={course.whatYouWillLearn} />

          {/* Curriculum Accordion */}
          <CourseCurriculumPreview modules={course.modules} />

          {/* Prerequisites */}
          {course.prerequisites && course.prerequisites.length > 0 && (
            <div className="bg-card border border-border rounded-2xl p-6 sm:p-7 shadow-2xs space-y-3">
              <h2 className="text-base sm:text-lg font-bold text-foreground">
                Prerequisites & Requirements
              </h2>
              <ul className="space-y-2 text-xs sm:text-sm text-muted-foreground">
                {course.prerequisites.map((req, i) => (
                  <li key={i} className="flex items-start gap-2.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-primary mt-2 shrink-0" />
                    <span>{req}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Instructor Profile Card */}
          <InstructorProfileCard instructor={course.instructor} />
        </div>

        {/* Right Column: Sticky Enrollment Card */}
        <div className="lg:col-span-1">
          <EnrollmentStickyCard
            course={course}
            isEnrolled={isEnrolled}
            onEnroll={handleEnroll}
            isSubmitting={isEnrolling}
          />
        </div>
      </div>

      {/* Success Modal Confirmation */}
      <EnrollmentSuccessModal
        isOpen={isSuccessModalOpen}
        onClose={() => setIsSuccessModalOpen(false)}
        courseTitle={course.title}
        courseSlug={course.slug}
      />
    </div>
  );
}
