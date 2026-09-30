import { create } from "zustand";

export type UserRole = "student" | "instructor" | "admin";

interface AuthState {
  // UI Selection State
  selectedRole: UserRole;
  redirectAfterLogin: string | null;
  isLoading: boolean;

  // Actions
  setSelectedRole: (role: UserRole) => void;
  setRedirectAfterLogin: (url: string | null) => void;
  setIsLoading: (isLoading: boolean) => void;
  resetAuthState: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  selectedRole: "student",
  redirectAfterLogin: null,
  isLoading: false,

  setSelectedRole: (role) => set({ selectedRole: role }),
  setRedirectAfterLogin: (url) => set({ redirectAfterLogin: url }),
  setIsLoading: (isLoading) => set({ isLoading }),
  resetAuthState: () =>
    set({
      selectedRole: "student",
      redirectAfterLogin: null,
      isLoading: false,
    }),
}));
