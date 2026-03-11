import { NextRequest, NextResponse } from "next/server";
import { OrderService } from "@/services/orders";
import { createOrderSchema } from "@/lib/validations";
import { authMiddleware } from "@/lib/auth";

export async function GET(request: NextRequest) {
  try {
    // Authenticate user
    const authResult = await authMiddleware(request);
    if (!authResult.success) {
      return NextResponse.json({ error: authResult.error }, { status: 401 });
    }

    const user = authResult.user!;
    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get("page") || "1");
    const limit = parseInt(searchParams.get("limit") || "10");

    let result;
    if (user.role === "PRODUCER") {
      // Get producer's orders (orders containing their products)
      result = await OrderService.getProducerOrders(user.id, { page, limit });
    } else {
      // Get consumer's orders
      result = await OrderService.getUserOrders(user.id, { page, limit });
    }

    return NextResponse.json(result);
  } catch (error: any) {
    console.error("Get orders error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    // Authenticate user
    const authResult = await authMiddleware(request);
    if (!authResult.success) {
      return NextResponse.json({ error: authResult.error }, { status: 401 });
    }

    const user = authResult.user!;

    // Only consumers can create orders
    if (user.role !== "CONSUMER") {
      return NextResponse.json(
        { error: "Only consumers can create orders" },
        { status: 403 },
      );
    }

    const body = await request.json();
    const validatedData = createOrderSchema.parse(body);

    const order = await OrderService.createOrder(user.id, validatedData);

    return NextResponse.json(
      {
        message: "Order created successfully",
        order,
      },
      { status: 201 },
    );
  } catch (error: any) {
    console.error("Create order error:", error);

    if (error.name === "ZodError") {
      return NextResponse.json(
        { error: "Validation failed", details: error.errors },
        { status: 400 },
      );
    }

    if (
      error.message.includes("not found") ||
      error.message.includes("Insufficient stock")
    ) {
      return NextResponse.json({ error: error.message }, { status: 400 });
    }

    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    );
  }
}
