"use client";

import React from "react";
import { CheckCircle2, Sparkles, MessageSquare } from "lucide-react";

export function QaEmptyState() {
  return (
    <div className="bg-card border border-border rounded-2xl p-12 text-center shadow-xs space-y-4">
      <div className="w-14 h-14 rounded-2xl bg-emerald-50 text-emerald-600 border border-emerald-200 flex items-center justify-center mx-auto shadow-xs">
        <CheckCircle2 className="w-8 h-8" />
      </div>

      <div className="max-w-md mx-auto space-y-1">
        <h3 className="text-lg font-bold text-foreground">
          Inbox Zero • All Questions Answered!
        </h3>
        <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
          Great job! Every student inquiry across your curriculum has been addressed with an official solution. New student questions will appear here automatically.
        </p>
      </div>
    </div>
  );
}
