"use client";

import React, { useState, useMemo } from "react";
import Image from "next/image";
import {
  Search,
  ShieldCheck,
  GraduationCap,
  Users,
  UserCheck,
  Lock,
  Unlock,
  Building,
  MoreVertical,
  ExternalLink,
  AlertTriangle,
  CheckCircle2,
  Clock,
} from "lucide-react";
import { PlatformUser, PlatformUserRole, PlatformUserStatus } from "@/types/admin";
import { useAdminUiStore } from "@/stores/admin-ui-store";

interface UserDirectoryTableProps {
  onSelectUser: (user: PlatformUser) => void;
}

export function UserDirectoryTable({ onSelectUser }: UserDirectoryTableProps) {
  const { registeredUsers, toggleUserSuspension } = useAdminUiStore();

  const [roleFilter, setRoleFilter] = useState<"all" | "student" | "instructor" | "admin">("all");
  const [statusFilter, setStatusFilter] = useState<"all" | PlatformUserStatus>("all");
  const [searchQuery, setSearchQuery] = useState("");

  const filteredUsers = useMemo(() => {
    return registeredUsers.filter((user) => {
      // Role filter
      if (roleFilter === "student" && user.role !== "student") return false;
      if (roleFilter === "instructor" && user.role !== "instructor") return false;
      if (
        roleFilter === "admin" &&
        user.role !== "super_admin" &&
        user.role !== "academic_auditor" &&
        user.role !== "treasury_auditor"
      ) {
        return false;
      }

      // Status filter
      if (statusFilter !== "all" && user.status !== statusFilter) return false;

      // Search query
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase();
        const matchesName = user.name.toLowerCase().includes(query);
        const matchesEmail = user.email.toLowerCase().includes(query);
        const matchesInstitution = user.institution?.toLowerCase().includes(query);
        const matchesDepartment = user.department?.toLowerCase().includes(query);
        if (!matchesName && !matchesEmail && !matchesInstitution && !matchesDepartment) {
          return false;
        }
      }

      return true;
    });
  }, [registeredUsers, roleFilter, statusFilter, searchQuery]);

  const studentCount = registeredUsers.filter((u) => u.role === "student").length;
  const instructorCount = registeredUsers.filter((u) => u.role === "instructor").length;
  const adminCount = registeredUsers.filter(
    (u) =>
      u.role === "super_admin" ||
      u.role === "academic_auditor" ||
      u.role === "treasury_auditor"
  ).length;

  const renderRoleBadge = (user: PlatformUser) => {
    switch (user.role) {
      case "super_admin":
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-emerald-900 text-white shadow-2xs">
            <UserCheck className="w-3 h-3 text-emerald-300" />
            Super Admin
          </span>
        );
      case "academic_auditor":
      case "treasury_auditor":
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-emerald-100 text-emerald-950 border border-emerald-300">
            <ShieldCheck className="w-3 h-3 text-emerald-800" />
            Academic Auditor
          </span>
        );
      case "instructor":
        return (
          <div className="flex flex-wrap items-center gap-1.5">
            <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-emerald-50 text-emerald-900 border border-emerald-200">
              Instructor
            </span>
            {user.isAccreditedTeacher ? (
              <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-100 text-emerald-950 border border-emerald-300">
                <ShieldCheck className="w-3 h-3 text-emerald-700" />
                Accredited
              </span>
            ) : (
              <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold bg-amber-50 text-amber-900 border border-amber-200">
                Pending Audit
              </span>
            )}
          </div>
        );
      case "student":
      default:
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-muted text-muted-foreground border border-border">
            <GraduationCap className="w-3 h-3" />
            Student
          </span>
        );
    }
  };

  const renderStatusBadge = (status: PlatformUserStatus) => {
    switch (status) {
      case "suspended":
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-rose-50 text-rose-900 border border-rose-200">
            <span className="w-1.5 h-1.5 rounded-full bg-rose-500" />
            Suspended
          </span>
        );
      case "pending_verification":
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-amber-50 text-amber-900 border border-amber-200">
            <span className="w-1.5 h-1.5 rounded-full bg-amber-500 animate-pulse" />
            Pending Verification
          </span>
        );
      case "active":
      default:
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-emerald-50 text-emerald-950 border border-emerald-200">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-600" />
            Active
          </span>
        );
    }
  };

  return (
    <div className="bg-card border border-border rounded-3xl shadow-2xs overflow-hidden">
      {/* Table Header & Controls */}
      <div className="p-5 sm:p-6 border-b border-border space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <h2 className="text-base font-bold text-foreground flex items-center gap-2">
              <Users className="w-4 h-4 text-emerald-800" />
              Platform Registered Accounts Roster
            </h2>
            <p className="text-xs text-muted-foreground">
              Monitor learners, accredited faculty, and governance auditors with instant role & access controls
            </p>
          </div>

          {/* Quick Status Filter Tabs */}
          <div className="flex items-center gap-1 p-1 rounded-xl bg-muted/50 border border-border self-start sm:self-auto">
            <button
              onClick={() => setStatusFilter("all")}
              className={`px-3 py-1 rounded-lg text-xs font-semibold transition-all ${
                statusFilter === "all"
                  ? "bg-card text-foreground shadow-2xs"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              All Statuses
            </button>
            <button
              onClick={() => setStatusFilter("active")}
              className={`px-3 py-1 rounded-lg text-xs font-semibold transition-all ${
                statusFilter === "active"
                  ? "bg-card text-emerald-900 shadow-2xs"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              Active
            </button>
            <button
              onClick={() => setStatusFilter("suspended")}
              className={`px-3 py-1 rounded-lg text-xs font-semibold transition-all ${
                statusFilter === "suspended"
                  ? "bg-card text-rose-900 shadow-2xs"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              Suspended
            </button>
          </div>
        </div>

        {/* Filter Tabs and Search Bar */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 pt-2">
          {/* Role Tabs */}
          <div className="flex items-center gap-2 flex-wrap">
            <button
              onClick={() => setRoleFilter("all")}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all ${
                roleFilter === "all"
                  ? "bg-emerald-50 text-emerald-950 border border-emerald-200"
                  : "text-muted-foreground hover:text-foreground hover:bg-muted"
              }`}
            >
              All Accounts ({registeredUsers.length})
            </button>

            <button
              onClick={() => setRoleFilter("student")}
              className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all ${
                roleFilter === "student"
                  ? "bg-emerald-50 text-emerald-950 border border-emerald-200"
                  : "text-muted-foreground hover:text-foreground hover:bg-muted"
              }`}
            >
              <GraduationCap className="w-3.5 h-3.5 text-emerald-800" />
              <span>Students</span>
              <span className="px-1.5 py-0.2 rounded-full text-[10px] bg-emerald-200/80 text-emerald-950">
                {studentCount}
              </span>
            </button>

            <button
              onClick={() => setRoleFilter("instructor")}
              className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all ${
                roleFilter === "instructor"
                  ? "bg-emerald-50 text-emerald-950 border border-emerald-200"
                  : "text-muted-foreground hover:text-foreground hover:bg-muted"
              }`}
            >
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-700" />
              <span>Instructors</span>
              <span className="px-1.5 py-0.2 rounded-full text-[10px] bg-emerald-200/80 text-emerald-950">
                {instructorCount}
              </span>
            </button>

            <button
              onClick={() => setRoleFilter("admin")}
              className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all ${
                roleFilter === "admin"
                  ? "bg-emerald-50 text-emerald-950 border border-emerald-200"
                  : "text-muted-foreground hover:text-foreground hover:bg-muted"
              }`}
            >
              <UserCheck className="w-3.5 h-3.5 text-emerald-800" />
              <span>Admins & Auditors</span>
              <span className="px-1.5 py-0.2 rounded-full text-[10px] bg-emerald-200/80 text-emerald-950">
                {adminCount}
              </span>
            </button>
          </div>

          {/* Search Input */}
          <div className="relative w-full sm:w-64">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search user or email..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-3 py-1.5 rounded-xl border border-border bg-background text-xs text-foreground placeholder:text-muted-foreground/60 focus:outline-hidden focus:ring-2 focus:ring-emerald-600 focus:border-emerald-600 transition-all"
            />
          </div>
        </div>
      </div>

      {/* Desktop Table View */}
      <div className="hidden md:block overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-border bg-muted/20 text-[11px] font-bold text-muted-foreground uppercase tracking-wider">
              <th className="py-3 px-6">User Identity</th>
              <th className="py-3 px-4">Role & Credentials</th>
              <th className="py-3 px-4">Account Status</th>
              <th className="py-3 px-4">Activity Metric</th>
              <th className="py-3 px-4">Registered Date</th>
              <th className="py-3 px-6 text-right">Security Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border text-xs">
            {filteredUsers.length === 0 ? (
              <tr>
                <td colSpan={6} className="py-12 text-center text-muted-foreground">
                  <div className="max-w-xs mx-auto space-y-2">
                    <p className="font-semibold text-foreground">No accounts found</p>
                    <p className="text-[11px]">
                      Try adjusting your role filter tabs, status toggle, or search query.
                    </p>
                  </div>
                </td>
              </tr>
            ) : (
              filteredUsers.map((user) => {
                const isSuspended = user.status === "suspended";

                return (
                  <tr
                    key={user.id}
                    className="hover:bg-muted/30 transition-colors group cursor-pointer"
                    onClick={() => onSelectUser(user)}
                  >
                    {/* User Identity */}
                    <td className="py-4 px-6">
                      <div className="flex items-center gap-3">
                        <div className="relative w-9 h-9 rounded-full overflow-hidden border border-border shrink-0">
                          <Image
                            src={user.avatarUrl}
                            alt={user.name}
                            fill
                            className="object-cover"
                          />
                        </div>
                        <div>
                          <p className="font-bold text-foreground group-hover:text-primary transition-colors">
                            {user.name}
                          </p>
                          <p className="text-[11px] text-muted-foreground font-mono">
                            {user.email}
                          </p>
                          {user.institution && (
                            <p className="text-[10px] text-muted-foreground/80 flex items-center gap-1 mt-0.5">
                              <Building className="w-2.5 h-2.5 text-emerald-800" />
                              {user.institution}
                            </p>
                          )}
                        </div>
                      </div>
                    </td>

                    {/* Role & Badges */}
                    <td className="py-4 px-4">{renderRoleBadge(user)}</td>

                    {/* Account Status */}
                    <td className="py-4 px-4">{renderStatusBadge(user.status)}</td>

                    {/* Activity Metric */}
                    <td className="py-4 px-4">
                      <p className="font-medium text-foreground">
                        {user.activityMetric}
                      </p>
                      <p className="text-[10px] text-muted-foreground">
                        Active {user.lastActive}
                      </p>
                    </td>

                    {/* Registered Date */}
                    <td className="py-4 px-4 text-[11px] text-muted-foreground">
                      {user.joinedAt}
                    </td>

                    {/* Action Button */}
                    <td
                      className="py-4 px-6 text-right"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <button
                        onClick={() => toggleUserSuspension(user.id)}
                        className={`inline-flex items-center gap-1.5 py-1.5 px-3 rounded-xl text-xs font-bold transition-all shadow-2xs ${
                          isSuspended
                            ? "bg-emerald-800 text-white hover:bg-emerald-900 border border-emerald-700"
                            : "bg-card border border-rose-200 text-rose-700 hover:bg-rose-50 hover:border-rose-300"
                        }`}
                      >
                        {isSuspended ? (
                          <>
                            <Unlock className="w-3 h-3" />
                            <span>Reactivate</span>
                          </>
                        ) : (
                          <>
                            <Lock className="w-3 h-3" />
                            <span>Suspend</span>
                          </>
                        )}
                      </button>
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>

      {/* Mobile Card View */}
      <div className="md:hidden divide-y divide-border">
        {filteredUsers.length === 0 ? (
          <div className="p-8 text-center text-muted-foreground text-xs">
            No matching accounts found.
          </div>
        ) : (
          filteredUsers.map((user) => {
            const isSuspended = user.status === "suspended";

            return (
              <div
                key={user.id}
                className="p-4 space-y-3 cursor-pointer hover:bg-muted/20"
                onClick={() => onSelectUser(user)}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <div className="relative w-8 h-8 rounded-full overflow-hidden border border-border">
                      <Image
                        src={user.avatarUrl}
                        alt={user.name}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div>
                      <p className="font-bold text-foreground text-xs">
                        {user.name}
                      </p>
                      <p className="text-[10px] text-muted-foreground font-mono">
                        {user.email}
                      </p>
                    </div>
                  </div>

                  {renderStatusBadge(user.status)}
                </div>

                <div className="flex items-center justify-between text-xs pt-1">
                  <div>{renderRoleBadge(user)}</div>
                  <span className="text-[10px] text-muted-foreground">
                    Joined {user.joinedAt}
                  </span>
                </div>

                <div className="text-[11px] bg-muted/40 p-2 rounded-xl border border-border text-foreground">
                  <span className="text-muted-foreground block text-[10px]">
                    Activity:
                  </span>
                  {user.activityMetric}
                </div>

                <div
                  className="pt-1 flex items-center justify-end"
                  onClick={(e) => e.stopPropagation()}
                >
                  <button
                    onClick={() => toggleUserSuspension(user.id)}
                    className={`w-full flex items-center justify-center gap-1.5 py-1.5 px-3 rounded-xl text-xs font-bold transition-all shadow-2xs ${
                      isSuspended
                        ? "bg-emerald-800 text-white hover:bg-emerald-900 border border-emerald-700"
                        : "bg-card border border-rose-200 text-rose-700 hover:bg-rose-50"
                    }`}
                  >
                    {isSuspended ? (
                      <>
                        <Unlock className="w-3.5 h-3.5" />
                        <span>Reactivate Account</span>
                      </>
                    ) : (
                      <>
                        <Lock className="w-3.5 h-3.5" />
                        <span>Suspend Access</span>
                      </>
                    )}
                  </button>
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}
