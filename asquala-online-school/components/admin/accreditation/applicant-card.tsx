"use client";

import React from "react";
import Link from "next/link";
import {
  GraduationCap,
  Building2,
  Clock,
  AlertTriangle,
  CheckCircle2,
  XCircle,
  ArrowRight,
  ShieldCheck,
  FileText,
} from "lucide-react";
import { TeacherDossier } from "@/types/admin";

interface ApplicantCardProps {
  dossier: TeacherDossier;
}

export function ApplicantCard({ dossier }: ApplicantCardProps) {
  const isPending = dossier.status === "pending";
  const isActionReq = dossier.status === "action_required";
  const isApproved = dossier.status === "approved";
  const isRejected = dossier.status === "rejected";

  return (
    <div className="p-5 rounded-2xl bg-card border border-border hover:border-emerald-300 transition-all shadow-2xs hover:shadow-sm space-y-4 flex flex-col justify-between">
      <div className="space-y-3">
        {/* Top Header: Avatar, Name & Status */}
        <div className="flex items-start justify-between gap-3">
          <div className="flex items-start gap-3 min-w-0">
            <div className="relative shrink-0">
              <img
                src={dossier.avatarUrl}
                alt={dossier.name}
                className="w-12 h-12 rounded-2xl object-cover border border-border"
              />
              {isApproved && (
                <div
                  className="absolute -bottom-1 -right-1 w-4 h-4 rounded-full bg-emerald-600 ring-2 ring-card flex items-center justify-center text-[9px] text-white font-bold"
                  title="Verified Educator"
                >
                  ✓
                </div>
              )}
            </div>

            <div className="min-w-0">
              <h3 className="text-sm font-bold text-foreground truncate">
                {dossier.name}
              </h3>
              <p className="text-xs text-muted-foreground truncate">
                {dossier.headline}
              </p>
              <span className="inline-block text-[10px] text-emerald-800 font-semibold mt-0.5">
                Specialty: {dossier.specialty}
              </span>
            </div>
          </div>

          {/* Status Badge */}
          <div className="shrink-0">
            {isPending && (
              <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200 flex items-center gap-1">
                <Clock className="w-2.5 h-2.5 text-emerald-600" />
                Under Review
              </span>
            )}
            {isActionReq && (
              <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-amber-100 text-amber-900 border border-amber-300 flex items-center gap-1">
                <AlertTriangle className="w-2.5 h-2.5 text-amber-700" />
                Action Required
              </span>
            )}
            {isApproved && (
              <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 border border-emerald-300 flex items-center gap-1">
                <CheckCircle2 className="w-2.5 h-2.5 text-emerald-700" />
                Verified Educator
              </span>
            )}
            {isRejected && (
              <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-rose-100 text-rose-800 border border-rose-300 flex items-center gap-1">
                <XCircle className="w-2.5 h-2.5 text-rose-700" />
                Denied
              </span>
            )}
          </div>
        </div>

        {/* Academic Qualification & Industry Experience */}
        <div className="p-3 rounded-xl bg-secondary/50 border border-border/80 space-y-1.5 text-xs">
          <div className="flex items-center gap-2 text-foreground font-semibold">
            <GraduationCap className="w-3.5 h-3.5 text-emerald-700 shrink-0" />
            <span className="truncate">{dossier.degreeTitle}</span>
          </div>
          <p className="text-[11px] text-muted-foreground pl-5.5">
            {dossier.institution}
          </p>

          <div className="flex items-center gap-2 text-foreground pt-1 border-t border-border/60">
            <Building2 className="w-3.5 h-3.5 text-emerald-700 shrink-0" />
            <span className="truncate">
              {dossier.yearsExperience} yrs tenure • {dossier.currentCompany}
            </span>
          </div>
        </div>

        {/* Active Board Note */}
        {dossier.statusNote && (
          <div
            className={`p-2.5 rounded-xl text-xs font-medium ${
              isActionReq
                ? "bg-amber-50 text-amber-950 border border-amber-200"
                : isRejected
                ? "bg-rose-50 text-rose-950 border border-rose-200"
                : "bg-emerald-50 text-emerald-950 border border-emerald-200/80"
            }`}
          >
            <p className="text-[11px] leading-relaxed">
              <strong>Auditor Note:</strong> {dossier.statusNote}
            </p>
          </div>
        )}
      </div>

      {/* Footer Details & Action Button */}
      <div className="pt-3 border-t border-border flex items-center justify-between gap-2">
        <span className="text-[10px] text-muted-foreground">
          Submitted {dossier.submittedAt}
        </span>

        <Link
          href={`/admin/accreditation/${dossier.id}`}
          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold bg-primary text-primary-foreground hover:bg-primary-hover shadow-2xs transition-colors"
        >
          <span>Inspect Dossier</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </Link>
      </div>
    </div>
  );
}
