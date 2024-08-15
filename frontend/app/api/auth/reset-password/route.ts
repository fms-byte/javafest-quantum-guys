"use server";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { ApiClient } from "@asfilab/janun-client";

const apiUrl = process.env.API_URL || "localhost:3000";

export async function POST(request: Request) {
  try {
    const { password } = await request.json();

    if (!password) {
      return NextResponse.json({ error: "Password is required" }, { status: 400 });
    }

    const cookieStore = cookies();
    const token = cookieStore.get("token")?.value;

    if (!token) {
      return NextResponse.json({ error: "Token not found!" }, { status: 400 });
    }

    // const response = await fetch(`${apiUrl}/auth/reset-password`, {
    //   method: "POST",
    //   headers: { "Content-Type": "application/json" },
    //   body: JSON.stringify({ token, password }),
    // });

    // if (!response.ok) {
    //   return NextResponse.json(
    //     { error: "Password reset error!" },
    //     { status: response.status }
    //   );
    // }

    const apiClient = new ApiClient(apiUrl);
    const response = await apiClient.auth.resetPassword({
      resetPasswordRequest: {
        token,
        password,
      },
    });

    return NextResponse.json(
      { message: "Password reset successfully!" },
      {
        status: 200,
      }
    );
  } catch (error: any) {
    console.error("Forgot Password error", error);
    return NextResponse.json(
      { error: error.message ||"Internal server error" },
      { status: 500 }
    );
  }
}
