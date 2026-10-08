"use client";

import React from "react";
import { usePathname } from "next/navigation";
import { InstructorSidebar } from "@/components/instructor/layout/instructor-sidebar";
import { InstructorHeader } from "@/components/instructor/layout/instructor-header";
import { InstructorMobileNav } from "@/components/instructor/layout/instructor-mobile-nav";

export default function InstructorRootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  // Standalone routes that should not render the creator sidebar shell
  const isStandalone =
    pathname === "/instructor/login" ||
    pathname === "/instructor/application-status" ||
    pathname === "/instructor/apply" ||
    pathname.startsWith("/instructor/apply/");

  if (isStandalone) {
    return <>{children}</>;
  }

  return (
    <div className="min-h-screen bg-background flex flex-row">
      {/* Desktop Creator Sidebar */}
      <InstructorSidebar />

      {/* Main Studio Viewport */}
      <div className="flex-1 flex flex-col min-w-0">
        <InstructorHeader />
        <main className="flex-1 p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto w-full">
          {children}
        </main>
      </div>

      {/* Mobile Slide-Over Drawer */}
      <InstructorMobileNav />
    </div>
  );
}
