"use client";

import { create } from "zustand";

interface InstructorUiState {
  isSidebarCollapsed: boolean;
  isMobileNavOpen: boolean;
  toggleSidebar: () => void;
  setSidebarCollapsed: (collapsed: boolean) => void;
  setMobileNavOpen: (open: boolean) => void;
}

export const useInstructorUiStore = create<InstructorUiState>((set) => ({
  isSidebarCollapsed: false,
  isMobileNavOpen: false,
  toggleSidebar: () =>
    set((state) => ({ isSidebarCollapsed: !state.isSidebarCollapsed })),
  setSidebarCollapsed: (collapsed: boolean) =>
    set({ isSidebarCollapsed: collapsed }),
  setMobileNavOpen: (open: boolean) => set({ isMobileNavOpen: open }),
}));
