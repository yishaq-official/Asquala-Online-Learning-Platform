"use client";

import * as React from "react";
import { Target, CheckCircle2 } from "lucide-react";

interface WeeklyGoalWidgetProps {
  completedHours?: number;
  targetHours?: number;
}

export function WeeklyGoalWidget({
  completedHours = 3.5,
  targetHours = 5.0,
}: WeeklyGoalWidgetProps) {
  const percentage = Math.min(Math.round((completedHours / targetHours) * 100), 100);
  const days = [
    { label: "M", active: true },
    { label: "T", active: true },
    { label: "W", active: true },
    { label: "T", active: false },
    { label: "F", active: false },
    { label: "S", active: false },
    { label: "S", active: false },
  ];

  return (
    <div className="bg-card border border-border rounded-2xl p-6 shadow-2xs space-y-4">
      <div className="flex items-center justify-between pb-2 border-b border-border">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-primary-light text-primary flex items-center justify-center border border-primary-border/60">
            <Target className="w-4 h-4" />
          </div>
          <div>
            <h3 className="text-base font-bold text-foreground">Weekly Study Goal</h3>
            <p className="text-xs text-muted-foreground">Paced for steady retention</p>
          </div>
        </div>

        <span className="text-xs font-bold text-primary px-2.5 py-1 rounded-full bg-primary-light border border-primary-border">
          {percentage}% Done
        </span>
      </div>

      <div className="space-y-2">
        <div className="flex items-center justify-between text-xs font-semibold">
          <span className="text-muted-foreground">Study Progress</span>
          <span className="text-foreground">
            <strong className="text-primary">{completedHours}</strong> / {targetHours} Hours
          </span>
        </div>

        <div className="h-2 w-full bg-secondary rounded-full overflow-hidden">
          <div
            className="h-full bg-primary rounded-full transition-all duration-700"
            style={{ width: `${percentage}%` }}
          />
        </div>
      </div>

      {/* Daily Activity Indicators */}
      <div className="pt-1">
        <div className="text-[11px] font-semibold text-muted-foreground uppercase tracking-wider mb-2">
          Daily Streak Cadence
        </div>
        <div className="grid grid-cols-7 gap-1.5">
          {days.map((d, idx) => (
            <div
              key={idx}
              className={`flex flex-col items-center justify-center py-2 rounded-lg border text-xs font-bold transition-all ${
                d.active
                  ? "bg-primary-light text-primary border-primary-border"
                  : "bg-secondary/60 text-muted-foreground border-border"
              }`}
            >
              <span>{d.label}</span>
              {d.active && <CheckCircle2 className="w-3 h-3 text-primary mt-1" />}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
