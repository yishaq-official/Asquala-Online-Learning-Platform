"use client";

import React from "react";
import {
  ShieldCheck,
  GraduationCap,
  Award,
  Plus,
  CheckCircle2,
  FileText,
  ExternalLink,
} from "lucide-react";
import { EducationRecord, CertificateRecord } from "@/types/instructor";
import { Button } from "@/components/ui/button";

interface VerifiedCredentialsCardProps {
  education: EducationRecord[];
  certifications: CertificateRecord[];
  onOpenSubmitModal: () => void;
}

export function VerifiedCredentialsCard({
  education,
  certifications,
  onOpenSubmitModal,
}: VerifiedCredentialsCardProps) {
  return (
    <div className="space-y-6">
      {/* Official Accreditation Status Card */}
      <div className="bg-gradient-to-br from-card via-card to-primary-light/30 border-2 border-primary/40 rounded-2xl p-5 sm:p-6 shadow-xs flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3.5">
          <div className="w-12 h-12 rounded-2xl bg-primary text-primary-foreground flex items-center justify-center font-bold shadow-xs shrink-0">
            <ShieldCheck className="w-7 h-7" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-base sm:text-lg font-extrabold text-foreground">
                Verified Asquala Educator Accreditation
              </h3>
              <span className="px-2 py-0.5 rounded-full text-[10px] font-extrabold bg-emerald-100 text-emerald-800 uppercase tracking-wider">
                Active
              </span>
            </div>
            <p className="text-xs text-muted-foreground mt-0.5">
              Verified by the Asquala Academic Review Board • Authorized to publish accredited curriculum and issue certificates.
            </p>
          </div>
        </div>

        <Button
          type="button"
          variant="primary"
          size="sm"
          onClick={onOpenSubmitModal}
          className="gap-1.5 text-xs shadow-xs shrink-0 self-start sm:self-auto"
        >
          <Plus className="w-3.5 h-3.5" />
          <span>Add New Credential</span>
        </Button>
      </div>

      {/* Verified Academic Degrees */}
      <div className="bg-card border border-border rounded-2xl p-5 sm:p-6 shadow-xs space-y-4">
        <div className="flex items-center gap-2.5 pb-2 border-b border-border/80">
          <div className="w-8 h-8 rounded-lg bg-primary-light text-primary flex items-center justify-center font-bold">
            <GraduationCap className="w-4 h-4" />
          </div>
          <div>
            <h4 className="text-base font-bold text-foreground">
              Verified University Degrees &amp; Diplomas ({education.length})
            </h4>
            <p className="text-xs text-muted-foreground">
              Undergraduate and graduate diplomas verified via official transcripts
            </p>
          </div>
        </div>

        <div className="space-y-3 pt-1">
          {education.map((edu) => (
            <div
              key={edu.id}
              className="p-4 rounded-xl border border-border bg-secondary/20 hover:bg-secondary/40 transition-colors flex flex-col sm:flex-row sm:items-center justify-between gap-3"
            >
              <div className="flex items-start gap-3">
                <div className="w-9 h-9 rounded-xl bg-card border border-border flex items-center justify-center text-primary shrink-0 mt-0.5">
                  <GraduationCap className="w-5 h-5" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h5 className="text-xs sm:text-sm font-bold text-foreground">
                      {edu.degree}
                    </h5>
                    <span className="inline-flex items-center gap-1 text-[10px] font-bold text-emerald-700 bg-emerald-100 px-2 py-0.2 rounded-full">
                      <CheckCircle2 className="w-3 h-3" />
                      <span>Verified</span>
                    </span>
                  </div>
                  <p className="text-xs text-muted-foreground mt-0.5">
                    {edu.institution} • Graduated {edu.graduationYear}
                  </p>
                  {edu.documentName && (
                    <div className="flex items-center gap-1.5 mt-1.5 text-[11px] font-mono text-muted-foreground">
                      <FileText className="w-3 h-3" />
                      <span className="truncate max-w-xs">{edu.documentName}</span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Verified Professional Certifications */}
      <div className="bg-card border border-border rounded-2xl p-5 sm:p-6 shadow-xs space-y-4">
        <div className="flex items-center gap-2.5 pb-2 border-b border-border/80">
          <div className="w-8 h-8 rounded-lg bg-amber-500/10 text-amber-600 border border-amber-200 flex items-center justify-center font-bold">
            <Award className="w-4 h-4" />
          </div>
          <div>
            <h4 className="text-base font-bold text-foreground">
              Industry Certifications &amp; Accreditations ({certifications.length})
            </h4>
            <p className="text-xs text-muted-foreground">
              Globally recognized technical credentials audited by Asquala
            </p>
          </div>
        </div>

        <div className="space-y-3 pt-1">
          {certifications.map((cert) => (
            <div
              key={cert.id}
              className="p-4 rounded-xl border border-border bg-secondary/20 hover:bg-secondary/40 transition-colors flex flex-col sm:flex-row sm:items-center justify-between gap-3"
            >
              <div className="flex items-start gap-3">
                <div className="w-9 h-9 rounded-xl bg-card border border-border flex items-center justify-center text-amber-600 shrink-0 mt-0.5">
                  <Award className="w-5 h-5" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h5 className="text-xs sm:text-sm font-bold text-foreground">
                      {cert.title}
                    </h5>
                    <span className="inline-flex items-center gap-1 text-[10px] font-bold text-emerald-700 bg-emerald-100 px-2 py-0.2 rounded-full">
                      <CheckCircle2 className="w-3 h-3" />
                      <span>Verified</span>
                    </span>
                  </div>
                  <p className="text-xs text-muted-foreground mt-0.5">
                    {cert.issuingOrganization} • Issued {cert.issueDate}
                  </p>
                  {cert.credentialId && (
                    <p className="text-[11px] font-mono text-muted-foreground mt-1">
                      Credential ID: <strong>{cert.credentialId}</strong>
                    </p>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
