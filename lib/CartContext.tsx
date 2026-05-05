"use client";
// lib/CartContext.tsx
// Pure localStorage cart — no backend, no auth dependency.
import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { CartItem, Plan, CheckoutDetails } from "@/types";

interface CartContextType {
  items: CartItem[];
  addToCart: (plan: Plan) => void;
  removeFromCart: (planId: string) => void;
  updateQuantity: (planId: string, qty: number) => void;
  clearCart: () => void;
  totalItems: number;
  totalPrice: number;
  checkoutDetails: CheckoutDetails | null;
  setCheckoutDetails: (d: CheckoutDetails) => void;
}

const CartContext = createContext<CartContextType | null>(null);

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [checkoutDetails, setCheckoutDetails] = useState<CheckoutDetails | null>(null);

  // Restore cart from localStorage on mount
  useEffect(() => {
    try {
      const saved = localStorage.getItem("webcord_cart");
      if (saved) setItems(JSON.parse(saved));
    } catch {}
  }, []);

  // Persist cart to localStorage on every change
  useEffect(() => {
    localStorage.setItem("webcord_cart", JSON.stringify(items));
  }, [items]);

  const addToCart = (plan: Plan) => {
    setItems((prev) => {
      const existing = prev.find((i) => i.plan.id === plan.id);
      if (existing) {
        return prev.map((i) =>
          i.plan.id === plan.id ? { ...i, quantity: i.quantity + 1 } : i
        );
      }
      return [...prev, { plan, quantity: 1 }];
    });
  };

  const removeFromCart = (planId: string) =>
    setItems((prev) => prev.filter((i) => i.plan.id !== planId));

  const updateQuantity = (planId: string, qty: number) => {
    if (qty < 1) { removeFromCart(planId); return; }
    setItems((prev) =>
      prev.map((i) => (i.plan.id === planId ? { ...i, quantity: qty } : i))
    );
  };

  const clearCart = () => setItems([]);

  const totalItems = items.reduce((s, i) => s + i.quantity, 0);
  const totalPrice = items.reduce((s, i) => s + i.plan.price * i.quantity, 0);

  return (
    <CartContext.Provider
      value={{
        items,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        totalItems,
        totalPrice,
        checkoutDetails,
        setCheckoutDetails,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within CartProvider");
  return ctx;
}
