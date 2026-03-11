"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import DashboardSidebar from "@/components/DashboardSidebar";
import AddProductForm from "@/components/AddProductForm";
import OrderTable from "@/components/OrderTable";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Package, ShoppingCart, TrendingUp, Users } from "lucide-react";
import { Order } from "@/types";

// Mock data
const mockOrders: Order[] = [
  {
    id: "1",
    consumerId: "consumer1",
    totalPrice: 7500,
    status: "paid",
    createdAt: new Date(),
  },
  {
    id: "2",
    consumerId: "consumer2",
    totalPrice: 4200,
    status: "shipped",
    createdAt: new Date(Date.now() - 86400000),
  },
];

export default function ProducerDashboard() {
  const [activeTab, setActiveTab] = useState<
    "overview" | "products" | "orders"
  >("overview");

  return (
    <div className="min-h-screen bg-gray-50 flex">
      <DashboardSidebar role="producer" />

      <div className="flex-1 ml-64">
        <div className="p-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}>
            <h1 className="text-3xl font-bold text-gray-900 mb-8">
              Producer Dashboard
            </h1>

            {/* Tab Navigation */}
            <div className="flex space-x-4 mb-8">
              <Button
                variant={activeTab === "overview" ? "default" : "outline"}
                onClick={() => setActiveTab("overview")}>
                Overview
              </Button>
              <Button
                variant={activeTab === "products" ? "default" : "outline"}
                onClick={() => setActiveTab("products")}>
                Add Product
              </Button>
              <Button
                variant={activeTab === "orders" ? "default" : "outline"}
                onClick={() => setActiveTab("orders")}>
                Orders
              </Button>
            </div>

            {/* Overview Tab */}
            {activeTab === "overview" && (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">
                      Total Products
                    </CardTitle>
                    <Package className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">12</div>
                    <p className="text-xs text-muted-foreground">
                      +2 from last month
                    </p>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">
                      Total Orders
                    </CardTitle>
                    <ShoppingCart className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">48</div>
                    <p className="text-xs text-muted-foreground">
                      +12 from last month
                    </p>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">
                      Revenue
                    </CardTitle>
                    <TrendingUp className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">₦127,500</div>
                    <p className="text-xs text-muted-foreground">
                      +18% from last month
                    </p>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">
                      Customers
                    </CardTitle>
                    <Users className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">32</div>
                    <p className="text-xs text-muted-foreground">
                      +5 from last month
                    </p>
                  </CardContent>
                </Card>
              </div>
            )}

            {/* Add Product Tab */}
            {activeTab === "products" && (
              <div className="max-w-2xl">
                <AddProductForm />
              </div>
            )}

            {/* Orders Tab */}
            {activeTab === "orders" && (
              <OrderTable orders={mockOrders} role="producer" />
            )}
          </motion.div>
        </div>
      </div>
    </div>
  );
}
