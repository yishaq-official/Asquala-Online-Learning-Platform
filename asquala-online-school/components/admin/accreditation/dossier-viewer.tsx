"use client";

import React, { useState } from "react";
import {
  GraduationCap,
  Building2,
  Award,
  UserCheck,
  FileText,
  Eye,
  CheckCircle2,
  AlertTriangle,
  PlayCircle,
  ExternalLink,
  ShieldCheck,
  Phone,
  Mail,
  MapPin,
  X,
  Download,
  Calendar,
} from "lucide-react";
import { TeacherDossier, DegreeRecord } from "@/types/admin";
import { Button } from "@/components/ui/button";

interface DossierViewerProps {
  dossier: TeacherDossier;
}

export function DossierViewer({ dossier }: DossierViewerProps) {
  const [activeTab, setActiveTab] = useState<"degrees" | "experience" | "certs" | "identity">("degrees");
  const [inspectingDegree, setInspectingDegree] = useState<DegreeRecord | null>(null);

  return (
    <div className="bg-card border border-border rounded-3xl p-5 sm:p-7 shadow-2xs space-y-6">
      {/* Dossier Tabs Navigation */}
      <div className="flex flex-wrap items-center gap-2 pb-4 border-b border-border">
        <button
          type="button"
          onClick={() => setActiveTab("degrees")}
          className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer border ${
            activeTab === "degrees"
              ? "bg-primary text-primary-foreground border-primary shadow-2xs"
              : "bg-secondary/60 text-muted-foreground hover:text-foreground hover:bg-secondary border-border"
          }`}
        >
          <GraduationCap className="w-4 h-4" />
          <span>University Degrees & Scans ({dossier.degrees.length})</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab("experience")}
          className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer border ${
            activeTab === "experience"
              ? "bg-primary text-primary-foreground border-primary shadow-2xs"
              : "bg-secondary/60 text-muted-foreground hover:text-foreground hover:bg-secondary border-border"
          }`}
        >
          <Building2 className="w-4 h-4" />
          <span>Engineering Experience ({dossier.experience.length})</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab("certs")}
          className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer border ${
            activeTab === "certs"
              ? "bg-primary text-primary-foreground border-primary shadow-2xs"
              : "bg-secondary/60 text-muted-foreground hover:text-foreground hover:bg-secondary border-border"
          }`}
        >
          <Award className="w-4 h-4" />
          <span>Certs & Audition Lecture ({dossier.certifications.length})</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab("identity")}
          className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer border ${
            activeTab === "identity"
              ? "bg-primary text-primary-foreground border-primary shadow-2xs"
              : "bg-secondary/60 text-muted-foreground hover:text-foreground hover:bg-secondary border-border"
          }`}
        >
          <UserCheck className="w-4 h-4" />
          <span>Verified Identity & Contact</span>
        </button>
      </div>

      {/* TAB 1: University Degrees & Scans */}
      {activeTab === "degrees" && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-bold text-foreground">
              Accredited Higher Education Credentials
            </h3>
            <span className="text-[11px] text-muted-foreground">
              Verified against Ethiopian University Registrar databases
            </span>
          </div>

          <div className="space-y-3">
            {dossier.degrees.map((deg) => {
              const isVerified = deg.verificationSealStatus === "verified";
              const isFlagged = deg.verificationSealStatus === "flagged_illegible";

              return (
                <div
                  key={deg.id}
                  className="p-4 rounded-2xl bg-secondary/30 border border-border space-y-3"
                >
                  <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-sm text-foreground">
                          {deg.degreeLevel} in {deg.fieldOfStudy}
                        </span>
                        <span className="text-xs text-muted-foreground">
                          • Class of {deg.graduationYear}
                        </span>
                      </div>
                      <p className="text-xs text-emerald-950 font-semibold mt-0.5">
                        {deg.institution}
                      </p>
                      <p className="text-[11px] text-muted-foreground mt-0.5">
                        Registrar Registry ID: <span className="font-mono text-foreground font-semibold">{deg.registrarVerificationId}</span>
                      </p>
                    </div>

                    <div className="shrink-0">
                      {isVerified ? (
                        <span className="text-[10px] font-bold px-2.5 py-1 rounded-full bg-emerald-100 text-emerald-800 border border-emerald-300 flex items-center gap-1">
                          <CheckCircle2 className="w-3 h-3 text-emerald-700" />
                          Registrar Seal Verified
                        </span>
                      ) : isFlagged ? (
                        <span className="text-[10px] font-bold px-2.5 py-1 rounded-full bg-amber-100 text-amber-900 border border-amber-300 flex items-center gap-1">
                          <AlertTriangle className="w-3 h-3 text-amber-700" />
                          Illegible Seal (Re-upload Req)
                        </span>
                      ) : (
                        <span className="text-[10px] font-bold px-2.5 py-1 rounded-full bg-secondary text-muted-foreground border border-border">
                          Pending Verification
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Document Attachment Box */}
                  <div className="p-3 rounded-xl bg-card border border-border flex items-center justify-between gap-3">
                    <div className="flex items-center gap-3 min-w-0">
                      <div className="w-9 h-9 rounded-lg bg-emerald-50 border border-emerald-200 flex items-center justify-center text-emerald-800 shrink-0">
                        <FileText className="w-4 h-4" />
                      </div>
                      <div className="min-w-0">
                        <p className="text-xs font-bold text-foreground truncate">
                          {deg.documentScanName}
                        </p>
                        <p className="text-[10px] text-muted-foreground">
                          Scan Specs: {deg.documentScanSize}
                        </p>
                      </div>
                    </div>

                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={() => setInspectingDegree(deg)}
                      className="gap-1.5 text-xs font-bold shrink-0 shadow-2xs hover:border-primary text-primary"
                    >
                      <Eye className="w-3.5 h-3.5" />
                      <span>Inspect Scan</span>
                    </Button>
                  </div>

                  {deg.scanNotes && (
                    <p className="text-[11px] text-muted-foreground italic px-1">
                      Note: {deg.scanNotes}
                    </p>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* TAB 2: Engineering & Teaching Experience */}
      {activeTab === "experience" && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-bold text-foreground">
              Production Engineering Tenure & References
            </h3>
            <span className="text-[11px] text-muted-foreground">
              Minimum 3 years verified production engineering required
            </span>
          </div>

          <div className="space-y-4">
            {dossier.experience.map((exp) => (
              <div
                key={exp.id}
                className="p-4 rounded-2xl bg-secondary/30 border border-border space-y-3"
              >
                <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-2">
                  <div>
                    <h4 className="text-sm font-bold text-foreground">
                      {exp.role}
                    </h4>
                    <p className="text-xs text-emerald-950 font-semibold">
                      {exp.organization}
                    </p>
                  </div>
                  <div className="text-right">
                    <span className="text-xs font-bold text-foreground">
                      {exp.period}
                    </span>
                    <span className="text-[10px] text-muted-foreground block">
                      {exp.years} years verified tenure
                    </span>
                  </div>
                </div>

                <div className="space-y-1">
                  <p className="text-[11px] font-bold text-muted-foreground uppercase tracking-wider">
                    Key Technical Responsibilities & Systems Built:
                  </p>
                  <ul className="space-y-1 text-xs text-foreground/90 pl-4 list-disc">
                    {exp.highlights.map((item, idx) => (
                      <li key={idx} className="leading-relaxed">
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>

                {exp.academicReference && (
                  <div className="p-3 rounded-xl bg-card border border-border text-xs space-y-1">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-800">
                      Academic / Professional Reference:
                    </span>
                    <p className="font-bold text-foreground">
                      {exp.academicReference.name} — {exp.academicReference.title}
                    </p>
                    <p className="text-[11px] text-muted-foreground">
                      {exp.academicReference.institution} • Contact: {exp.academicReference.contact}
                    </p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 3: Certifications & Audition Lecture */}
      {activeTab === "certs" && (
        <div className="space-y-5">
          {/* Vendor Certs */}
          <div className="space-y-3">
            <h3 className="text-sm font-bold text-foreground">
              Industry Certifications
            </h3>
            {dossier.certifications.length === 0 ? (
              <div className="p-4 rounded-2xl bg-secondary/30 border border-border text-xs text-muted-foreground text-center">
                No formal third-party cloud certifications filed.
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {dossier.certifications.map((cert) => (
                  <div
                    key={cert.id}
                    className="p-3.5 rounded-2xl bg-secondary/30 border border-border space-y-1.5"
                  >
                    <div className="flex items-center gap-2">
                      <Award className="w-4 h-4 text-emerald-700" />
                      <h4 className="text-xs font-bold text-foreground truncate">
                        {cert.title}
                      </h4>
                    </div>
                    <p className="text-[11px] text-muted-foreground">
                      Issuer: <strong className="text-foreground">{cert.issuer}</strong>
                    </p>
                    <div className="flex items-center justify-between text-[10px] pt-1 border-t border-border/60">
                      <span className="font-mono text-muted-foreground">
                        ID: {cert.credentialId}
                      </span>
                      <span className="text-muted-foreground font-medium">
                        Issued: {cert.issueDate}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Audition Lecture Section */}
          <div className="space-y-3 pt-3 border-t border-border">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-bold text-foreground">
                Audition Teaching Sample (Curriculum Quality Screen)
              </h3>
              <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 border border-emerald-200">
                {dossier.auditionLecture.durationMinutes} Minutes
              </span>
            </div>

            <div className="p-4 rounded-2xl bg-secondary/30 border border-border space-y-3">
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-xl bg-emerald-100 border border-emerald-300 flex items-center justify-center text-emerald-900 shrink-0">
                  <PlayCircle className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-foreground">
                    {dossier.auditionLecture.title}
                  </h4>
                  <p className="text-[11px] text-muted-foreground mt-0.5">
                    Instruction language: Amharic with professional English terminology
                  </p>
                </div>
              </div>

              <div className="p-3 rounded-xl bg-card border border-border space-y-1.5 text-xs">
                <span className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">
                  Topics Covered in Demonstration:
                </span>
                <ul className="list-disc pl-4 space-y-0.5 text-foreground/90 text-xs">
                  {dossier.auditionLecture.topicsCovered.map((topic, i) => (
                    <li key={i}>{topic}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 4: Verified Identity & Contact */}
      {activeTab === "identity" && (
        <div className="space-y-4">
          <h3 className="text-sm font-bold text-foreground">
            Legal Identity & Contact Verification
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* National ID Card */}
            <div className="p-4 rounded-2xl bg-secondary/30 border border-border space-y-3">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-emerald-700" />
                <h4 className="text-xs font-bold text-foreground">
                  Ethiopian National ID Verification
                </h4>
              </div>
              <p className="text-xs text-muted-foreground">
                Verified against Ministry of Peace / National ID Program registry.
              </p>
              <div className="p-2.5 rounded-xl bg-card border border-border flex items-center justify-between">
                <span className="text-xs font-mono font-bold text-foreground">
                  {dossier.identity.nationalIdNumberMasked}
                </span>
                <span className="text-[10px] font-bold text-emerald-800 bg-emerald-100 px-2 py-0.5 rounded-full">
                  MATCH CONFIRMED
                </span>
              </div>
            </div>

            {/* Direct Contact */}
            <div className="p-4 rounded-2xl bg-secondary/30 border border-border space-y-2.5 text-xs">
              <h4 className="text-xs font-bold text-foreground">
                Official Contact & Location
              </h4>

              <div className="flex items-center gap-2 text-foreground">
                <UserCheck className="w-3.5 h-3.5 text-emerald-700" />
                <span className="font-semibold">{dossier.identity.fullName}</span>
              </div>

              <div className="flex items-center gap-2 text-foreground">
                <Mail className="w-3.5 h-3.5 text-emerald-700" />
                <span>{dossier.identity.officialEmail}</span>
              </div>

              <div className="flex items-center gap-2 text-foreground">
                <Phone className="w-3.5 h-3.5 text-emerald-700" />
                <span>{dossier.identity.phone}</span>
              </div>

              <div className="flex items-center gap-2 text-muted-foreground">
                <MapPin className="w-3.5 h-3.5 text-emerald-700" />
                <span>{dossier.identity.location}</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* High-Resolution Document Scan Modal */}
      {inspectingDegree && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/70 backdrop-blur-xs animate-in fade-in duration-200">
          <div className="bg-card border border-border rounded-3xl max-w-2xl w-full p-6 shadow-2xl relative space-y-5 animate-in zoom-in-95 duration-200 max-h-[90vh] overflow-y-auto">
            {/* Modal Header */}
            <div className="flex items-center justify-between pb-3 border-b border-border">
              <div>
                <h3 className="text-base font-bold text-foreground">
                  Official Academic Transcript & Diploma Scan
                </h3>
                <p className="text-xs text-muted-foreground">
                  {inspectingDegree.institution} • Registry ID: {inspectingDegree.registrarVerificationId}
                </p>
              </div>

              <button
                type="button"
                onClick={() => setInspectingDegree(null)}
                className="p-2 rounded-xl text-muted-foreground hover:text-foreground hover:bg-secondary cursor-pointer"
                aria-label="Close modal"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Document Scan Simulated Canvas */}
            <div className="p-8 rounded-2xl bg-amber-50/40 border-2 border-dashed border-amber-300 text-center space-y-4">
              <div className="mx-auto w-16 h-16 rounded-full bg-emerald-100 border-2 border-emerald-600 flex items-center justify-center text-emerald-900 font-bold text-xs uppercase shadow-sm">
                MoE SEAL
              </div>

              <div className="space-y-1">
                <p className="text-xs uppercase tracking-widest font-bold text-emerald-950">
                  Federal Democratic Republic of Ethiopia
                </p>
                <p className="text-[11px] uppercase tracking-wider font-semibold text-muted-foreground">
                  Ministry of Education • Higher Education Accreditation
                </p>
                <h4 className="text-lg font-serif font-bold text-foreground pt-2">
                  {inspectingDegree.institution}
                </h4>
              </div>

              <div className="py-2 px-4 bg-white/80 rounded-xl border border-amber-200/80 inline-block text-left text-xs space-y-1">
                <p className="text-muted-foreground">This certifies that</p>
                <p className="font-bold text-base text-foreground">{dossier.name}</p>
                <p className="text-muted-foreground">
                  has completed all requirements for the degree of
                </p>
                <p className="font-bold text-emerald-950">
                  {inspectingDegree.degreeLevel} in {inspectingDegree.fieldOfStudy}
                </p>
                <p className="text-[11px] text-muted-foreground">
                  Conferred in the year {inspectingDegree.graduationYear}
                </p>
              </div>

              <div className="flex items-center justify-around pt-3 border-t border-amber-200 text-[10px] text-muted-foreground">
                <div>
                  <p className="font-mono font-bold text-foreground">
                    {inspectingDegree.registrarVerificationId}
                  </p>
                  <span>Registrar Serial Number</span>
                </div>
                <div>
                  <span className="font-bold text-emerald-800 bg-emerald-100 px-2 py-0.5 rounded-full">
                    {inspectingDegree.verificationSealStatus === "verified" ? "AUTHENTIC SEAL" : "FLAGGED SCAN"}
                  </span>
                  <span className="block mt-0.5">Verification Status</span>
                </div>
              </div>
            </div>

            {/* Modal Actions */}
            <div className="flex items-center justify-end gap-2 pt-2 border-t border-border">
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() => setInspectingDegree(null)}
              >
                Close Inspector
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
