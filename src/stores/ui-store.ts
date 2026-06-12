import { create } from 'zustand';

interface UIState {
  isSidebarOpen: boolean;
  isMobileNavOpen: boolean;
  toggleSidebar: () => void;
  toggleMobileNav: () => void;
  setSidebarOpen: (open: boolean) => void;
  setMobileNavOpen: (open: boolean) => void;
}

export const useUIStore = create<UIState>()((set) => ({
  isSidebarOpen: true,
  isMobileNavOpen: false,
  toggleSidebar: () => set((state) => ({ isSidebarOpen: !state.isSidebarOpen })),
  toggleMobileNav: () => set((state) => ({ isMobileNavOpen: !state.isMobileNavOpen })),
  setSidebarOpen: (open) => set({ isSidebarOpen: open }),
  setMobileNavOpen: (open) => set({ isMobileNavOpen: open }),
}));
