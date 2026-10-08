"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { useInstructorUiStore } from "@/stores/instructor-ui-store";
import { authClient } from "@/lib/auth-client";
import {
  LayoutDashboard,
  BookOpen,
  BarChart3,
  MessageSquare,
  Wallet,
  Settings,
  GraduationCap,
  X,
  LogOut,
  ShieldCheck,
} from "lucide-react";

const NAV_ITEMS = [
  {
    label: "Dashboard",
    href: "/instructor/dashboard",
    icon: LayoutDashboard,
  },
  {
    label: "My Courses",
    href: "/instructor/courses",
    icon: BookOpen,
  },
  {
    label: "Analytics",
    href: "/instructor/analytics",
    icon: BarChart3,
  },
  {
    label: "Student Q&A",
    href: "/instructor/qa",
    icon: MessageSquare,
  },
  {
    label: "Earnings & Payouts",
    href: "/instructor/earnings",
    icon: Wallet,
  },
  {
    label: "Studio Settings",
    href: "/instructor/settings",
    icon: Settings,
  },
];

export function InstructorMobileNav() {
  const pathname = usePathname();
  const router = useRouter();
  const { isMobileNavOpen, setMobileNavOpen } = useInstructorUiStore();
  const { data: session } = authClient.useSession();

  if (!isMobileNavOpen) return null;

  const handleSignOut = async () => {
    try {
      await authClient.signOut();
      router.push("/instructor/login");
    } catch {
      router.push("/instructor/login");
    } finally {
      setMobileNavOpen(false);
    }
  };

  const userName = session?.user?.name || "Yishaq Abreham";
  const userEmail = session?.user?.email || "yishaq.abreham@asquala.edu";
  const initials = userName
    .split(" ")
    .map((n) => n[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  return (
    <div className="fixed inset-0 z-50 lg:hidden">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-slate-900/40 backdrop-blur-xs transition-opacity animate-in fade-in-0"
        onClick={() => setMobileNavOpen(false)}
        aria-hidden="true"
      />

      {/* Slide-over Drawer */}
      <div className="fixed inset-y-0 left-0 w-72 bg-card border-r border-border shadow-2xl flex flex-col z-50 animate-in slide-in-from-left duration-200">
        {/* Header */}
        <div className="h-16 px-4 border-b border-border flex items-center justify-between">
          <Link
            href="/instructor/dashboard"
            onClick={() => setMobileNavOpen(false)}
            className="flex items-center gap-3"
          >
            <div className="relative shrink-0">
              <Image
                src="/images/logo.png"
                alt="Asquala Logo"
                width={36}
                height={36}
                className="w-9 h-9 object-contain"
                priority
              />
            </div>
            <div className="flex flex-col">
              <span className="font-bold text-base tracking-tight text-foreground leading-none">
                Asquala
              </span>
              <span className="text-[10px] uppercase font-bold tracking-wider text-primary mt-0.5">
                Creator Studio
              </span>
            </div>
          </Link>

          <button
            type="button"
            onClick={() => setMobileNavOpen(false)}
            className="p-2 rounded-lg text-muted-foreground hover:text-foreground hover:bg-secondary cursor-pointer"
            aria-label="Close menu"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* User Card */}
        <div className="p-4 border-b border-border bg-secondary/30">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-primary-light text-primary font-bold text-sm flex items-center justify-center border border-primary-border shrink-0">
              {initials}
            </div>
            <div className="flex flex-col min-w-0">
              <span className="text-sm font-bold text-foreground truncate">
                {userName}
              </span>
              <span className="text-xs text-muted-foreground truncate">
                {userEmail}
              </span>
              <span className="inline-flex items-center gap-1 mt-1 text-[10px] font-bold px-2 py-0.5 rounded-full bg-primary-light text-primary border border-primary-border w-fit">
                <ShieldCheck className="w-3 h-3" />
                Verified Educator
              </span>
            </div>
          </div>
        </div>

        {/* Nav Links */}
        <nav className="flex-1 py-4 px-3 space-y-1 overflow-y-auto">
          {NAV_ITEMS.map((item) => {
            const Icon = item.icon;
            const isActive =
              pathname === item.href ||
              (item.href !== "/instructor/dashboard" && pathname.startsWith(item.href));

            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setMobileNavOpen(false)}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-semibold transition-all ${
                  isActive
                    ? "bg-primary-light text-primary border border-primary-border"
                    : "text-muted-foreground hover:text-foreground hover:bg-secondary"
                }`}
              >
                <Icon className="w-4 h-4 shrink-0" />
                <span>{item.label}</span>
              </Link>
            );
          })}
        </nav>

        {/* Bottom Switcher & Sign Out */}
        <div className="p-4 border-t border-border space-y-2">
          <Link
            href="/student/dashboard"
            onClick={() => setMobileNavOpen(false)}
            className="flex items-center justify-center gap-2 w-full p-2.5 rounded-xl text-xs font-semibold bg-secondary hover:bg-secondary/80 text-foreground transition-colors"
          >
            <GraduationCap className="w-4 h-4 text-primary" />
            <span>Switch to Student Portal</span>
          </Link>

          <button
            type="button"
            onClick={handleSignOut}
            className="flex items-center justify-center gap-2 w-full p-2 rounded-xl text-xs font-medium text-destructive hover:bg-destructive/10 transition-colors cursor-pointer"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span>Sign Out of Studio</span>
          </button>
        </div>
      </div>
    </div>
  );
}
