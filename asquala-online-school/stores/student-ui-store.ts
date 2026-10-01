import { create } from "zustand";

interface StudentUiState {
  // Desktop Sidebar
  isSidebarCollapsed: boolean;
  toggleSidebar: () => void;
  setSidebarCollapsed: (collapsed: boolean) => void;

  // Mobile Navigation Drawer
  isMobileNavOpen: boolean;
  setMobileNavOpen: (open: boolean) => void;

  // Classroom Player Curriculum Drawer
  isCurriculumDrawerOpen: boolean;
  toggleCurriculumDrawer: () => void;
  setCurriculumDrawerOpen: (open: boolean) => void;

  // Global Search Modal / Spotlight
  isSearchModalOpen: boolean;
  setSearchModalOpen: (open: boolean) => void;
  activeSearchQuery: string;
  setActiveSearchQuery: (query: string) => void;

  // Reset UI State
  resetUiState: () => void;
}

export const useStudentUiStore = create<StudentUiState>((set) => ({
  // Defaults
  isSidebarCollapsed: false,
  isMobileNavOpen: false,
  isCurriculumDrawerOpen: true,
  isSearchModalOpen: false,
  activeSearchQuery: "",

  // Actions
  toggleSidebar: () =>
    set((state) => ({ isSidebarCollapsed: !state.isSidebarCollapsed })),

  setSidebarCollapsed: (collapsed) =>
    set({ isSidebarCollapsed: collapsed }),

  setMobileNavOpen: (open) =>
    set({ isMobileNavOpen: open }),

  toggleCurriculumDrawer: () =>
    set((state) => ({ isCurriculumDrawerOpen: !state.isCurriculumDrawerOpen })),

  setCurriculumDrawerOpen: (open) =>
    set({ isCurriculumDrawerOpen: open }),

  setSearchModalOpen: (open) =>
    set({ isSearchModalOpen: open }),

  setActiveSearchQuery: (query) =>
    set({ activeSearchQuery: query }),

  resetUiState: () =>
    set({
      isSidebarCollapsed: false,
      isMobileNavOpen: false,
      isCurriculumDrawerOpen: true,
      isSearchModalOpen: false,
      activeSearchQuery: "",
    }),
}));
