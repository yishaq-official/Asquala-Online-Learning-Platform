"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { useInstructorUiStore } from "@/stores/instructor-ui-store";
import { InstructorUserDropdown } from "./instructor-user-dropdown";
import {
  Menu,
  Plus,
  Coins,
  Bell,
  MessageSquare,
  TrendingUp,
} from "lucide-react";
import { Button } from "@/components/ui/button";

export function InstructorHeader() {
  const { setMobileNavOpen } = useInstructorUiStore();

  return (
    <header className="sticky top-0 z-30 w-full bg-card/90 backdrop-blur-md border-b border-border h-16 flex items-center px-4 sm:px-6 lg:px-8 justify-between gap-4">
      {/* Left: Mobile Menu & Mobile Logo */}
      <div className="flex items-center gap-3">
        <button
          type="button"
          onClick={() => setMobileNavOpen(true)}
          className="lg:hidden p-2 rounded-lg text-muted-foreground hover:text-foreground hover:bg-secondary cursor-pointer"
          aria-label="Open mobile menu"
        >
          <Menu className="w-5 h-5" />
        </button>

        {/* Mobile Brand Logo */}
        <Link
          href="/instructor/dashboard"
          className="lg:hidden shrink-0 flex items-center"
          title="Asquala Instructor Studio"
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

        {/* Studio badge */}
        <div className="hidden sm:inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-primary-light text-primary border border-primary-border">
          <span className="w-1.5 h-1.5 rounded-full bg-primary" />
          <span>INSTRUCTOR STUDIO</span>
        </div>
      </div>

      {/* Right: Actions, Earnings Pill, Q&A Alert & Profile */}
      <div className="flex items-center gap-2 sm:gap-3 shrink-0">
        {/* Create Course Action */}
        <Link href="/instructor/courses/create">
          <Button
            variant="primary"
            size="sm"
            className="gap-1.5 text-xs font-bold shadow-2xs"
          >
            <Plus className="w-4 h-4" />
            <span className="hidden sm:inline">New Course</span>
          </Button>
        </Link>

        {/* Monthly Earnings Pill */}
        <Link
          href="/instructor/earnings"
          className="hidden md:flex items-center gap-2 px-3 py-1.5 rounded-xl bg-secondary/80 hover:bg-secondary border border-border text-xs transition-colors"
          title="View Earnings & Payouts"
        >
          <Coins className="w-3.5 h-3.5 text-primary" />
          <span className="text-muted-foreground font-medium">This Month:</span>
          <span className="font-bold text-foreground">ETB 38,400</span>
          <span className="text-[10px] text-emerald-700 bg-emerald-50 px-1.5 py-0.2 rounded font-semibold flex items-center gap-0.5">
            <TrendingUp className="w-2.5 h-2.5" />
            +18%
          </span>
        </Link>

        {/* Student Q&A Bell */}
        <Link
          href="/instructor/qa"
          className="p-2 rounded-xl text-muted-foreground hover:text-foreground hover:bg-secondary border border-transparent hover:border-border transition-colors relative"
          title="Unanswered Student Questions (3)"
          aria-label="Student Q&A questions"
        >
          <MessageSquare className="w-4 h-4" />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-primary ring-2 ring-card" />
        </Link>

        <div className="h-6 w-[1px] bg-border mx-1 hidden sm:block" />

        {/* Instructor User Profile Dropdown */}
        <InstructorUserDropdown />
      </div>
    </header>
  );
}
