"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useStudentUiStore } from "@/stores/student-ui-store";
import { authClient } from "@/lib/auth-client";
import { StreakBadge } from "./streak-badge";
import {
  LayoutDashboard,
  BookOpen,
  Compass,
  Award,
  Settings,
  X,
  GraduationCap,
  LogOut,
} from "lucide-react";

const NAV_ITEMS = [
  {
    label: "Dashboard",
    href: "/student/dashboard",
    icon: LayoutDashboard,
  },
  {
    label: "My Courses",
    href: "/student/courses",
    icon: BookOpen,
  },
  {
    label: "Explore",
    href: "/student/explore",
    icon: Compass,
  },
  {
    label: "Certificates",
    href: "/student/certificates",
    icon: Award,
  },
  {
    label: "Settings",
    href: "/student/settings",
    icon: Settings,
  },
];

export function StudentMobileNav() {
  const pathname = usePathname();
  const { isMobileNavOpen, setMobileNavOpen } = useStudentUiStore();
  const { data: session } = authClient.useSession();

  // Close drawer automatically on route navigation
  React.useEffect(() => {
    setMobileNavOpen(false);
  }, [pathname, setMobileNavOpen]);

  if (!isMobileNavOpen) return null;

  const userName = session?.user?.name || "Student";
  const userEmail = session?.user?.email || "student@asquala.edu";
  const userInitials = userName
    .split(" ")
    .map((n) => n[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  return (
    <div className="fixed inset-0 z-50 lg:hidden">
      {/* Backdrop overlay */}
      <div
        className="fixed inset-0 bg-slate-900/40 backdrop-blur-xs transition-opacity animate-in fade-in-0"
        onClick={() => setMobileNavOpen(false)}
        aria-hidden="true"
      />

      {/* Slide-over panel */}
      <div className="fixed inset-y-0 left-0 w-72 bg-card border-r border-border shadow-2xl flex flex-col z-50 animate-in slide-in-from-left duration-200">
        {/* Header */}
        <div className="h-16 px-4 border-b border-border flex items-center justify-between">
          <Link
            href="/student/dashboard"
            onClick={() => setMobileNavOpen(false)}
            className="flex items-center gap-3"
          >
            <div className="w-9 h-9 rounded-lg bg-primary-light flex items-center justify-center border border-primary-border">
              <GraduationCap className="w-5 h-5 text-primary" />
            </div>
            <div className="flex flex-col">
              <span className="font-bold text-base tracking-tight text-foreground leading-none">
                Asquala
              </span>
              <span className="text-[10px] uppercase font-semibold tracking-wider text-primary mt-0.5">
                Student Portal
              </span>
            </div>
          </Link>

          <button
            type="button"
            onClick={() => setMobileNavOpen(false)}
            className="p-2 rounded-lg text-muted-foreground hover:text-foreground hover:bg-secondary cursor-pointer focus:outline-hidden"
            aria-label="Close navigation menu"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Streak & Status Pill */}
        <div className="p-4 border-b border-border bg-muted/40">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
              Study Streak
            </span>
            <StreakBadge days={5} />
          </div>
        </div>

        {/* Navigation Links */}
        <nav className="flex-1 p-3 space-y-1.5 overflow-y-auto">
          {NAV_ITEMS.map((item) => {
            const Icon = item.icon;
            const isActive =
              pathname === item.href ||
              (item.href !== "/student/dashboard" && pathname.startsWith(item.href));

            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setMobileNavOpen(false)}
                className={`flex items-center gap-3 px-3.5 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                  isActive
                    ? "bg-primary-light text-primary font-semibold border-r-2 border-primary"
                    : "text-muted-foreground hover:text-foreground hover:bg-secondary"
                }`}
              >
                <Icon
                  className={`w-5 h-5 shrink-0 ${
                    isActive ? "text-primary" : "text-muted-foreground"
                  }`}
                />
                <span>{item.label}</span>
              </Link>
            );
          })}
        </nav>

        {/* Bottom User Card */}
        <div className="p-4 border-t border-border bg-card">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-9 h-9 rounded-full bg-primary-light text-primary font-bold text-xs flex items-center justify-center border border-primary-border shrink-0">
              {userInitials}
            </div>
            <div className="flex flex-col min-w-0">
              <span className="text-sm font-semibold text-foreground truncate">{userName}</span>
              <span className="text-xs text-muted-foreground truncate">{userEmail}</span>
            </div>
          </div>
          <button
            type="button"
            onClick={async () => {
              await authClient.signOut();
              window.location.href = "/login";
            }}
            className="w-full flex items-center justify-center gap-2 py-2 px-3 text-xs font-semibold rounded-lg border border-border bg-secondary hover:bg-destructive/10 hover:text-destructive hover:border-destructive/30 transition-colors cursor-pointer text-foreground"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span>Sign Out</span>
          </button>
        </div>
      </div>
    </div>
  );
}
