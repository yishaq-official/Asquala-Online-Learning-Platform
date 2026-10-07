"use client";

import * as React from "react";
import { Award, Eye, Calendar, User, ShieldCheck } from "lucide-react";
import { CertificateItem } from "@/types/student";
import { CertificateSharePopover } from "./certificate-share-popover";

interface CertificateGridCardProps {
  certificate: CertificateItem;
  onPreview: (certificate: CertificateItem) => void;
}

export function CertificateGridCard({
  certificate,
  onPreview,
}: CertificateGridCardProps) {
  return (
    <div className="group bg-card border-2 border-primary-border/60 hover:border-primary rounded-2xl p-6 shadow-2xs hover:shadow-md transition-all duration-200 flex flex-col justify-between gap-5 relative overflow-hidden">
      {/* Background seal watermark */}
      <div className="absolute -right-6 -bottom-6 w-32 h-32 rounded-full bg-primary-light/30 pointer-events-none blur-xl" />

      <div className="space-y-4">
        {/* Top Badges & Verification ID */}
        <div className="flex items-center justify-between gap-2 flex-wrap">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-primary-light text-primary flex items-center justify-center border border-primary-border shrink-0">
              <Award className="w-4 h-4" />
            </div>
            <span className="font-mono text-xs text-muted-foreground font-semibold">
              {certificate.verificationCode}
            </span>
          </div>

          {certificate.withDistinction && (
            <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-amber-50 text-amber-700 border border-amber-200">
              Distinction • {certificate.gradePercentage}%
            </span>
          )}
        </div>

        {/* Title */}
        <div>
          <h3 className="font-bold text-base sm:text-lg text-foreground leading-snug group-hover:text-primary transition-colors line-clamp-2">
            {certificate.courseTitle}
          </h3>
          <p className="text-xs text-muted-foreground mt-1">
            Issued to <strong className="text-foreground">{certificate.studentName}</strong>
          </p>
        </div>

        {/* Metadata Details */}
        <div className="space-y-1.5 pt-1 text-xs text-muted-foreground border-t border-border/70">
          <div className="flex items-center gap-2">
            <User className="w-3.5 h-3.5 text-primary" />
            <span>Instructor: {certificate.instructorName}</span>
          </div>
          <div className="flex items-center gap-2">
            <Calendar className="w-3.5 h-3.5 text-primary" />
            <span>Awarded on {certificate.issueDate}</span>
          </div>
          <div className="flex items-center gap-2 text-primary font-semibold">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>Verified by Asquala Academic Council</span>
          </div>
        </div>
      </div>

      {/* Card Actions */}
      <div className="pt-2 flex items-center justify-between gap-3 border-t border-border/70">
        <button
          type="button"
          onClick={() => onPreview(certificate)}
          className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-primary text-white text-xs font-bold hover:bg-primary-hover shadow-2xs transition-colors cursor-pointer"
        >
          <Eye className="w-3.5 h-3.5" />
          <span>View Certificate</span>
        </button>

        <CertificateSharePopover
          verificationCode={certificate.verificationCode}
          courseTitle={certificate.courseTitle}
        />
      </div>
    </div>
  );
}
