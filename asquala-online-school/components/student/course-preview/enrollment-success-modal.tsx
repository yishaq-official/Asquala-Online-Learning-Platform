"use client";

import * as React from "react";
import Link from "next/link";
import Image from "next/image";
import { CheckCircle2, ArrowRight, X } from "lucide-react";

interface EnrollmentSuccessModalProps {
  isOpen: boolean;
  onClose: () => void;
  courseTitle: string;
  courseSlug: string;
}

export function EnrollmentSuccessModal({
  isOpen,
  onClose,
  courseTitle,
  courseSlug,
}: EnrollmentSuccessModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-slate-900/50 backdrop-blur-xs transition-opacity animate-in fade-in-0"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Modal Dialog */}
      <div className="relative w-full max-w-md bg-card border border-primary-border rounded-2xl p-6 sm:p-7 shadow-2xl z-50 space-y-5 animate-in zoom-in-95 duration-200 text-center">
        {/* Close Button */}
        <button
          type="button"
          onClick={onClose}
          className="absolute top-4 right-4 p-1.5 rounded-lg text-muted-foreground hover:text-foreground hover:bg-secondary cursor-pointer"
          aria-label="Close dialog"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Celebration Emblem with Official Logo */}
        <div className="relative w-16 h-16 rounded-2xl bg-primary-light flex items-center justify-center mx-auto border-2 border-primary-border shadow-xs p-2">
          <Image
            src="/images/logo.png"
            alt="Asquala Logo"
            width={48}
            height={48}
            className="w-12 h-12 object-contain"
            priority
          />
        </div>

        {/* Text */}
        <div className="space-y-1.5">
          <div className="inline-flex items-center gap-1 text-xs font-bold text-primary">
            <CheckCircle2 className="w-3.5 h-3.5" />
            <span>Enrollment Confirmed</span>
          </div>
          <h3 className="text-xl font-bold text-foreground">Welcome to the Course! 🎉</h3>
          <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
            You now have complete access to all modules, quizzes, and materials in{" "}
            <strong className="text-foreground">{courseTitle}</strong>.
          </p>
        </div>

        {/* Actions */}
        <div className="space-y-2.5 pt-2">
          <Link
            href={`/student/courses/${courseSlug}`}
            className="w-full inline-flex items-center justify-center gap-2 py-3 px-5 rounded-xl bg-primary text-white text-sm font-semibold hover:bg-primary-hover shadow-sm transition-all"
          >
            <span>Start First Lesson Now</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
          <button
            type="button"
            onClick={onClose}
            className="w-full py-2.5 px-4 text-xs font-semibold text-muted-foreground hover:text-foreground transition-colors cursor-pointer"
          >
            Stay on Overview Page
          </button>
        </div>
      </div>
    </div>
  );
}
