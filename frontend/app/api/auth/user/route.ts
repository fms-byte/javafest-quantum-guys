"use server";
import { NextResponse } from "next/server";
import { cookies } from "next/headers";

export async function GET(request: Request) {
  try {
    const cookieStore = cookies();
    const token = cookieStore.get("token");
    if (!token || !token.value) {
      return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
    }
    const response = await fetch(`${process.env.API_URL}/auth/user`, {
      headers: {
        Authorization: `Bearer ${token.value}`,
      },
    });
    if (!response.ok) {
      return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
    }
    const data = await response.json();
    return NextResponse.json({ user: data }, { status: 200 });
  } catch (error) {
    console.error("Authentication error", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
