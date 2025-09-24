import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

interface ThemeState {
    theme: 'light' | 'dark';
    toggleTheme: () => void;
    setTheme: (theme: 'light' | 'dark') => void;
}

export const useThemeStore = create<ThemeState>()(
    persist(
        (set, get) => ({
            theme: 'light',
            toggleTheme: () => set({ theme: get().theme === 'light' ? 'dark' : 'light' }),
            setTheme: (theme) => set({ theme }),
        }),
        {
            name: 'nku-theme', // localStorage 中的 key
            storage: createJSONStorage(() => localStorage),
        }
    )
);