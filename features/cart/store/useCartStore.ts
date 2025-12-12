import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

export interface Product {
  id: string | number;
  name: string;
  price: number;
  image: string;
  brand: string;
  stock: number;
  images?: string[];
  colors?: { name: string; hex: string }[];
}

interface CartItem extends Product {
  quantity: number;
}

interface CartState {
  // Estado
  items: CartItem[];
  isOpen: boolean;

  // Acciones
  openCart: () => void;
  closeCart: () => void;
  toggleCart: () => void;
  addItem: (product: Product) => void;
  removeItem: (productId: string | number) => void;
  clearCart: () => void;

  // Computed (Getters)
  getTotalItems: () => number;
  getTotalPrice: () => number;
}

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],
      isOpen: false,

      openCart: () => set({ isOpen: true }),
      closeCart: () => set({ isOpen: false }),
      toggleCart: () => set((state) => ({ isOpen: !state.isOpen })),

      addItem: (product) => {
        const { items } = get();
        const existingItem = items.find((item) => item.id === product.id);

        if (existingItem) {
          set({
            items: items.map((item) =>
              item.id === product.id
                ? { ...item, quantity: item.quantity + 1 }
                : item
            ),
            isOpen: true,
          });
        } else {
          set({
            items: [...items, { ...product, quantity: 1 }],
            isOpen: true,
          });
        }
      },

      removeItem: (productId) => {
        set((state) => ({
          items: state.items.filter((item) => item.id !== productId),
        }));
      },

      clearCart: () => set({ items: [] }),

      getTotalItems: () => {
        const { items } = get();
        return items.reduce((total, item) => total + item.quantity, 0);
      },

      getTotalPrice: () => {
        const { items } = get();
        return items.reduce(
          (total, item) => total + item.price * item.quantity,
          0
        );
      },
    }),
    {
      name: "apex-cart-storage",
      storage: createJSONStorage(() => localStorage),
      skipHydration: true,
    }
  )
);
