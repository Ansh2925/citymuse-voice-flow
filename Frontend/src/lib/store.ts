import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { api } from './api';
import { User, AuthResponse } from './types';

interface AuthState {
    token: string | null;
    user: User | null;
    isAuthenticated: boolean;
    isLoading: boolean;
    error: string | null;
    login: (email: string, password: string) => Promise<void>;
    setUser: (user: User | null) => void;
    logout: () => Promise<void>;
    clearError: () => void;
}

export const useAuthStore = create<AuthState>()(
    persist(
        (set) => ({
            token: null,
            user: null,
            isAuthenticated: false,
            isLoading: false,
            error: null,
            login: async (email: string, password: string) => {
                try {
                    set({ isLoading: true, error: null });
                    const response = await api.auth.login({ email, password });
                    localStorage.setItem('token', response.token);
                    set({ 
                        token: response.token, 
                        user: response.user,
                        isAuthenticated: true,
                        isLoading: false
                    });
                } catch (err) {
                    set({ 
                        error: err instanceof Error ? err.message : 'Failed to login',
                        isLoading: false 
                    });
                    throw err;
                }
            },
            setUser: (user) => set({ user }),
            logout: async () => {
                try {
                    set({ isLoading: true, error: null });
                    await api.auth.logout();
                    localStorage.removeItem('token');
                    set({ 
                        token: null, 
                        user: null, 
                        isAuthenticated: false,
                        isLoading: false 
                    });
                } catch (err) {
                    set({ 
                        error: err instanceof Error ? err.message : 'Failed to logout',
                        isLoading: false 
                    });
                    throw err;
                }
            },
            clearError: () => set({ error: null })
        }),
        {
            name: 'auth-storage',
            partialize: (state) => ({
                token: state.token,
                user: state.user,
                isAuthenticated: state.isAuthenticated
            })
        }
    )
);

type Mood = 'happy' | 'calm' | 'adventurous' | 'curious' | null;

interface UIState {
    isNavOpen: boolean;
    currentMood: Mood;
    setNavOpen: (isOpen: boolean) => void;
    setCurrentMood: (mood: Mood) => void;
    toggleNav: () => void;
}

export const useUIStore = create<UIState>((set) => ({
    isNavOpen: false,
    currentMood: null,
    toggleNav: () => set((state) => ({ isNavOpen: !state.isNavOpen })),
    setNavOpen: (isOpen) => set({ isNavOpen: isOpen }),
    setCurrentMood: (mood) => set({ currentMood: mood }),
}));
