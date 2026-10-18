"use client";

import { create } from "zustand";
import {
  AdminAuditor,
  AdminAuditCounts,
  TeacherDossier,
  AccreditationApplicationStatus,
  CourseAuditDetail,
  CoursePublicationStatus,
  PayoutTransaction,
  PlatformUser,
  PlatformUserRole,
  PlatformUserStatus,
} from "@/types/admin";
import {
  INITIAL_TEACHER_DOSSIERS,
  INITIAL_COURSE_AUDITS,
  INITIAL_PAYOUT_TRANSACTIONS,
  INITIAL_PLATFORM_USERS,
} from "@/lib/mock-admin-data";

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
  courseAudits: Record<string, CourseAuditDetail>;

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
  recordCoursePublicationRuling: (
    courseId: string,
    ruling: CoursePublicationStatus,
    notes: string
  ) => void;
  payoutTransactions: PayoutTransaction[];
  settlePayoutTransaction: (
    payoutId: string,
    transactionRefId: string,
    notes?: string
  ) => void;
  registeredUsers: PlatformUser[];
  toggleUserSuspension: (userId: string) => void;
  updateUserRole: (userId: string, newRole: PlatformUserRole) => void;
}

export const useAdminUiStore = create<AdminUiState>((set) => ({
  isSidebarCollapsed: false,
  isMobileNavOpen: false,
  activeAuditor: DEFAULT_AUDITOR,
  auditCounts: {
    pendingAccreditations: 3, // app-001, app-002, app-003
    pendingCourseReviews: 3,  // crs-aud-001, crs-aud-002, crs-aud-003
    pendingPayoutSettlements: 3, // pay-001, pay-002, pay-003
    flaggedDisputes: 1,
  },
  teacherDossiers: INITIAL_TEACHER_DOSSIERS,
  courseAudits: INITIAL_COURSE_AUDITS,
  payoutTransactions: INITIAL_PAYOUT_TRANSACTIONS,
  registeredUsers: INITIAL_PLATFORM_USERS,

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

  recordCoursePublicationRuling: (courseId, ruling, notes) =>
    set((state) => {
      const existing = state.courseAudits[courseId];
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

      const updatedCourse: CourseAuditDetail = {
        ...existing,
        status: ruling,
        statusNote: notes,
        boardRulingHistory: updatedHistory,
      };

      let pendingDelta = 0;
      const wasPending =
        previousStatus === "pending_review" ||
        previousStatus === "in_audit" ||
        previousStatus === "revision_requested";
      const isNowResolved = ruling === "approved" || ruling === "rejected";

      if (wasPending && isNowResolved) {
        pendingDelta = -1;
      }

      return {
        courseAudits: {
          ...state.courseAudits,
          [courseId]: updatedCourse,
        },
        auditCounts: {
          ...state.auditCounts,
          pendingCourseReviews: Math.max(
            0,
            state.auditCounts.pendingCourseReviews + pendingDelta
          ),
        },
      };
    }),

  settlePayoutTransaction: (payoutId, transactionRefId, notes) =>
    set((state) => {
      const existing = state.payoutTransactions.find((p) => p.id === payoutId);
      if (!existing) return state;

      const wasPending = existing.status === "pending";

      const updatedTransactions = state.payoutTransactions.map((p) => {
        if (p.id === payoutId) {
          return {
            ...p,
            status: "settled" as const,
            settledAt: "Just now",
            settledBy: state.activeAuditor.name,
            transactionRefId,
            notes: notes || p.notes,
          };
        }
        return p;
      });

      return {
        payoutTransactions: updatedTransactions,
        auditCounts: {
          ...state.auditCounts,
          pendingPayoutSettlements: wasPending
            ? Math.max(0, state.auditCounts.pendingPayoutSettlements - 1)
            : state.auditCounts.pendingPayoutSettlements,
        },
      };
    }),

  toggleUserSuspension: (userId) =>
    set((state) => {
      const updatedUsers = state.registeredUsers.map((user) => {
        if (user.id === userId) {
          const nextStatus: PlatformUserStatus =
            user.status === "suspended" ? "active" : "suspended";
          return {
            ...user,
            status: nextStatus,
          };
        }
        return user;
      });

      return {
        registeredUsers: updatedUsers,
      };
    }),

  updateUserRole: (userId, newRole) =>
    set((state) => {
      const updatedUsers = state.registeredUsers.map((user) => {
        if (user.id === userId) {
          return {
            ...user,
            role: newRole,
          };
        }
        return user;
      });

      return {
        registeredUsers: updatedUsers,
      };
    }),
}));
