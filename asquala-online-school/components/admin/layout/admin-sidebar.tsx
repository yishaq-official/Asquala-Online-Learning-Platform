"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useAdminUiStore } from "@/stores/admin-ui-store";
import {
  LayoutDashboard,
  Award,
  BookCheck,
  Landmark,
  Users,
  ShieldCheck,
  GraduationCap,
  BookOpen,
  LogOut,
  ChevronLeft,
  ChevronRight,
  ShieldAlert,
} from "lucide-react";

interface AdminNavItem {
  label: string;
  href: string;
  icon: React.ComponentType<{ className?: string }>;
  countKey?: "pendingAccreditations" | "pendingCourseReviews" | "pendingPayoutSettlements";
}

const ADMIN_NAV_ITEMS: AdminNavItem[] = [
  {
    label: "Executive Dashboard",
    href: "/admin/dashboard",
    icon: LayoutDashboard,
  },
  {
    label: "Teacher Accreditation",
    href: "/admin/accreditation",
    icon: Award,
    countKey: "pendingAccreditations",
  },
  {
    label: "Course Quality Audit",
    href: "/admin/courses",
    icon: BookCheck,
    countKey: "pendingCourseReviews",
  },
  {
    label: "Treasury & Payouts",
    href: "/admin/payouts",
    icon: Landmark,
    countKey: "pendingPayoutSettlements",
  },
  {
    label: "User Directory & RBAC",
    href: "/admin/users",
    icon: Users,
  },
  {
    label: "System & Governance",
    href: "/admin/settings",
    icon: ShieldCheck,
  },
];

