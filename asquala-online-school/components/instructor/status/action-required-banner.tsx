"use client";

import React from "react";
import { AlertCircle, UploadCloud, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

interface ActionRequiredBannerProps {
  reviewNotes?: string;
  onOpenResubmitModal: () => void;
}

export function ActionRequiredBanner({
  reviewNotes = "The uploaded scan for your M.Sc. degree transcript is missing the registrar stamp. Please re-upload a clear, certified color PDF scan of your final diploma to complete verification.",
  onOpenResubmitModal,
}: ActionRequiredBannerProps) {
  return (
    <div className="rounded-2xl border border-rose-300 bg-rose-50/70 p-6 sm:p-7 shadow-xs space-y-4">
      <div className="flex items-start gap-4">
        <div className="w-10 h-10 rounded-xl bg-rose-100 text-rose-700 flex items-center justify-center shrink-0 border border-rose-200">
          <AlertCircle className="w-5 h-5" />
        </div>

        <div className="space-y-1.5 flex-1 min-w-0">
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold uppercase tracking-wider text-rose-800">
              Academic Review Board Feedback
            </span>
            <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-rose-200 text-rose-800">
              Action Required
            </span>
          </div>

          <h3 className="text-base font-bold text-rose-950">
            Additional Credential Clarification Needed
          </h3>

          <p className="text-xs sm:text-sm text-rose-900 leading-relaxed bg-white/80 p-3.5 rounded-xl border border-rose-200">
            {reviewNotes}
          </p>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-1 border-t border-rose-200/60">
        <p className="text-xs text-rose-800">
          Your application remains in good standing. Once re-uploaded, audits resume within 12 business hours.
        </p>

        <Button
          type="button"
          onClick={onOpenResubmitModal}
          className="bg-rose-700 hover:bg-rose-800 text-white font-semibold text-xs px-4 py-2 rounded-lg shrink-0 gap-2 shadow-xs cursor-pointer"
        >
          <UploadCloud className="w-4 h-4" />
          <span>Upload Updated Document</span>
        </Button>
      </div>
    </div>
  );
}
