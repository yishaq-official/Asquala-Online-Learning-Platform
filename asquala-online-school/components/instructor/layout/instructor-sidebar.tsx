"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useInstructorUiStore } from "@/stores/instructor-ui-store";
import {
  LayoutDashboard,
  BookOpen,
  BarChart3,
  MessageSquare,
  Wallet,
  Settings,
  GraduationCap,
  ChevronLeft,
  ChevronRight,
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

export function InstructorSidebar() {
  const pathname = usePathname();
  const { isSidebarCollapsed, toggleSidebar } = useInstructorUiStore();

  return (
    <aside
      className={`hidden lg:flex flex-col bg-card border-r border-border h-screen sticky top-0 transition-all duration-300 z-40 select-none ${
        isSidebarCollapsed ? "w-20" : "w-64"
      }`}
    >
      {/* Brand Header */}
      <div className="h-16 flex items-center px-4 border-b border-border justify-between">
        <Link
          href="/instructor/dashboard"
          className="flex items-center gap-3 overflow-hidden group"
          title="Asquala Instructor Studio"
        >
          <div className="relative shrink-0 transition-transform group-hover:scale-105">
            <Image
              src="/images/logo.png"
              alt="Asquala Logo"
              width={40}
              height={40}
              className="w-10 h-10 object-contain"
              priority
            />
          </div>

          {!isSidebarCollapsed && (
            <div className="flex flex-col min-w-0">
              <span className="font-bold text-lg tracking-tight text-foreground leading-none">
                Asquala
              </span>
              <span className="text-[10px] uppercase font-bold tracking-wider text-primary mt-1">
                Creator Studio
              </span>
            </div>
          )}
        </Link>
      </div>

      {/* Navigation Links */}
      <nav className="flex-1 py-4 px-3 space-y-1.5 overflow-y-auto">
        {NAV_ITEMS.map((item) => {
          const Icon = item.icon;
          const isActive =
            pathname === item.href ||
            (item.href !== "/instructor/dashboard" && pathname.startsWith(item.href));

          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-semibold transition-all group ${
                isActive
                  ? "bg-primary-light text-primary border border-primary-border shadow-2xs"
                  : "text-muted-foreground hover:text-foreground hover:bg-secondary/70 border border-transparent"
              } ${isSidebarCollapsed ? "justify-center px-0" : ""}`}
              title={isSidebarCollapsed ? item.label : undefined}
            >
              <Icon
                className={`w-4 h-4 shrink-0 transition-colors ${
                  isActive ? "text-primary" : "text-muted-foreground group-hover:text-foreground"
                }`}
              />
              {!isSidebarCollapsed && <span className="truncate">{item.label}</span>}
            </Link>
          );
        })}
      </nav>

      {/* Bottom Switcher & Collapse Controls */}
      <div className="p-3 border-t border-border space-y-2">
        {/* Switch to Student Portal */}
        <Link
          href="/student/dashboard"
          className={`flex items-center gap-2.5 p-2 rounded-xl text-xs font-medium text-muted-foreground hover:text-primary hover:bg-primary-light/50 border border-border hover:border-primary-border transition-colors ${
            isSidebarCollapsed ? "justify-center" : "px-3"
          }`}
          title="Switch to Student Portal"
        >
          <GraduationCap className="w-4 h-4 text-primary shrink-0" />
          {!isSidebarCollapsed && <span>Student Portal</span>}
        </Link>

        {/* Collapse toggle */}
        <button
          type="button"
          onClick={toggleSidebar}
          className="w-full flex items-center justify-center p-2 rounded-xl text-muted-foreground hover:text-foreground hover:bg-secondary transition-colors cursor-pointer"
          title={isSidebarCollapsed ? "Expand sidebar" : "Collapse sidebar"}
          aria-label={isSidebarCollapsed ? "Expand sidebar" : "Collapse sidebar"}
        >
          {isSidebarCollapsed ? (
            <ChevronRight className="w-4 h-4" />
          ) : (
            <div className="flex items-center gap-2 text-xs font-medium">
              <ChevronLeft className="w-4 h-4" />
              <span>Collapse Sidebar</span>
            </div>
          )}
        </button>
      </div>
    </aside>
  );
}
