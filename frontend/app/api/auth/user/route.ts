"use server";
import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { ApiClient } from "@asfilab/janun-client";

const apiUrl = process.env.API_URL || "localhost:3000";

export async function GET(request: Request) {
  try {
    const cookieStore = cookies();
    const token = cookieStore.get("token")?.value;
    if (!token) {
      return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
    }
    // const response = await fetch(`${process.env.API_URL}/auth/user`, {
    //   headers: {
    //     Authorization: `Bearer ${token.value}`,
    //   },
    // });
    // if (!response.ok) {
    //   return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
    // }

    const apiClient = new ApiClient(apiUrl,token);
    const response = await apiClient.auth.getUser();

    return NextResponse.json({ user: response }, { status: 200 });
  } catch (error) {
    console.error("Authentication error", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
