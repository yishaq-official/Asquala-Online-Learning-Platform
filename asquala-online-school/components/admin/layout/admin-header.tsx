"use client";

import React, { useState, useRef, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { useAdminUiStore } from "@/stores/admin-ui-store";
import {
  Menu,
  ShieldCheck,
  Bell,
  CheckCircle2,
  Clock,
  AlertTriangle,
  ChevronDown,
  LogOut,
  GraduationCap,
  BookOpen,
  User,
  ExternalLink,
  ShieldAlert,
} from "lucide-react";

export function AdminHeader() {
  const { setMobileNavOpen, activeAuditor, auditCounts } = useAdminUiStore();
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);
  const [isAlertsOpen, setIsAlertsOpen] = useState(false);

  const profileRef = useRef<HTMLDivElement>(null);
  const alertsRef = useRef<HTMLDivElement>(null);

  const totalPending =
    auditCounts.pendingAccreditations + auditCounts.pendingCourseReviews;

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        profileRef.current &&
        !profileRef.current.contains(event.target as Node)
      ) {
        setIsProfileMenuOpen(false);
      }
      if (
        alertsRef.current &&
        !alertsRef.current.contains(event.target as Node)
      ) {
        setIsAlertsOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <header className="sticky top-0 z-30 w-full bg-card/90 backdrop-blur-md border-b border-border h-16 flex items-center px-4 sm:px-6 lg:px-8 justify-between gap-4">
      {/* Left: Mobile Trigger & Governance Identity */}
      <div className="flex items-center gap-3 min-w-0">
        <button
          type="button"
          onClick={() => setMobileNavOpen(true)}
          className="lg:hidden p-2 rounded-lg text-muted-foreground hover:text-foreground hover:bg-secondary cursor-pointer"
          aria-label="Open governance menu"
        >
          <Menu className="w-5 h-5" />
        </button>

        {/* Mobile Logo */}
        <Link
          href="/admin/dashboard"
          className="lg:hidden shrink-0 flex items-center"
          title="Asquala Governance"
        >
          <Image
            src="/images/logo.png"
            alt="Asquala Logo"
            width={32}
            height={32}
            className="w-8 h-8 object-contain"
            priority
          />
        </Link>

        {/* Board Title & Live Status */}
        <div className="hidden sm:flex flex-col min-w-0">
          <div className="flex items-center gap-2">
            <span className="font-bold text-sm tracking-tight text-foreground truncate">
              Academic Governance & Quality Board
            </span>
            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-100 text-emerald-800 border border-emerald-200">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 animate-pulse" />
              BOARD ACTIVE
            </span>
          </div>
          <span className="text-[11px] text-muted-foreground font-medium truncate">
            Asquala National Higher Education & Marketplace Control Plane
          </span>
        </div>
      </div>

      {/* Right: Actions, Backlog Pill, Notifications & Auditor Profile */}
      <div className="flex items-center gap-2 sm:gap-3 shrink-0">
        {/* Pending Backlog Pill */}
        <Link
          href="/admin/accreditation"
          className="hidden md:flex items-center gap-2 px-3 py-1.5 rounded-xl bg-amber-50 hover:bg-amber-100/80 border border-amber-200 text-xs transition-colors"
          title="View Pending Reviews"
        >
          <Clock className="w-3.5 h-3.5 text-amber-700" />
          <span className="text-amber-900 font-semibold">
            {totalPending} Audits In Queue
          </span>
          <span className="text-[10px] text-amber-800 bg-amber-200/60 px-1.5 py-0.5 rounded font-bold">
            Needs Action
          </span>
        </Link>

        {/* Alerts & Notifications Popover */}
        <div className="relative" ref={alertsRef}>
          <button
            type="button"
            onClick={() => setIsAlertsOpen(!isAlertsOpen)}
            className="p-2 rounded-xl text-muted-foreground hover:text-foreground hover:bg-secondary border border-transparent hover:border-border transition-colors relative cursor-pointer"
            title="Institutional Governance Alerts"
            aria-label="View notifications"
          >
            <Bell className="w-4 h-4" />
            <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-emerald-600 ring-2 ring-card" />
          </button>

          {isAlertsOpen && (
            <div className="absolute right-0 mt-2 w-80 sm:w-88 bg-card border border-border rounded-2xl shadow-xl p-3 z-50 animate-in fade-in slide-in-from-top-2 duration-150">
              <div className="flex items-center justify-between pb-2 border-b border-border px-1">
                <span className="text-xs font-bold text-foreground">
                  Governance Activity Feed
                </span>
                <span className="text-[10px] font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                  Live Stream
                </span>
              </div>

              <div className="py-2 space-y-2 max-h-72 overflow-y-auto">
                <div className="p-2.5 rounded-xl bg-secondary/50 border border-border/60 hover:bg-secondary transition-colors">
                  <div className="flex items-start gap-2.5">
                    <div className="w-6 h-6 rounded-lg bg-emerald-100 text-emerald-800 flex items-center justify-center shrink-0 mt-0.5">
                      <ShieldCheck className="w-3.5 h-3.5" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="text-xs font-semibold text-foreground leading-snug">
                        Instructor Accreditation Ready
                      </p>
                      <p className="text-[11px] text-muted-foreground mt-0.5">
                        Abebe Kebede submitted MoE degree verification documents.
                      </p>
                      <span className="text-[10px] text-muted-foreground font-medium mt-1 inline-block">
                        12 minutes ago
                      </span>
                    </div>
                  </div>
                </div>

                <div className="p-2.5 rounded-xl bg-secondary/50 border border-border/60 hover:bg-secondary transition-colors">
                  <div className="flex items-start gap-2.5">
                    <div className="w-6 h-6 rounded-lg bg-amber-100 text-amber-800 flex items-center justify-center shrink-0 mt-0.5">
                      <AlertTriangle className="w-3.5 h-3.5" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="text-xs font-semibold text-foreground leading-snug">
                        Course Curriculum Audit Pending
                      </p>
                      <p className="text-[11px] text-muted-foreground mt-0.5">
                        "Full-Stack Web Development with Next.js" awaiting final review.
                      </p>
                      <span className="text-[10px] text-muted-foreground font-medium mt-1 inline-block">
                        45 minutes ago
                      </span>
                    </div>
                  </div>
                </div>

                <div className="p-2.5 rounded-xl bg-secondary/50 border border-border/60 hover:bg-secondary transition-colors">
                  <div className="flex items-start gap-2.5">
                    <div className="w-6 h-6 rounded-lg bg-emerald-100 text-emerald-800 flex items-center justify-center shrink-0 mt-0.5">
                      <CheckCircle2 className="w-3.5 h-3.5" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="text-xs font-semibold text-foreground leading-snug">
                        Telebirr Batch Settlement
                      </p>
                      <p className="text-[11px] text-muted-foreground mt-0.5">
                        Batch #ETB-8839 settled 42,500 ETB to 3 verified instructors.
                      </p>
                      <span className="text-[10px] text-muted-foreground font-medium mt-1 inline-block">
                        2 hours ago
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="pt-2 border-t border-border flex justify-between items-center px-1">
                <Link
                  href="/admin/settings"
                  className="text-[11px] font-bold text-primary hover:underline"
                  onClick={() => setIsAlertsOpen(false)}
                >
                  View Security Audit Log
                </Link>
                <button
                  type="button"
                  onClick={() => setIsAlertsOpen(false)}
                  className="text-[11px] text-muted-foreground hover:text-foreground"
                >
                  Dismiss
                </button>
              </div>
            </div>
          )}
        </div>

        <div className="h-6 w-[1px] bg-border mx-0.5 hidden sm:block" />

        {/* Auditor Profile Chip & Dropdown */}
        <div className="relative" ref={profileRef}>
          <button
            type="button"
            onClick={() => setIsProfileMenuOpen(!isProfileMenuOpen)}
            className="flex items-center gap-2.5 p-1.5 sm:px-3 sm:py-1.5 rounded-xl hover:bg-secondary border border-transparent hover:border-border transition-all cursor-pointer"
            aria-expanded={isProfileMenuOpen}
            aria-label="Admin auditor menu"
          >
            <div className="relative">
              <div className="w-8 h-8 rounded-full bg-emerald-100 border border-emerald-300 flex items-center justify-center font-bold text-xs text-emerald-900">
                AT
              </div>
              <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 rounded-full bg-emerald-600 ring-2 ring-card flex items-center justify-center">
                <ShieldCheck className="w-2 h-2 text-white" />
              </div>
            </div>

            <div className="hidden lg:flex flex-col text-left">
              <span className="text-xs font-bold text-foreground leading-none">
                {activeAuditor.name}
              </span>
              <span className="text-[10px] text-primary font-medium mt-1">
                {activeAuditor.roleTitle}
              </span>
            </div>

            <ChevronDown className="w-3.5 h-3.5 text-muted-foreground hidden sm:block" />
          </button>

          {isProfileMenuOpen && (
            <div className="absolute right-0 mt-2 w-64 bg-card border border-border rounded-2xl shadow-xl p-2 z-50 animate-in fade-in slide-in-from-top-2 duration-150">
              {/* Profile Details Header */}
              <div className="p-2.5 rounded-xl bg-secondary/50 border border-border/60 mb-2">
                <p className="text-xs font-bold text-foreground">
                  {activeAuditor.name}
                </p>
                <p className="text-[11px] text-muted-foreground truncate">
                  {activeAuditor.email}
                </p>
                <div className="mt-2 flex items-center gap-1.5">
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 border border-emerald-200">
                    Board Chair
                  </span>
                  <span className="text-[10px] font-medium text-emerald-700 flex items-center gap-1">
                    <ShieldCheck className="w-3 h-3" />
                    2FA Verified
                  </span>
                </div>
              </div>

              {/* Cross-navigation links */}
              <div className="space-y-1">
                <Link
                  href="/instructor/dashboard"
                  onClick={() => setIsProfileMenuOpen(false)}
                  className="flex items-center justify-between px-2.5 py-2 rounded-xl text-xs font-medium text-muted-foreground hover:text-foreground hover:bg-secondary transition-colors"
                >
                  <div className="flex items-center gap-2">
                    <GraduationCap className="w-4 h-4 text-emerald-700" />
                    <span>Teacher Studio</span>
                  </div>
                  <ExternalLink className="w-3.5 h-3.5 text-muted-foreground" />
                </Link>

                <Link
                  href="/student/dashboard"
                  onClick={() => setIsProfileMenuOpen(false)}
                  className="flex items-center justify-between px-2.5 py-2 rounded-xl text-xs font-medium text-muted-foreground hover:text-foreground hover:bg-secondary transition-colors"
                >
                  <div className="flex items-center gap-2">
                    <BookOpen className="w-4 h-4 text-emerald-700" />
                    <span>Student Marketplace</span>
                  </div>
                  <ExternalLink className="w-3.5 h-3.5 text-muted-foreground" />
                </Link>

                <div className="h-[1px] bg-border my-1" />

                {/* Sign Out */}
                <Link
                  href="/admin/login"
                  onClick={() => setIsProfileMenuOpen(false)}
                  className="flex items-center gap-2 px-2.5 py-2 rounded-xl text-xs font-semibold text-rose-700 hover:text-rose-800 hover:bg-rose-50 transition-colors"
                >
                  <LogOut className="w-4 h-4 text-rose-600" />
                  <span>Sign Out of Governance</span>
                </Link>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
