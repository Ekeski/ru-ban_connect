"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, Leaf, Truck, Shield, Users } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function Home() {
  const [showTyping, setShowTyping] = useState(false);

  useEffect(() => {
    // Wait 3 seconds for the first title to fade out
    const timer = setTimeout(() => {
      setShowTyping(true);
    }, 3000);
    return () => clearTimeout(timer);
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
      },
    },
  };

  return (
    <div className="min-h-screen overflow-hidden">
      {/* Hero Section with Advanced Animations */}
      <section className="relative bg-gradient-to-br from-green-50 via-white to-green-50 py-32 overflow-hidden">
        {/* Animated Background Elements */}
        <motion.div
          className="absolute top-20 right-10 w-72 h-72 bg-green-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20"
          animate={{
            x: [0, 30, 0],
            y: [0, -30, 0],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        <motion.div
          className="absolute -bottom-8 left-20 w-72 h-72 bg-blue-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20"
          animate={{
            x: [0, -30, 0],
            y: [0, 30, 0],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center">
            {/* Floating Leaf Icon */}
            <motion.div
              className="flex justify-center mb-8"
              animate={{ y: [0, -15, 0] }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: "easeInOut",
              }}>
              <Leaf className="h-20 w-20 text-green-600 drop-shadow-lg" />
            </motion.div>

            {/* Main Title with Transition Animation */}
            <div className="min-h-[200px] flex items-center justify-center">
              <AnimatePresence mode="wait">
                {!showTyping ? (
                  <motion.h1
                    key="farm-title"
                    className="text-5xl md:text-7xl font-bold text-gray-900 mb-6"
                    initial={{ opacity: 0, y: -60, scale: 0.8 }}
                    animate={{
                      opacity: 1,
                      y: 0,
                      scale: 1,
                      filter: "blur(0px)",
                    }}
                    exit={{
                      opacity: 0,
                      y: -80,
                      scale: 1.2,
                      filter: "blur(10px)",
                      rotateX: -15,
                      transition: {
                        duration: 2.5,
                        ease: [0.25, 0.46, 0.45, 0.94],
                      },
                    }}>
                    Fresh From Farm to Your Table
                  </motion.h1>
                ) : (
                  <motion.h1
                    key="connect-title"
                    className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent"
                    initial={{
                      opacity: 0,
                      y: 40,
                      scale: 0.9,
                      filter: "blur(5px)",
                    }}
                    animate={{
                      opacity: 1,
                      y: 0,
                      scale: 1,
                      filter: "blur(0px)",
                    }}
                    transition={{
                      duration: 1.2,
                      ease: [0.25, 0.46, 0.45, 0.94],
                      delay: 0.3,
                    }}>
                    <span className="inline-block">RU-BAN CONNECT</span>
                    <br />
                    <span className="text-3xl md:text-5xl">
                      Got You Covered
                    </span>
                  </motion.h1>
                )}
              </AnimatePresence>
            </div>

            {/* Description with Staggered Animation */}
            <motion.p
              className="text-xl text-gray-700 mb-8 max-w-3xl mx-auto leading-relaxed"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}>
              RU-BAN CONNECT bridges the gap between rural farmers and urban
              consumers, delivering fresh, quality farm products directly to
              your doorstep.
            </motion.p>

            {/* CTA Buttons with Hover Effects */}
            <motion.div
              className="flex flex-col sm:flex-row gap-4 justify-center"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.5 }}>
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                transition={{ type: "spring", stiffness: 400 }}>
                <Link href="/marketplace">
                  <Button
                    size="lg"
                    className="text-lg px-8 py-3 bg-green-600 hover:bg-green-700 shadow-lg hover:shadow-xl transition-all duration-300">
                    Explore Marketplace
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </Link>
              </motion.div>
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                transition={{ type: "spring", stiffness: 400 }}>
                <Link href="/signup">
                  <Button
                    variant="outline"
                    size="lg"
                    className="text-lg px-8 py-3 border-2 hover:bg-green-50 transition-all duration-300">
                    Join as Producer
                  </Button>
                </Link>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Features Section with Enhanced Animations */}
      <section className="py-20 bg-white relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Why Choose RU-BAN CONNECT?
            </h2>
            <motion.div
              className="h-1 w-20 bg-gradient-to-r from-green-600 to-blue-600 mx-auto mt-4"
              initial={{ width: 0 }}
              whileInView={{ width: 80 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            />
            <p className="text-lg text-gray-600 max-w-2xl mx-auto mt-6">
              We ensure quality, freshness, and fair prices for both farmers and
              consumers.
            </p>
          </motion.div>

          <motion.div
            className="grid grid-cols-1 md:grid-cols-3 gap-8"
            initial="hidden"
            whileInView="visible"
            variants={containerVariants}
            viewport={{ once: true }}>
            <motion.div
              className="text-center p-8 rounded-xl bg-gradient-to-br from-green-50 to-green-100 shadow-lg hover:shadow-2xl transition-all duration-300 border-2 border-green-200"
              variants={itemVariants}
              whileHover={{
                y: -10,
                boxShadow: "0 20px 40px rgba(34, 197, 94, 0.3)",
              }}
              transition={{ type: "spring", stiffness: 300 }}>
              <motion.div
                animate={{ rotate: [0, 10, -10, 0] }}
                transition={{ duration: 3, repeat: Infinity }}>
                <Leaf className="h-16 w-16 text-green-600 mx-auto mb-4 drop-shadow-lg" />
              </motion.div>
              <h3 className="text-2xl font-bold text-gray-900 mb-2">
                Fresh Produce
              </h3>
              <p className="text-gray-700">
                Direct from farmers to consumers, ensuring maximum freshness and
                quality.
              </p>
            </motion.div>

            <motion.div
              className="text-center p-8 rounded-xl bg-gradient-to-br from-blue-50 to-blue-100 shadow-lg hover:shadow-2xl transition-all duration-300 border-2 border-blue-200"
              variants={itemVariants}
              whileHover={{
                y: -10,
                boxShadow: "0 20px 40px rgba(59, 130, 246, 0.3)",
              }}
              transition={{ type: "spring", stiffness: 300 }}>
              <motion.div
                animate={{ x: [0, 8, -8, 0] }}
                transition={{ duration: 3, repeat: Infinity }}>
                <Truck className="h-16 w-16 text-blue-600 mx-auto mb-4 drop-shadow-lg" />
              </motion.div>
              <h3 className="text-2xl font-bold text-gray-900 mb-2">
                Fast Delivery
              </h3>
              <p className="text-gray-700">
                Reliable delivery services bringing farm-fresh products to your
                door.
              </p>
            </motion.div>

            <motion.div
              className="text-center p-8 rounded-xl bg-gradient-to-br from-purple-50 to-purple-100 shadow-lg hover:shadow-2xl transition-all duration-300 border-2 border-purple-200"
              variants={itemVariants}
              whileHover={{
                y: -10,
                boxShadow: "0 20px 40px rgba(147, 51, 234, 0.3)",
              }}
              transition={{ type: "spring", stiffness: 300 }}>
              <motion.div
                animate={{ scale: [1, 1.1, 1] }}
                transition={{ duration: 3, repeat: Infinity }}>
                <Shield className="h-16 w-16 text-purple-600 mx-auto mb-4 drop-shadow-lg" />
              </motion.div>
              <h3 className="text-2xl font-bold text-gray-900 mb-2">
                Secure Payments
              </h3>
              <p className="text-gray-700">
                Safe and secure payment processing for all your transactions.
              </p>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* CTA Section with Gradient Background */}
      <section className="relative bg-gradient-to-r from-green-600 via-green-500 to-blue-600 py-20 overflow-hidden">
        {/* Animated background shapes */}
        <motion.div
          className="absolute inset-0 opacity-10"
          initial={{ opacity: 0.1 }}
          animate={{ opacity: 0.2 }}
          transition={{ duration: 4, repeat: Infinity, repeatType: "reverse" }}>
          <div className="absolute top-0 left-0 w-96 h-96 bg-white rounded-full mix-blend-multiply filter blur-3xl" />
        </motion.div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}>
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6 drop-shadow-lg">
              Ready to Get Started?
            </h2>
            <p className="text-xl text-green-50 mb-8 max-w-2xl mx-auto drop-shadow-lg">
              Join thousands of farmers and consumers already using RU-BAN
              CONNECT and transform how you source fresh, quality products.
            </p>
            <motion.div
              className="flex flex-col sm:flex-row gap-4 justify-center"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              viewport={{ once: true }}>
              <motion.div
                whileHover={{ scale: 1.08, rotate: 2 }}
                whileTap={{ scale: 0.95 }}
                transition={{ type: "spring", stiffness: 300 }}>
                <Link href="/signup">
                  <Button
                    size="lg"
                    variant="secondary"
                    className="text-lg px-8 py-3 bg-white text-green-600 hover:bg-green-50 shadow-lg hover:shadow-2xl transition-all duration-300">
                    Sign Up Today
                    <Users className="ml-2 h-5 w-5" />
                  </Button>
                </Link>
              </motion.div>
              <motion.div
                whileHover={{ scale: 1.08, rotate: -2 }}
                whileTap={{ scale: 0.95 }}
                transition={{ type: "spring", stiffness: 300 }}>
                <Link href="/marketplace">
                  <Button
                    size="lg"
                    variant="outline"
                    className="text-lg px-8 py-3 border-2 border-white text-white hover:bg-white/10 transition-all duration-300">
                    Explore Products
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </Link>
              </motion.div>
            </motion.div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
