import { create } from "zustand";

interface CartState {
  numberOfCartItems: number;
  updateCartCount: (count: number) => void;

  totalCartPrice: number;
  setTotalCartPrice: (price: number) => void;
}

export const useCartStore = create<CartState>((set) => ({
  numberOfCartItems: 0,

  totalCartPrice: 0,
  setTotalCartPrice: (price) => set({ totalCartPrice: price }),

  updateCartCount: (count) => {
    set({ numberOfCartItems: count });
  },
}));
