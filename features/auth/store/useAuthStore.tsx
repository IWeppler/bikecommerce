import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

// Definimos la estructura básica de tu Usuario
export interface User {
  id: string;
  name: string;
  email: string;
  role?: 'user' | 'admin';
}

interface AuthState {
  // Estado
  user: User | null;
  isAuthenticated: boolean;
  token: string | null; // Útil si conectas con un backend real luego

  // Acciones
  login: (user: User, token?: string) => void;
  logout: () => void;
  updateUser: (updates: Partial<User>) => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      isAuthenticated: false,
      token: null,

      login: (user, token = 'dummy-token') => {
        set({ user, isAuthenticated: true, token });
      },

      logout: () => {
        set({ user: null, isAuthenticated: false, token: null });
        // Limpiar carrito al salir
        // useCartStore.getState().clearCart(); 
      },

      updateUser: (updates) => {
        set((state) => ({
          user: state.user ? { ...state.user, ...updates } : null,
        }));
      },
    }),
    {
      name: 'apex-auth-storage', // Nombre único en localStorage
      storage: createJSONStorage(() => localStorage),
      skipHydration: true,
    }
  )
);