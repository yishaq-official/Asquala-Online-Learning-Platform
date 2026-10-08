"use client";

import React from "react";
import Link from "next/link";
import { CheckCircle2, Sparkles, ArrowRight, ShieldCheck, Award } from "lucide-react";
import { Button } from "@/components/ui/button";

interface ApprovalCelebrationCardProps {
  reviewedAt?: string;
  reviewNotes?: string;
}

export function ApprovalCelebrationCard({
  reviewedAt = "Oct 8, 2026",
  reviewNotes = "Approved with Distinction. All university degrees, academic transcripts, and professional cloud certifications have been verified by the Asquala Academic Review Board.",
}: ApprovalCelebrationCardProps) {
  return (
    <div className="rounded-2xl border-2 border-primary-border bg-gradient-to-b from-primary-light/60 via-primary-light/30 to-card p-6 sm:p-8 shadow-sm space-y-5">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3.5">
          <div className="w-12 h-12 rounded-2xl bg-primary text-primary-foreground flex items-center justify-center shadow-xs shrink-0">
            <Award className="w-6 h-6" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-primary text-primary-foreground uppercase tracking-wider">
                Accreditation Approved
              </span>
              <span className="text-xs text-muted-foreground">
                Verified on {reviewedAt}
              </span>
            </div>
            <h3 className="text-lg sm:text-xl font-bold text-foreground mt-0.5">
              Congratulations! You are an Accredited Asquala Educator 🎉
            </h3>
          </div>
        </div>

        <Link href="/instructor/dashboard">
          <Button
            variant="primary"
            size="lg"
            className="w-full sm:w-auto gap-2 shadow-xs shrink-0"
          >
            <span>Enter Instructor Studio</span>
            <ArrowRight className="w-4 h-4" />
          </Button>
        </Link>
      </div>

      <div className="p-4 rounded-xl bg-card border border-primary-border/60 text-xs sm:text-sm text-foreground leading-relaxed space-y-1">
        <div className="font-semibold text-primary flex items-center gap-1.5">
          <ShieldCheck className="w-4 h-4" />
          <span>Academic Board Auditor Note:</span>
        </div>
        <p className="text-muted-foreground">{reviewNotes}</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2 text-xs text-muted-foreground border-t border-primary-border/40">
        <div className="flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 text-primary shrink-0" />
          <span>Full Course Creator Suite Unlocked</span>
        </div>
        <div className="flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 text-primary shrink-0" />
          <span>Domestic Telebirr/CBE Payouts Enabled</span>
        </div>
        <div className="flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 text-primary shrink-0" />
          <span>Verified Educator Badge Displayed</span>
        </div>
      </div>
    </div>
  );
}
