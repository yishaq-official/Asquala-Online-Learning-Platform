"use client";

import React from "react";
import { CheckCircle2, Clock, ShieldCheck, AlertCircle } from "lucide-react";
import { InstructorApplicationStatus } from "@/types/instructor";

interface ReviewTimelineStepperProps {
  status: InstructorApplicationStatus;
}

interface TimelineStage {
  id: number;
  title: string;
  subtitle: string;
  description: string;
}

const STAGES: TimelineStage[] = [
  {
    id: 1,
    title: "Application Received",
    subtitle: "Dossier Digitized",
    description: "Personal profile and initial accreditation materials successfully received.",
  },
  {
    id: 2,
    title: "Academic Credential Audit",
    subtitle: "Degree Verification",
    description: "University degree transcripts and institutional accreditation validated.",
  },
  {
    id: 3,
    title: "Industry & Pedagogical Review",
    subtitle: "Experience & Certifications",
    description: "Software engineering track record and technical certifications audited.",
  },
  {
    id: 4,
    title: "Academic Board Decision",
    subtitle: "Final Accreditation",
    description: "Issuance of Verified Educator credentials and studio creator privileges.",
  },
];

export function ReviewTimelineStepper({ status }: ReviewTimelineStepperProps) {
  // Determine progress stage index (1-based)
  let activeStage = 2; // Default for under_review
  if (status === "submitted") activeStage = 1;
  if (status === "under_review") activeStage = 3;
  if (status === "approved") activeStage = 5; // All complete
  if (status === "action_required") activeStage = 2;

  return (
    <div className="bg-card border border-border rounded-2xl p-6 sm:p-7 shadow-xs space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-border/80 pb-4">
        <div>
          <h2 className="text-base font-bold text-foreground flex items-center gap-2">
            <ShieldCheck className="w-5 h-5 text-primary" />
            Accreditation Audit Pipeline
          </h2>
          <p className="text-xs text-muted-foreground mt-0.5">
            Four-stage independent academic verification process by Asquala reviewers.
          </p>
        </div>

        {/* Live Status Pill */}
        <div className="flex items-center gap-2">
          {status === "under_review" && (
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-amber-50 text-amber-700 border border-amber-200">
              <span className="w-2 h-2 rounded-full bg-amber-500 animate-pulse" />
              Under Academic Audit
            </span>
          )}
          {status === "approved" && (
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-primary-light text-primary border border-primary-border">
              <CheckCircle2 className="w-3.5 h-3.5" />
              Accredited Educator
            </span>
          )}
          {status === "action_required" && (
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-rose-50 text-rose-700 border border-rose-200">
              <AlertCircle className="w-3.5 h-3.5" />
              Action Required
            </span>
          )}
          {status === "submitted" && (
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-secondary text-muted-foreground border border-border">
              <Clock className="w-3.5 h-3.5" />
              Queued for Review
            </span>
          )}
        </div>
      </div>

      {/* Responsive Stages Pipeline */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 relative">
        {STAGES.map((stage) => {
          const isDone = stage.id < activeStage || status === "approved";
          const isCurrent =
            stage.id === activeStage && status !== "approved" && status !== "action_required";
          const isWarning =
            stage.id === activeStage && status === "action_required";

          return (
            <div
              key={stage.id}
              className={`p-4 rounded-xl border transition-all ${
                isDone
                  ? "bg-primary-light/30 border-primary-border/80"
                  : isCurrent
                  ? "bg-amber-50/50 border-amber-300 ring-2 ring-amber-100"
                  : isWarning
                  ? "bg-rose-50/50 border-rose-300 ring-2 ring-rose-100"
                  : "bg-secondary/20 border-border text-muted-foreground opacity-75"
              }`}
            >
              <div className="flex items-center justify-between mb-2">
                <span className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">
                  Stage {stage.id}
                </span>
                {isDone ? (
                  <CheckCircle2 className="w-4 h-4 text-primary" />
                ) : isCurrent ? (
                  <span className="w-2.5 h-2.5 rounded-full bg-amber-500 animate-pulse" />
                ) : isWarning ? (
                  <AlertCircle className="w-4 h-4 text-rose-600" />
                ) : (
                  <Clock className="w-3.5 h-3.5 text-muted-foreground/60" />
                )}
              </div>

              <div className="space-y-1">
                <h3
                  className={`text-xs font-bold ${
                    isDone
                      ? "text-primary"
                      : isCurrent
                      ? "text-amber-800"
                      : isWarning
                      ? "text-rose-800"
                      : "text-foreground"
                  }`}
                >
                  {stage.title}
                </h3>
                <p className="text-[11px] font-medium text-muted-foreground">
                  {stage.subtitle}
                </p>
                <p className="text-[11px] text-muted-foreground leading-relaxed pt-1">
                  {stage.description}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
