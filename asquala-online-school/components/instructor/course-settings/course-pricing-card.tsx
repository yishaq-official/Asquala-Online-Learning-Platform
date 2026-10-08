"use client";

import React from "react";
import { DollarSign, ShieldCheck, Zap, Sparkles, TrendingUp } from "lucide-react";

interface CoursePricingCardProps {
  isPaid: boolean;
  priceETB: number;
  onChange: (fields: Partial<{ isPaid: boolean; priceETB: number }>) => void;
}

const TIER_PRESETS = [0, 800, 1200, 1800, 2500, 3500];

export function CoursePricingCard({
  isPaid,
  priceETB,
  onChange,
}: CoursePricingCardProps) {
  const platformFeePercentage = 0.15; // 15% platform fee
  const platformFee = Math.round(priceETB * platformFeePercentage);
  const instructorNet = priceETB - platformFee;

  const handlePriceChange = (val: number) => {
    if (val === 0) {
      onChange({ isPaid: false, priceETB: 0 });
    } else {
      onChange({ isPaid: true, priceETB: Math.max(0, val) });
    }
  };

  return (
    <div className="bg-card border border-border rounded-2xl p-5 sm:p-6 shadow-xs space-y-6">
      <div className="flex items-center justify-between pb-2 border-b border-border/80">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-primary-light text-primary flex items-center justify-center font-bold">
            <DollarSign className="w-4 h-4" />
          </div>
          <div>
            <h2 className="text-base font-bold text-foreground">
              Course Monetization &amp; Pricing
            </h2>
            <p className="text-xs text-muted-foreground">
              Set tuition in Ethiopian Birr (ETB) and calculate your creator revenue share
            </p>
          </div>
        </div>

        {/* Free vs Paid Toggle */}
        <div className="flex items-center gap-2">
          <span className="text-xs font-semibold text-muted-foreground">
            {isPaid ? "Paid Course" : "Free Course"}
          </span>
          <button
            type="button"
            onClick={() => {
              if (isPaid) {
                onChange({ isPaid: false, priceETB: 0 });
              } else {
                onChange({ isPaid: true, priceETB: 1800 });
              }
            }}
            className={`w-10 h-6 rounded-full p-0.5 transition-colors shrink-0 ${
              isPaid ? "bg-primary" : "bg-muted"
            }`}
          >
            <span
              className={`block w-5 h-5 rounded-full bg-white shadow-xs transition-transform ${
                isPaid ? "translate-x-4" : "translate-x-0"
              }`}
            />
          </button>
        </div>
      </div>

      {isPaid ? (
        <div className="space-y-6">
          {/* Price Input & Presets */}
          <div className="space-y-3">
            <label className="block text-xs font-semibold text-foreground">
              Enrollment Price (Ethiopian Birr / ETB)
            </label>

            <div className="relative max-w-xs">
              <span className="absolute left-3.5 top-2.5 text-xs font-bold text-muted-foreground">
                ETB
              </span>
              <input
                type="number"
                min={100}
                max={50000}
                step={50}
                value={priceETB}
                onChange={(e) => handlePriceChange(Number(e.target.value))}
                className="w-full pl-13 pr-3.5 py-2.5 rounded-xl border border-border focus:border-primary text-base font-bold bg-card text-foreground focus:outline-hidden ring-2 ring-primary/20"
              />
            </div>

            {/* Presets */}
            <div className="flex flex-wrap items-center gap-2 pt-1">
              <span className="text-[11px] font-semibold text-muted-foreground mr-1">
                Suggested Tiers:
              </span>
              {TIER_PRESETS.filter((p) => p > 0).map((preset) => (
                <button
                  key={preset}
                  type="button"
                  onClick={() => handlePriceChange(preset)}
                  className={`px-3 py-1 rounded-lg text-xs font-semibold border transition-all ${
                    priceETB === preset
                      ? "border-primary bg-primary text-primary-foreground shadow-2xs"
                      : "border-border bg-secondary/30 text-muted-foreground hover:text-foreground hover:bg-secondary"
                  }`}
                >
                  {preset.toLocaleString()} ETB
                </button>
              ))}
            </div>
          </div>

          {/* Revenue Breakdown Card */}
          <div className="p-4 sm:p-5 rounded-2xl bg-secondary/30 border border-border space-y-4">
            <div className="flex items-center justify-between text-xs font-semibold text-muted-foreground pb-2 border-b border-border/80">
              <span>Creator Revenue Share Model</span>
              <span className="text-primary font-bold">85% / 15% Split</span>
            </div>

            <div className="space-y-2 text-xs">
              <div className="flex items-center justify-between text-muted-foreground">
                <span>Student Tuition</span>
                <span className="font-semibold text-foreground">
                  ETB {priceETB.toLocaleString()}
                </span>
              </div>

              <div className="flex items-center justify-between text-muted-foreground">
                <span className="flex items-center gap-1">
                  <span>Asquala Platform &amp; Video Hosting Fee (15%)</span>
                </span>
                <span className="font-mono text-rose-600">
                  - ETB {platformFee.toLocaleString()}
                </span>
              </div>

              <div className="pt-2 border-t border-border/80 flex items-center justify-between text-sm sm:text-base font-extrabold text-foreground">
                <span className="text-primary flex items-center gap-1.5">
                  <TrendingUp className="w-4 h-4" />
                  <span>Your Net Payout Per Student (85%)</span>
                </span>
                <span className="text-primary">
                  ETB {instructorNet.toLocaleString()}
                </span>
              </div>
            </div>

            {/* Scale illustration */}
            <div className="p-3 rounded-xl bg-card border border-border/80 flex items-center gap-3">
              <Sparkles className="w-5 h-5 text-amber-500 shrink-0" />
              <p className="text-xs text-muted-foreground">
                When <strong className="text-foreground">100 students</strong> enroll in this course, your estimated direct payout is{" "}
                <strong className="text-foreground font-bold">
                  ETB {(instructorNet * 100).toLocaleString()}
                </strong>{" "}
                deposited to your Telebirr or CBE account.
              </p>
            </div>
          </div>
        </div>
      ) : (
        /* Free course notification */
        <div className="p-4 rounded-xl bg-secondary/30 border border-border text-xs text-muted-foreground">
          <p className="font-medium text-foreground">
            This course is currently offered free to all Ethiopian learners.
          </p>
          <p className="mt-1">
            Free courses build your student following and public instructor reputation rapidly. You can switch to paid tuition at any time.
          </p>
        </div>
      )}

      {/* Payment methods footer */}
      <div className="pt-3 border-t border-border/80 flex flex-wrap items-center justify-between gap-3 text-[11px] text-muted-foreground">
        <span className="flex items-center gap-1.5">
          <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
          <span>Integrated with Telebirr, CBE Birr &amp; Awash Bank</span>
        </span>
        <span className="font-medium">Direct monthly payout settlements</span>
      </div>
    </div>
  );
}
