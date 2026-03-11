// src/components/DashboardSidebar.tsx

"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import {
  LayoutDashboard,
  Package,
  ShoppingCart,
  Settings,
  LogOut,
} from "lucide-react";
import { cn } from "@/lib/utils";

interface DashboardSidebarProps {
  role: "producer" | "consumer";
}

export default function DashboardSidebar({ role }: DashboardSidebarProps) {
  const pathname = usePathname();

  const producerLinks = [
    { href: "/dashboard/producer", label: "Dashboard", icon: LayoutDashboard },
    {
      href: "/dashboard/producer/products",
      label: "My Products",
      icon: Package,
    },
    { href: "/dashboard/producer/orders", label: "Orders", icon: ShoppingCart },
    { href: "/dashboard/producer/settings", label: "Settings", icon: Settings },
  ];

  const consumerLinks = [
    { href: "/dashboard/consumer", label: "Dashboard", icon: LayoutDashboard },
    {
      href: "/dashboard/consumer/orders",
      label: "My Orders",
      icon: ShoppingCart,
    },
    { href: "/dashboard/consumer/settings", label: "Settings", icon: Settings },
  ];

  const links = role === "producer" ? producerLinks : consumerLinks;

  const sidebarVariants = {
    hidden: { opacity: 0, x: -50 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.6 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: (i: number) => ({
      opacity: 1,
      x: 0,
      transition: { duration: 0.4, delay: i * 0.1 },
    }),
  };

  return (
    <motion.div
      className="w-64 bg-gradient-to-b from-white to-green-50 shadow-xl border-r-2 border-green-200 min-h-screen fixed left-0 top-16"
      variants={sidebarVariants}
      initial="hidden"
      animate="visible">
      <div className="p-6 border-b-2 border-green-100">
        <motion.h2
          className="text-xl font-bold bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent"
          whileHover={{ scale: 1.05 }}>
          {role === "producer" ? "Producer" : "Consumer"} Dashboard
        </motion.h2>
      </div>
      <nav className="px-4 py-6">
        <motion.ul className="space-y-2">
          {links.map((link, index) => {
            const Icon = link.icon;
            const isActive = pathname === link.href;
            return (
              <motion.li
                key={link.href}
                custom={index}
                variants={itemVariants}
                initial="hidden"
                animate="visible">
                <Link href={link.href}>
                  <motion.div
                    className={cn(
                      "flex items-center space-x-3 px-4 py-3 rounded-lg text-sm font-bold transition-all duration-300 cursor-pointer",
                      isActive
                        ? "bg-gradient-to-r from-green-600 to-green-500 text-white shadow-lg"
                        : "text-gray-700 hover:bg-green-100 hover:text-green-700 hover:shadow-md",
                    )}
                    whileHover={{ x: 5 }}
                    whileTap={{ scale: 0.95 }}>
                    <motion.div
                      animate={isActive ? { rotate: 360 } : { rotate: 0 }}
                      transition={{ duration: 2, repeat: Infinity }}>
                      <Icon className="h-5 w-5" />
                    </motion.div>
                    <span>{link.label}</span>
                    {isActive && (
                      <motion.div
                        className="ml-auto w-2 h-2 bg-white rounded-full"
                        layoutId="activeIndicator"
                      />
                    )}
                  </motion.div>
                </Link>
              </motion.li>
            );
          })}
        </motion.ul>
      </nav>
      <div className="absolute bottom-6 left-4 right-4">
        <motion.button
          className="flex items-center space-x-3 px-4 py-3 w-full text-left text-sm font-bold text-gray-700 hover:bg-red-100 hover:text-red-700 rounded-lg transition-all duration-300"
          whileHover={{ x: 5 }}
          whileTap={{ scale: 0.95 }}>
          <LogOut className="h-5 w-5" />
          <span>Logout</span>
        </motion.button>
      </div>
    </motion.div>
  );
}
