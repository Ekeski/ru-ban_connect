import { NextRequest, NextResponse } from "next/server";
import { ProductService } from "@/services/database";
import { productSchema } from "@/lib/validations";
import { authMiddleware } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get("page") || "1");
    const limit = parseInt(searchParams.get("limit") || "12");
    const category = searchParams.get("category") || undefined;
    const search = searchParams.get("search") || undefined;
    const producerId = searchParams.get("producerId") || undefined;

    const result = await ProductService.getAllProducts({
      page,
      limit,
      category,
      search,
      producerId,
    });

    return NextResponse.json(result);
  } catch (error: any) {
    console.error("Get products error:", error);
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

    // Only producers can create products
    if (user.role !== "PRODUCER") {
      return NextResponse.json(
        { error: "Only producers can create products" },
        { status: 403 },
      );
    }

    const body = await request.json();
    const validatedData = productSchema.parse(body);

    // Get or create producer profile
    let producerProfile = await prisma.producerProfile.findUnique({
      where: { userId: user.id },
    });

    if (!producerProfile) {
      producerProfile = (await prisma.producerProfile.create({
        data: { userId: user.id },
      })) as any;
    }

    const product = await ProductService.createProduct(
      (producerProfile as any).id,
      validatedData,
    );

    return NextResponse.json(
      {
        message: "Product created successfully",
        product,
      },
      { status: 201 },
    );
  } catch (error: any) {
    console.error("Create product error:", error);

    if (error.name === "ZodError") {
      return NextResponse.json(
        { error: "Validation failed", details: error.errors },
        { status: 400 },
      );
    }

    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    );
  }
}
