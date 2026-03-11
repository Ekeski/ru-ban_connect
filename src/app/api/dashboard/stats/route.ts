import { NextRequest, NextResponse } from "next/server";
import { OrderService } from "@/services/orders";
import { ProductService } from "@/services/database";
import { authMiddleware } from "@/lib/auth";

export async function GET(request: NextRequest) {
  try {
    // Authenticate user
    const authResult = await authMiddleware(request);
    if (!authResult.success) {
      return NextResponse.json({ error: authResult.error }, { status: 401 });
    }

    const user = authResult.user!;

    if (user.role === "PRODUCER") {
      // Get producer stats
      const [orderStats, products] = await Promise.all([
        OrderService.getOrderStats(user.id),
        ProductService.getAllProducts({ producerId: user.id }),
      ]);

      return NextResponse.json({
        role: "producer",
        stats: {
          ...orderStats,
          totalProducts: products.products.length,
          activeProducts: products.products.filter((p: any) => p.quantity > 0)
            .length,
        },
      });
    } else {
      // Get consumer stats
      const orders = await OrderService.getUserOrders(user.id);
      const totalSpent = orders.orders.reduce(
        (sum: number, order: any) => sum + order.total,
        0,
      );

      return NextResponse.json({
        role: "consumer",
        stats: {
          totalOrders: orders.pagination.total,
          totalSpent,
          pendingOrders: orders.orders.filter(
            (o: any) => o.status === "PENDING",
          ).length,
        },
      });
    }
  } catch (error: any) {
    console.error("Get dashboard stats error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    );
  }
}
