"use client";

import * as React from "react";
import { Flame } from "lucide-react";

interface StreakBadgeProps {
  days?: number;
  className?: string;
}

export function StreakBadge({ days = 5, className = "" }: StreakBadgeProps) {
  return (
    <div
      className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-amber-50 text-amber-700 border border-amber-200 shadow-2xs hover:bg-amber-100/70 transition-colors cursor-default ${className}`}
      title={`${days}-day learning streak! Keep studying daily to maintain momentum.`}
    >
      <Flame className="w-3.5 h-3.5 text-amber-500 fill-amber-500 animate-pulse" />
      <span>{days} Days</span>
    </div>
  );
}
