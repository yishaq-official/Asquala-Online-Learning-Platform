"use client";

import * as React from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useStudentUiStore } from "@/stores/student-ui-store";
import {
  LayoutDashboard,
  BookOpen,
  Compass,
  Award,
  Settings,
  ChevronLeft,
  ChevronRight,
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

export function StudentSidebar() {
  const pathname = usePathname();
  const { isSidebarCollapsed, toggleSidebar } = useStudentUiStore();

  return (
    <aside
      className={`hidden lg:flex flex-col bg-card border-r border-border h-screen sticky top-0 transition-all duration-300 z-40 ${
        isSidebarCollapsed ? "w-20" : "w-64"
      }`}
    >
      {/* Brand Header */}
      <div className="h-16 flex items-center px-4 border-b border-border justify-between">
        <Link
          href="/student/dashboard"
          className="flex items-center gap-3 overflow-hidden group"
          title="Asquala Student Portal"
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
              <span className="text-[10px] uppercase font-semibold tracking-wider text-primary mt-1">
                Student Portal
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
            (item.href !== "/student/dashboard" && pathname.startsWith(item.href));

          return (
            <Link
              key={item.href}
              href={item.href}
              title={isSidebarCollapsed ? item.label : undefined}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-colors group relative ${
                isActive
                  ? "bg-primary-light text-primary font-semibold border-r-2 border-primary shadow-2xs"
                  : "text-muted-foreground hover:text-foreground hover:bg-secondary"
              } ${isSidebarCollapsed ? "justify-center" : ""}`}
            >
              <Icon
                className={`w-5 h-5 shrink-0 transition-colors ${
                  isActive ? "text-primary" : "text-muted-foreground group-hover:text-foreground"
                }`}
              />
              {!isSidebarCollapsed && <span className="truncate">{item.label}</span>}
              {isSidebarCollapsed && (
                <div className="absolute left-full ml-2 px-2.5 py-1 bg-foreground text-background text-xs rounded-md shadow-md opacity-0 pointer-events-none group-hover:opacity-100 transition-opacity z-50 whitespace-nowrap">
                  {item.label}
                </div>
              )}
            </Link>
          );
        })}
      </nav>

      {/* Collapse Toggle Footer */}
      <div className="p-3 border-t border-border flex items-center justify-between">
        {!isSidebarCollapsed && (
          <span className="text-xs text-muted-foreground font-medium px-2">Collapse Menu</span>
        )}
        <button
          type="button"
          onClick={toggleSidebar}
          className="p-2 rounded-lg hover:bg-secondary text-muted-foreground hover:text-foreground transition-colors cursor-pointer mx-auto focus:outline-hidden focus:ring-2 focus:ring-ring"
          title={isSidebarCollapsed ? "Expand sidebar" : "Collapse sidebar"}
          aria-label={isSidebarCollapsed ? "Expand sidebar" : "Collapse sidebar"}
        >
          {isSidebarCollapsed ? (
            <ChevronRight className="w-5 h-5" />
          ) : (
            <ChevronLeft className="w-5 h-5" />
          )}
        </button>
      </div>
    </aside>
  );
}
