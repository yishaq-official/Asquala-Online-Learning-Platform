"use client";

import React from "react";
import Link from "next/link";
import { Users, ArrowRight, Clock, ShieldCheck } from "lucide-react";

interface EnrollmentItem {
  id: string;
  studentName: string;
  studentInitials: string;
  courseTitle: string;
  amountETB: number;
  timeAgo: string;
}

const MOCK_RECENT_ENROLLMENTS: EnrollmentItem[] = [
  {
    id: "enr-1",
    studentName: "Helen Bekele",
    studentInitials: "HB",
    courseTitle: "Next.js 16 Full-Stack Mastery",
    amountETB: 1800,
    timeAgo: "12m ago",
  },
  {
    id: "enr-2",
    studentName: "Mikiyas Fikru",
    studentInitials: "MF",
    courseTitle: "PostgreSQL & Drizzle in Production",
    amountETB: 1200,
    timeAgo: "45m ago",
  },
  {
    id: "enr-3",
    studentName: "Bethelhem Tadesse",
    studentInitials: "BT",
    courseTitle: "Next.js 16 Full-Stack Mastery",
    amountETB: 1800,
    timeAgo: "2h ago",
  },
  {
    id: "enr-4",
    studentName: "Yared Solomon",
    studentInitials: "YS",
    courseTitle: "Modern TypeScript 5 & Clean Code",
    amountETB: 950,
    timeAgo: "3h ago",
  },
];

export function RecentEnrollmentsFeed() {
  return (
    <div className="bg-card border border-border rounded-2xl p-6 sm:p-7 shadow-xs space-y-4">
      <div className="flex items-center justify-between border-b border-border/80 pb-4">
        <div>
          <h2 className="text-base font-bold text-foreground flex items-center gap-2">
            <Users className="w-5 h-5 text-primary" />
            Recent Student Enrollments
          </h2>
          <p className="text-xs text-muted-foreground mt-0.5">
            Real-time feed of learners purchasing and joining your classes.
          </p>
        </div>

        <Link
          href="/instructor/analytics"
          className="inline-flex items-center gap-1.5 text-xs font-bold text-primary hover:underline shrink-0"
        >
          <span>Analytics</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </Link>
      </div>

      <div className="divide-y divide-border/80">
        {MOCK_RECENT_ENROLLMENTS.map((item) => (
          <div
            key={item.id}
            className="py-3 first:pt-0 last:pb-0 flex items-center justify-between gap-3"
          >
            <div className="flex items-center gap-3 min-w-0">
              <div className="w-8 h-8 rounded-full bg-primary-light text-primary font-bold text-xs flex items-center justify-center border border-primary-border shrink-0">
                {item.studentInitials}
              </div>

              <div className="min-w-0">
                <span className="text-xs font-bold text-foreground block truncate">
                  {item.studentName}
                </span>
                <span className="text-[11px] text-muted-foreground block truncate">
                  {item.courseTitle}
                </span>
              </div>
            </div>

            <div className="text-right shrink-0">
              <span className="text-xs font-bold text-foreground block">
                +ETB {item.amountETB.toLocaleString()}
              </span>
              <span className="text-[10px] text-muted-foreground flex items-center justify-end gap-1">
                <Clock className="w-2.5 h-2.5" />
                <span>{item.timeAgo}</span>
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
