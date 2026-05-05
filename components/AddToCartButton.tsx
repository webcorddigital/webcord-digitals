"use client";
// components/AddToCartButton.tsx
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Plan } from "@/types";
import { useCart } from "@/lib/CartContext";

interface Props {
  plan: Plan;
  className?: string;
  fullWidth?: boolean;
}

export default function AddToCartButton({ plan, className, fullWidth }: Props) {
  const { addToCart, items } = useCart();
  const router = useRouter();
  const [added, setAdded] = useState(false);

  const isInCart = items.some((i) => i.plan.id === plan.id);

  const handleAdd = () => {
    if (isInCart) {
      router.push("/cart");
      return;
    }
    addToCart(plan);
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  const label = isInCart ? "View Cart →" : added ? "Added ✓" : "Add to Cart";

  return (
    <button
      className={className ?? "btn-primary"}
      onClick={handleAdd}
      style={fullWidth ? { width: "100%", justifyContent: "center" } : {}}
    >
      {label}
    </button>
  );
}
