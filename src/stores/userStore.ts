import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import type { User } from '../Types/types';

interface UserState {
  currentUser: User | null;
  isAuthenticated: boolean;
  login: (user: User) => void;
  logout: () => void;
  addPoints: (points: number) => void;
}

const useUserStore = create<UserState>()(
  persist(
    (set, get) => ({
      currentUser: null,
      isAuthenticated: false,
      login: (user) => set({ currentUser: user, isAuthenticated: true }),
      logout: () => { localStorage.removeItem('token'); set({ currentUser: null, isAuthenticated: false }); },
      addPoints: (points) => {
        const u = get().currentUser; if (!u) return;
        set({ currentUser: { ...u, points: u.points + points } });
      }
    }),
    { name: 'nku-user', storage: createJSONStorage(() => localStorage) }
  )
);

export default useUserStore;
