"use client";

import * as React from "react";
import Link from "next/link";
import { Award, CheckCircle2, Clock, BookOpen, ShieldCheck, ArrowRight } from "lucide-react";

interface CourseCertificateTrackerProps {
  progressPercentage: number;
  remainingLessons: number;
  totalHours: number;
  totalLessons: number;
  courseTitle: string;
}

export function CourseCertificateTracker({
  progressPercentage,
  remainingLessons,
  totalHours,
  totalLessons,
  courseTitle,
}: CourseCertificateTrackerProps) {
  const isEligible = progressPercentage === 100;

  return (
    <div className="space-y-5">
      {/* Certificate Progress Card */}
      <div className="bg-card border border-border rounded-2xl p-6 shadow-2xs space-y-4">
        <div className="flex items-center gap-3">
          <div
            className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 border ${
              isEligible
                ? "bg-primary-light text-primary border-primary-border"
                : "bg-amber-50 text-amber-600 border-amber-200"
            }`}
          >
            <Award className="w-5 h-5" />
          </div>

          <div>
            <h3 className="font-bold text-sm sm:text-base text-foreground leading-snug">
              {isEligible ? "Certificate Unlocked! 🎉" : "Certificate Track"}
            </h3>
            <p className="text-xs text-muted-foreground">
              {isEligible ? "Verified credential ready" : "Official completion badge"}
            </p>
          </div>
        </div>

        {isEligible ? (
          <div className="space-y-3 pt-1">
            <div className="p-3 rounded-xl bg-primary-light/40 border border-primary-border text-xs text-primary font-semibold flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 shrink-0" />
              <span>You have completed all requirements!</span>
            </div>
            <Link
              href="/student/certificates"
              className="w-full inline-flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-primary text-white text-xs font-bold hover:bg-primary-hover shadow-xs transition-colors"
            >
              <span>View Your Certificate</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        ) : (
          <div className="space-y-3 pt-1">
            <p className="text-xs text-muted-foreground leading-relaxed">
              Complete <strong className="text-foreground">{remainingLessons} more lessons</strong> to unlock your verified industry credential.
            </p>

            <div className="space-y-1">
              <div className="flex items-center justify-between text-xs font-semibold">
                <span className="text-muted-foreground">Progress to Certificate</span>
                <span className="text-primary font-bold">{progressPercentage}%</span>
              </div>
              <div className="h-2 w-full bg-secondary rounded-full overflow-hidden">
                <div
                  className="h-full bg-primary rounded-full transition-all duration-500"
                  style={{ width: `${progressPercentage}%` }}
                />
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Course Overview Stats Box */}
      <div className="bg-card border border-border rounded-2xl p-6 shadow-2xs space-y-3.5">
        <h4 className="text-xs font-bold text-foreground uppercase tracking-wider">
          Curriculum Overview
        </h4>

        <div className="space-y-2.5 text-xs text-muted-foreground">
          <div className="flex items-center justify-between">
            <span className="flex items-center gap-2">
              <Clock className="w-3.5 h-3.5 text-primary" />
              <span>Total Duration</span>
            </span>
            <span className="font-semibold text-foreground">{totalHours} Hours</span>
          </div>

          <div className="flex items-center justify-between">
            <span className="flex items-center gap-2">
              <BookOpen className="w-3.5 h-3.5 text-primary" />
              <span>Total Lessons</span>
            </span>
            <span className="font-semibold text-foreground">{totalLessons} Modules & Lessons</span>
          </div>

          <div className="flex items-center justify-between">
            <span className="flex items-center gap-2">
              <ShieldCheck className="w-3.5 h-3.5 text-primary" />
              <span>Accreditation</span>
            </span>
            <span className="font-semibold text-foreground">Verified by Asquala</span>
          </div>
        </div>
      </div>
    </div>
  );
}
