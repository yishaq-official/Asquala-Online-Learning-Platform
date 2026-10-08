"use client";

import React from "react";
import { ArrowLeft, ArrowRight, Briefcase, Plus, Trash2, CheckCircle2 } from "lucide-react";
import { ExperienceRecord } from "@/types/instructor";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

interface StepWorkExperienceProps {
  primarySubject: string;
  targetAudience: string;
  experienceList: ExperienceRecord[];
  onSubjectChange: (val: string) => void;
  onAudienceChange: (val: string) => void;
  onExperienceListChange: (list: ExperienceRecord[]) => void;
  onNext: () => void;
  onBack: () => void;
}

const SUBJECT_OPTIONS = [
  "Full-Stack Web Development & Frameworks",
  "Cloud Architecture & DevOps Systems",
  "Database Engineering & Distributed Systems",
  "Artificial Intelligence & Machine Learning",
  "Mobile Application Development (Flutter / React Native)",
  "Cybersecurity & Network Defense",
  "Software Architecture & Clean Code Patterns",
  "Other Engineering / Technical Specialization",
];

const AUDIENCE_OPTIONS = [
  "University Students & Recent Graduates",
  "Junior & Mid-Level Working Engineers",
  "Complete Beginners & Career Changers",
  "Enterprise Software Teams & Leaders",
];

