// src/components/ProductCard.tsx

"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { Star, ShoppingCart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Product } from "@/types";
import { useCart } from "@/context/CartContext";

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const { addItem } = useCart();

  return (
    <motion.div
      whileHover={{ y: -10, boxShadow: "0 25px 50px rgba(0, 0, 0, 0.15)" }}
      whileTap={{ scale: 0.98 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}>
      <Card className="overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 border-2 border-green-100">
        <div className="relative h-48 overflow-hidden">
          <motion.div
            whileHover={{ scale: 1.1 }}
            transition={{ duration: 0.4 }}>
            <Image
              src={product.image}
              alt={product.name}
              fill
              className="object-cover"
            />
          </motion.div>
          <motion.div
            className="absolute inset-0 bg-black/20 opacity-0 hover:opacity-100 transition-opacity duration-300 flex items-center justify-center"
            whileHover={{ opacity: 1 }}>
            <motion.span className="text-white font-bold text-sm">
              View Product
            </motion.span>
          </motion.div>
        </div>
        <CardContent className="p-4">
          <motion.h3
            className="font-bold text-lg mb-2 text-gray-900 truncate"
            whileHover={{ color: "#16a34a" }}>
            {product.name}
          </motion.h3>
          <p className="text-gray-600 text-sm mb-3 line-clamp-2 min-h-10">
            {product.description}
          </p>
          <div className="flex items-center justify-between">
            <motion.span
              className="text-2xl font-bold text-green-600"
              whileHover={{ scale: 1.1 }}>
              ₦{product.price}
            </motion.span>
            <motion.div
              className="flex items-center space-x-1"
              whileHover={{ scale: 1.15 }}>
              <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
              <span className="text-sm font-bold text-gray-600">4.5</span>
            </motion.div>
          </div>
        </CardContent>
        <CardFooter className="p-4 pt-0">
          <motion.div
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="w-full">
            <Button
              onClick={() => addItem(product)}
              className="w-full bg-green-600 hover:bg-green-700 font-bold shadow-md hover:shadow-lg transition-all duration-300">
              <ShoppingCart className="h-4 w-4 mr-2" />
              Add to cart
            </Button>
          </motion.div>
        </CardFooter>
      </Card>
    </motion.div>
  );
}
