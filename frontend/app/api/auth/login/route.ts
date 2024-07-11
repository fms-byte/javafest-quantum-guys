import { NextResponse } from 'next/server';

const apiUrl = process.env.API_URL;

if (!apiUrl) {
  throw new Error('API_URL is not defined in environment variables');
}

export async function POST(request: Request) {
  try {
    const { username, password } = await request.json();

    if (!username || !password) {
      return NextResponse.json({ error: "Username and password are required" }, { status: 400 });
    }

    const response = await fetch(`${apiUrl}/auth/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      return NextResponse.json({ error: errorData.message || "Login failed" }, { status: response.status });
    }

    const data = await response.json();

    const secureCookie = `token=${data.token}; Path=/; HttpOnly; Secure; SameSite=Strict`;
    
    return NextResponse.json({ user: data.user, token: data.token }, { 
      status: 200,
      headers: {
        'Set-Cookie': secureCookie
      }
    });

  } catch (error) {
    console.error("Login error", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}