import { NextRequest } from "next/server";
import { UserService } from "@/services/database";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

export interface AuthUser {
  id: string;
  email: string;
  name: string | null;
  role: "PRODUCER" | "CONSUMER";
}

export async function authMiddleware(request: NextRequest): Promise<{
  success: boolean;
  user?: AuthUser;
  error?: string;
}> {
  try {
    // retrieve session from NextAuth
    const session = await getServerSession(authOptions);
    if (!session || !session.user || !session.user.email) {
      return { success: false, error: "Not authenticated" };
    }

    const user = await UserService.findUserByEmail(session.user.email);
    if (!user) {
      return { success: false, error: "User not found" };
    }

    return {
      success: true,
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        role: user.role as "CONSUMER" | "PRODUCER",
      },
    };
  } catch (error) {
    console.error("Auth middleware error:", error);
    return { success: false, error: "Authentication failed" };
  }
}
