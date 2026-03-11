// src/components/Navbar.tsx

"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Leaf, ShoppingCart, User, Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useSession, signOut } from "next-auth/react";

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { data: session } = useSession();

  const navVariants = {
    hidden: { y: -100, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.6 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: (i: number) => ({
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.5,
        delay: 0.1 * i,
      },
    }),
  };

  const mobileMenuVariants = {
    hidden: { x: -300, opacity: 0 },
    visible: {
      x: 0,
      opacity: 1,
      transition: { duration: 0.4 },
    },
    exit: {
      x: -300,
      opacity: 0,
      transition: { duration: 0.4 },
    },
  };

  const mobileItemVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: (i: number) => ({
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.3,
        delay: 0.05 * i,
      },
    }),
  };

  return (
    <motion.nav
      variants={navVariants}
      initial="hidden"
      animate="visible"
      className="bg-white shadow-lg border-b-2 border-green-100 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <motion.div
            custom={0}
            variants={itemVariants}
            initial="hidden"
            animate="visible">
            <Link href="/" className="flex items-center space-x-2 group">
              <motion.div
                animate={{ rotate: [0, 10, -10, 0] }}
                transition={{ duration: 3, repeat: Infinity }}
                className="group-hover:drop-shadow-lg transition-all">
                <Leaf className="h-8 w-8 text-green-600" />
              </motion.div>
              <span className="hidden sm:inline text-xl font-bold text-gray-900 bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent group-hover:drop-shadow-lg transition-all">
                RU-BAN CONNECT
              </span>
            </Link>
          </motion.div>

          {/* Desktop Navigation */}
          <motion.div
            className="hidden md:flex items-center space-x-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}>
            <motion.div
              custom={1}
              variants={itemVariants}
              initial="hidden"
              animate="visible">
              <Link href="/marketplace">
                <Button
                  variant="ghost"
                  className="text-gray-700 hover:text-green-600 hover:bg-green-50 transition-all duration-300 font-bold text-sm">
                  Marketplace
                </Button>
              </Link>
            </motion.div>

            {session?.user ? (
              <motion.div
                custom={2}
                variants={itemVariants}
                initial="hidden"
                animate="visible">
                <Button
                  variant="outline"
                  className="border-2 border-gray-300 hover:border-gray-500 transition-all duration-300 font-bold text-sm"
                  onClick={() => signOut()}>
                  <User className="h-4 w-4 mr-2" />
                  Logout
                </Button>
              </motion.div>
            ) : (
              <>
                <motion.div
                  custom={2}
                  variants={itemVariants}
                  initial="hidden"
                  animate="visible">
                  <Link href="/login">
                    <motion.div
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}>
                      <Button
                        variant="outline"
                        className="border-2 border-gray-300 hover:border-gray-500 transition-all duration-300 font-bold text-sm">
                        <User className="h-4 w-4 mr-2" />
                        Login
                      </Button>
                    </motion.div>
                  </Link>
                </motion.div>

                <motion.div
                  custom={3}
                  variants={itemVariants}
                  initial="hidden"
                  animate="visible">
                  <Link href="/signup">
                    <motion.div
                      whileHover={{ scale: 1.08 }}
                      whileTap={{ scale: 0.92 }}
                      transition={{ type: "spring", stiffness: 400 }}>
                      <Button className="bg-green-600 hover:bg-green-700 shadow-lg hover:shadow-xl transition-all duration-300 font-bold text-sm">
                        <ShoppingCart className="h-4 w-4 mr-2" />
                        Sign Up
                      </Button>
                    </motion.div>
                  </Link>
                </motion.div>
              </>
            )}
          </motion.div>

          {/* Mobile Menu Button */}
          <motion.button
            className="md:hidden"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            transition={{ type: "spring", stiffness: 400 }}>
            {mobileMenuOpen ? (
              <X className="h-6 w-6 text-gray-700" />
            ) : (
              <Menu className="h-6 w-6 text-gray-700" />
            )}
          </motion.button>
        </div>
      </div>

      {/* Mobile Side Navigation */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            variants={mobileMenuVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="fixed left-0 top-16 w-64 h-screen bg-gradient-to-b from-white to-green-50 shadow-2xl border-r-2 border-green-200 z-40">
            <div className="p-6 space-y-4">
              <motion.div
                custom={0}
                variants={mobileItemVariants}
                initial="hidden"
                animate="visible">
                <Link
                  href="/marketplace"
                  onClick={() => setMobileMenuOpen(false)}>
                  <Button
                    variant="ghost"
                    className="w-full justify-start text-gray-700 hover:text-green-600 hover:bg-green-100 transition-all duration-300 font-bold text-base py-3">
                    Marketplace
                  </Button>
                </Link>
              </motion.div>

              <motion.div
                custom={1}
                variants={mobileItemVariants}
                initial="hidden"
                animate="visible">
                <Link href="/login" onClick={() => setMobileMenuOpen(false)}>
                  <Button
                    variant="ghost"
                    className="w-full justify-start text-gray-700 hover:text-green-600 hover:bg-green-100 transition-all duration-300 font-bold text-base py-3">
                    <User className="h-4 w-4 mr-3" />
                    Login
                  </Button>
                </Link>
              </motion.div>

              <motion.div
                custom={2}
                variants={mobileItemVariants}
                initial="hidden"
                animate="visible">
                <Link href="/signup" onClick={() => setMobileMenuOpen(false)}>
                  <Button className="w-full justify-start bg-green-600 hover:bg-green-700 shadow-lg hover:shadow-xl transition-all duration-300 font-bold text-base py-3">
                    <ShoppingCart className="h-4 w-4 mr-3" />
                    Sign Up
                  </Button>
                </Link>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Mobile Menu Backdrop */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            key="backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 bg-black bg-opacity-50 z-30 md:hidden"
            onClick={() => setMobileMenuOpen(false)}
          />
        )}
      </AnimatePresence>
    </motion.nav>
  );
}
