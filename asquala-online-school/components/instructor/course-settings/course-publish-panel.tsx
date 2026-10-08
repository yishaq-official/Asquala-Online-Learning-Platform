"use client";

import React, { useState } from "react";
import {
  Send,
  Save,
  CheckCircle2,
  AlertTriangle,
  Archive,
  RefreshCw,
  FileCheck2,
  X,
  Clock,
} from "lucide-react";
import { CoursePublishStatus } from "@/types/instructor";
import { Button } from "@/components/ui/button";

interface CoursePublishPanelProps {
  status: CoursePublishStatus;
  isSaving: boolean;
  onSave: () => void;
  onSubmitForReview: () => void;
  onStatusChange: (nextStatus: CoursePublishStatus) => void;
}

export function CoursePublishPanel({
  status,
  isSaving,
  onSave,
  onSubmitForReview,
  onStatusChange,
}: CoursePublishPanelProps) {
  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);

  const isDraft = status === "draft";
  const isUnderReview = status === "under_review";
  const isPublished = status === "published";

  const handleConfirmSubmit = () => {
    setIsConfirmModalOpen(false);
    onSubmitForReview();
  };

  return (
    <div className="bg-card border border-border rounded-2xl p-5 sm:p-6 shadow-xs space-y-6">
      <div className="flex items-center justify-between pb-2 border-b border-border/80">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-primary-light text-primary flex items-center justify-center font-bold">
            <FileCheck2 className="w-4 h-4" />
          </div>
          <div>
            <h2 className="text-base font-bold text-foreground">
              Publishing &amp; Academic Review
            </h2>
            <p className="text-xs text-muted-foreground">
              Manage course publication lifecycle and peer review submissions
            </p>
          </div>
        </div>

        {/* Current Status Pill */}
        <span
          className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider ${
            isPublished
              ? "bg-emerald-50 text-emerald-800 border border-emerald-300"
              : isUnderReview
              ? "bg-amber-50 text-amber-800 border border-amber-300"
              : "bg-slate-100 text-slate-700 border border-slate-300"
          }`}
        >
          {status.replace("_", " ")}
        </span>
      </div>

      {/* Review Guidelines Checklist */}
      <div className="space-y-3 p-4 rounded-xl bg-secondary/30 border border-border">
        <h4 className="text-xs font-bold text-foreground flex items-center gap-2">
          <span>Asquala Academic Review Checklist</span>
        </h4>
        <p className="text-[11px] text-muted-foreground">
          Before submitting, ensure your course complies with our national accreditation criteria:
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 text-xs text-muted-foreground pt-1">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
            <span>Structured into sequential modules</span>
          </div>
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
            <span>High-definition video or clear audio</span>
          </div>
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
            <span>At least one milestone assessment quiz</span>
          </div>
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
            <span>16:9 HD thumbnail without copyright violations</span>
          </div>
        </div>
      </div>

      {/* Status-specific notices */}
      {isUnderReview && (
        <div className="p-4 rounded-xl border border-amber-200 bg-amber-50/70 text-amber-900 text-xs flex items-start gap-3">
          <Clock className="w-4 h-4 text-amber-700 shrink-0 mt-0.5" />
          <div>
            <p className="font-bold">Course Under Active Academic Audit</p>
            <p className="text-amber-800 mt-0.5 leading-relaxed">
              Your course is currently in queue with the Asquala Curriculum Committee. You will receive an email and notification within 24–48 hours once verified.
            </p>
          </div>
        </div>
      )}

      {isPublished && (
        <div className="p-4 rounded-xl border border-emerald-200 bg-emerald-50/70 text-emerald-900 text-xs flex items-start gap-3">
          <CheckCircle2 className="w-4 h-4 text-emerald-700 shrink-0 mt-0.5" />
          <div>
            <p className="font-bold">Course is Live &amp; Publicly Discoverable</p>
            <p className="text-emerald-800 mt-0.5 leading-relaxed">
              Students across Ethiopia can find, purchase, and learn from this course. Any saved changes update live for students.
            </p>
          </div>
        </div>
      )}

      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-3 border-t border-border/80">
        <div className="flex items-center gap-2 w-full sm:w-auto">
          {isPublished && (
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={() => onStatusChange("draft")}
              className="text-xs text-muted-foreground hover:text-foreground"
            >
              <Archive className="w-3.5 h-3.5" />
              <span>Unpublish to Draft</span>
            </Button>
          )}

          {isDraft && (
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={() => setIsConfirmModalOpen(true)}
              className="text-xs gap-1.5 border-primary/40 text-primary hover:bg-primary-light"
            >
              <Send className="w-3.5 h-3.5" />
              <span>Submit for Academic Review</span>
            </Button>
          )}
        </div>

        <Button
          type="button"
          variant="primary"
          size="md"
          disabled={isSaving}
          onClick={onSave}
          className="gap-2 text-xs w-full sm:w-auto shadow-xs"
        >
          {isSaving ? (
            <>
              <RefreshCw className="w-4 h-4 animate-spin" />
              <span>Saving Changes...</span>
            </>
          ) : (
            <>
              <Save className="w-4 h-4" />
              <span>Save Course Settings</span>
            </>
          )}
        </Button>
      </div>

      {/* Confirmation Modal */}
      {isConfirmModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs animate-in fade-in duration-150">
          <div className="bg-card border border-border rounded-2xl w-full max-w-md shadow-xl overflow-hidden p-6 space-y-4 animate-in zoom-in-95 duration-150">
            <div className="flex items-center justify-between">
              <div className="w-10 h-10 rounded-xl bg-primary-light text-primary flex items-center justify-center">
                <Send className="w-5 h-5" />
              </div>
              <button
                type="button"
                onClick={() => setIsConfirmModalOpen(false)}
                className="p-1 rounded-lg text-muted-foreground hover:text-foreground"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div>
              <h3 className="text-base font-bold text-foreground">
                Submit Course for Academic Review?
              </h3>
              <p className="text-xs text-muted-foreground mt-1 leading-relaxed">
                Our pedagogical board will verify lesson clarity, sound quality, and code completeness. Review typically takes 24 to 48 hours.
              </p>
            </div>

            <div className="flex items-center justify-end gap-2.5 pt-3 border-t border-border">
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() => setIsConfirmModalOpen(false)}
                className="text-xs"
              >
                Continue Editing
              </Button>
              <Button
                type="button"
                variant="primary"
                size="sm"
                onClick={handleConfirmSubmit}
                className="gap-1.5 text-xs shadow-xs"
              >
                <Send className="w-3.5 h-3.5" />
                <span>Confirm Submission</span>
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
