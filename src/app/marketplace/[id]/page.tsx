"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import Image from "next/image";
import { motion } from "framer-motion";
import { Star, ShoppingCart, Truck, Shield } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Product } from "@/types";

// Mock data - will be replaced with API calls
const mockProducts: Product[] = [
  {
    id: "1",
    name: "Cassava",
    description:
      "Premium cassava tubers grown in Nigerian farms using traditional farming methods. These cassava roots are harvested at the perfect maturity for optimal starch content and nutritional value.",
    price: 1500,
    quantity: 100,
    image: "/images/cassava.avif",
    producerId: "producer1",
    createdAt: new Date(),
  },
  {
    id: "2",
    name: "Yam",
    description:
      "Large, healthy yam tubers from Nigerian soil, grown without chemical fertilizers. These yams are perfect for traditional Nigerian dishes and have excellent keeping qualities.",
    price: 2800,
    quantity: 75,
    image: "/images/yam.avif",
    producerId: "producer2",
    createdAt: new Date(),
  },
  {
    id: "3",
    name: "Banana",
    description:
      "Fresh bananas grown in Nigerian plantations. These sweet bananas are perfect for eating fresh, making smoothies, or traditional Nigerian dishes.",
    price: 1200,
    quantity: 200,
    image: "/images/banana.avif",
    producerId: "producer3",
    createdAt: new Date(),
  },
  {
    id: "4",
    name: "Rice",
    description:
      "Premium quality rice grown in Nigerian rice fields using modern irrigation techniques. This aromatic rice is perfect for jollof rice and other traditional dishes.",
    price: 3200,
    quantity: 150,
    image: "/images/rice.avif",
    producerId: "producer4",
    createdAt: new Date(),
  },
  {
    id: "5",
    name: "Groundnuts",
    description:
      "Fresh groundnuts harvested from Nigerian farms. These peanuts are perfect for making groundnut oil, groundnut soup, or eating as a healthy snack.",
    price: 2200,
    quantity: 80,
    image: "/images/groundnuts.avif",
    producerId: "producer5",
    createdAt: new Date(),
  },
  {
    id: "6",
    name: "Groundnut Oil",
    description:
      "Pure groundnut oil extracted from Nigerian groundnuts using traditional methods. This oil is essential for authentic Nigerian cooking and rich in healthy fats.",
    price: 4500,
    quantity: 50,
    image: "/images/groundnut-oil.avif",
    producerId: "producer6",
    createdAt: new Date(),
  },
  {
    id: "7",
    name: "Beans",
    description:
      "Premium beans from Nigerian farms. These beans are perfect for making traditional Nigerian dishes like moi-moi, akara, and various stews.",
    price: 5800,
    quantity: 40,
    image: "/images/beans.avif",
    producerId: "producer7",
    createdAt: new Date(),
  },
  {
    id: "8",
    name: "Tomatoes",
    description:
      "Juicy tomatoes grown in Nigerian greenhouses using hydroponic techniques. These tomatoes are perfect for fresh eating, sauces, and traditional Nigerian stews.",
    price: 1800,
    quantity: 120,
    image: "/images/tomatoes.avif",
    producerId: "producer8",
    createdAt: new Date(),
  },
  {
    id: "9",
    name: "Onions",
    description:
      "Sweet onions harvested from Nigerian farms. These onions are milder than white onions and perfect for Nigerian cuisine, salads, and pickling.",
    price: 1600,
    quantity: 90,
    image: "/images/onions.avif",
    producerId: "producer9",
    createdAt: new Date(),
  },
  {
    id: "10",
    name: "Plantains",
    description:
      "Ripe plantains grown in Nigerian plantations. These plantains can be fried, boiled, or roasted and are a staple in Nigerian cuisine.",
    price: 1400,
    quantity: 110,
    image: "/images/plantains.avif",
    producerId: "producer10",
    createdAt: new Date(),
  },
  {
    id: "11",
    name: "Pineapples",
    description:
      "Sweet pineapples from Nigerian pineapple farms. These tropical fruits are grown in the warm Nigerian climate and are perfect for fresh eating or fruit salads.",
    price: 2500,
    quantity: 60,
    image:  "/images/pineapple.avif",
    producerId: "producer11",
    createdAt: new Date(),
  },
  {
    id: "12",
    name: "Mangoes",
    description:
      "Juicy mangoes harvested at peak ripeness from Nigerian orchards. These mangoes are sweet, aromatic, and perfect for fresh consumption or making juices.",
    price: 3000,
    quantity: 70,
    image: "/images/mangoes.avif",
    producerId: "producer12",
    createdAt: new Date(),
  },
  {
    id: "13",
    name: "Pepper (Capsicum)",
    description:
      "Colorful peppers grown in Nigerian soil. These bell peppers come in various colors and are perfect for Nigerian stews, salads, and stuffing.",
    price: 2000,
    quantity: 85,
    image: "/images/pepper.avif",
    producerId: "producer13",
    createdAt: new Date(),
  },
  {
    id: "14",
    name: "Irish Potatoes",
    description:
      "Fresh irish potatoes grown in Nigerian soil. These potatoes are perfect for traditional Nigerian dishes and have excellent culinary versatility.",
    price: 3500,
    quantity: 45,
    image: "/images/irish-potatoes.avif",
    producerId: "producer14",
    createdAt: new Date(),
  },
  {
    id: "15",
    name: "Sweet Potato",
    description:
      "Sweet potatoes grown in Nigerian farms. These nutritious tubers are perfect for roasting, boiling, or making traditional Nigerian dishes.",
    price: 4200,
    quantity: 35,
    image: "/images/sweet-potato.avif",
    producerId: "producer15",
    createdAt: new Date(),
  },
];

