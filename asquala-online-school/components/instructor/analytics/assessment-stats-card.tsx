"use client";

import React from "react";
import { Award, AlertTriangle, CheckSquare, Target, HelpCircle } from "lucide-react";

interface HardestQuestion {
  question: string;
  module: string;
  accuracyPercentage: number;
  attemptsCount: number;
}

interface AssessmentStatsProps {
  insights: {
    averageScore: number;
    passRatePercentage: number;
    totalAttempts: number;
    hardestQuestions: HardestQuestion[];
  };
}

export function AssessmentStatsCard({ insights }: AssessmentStatsProps) {
  return (
    <div className="bg-card border border-border rounded-2xl p-5 sm:p-6 shadow-xs space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-border/80">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-amber-500/10 text-amber-700 border border-amber-200 flex items-center justify-center font-bold">
            <CheckSquare className="w-4 h-4" />
          </div>
          <div>
            <h3 className="text-base font-bold text-foreground">
              Assessment Performance &amp; Question Difficulty
            </h3>
            <p className="text-xs text-muted-foreground">
              Evaluate student quiz outcomes, pass rates, and common misconceptions
            </p>
          </div>
        </div>

        <span className="text-xs text-muted-foreground font-semibold">
          {insights.totalAttempts.toLocaleString()} Total Quiz Submissions
        </span>
      </div>

      {/* 3 Metric Pills */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        <div className="p-4 rounded-xl bg-secondary/30 border border-border">
          <span className="text-xs text-muted-foreground block font-medium">
            Average Score
          </span>
          <span className="text-2xl font-extrabold text-foreground mt-0.5 block">
            {insights.averageScore}%
          </span>
          <span className="text-[11px] text-emerald-700 font-semibold mt-1 block">
            +4% higher than platform benchmark
          </span>
        </div>

        <div className="p-4 rounded-xl bg-secondary/30 border border-border">
          <span className="text-xs text-muted-foreground block font-medium">
            First-Attempt Pass Rate
          </span>
          <span className="text-2xl font-extrabold text-primary mt-0.5 block">
            {insights.passRatePercentage}%
          </span>
          <span className="text-[11px] text-muted-foreground mt-1 block">
            Pass threshold set at 80%
          </span>
        </div>

        <div className="p-4 rounded-xl bg-secondary/30 border border-border">
          <span className="text-xs text-muted-foreground block font-medium">
            Certificates Awarded
          </span>
          <span className="text-2xl font-extrabold text-emerald-700 mt-0.5 block">
            582
          </span>
          <span className="text-[11px] text-muted-foreground mt-1 block">
            Verified academic credentials issued
          </span>
        </div>
      </div>

      {/* Hardest Questions Breakdown */}
      <div className="space-y-3 pt-2">
        <div className="flex items-center justify-between">
          <h4 className="text-xs font-bold text-foreground flex items-center gap-1.5">
            <AlertTriangle className="w-3.5 h-3.5 text-amber-600" />
            <span>Top 3 Concepts with Highest Student Error Rates</span>
          </h4>
          <span className="text-[11px] text-muted-foreground">
            Accuracy below 70%
          </span>
        </div>

        <div className="space-y-3">
          {insights.hardestQuestions.map((q, idx) => (
            <div
              key={idx}
              className="p-3.5 rounded-xl border border-border bg-secondary/20 hover:bg-secondary/40 transition-colors space-y-2"
            >
              <div className="flex items-start justify-between gap-3">
                <div className="min-w-0">
                  <span className="px-2 py-0.5 rounded-md text-[10px] font-bold bg-secondary text-muted-foreground uppercase font-mono mr-2">
                    {q.module}
                  </span>
                  <span className="text-xs sm:text-sm font-semibold text-foreground">
                    {q.question}
                  </span>
                </div>

                <div className="text-right shrink-0">
                  <span className="text-xs font-bold text-amber-700">
                    {q.accuracyPercentage}% correct
                  </span>
                  <span className="text-[10px] text-muted-foreground block">
                    {q.attemptsCount} attempts
                  </span>
                </div>
              </div>

              {/* Accuracy Bar */}
              <div className="w-full h-2 rounded-full bg-secondary overflow-hidden">
                <div
                  style={{ width: `${q.accuracyPercentage}%` }}
                  className="h-full bg-amber-500 rounded-full"
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
