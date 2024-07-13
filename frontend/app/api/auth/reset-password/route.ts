"use server";
import { apiUrl } from "@/setupEnv";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const { token, password } = await request.json();

    if (!password) {
      return NextResponse.json({ error: "Password is required" }, { status: 400 });
    }

    if (!token) {
      return NextResponse.json({ error: "Token not found!" }, { status: 400 });
    }

    const response = await fetch(`${apiUrl}/auth/reset-password`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ token, password }),
    });

    if (!response.ok) {
      return NextResponse.json(
        { error: "Password reset error!" },
        { status: response.status }
      );
    }

    return NextResponse.json(
      { message: "Password reset successfully!" },
      {
        status: 200,
      }
    );
  } catch (error) {
    console.error("Forgot Password error", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
