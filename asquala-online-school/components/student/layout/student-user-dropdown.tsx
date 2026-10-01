"use client";

import * as React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { authClient } from "@/lib/auth-client";
import { User, Settings, LogOut, Target, ChevronDown } from "lucide-react";

export function StudentUserDropdown() {
  const router = useRouter();
  const { data: session } = authClient.useSession();
  const [isOpen, setIsOpen] = React.useState(false);
  const [isSigningOut, setIsSigningOut] = React.useState(false);
  const menuRef = React.useRef<HTMLDivElement>(null);

  // Close dropdown on outside click
  React.useEffect(() => {
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
    setIsSigningOut(true);
    try {
      await authClient.signOut();
      router.push("/login");
      router.refresh();
    } catch (error) {
      console.error("Sign out failed:", error);
    } finally {
      setIsSigningOut(false);
      setIsOpen(false);
    }
  };

  const userName = session?.user?.name || "Student";
  const userEmail = session?.user?.email || "student@asquala.edu";
  const userInitials = userName
    .split(" ")
    .map((n) => n[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  return (
    <div className="relative" ref={menuRef}>
      {/* Trigger Button */}
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2.5 p-1.5 rounded-lg hover:bg-secondary border border-transparent hover:border-border transition-all cursor-pointer focus:outline-hidden focus:ring-2 focus:ring-ring"
        aria-expanded={isOpen}
        aria-haspopup="true"
      >
        <div className="w-8 h-8 rounded-full bg-primary-light text-primary font-bold text-xs flex items-center justify-center border border-primary-border shadow-2xs">
          {userInitials}
        </div>
        <div className="hidden md:flex flex-col text-left">
          <span className="text-xs font-semibold text-foreground leading-tight max-w-[120px] truncate">
            {userName}
          </span>
          <span className="text-[10px] text-muted-foreground font-medium">Student</span>
        </div>
        <ChevronDown
          className={`w-3.5 h-3.5 text-muted-foreground transition-transform duration-200 hidden md:block ${
            isOpen ? "rotate-180" : ""
          }`}
        />
      </button>

      {/* Popover Dropdown Menu */}
      {isOpen && (
        <div className="absolute right-0 mt-2 w-64 rounded-xl bg-card border border-border shadow-lg py-2 z-50 animate-in fade-in-0 zoom-in-95">
          {/* User Info Header */}
          <div className="px-4 py-3 border-b border-border">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-primary-light text-primary font-bold text-sm flex items-center justify-center border border-primary-border">
                {userInitials}
              </div>
              <div className="flex flex-col min-w-0">
                <span className="text-sm font-semibold text-foreground truncate">
                  {userName}
                </span>
                <span className="text-xs text-muted-foreground truncate">{userEmail}</span>
                <span className="inline-flex items-center gap-1 mt-1 text-[10px] font-semibold px-2 py-0.5 rounded-full bg-primary-light text-primary border border-primary-border w-fit">
                  Student Account
                </span>
              </div>
            </div>
          </div>

          {/* Navigation Links */}
          <div className="py-1">
            <Link
              href="/student/settings"
              onClick={() => setIsOpen(false)}
              className="flex items-center gap-2.5 px-4 py-2 text-sm text-foreground hover:bg-secondary hover:text-primary transition-colors"
            >
              <User className="w-4 h-4 text-muted-foreground" />
              <span>Personal Profile</span>
            </Link>
            <Link
              href="/student/settings"
              onClick={() => setIsOpen(false)}
              className="flex items-center gap-2.5 px-4 py-2 text-sm text-foreground hover:bg-secondary hover:text-primary transition-colors"
            >
              <Target className="w-4 h-4 text-muted-foreground" />
              <span>Learning Goals</span>
            </Link>
            <Link
              href="/student/settings"
              onClick={() => setIsOpen(false)}
              className="flex items-center gap-2.5 px-4 py-2 text-sm text-foreground hover:bg-secondary hover:text-primary transition-colors"
            >
              <Settings className="w-4 h-4 text-muted-foreground" />
              <span>Account Settings</span>
            </Link>
          </div>

          {/* Sign Out Button */}
          <div className="pt-1 mt-1 border-t border-border">
            <button
              type="button"
              onClick={handleSignOut}
              disabled={isSigningOut}
              className="w-full flex items-center gap-2.5 px-4 py-2 text-sm text-destructive hover:bg-destructive/10 transition-colors cursor-pointer disabled:opacity-50 font-medium"
            >
              <LogOut className="w-4 h-4" />
              <span>{isSigningOut ? "Signing out..." : "Sign Out"}</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
