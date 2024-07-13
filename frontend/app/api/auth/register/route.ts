"use server";
import { NextResponse } from 'next/server';

const apiUrl = process.env.API_URL;

if (!apiUrl) {
  throw new Error('API_URL is not defined in environment variables');
}

export async function POST(request: Request) {
  try {
    const { email, password, username } = await request.json();

    if (!email || !password || !username) {
      return NextResponse.json({ error: "Email, password, and username are required" }, { status: 400 });
    }

    const response = await fetch(`${apiUrl}/auth/register`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password, username }),
    });

    if (!response.ok) {
      return NextResponse.json({ error: "Email already exists!" }, { status: response.status });
    }

    const data = await response.json();

    console.log(data);
   
    return NextResponse.json({ user: data.user }, { 
      status: 200,
    });

  } catch (error) {
    console.error("Registration error", error);
    return NextResponse.json({ error: error }, { status: 500 });
  }
}