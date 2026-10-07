"use client";

import * as React from "react";
import { CheckCircle2, Sparkles } from "lucide-react";

interface WhatYouWillLearnProps {
  outcomes: string[];
}

export function WhatYouWillLearn({ outcomes }: WhatYouWillLearnProps) {
  if (!outcomes || outcomes.length === 0) return null;

  return (
    <div className="bg-primary-light/20 border border-primary-border/60 rounded-2xl p-6 sm:p-7 shadow-2xs space-y-4">
      <div className="flex items-center gap-2 text-primary font-bold text-base sm:text-lg">
        <Sparkles className="w-5 h-5" />
        <h2 className="text-foreground">What You Will Learn</h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5 pt-1">
        {outcomes.map((outcome, idx) => (
          <div key={idx} className="flex items-start gap-3">
            <CheckCircle2 className="w-4 h-4 text-primary shrink-0 mt-0.5" />
            <span className="text-xs sm:text-sm text-foreground/90 leading-relaxed font-medium">
              {outcome}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
