"use client";

import React, { useEffect } from "react";
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
  X,
  ExternalLink,
} from "lucide-react";

const ADMIN_NAV_ITEMS = [
  {
    label: "Executive Dashboard",
    href: "/admin/dashboard",
    icon: LayoutDashboard,
  },
  {
    label: "Teacher Accreditation",
    href: "/admin/accreditation",
    icon: Award,
    countKey: "pendingAccreditations" as const,
  },
  {
    label: "Course Quality Audit",
    href: "/admin/courses",
    icon: BookCheck,
    countKey: "pendingCourseReviews" as const,
  },
  {
    label: "Treasury & Payouts",
    href: "/admin/payouts",
    icon: Landmark,
    countKey: "pendingPayoutSettlements" as const,
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

export function AdminMobileNav() {
  const pathname = usePathname();
  const { isMobileNavOpen, setMobileNavOpen, auditCounts, activeAuditor } =
    useAdminUiStore();

  // Close nav on route change
  useEffect(() => {
    setMobileNavOpen(false);
  }, [pathname, setMobileNavOpen]);

  // Lock body scroll when mobile nav is open
  useEffect(() => {
    if (isMobileNavOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isMobileNavOpen]);

  if (!isMobileNavOpen) return null;

  return (
    <div className="fixed inset-0 z-50 lg:hidden flex">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs transition-opacity animate-in fade-in duration-200"
        onClick={() => setMobileNavOpen(false)}
        aria-hidden="true"
      />

      {/* Drawer */}
      <div className="relative flex flex-col w-full max-w-xs bg-card h-full shadow-2xl z-10 animate-in slide-in-from-left duration-250">
        {/* Header */}
        <div className="h-16 flex items-center justify-between px-5 border-b border-border">
          <Link
            href="/admin/dashboard"
            className="flex items-center gap-3"
            onClick={() => setMobileNavOpen(false)}
          >
            <Image
              src="/images/logo.png"
              alt="Asquala Logo"
              width={34}
              height={34}
              className="w-8 h-8 object-contain"
            />
            <div className="flex flex-col">
              <span className="font-bold text-base tracking-tight text-foreground leading-tight">
                Asquala
              </span>
              <span className="text-[10px] uppercase font-bold tracking-wider text-primary">
                Governance Board
              </span>
            </div>
          </Link>

          <button
            type="button"
            onClick={() => setMobileNavOpen(false)}
            className="p-2 rounded-xl text-muted-foreground hover:text-foreground hover:bg-secondary cursor-pointer"
            aria-label="Close menu"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Auditor Chip */}
        <div className="p-4 border-b border-border bg-secondary/40">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-full bg-emerald-100 border border-emerald-300 flex items-center justify-center font-bold text-xs text-emerald-900 shrink-0">
              AT
            </div>
            <div className="min-w-0 flex-1">
              <p className="text-xs font-bold text-foreground truncate">
                {activeAuditor.name}
              </p>
              <p className="text-[10px] text-muted-foreground truncate">
                {activeAuditor.roleTitle}
              </p>
            </div>
          </div>
        </div>

        {/* Navigation Links */}
        <nav className="flex-1 px-3 py-4 space-y-1.5 overflow-y-auto">
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
                onClick={() => setMobileNavOpen(false)}
                className={`flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-semibold transition-all ${
                  isActive
                    ? "bg-primary-light text-primary border border-primary-border shadow-2xs font-bold"
                    : "text-muted-foreground hover:text-foreground hover:bg-secondary/70 border border-transparent"
                }`}
              >
                <div className="flex items-center gap-3">
                  <Icon
                    className={`w-4 h-4 shrink-0 ${
                      isActive ? "text-primary" : "text-muted-foreground"
                    }`}
                  />
                  <span>{item.label}</span>
                </div>

                {count > 0 && (
                  <span
                    className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${
                      isActive
                        ? "bg-emerald-600 text-white border-emerald-700"
                        : "bg-emerald-100 text-emerald-800 border-emerald-200"
                    }`}
                  >
                    {count}
                  </span>
                )}
              </Link>
            );
          })}
        </nav>

        {/* Bottom Switchers & Log Out */}
        <div className="p-4 border-t border-border space-y-2 bg-card">
          <p className="text-[10px] uppercase font-bold tracking-wider text-muted-foreground px-1">
            Other Portals
          </p>

          <Link
            href="/instructor/dashboard"
            onClick={() => setMobileNavOpen(false)}
            className="flex items-center justify-between p-2.5 rounded-xl text-xs font-medium text-muted-foreground hover:text-primary hover:bg-primary-light/50 border border-border transition-colors"
          >
            <div className="flex items-center gap-2">
              <GraduationCap className="w-4 h-4 text-emerald-700" />
              <span>Teacher Studio</span>
            </div>
            <ExternalLink className="w-3.5 h-3.5 text-muted-foreground" />
          </Link>

          <Link
            href="/student/dashboard"
            onClick={() => setMobileNavOpen(false)}
            className="flex items-center justify-between p-2.5 rounded-xl text-xs font-medium text-muted-foreground hover:text-primary hover:bg-primary-light/50 border border-border transition-colors"
          >
            <div className="flex items-center gap-2">
              <BookOpen className="w-4 h-4 text-emerald-700" />
              <span>Student Marketplace</span>
            </div>
            <ExternalLink className="w-3.5 h-3.5 text-muted-foreground" />
          </Link>

          <div className="h-[1px] bg-border my-2" />

          <Link
            href="/admin/login"
            onClick={() => setMobileNavOpen(false)}
            className="flex items-center gap-2.5 p-2.5 rounded-xl text-xs font-semibold text-rose-700 hover:text-rose-800 hover:bg-rose-50 transition-colors w-full"
          >
            <LogOut className="w-4 h-4 text-rose-600" />
            <span>Sign Out of Governance</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
