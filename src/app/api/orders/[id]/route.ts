import { NextRequest, NextResponse } from "next/server";
import { OrderService } from "@/services/orders";
import { updateOrderStatusSchema } from "@/lib/validations";
import { authMiddleware } from "@/lib/auth";

interface RouteParams {
  params: Promise<{
    id: string;
  }>;
}

export async function GET(request: NextRequest, { params }: RouteParams) {
  try {
    // Authenticate user
    const authResult = await authMiddleware(request);
    if (!authResult.success) {
      return NextResponse.json({ error: authResult.error }, { status: 401 });
    }

    const user = authResult.user!;
    const { id } = await params;

    // Allow access based on role
    const userId = user.role === "CONSUMER" ? user.id : undefined;
    const order = await OrderService.getOrderById(id, userId);

    if (!order) {
      return NextResponse.json({ error: "Order not found" }, { status: 404 });
    }

    return NextResponse.json({ order });
  } catch (error: any) {
    console.error("Get order error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    );
  }
}

export async function PUT(request: NextRequest, { params }: RouteParams) {
  try {
    // Authenticate user
    const authResult = await authMiddleware(request);
    if (!authResult.success) {
      return NextResponse.json({ error: authResult.error }, { status: 401 });
    }

    const user = authResult.user!;

    // Only producers can update order status
    if (user.role !== "PRODUCER") {
      return NextResponse.json(
        { error: "Only producers can update order status" },
        { status: 403 },
      );
    }

    const body = await request.json();
    const validatedData = updateOrderStatusSchema.parse(body);
    const { id } = await params;

    const order = await OrderService.updateOrderStatus(
      id,
      user.id,
      validatedData,
    );

    return NextResponse.json({
      message: "Order status updated successfully",
      order,
    });
  } catch (error: any) {
    console.error("Update order error:", error);

    if (error.name === "ZodError") {
      return NextResponse.json(
        { error: "Validation failed", details: error.errors },
        { status: 400 },
      );
    }

    if (error.message.includes("not found or access denied")) {
      return NextResponse.json({ error: error.message }, { status: 404 });
    }

    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    );
  }
}
