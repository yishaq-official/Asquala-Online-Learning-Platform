"use client";

import React from "react";
import { TrendingUp, TrendingDown } from "lucide-react";

interface StudioKpiCardProps {
  title: string;
  value: string;
  delta?: {
    value: string;
    isPositive: boolean;
    period: string;
  };
  subtitle?: string;
  icon: React.ComponentType<{ className?: string }>;
}

export function StudioKpiCard({
  title,
  value,
  delta,
  subtitle,
  icon: Icon,
}: StudioKpiCardProps) {
  return (
    <div className="bg-card border border-border rounded-2xl p-5 sm:p-6 shadow-xs flex flex-col justify-between transition-all hover:border-primary/30 hover:shadow-sm">
      <div className="flex items-center justify-between gap-3 mb-3">
        <span className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
          {title}
        </span>
        <div className="w-10 h-10 rounded-xl bg-primary-light text-primary flex items-center justify-center border border-primary-border shrink-0">
          <Icon className="w-5 h-5" />
        </div>
      </div>

      <div className="space-y-2">
        <div className="text-2xl sm:text-3xl font-extrabold text-foreground tracking-tight">
          {value}
        </div>

        <div className="flex items-center gap-2 flex-wrap">
          {delta && (
            <span
              className={`inline-flex items-center gap-0.5 text-xs font-bold px-2 py-0.5 rounded-full ${
                delta.isPositive
                  ? "bg-primary-light text-primary border border-primary-border"
                  : "bg-destructive/10 text-destructive border border-destructive/20"
              }`}
            >
              {delta.isPositive ? (
                <TrendingUp className="w-3 h-3" />
              ) : (
                <TrendingDown className="w-3 h-3" />
              )}
              <span>{delta.value}</span>
            </span>
          )}

          {delta && (
            <span className="text-[11px] text-muted-foreground">
              {delta.period}
            </span>
          )}

          {subtitle && !delta && (
            <span className="text-xs text-muted-foreground">{subtitle}</span>
          )}
        </div>
      </div>
    </div>
  );
}
