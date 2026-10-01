"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import { useStudentUiStore } from "@/stores/student-ui-store";
import { StreakBadge } from "./streak-badge";
import { StudentUserDropdown } from "./student-user-dropdown";
import { Menu, Search, Bell } from "lucide-react";

export function StudentHeader() {
  const router = useRouter();
  const { setMobileNavOpen } = useStudentUiStore();
  const [searchValue, setSearchValue] = React.useState("");

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchValue.trim()) {
      router.push(`/student/explore?q=${encodeURIComponent(searchValue.trim())}`);
    }
  };

  return (
    <header className="sticky top-0 z-30 w-full bg-card/90 backdrop-blur-md border-b border-border h-16 flex items-center px-4 sm:px-6 lg:px-8 justify-between gap-4">
      {/* Left: Mobile Hamburger & Search */}
      <div className="flex items-center gap-3 flex-1 max-w-lg">
        <button
          type="button"
          onClick={() => setMobileNavOpen(true)}
          className="lg:hidden p-2 rounded-lg text-muted-foreground hover:text-foreground hover:bg-secondary cursor-pointer focus:outline-hidden focus:ring-2 focus:ring-ring"
          aria-label="Open mobile menu"
        >
          <Menu className="w-5 h-5" />
        </button>

        {/* Global Search Input */}
        <form onSubmit={handleSearchSubmit} className="relative w-full">
          <div className="relative flex items-center">
            <Search className="w-4 h-4 text-muted-foreground absolute left-3 pointer-events-none" />
            <input
              type="text"
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
              placeholder="Search courses, lessons, topics..."
              className="w-full pl-9 pr-14 py-1.5 text-xs sm:text-sm rounded-lg bg-secondary border border-border text-foreground placeholder:text-muted-foreground focus:outline-hidden focus:ring-2 focus:ring-ring focus:bg-card transition-all"
            />
            <kbd className="hidden sm:inline-flex items-center gap-0.5 absolute right-2.5 px-1.5 py-0.5 text-[10px] font-semibold text-muted-foreground bg-card border border-border rounded shadow-2xs pointer-events-none">
              <span className="text-[11px]">⌘</span>K
            </kbd>
          </div>
        </form>
      </div>

      {/* Right: Streak, Notifications & User Dropdown */}
      <div className="flex items-center gap-2 sm:gap-3 shrink-0">
        {/* Streak Counter */}
        <div className="hidden sm:block">
          <StreakBadge days={5} />
        </div>

        {/* Notifications Icon Button */}
        <div className="relative">
          <button
            type="button"
            className="p-2 rounded-lg text-muted-foreground hover:text-foreground hover:bg-secondary border border-transparent hover:border-border transition-colors cursor-pointer relative focus:outline-hidden focus:ring-2 focus:ring-ring"
            title="Notifications (2 unread)"
            aria-label="Notifications"
          >
            <Bell className="w-4 h-4" />
            <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-primary ring-2 ring-card" />
          </button>
        </div>

        <div className="h-6 w-[1px] bg-border mx-1 hidden sm:block" />

        {/* User Session Profile Menu */}
        <StudentUserDropdown />
      </div>
    </header>
  );
}
