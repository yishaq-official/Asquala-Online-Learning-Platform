"use client";

import React from "react";
import {
  ArrowLeft,
  Award,
  BookOpen,
  Plus,
  Trash2,
  Video,
  ShieldCheck,
  Send,
} from "lucide-react";
import { CertificateRecord } from "@/types/instructor";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { DocumentUploadZone } from "./document-upload-zone";

interface StepCertificationsCourseProps {
  certificationsList: CertificateRecord[];
  proposedCourseTitle: string;
  proposedCourseOutline: string;
  sampleVideoUrl: string;
  agreedToTerms: boolean;
  onCertificationsChange: (list: CertificateRecord[]) => void;
  onProposedTitleChange: (val: string) => void;
  onProposedOutlineChange: (val: string) => void;
  onSampleVideoChange: (val: string) => void;
  onAgreedTermsChange: (val: boolean) => void;
  onSubmit: () => void;
  onBack: () => void;
  isSubmitting: boolean;
}

export function StepCertificationsCourse({
  certificationsList,
  proposedCourseTitle,
  proposedCourseOutline,
  sampleVideoUrl,
  agreedToTerms,
  onCertificationsChange,
  onProposedTitleChange,
  onProposedOutlineChange,
  onSampleVideoChange,
  onAgreedTermsChange,
  onSubmit,
  onBack,
  isSubmitting,
}: StepCertificationsCourseProps) {
  const [errorMsg, setErrorMsg] = React.useState<string | null>(null);

  const addCertificate = () => {
    const newRecord: CertificateRecord = {
      id: `cert-${Date.now()}`,
      title: "",
      issuingOrganization: "",
      issueDate: "2024-01",
      credentialId: "",
      documentName: "",
    };
    onCertificationsChange([...certificationsList, newRecord]);
    setErrorMsg(null);
  };

  const removeCertificate = (id: string) => {
    onCertificationsChange(certificationsList.filter((c) => c.id !== id));
  };

  const updateCertificate = (id: string, updates: Partial<CertificateRecord>) => {
    onCertificationsChange(
      certificationsList.map((c) => (c.id === id ? { ...c, ...updates } : c))
    );
    setErrorMsg(null);
  };

  const handleSubmitClick = (e: React.FormEvent) => {
    e.preventDefault();

    if (!proposedCourseTitle.trim()) {
      setErrorMsg("Please provide your proposed initial course title.");
      return;
    }

    if (!proposedCourseOutline.trim() || proposedCourseOutline.length < 40) {
      setErrorMsg("Please provide at least 40 characters describing your proposed course curriculum and objectives.");
      return;
    }

    if (!agreedToTerms) {
      setErrorMsg("You must review and agree to the Asquala Academic Accreditation Integrity Terms.");
      return;
    }

    setErrorMsg(null);
    onSubmit();
  };

  return (
    <form onSubmit={handleSubmitClick} className="space-y-6">
      {/* Professional Certifications & Proof */}
      <div className="bg-card border border-border rounded-2xl p-6 sm:p-7 shadow-xs space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <h2 className="text-lg font-bold text-foreground flex items-center gap-2">
              <Award className="w-5 h-5 text-primary" />
              Professional Certifications & Accreditations (Optional)
            </h2>
            <p className="text-xs text-muted-foreground mt-1">
              Add recognized vendor, cloud, or board certifications (AWS, Cisco, CompTIA, CNCF, Ministry).
            </p>
          </div>

          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={addCertificate}
            className="gap-1.5 shrink-0"
          >
            <Plus className="w-3.5 h-3.5 text-primary" />
            <span>Add Certificate</span>
          </Button>
        </div>

        {certificationsList.length === 0 ? (
          <div className="p-4 rounded-xl border border-dashed border-border text-center text-xs text-muted-foreground bg-secondary/20">
            No professional certifications added yet. If you hold industry certifications, click above to attach proof files.
          </div>
        ) : (
          <div className="space-y-4 pt-1">
            {certificationsList.map((cert, index) => (
              <div
                key={cert.id}
                className="p-5 rounded-xl border border-border bg-secondary/20 space-y-4 relative"
              >
                <div className="flex items-center justify-between border-b border-border/80 pb-2.5">
                  <span className="text-xs font-bold text-foreground">
                    Certification #{index + 1}
                  </span>
                  <button
                    type="button"
                    onClick={() => removeCertificate(cert.id)}
                    className="text-xs text-muted-foreground hover:text-destructive flex items-center gap-1 transition-colors cursor-pointer"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                    <span>Remove</span>
                  </button>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div className="space-y-1.5 sm:col-span-1">
                    <Label required>Certificate Title</Label>
                    <Input
                      placeholder="e.g. AWS Certified Solutions Architect"
                      value={cert.title}
                      onChange={(e) =>
                        updateCertificate(cert.id, { title: e.target.value })
                      }
                      required
                    />
                  </div>

                  <div className="space-y-1.5 sm:col-span-1">
                    <Label required>Issuing Authority</Label>
                    <Input
                      placeholder="e.g. Amazon Web Services, Cisco"
                      value={cert.issuingOrganization}
                      onChange={(e) =>
                        updateCertificate(cert.id, {
                          issuingOrganization: e.target.value,
                        })
                      }
                      required
                    />
                  </div>

                  <div className="space-y-1.5 sm:col-span-1">
                    <Label>Credential ID / Verification Code</Label>
                    <Input
                      placeholder="e.g. AWS-PSA-9081249"
                      value={cert.credentialId || ""}
                      onChange={(e) =>
                        updateCertificate(cert.id, { credentialId: e.target.value })
                      }
                    />
                  </div>
                </div>

                <div className="pt-1">
                  <DocumentUploadZone
                    label="Certificate Proof Document"
                    helperText="Upload verifiable certificate PDF or badge scan (Max 10MB)"
                    currentFileName={cert.documentName}
                    onFileSelect={(file) =>
                      updateCertificate(cert.id, {
                        documentName: file.name,
                        documentUrl: "#",
                      })
                    }
                    onFileRemove={() =>
                      updateCertificate(cert.id, {
                        documentName: "",
                        documentUrl: "",
                      })
                    }
                  />
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Proposed Initial Course Proposal */}
      <div className="bg-card border border-border rounded-2xl p-6 sm:p-7 shadow-xs space-y-4">
        <div>
          <h3 className="text-base font-bold text-foreground flex items-center gap-2">
            <BookOpen className="w-5 h-5 text-primary" />
            Proposed Initial Course Curriculum
          </h3>
          <p className="text-xs text-muted-foreground mt-0.5">
            Describe the first course you plan to publish once your instructor profile is accredited.
          </p>
        </div>

        <div className="space-y-4">
          <div className="space-y-1.5">
            <Label required>Proposed Course Title</Label>
            <Input
              placeholder="e.g. Next.js 16 Full-Stack Mastery & Real-World PostgreSQL"
              value={proposedCourseTitle}
              onChange={(e) => onProposedTitleChange(e.target.value)}
              required
            />
          </div>

          <div className="space-y-1.5">
            <Label required>Curriculum Outline & Target Learning Outcomes</Label>
            <textarea
              rows={4}
              placeholder="Outline the main modules, hands-on projects, and key practical skills students will build in this course..."
              value={proposedCourseOutline}
              onChange={(e) => onProposedOutlineChange(e.target.value)}
              className="w-full rounded-lg border border-border bg-card px-3.5 py-2.5 text-sm text-foreground placeholder:text-muted-foreground transition-all focus:outline-hidden focus:border-primary focus:ring-2 focus:ring-primary/20 resize-none"
              required
            />
          </div>

          <div className="space-y-1.5">
            <Label className="flex items-center gap-1.5">
              <Video className="w-4 h-4 text-primary" />
              <span>Sample Lecture / Teaching Intro Video Link (Optional)</span>
            </Label>
            <Input
              placeholder="https://youtube.com/watch?v=... or Loom / Google Drive link"
              value={sampleVideoUrl}
              onChange={(e) => onSampleVideoChange(e.target.value)}
            />
            <p className="text-[11px] text-muted-foreground">
              A 2-3 minute demonstration of your technical teaching style speeds up board approval.
            </p>
          </div>
        </div>
      </div>

      {/* Terms & Academic Accreditation Agreement */}
      <div className="bg-card border border-border rounded-2xl p-5 sm:p-6 shadow-xs space-y-4">
        <div className="flex items-start gap-3">
          <input
            type="checkbox"
            id="terms"
            checked={agreedToTerms}
            onChange={(e) => onAgreedTermsChange(e.target.checked)}
            className="rounded border-border text-primary focus:ring-primary w-4 h-4 mt-0.5 cursor-pointer"
            required
          />
          <label
            htmlFor="terms"
            className="text-xs text-foreground leading-relaxed cursor-pointer select-none"
          >
            <strong>Academic Integrity Declaration:</strong> I hereby declare that all educational certificates, transcripts, work history, and identity records submitted in this application are authentic, accurate, and verifiable. I understand that Asquala conducts formal verification with educational institutions and employers.
          </label>
        </div>

        {errorMsg && (
          <div className="p-3.5 rounded-xl border border-destructive/20 bg-destructive/10 text-destructive text-xs font-medium">
            {errorMsg}
          </div>
        )}
      </div>

      {/* Navigation & Submit CTA */}
      <div className="flex items-center justify-between">
        <Button
          type="button"
          variant="outline"
          size="md"
          onClick={onBack}
          disabled={isSubmitting}
          className="gap-2"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back</span>
        </Button>

        <Button
          type="submit"
          variant="primary"
          size="md"
          isLoading={isSubmitting}
          className="gap-2 shadow-sm"
        >
          <Send className="w-4 h-4" />
          <span>Submit Application for Review</span>
        </Button>
      </div>
    </form>
  );
}
