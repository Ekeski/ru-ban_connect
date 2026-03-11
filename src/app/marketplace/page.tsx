"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Package } from "lucide-react";
import SearchBar from "@/components/SearchBar";
import ProductGrid from "@/components/ProductGrid";
import { Product } from "@/types";

// Mock data - will be replaced with API calls
const mockProducts: Product[] = [
  {
    id: "1",
    name: "Cassava",
    description: "Premium cassava tubers grown in Nigerian farms",
    price: 1500,
    quantity: 100,
    image: "https://picsum.photos/400/300?random=1",
    producerId: "producer1",
    createdAt: new Date(),
  },
  {
    id: "2",
    name: "Yam",
    description: "Large, healthy yam tubers from Nigerian soil",
    price: 2800,
    quantity: 75,
    image: "https://picsum.photos/400/300?random=2",
    producerId: "producer2",
    createdAt: new Date(),
  },
  {
    id: "3",
    name: "Banana",
    description: "Fresh bananas grown in Nigerian plantations",
    price: 1200,
    quantity: 200,
    image: "https://picsum.photos/400/300?random=3",
    producerId: "producer3",
    createdAt: new Date(),
  },
  {
    id: "4",
    name: "Rice",
    description: "Premium quality rice grown in Nigerian rice fields",
    price: 3200,
    quantity: 150,
    image: "https://picsum.photos/400/300?random=4",
    producerId: "producer4",
    createdAt: new Date(),
  },
  {
    id: "5",
    name: "Groundnuts",
    description: "Fresh groundnuts harvested from Nigerian farms",
    price: 2200,
    quantity: 80,
    image: "https://picsum.photos/400/300?random=5",
    producerId: "producer5",
    createdAt: new Date(),
  },
  {
    id: "6",
    name: "Groundnut Oil",
    description: "Pure groundnut oil extracted from Nigerian groundnuts",
    price: 4500,
    quantity: 50,
    image: "https://picsum.photos/400/300?random=6",
    producerId: "producer6",
    createdAt: new Date(),
  },
  {
    id: "7",
    name: "Beans",
    description: "Premium beans from Nigerian bean plantations",
    price: 5800,
    quantity: 40,
    image: "https://picsum.photos/400/300?random=7",
    producerId: "producer7",
    createdAt: new Date(),
  },
  {
    id: "8",
    name: "Tomatoes",
    description: "Juicy tomatoes grown in Nigerian greenhouses",
    price: 1800,
    quantity: 120,
    image: "https://picsum.photos/400/300?random=8",
    producerId: "producer8",
    createdAt: new Date(),
  },
  {
    id: "9",
    name: "Onions",
    description: "Sweet onions harvested from Nigerian farms",
    price: 1600,
    quantity: 90,
    image: "https://picsum.photos/400/300?random=9",
    producerId: "producer9",
    createdAt: new Date(),
  },
  {
    id: "10",
    name: "Plantains",
    description: "Ripe plantains grown in Nigerian plantations",
    price: 1400,
    quantity: 110,
    image: "https://picsum.photos/400/300?random=10",
    producerId: "producer10",
    createdAt: new Date(),
  },
  {
    id: "11",
    name: "Pineapples",
    description: "Sweet pineapples from Nigerian pineapple farms",
    price: 2500,
    quantity: 60,
    image: "https://picsum.photos/400/300?random=11",
    producerId: "producer11",
    createdAt: new Date(),
  },
  {
    id: "12",
    name: "Mangoes",
    description: "Juicy mangoes harvested at peak ripeness",
    price: 3000,
    quantity: 70,
    image: "https://picsum.photos/400/300?random=12",
    producerId: "producer12",
    createdAt: new Date(),
  },
  {
    id: "13",
    name: "Pepper (Capsicum)",
    description: "Colorful peppers grown in Nigerian soil",
    price: 2000,
    quantity: 85,
    image: "https://picsum.photos/400/300?random=13",
    producerId: "producer13",
    createdAt: new Date(),
  },
  {
    id: "14",
    name: "Irish Potatoes",
    description: "Fresh irish potatoes grown in Nigerian soil",
    price: 3500,
    quantity: 45,
    image: "https://picsum.photos/400/300?random=14",
    producerId: "producer14",
    createdAt: new Date(),
  },
  {
    id: "15",
    name: "Sweet Potato",
    description: "Sweet potatoes grown in Nigerian farms",
    price: 4200,
    quantity: 35,
    image: "https://picsum.photos/400/300?random=15",
    producerId: "producer15",
    createdAt: new Date(),
  },
];

export default function MarketplacePage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate API call
    const fetchProducts = async () => {
      setLoading(true);
      // In real app, this would be an API call
      setTimeout(() => {
        setProducts(mockProducts);
        setFilteredProducts(mockProducts);
        setLoading(false);
      }, 1000);
    };

    fetchProducts();
  }, []);

  const handleSearch = (query: string) => {
    if (!query.trim()) {
      setFilteredProducts(products);
    } else {
      const filtered = products.filter(
        (product) =>
          product.name.toLowerCase().includes(query.toLowerCase()) ||
          product.description.toLowerCase().includes(query.toLowerCase()),
      );
      setFilteredProducts(filtered);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-blue-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12">
          <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-4 drop-shadow-lg">
            Fresh Farm Marketplace
          </h1>
          <motion.div
            className="h-1 w-20 bg-gradient-to-r from-green-600 to-blue-600 mx-auto my-6"
            initial={{ width: 0 }}
            animate={{ width: 80 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          />
          <p className="text-xl text-gray-700 max-w-2xl mx-auto font-semibold">
            Discover fresh, locally grown produce from farmers in your area
          </p>
        </motion.div>

        <motion.div
          className="mb-12"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.3 }}>
          <SearchBar onSearch={handleSearch} />
        </motion.div>

        {loading ? (
          <div className="flex justify-center items-center py-24">
            <motion.div
              className="h-16 w-16 border-4 border-green-600 border-t-blue-600 rounded-full"
              animate={{ rotate: 360 }}
              transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
            />
          </div>
        ) : (
          <ProductGrid products={filteredProducts} />
        )}

        {filteredProducts.length === 0 && !loading && (
          <motion.div
            className="text-center py-24"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}>
            <motion.div
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 2, repeat: Infinity }}>
              <Package className="h-16 w-16 text-gray-400 mx-auto mb-4" />
            </motion.div>
            <p className="text-gray-600 text-xl font-semibold">
              No products found matching your search.
            </p>
          </motion.div>
        )}
      </div>
    </div>
  );
}