// Mock data - will be replaced with API calls
const mockProduct: Product = {
  id: "1",
  name: "Fresh Tomatoes",
  description:
    "These organic tomatoes are grown in our local farms using sustainable farming practices. They are hand-picked at peak ripeness to ensure maximum flavor and nutrition. Perfect for salads, cooking, or eating fresh.",
  price: 2500,
  quantity: 50,
  image: "/api/placeholder/400/300",
  producerId: "producer1",
  createdAt: new Date(),
};

export default function ProductDetailsPage() {
  const params = useParams();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    // Simulate API call
    const fetchProduct = async () => {
      setLoading(true);
      // In real app, this would be an API call using params.id
      setTimeout(() => {
        const productId = params.id as string;
        const foundProduct = mockProducts.find((p) => p.id === productId);
        setProduct(foundProduct || null);
        setLoading(false);
      }, 1000);
    };

    if (params.id) {
      fetchProduct();
    }
  }, [params.id]);

  const handleAddToCart = () => {
    // TODO: Implement add to cart logic
    console.log(`Added ${quantity} ${product?.name} to cart`);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600"></div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <p className="text-gray-500 text-lg">Product not found</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Product Image */}
          <div className="relative h-96 lg:h-[500px] rounded-lg overflow-hidden">
            <Image
              src={product.image}
              alt={product.name}
              fill
              className="object-cover"
            />
          </div>

          {/* Product Details */}
          <div className="space-y-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">
                {product.name}
              </h1>
              <div className="flex items-center space-x-4 mb-4">
                <span className="text-3xl font-bold text-green-600">
                  ₦{product.price}
                </span>
                <Badge variant="secondary" className="text-sm">
                  {product.quantity} available
                </Badge>
              </div>
              <div className="flex items-center space-x-2 mb-4">
                <div className="flex items-center space-x-1">
                  <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                  <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                  <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                  <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                  <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                </div>
                <span className="text-sm text-gray-600">
                  (4.8) • 127 reviews
                </span>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-2">Description</h3>
              <p className="text-gray-600 leading-relaxed">
                {product.description}
              </p>
            </div>

            {/* Quantity Selector */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Quantity
              </label>
              <div className="flex items-center space-x-3">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="w-10 h-10 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-50">
                  -
                </button>
                <span className="text-lg font-semibold w-12 text-center">
                  {quantity}
                </span>
                <button
                  onClick={() =>
                    setQuantity(Math.min(product.quantity, quantity + 1))
                  }
                  className="w-10 h-10 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-50">
                  +
                </button>
              </div>
            </div>

            {/* Add to Cart Button */}
            <Button
              onClick={handleAddToCart}
              className="w-full text-lg py-3"
              size="lg">
              <ShoppingCart className="h-5 w-5 mr-2" />
              Add to Cart - ₦{(product.price * quantity).toLocaleString()}
            </Button>

            {/* Features */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center space-x-3">
                    <Truck className="h-5 w-5 text-green-600" />
                    <div>
                      <p className="font-medium text-sm">Free Delivery</p>
                      <p className="text-xs text-gray-600">
                        Orders over ₦10,000
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center space-x-3">
                    <Shield className="h-5 w-5 text-blue-600" />
                    <div>
                      <p className="font-medium text-sm">Secure Payment</p>
                      <p className="text-xs text-gray-600">100% protected</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
