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
      const errorData = await response.json();
      return NextResponse.json({ error: errorData.message || "Registration failed" }, { status: response.status });
    }

    const data = await response.json();

    console.log(data);

    const secureCookie = `token=${data.token}; Path=/; HttpOnly; Secure; SameSite=Strict`;
    
    // Return both the user data and the token
    return NextResponse.json({ user: data.user, token: data.token }, { 
      status: 200,
      headers: {
        'Set-Cookie': secureCookie
      }
    });

  } catch (error) {
    console.error("Registration error", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}