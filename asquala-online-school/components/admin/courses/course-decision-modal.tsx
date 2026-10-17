"use client";

import React, { useState } from "react";
import {
  ShieldCheck,
  CheckCircle2,
  AlertTriangle,
  XCircle,
  X,
  ArrowRight,
  BookCheck,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { CourseAuditDetail, CoursePublicationStatus } from "@/types/admin";
import { useAdminUiStore } from "@/stores/admin-ui-store";

interface CourseDecisionModalProps {
  course: CourseAuditDetail;
  isOpen: boolean;
  onClose: () => void;
  onRulingRecorded?: (ruling: CoursePublicationStatus) => void;
}

export function CourseDecisionModal({
  course,
  isOpen,
  onClose,
  onRulingRecorded,
}: CourseDecisionModalProps) {
  const { recordCoursePublicationRuling, activeAuditor } = useAdminUiStore();

  const [selectedRuling, setSelectedRuling] = useState<CoursePublicationStatus>(
    course.status === "approved"
      ? "approved"
      : course.status === "rejected"
      ? "rejected"
      : course.status === "revision_requested"
      ? "revision_requested"
      : "approved"
  );

  const [feedbackNote, setFeedbackNote] = useState<string>(
    selectedRuling === "approved"
      ? "Curriculum depth, HD video completeness, and 80% passing milestone quizzes verified. Approved for immediate catalog publishing."
      : selectedRuling === "revision_requested"
      ? "Please ensure each milestone quiz contains a minimum of 5 questions and attach starter repository code."
      : "Course rejected: Content does not meet institutional academic curriculum guidelines."
  );

  const handleRulingSelect = (ruling: CoursePublicationStatus) => {
    setSelectedRuling(ruling);
    if (ruling === "approved") {
      setFeedbackNote(
        "Curriculum depth, HD video completeness, and 80% passing milestone quizzes verified. Approved for immediate catalog publishing."
      );
    } else if (ruling === "revision_requested") {
      setFeedbackNote(
        "Please ensure each milestone quiz contains a minimum of 5 questions and attach starter repository code."
      );
    } else {
      setFeedbackNote(
        "Course rejected: Content does not meet institutional academic curriculum guidelines."
      );
    }
  };

  const handleConfirm = () => {
    recordCoursePublicationRuling(course.id, selectedRuling, feedbackNote);
    if (onRulingRecorded) {
      onRulingRecorded(selectedRuling);
    }
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/70 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="bg-card border border-border rounded-3xl max-w-xl w-full p-6 sm:p-7 shadow-2xl relative space-y-5 animate-in zoom-in-95 duration-200 max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-start justify-between pb-4 border-b border-border">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-100 border border-emerald-300 flex items-center justify-center text-emerald-900 shrink-0">
              <BookCheck className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-bold text-foreground">
                Academic Publishing Decision
              </h3>
              <p className="text-xs text-muted-foreground">
                Evaluating: <strong className="text-foreground">{course.title}</strong>
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="p-2 rounded-xl text-muted-foreground hover:text-foreground hover:bg-secondary cursor-pointer"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Ruling Options */}
        <div className="space-y-3">
          <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground block">
            Select Official Ruling:
          </label>

          {/* Option 1: Approve */}
          <div
            onClick={() => handleRulingSelect("approved")}
            className={`p-3.5 rounded-2xl border cursor-pointer transition-all flex items-start gap-3 ${
              selectedRuling === "approved"
                ? "bg-emerald-50/80 border-emerald-500 ring-2 ring-emerald-500/20"
                : "bg-secondary/40 border-border hover:bg-secondary/70"
            }`}
          >
            <div
              className={`w-5 h-5 rounded-full border flex items-center justify-center shrink-0 mt-0.5 ${
                selectedRuling === "approved"
                  ? "border-emerald-600 bg-emerald-600 text-white"
                  : "border-muted-foreground"
              }`}
            >
              {selectedRuling === "approved" && (
                <CheckCircle2 className="w-3.5 h-3.5" />
              )}
            </div>
            <div className="min-w-0">
              <p className="text-xs font-bold text-foreground">
                Approve & Publish to Student Catalog
              </p>
              <p className="text-[11px] text-muted-foreground mt-0.5">
                Course becomes immediately discoverable for student enrollments.
              </p>
            </div>
          </div>

          {/* Option 2: Request Revision */}
          <div
            onClick={() => handleRulingSelect("revision_requested")}
            className={`p-3.5 rounded-2xl border cursor-pointer transition-all flex items-start gap-3 ${
              selectedRuling === "revision_requested"
                ? "bg-amber-50/80 border-amber-500 ring-2 ring-amber-500/20"
                : "bg-secondary/40 border-border hover:bg-secondary/70"
            }`}
          >
            <div
              className={`w-5 h-5 rounded-full border flex items-center justify-center shrink-0 mt-0.5 ${
                selectedRuling === "revision_requested"
                  ? "border-amber-600 bg-amber-600 text-white"
                  : "border-muted-foreground"
              }`}
            >
              {selectedRuling === "revision_requested" && (
                <AlertTriangle className="w-3.5 h-3.5" />
              )}
            </div>
            <div className="min-w-0">
              <p className="text-xs font-bold text-foreground">
                Request Curriculum Changes (Revision Needed)
              </p>
              <p className="text-[11px] text-muted-foreground mt-0.5">
                Transmits actionable feedback notes back to the teacher's studio.
              </p>
            </div>
          </div>

          {/* Option 3: Reject */}
          <div
            onClick={() => handleRulingSelect("rejected")}
            className={`p-3.5 rounded-2xl border cursor-pointer transition-all flex items-start gap-3 ${
              selectedRuling === "rejected"
                ? "bg-rose-50/80 border-rose-500 ring-2 ring-rose-500/20"
                : "bg-secondary/40 border-border hover:bg-secondary/70"
            }`}
          >
            <div
              className={`w-5 h-5 rounded-full border flex items-center justify-center shrink-0 mt-0.5 ${
                selectedRuling === "rejected"
                  ? "border-rose-600 bg-rose-600 text-white"
                  : "border-muted-foreground"
              }`}
            >
              {selectedRuling === "rejected" && (
                <XCircle className="w-3.5 h-3.5" />
              )}
            </div>
            <div className="min-w-0">
              <p className="text-xs font-bold text-foreground">
                Reject Submission
              </p>
              <p className="text-[11px] text-muted-foreground mt-0.5">
                Course does not satisfy platform curriculum standards.
              </p>
            </div>
          </div>
        </div>

        {/* Feedback / Note Textarea */}
        <div className="space-y-1.5">
          <label className="text-xs font-bold text-foreground">
            Official Auditor Findings & Feedback Note:
          </label>
          <textarea
            value={feedbackNote}
            onChange={(e) => setFeedbackNote(e.target.value)}
            rows={3}
            className="w-full rounded-xl border border-border bg-card p-3 text-xs text-foreground placeholder:text-muted-foreground focus:outline-hidden focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all resize-none"
            placeholder="Document curriculum findings, quiz passing requirements, or publishing instructions..."
          />
        </div>

        {/* Signer Info */}
        <div className="p-3 rounded-xl bg-secondary/50 border border-border text-[11px] text-muted-foreground flex items-center justify-between">
          <span>
            Signing Auditor: <strong className="text-foreground">{activeAuditor.name}</strong>
          </span>
          <span className="text-emerald-800 font-semibold">2FA Authenticated</span>
        </div>

        {/* Modal Actions */}
        <div className="flex items-center justify-end gap-3 pt-3 border-t border-border">
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={onClose}
            className="text-xs font-semibold"
          >
            Cancel
          </Button>

          <Button
            type="button"
            variant="primary"
            size="sm"
            onClick={handleConfirm}
            className="text-xs font-bold gap-1.5 shadow-2xs"
          >
            <span>Confirm & Sign Publication Ruling</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Button>
        </div>
      </div>
    </div>
  );
}