export function AdminSidebar() {
  const pathname = usePathname();
  const { isSidebarCollapsed, toggleSidebar, auditCounts, activeAuditor } =
    useAdminUiStore();

  return (
    <aside
      className={`hidden lg:flex flex-col bg-card border-r border-border h-screen sticky top-0 transition-all duration-300 z-40 select-none ${
        isSidebarCollapsed ? "w-20" : "w-64"
      }`}
    >
      {/* Brand Header */}
      <div className="h-16 flex items-center px-4 border-b border-border justify-between shrink-0">
        <Link
          href="/admin/dashboard"
          className="flex items-center gap-3 overflow-hidden group"
          title="Asquala Academic Governance"
        >
          <div className="relative shrink-0 transition-transform group-hover:scale-105">
            <Image
              src="/images/logo.png"
              alt="Asquala Logo"
              width={38}
              height={38}
              className="w-9 h-9 object-contain"
              priority
            />
          </div>

          {!isSidebarCollapsed && (
            <div className="flex flex-col min-w-0">
              <span className="font-bold text-base tracking-tight text-foreground leading-tight">
                Asquala
              </span>
              <span className="text-[10px] uppercase font-bold tracking-wider text-primary">
                Governance Board
              </span>
            </div>
          )}
        </Link>
      </div>

      {/* Institutional Board Authority Badge */}
      {!isSidebarCollapsed ? (
        <div className="mx-3 mt-3 p-2.5 rounded-xl bg-emerald-50/80 border border-emerald-200/80 flex items-center gap-2.5">
          <div className="w-2 h-2 rounded-full bg-emerald-600 animate-pulse shrink-0" />
          <div className="min-w-0">
            <p className="text-[11px] font-bold text-emerald-950 truncate leading-tight">
              Review Board Active
            </p>
            <p className="text-[10px] text-emerald-800 truncate font-medium">
              Academic Control Plane
            </p>
          </div>
        </div>
      ) : (
        <div className="mx-auto mt-3 p-2 rounded-lg bg-emerald-50 border border-emerald-200 flex items-center justify-center" title="Review Board Active">
          <div className="w-2.5 h-2.5 rounded-full bg-emerald-600 animate-pulse" />
        </div>
      )}

      {/* Primary Navigation Links */}
      <nav className="flex-1 py-3 px-3 space-y-1 overflow-y-auto">
        {ADMIN_NAV_ITEMS.map((item) => {
          const Icon = item.icon;
          const isActive =
            pathname === item.href ||
            (item.href !== "/admin/dashboard" && pathname.startsWith(item.href));
          const count = item.countKey ? auditCounts[item.countKey] : 0;

          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-semibold transition-all group relative ${
                isActive
                  ? "bg-primary-light text-primary border border-primary-border shadow-2xs font-bold"
                  : "text-muted-foreground hover:text-foreground hover:bg-secondary/70 border border-transparent"
              } ${isSidebarCollapsed ? "justify-center px-0" : ""}`}
              title={isSidebarCollapsed ? `${item.label} (${count > 0 ? `${count} pending` : ""})` : undefined}
            >
              <Icon
                className={`w-4 h-4 shrink-0 transition-colors ${
                  isActive
                    ? "text-primary"
                    : "text-muted-foreground group-hover:text-foreground"
                }`}
              />

              {!isSidebarCollapsed && (
                <>
                  <span className="truncate flex-1">{item.label}</span>
                  {count > 0 && (
                    <span
                      className={`text-[10px] font-bold px-1.5 py-0.5 rounded-full border ${
                        isActive
                          ? "bg-emerald-600 text-white border-emerald-700"
                          : "bg-emerald-100 text-emerald-800 border-emerald-200"
                      }`}
                    >
                      {count}
                    </span>
                  )}
                </>
              )}

              {/* Collapsed view badge indicator */}
              {isSidebarCollapsed && count > 0 && (
                <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-emerald-600 ring-2 ring-card" />
              )}
            </Link>
          );
        })}
      </nav>

      {/* Cross-Platform Switcher & Controls */}
      <div className="p-3 border-t border-border space-y-1.5 shrink-0">
        {!isSidebarCollapsed && (
          <p className="px-2 text-[10px] uppercase font-bold tracking-wider text-muted-foreground">
            Cross-Portal Switcher
          </p>
        )}

        {/* Teacher Studio Switcher */}
        <Link
          href="/instructor/dashboard"
          className={`flex items-center gap-2.5 p-2 rounded-xl text-xs font-medium text-muted-foreground hover:text-primary hover:bg-primary-light/50 border border-border/80 hover:border-primary-border transition-colors ${
            isSidebarCollapsed ? "justify-center" : "px-3"
          }`}
          title="Switch to Teacher Studio"
        >
          <GraduationCap className="w-4 h-4 text-emerald-700 shrink-0" />
          {!isSidebarCollapsed && <span>Teacher Studio</span>}
        </Link>

        {/* Student Marketplace Switcher */}
        <Link
          href="/student/dashboard"
          className={`flex items-center gap-2.5 p-2 rounded-xl text-xs font-medium text-muted-foreground hover:text-primary hover:bg-primary-light/50 border border-border/80 hover:border-primary-border transition-colors ${
            isSidebarCollapsed ? "justify-center" : "px-3"
          }`}
          title="Switch to Student Marketplace"
        >
          <BookOpen className="w-4 h-4 text-emerald-700 shrink-0" />
          {!isSidebarCollapsed && <span>Student Portal</span>}
        </Link>

        {/* Sign Out / Exit Governance */}
        <Link
          href="/admin/login"
          className={`flex items-center gap-2.5 p-2 rounded-xl text-xs font-medium text-rose-700 hover:text-rose-800 hover:bg-rose-50 border border-transparent hover:border-rose-200 transition-colors ${
            isSidebarCollapsed ? "justify-center" : "px-3"
          }`}
          title="Exit Admin Console"
        >
          <LogOut className="w-4 h-4 text-rose-600 shrink-0" />
          {!isSidebarCollapsed && <span>Sign Out</span>}
        </Link>

        {/* Collapse toggle */}
        <button
          type="button"
          onClick={toggleSidebar}
          className="w-full flex items-center justify-center p-2 rounded-xl text-muted-foreground hover:text-foreground hover:bg-secondary transition-colors cursor-pointer pt-2"
          title={isSidebarCollapsed ? "Expand sidebar" : "Collapse sidebar"}
          aria-label={isSidebarCollapsed ? "Expand sidebar" : "Collapse sidebar"}
        >
          {isSidebarCollapsed ? (
            <ChevronRight className="w-4 h-4" />
          ) : (
            <div className="flex items-center gap-2 text-xs font-medium text-muted-foreground">
              <ChevronLeft className="w-4 h-4" />
              <span>Collapse Sidebar</span>
            </div>
          )}
        </button>
      </div>
    </aside>
  );
}
