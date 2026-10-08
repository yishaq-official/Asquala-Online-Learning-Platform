"use client";

import React from "react";
import { ArrowLeft, ArrowRight, GraduationCap, Plus, Trash2, ShieldCheck } from "lucide-react";
import { EducationRecord } from "@/types/instructor";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { DocumentUploadZone } from "./document-upload-zone";

interface StepEducationEvidenceProps {
  educationList: EducationRecord[];
  onChange: (list: EducationRecord[]) => void;
  onNext: () => void;
  onBack: () => void;
}

const DEGREE_OPTIONS = [
  "B.Sc. / Bachelor Degree",
  "M.Sc. / Master Degree",
  "Ph.D. / Doctorate",
  "Associate Degree / Advanced Diploma",
  "Higher National Diploma (HND)",
  "Other Accredited Degree",
];

export function StepEducationEvidence({
  educationList,
  onChange,
  onNext,
  onBack,
}: StepEducationEvidenceProps) {
  const [errorMsg, setErrorMsg] = React.useState<string | null>(null);

  const addDegree = () => {
    const newRecord: EducationRecord = {
      id: `edu-${Date.now()}`,
      degree: "B.Sc. / Bachelor Degree",
      institution: "",
      fieldOfStudy: "",
      graduationYear: new Date().getFullYear(),
      documentName: "",
    };
    onChange([...educationList, newRecord]);
    setErrorMsg(null);
  };

  const removeDegree = (id: string) => {
    if (educationList.length <= 1) return;
    onChange(educationList.filter((e) => e.id !== id));
  };

  const updateRecord = (id: string, updates: Partial<EducationRecord>) => {
    onChange(
      educationList.map((e) => (e.id === id ? { ...e, ...updates } : e))
    );
    setErrorMsg(null);
  };

  const handleNext = (e: React.FormEvent) => {
    e.preventDefault();

    // Validate that at least one degree is complete
    const incomplete = educationList.some(
      (e) => !e.institution.trim() || !e.fieldOfStudy.trim() || !e.graduationYear
    );

    if (incomplete) {
      setErrorMsg("Please fill in university/institution, field of study, and graduation year for all degree records.");
      return;
    }

    const missingDocument = educationList.some((e) => !e.documentName);
    if (missingDocument) {
      setErrorMsg("Please attach an official degree certificate or transcript PDF/image for each educational credential.");
      return;
    }

    setErrorMsg(null);
    onNext();
  };

  return (
    <form onSubmit={handleNext} className="space-y-6">
      <div className="bg-card border border-border rounded-2xl p-6 sm:p-7 shadow-xs space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <h2 className="text-lg font-bold text-foreground flex items-center gap-2">
              <GraduationCap className="w-5 h-5 text-primary" />
              Academic Credentials & Degree Verification
            </h2>
            <p className="text-xs text-muted-foreground mt-1">
              Asquala requires accredited degree evidence before granting instructor status.
            </p>
          </div>

          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={addDegree}
            className="gap-1.5 shrink-0"
          >
            <Plus className="w-3.5 h-3.5 text-primary" />
            <span>Add Another Degree</span>
          </Button>
        </div>

        {errorMsg && (
          <div className="p-3.5 rounded-xl border border-destructive/20 bg-destructive/10 text-destructive text-xs font-medium">
            {errorMsg}
          </div>
        )}

        {/* Education Records */}
        <div className="space-y-6 pt-2">
          {educationList.map((record, index) => (
            <div
              key={record.id}
              className="p-5 sm:p-6 rounded-xl border border-border bg-secondary/20 space-y-4 relative"
            >
              <div className="flex items-center justify-between border-b border-border/80 pb-3">
                <div className="flex items-center gap-2">
                  <span className="w-6 h-6 rounded-full bg-primary-light text-primary font-bold text-xs flex items-center justify-center border border-primary-border">
                    {index + 1}
                  </span>
                  <span className="text-sm font-bold text-foreground">
                    Credential #{index + 1}
                  </span>
                </div>

                {educationList.length > 1 && (
                  <button
                    type="button"
                    onClick={() => removeDegree(record.id)}
                    className="text-xs text-muted-foreground hover:text-destructive flex items-center gap-1 transition-colors cursor-pointer"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                    <span>Remove</span>
                  </button>
                )}
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Degree Award */}
                <div className="space-y-1.5">
                  <Label required>Degree / Award Level</Label>
                  <select
                    value={record.degree}
                    onChange={(e) => updateRecord(record.id, { degree: e.target.value })}
                    className="w-full rounded-lg border border-border bg-card px-3.5 py-2.5 text-sm text-foreground transition-all focus:outline-hidden focus:border-primary focus:ring-2 focus:ring-primary/20"
                  >
                    {DEGREE_OPTIONS.map((opt) => (
                      <option key={opt} value={opt}>
                        {opt}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Institution */}
                <div className="space-y-1.5">
                  <Label required>University / College / Institution</Label>
                  <Input
                    placeholder="e.g. Addis Ababa University (AAU)"
                    value={record.institution}
                    onChange={(e) => updateRecord(record.id, { institution: e.target.value })}
                    required
                  />
                </div>

                {/* Field of Study */}
                <div className="space-y-1.5">
                  <Label required>Field of Study / Major</Label>
                  <Input
                    placeholder="e.g. Computer Science, Electrical Engineering"
                    value={record.fieldOfStudy}
                    onChange={(e) => updateRecord(record.id, { fieldOfStudy: e.target.value })}
                    required
                  />
                </div>

                {/* Graduation Year */}
                <div className="space-y-1.5">
                  <Label required>Year of Graduation</Label>
                  <Input
                    type="number"
                    min={1980}
                    max={new Date().getFullYear()}
                    placeholder="e.g. 2021"
                    value={record.graduationYear || ""}
                    onChange={(e) => updateRecord(record.id, { graduationYear: Number(e.target.value) })}
                    required
                  />
                </div>
              </div>

              {/* Document Upload Zone */}
              <div className="pt-2">
                <DocumentUploadZone
                  label="Degree Certificate or Official Transcript"
                  helperText="Upload official diploma or registrar-signed transcript (PDF, JPG, PNG - Max 10MB)"
                  currentFileName={record.documentName}
                  onFileSelect={(file) =>
                    updateRecord(record.id, {
                      documentName: file.name,
                      documentUrl: "#",
                    })
                  }
                  onFileRemove={() =>
                    updateRecord(record.id, {
                      documentName: "",
                      documentUrl: "",
                    })
                  }
                  required
                />
              </div>
            </div>
          ))}
        </div>

        {/* Verification Guarantee Notice */}
        <div className="flex items-start gap-3 p-3.5 rounded-xl bg-primary-light/40 border border-primary-border text-xs text-foreground mt-4">
          <ShieldCheck className="w-4 h-4 text-primary shrink-0 mt-0.5" />
          <p>
            All submitted documents are encrypted and reviewed strictly by Asquala Academic Board auditors. Documents are never made public to students.
          </p>
        </div>
      </div>

      {/* Navigation Controls */}
      <div className="flex items-center justify-between">
        <Button type="button" variant="outline" size="md" onClick={onBack} className="gap-2">
          <ArrowLeft className="w-4 h-4" />
          <span>Back</span>
        </Button>

        <Button type="submit" variant="primary" size="md" className="gap-2 shadow-xs">
          <span>Continue to Work Experience</span>
          <ArrowRight className="w-4 h-4" />
        </Button>
      </div>
    </form>
  );
}
