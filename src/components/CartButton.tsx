// Compact cart button with badge
"use client";

import { ShoppingCart } from "lucide-react";
import { motion } from "framer-motion";
import { useCart } from "@/context/CartContext";
import { Button } from "@/components/ui/button";

interface CartButtonProps {
  onClick?: () => void;
  variant?: "solid" | "ghost";
}

export default function CartButton({ onClick, variant = "solid" }: CartButtonProps) {
  const { itemCount } = useCart();

  const base =
    variant === "solid"
      ? "bg-green-600 hover:bg-green-700 text-white"
      : "bg-white border-2 border-green-200 hover:border-green-400 text-green-700";

  return (
    <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
      <Button
        type="button"
        onClick={onClick}
        className={`relative flex items-center gap-2 ${base}`}>
        <ShoppingCart className="h-4 w-4" />
        <span className="font-bold text-sm">Cart</span>
        {itemCount > 0 && (
          <span className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full text-xs font-bold px-2 py-[2px]">
            {itemCount}
          </span>
        )}
      </Button>
    </motion.div>
  );
}
