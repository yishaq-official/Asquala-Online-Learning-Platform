"use client";

import React, { useState, use } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  ArrowLeft,
  ShieldCheck,
  Award,
  AlertTriangle,
  CheckCircle2,
  XCircle,
  Clock,
  FileCheck,
  History,
  Sparkles,
} from "lucide-react";
import { useAdminUiStore } from "@/stores/admin-ui-store";
import { DossierViewer } from "@/components/admin/accreditation/dossier-viewer";
import { AuditActionModal } from "@/components/admin/accreditation/audit-action-modal";
import { Button } from "@/components/ui/button";

export default function CandidateDossierPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const resolvedParams = use(params);
  const router = useRouter();
  const { teacherDossiers } = useAdminUiStore();
  const dossier = teacherDossiers[resolvedParams.id];

  const [isRulingModalOpen, setIsRulingModalOpen] = useState(false);

  if (!dossier) {
    return (
      <div className="p-12 text-center bg-card border border-border rounded-3xl space-y-4 max-w-lg mx-auto my-12">
        <div className="w-12 h-12 rounded-2xl bg-secondary flex items-center justify-center mx-auto text-muted-foreground">
          <AlertTriangle className="w-6 h-6 text-amber-600" />
        </div>
        <h2 className="text-lg font-bold text-foreground">
          Dossier Not Found
        </h2>
        <p className="text-xs text-muted-foreground">
          No teacher application matches the identifier "{resolvedParams.id}".
        </p>
        <Link
          href="/admin/accreditation"
          className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold bg-primary text-primary-foreground hover:bg-primary-hover shadow-2xs transition-colors"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Return to Accreditation Queue</span>
        </Link>
      </div>
    );
  }

  const isPending = dossier.status === "pending";
  const isActionReq = dossier.status === "action_required";
  const isApproved = dossier.status === "approved";
  const isRejected = dossier.status === "rejected";

  return (
    <div className="space-y-6">
      {/* Top Breadcrumb & Actions Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <Link
          href="/admin/accreditation"
          className="inline-flex items-center gap-2 text-xs font-bold text-muted-foreground hover:text-foreground transition-colors group"
        >
          <ArrowLeft className="w-4 h-4 text-emerald-700 group-hover:-translate-x-0.5 transition-transform" />
          <span>Back to Accreditation Queue</span>
          <span className="text-[10px] text-muted-foreground font-mono">
            (Dossier #{dossier.id})
          </span>
        </Link>

        {/* Primary Ruling CTA */}
        <Button
          type="button"
          variant="primary"
          size="md"
          onClick={() => setIsRulingModalOpen(true)}
          className="gap-2 text-xs font-bold shadow-md cursor-pointer"
        >
          <ShieldCheck className="w-4 h-4" />
          <span>Record Board Ruling</span>
        </Button>
      </div>

      {/* Candidate Overview Banner */}
      <div className="bg-card border border-border rounded-3xl p-6 sm:p-7 shadow-2xs flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="flex items-start gap-4 min-w-0">
          <div className="relative shrink-0">
            <img
              src={dossier.avatarUrl}
              alt={dossier.name}
              className="w-16 h-16 sm:w-20 sm:h-20 rounded-3xl object-cover border-2 border-border shadow-xs"
            />
            {isApproved && (
              <div
                className="absolute -bottom-1 -right-1 w-6 h-6 rounded-full bg-emerald-600 ring-4 ring-card flex items-center justify-center text-xs text-white font-bold"
                title="Verified Educator License"
              >
                ✓
              </div>
            )}
          </div>

          <div className="min-w-0 space-y-1">
            <div className="flex flex-wrap items-center gap-2.5">
              <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-foreground truncate">
                {dossier.name}
              </h1>

              {/* Status Badge */}
              {isPending && (
                <span className="text-xs font-bold px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200 flex items-center gap-1.5">
                  <Clock className="w-3.5 h-3.5 text-emerald-600" />
                  Under Board Review
                </span>
              )}
              {isActionReq && (
                <span className="text-xs font-bold px-2.5 py-1 rounded-full bg-amber-100 text-amber-900 border border-amber-300 flex items-center gap-1.5">
                  <AlertTriangle className="w-3.5 h-3.5 text-amber-700" />
                  Action Required (Resubmission Flagged)
                </span>
              )}
              {isApproved && (
                <span className="text-xs font-bold px-2.5 py-1 rounded-full bg-emerald-100 text-emerald-800 border border-emerald-300 flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-700" />
                  Verified Asquala Educator
                </span>
              )}
              {isRejected && (
                <span className="text-xs font-bold px-2.5 py-1 rounded-full bg-rose-100 text-rose-800 border border-rose-300 flex items-center gap-1.5">
                  <XCircle className="w-3.5 h-3.5 text-rose-700" />
                  Application Denied
                </span>
              )}
            </div>

            <p className="text-xs sm:text-sm text-muted-foreground font-medium">
              {dossier.headline}
            </p>

            <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-muted-foreground pt-1">
              <span className="font-semibold text-emerald-950">
                Specialty: {dossier.specialty}
              </span>
              <span>• {dossier.institution}</span>
              <span>• {dossier.yearsExperience} yrs tenure ({dossier.currentCompany})</span>
            </div>
          </div>
        </div>
      </div>

      {/* Active Board Note Banner */}
      {dossier.statusNote && (
        <div
          className={`p-4 rounded-2xl flex items-start gap-3 ${
            isActionReq
              ? "bg-amber-50 text-amber-950 border border-amber-200"
              : isRejected
              ? "bg-rose-50 text-rose-950 border border-rose-200"
              : "bg-emerald-50 text-emerald-950 border border-emerald-200"
          }`}
        >
          {isActionReq ? (
            <AlertTriangle className="w-5 h-5 text-amber-700 shrink-0 mt-0.5" />
          ) : isRejected ? (
            <XCircle className="w-5 h-5 text-rose-700 shrink-0 mt-0.5" />
          ) : (
            <ShieldCheck className="w-5 h-5 text-emerald-700 shrink-0 mt-0.5" />
          )}
          <div className="text-xs space-y-0.5">
            <span className="font-bold block">Active Board Rationale & Note:</span>
            <p className="leading-relaxed">{dossier.statusNote}</p>
          </div>
        </div>
      )}

      {/* 4-Tab Evidence Dossier Viewer */}
      <DossierViewer dossier={dossier} />

      {/* Ruling History Log */}
      {dossier.boardRulingHistory && dossier.boardRulingHistory.length > 0 && (
        <div className="bg-card border border-border rounded-3xl p-5 sm:p-6 shadow-2xs space-y-3">
          <div className="flex items-center gap-2 pb-2 border-b border-border">
            <History className="w-4 h-4 text-emerald-700" />
            <h3 className="text-sm font-bold text-foreground">
              Accreditation Audit History & Cryptographic Rulings
            </h3>
          </div>

          <div className="space-y-2">
            {dossier.boardRulingHistory.map((h, i) => (
              <div
                key={i}
                className="p-3 rounded-2xl bg-secondary/40 border border-border flex items-start justify-between gap-3 text-xs"
              >
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-foreground capitalize">
                      Ruling: {h.ruling.replace("_", " ")}
                    </span>
                    <span className="text-[10px] text-muted-foreground">
                      • {h.date}
                    </span>
                  </div>
                  <p className="text-[11px] text-muted-foreground">{h.notes}</p>
                </div>
                <span className="text-[10px] font-bold text-emerald-800 bg-emerald-100 px-2 py-0.5 rounded-full shrink-0">
                  Signed: {h.auditor}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Board Ruling Action Modal */}
      <AuditActionModal
        dossier={dossier}
        isOpen={isRulingModalOpen}
        onClose={() => setIsRulingModalOpen(false)}
      />
    </div>
  );
}
