import * as React from "react";
import { type LucideIcon } from "lucide-react";

interface StudentStatCardProps {
  label: string;
  value: string | number;
  subtext?: string;
  icon: LucideIcon;
  variant?: "primary" | "amber" | "slate";
}

export function StudentStatCard({
  label,
  value,
  subtext,
  icon: Icon,
  variant = "primary",
}: StudentStatCardProps) {
  const variantStyles = {
    primary: {
      iconBg: "bg-primary-light text-primary border-primary-border/60",
      accent: "text-primary",
    },
    amber: {
      iconBg: "bg-amber-50 text-amber-600 border-amber-200",
      accent: "text-amber-600",
    },
    slate: {
      iconBg: "bg-secondary text-foreground border-border",
      accent: "text-foreground",
    },
  }[variant];

  return (
    <div className="bg-card border border-border rounded-xl p-5 hover:border-primary-border/70 hover:shadow-2xs transition-all flex items-start justify-between gap-4">
      <div className="space-y-1">
        <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
          {label}
        </span>
        <div className="text-2xl sm:text-3xl font-bold text-foreground tracking-tight">
          {value}
        </div>
        {subtext && (
          <p className="text-xs text-muted-foreground pt-0.5 font-medium">{subtext}</p>
        )}
      </div>

      <div
        className={`w-11 h-11 rounded-xl flex items-center justify-center border shrink-0 ${variantStyles.iconBg}`}
      >
        <Icon className="w-5 h-5" />
      </div>
    </div>
  );
}
