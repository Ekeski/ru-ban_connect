import { NextRequest, NextResponse } from "next/server";
import { ProductService } from "@/services/database";
import { updateProductSchema } from "@/lib/validations";
import { authMiddleware } from "@/lib/auth";

interface RouteParams {
  params: Promise<{
    id: string;
  }>;
}

export async function GET(request: NextRequest, { params }: RouteParams) {
  try {
    const { id } = await params;
    const product = await ProductService.getProductById(id);

    if (!product) {
      return NextResponse.json({ error: "Product not found" }, { status: 404 });
    }

    return NextResponse.json({ product });
  } catch (error: any) {
    console.error("Get product error:", error);
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

    // Only producers can update products
    if (user.role !== "PRODUCER") {
      return NextResponse.json(
        { error: "Only producers can update products" },
        { status: 403 },
      );
    }

    const body = await request.json();
    const validatedData = updateProductSchema.parse(body);
    const { id } = await params;

    const product = await ProductService.updateProduct(
      id,
      user.id,
      validatedData,
    );

    return NextResponse.json({
      message: "Product updated successfully",
      product,
    });
  } catch (error: any) {
    console.error("Update product error:", error);

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

export async function DELETE(request: NextRequest, { params }: RouteParams) {
  try {
    // Authenticate user
    const authResult = await authMiddleware(request);
    if (!authResult.success) {
      return NextResponse.json({ error: authResult.error }, { status: 401 });
    }

    const user = authResult.user!;

    // Only producers can delete products
    if (user.role !== "PRODUCER") {
      return NextResponse.json(
        { error: "Only producers can delete products" },
        { status: 403 },
      );
    }

    const { id } = await params;
    await ProductService.deleteProduct(id, user.id);

    return NextResponse.json({
      message: "Product deleted successfully",
    });
  } catch (error: any) {
    console.error("Delete product error:", error);

    if (error.message.includes("not found or access denied")) {
      return NextResponse.json({ error: error.message }, { status: 404 });
    }

    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    );
  }
}
