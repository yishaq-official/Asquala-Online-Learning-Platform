"use client";

import React from "react";
import { usePathname } from "next/navigation";
import { AdminSidebar } from "@/components/admin/layout/admin-sidebar";
import { AdminHeader } from "@/components/admin/layout/admin-header";
import { AdminMobileNav } from "@/components/admin/layout/admin-mobile-nav";

export default function AdminRootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  // Isolated routes that should not render the administrative sidebar/header shell
  const isStandalone = pathname === "/admin/login";

  if (isStandalone) {
    return <>{children}</>;
  }

  return (
    <div className="min-h-screen bg-background flex flex-row">
      {/* Desktop Administrative Sidebar */}
      <AdminSidebar />

      {/* Main Governance Viewport */}
      <div className="flex-1 flex flex-col min-w-0">
        <AdminHeader />
        <main className="flex-1 p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto w-full">
          {children}
        </main>
      </div>

      {/* Mobile Slide-Over Drawer */}
      <AdminMobileNav />
    </div>
  );
}
