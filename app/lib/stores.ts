import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { Cart, Product } from "~/types";

// Cart Store
interface CartItem {
  product: Product;
  quantity: number;
}

interface CartState {
  items: CartItem[];
  addItem: (product: Product, quantity?: number) => void;
  removeItem: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  getTotal: () => number;
}

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],
      addItem: (product, quantity = 1) =>
        set((state) => {
          const existingItem = state.items.find(
            (item) => item.product._id === product._id
          );
          if (existingItem) {
            return {
              items: state.items.map((item) =>
                item.product._id === product._id
                  ? { ...item, quantity: item.quantity + quantity }
                  : item
              ),
            };
          }
          return { items: [...state.items, { product, quantity }] };
        }),
      removeItem: (productId) =>
        set((state) => ({
          items: state.items.filter((item) => item.product._id !== productId),
        })),
      updateQuantity: (productId, quantity) =>
        set((state) => ({
          items: state.items.map((item) =>
            item.product._id === productId ? { ...item, quantity } : item
          ),
        })),
      clearCart: () => set({ items: [] }),
      getTotal: () =>
        get().items.reduce(
          (total, item) => total + item.product.price * item.quantity,
          0
        ),
    }),
    {
      name: "pickle-cart",
      storage: createJSONStorage(() => localStorage),
    }
  )
);

// Wishlist Store
interface WishlistState {
  items: Product[];
  addItem: (product: Product) => void;
  removeItem: (productId: string) => void;
  clearWishlist: () => void;
}

export const useWishlistStore = create<WishlistState>()(
  persist(
    (set) => ({
      items: [],
      addItem: (product) =>
        set((state) => ({
          items: state.items.some((item) => item._id === product._id)
            ? state.items
            : [...state.items, product],
        })),
      removeItem: (productId) =>
        set((state) => ({
          items: state.items.filter((item) => item._id !== productId),
        })),
      clearWishlist: () => set({ items: [] }),
    }),
    {
      name: "pickle-wishlist",
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({ items: state.items }), // Only persist items
    }
  )
);

// UI Store
interface UIState {
  isCartOpen: boolean;
  isFilterOpen: boolean;
  filters: {
    flavor?: string;
    spiceLevel?: string;
    vegNonVeg?: string;
  };
  toggleCart: () => void;
  toggleFilter: () => void;
  setFilters: (filters: Partial<UIState["filters"]>) => void;
}

export const useUIStore = create<UIState>()((set) => ({
  isCartOpen: false,
  isFilterOpen: false,
  filters: {},
  toggleCart: () => set((state) => ({ isCartOpen: !state.isCartOpen })),
  toggleFilter: () => set((state) => ({ isFilterOpen: !state.isFilterOpen })),
  setFilters: (filters) =>
    set((state) => ({ filters: { ...state.filters, ...filters } })),
}));
