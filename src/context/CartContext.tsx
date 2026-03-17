/* Simple client-side cart state with localStorage persistence */
"use client";

import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { Product } from "@/types";

export type CartItem = Product & { quantity: number };

type CartContextValue = {
  items: CartItem[];
  itemCount: number;
  addItem: (product: Product) => void;
  removeItem: (productId: string) => void;
  clearCart: () => void;
};

const CartContext = createContext<CartContextValue | undefined>(undefined);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [toast, setToast] = useState<string | null>(null);

  // Load persisted cart on mount
  useEffect(() => {
    if (typeof window === "undefined") return;
    const stored = window.localStorage.getItem("ruban-cart");
    if (stored) {
      try {
        setItems(JSON.parse(stored));
      } catch {
        // ignore parse errors
      }
    }
  }, []);

  // Persist cart when it changes
  useEffect(() => {
    if (typeof window === "undefined") return;
    window.localStorage.setItem("ruban-cart", JSON.stringify(items));
  }, [items]);

  const addItem = (product: Product) => {
    setItems((prev) => {
      const existing = prev.find((p) => p.id === product.id);
      if (existing) {
        return prev.map((p) =>
          p.id === product.id ? { ...p, quantity: p.quantity + 1 } : p,
        );
      }
      return [...prev, { ...product, quantity: 1 }];
    });
    setToast("Added to cart");
    setTimeout(() => setToast(null), 1800);
  };

  const removeItem = (productId: string) => {
    setItems((prev) => prev.filter((p) => p.id !== productId));
  };

  const clearCart = () => setItems([]);

  const itemCount = useMemo(
    () => items.reduce((sum, item) => sum + item.quantity, 0),
    [items],
  );

  return (
    <CartContext.Provider
      value={{
        items,
        itemCount,
        addItem,
        removeItem,
        clearCart,
      }}>
      {children}
      {toast && (
        <div className="fixed top-20 right-4 z-[60] rounded-lg bg-green-600 text-white px-4 py-3 shadow-lg">
          {toast}
        </div>
      )}
    </CartContext.Provider>
  );
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) {
    throw new Error("useCart must be used within CartProvider");
  }
  return ctx;
}
