"use client";

import React from "react";
import Image from "next/image";
import {
  X,
  ShieldCheck,
  GraduationCap,
  Briefcase,
  Calendar,
  Mail,
  Phone,
  Building,
  AlertTriangle,
  CheckCircle2,
  Lock,
  Unlock,
} from "lucide-react";
import { PlatformUser } from "@/types/admin";
import { useAdminUiStore } from "@/stores/admin-ui-store";

interface UserDetailsModalProps {
  isOpen: boolean;
  onClose: () => void;
  user: PlatformUser | null;
}

export function UserDetailsModal({
  isOpen,
  onClose,
  user,
}: UserDetailsModalProps) {
  const { toggleUserSuspension } = useAdminUiStore();

  if (!isOpen || !user) return null;

  const isSuspended = user.status === "suspended";

  const handleToggleSuspension = () => {
    toggleUserSuspension(user.id);
  };

  const getRoleLabel = () => {
    switch (user.role) {
      case "super_admin":
        return "Super Administrator";
      case "academic_auditor":
        return "Academic Review Auditor";
      case "treasury_auditor":
        return "Treasury Clearance Auditor";
      case "instructor":
        return "Faculty Instructor";
      case "student":
      default:
        return "Enrolled Student";
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in duration-200"
      role="dialog"
      aria-modal="true"
      aria-labelledby="user-modal-title"
    >
      <div className="bg-card border border-border rounded-3xl w-full max-w-lg shadow-xl overflow-hidden animate-in zoom-in-95 duration-200">
        {/* Header */}
        <div className="p-5 sm:p-6 border-b border-border flex items-center justify-between bg-muted/30">
          <div className="flex items-center gap-3">
            <div className="relative w-12 h-12 rounded-full overflow-hidden border-2 border-emerald-500 shrink-0">
              <Image
                src={user.avatarUrl}
                alt={user.name}
                fill
                className="object-cover"
              />
            </div>
            <div>
              <h2
                id="user-modal-title"
                className="text-base font-bold text-foreground"
              >
                {user.name}
              </h2>
              <p className="text-xs text-muted-foreground flex items-center gap-1.5">
                <span>{getRoleLabel()}</span>
                {user.isAccreditedTeacher && (
                  <span className="inline-flex items-center gap-1 text-[10px] font-bold px-1.5 py-0.2 rounded-md bg-emerald-100 text-emerald-900 border border-emerald-200">
                    <ShieldCheck className="w-3 h-3 text-emerald-700" />
                    Accredited
                  </span>
                )}
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
            aria-label="Close modal"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Content */}
        <div className="p-5 sm:p-6 space-y-4">
          {/* Status banner */}
          <div
            className={`p-3.5 rounded-2xl border flex items-center justify-between ${
              isSuspended
                ? "bg-rose-50 border-rose-200 text-rose-950"
                : "bg-emerald-50 border-emerald-200 text-emerald-950"
            }`}
          >
            <div className="flex items-center gap-2 text-xs">
              {isSuspended ? (
                <AlertTriangle className="w-4 h-4 text-rose-600 shrink-0" />
              ) : (
                <CheckCircle2 className="w-4 h-4 text-emerald-700 shrink-0" />
              )}
              <span className="font-semibold">
                Account Status:{" "}
                <strong className="uppercase">
                  {isSuspended ? "Suspended (Locked)" : "Active (Good Standing)"}
                </strong>
              </span>
            </div>

            <button
              onClick={handleToggleSuspension}
              className={`text-xs font-bold px-3 py-1.5 rounded-xl border transition-all ${
                isSuspended
                  ? "bg-emerald-800 text-white hover:bg-emerald-900 border-emerald-700 shadow-2xs"
                  : "bg-card text-rose-700 hover:bg-rose-100 border-rose-300 shadow-2xs"
              }`}
            >
              {isSuspended ? (
                <span className="flex items-center gap-1.5">
                  <Unlock className="w-3.5 h-3.5" />
                  Reactivate Account
                </span>
              ) : (
                <span className="flex items-center gap-1.5">
                  <Lock className="w-3.5 h-3.5" />
                  Suspend Access
                </span>
              )}
            </button>
          </div>

          {/* User Details Grid */}
          <div className="bg-muted/30 border border-border rounded-2xl p-4 space-y-3 text-xs">
            <div className="flex items-center gap-2 text-muted-foreground">
              <Mail className="w-3.5 h-3.5 text-emerald-800" />
              <span className="text-foreground font-mono">{user.email}</span>
            </div>

            {user.phone && (
              <div className="flex items-center gap-2 text-muted-foreground">
                <Phone className="w-3.5 h-3.5 text-emerald-800" />
                <span className="text-foreground font-mono">{user.phone}</span>
              </div>
            )}

            {user.institution && (
              <div className="flex items-center gap-2 text-muted-foreground">
                <Building className="w-3.5 h-3.5 text-emerald-800" />
                <span className="text-foreground">{user.institution}</span>
              </div>
            )}

            {user.department && (
              <div className="flex items-center gap-2 text-muted-foreground">
                <Briefcase className="w-3.5 h-3.5 text-emerald-800" />
                <span className="text-foreground">{user.department}</span>
              </div>
            )}

            <div className="flex items-center gap-2 text-muted-foreground">
              <Calendar className="w-3.5 h-3.5 text-emerald-800" />
              <span>
                Registered on {user.joinedAt} • Active {user.lastActive}
              </span>
            </div>
          </div>

          {/* Activity Metric Card */}
          <div className="bg-card border border-border rounded-2xl p-4 space-y-1">
            <span className="text-[11px] font-bold text-muted-foreground uppercase tracking-wider block">
              Platform Activity Summary
            </span>
            <p className="text-sm font-bold text-foreground">
              {user.activityMetric}
            </p>
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-border flex justify-end bg-muted/20">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-xl text-xs font-bold bg-muted hover:bg-muted/80 text-foreground transition-colors"
          >
            Close Details
          </button>
        </div>
      </div>
    </div>
  );
}
