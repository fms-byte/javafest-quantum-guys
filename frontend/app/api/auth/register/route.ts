"use server";
import { NextResponse } from 'next/server';
import { ApiClient } from "@asfilab/janun-client";

const apiUrl = process.env.API_URL || 'localhost:3000';

if (!apiUrl) {
  throw new Error('API_URL is not defined in environment variables');
}

export async function POST(request: Request) {
  try {
    const { email, password, username } = await request.json();

    if (!email || !password || !username) {
      return NextResponse.json({ error: "Email, password, and username are required" }, { status: 400 });
    }

    // const response = await fetch(`${apiUrl}/auth/register`, {
    //   method: "POST",
    //   headers: { "Content-Type": "application/json" },
    //   body: JSON.stringify({ email, password, username }),
    // });

    // if (!response.ok) {
    //   return NextResponse.json({ error: "Email already exists!" }, { status: response.status });
    // }

    const apiClient = new ApiClient(apiUrl);
    const response = await apiClient.auth.register({
      registerRequest: {
        email,
        password,
        username,
      },
    });

    console.log(response);
   
    return NextResponse.json({ user: response }, { 
      status: 200,
    });

  } catch (error) {
    console.error("Registration error", error);
    return NextResponse.json({ error: error }, { status: 500 });
  }
}