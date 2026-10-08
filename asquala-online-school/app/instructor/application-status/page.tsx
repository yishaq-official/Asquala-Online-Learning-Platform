"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  ShieldCheck,
  Clock,
  ArrowRight,
  GraduationCap,
  HelpCircle,
  CheckCircle2,
  AlertCircle,
  FileText,
  X,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { InstructorApplicationStatus } from "@/types/instructor";
import { ReviewTimelineStepper } from "@/components/instructor/status/review-timeline-stepper";
import { SubmittedDossierCard } from "@/components/instructor/status/submitted-dossier-card";
import { ActionRequiredBanner } from "@/components/instructor/status/action-required-banner";
import { DocumentResubmitModal } from "@/components/instructor/status/document-resubmit-modal";
import { ApprovalCelebrationCard } from "@/components/instructor/status/approval-celebration-card";
import {
  MOCK_CURRENT_INSTRUCTOR_APPLICATION,
  MOCK_ACTION_REQUIRED_APPLICATION,
  MOCK_APPROVED_INSTRUCTOR_APPLICATION,
} from "@/lib/mock-instructor-data";

export default function ApplicationStatusPage() {
  const [currentApp, setCurrentApp] = useState(MOCK_CURRENT_INSTRUCTOR_APPLICATION);
  const [isResubmitModalOpen, setIsResubmitModalOpen] = useState(false);
  const [previewDocumentName, setPreviewDocumentName] = useState<string | null>(null);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 4000);
  };

  const handleStatusChange = (status: InstructorApplicationStatus) => {
    if (status === "approved") {
      setCurrentApp(MOCK_APPROVED_INSTRUCTOR_APPLICATION);
    } else if (status === "action_required") {
      setCurrentApp(MOCK_ACTION_REQUIRED_APPLICATION);
    } else {
      setCurrentApp(MOCK_CURRENT_INSTRUCTOR_APPLICATION);
    }
  };

  const handleDocumentResubmit = (docName: string, notes: string) => {
    // Update local state to under_review with new document
    const updated = {
      ...currentApp,
      status: "under_review" as InstructorApplicationStatus,
      education: currentApp.education.map((edu, idx) =>
        idx === 1 ? { ...edu, documentName: docName, isVerified: false } : edu
      ),
    };
    setCurrentApp(updated);
    showToast(`"${docName}" was successfully uploaded. Your academic review has resumed!`);
  };

  return (
    <div className="min-h-screen bg-background py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto space-y-6">
        {/* Top Header & Brand */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-border/80 pb-6">
          <div className="flex items-center gap-3.5">
            <Link
              href="/"
              className="relative shrink-0 transition-transform hover:scale-105"
              title="Asquala Home"
            >
              <Image
                src="/images/logo.png"
                alt="Asquala Logo"
                width={44}
                height={44}
                className="w-11 h-11 object-contain"
                priority
              />
            </Link>
            <div>
              <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-primary-light text-primary border border-primary-border mb-1">
                <ShieldCheck className="w-3.5 h-3.5" />
                <span>ACCREDITATION REVIEW PORTAL</span>
              </div>
              <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-foreground">
                Instructor Application Tracker
              </h1>
            </div>
          </div>

          {/* Quick Support & Student Mode */}
          <div className="flex items-center gap-2.5 shrink-0">
            <Link href="/student/dashboard">
              <Button variant="outline" size="sm" className="gap-1.5 text-xs">
                <GraduationCap className="w-3.5 h-3.5 text-primary" />
                <span>Student Portal</span>
              </Button>
            </Link>
          </div>
        </div>

        {/* Demo Status Switcher Toolbar */}
        <div className="p-3 rounded-xl bg-secondary/50 border border-border flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 text-xs">
          <span className="font-semibold text-foreground flex items-center gap-1.5">
            <span>Audit Stage Simulator:</span>
            <span className="text-muted-foreground font-normal">(Switch states to test reviewer workflow)</span>
          </span>

          <div className="flex items-center gap-1.5 flex-wrap">
            <button
              type="button"
              onClick={() => handleStatusChange("under_review")}
              className={`px-3 py-1.5 rounded-lg font-medium transition-colors cursor-pointer border ${
                currentApp.status === "under_review"
                  ? "bg-amber-100 text-amber-800 border-amber-300 font-bold"
                  : "bg-card border-border hover:bg-secondary text-muted-foreground"
              }`}
            >
              ⏳ 1. Under Audit
            </button>

            <button
              type="button"
              onClick={() => handleStatusChange("action_required")}
              className={`px-3 py-1.5 rounded-lg font-medium transition-colors cursor-pointer border ${
                currentApp.status === "action_required"
                  ? "bg-rose-100 text-rose-800 border-rose-300 font-bold"
                  : "bg-card border-border hover:bg-secondary text-muted-foreground"
              }`}
            >
              ⚠️ 2. Action Required
            </button>

            <button
              type="button"
              onClick={() => handleStatusChange("approved")}
              className={`px-3 py-1.5 rounded-lg font-medium transition-colors cursor-pointer border ${
                currentApp.status === "approved"
                  ? "bg-primary-light text-primary border-primary-border font-bold"
                  : "bg-card border-border hover:bg-secondary text-muted-foreground"
              }`}
            >
              🎉 3. Approved
            </button>
          </div>
        </div>

        {/* Toast Alert */}
        {toastMessage && (
          <div className="flex items-center gap-3 p-4 rounded-xl border border-primary-border bg-primary-light text-primary text-xs font-semibold animate-in fade-in-0 duration-200">
            <CheckCircle2 className="w-4 h-4 shrink-0" />
            <span>{toastMessage}</span>
          </div>
        )}

        {/* Review Pipeline Timeline */}
        <ReviewTimelineStepper status={currentApp.status} />

        {/* Status Conditional Banners */}
        {currentApp.status === "approved" && (
          <ApprovalCelebrationCard
            reviewedAt="Today"
            reviewNotes={currentApp.reviewNotes}
          />
        )}

        {currentApp.status === "action_required" && (
          <ActionRequiredBanner
            reviewNotes={currentApp.reviewNotes}
            onOpenResubmitModal={() => setIsResubmitModalOpen(true)}
          />
        )}

        {currentApp.status === "under_review" && (
          <div className="p-4 sm:p-5 rounded-2xl bg-amber-50/70 border border-amber-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-amber-100 text-amber-700 flex items-center justify-center shrink-0">
                <Clock className="w-4 h-4" />
              </div>
              <div>
                <span className="font-bold text-amber-900 block">
                  Academic Verification in Progress
                </span>
                <span className="text-amber-800">
                  Estimated review completion within 24–48 business hours. You will receive an email upon board accreditation.
                </span>
              </div>
            </div>

            <span className="text-[11px] text-amber-900 font-mono font-semibold shrink-0">
              Submitted: {new Date(currentApp.submittedAt).toLocaleDateString()}
            </span>
          </div>
        )}

        {/* Submitted Evidence Dossier Breakdown */}
        <SubmittedDossierCard
          application={currentApp}
          onPreviewDocument={(docName) => setPreviewDocumentName(docName)}
        />

        {/* Re-upload Modal */}
        <DocumentResubmitModal
          isOpen={isResubmitModalOpen}
          onClose={() => setIsResubmitModalOpen(false)}
          onSubmitNewDocument={handleDocumentResubmit}
        />

        {/* Document Quick Preview Modal */}
        {previewDocumentName && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-xs animate-in fade-in-0">
            <div className="bg-card border border-border rounded-2xl w-full max-w-md shadow-2xl p-6 space-y-4">
              <div className="flex items-center justify-between border-b border-border pb-3">
                <div className="flex items-center gap-2">
                  <FileText className="w-4 h-4 text-primary" />
                  <span className="text-xs font-bold text-foreground truncate max-w-[240px]">
                    {previewDocumentName}
                  </span>
                </div>
                <button
                  type="button"
                  onClick={() => setPreviewDocumentName(null)}
                  className="p-1 rounded-lg text-muted-foreground hover:text-foreground hover:bg-secondary cursor-pointer"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              <div className="p-8 rounded-xl border border-dashed border-border bg-secondary/30 text-center space-y-2">
                <ShieldCheck className="w-10 h-10 text-primary mx-auto" />
                <h4 className="text-sm font-bold text-foreground">
                  Official Academic Document Attached
                </h4>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  Encrypted PDF/image archived in Asquala Secure Accreditation Vault. Document is verified with institutional registrars.
                </p>
              </div>

              <div className="flex justify-end pt-2">
                <Button
                  type="button"
                  variant="primary"
                  size="sm"
                  onClick={() => setPreviewDocumentName(null)}
                >
                  Close Preview
                </Button>
              </div>
            </div>
          </div>
        )}

        {/* Help & Support Footer */}
        <div className="pt-4 border-t border-border flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-muted-foreground">
          <div className="flex items-center gap-2">
            <HelpCircle className="w-4 h-4 text-primary" />
            <span>
              Questions regarding accreditation? Contact:{" "}
              <strong className="text-foreground">accreditation@asquala.edu</strong>
            </span>
          </div>

          <div className="flex items-center gap-4">
            <Link href="/" className="hover:text-foreground transition-colors">
              Asquala Home
            </Link>
            <Link href="/instructor-login" className="hover:text-foreground transition-colors">
              Studio Sign In
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
