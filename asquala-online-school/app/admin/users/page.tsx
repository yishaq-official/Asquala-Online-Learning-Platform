"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  ChevronLeft,
  Users,
  ShieldCheck,
  UserCheck,
  DownloadCloud,
} from "lucide-react";
import { UserStatsBar } from "@/components/admin/users/user-stats-bar";
import { UserDirectoryTable } from "@/components/admin/users/user-directory-table";
import { UserDetailsModal } from "@/components/admin/users/user-details-modal";
import { PlatformUser } from "@/types/admin";

export default function AdminUsersPage() {
  const [selectedUser, setSelectedUser] = useState<PlatformUser | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isExporting, setIsExporting] = useState(false);

  const handleSelectUser = (user: PlatformUser) => {
    setSelectedUser(user);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedUser(null);
  };

  const handleExportRoster = () => {
    setIsExporting(true);
    setTimeout(() => {
      setIsExporting(false);
      alert("Institutional User Roster exported successfully (CSV & PDF formats).");
    }, 600);
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-12">
      {/* Top Header & Breadcrumb */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold text-muted-foreground mb-1.5">
            <Link
              href="/admin/dashboard"
              className="flex items-center gap-1 hover:text-foreground transition-colors"
            >
              <ChevronLeft className="w-3.5 h-3.5" />
              <span>Dashboard</span>
            </Link>
            <span>•</span>
            <span className="text-foreground">User Management & RBAC</span>
          </div>

          <div className="flex items-center gap-3">
            <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-foreground">
              User Directory & Access Control (RBAC)
            </h1>
            <span className="hidden sm:inline-flex items-center gap-1.5 text-[11px] font-bold px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-950 border border-emerald-200">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-600" />
              8,940 Total Accounts
            </span>
          </div>
          <p className="text-xs text-muted-foreground mt-0.5">
            Manage student registrations, accredited faculty, and board governance administrators
          </p>
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-2.5 self-start sm:self-auto">
          <button
            onClick={handleExportRoster}
            disabled={isExporting}
            className="flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-bold bg-card border border-border text-foreground hover:bg-muted shadow-2xs transition-all"
          >
            <DownloadCloud className="w-3.5 h-3.5 text-emerald-800" />
            <span>{isExporting ? "Exporting..." : "Export User Roster"}</span>
          </button>
        </div>
      </div>

      {/* 4 Summary Stat Cards */}
      <UserStatsBar />

      {/* Registered Accounts Table */}
      <UserDirectoryTable onSelectUser={handleSelectUser} />

      {/* User Inspection Modal */}
      <UserDetailsModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        user={selectedUser}
      />
    </div>
  );
}
