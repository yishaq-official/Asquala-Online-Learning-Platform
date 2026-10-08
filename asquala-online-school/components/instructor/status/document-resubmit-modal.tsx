"use client";

import React, { useState } from "react";
import { X, UploadCloud, CheckCircle2, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { DocumentUploadZone } from "../apply/document-upload-zone";

interface DocumentResubmitModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmitNewDocument: (documentName: string, notes: string) => void;
}

export function DocumentResubmitModal({
  isOpen,
  onClose,
  onSubmitNewDocument,
}: DocumentResubmitModalProps) {
  const [newFileName, setNewFileName] = useState("");
  const [submissionNotes, setSubmissionNotes] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newFileName) {
      setError("Please select a document file to upload.");
      return;
    }

    setIsSubmitting(true);
    setError(null);

    // Simulate upload delay
    await new Promise((resolve) => setTimeout(resolve, 700));

    onSubmitNewDocument(newFileName, submissionNotes);
    setIsSubmitting(false);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-xs animate-in fade-in-0 duration-200">
      <div className="bg-card border border-border rounded-2xl w-full max-w-lg shadow-2xl p-6 sm:p-7 space-y-5 animate-in zoom-in-95 duration-200">
        {/* Modal Header */}
        <div className="flex items-center justify-between border-b border-border/80 pb-4">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-primary-light text-primary border border-primary-border">
              <UploadCloud className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-bold text-foreground">
                Re-upload Verification Document
              </h3>
              <p className="text-xs text-muted-foreground">
                Provide clear, official scans to resume academic verification.
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="p-1.5 rounded-lg text-muted-foreground hover:text-foreground hover:bg-secondary cursor-pointer"
            aria-label="Close dialog"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {error && (
          <div className="p-3 rounded-xl border border-destructive/20 bg-destructive/10 text-destructive text-xs font-medium">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Document Upload Zone */}
          <DocumentUploadZone
            label="Updated Academic Document"
            helperText="Upload official diploma or registrar-signed transcript (PDF, JPG, PNG - Max 10MB)"
            currentFileName={newFileName}
            onFileSelect={(file) => setNewFileName(file.name)}
            onFileRemove={() => setNewFileName("")}
            required
          />

          {/* Clarification Notes */}
          <div className="space-y-1.5">
            <Label htmlFor="resubmitNotes">
              Message to Review Board (Optional)
            </Label>
            <textarea
              id="resubmitNotes"
              rows={3}
              placeholder="e.g. Attached certified high-resolution scan of M.Sc. diploma with university registrar stamp clearly visible on page 2."
              value={submissionNotes}
              onChange={(e) => setSubmissionNotes(e.target.value)}
              className="w-full rounded-lg border border-border bg-card px-3.5 py-2.5 text-sm text-foreground placeholder:text-muted-foreground transition-all focus:outline-hidden focus:border-primary focus:ring-2 focus:ring-primary/20 resize-none"
            />
          </div>

          {/* Actions */}
          <div className="flex items-center justify-end gap-3 pt-2 border-t border-border/80">
            <Button
              type="button"
              variant="outline"
              size="md"
              onClick={onClose}
              disabled={isSubmitting}
            >
              Cancel
            </Button>

            <Button
              type="submit"
              variant="primary"
              size="md"
              isLoading={isSubmitting}
              className="gap-2 shadow-xs"
            >
              <CheckCircle2 className="w-4 h-4" />
              <span>Submit &amp; Resume Review</span>
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
