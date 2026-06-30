import { create } from 'zustand';

type NavigationBlockStore = {
  isBlocked: boolean;
  onBlockedNavigate: (() => void) | null;
  setBlock: (blocked: boolean, onNavigate?: () => void) => void;
};

export const useNavigationBlockStore = create<NavigationBlockStore>((set) => ({
  isBlocked: false,
  onBlockedNavigate: null,
  setBlock: (blocked, onNavigate) =>
    set({
      isBlocked: blocked,
      onBlockedNavigate: onNavigate ?? null,
    }),
}));
