"use client";

import React from "react";
import {
  Users,
  GraduationCap,
  ShieldCheck,
  UserCheck,
  AlertOctagon,
  Sparkles,
} from "lucide-react";
import { useAdminUiStore } from "@/stores/admin-ui-store";

export function UserStatsBar() {
  const { registeredUsers } = useAdminUiStore();

  const totalUsers = 8940; // Total platform registered base
  const totalStudents = 8890;
  const accreditedInstructors = registeredUsers.filter(
    (u) => u.role === "instructor" && u.isAccreditedTeacher
  ).length;
  const totalInstructors = registeredUsers.filter(
    (u) => u.role === "instructor"
  ).length;
  const suspendedCount = registeredUsers.filter(
    (u) => u.status === "suspended"
  ).length;

  const stats = [
    {
      id: "total-accounts",
      label: "Total Registered Accounts",
      value: totalUsers.toLocaleString(),
      subtext: "Verified Ethiopian learners & educators",
      badge: "Platform Wide",
      badgeColor: "bg-emerald-50 text-emerald-800 border-emerald-200",
      icon: Users,
      iconColor: "text-emerald-800 bg-emerald-50 border-emerald-200",
      accentBorder: "border-l-4 border-l-emerald-600",
    },
    {
      id: "active-students",
      label: "Active Student Community",
      value: totalStudents.toLocaleString(),
      subtext: "Enrolled in accredited courses",
      badge: "99.4% of Network",
      badgeColor: "bg-emerald-50 text-emerald-800 border-emerald-200",
      icon: GraduationCap,
      iconColor: "text-emerald-800 bg-emerald-50 border-emerald-200",
      accentBorder: "border-l-4 border-l-emerald-700",
    },
    {
      id: "accredited-faculty",
      label: "Accredited Instructors",
      value: "48 Faculty",
      subtext: `${accreditedInstructors} verified by Academic Review Board`,
      badge: "Degree Verified",
      badgeColor: "bg-emerald-100 text-emerald-900 border-emerald-300",
      icon: ShieldCheck,
      iconColor: "text-emerald-800 bg-emerald-100 border-emerald-300",
      accentBorder: "border-l-4 border-l-emerald-800",
    },
    {
      id: "suspended-actors",
      label: "Security Governance",
      value: `${suspendedCount} Suspended`,
      subtext: "Disputed or flagged platform accounts",
      badge: suspendedCount > 0 ? "Requires Review" : "Healthy Roster",
      badgeColor:
        suspendedCount > 0
          ? "bg-amber-50 text-amber-900 border-amber-200"
          : "bg-emerald-50 text-emerald-800 border-emerald-200",
      icon: AlertOctagon,
      iconColor:
        suspendedCount > 0
          ? "text-amber-700 bg-amber-50 border-amber-200"
          : "text-emerald-800 bg-emerald-50 border-emerald-200",
      accentBorder:
        suspendedCount > 0
          ? "border-l-4 border-l-amber-500"
          : "border-l-4 border-l-emerald-600",
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {stats.map((stat) => {
        const IconComponent = stat.icon;
        return (
          <div
            key={stat.id}
            className={`bg-card border border-border rounded-2xl p-4 sm:p-5 shadow-2xs space-y-3 transition-all hover:shadow-xs ${stat.accentBorder}`}
          >
            <div className="flex items-center justify-between">
              <div
                className={`w-9 h-9 rounded-xl border flex items-center justify-center ${stat.iconColor}`}
              >
                <IconComponent className="w-4 h-4" />
              </div>
              <span
                className={`text-[11px] font-bold px-2 py-0.5 rounded-full border ${stat.badgeColor}`}
              >
                {stat.badge}
              </span>
            </div>

            <div>
              <span className="text-xs font-semibold text-muted-foreground block mb-0.5">
                {stat.label}
              </span>
              <p className="text-xl sm:text-2xl font-bold tracking-tight text-foreground">
                {stat.value}
              </p>
            </div>

            <div className="pt-2 border-t border-border text-[11px] text-muted-foreground">
              <span>{stat.subtext}</span>
            </div>
          </div>
        );
      })}
    </div>
  );
}
