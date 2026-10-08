"use client";

import React, { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { authClient } from "@/lib/auth-client";
import {
  User,
  Settings,
  LogOut,
  GraduationCap,
  ShieldCheck,
  ChevronDown,
  Sparkles,
} from "lucide-react";

export function InstructorUserDropdown() {
  const router = useRouter();
  const { data: session } = authClient.useSession();
  const [isOpen, setIsOpen] = useState(false);
  const [isSigningOut, setIsSigningOut] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  const handleSignOut = async () => {
    try {
      setIsSigningOut(true);
      await authClient.signOut();
      router.push("/instructor/login");
      router.refresh();
    } catch {
      // Fallback
      router.push("/instructor/login");
    } finally {
      setIsSigningOut(false);
      setIsOpen(false);
    }
  };

  const userName = session?.user?.name || "Yishaq Abreham";
  const userEmail = session?.user?.email || "yishaq.abreham@asquala.edu";
  const initials = userName
    .split(" ")
    .map((p) => p[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  return (
    <div className="relative inline-block text-left" ref={menuRef}>
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 p-1.5 sm:px-2.5 sm:py-1.5 rounded-xl hover:bg-secondary/80 border border-transparent hover:border-border transition-all cursor-pointer focus:outline-hidden"
        aria-expanded={isOpen}
      >
        <div className="w-8 h-8 rounded-full bg-primary-light text-primary font-bold text-xs flex items-center justify-center border border-primary-border shrink-0 shadow-2xs">
          {initials}
        </div>

        <div className="hidden md:flex flex-col text-left">
          <span className="text-xs font-bold text-foreground leading-tight truncate max-w-[120px]">
            {userName}
          </span>
          <span className="text-[10px] text-primary font-semibold flex items-center gap-1">
            <span className="w-1.5 h-1.5 rounded-full bg-primary" />
            Verified Educator
          </span>
        </div>

        <ChevronDown
          className={`w-3.5 h-3.5 text-muted-foreground transition-transform duration-200 ${
            isOpen ? "rotate-180" : ""
          }`}
        />
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-64 rounded-2xl bg-card border border-border shadow-xl py-2 z-50 animate-in fade-in-0 zoom-in-95">
          {/* Header */}
          <div className="px-4 py-3 border-b border-border/80">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-full bg-primary-light text-primary font-bold text-sm flex items-center justify-center border border-primary-border">
                {initials}
              </div>
              <div className="flex flex-col min-w-0">
                <span className="text-xs font-bold text-foreground truncate">
                  {userName}
                </span>
                <span className="text-[11px] text-muted-foreground truncate">
                  {userEmail}
                </span>
                <span className="inline-flex items-center gap-1 mt-1 text-[10px] font-bold px-2 py-0.5 rounded-full bg-primary-light text-primary border border-primary-border w-fit">
                  <ShieldCheck className="w-3 h-3" />
                  Accredited Instructor
                </span>
              </div>
            </div>
          </div>

          {/* Navigation Items */}
          <div className="py-1.5 text-xs">
            <Link
              href="/instructor/settings"
              onClick={() => setIsOpen(false)}
              className="flex items-center gap-2.5 px-4 py-2 text-foreground hover:bg-secondary hover:text-primary transition-colors"
            >
              <Settings className="w-4 h-4 text-muted-foreground" />
              <span>Studio &amp; Profile Settings</span>
            </Link>

            <Link
              href="/instructor/application-status"
              onClick={() => setIsOpen(false)}
              className="flex items-center gap-2.5 px-4 py-2 text-foreground hover:bg-secondary hover:text-primary transition-colors"
            >
              <ShieldCheck className="w-4 h-4 text-muted-foreground" />
              <span>Accreditation Dossier</span>
            </Link>

            <div className="my-1 border-t border-border/80" />

            {/* Switch to Student Portal */}
            <Link
              href="/student/dashboard"
              onClick={() => setIsOpen(false)}
              className="flex items-center gap-2.5 px-4 py-2 text-primary hover:bg-primary-light font-medium transition-colors"
            >
              <GraduationCap className="w-4 h-4 text-primary" />
              <span>Switch to Student Portal</span>
            </Link>
          </div>

          {/* Sign Out */}
          <div className="pt-1 border-t border-border/80">
            <button
              type="button"
              onClick={handleSignOut}
              disabled={isSigningOut}
              className="w-full flex items-center gap-2.5 px-4 py-2 text-xs text-destructive hover:bg-destructive/10 transition-colors cursor-pointer disabled:opacity-50"
            >
              <LogOut className="w-4 h-4" />
              <span>{isSigningOut ? "Signing out..." : "Sign Out of Studio"}</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
