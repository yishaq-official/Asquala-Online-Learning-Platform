"use client";

import React from "react";
import { Users, TrendingUp, MapPin, Globe } from "lucide-react";

interface MonthlyTrendItem {
  month: string;
  enrollments: number;
  revenueETB: number;
}

interface RegionalItem {
  city: string;
  percentage: number;
  count: number;
}

interface EnrollmentTrendCardProps {
  trends: MonthlyTrendItem[];
  regionalBreakdown: RegionalItem[];
}

export function EnrollmentTrendCard({
  trends,
  regionalBreakdown,
}: EnrollmentTrendCardProps) {
  const maxEnrollment = Math.max(...trends.map((t) => t.enrollments), 1);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      {/* 2 Cols: Monthly Enrollment Bar Chart */}
      <div className="lg:col-span-2 bg-card border border-border rounded-2xl p-5 sm:p-6 shadow-xs flex flex-col justify-between">
        <div>
          <div className="flex items-center justify-between pb-3 border-b border-border/80">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-primary-light text-primary flex items-center justify-center font-bold">
                <TrendingUp className="w-4 h-4" />
              </div>
              <div>
                <h3 className="text-base font-bold text-foreground">
                  Enrollment Velocity &amp; Monthly Growth
                </h3>
                <p className="text-xs text-muted-foreground">
                  Track new student onboarding and monthly tuition momentum
                </p>
              </div>
            </div>

            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-bold bg-emerald-50 text-emerald-700 border border-emerald-200">
              <TrendingUp className="w-3 h-3" />
              <span>+24% this month</span>
            </span>
          </div>

          {/* Bar Chart Container */}
          <div className="pt-6 pb-2">
            <div className="h-44 sm:h-52 flex items-end justify-between gap-3 sm:gap-6 px-2">
              {trends.map((item) => {
                const heightPercentage = Math.round(
                  (item.enrollments / maxEnrollment) * 100
                );

                return (
                  <div
                    key={item.month}
                    className="flex-1 flex flex-col items-center gap-2 group h-full justify-end"
                  >
                    {/* Tooltip on hover */}
                    <div className="opacity-0 group-hover:opacity-100 transition-opacity bg-slate-900 text-white text-[10px] font-mono py-1 px-2 rounded-md pointer-events-none whitespace-nowrap shadow-md mb-1">
                      {item.enrollments} students • ETB {item.revenueETB.toLocaleString()}
                    </div>

                    {/* Bar */}
                    <div
                      style={{ height: `${heightPercentage}%` }}
                      className="w-full max-w-[42px] bg-primary/20 group-hover:bg-primary rounded-t-xl transition-all relative overflow-hidden"
                    >
                      <div className="absolute inset-0 bg-primary opacity-80 group-hover:opacity-100 transition-opacity rounded-t-xl" />
                    </div>

                    {/* Month Label */}
                    <span className="text-xs font-semibold text-muted-foreground group-hover:text-foreground transition-colors">
                      {item.month}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Footer Summary */}
        <div className="pt-4 border-t border-border/80 flex items-center justify-between text-xs text-muted-foreground">
          <span>Active Period: May 2026 – Oct 2026</span>
          <span className="font-semibold text-foreground">
            Cumulative: {trends.reduce((a, b) => a + b.enrollments, 0).toLocaleString()} enrolled
          </span>
        </div>
      </div>

      {/* 1 Col: Regional Student Breakdown */}
      <div className="bg-card border border-border rounded-2xl p-5 sm:p-6 shadow-xs flex flex-col justify-between">
        <div>
          <div className="flex items-center gap-2.5 pb-3 border-b border-border/80">
            <div className="w-8 h-8 rounded-lg bg-emerald-50 text-emerald-700 flex items-center justify-center font-bold border border-emerald-200">
              <MapPin className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-base font-bold text-foreground">
                Geographic Distribution
              </h3>
              <p className="text-xs text-muted-foreground">
                Regional student locations across Ethiopia
              </p>
            </div>
          </div>

          <div className="space-y-4 pt-4">
            {regionalBreakdown.map((item) => (
              <div key={item.city} className="space-y-1.5">
                <div className="flex items-center justify-between text-xs font-medium">
                  <span className="text-foreground font-semibold flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-primary" />
                    <span>{item.city}</span>
                  </span>
                  <span className="text-muted-foreground font-mono">
                    {item.count} ({item.percentage}%)
                  </span>
                </div>

                <div className="w-full h-2 rounded-full bg-secondary overflow-hidden">
                  <div
                    style={{ width: `${item.percentage}%` }}
                    className="h-full bg-primary rounded-full transition-all"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="pt-4 border-t border-border/80 text-[11px] text-muted-foreground flex items-center gap-1.5">
          <Globe className="w-3.5 h-3.5 text-muted-foreground" />
          <span>Expanding university reach through regional partnerships</span>
        </div>
      </div>
    </div>
  );
}
