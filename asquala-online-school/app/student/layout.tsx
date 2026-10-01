import type { Metadata } from "next";
import * as React from "react";
import { StudentSidebar } from "@/components/student/layout/student-sidebar";
import { StudentHeader } from "@/components/student/layout/student-header";
import { StudentMobileNav } from "@/components/student/layout/student-mobile-nav";

export const metadata: Metadata = {
  title: "Student Learning Portal | Asquala",
  description:
    "Resume your active lessons, track your study streak, explore new courses, and manage certificates on Asquala Online School.",
};

export default function StudentLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-background text-foreground flex flex-row antialiased">
      {/* Persistent Desktop Sidebar */}
      <StudentSidebar />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0 min-h-screen">
        {/* Persistent Top Header */}
        <StudentHeader />

        {/* Page View Container */}
        <main className="flex-1 w-full max-w-7xl mx-auto p-4 sm:p-6 lg:p-8">
          {children}
        </main>
      </div>

      {/* Mobile Slide-Over Navigation */}
      <StudentMobileNav />
    </div>
  );
}