export function StepWorkExperience({
  primarySubject,
  targetAudience,
  experienceList,
  onSubjectChange,
  onAudienceChange,
  onExperienceListChange,
  onNext,
  onBack,
}: StepWorkExperienceProps) {
  const [errorMsg, setErrorMsg] = React.useState<string | null>(null);

  const addExperience = () => {
    const newRecord: ExperienceRecord = {
      id: `exp-${Date.now()}`,
      role: "",
      organization: "",
      yearsOfExperience: 2,
      isTeachingRole: false,
      description: "",
    };
    onExperienceListChange([...experienceList, newRecord]);
    setErrorMsg(null);
  };

  const removeExperience = (id: string) => {
    if (experienceList.length <= 1) return;
    onExperienceListChange(experienceList.filter((e) => e.id !== id));
  };

  const updateRecord = (id: string, updates: Partial<ExperienceRecord>) => {
    onExperienceListChange(
      experienceList.map((e) => (e.id === id ? { ...e, ...updates } : e))
    );
    setErrorMsg(null);
  };

  const handleNext = (e: React.FormEvent) => {
    e.preventDefault();

    if (!primarySubject.trim()) {
      setErrorMsg("Please select your primary teaching subject domain.");
      return;
    }

    const incomplete = experienceList.some(
      (e) => !e.role.trim() || !e.organization.trim() || !e.description.trim()
    );

    if (incomplete) {
      setErrorMsg("Please provide job role, company/organization, and descriptions for all experience records.");
      return;
    }

    setErrorMsg(null);
    onNext();
  };

  return (
    <form onSubmit={handleNext} className="space-y-6">
      {/* Subject Domain & Target Learners */}
      <div className="bg-card border border-border rounded-2xl p-6 sm:p-7 shadow-xs space-y-5">
        <div>
          <h2 className="text-lg font-bold text-foreground flex items-center gap-2">
            <Briefcase className="w-5 h-5 text-primary" />
            Subject Specialization & Teaching Focus
          </h2>
          <p className="text-xs text-muted-foreground mt-1">
            Specify your primary areas of technical mastery and your ideal student audience.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
          <div className="space-y-1.5">
            <Label required>Primary Subject Domain</Label>
            <select
              value={primarySubject}
              onChange={(e) => onSubjectChange(e.target.value)}
              className="w-full rounded-lg border border-border bg-card px-3.5 py-2.5 text-sm text-foreground transition-all focus:outline-hidden focus:border-primary focus:ring-2 focus:ring-primary/20"
              required
            >
              <option value="" disabled>
                Select your technical discipline...
              </option>
              {SUBJECT_OPTIONS.map((sub) => (
                <option key={sub} value={sub}>
                  {sub}
                </option>
              ))}
            </select>
          </div>

          <div className="space-y-1.5">
            <Label required>Target Student Audience</Label>
            <select
              value={targetAudience}
              onChange={(e) => onAudienceChange(e.target.value)}
              className="w-full rounded-lg border border-border bg-card px-3.5 py-2.5 text-sm text-foreground transition-all focus:outline-hidden focus:border-primary focus:ring-2 focus:ring-primary/20"
              required
            >
              {AUDIENCE_OPTIONS.map((aud) => (
                <option key={aud} value={aud}>
                  {aud}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Experience History Records */}
      <div className="bg-card border border-border rounded-2xl p-6 sm:p-7 shadow-xs space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <h3 className="text-base font-bold text-foreground">
              Industry & Teaching Experience History
            </h3>
            <p className="text-xs text-muted-foreground mt-0.5">
              Include current and previous positions, software engineering achievements, and lecturing roles.
            </p>
          </div>

          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={addExperience}
            className="gap-1.5 shrink-0"
          >
            <Plus className="w-3.5 h-3.5 text-primary" />
            <span>Add Experience Record</span>
          </Button>
        </div>

        {errorMsg && (
          <div className="p-3.5 rounded-xl border border-destructive/20 bg-destructive/10 text-destructive text-xs font-medium">
            {errorMsg}
          </div>
        )}

        <div className="space-y-5 pt-2">
          {experienceList.map((record, index) => (
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
                    Role #{index + 1}
                  </span>
                </div>

                {experienceList.length > 1 && (
                  <button
                    type="button"
                    onClick={() => removeExperience(record.id)}
                    className="text-xs text-muted-foreground hover:text-destructive flex items-center gap-1 transition-colors cursor-pointer"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                    <span>Remove</span>
                  </button>
                )}
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="space-y-1.5 sm:col-span-1">
                  <Label required>Job Title / Position</Label>
                  <Input
                    placeholder="e.g. Senior Backend Engineer"
                    value={record.role}
                    onChange={(e) => updateRecord(record.id, { role: e.target.value })}
                    required
                  />
                </div>

                <div className="space-y-1.5 sm:col-span-1">
                  <Label required>Company / University / Organization</Label>
                  <Input
                    placeholder="e.g. Ethio Telecom, AAU, Tech Startup"
                    value={record.organization}
                    onChange={(e) => updateRecord(record.id, { organization: e.target.value })}
                    required
                  />
                </div>

                <div className="space-y-1.5 sm:col-span-1">
                  <Label required>Years in Role</Label>
                  <Input
                    type="number"
                    min={1}
                    max={35}
                    value={record.yearsOfExperience}
                    onChange={(e) =>
                      updateRecord(record.id, { yearsOfExperience: Number(e.target.value) })
                    }
                    required
                  />
                </div>
              </div>

              {/* Teaching role checkbox */}
              <div className="flex items-center gap-2.5 pt-1">
                <input
                  type="checkbox"
                  id={`teaching-${record.id}`}
                  checked={record.isTeachingRole}
                  onChange={(e) =>
                    updateRecord(record.id, { isTeachingRole: e.target.checked })
                  }
                  className="rounded border-border text-primary focus:ring-primary w-4 h-4 cursor-pointer"
                />
                <label
                  htmlFor={`teaching-${record.id}`}
                  className="text-xs font-medium text-foreground cursor-pointer select-none"
                >
                  This position involved teaching, university lecturing, mentoring, or technical training.
                </label>
              </div>

              {/* Responsibilities Description */}
              <div className="space-y-1.5">
                <Label required>Responsibilities & Key Accomplishments</Label>
                <textarea
                  rows={3}
                  placeholder="Detail your engineering achievements, technologies utilized, systems scaled, or courses taught..."
                  value={record.description}
                  onChange={(e) =>
                    updateRecord(record.id, { description: e.target.value })
                  }
                  className="w-full rounded-lg border border-border bg-card px-3.5 py-2.5 text-sm text-foreground placeholder:text-muted-foreground transition-all focus:outline-hidden focus:border-primary focus:ring-2 focus:ring-primary/20 resize-none"
                  required
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Navigation Controls */}
      <div className="flex items-center justify-between">
        <Button type="button" variant="outline" size="md" onClick={onBack} className="gap-2">
          <ArrowLeft className="w-4 h-4" />
          <span>Back</span>
        </Button>

        <Button type="submit" variant="primary" size="md" className="gap-2 shadow-xs">
          <span>Continue to Accreditations</span>
          <ArrowRight className="w-4 h-4" />
        </Button>
      </div>
    </form>
  );
}
