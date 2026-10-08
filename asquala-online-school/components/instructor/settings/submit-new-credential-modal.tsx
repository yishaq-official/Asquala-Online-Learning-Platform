"use client";

import React, { useState } from "react";
import {
  X,
  UploadCloud,
  FileText,
  Plus,
  GraduationCap,
  Award,
  ShieldCheck,
} from "lucide-react";
import { Button } from "@/components/ui/button";

interface SubmitNewCredentialModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: {
    type: "degree" | "certificate";
    title: string;
    institution: string;
    yearOrDate: string;
    documentName: string;
  }) => void;
}

export function SubmitNewCredentialModal({
  isOpen,
  onClose,
  onSubmit,
}: SubmitNewCredentialModalProps) {
  const [type, setType] = useState<"degree" | "certificate">("certificate");
  const [title, setTitle] = useState("");
  const [institution, setInstitution] = useState("");
  const [yearOrDate, setYearOrDate] = useState("");
  const [documentName, setDocumentName] = useState("");
  const [error, setError] = useState("");

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !institution.trim()) {
      setError("Please fill in title and issuing institution.");
      return;
    }
    if (!documentName) {
      setError("Please attach a document scan (PDF, JPG, or PNG).");
      return;
    }

    onSubmit({
      type,
      title: title.trim(),
      institution: institution.trim(),
      yearOrDate: yearOrDate.trim() || "2026",
      documentName,
    });

    setTitle("");
    setInstitution("");
    setYearOrDate("");
    setDocumentName("");
    setError("");
    onClose();
  };

  const handleSimulateUpload = () => {
    const filename =
      type === "degree"
        ? `${institution.replace(/\s+/g, "_")}_Degree_Diploma.pdf`
        : `${title.replace(/\s+/g, "_")}_Certificate.pdf`;
    setDocumentName(filename);
    if (error) setError("");
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs animate-in fade-in duration-150">
      <div className="bg-card border border-border rounded-2xl w-full max-w-lg shadow-xl overflow-hidden animate-in zoom-in-95 duration-150">
        {/* Header */}
        <div className="flex items-center justify-between p-5 border-b border-border bg-secondary/30">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-primary text-primary-foreground flex items-center justify-center font-bold shadow-2xs">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-base font-bold text-foreground">
                Submit Additional Credential
              </h2>
              <p className="text-xs text-muted-foreground">
                Submit new diplomas or certifications for Academic Board accreditation
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="p-1.5 rounded-lg text-muted-foreground hover:text-foreground hover:bg-secondary transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-5 space-y-4">
          {error && (
            <div className="p-3 rounded-xl bg-rose-50 text-rose-700 border border-rose-200 text-xs font-semibold">
              {error}
            </div>
          )}

          {/* Type Selector */}
          <div>
            <label className="block text-xs font-semibold text-foreground mb-1.5">
              Credential Category
            </label>
            <div className="grid grid-cols-2 gap-2">
              <button
                type="button"
                onClick={() => setType("certificate")}
                className={`p-2.5 rounded-xl border text-xs font-semibold flex items-center justify-center gap-2 transition-all ${
                  type === "certificate"
                    ? "border-primary bg-primary text-primary-foreground shadow-2xs"
                    : "border-border bg-secondary/30 text-muted-foreground hover:text-foreground"
                }`}
              >
                <Award className="w-4 h-4" />
                <span>Certification</span>
              </button>

              <button
                type="button"
                onClick={() => setType("degree")}
                className={`p-2.5 rounded-xl border text-xs font-semibold flex items-center justify-center gap-2 transition-all ${
                  type === "degree"
                    ? "border-primary bg-primary text-primary-foreground shadow-2xs"
                    : "border-border bg-secondary/30 text-muted-foreground hover:text-foreground"
                }`}
              >
                <GraduationCap className="w-4 h-4" />
                <span>University Degree</span>
              </button>
            </div>
          </div>

          {/* Title */}
          <div>
            <label className="block text-xs font-semibold text-foreground mb-1.5">
              {type === "degree" ? "Degree / Field of Study" : "Certification Title"}{" "}
              <span className="text-rose-500">*</span>
            </label>
            <input
              type="text"
              value={title}
              onChange={(e) => {
                setTitle(e.target.value);
                if (error) setError("");
              }}
              placeholder={
                type === "degree"
                  ? "e.g. B.Sc. in Software Engineering"
                  : "e.g. Google Cloud Certified Professional Cloud Architect"
              }
              className="w-full px-3.5 py-2.5 rounded-xl border border-border focus:border-primary text-xs sm:text-sm bg-card text-foreground focus:outline-hidden ring-2 ring-primary/20"
              required
            />
          </div>

          {/* Institution & Year */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-foreground mb-1.5">
                Issuing Institution <span className="text-rose-500">*</span>
              </label>
              <input
                type="text"
                value={institution}
                onChange={(e) => setInstitution(e.target.value)}
                placeholder={
                  type === "degree"
                    ? "e.g. Addis Ababa University (AAiT)"
                    : "e.g. Amazon Web Services (AWS)"
                }
                className="w-full px-3.5 py-2.5 rounded-xl border border-border focus:border-primary text-xs sm:text-sm bg-card text-foreground focus:outline-hidden ring-2 ring-primary/20"
                required
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-foreground mb-1.5">
                Issue Year / Date
              </label>
              <input
                type="text"
                value={yearOrDate}
                onChange={(e) => setYearOrDate(e.target.value)}
                placeholder="e.g. 2026 or 2025-11"
                className="w-full px-3.5 py-2.5 rounded-xl border border-border focus:border-primary text-xs sm:text-sm bg-card text-foreground focus:outline-hidden ring-2 ring-primary/20"
              />
            </div>
          </div>

          {/* File Upload Zone */}
          <div>
            <label className="block text-xs font-semibold text-foreground mb-1.5">
              Upload Official Document Scan (PDF / Image) <span className="text-rose-500">*</span>
            </label>

            {documentName ? (
              <div className="p-3.5 rounded-xl border border-emerald-300 bg-emerald-50/50 flex items-center justify-between text-xs">
                <div className="flex items-center gap-2 min-w-0">
                  <FileText className="w-4 h-4 text-emerald-700 shrink-0" />
                  <span className="font-mono text-emerald-900 font-semibold truncate">
                    {documentName}
                  </span>
                </div>
                <button
                  type="button"
                  onClick={() => setDocumentName("")}
                  className="text-xs text-rose-600 hover:underline shrink-0 ml-2"
                >
                  Remove
                </button>
              </div>
            ) : (
              <div
                onClick={handleSimulateUpload}
                className="border-2 border-dashed border-border hover:border-primary p-6 rounded-xl text-center bg-secondary/30 hover:bg-secondary/50 transition-all cursor-pointer space-y-1"
              >
                <UploadCloud className="w-8 h-8 text-muted-foreground mx-auto" />
                <p className="text-xs font-bold text-foreground">
                  Click to attach certificate or diploma PDF
                </p>
                <p className="text-[11px] text-muted-foreground">
                  PDF, JPG or PNG up to 10MB
                </p>
              </div>
            )}
          </div>

          {/* Actions */}
          <div className="flex items-center justify-end gap-2.5 pt-3 border-t border-border">
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={onClose}
              className="text-xs"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              variant="primary"
              size="sm"
              className="gap-1.5 text-xs shadow-xs"
            >
              <span>Submit for Accreditation</span>
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
