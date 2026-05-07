import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { Product } from "./products";

type CartItem = { product: Product; quantity: number; size?: string; color?: string };

type CartState = {
  items: CartItem[];
  open: boolean;
  setOpen: (v: boolean) => void;
  add: (p: Product, opts?: { size?: string; color?: string; quantity?: number }) => void;
  remove: (slug: string) => void;
  setQty: (slug: string, qty: number) => void;
  clear: () => void;
  total: () => number;
  count: () => number;
};

export const useCart = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],
      open: false,
      setOpen: (open) => set({ open }),
      add: (product, opts) => {
        const items = get().items.slice();
        const idx = items.findIndex((i) => i.product.slug === product.slug);
        if (idx >= 0) {
          items[idx].quantity += opts?.quantity ?? 1;
        } else {
          items.push({ product, quantity: opts?.quantity ?? 1, size: opts?.size, color: opts?.color });
        }
        set({ items, open: true });
      },
      remove: (slug) => set({ items: get().items.filter((i) => i.product.slug !== slug) }),
      setQty: (slug, qty) =>
        set({
          items: get().items.map((i) => (i.product.slug === slug ? { ...i, quantity: Math.max(1, qty) } : i)),
        }),
      clear: () => set({ items: [] }),
      total: () => get().items.reduce((s, i) => s + i.product.price * i.quantity, 0),
      count: () => get().items.reduce((s, i) => s + i.quantity, 0),
    }),
    { name: "dilip-cart" },
  ),
);

type WishState = {
  slugs: string[];
  toggle: (slug: string) => void;
  has: (slug: string) => boolean;
  clear: () => void;
};

export const useWishlist = create<WishState>()(
  persist(
    (set, get) => ({
      slugs: [],
      toggle: (slug) =>
        set({ slugs: get().slugs.includes(slug) ? get().slugs.filter((s) => s !== slug) : [...get().slugs, slug] }),
      has: (slug) => get().slugs.includes(slug),
      clear: () => set({ slugs: [] }),
    }),
    { name: "dilip-wishlist" },
  ),
);
