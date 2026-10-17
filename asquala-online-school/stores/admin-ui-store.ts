"use client";

import { create } from "zustand";
import {
  AdminAuditor,
  AdminAuditCounts,
  TeacherDossier,
  AccreditationApplicationStatus,
} from "@/types/admin";
import { INITIAL_TEACHER_DOSSIERS } from "@/lib/mock-admin-data";

export const DEFAULT_AUDITOR: AdminAuditor = {
  id: "aud-001",
  name: "Dr. Alazar Tadesse",
  email: "alazar.tadesse@asquala.edu",
  role: "academic_chair",
  roleTitle: "Academic Review Board Chair",
  department: "Higher Education Accreditation Committee",
  avatarUrl:
    "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80",
  twoFactorEnabled: true,
  lastActive: "Just now",
};

interface AdminUiState {
  isSidebarCollapsed: boolean;
  isMobileNavOpen: boolean;
  activeAuditor: AdminAuditor;
  auditCounts: AdminAuditCounts;
  teacherDossiers: Record<string, TeacherDossier>;

  toggleSidebar: () => void;
  setSidebarCollapsed: (collapsed: boolean) => void;
  setMobileNavOpen: (open: boolean) => void;
  setActiveAuditor: (auditor: AdminAuditor) => void;
  updateAuditCounts: (counts: Partial<AdminAuditCounts>) => void;
  recordBoardRuling: (
    dossierId: string,
    ruling: AccreditationApplicationStatus,
    notes: string
  ) => void;
}

export const useAdminUiStore = create<AdminUiState>((set) => ({
  isSidebarCollapsed: false,
  isMobileNavOpen: false,
  activeAuditor: DEFAULT_AUDITOR,
  auditCounts: {
    pendingAccreditations: 3, // app-001, app-002, app-003
    pendingCourseReviews: 3,
    pendingPayoutSettlements: 5,
    flaggedDisputes: 1,
  },
  teacherDossiers: INITIAL_TEACHER_DOSSIERS,

  toggleSidebar: () =>
    set((state) => ({ isSidebarCollapsed: !state.isSidebarCollapsed })),
  setSidebarCollapsed: (collapsed: boolean) =>
    set({ isSidebarCollapsed: collapsed }),
  setMobileNavOpen: (open: boolean) => set({ isMobileNavOpen: open }),
  setActiveAuditor: (auditor: AdminAuditor) => set({ activeAuditor: auditor }),
  updateAuditCounts: (counts) =>
    set((state) => ({
      auditCounts: { ...state.auditCounts, ...counts },
    })),

  recordBoardRuling: (dossierId, ruling, notes) =>
    set((state) => {
      const existing = state.teacherDossiers[dossierId];
      if (!existing) return state;

      const previousStatus = existing.status;
      const updatedHistory = [
        ...(existing.boardRulingHistory || []),
        {
          date: "Just now",
          ruling,
          auditor: state.activeAuditor.name,
          notes,
        },
      ];

      const updatedDossier: TeacherDossier = {
        ...existing,
        status: ruling,
        statusNote: notes,
        boardRulingHistory: updatedHistory,
      };

      // Recalculate pending count if needed
      let pendingDelta = 0;
      const wasPending = previousStatus === "pending" || previousStatus === "action_required";
      const isNowResolved = ruling === "approved" || ruling === "rejected";

      if (wasPending && isNowResolved) {
        pendingDelta = -1;
      }

      return {
        teacherDossiers: {
          ...state.teacherDossiers,
          [dossierId]: updatedDossier,
        },
        auditCounts: {
          ...state.auditCounts,
          pendingAccreditations: Math.max(
            0,
            state.auditCounts.pendingAccreditations + pendingDelta
          ),
        },
      };
    }),
}));
