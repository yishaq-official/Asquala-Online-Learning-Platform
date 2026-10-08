"use client";

import React from "react";
import Link from "next/link";
import { Plus, Wallet, ShieldCheck, GraduationCap, ArrowRight } from "lucide-react";

export function StudioQuickActions() {
  const actions = [
    {
      title: "Create New Course",
      description: "Launch curriculum builder and lesson creator",
      href: "/instructor/courses/create",
      icon: Plus,
      isPrimary: true,
    },
    {
      title: "Request Payout",
      description: "Withdraw cleared revenue via Telebirr or CBE",
      href: "/instructor/earnings",
      icon: Wallet,
      isPrimary: false,
    },
    {
      title: "Accreditation Dossier",
      description: "View verified university degrees & certificates",
      href: "/instructor/application-status",
      icon: ShieldCheck,
      isPrimary: false,
    },
    {
      title: "Student Portal Preview",
      description: "Experience course viewer as a student",
      href: "/student/dashboard",
      icon: GraduationCap,
      isPrimary: false,
    },
  ];

  return (
    <div className="bg-card border border-border rounded-2xl p-6 sm:p-7 shadow-xs space-y-4">
      <div>
        <h2 className="text-base font-bold text-foreground">
          Studio Quick Actions
        </h2>
        <p className="text-xs text-muted-foreground mt-0.5">
          Fast shortcuts to essential educator tools and creator workflows.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {actions.map((act) => {
          const Icon = act.icon;
          return (
            <Link
              key={act.title}
              href={act.href}
              className={`p-3.5 rounded-xl border text-left transition-all group flex items-start gap-3 cursor-pointer ${
                act.isPrimary
                  ? "bg-primary-light/50 border-primary-border hover:bg-primary-light hover:border-primary"
                  : "bg-card border-border hover:bg-secondary/60 hover:border-border"
              }`}
            >
              <div
                className={`p-2 rounded-lg shrink-0 transition-colors ${
                  act.isPrimary
                    ? "bg-primary text-primary-foreground"
                    : "bg-secondary text-primary group-hover:bg-primary group-hover:text-primary-foreground"
                }`}
              >
                <Icon className="w-4 h-4" />
              </div>

              <div className="min-w-0">
                <span
                  className={`text-xs font-bold block transition-colors ${
                    act.isPrimary ? "text-primary" : "text-foreground group-hover:text-primary"
                  }`}
                >
                  {act.title}
                </span>
                <span className="text-[11px] text-muted-foreground line-clamp-1">
                  {act.description}
                </span>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
