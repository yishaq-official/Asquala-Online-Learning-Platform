"use client";

import { create } from "zustand";
import { AdminAuditor, AdminAuditCounts } from "@/types/admin";

export const DEFAULT_AUDITOR: AdminAuditor = {
  id: "aud-001",
  name: "Dr. Alazar Tadesse",
  email: "alazar.tadesse@asquala.edu",
  role: "academic_chair",
  roleTitle: "Academic Review Board Chair",
  department: "Higher Education Accreditation Committee",
  avatarUrl: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80",
  twoFactorEnabled: true,
  lastActive: "Just now",
};

interface AdminUiState {
  isSidebarCollapsed: boolean;
  isMobileNavOpen: boolean;
  activeAuditor: AdminAuditor;
  auditCounts: AdminAuditCounts;

  toggleSidebar: () => void;
  setSidebarCollapsed: (collapsed: boolean) => void;
  setMobileNavOpen: (open: boolean) => void;
  setActiveAuditor: (auditor: AdminAuditor) => void;
  updateAuditCounts: (counts: Partial<AdminAuditCounts>) => void;
}

export const useAdminUiStore = create<AdminUiState>((set) => ({
  isSidebarCollapsed: false,
  isMobileNavOpen: false,
  activeAuditor: DEFAULT_AUDITOR,
  auditCounts: {
    pendingAccreditations: 4,
    pendingCourseReviews: 3,
    pendingPayoutSettlements: 5,
    flaggedDisputes: 1,
  },

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
}));
