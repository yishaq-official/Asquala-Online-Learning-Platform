"use client";

import React from "react";
import { Check, User, GraduationCap, Briefcase, Award } from "lucide-react";

interface ApplicationStepperProps {
  currentStep: number;
  maxCompletedStep: number;
  onSelectStep?: (step: number) => void;
}

const STEPS = [
  {
    step: 1,
    title: "Educator Profile",
    subtitle: "Name, bio & contact",
    icon: User,
  },
  {
    step: 2,
    title: "Education Evidence",
    subtitle: "Degrees & transcripts",
    icon: GraduationCap,
  },
  {
    step: 3,
    title: "Work Experience",
    subtitle: "Industry & teaching",
    icon: Briefcase,
  },
  {
    step: 4,
    title: "Accreditations",
    subtitle: "Certificates & proposal",
    icon: Award,
  },
];

export function ApplicationStepper({
  currentStep,
  maxCompletedStep,
  onSelectStep,
}: ApplicationStepperProps) {
  return (
    <div className="w-full bg-card border border-border rounded-2xl p-4 sm:p-5 shadow-xs mb-8">
      {/* Mobile step progress summary */}
      <div className="flex sm:hidden items-center justify-between mb-3 text-xs">
        <span className="font-semibold text-primary">
          Step {currentStep} of {STEPS.length}
        </span>
        <span className="text-muted-foreground font-medium">
          {STEPS[currentStep - 1]?.title}
        </span>
      </div>

      <div className="grid grid-cols-4 gap-2 sm:gap-4 relative">
        {STEPS.map((s, idx) => {
          const isCompleted = s.step < currentStep || s.step <= maxCompletedStep;
          const isCurrent = s.step === currentStep;
          const isClickable = onSelectStep && s.step <= maxCompletedStep + 1;
          const Icon = s.icon;

          return (
            <div
              key={s.step}
              onClick={() => isClickable && onSelectStep?.(s.step)}
              className={`flex flex-col sm:flex-row items-center sm:items-start gap-2 sm:gap-3 p-2 rounded-xl transition-all ${
                isClickable ? "cursor-pointer hover:bg-secondary/40" : "opacity-60 cursor-not-allowed"
              }`}
            >
              {/* Step indicator circle */}
              <div
                className={`w-9 h-9 sm:w-10 sm:h-10 rounded-xl flex items-center justify-center shrink-0 transition-all font-bold text-xs ${
                  isCompleted && !isCurrent
                    ? "bg-primary text-primary-foreground shadow-2xs"
                    : isCurrent
                    ? "bg-primary text-primary-foreground ring-4 ring-primary/15 shadow-xs"
                    : "bg-secondary text-muted-foreground border border-border"
                }`}
              >
                {isCompleted && !isCurrent ? (
                  <Check className="w-4 h-4" />
                ) : (
                  <Icon className="w-4 h-4" />
                )}
              </div>

              {/* Step labels */}
              <div className="hidden sm:block min-w-0">
                <div className="flex items-center gap-1.5">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">
                    Step {s.step}
                  </span>
                  {isCurrent && (
                    <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
                  )}
                </div>
                <div
                  className={`text-xs font-bold truncate ${
                    isCurrent ? "text-primary" : "text-foreground"
                  }`}
                >
                  {s.title}
                </div>
                <div className="text-[11px] text-muted-foreground truncate hidden md:block">
                  {s.subtitle}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Progress line */}
      <div className="mt-3 sm:mt-4 h-1.5 w-full bg-secondary rounded-full overflow-hidden">
        <div
          className="h-full bg-primary transition-all duration-300 rounded-full"
          style={{ width: `${((currentStep - 1) / (STEPS.length - 1)) * 100}%` }}
        />
      </div>
    </div>
  );
}
