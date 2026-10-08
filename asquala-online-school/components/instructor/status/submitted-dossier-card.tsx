"use client";

import React, { useState } from "react";
import {
  FileText,
  GraduationCap,
  Briefcase,
  Award,
  BookOpen,
  User,
  Paperclip,
  ExternalLink,
  ChevronDown,
  ChevronUp,
} from "lucide-react";
import { InstructorApplication } from "@/types/instructor";

interface SubmittedDossierCardProps {
  application: InstructorApplication;
  onPreviewDocument?: (documentName: string) => void;
}

export function SubmittedDossierCard({
  application,
  onPreviewDocument,
}: SubmittedDossierCardProps) {
  const [activeSection, setActiveSection] = useState<
    "education" | "experience" | "certifications" | "proposal"
  >("education");

  return (
    <div className="bg-card border border-border rounded-2xl shadow-xs overflow-hidden">
      {/* Dossier Header */}
      <div className="p-6 sm:p-7 border-b border-border/80 bg-secondary/20">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3.5">
            <div className="w-12 h-12 rounded-2xl bg-primary-light text-primary flex items-center justify-center font-bold text-lg border border-primary-border shrink-0">
              {application.fullName.slice(0, 2).toUpperCase()}
            </div>
            <div>
              <h2 className="text-base font-bold text-foreground">
                {application.fullName}
              </h2>
              <p className="text-xs text-primary font-medium">
                {application.headline}
              </p>
              <p className="text-xs text-muted-foreground mt-0.5">
                {application.email} • {application.phone}
              </p>
            </div>
          </div>

          <div className="text-xs text-muted-foreground text-left sm:text-right shrink-0">
            <span className="block font-medium">Dossier Tracking ID</span>
            <span className="font-mono font-bold text-foreground">
              {application.id}
            </span>
          </div>
        </div>

        {/* Bio quote */}
        <div className="mt-4 p-3.5 rounded-xl bg-card border border-border text-xs text-foreground leading-relaxed italic">
          &ldquo;{application.bio}&rdquo;
        </div>
      </div>

      {/* Dossier Navigation Tabs */}
      <div className="flex border-b border-border bg-card/60 overflow-x-auto text-xs font-semibold">
        <button
          type="button"
          onClick={() => setActiveSection("education")}
          className={`flex items-center gap-2 px-5 py-3 border-b-2 transition-colors whitespace-nowrap cursor-pointer ${
            activeSection === "education"
              ? "border-primary text-primary bg-primary-light/30"
              : "border-transparent text-muted-foreground hover:text-foreground"
          }`}
        >
          <GraduationCap className="w-4 h-4" />
          <span>Degrees &amp; Transcripts ({application.education.length})</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveSection("experience")}
          className={`flex items-center gap-2 px-5 py-3 border-b-2 transition-colors whitespace-nowrap cursor-pointer ${
            activeSection === "experience"
              ? "border-primary text-primary bg-primary-light/30"
              : "border-transparent text-muted-foreground hover:text-foreground"
          }`}
        >
          <Briefcase className="w-4 h-4" />
          <span>Work Experience ({application.experience.length})</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveSection("certifications")}
          className={`flex items-center gap-2 px-5 py-3 border-b-2 transition-colors whitespace-nowrap cursor-pointer ${
            activeSection === "certifications"
              ? "border-primary text-primary bg-primary-light/30"
              : "border-transparent text-muted-foreground hover:text-foreground"
          }`}
        >
          <Award className="w-4 h-4" />
          <span>Certifications ({application.certifications.length})</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveSection("proposal")}
          className={`flex items-center gap-2 px-5 py-3 border-b-2 transition-colors whitespace-nowrap cursor-pointer ${
            activeSection === "proposal"
              ? "border-primary text-primary bg-primary-light/30"
              : "border-transparent text-muted-foreground hover:text-foreground"
          }`}
        >
          <BookOpen className="w-4 h-4" />
          <span>Proposed Curriculum</span>
        </button>
      </div>

      {/* Tab Contents */}
      <div className="p-6 sm:p-7">
        {/* Education Section */}
        {activeSection === "education" && (
          <div className="space-y-4">
            {application.education.map((edu, idx) => (
              <div
                key={edu.id || idx}
                className="p-4 sm:p-5 rounded-xl border border-border bg-card flex flex-col sm:flex-row sm:items-center justify-between gap-4"
              >
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold text-primary">
                      {edu.degree}
                    </span>
                    <span className="text-xs text-muted-foreground">• Class of {edu.graduationYear}</span>
                  </div>
                  <h4 className="text-sm font-bold text-foreground">
                    {edu.institution}
                  </h4>
                  <p className="text-xs text-muted-foreground">
                    Major / Field: <strong>{edu.fieldOfStudy}</strong>
                  </p>
                </div>

                {edu.documentName && (
                  <button
                    type="button"
                    onClick={() => onPreviewDocument?.(edu.documentName || "Degree_Certificate.pdf")}
                    className="inline-flex items-center gap-2 px-3 py-2 rounded-lg border border-border bg-secondary hover:bg-secondary/80 text-xs font-semibold text-foreground transition-colors cursor-pointer shrink-0"
                    title="View uploaded verification document"
                  >
                    <Paperclip className="w-3.5 h-3.5 text-primary" />
                    <span className="truncate max-w-[160px] sm:max-w-xs">{edu.documentName}</span>
                    <ExternalLink className="w-3 h-3 text-muted-foreground" />
                  </button>
                )}
              </div>
            ))}
          </div>
        )}

        {/* Experience Section */}
        {activeSection === "experience" && (
          <div className="space-y-4">
            <div className="p-3.5 rounded-xl bg-secondary/30 border border-border text-xs flex flex-wrap gap-4">
              <div>
                <span className="text-muted-foreground">Primary Subject: </span>
                <strong className="text-foreground">{application.primarySubject}</strong>
              </div>
              <div>
                <span className="text-muted-foreground">Target Audience: </span>
                <strong className="text-foreground">{application.targetAudience}</strong>
              </div>
            </div>

            {application.experience.map((exp, idx) => (
              <div
                key={exp.id || idx}
                className="p-4 sm:p-5 rounded-xl border border-border bg-card space-y-2"
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                  <div className="flex items-center gap-2">
                    <h4 className="text-sm font-bold text-foreground">{exp.role}</h4>
                    {exp.isTeachingRole && (
                      <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-primary-light text-primary border border-primary-border">
                        Teaching Role
                      </span>
                    )}
                  </div>
                  <span className="text-xs text-muted-foreground">
                    {exp.organization} • {exp.yearsOfExperience} years
                  </span>
                </div>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  {exp.description}
                </p>
              </div>
            ))}
          </div>
        )}

        {/* Certifications Section */}
        {activeSection === "certifications" && (
          <div className="space-y-4">
            {application.certifications.length === 0 ? (
              <p className="text-xs text-muted-foreground italic">
                No extra certifications submitted.
              </p>
            ) : (
              application.certifications.map((cert, idx) => (
                <div
                  key={cert.id || idx}
                  className="p-4 sm:p-5 rounded-xl border border-border bg-card flex flex-col sm:flex-row sm:items-center justify-between gap-4"
                >
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-bold text-primary">
                        {cert.title}
                      </span>
                      {cert.credentialId && (
                        <span className="text-[11px] font-mono text-muted-foreground">
                          (ID: {cert.credentialId})
                        </span>
                      )}
                    </div>
                    <p className="text-xs text-muted-foreground">
                      Issuing Authority: <strong>{cert.issuingOrganization}</strong> • Issued {cert.issueDate}
                    </p>
                  </div>

                  {cert.documentName && (
                    <button
                      type="button"
                      onClick={() => onPreviewDocument?.(cert.documentName || "Certificate_Proof.pdf")}
                      className="inline-flex items-center gap-2 px-3 py-2 rounded-lg border border-border bg-secondary hover:bg-secondary/80 text-xs font-semibold text-foreground transition-colors cursor-pointer shrink-0"
                    >
                      <Paperclip className="w-3.5 h-3.5 text-primary" />
                      <span className="truncate max-w-[160px] sm:max-w-xs">{cert.documentName}</span>
                      <ExternalLink className="w-3 h-3 text-muted-foreground" />
                    </button>
                  )}
                </div>
              ))
            )}
          </div>
        )}

        {/* Proposal Section */}
        {activeSection === "proposal" && (
          <div className="space-y-4">
            <div className="p-4 sm:p-5 rounded-xl border border-border bg-card space-y-2">
              <span className="text-[11px] font-bold uppercase tracking-wider text-primary">
                Proposed Inaugural Course
              </span>
              <h4 className="text-base font-bold text-foreground">
                Next.js 16 Full-Stack Mastery &amp; Distributed Architecture
              </h4>
              <p className="text-xs text-muted-foreground leading-relaxed">
                Comprehensive curriculum covering Next.js 16 App Router, TypeScript, Drizzle ORM singleton database connection pooling, better-auth session integration, and deployment in Ethiopian cloud infrastructure.
              </p>
            </div>

            {application.sampleVideoUrl && (
              <div className="p-4 rounded-xl border border-border bg-secondary/30 flex items-center justify-between gap-3 text-xs">
                <div>
                  <span className="font-semibold text-foreground block">
                    Sample Lecture Demonstration:
                  </span>
                  <span className="text-muted-foreground truncate max-w-sm block">
                    {application.sampleVideoUrl}
                  </span>
                </div>
                <a
                  href={application.sampleVideoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-3 py-1.5 rounded-lg bg-primary text-white font-semibold text-xs shrink-0 inline-flex items-center gap-1.5"
                >
                  <span>Watch Sample</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
