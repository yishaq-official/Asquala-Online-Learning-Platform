"use client";

import * as React from "react";
import Link from "next/link";
import { Calendar, HelpCircle, Flag, Video, ArrowUpRight } from "lucide-react";
import { UpcomingDeadline } from "@/types/student";

interface UpcomingDeadlinesCardProps {
  deadlines: UpcomingDeadline[];
}

export function UpcomingDeadlinesCard({ deadlines }: UpcomingDeadlinesCardProps) {
  const getIcon = (type: UpcomingDeadline["type"]) => {
    switch (type) {
      case "quiz":
        return <HelpCircle className="w-4 h-4 text-amber-600" />;
      case "milestone":
        return <Flag className="w-4 h-4 text-primary" />;
      case "live_session":
        return <Video className="w-4 h-4 text-rose-500" />;
      default:
        return <Calendar className="w-4 h-4 text-muted-foreground" />;
    }
  };

  return (
    <div className="bg-card border border-border rounded-2xl p-6 shadow-2xs space-y-5">
      {/* Header */}
      <div className="flex items-center justify-between pb-2 border-b border-border">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-amber-50 text-amber-700 flex items-center justify-center border border-amber-200">
            <Calendar className="w-4 h-4" />
          </div>
          <div>
            <h3 className="text-base font-bold text-foreground">Upcoming Deadlines</h3>
            <p className="text-xs text-muted-foreground">Keep your streak on schedule</p>
          </div>
        </div>
      </div>

      {/* Deadlines List */}
      <div className="space-y-3.5">
        {deadlines.map((item) => (
          <div
            key={item.id}
            className="p-3.5 rounded-xl border border-border hover:border-primary-border/60 bg-muted/20 hover:bg-card transition-all space-y-2 group"
          >
            <div className="flex items-center justify-between gap-2">
              <div className="flex items-center gap-2">
                <span className="p-1 rounded-md bg-secondary">{getIcon(item.type)}</span>
                <span className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
                  {item.type.replace("_", " ")}
                </span>
              </div>

              <span
                className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${
                  item.isUrgent
                    ? "bg-rose-50 text-rose-700 border-rose-200"
                    : "bg-secondary text-secondary-foreground border-border"
                }`}
              >
                {item.dueLabel}
              </span>
            </div>

            <div>
              <h4 className="text-xs sm:text-sm font-semibold text-foreground group-hover:text-primary transition-colors line-clamp-1">
                {item.title}
              </h4>
              <p className="text-[11px] text-muted-foreground mt-0.5 truncate">
                {item.courseTitle}
              </p>
            </div>

            <div className="pt-1 flex justify-end">
              <Link
                href={`/student/courses/${item.courseSlug}`}
                className="inline-flex items-center gap-1 text-xs font-semibold text-primary hover:text-primary-hover group-hover:underline"
              >
                <span>View Details</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
