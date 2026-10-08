"use client";

import React from "react";
import { Filter, AlertCircle, ArrowDown, Sparkles, CheckCircle2 } from "lucide-react";

interface FunnelStage {
  stage: string;
  completionPercentage: number;
  dropoffRate: number;
}

interface CurriculumDropoffFunnelProps {
  stages: FunnelStage[];
}

export function CurriculumDropoffFunnel({ stages }: CurriculumDropoffFunnelProps) {
  return (
    <div className="bg-card border border-border rounded-2xl p-5 sm:p-6 shadow-xs space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-border/80">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-primary-light text-primary flex items-center justify-center font-bold">
            <Filter className="w-4 h-4" />
          </div>
          <div>
            <h3 className="text-base font-bold text-foreground">
              Curriculum Completion Funnel &amp; Drop-off Analysis
            </h3>
            <p className="text-xs text-muted-foreground">
              Identify friction points where students slow down or abandon lectures
            </p>
          </div>
        </div>

        <span className="text-xs font-semibold text-muted-foreground">
          Average Course Completion:{" "}
          <strong className="text-primary font-bold">68%</strong> (National Top 5%)
        </span>
      </div>

      {/* Funnel Steps */}
      <div className="space-y-4">
        {stages.map((stage, idx) => {
          const isHighestDrop = stage.dropoffRate >= 12;

          return (
            <div key={stage.stage} className="space-y-1.5">
              <div className="flex items-center justify-between text-xs">
                <span className="font-bold text-foreground flex items-center gap-2">
                  <span className="w-5 h-5 rounded-md bg-secondary text-foreground text-[11px] font-mono flex items-center justify-center">
                    {idx + 1}
                  </span>
                  <span>{stage.stage}</span>
                </span>

                <div className="flex items-center gap-3">
                  <span className="font-bold text-foreground">
                    {stage.completionPercentage}% completed
                  </span>
                  {idx > 0 && (
                    <span
                      className={`text-[11px] font-semibold flex items-center gap-0.5 ${
                        isHighestDrop
                          ? "text-rose-600 bg-rose-50 px-2 py-0.5 rounded-md border border-rose-200"
                          : "text-muted-foreground"
                      }`}
                    >
                      <ArrowDown className="w-3 h-3" />
                      <span>{stage.dropoffRate}% drop</span>
                    </span>
                  )}
                </div>
              </div>

              {/* Progress Track */}
              <div className="w-full h-3.5 rounded-full bg-secondary overflow-hidden">
                <div
                  style={{ width: `${stage.completionPercentage}%` }}
                  className={`h-full rounded-full transition-all ${
                    idx === 0
                      ? "bg-emerald-600"
                      : idx === stages.length - 1
                      ? "bg-primary"
                      : "bg-emerald-700/80"
                  }`}
                />
              </div>
            </div>
          );
        })}
      </div>

      {/* Pedagogical Recommendation Tip */}
      <div className="p-4 rounded-xl bg-secondary/30 border border-border flex items-start gap-3">
        <Sparkles className="w-5 h-5 text-amber-500 shrink-0 mt-0.5" />
        <div className="text-xs text-muted-foreground leading-relaxed">
          <p className="font-bold text-foreground">
            Pedagogical Optimization Recommendation
          </p>
          <p className="mt-0.5">
            The largest student friction point occurs between <strong className="text-foreground">Module 2 (Database Modeling)</strong> and <strong className="text-foreground">Module 3 (Server Actions)</strong> with a 13% drop-off. Adding an intermediate 5-minute hands-on debugging challenge before introducing complex server mutations will smoothen comprehension.
          </p>
        </div>
      </div>
    </div>
  );
}
