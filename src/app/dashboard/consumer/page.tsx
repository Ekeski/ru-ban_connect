"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import DashboardSidebar from "@/components/DashboardSidebar";
import OrderTable from "@/components/OrderTable";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ShoppingCart, Package, Heart, CreditCard } from "lucide-react";
import { Order } from "@/types";

// Mock data
const mockOrders: Order[] = [
  {
    id: "1",
    consumerId: "current-user",
    totalPrice: 7500,
    status: "delivered",
    createdAt: new Date(),
  },
  {
    id: "2",
    consumerId: "current-user",
    totalPrice: 4200,
    status: "shipped",
    createdAt: new Date(Date.now() - 86400000),
  },
  {
    id: "3",
    consumerId: "current-user",
    totalPrice: 3200,
    status: "paid",
    createdAt: new Date(Date.now() - 172800000),
  },
];

export default function ConsumerDashboard() {
  const [activeTab, setActiveTab] = useState<
    "overview" | "orders" | "favorites"
  >("overview");

  return (
    <div className="min-h-screen bg-gray-50 flex">
      <DashboardSidebar role="consumer" />

      <div className="flex-1 ml-64">
        <div className="p-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}>
            <h1 className="text-3xl font-bold text-gray-900 mb-8">
              Consumer Dashboard
            </h1>

            {/* Tab Navigation */}
            <div className="flex space-x-4 mb-8">
              <Button
                variant={activeTab === "overview" ? "default" : "outline"}
                onClick={() => setActiveTab("overview")}>
                Overview
              </Button>
              <Button
                variant={activeTab === "orders" ? "default" : "outline"}
                onClick={() => setActiveTab("orders")}>
                My Orders
              </Button>
              <Button
                variant={activeTab === "favorites" ? "default" : "outline"}
                onClick={() => setActiveTab("favorites")}>
                Favorites
              </Button>
            </div>

            {/* Overview Tab */}
            {activeTab === "overview" && (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">
                      Total Orders
                    </CardTitle>
                    <ShoppingCart className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">24</div>
                    <p className="text-xs text-muted-foreground">
                      +3 from last month
                    </p>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">
                      Total Spent
                    </CardTitle>
                    <CreditCard className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">₦89,200</div>
                    <p className="text-xs text-muted-foreground">
                      +12% from last month
                    </p>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">
                      Favorite Items
                    </CardTitle>
                    <Heart className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">8</div>
                    <p className="text-xs text-muted-foreground">
                      Saved for later
                    </p>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">
                      Active Orders
                    </CardTitle>
                    <Package className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">2</div>
                    <p className="text-xs text-muted-foreground">In transit</p>
                  </CardContent>
                </Card>
              </div>
            )}

            {/* Orders Tab */}
            {activeTab === "orders" && (
              <OrderTable orders={mockOrders} role="consumer" />
            )}

            {/* Favorites Tab */}
            {activeTab === "favorites" && (
              <Card>
                <CardHeader>
                  <CardTitle>Favorite Products</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">
                    Your favorite products will appear here.
                  </p>
                  {/* TODO: Implement favorites list */}
                </CardContent>
              </Card>
            )}
          </motion.div>
        </div>
      </div>
    </div>
  );
}
