import { NextRequest, NextResponse } from "next/server";
import { ProducerService } from "@/services/database";
import { producerProfileSchema } from "@/lib/validations";
import { authMiddleware } from "@/lib/auth";

export async function GET(request: NextRequest) {
  try {
    // Authenticate user
    const authResult = await authMiddleware(request);
    if (!authResult.success) {
      return NextResponse.json({ error: authResult.error }, { status: 401 });
    }

    const user = authResult.user!;

    // Only producers can access their profile
    if (user.role !== "PRODUCER") {
      return NextResponse.json(
        { error: "Only producers have profiles" },
        { status: 403 },
      );
    }

    const profile = await ProducerService.getProfile(user.id);

    return NextResponse.json({ profile });
  } catch (error: any) {
    console.error("Get producer profile error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    );
  }
}

export async function PUT(request: NextRequest) {
  try {
    // Authenticate user
    const authResult = await authMiddleware(request);
    if (!authResult.success) {
      return NextResponse.json({ error: authResult.error }, { status: 401 });
    }

    const user = authResult.user!;

    // Only producers can update their profile
    if (user.role !== "PRODUCER") {
      return NextResponse.json(
        { error: "Only producers can update profiles" },
        { status: 403 },
      );
    }

    const body = await request.json();
    const validatedData = producerProfileSchema.parse(body);

    const profile = await ProducerService.createOrUpdateProfile(
      user.id,
      validatedData,
    );

    return NextResponse.json({
      message: "Profile updated successfully",
      profile,
    });
  } catch (error: any) {
    console.error("Update producer profile error:", error);

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
