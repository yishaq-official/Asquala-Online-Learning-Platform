"use client";

import * as React from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Video,
  FileText,
  Award,
  Infinity,
  HelpCircle,
  MessageSquare,
  CheckCircle,
  Sparkles,
  ArrowRight,
} from "lucide-react";
import { CourseDetail } from "@/types/student";

interface EnrollmentStickyCardProps {
  course: CourseDetail;
  isEnrolled: boolean;
  onEnroll: () => void;
  isSubmitting?: boolean;
}

export function EnrollmentStickyCard({
  course,
  isEnrolled,
  onEnroll,
  isSubmitting = false,
}: EnrollmentStickyCardProps) {
  return (
    <div className="bg-card border border-border rounded-2xl overflow-hidden shadow-md sticky top-20 space-y-6">
      {/* Thumbnail Video Preview Frame */}
      <div className="relative aspect-video w-full bg-secondary">
        <Image
          src={course.thumbnailUrl}
          alt={course.title}
          fill
          className="object-cover"
          sizes="(max-width: 1024px) 100vw, 360px"
        />
        <div className="absolute inset-0 bg-slate-950/30 flex items-center justify-center">
          <div className="w-12 h-12 rounded-full bg-card/90 text-primary flex items-center justify-center shadow-lg backdrop-blur-xs">
            <Video className="w-6 h-6" />
          </div>
        </div>
      </div>

      <div className="px-6 pb-6 space-y-6">
        {/* Pricing & Access Badge */}
        <div className="space-y-1">
          <div className="text-2xl font-bold text-foreground">
            {course.price || "Free with Membership"}
          </div>
          <p className="text-xs text-muted-foreground">
            Full access included with your active student account
          </p>
        </div>

        {/* Primary Action Button */}
        <div>
          {isEnrolled ? (
            <div className="space-y-3">
              <div className="p-3 rounded-xl bg-primary-light text-primary border border-primary-border flex items-center gap-2 text-xs font-semibold">
                <CheckCircle className="w-4 h-4 shrink-0" />
                <span>You are already enrolled in this course!</span>
              </div>
              <Link
                href={`/student/courses/${course.slug}`}
                className="w-full flex items-center justify-center gap-2 py-3.5 px-5 rounded-xl bg-primary text-white text-sm font-bold hover:bg-primary-hover shadow-sm transition-all"
              >
                <span>Go to Classroom Hub</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          ) : (
            <button
              type="button"
              onClick={onEnroll}
              disabled={isSubmitting}
              className="w-full flex items-center justify-center gap-2 py-3.5 px-5 rounded-xl bg-primary text-white text-sm font-bold hover:bg-primary-hover shadow-sm hover:shadow transition-all cursor-pointer disabled:opacity-50"
            >
              <Sparkles className="w-4 h-4" />
              <span>{isSubmitting ? "Enrolling..." : "Enroll in Course"}</span>
            </button>
          )}
        </div>

        {/* Course Inclusions Checklist */}
        <div className="space-y-3 pt-2 border-t border-border/70">
          <h3 className="text-xs font-bold text-foreground uppercase tracking-wider">
            This course includes:
          </h3>

          <ul className="space-y-2.5 text-xs text-muted-foreground">
            <li className="flex items-center gap-2.5">
              <Video className="w-4 h-4 text-primary shrink-0" />
              <span>{course.durationHours} hours on-demand video</span>
            </li>
            <li className="flex items-center gap-2.5">
              <FileText className="w-4 h-4 text-primary shrink-0" />
              <span>{course.lessonsCount} lessons & downloadable code</span>
            </li>
            <li className="flex items-center gap-2.5">
              <HelpCircle className="w-4 h-4 text-primary shrink-0" />
              <span>Module quizzes and checkpoint assessments</span>
            </li>
            <li className="flex items-center gap-2.5">
              <MessageSquare className="w-4 h-4 text-primary shrink-0" />
              <span>Direct lesson Q&A with instructor</span>
            </li>
            <li className="flex items-center gap-2.5">
              <Infinity className="w-4 h-4 text-primary shrink-0" />
              <span>Full lifetime curriculum access</span>
            </li>
            <li className="flex items-center gap-2.5">
              <Award className="w-4 h-4 text-primary shrink-0" />
              <span className="font-semibold text-foreground">
                Verified Certificate of Completion
              </span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
