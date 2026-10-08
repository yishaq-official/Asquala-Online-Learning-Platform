"use client";

import * as React from "react";
import Image from "next/image";
import { Award, Printer, X, ShieldCheck, CheckCircle2 } from "lucide-react";
import { CertificateItem } from "@/types/student";

interface CertificatePreviewModalProps {
  certificate: CertificateItem | null;
  isOpen: boolean;
  onClose: () => void;
}

export function CertificatePreviewModal({
  certificate,
  isOpen,
  onClose,
}: CertificatePreviewModalProps) {
  if (!isOpen || !certificate) return null;

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-slate-950/60 backdrop-blur-xs transition-opacity animate-in fade-in-0"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Modal Dialog */}
      <div className="relative w-full max-w-4xl bg-card border border-primary-border rounded-2xl shadow-2xl z-50 p-6 sm:p-10 space-y-6 animate-in zoom-in-95 duration-200">
        {/* Top Controls */}
        <div className="flex items-center justify-between pb-3 border-b border-border/80 print:hidden">
          <div className="flex items-center gap-2 text-xs font-semibold text-muted-foreground">
            <ShieldCheck className="w-4 h-4 text-primary" />
            <span>Verified Official Credential</span>
          </div>

          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={handlePrint}
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-primary text-white text-xs font-bold hover:bg-primary-hover shadow-2xs transition-colors cursor-pointer"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>Print / Save PDF</span>
            </button>
            <button
              type="button"
              onClick={onClose}
              className="p-1.5 rounded-lg text-muted-foreground hover:text-foreground hover:bg-secondary cursor-pointer"
              aria-label="Close certificate modal"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Certificate Canvas / Decorative Border */}
        <div className="relative border-8 border-double border-primary/40 bg-gradient-to-b from-card via-card to-primary-light/10 p-8 sm:p-14 rounded-xl text-center space-y-8 shadow-inner">
          {/* Corner accents */}
          <div className="absolute top-2 left-2 w-8 h-8 border-t-2 border-l-2 border-primary" />
          <div className="absolute top-2 right-2 w-8 h-8 border-t-2 border-r-2 border-primary" />
          <div className="absolute bottom-2 left-2 w-8 h-8 border-b-2 border-l-2 border-primary" />
          <div className="absolute bottom-2 right-2 w-8 h-8 border-b-2 border-r-2 border-primary" />

          {/* Seal Emblem */}
          <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-primary-light text-primary flex items-center justify-center mx-auto border-4 border-primary shadow-sm">
            <Award className="w-8 h-8 sm:w-10 sm:h-10" />
          </div>

          {/* Header with Brand Logo */}
          <div className="space-y-2">
            <div className="flex items-center justify-center">
              <Image
                src="/images/logo.png"
                alt="Asquala Logo"
                width={48}
                height={48}
                className="w-12 h-12 object-contain"
              />
            </div>
            <span className="text-xs uppercase font-extrabold tracking-widest text-primary block">
              Asquala Online Learning Platform
            </span>
            <h1 className="text-2xl sm:text-4xl font-serif font-bold text-foreground tracking-tight">
              Certificate of Completion
            </h1>
            <p className="text-xs sm:text-sm text-muted-foreground italic pt-1">
              This is proudly presented to
            </p>
          </div>

          {/* Student Name */}
          <div className="py-2">
            <div className="text-2xl sm:text-4xl font-bold text-foreground underline decoration-primary decoration-2 underline-offset-8">
              {certificate.studentName}
            </div>
          </div>

          {/* Statement */}
          <p className="text-xs sm:text-sm text-muted-foreground max-w-xl mx-auto leading-relaxed">
            for successfully completing all curriculum modules, technical assessments, and practical exercises in
          </p>

          {/* Course Title */}
          <div className="text-lg sm:text-2xl font-bold text-foreground max-w-2xl mx-auto">
            &ldquo;{certificate.courseTitle}&rdquo;
          </div>

          {/* Distinction Badge (if applicable) */}
          {certificate.withDistinction && (
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-50 text-amber-700 border border-amber-200 text-xs font-bold">
              <CheckCircle2 className="w-3.5 h-3.5" />
              <span>Awarded with Distinction ({certificate.gradePercentage}% Grade)</span>
            </div>
          )}

          {/* Footer Signatures & Verification */}
          <div className="pt-8 border-t border-border/80 grid grid-cols-2 sm:grid-cols-3 gap-6 items-end text-left text-xs">
            <div className="space-y-1">
              <div className="font-serif italic text-sm text-foreground">
                {certificate.instructorName}
              </div>
              <div className="h-0.5 w-32 bg-border" />
              <span className="text-[11px] text-muted-foreground block">Lead Instructor</span>
            </div>

            <div className="hidden sm:block text-center space-y-1">
              <span className="font-mono text-[11px] text-muted-foreground block">
                Verification Code
              </span>
              <span className="font-mono text-xs font-bold text-primary block">
                {certificate.verificationCode}
              </span>
              <span className="text-[10px] text-muted-foreground block">
                Issued on {certificate.issueDate}
              </span>
            </div>

            <div className="space-y-1 text-right">
              <div className="font-serif italic text-sm text-foreground">Academic Council</div>
              <div className="h-0.5 w-32 bg-border ml-auto" />
              <span className="text-[11px] text-muted-foreground block">Asquala Platform</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
