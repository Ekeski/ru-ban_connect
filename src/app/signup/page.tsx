"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Leaf, User, ShoppingCart } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function SignupPage() {
  const [selectedRole, setSelectedRole] = useState<
    "producer" | "consumer" | null
  >(null);

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-white flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-md w-full space-y-8">
        <div className="text-center">
          <div className="flex justify-center">
            <Leaf className="h-12 w-12 text-green-600" />
          </div>
          <h2 className="mt-6 text-3xl font-bold text-gray-900">
            Join RU-BAN CONNECT
          </h2>
          <p className="mt-2 text-sm text-gray-600">
            Choose your role to get started
          </p>
        </div>

        <div className="space-y-4">
          <Card
            className={`cursor-pointer transition-all ${
              selectedRole === "producer"
                ? "ring-2 ring-green-500 bg-green-50"
                : "hover:shadow-md"
            }`}
            onClick={() => setSelectedRole("producer")}>
            <CardHeader className="text-center">
              <User className="h-8 w-8 text-green-600 mx-auto mb-2" />
              <CardTitle className="text-lg">Sign up as Producer</CardTitle>
              <CardDescription>
                Sell your fresh farm products to consumers
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>• Reach urban consumers directly</li>
                <li>• Set your own prices</li>
                <li>• Manage your farm profile</li>
                <li>• Track orders and sales</li>
              </ul>
            </CardContent>
          </Card>

          <Card
            className={`cursor-pointer transition-all ${
              selectedRole === "consumer"
                ? "ring-2 ring-green-500 bg-green-50"
                : "hover:shadow-md"
            }`}
            onClick={() => setSelectedRole("consumer")}>
            <CardHeader className="text-center">
              <ShoppingCart className="h-8 w-8 text-blue-600 mx-auto mb-2" />
              <CardTitle className="text-lg">Sign up as Consumer</CardTitle>
              <CardDescription>
                Buy fresh farm products from local producers
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>• Access fresh, quality produce</li>
                <li>• Support local farmers</li>
                <li>• Convenient home delivery</li>
                <li>• Secure payment options</li>
              </ul>
            </CardContent>
          </Card>
        </div>

        {selectedRole && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}>
            <Link href={`/signup/${selectedRole}`}>
              <Button className="w-full" size="lg">
                Continue as{" "}
                {selectedRole === "producer" ? "Producer" : "Consumer"}
              </Button>
            </Link>
          </motion.div>
        )}

        <div className="text-center">
          <p className="text-sm text-gray-600">
            Already have an account?{" "}
            <Link
              href="/login"
              className="font-medium text-green-600 hover:text-green-500">
              Sign in
            </Link>
          </p>
        </div>
      </motion.div>
    </div>
  );
}
