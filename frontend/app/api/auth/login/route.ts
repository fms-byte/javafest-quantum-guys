"use server";
import { NextResponse } from 'next/server';
import { ApiClient } from "@asfilab/janun-client";
import { cookies } from 'next/headers';

const apiUrl = process.env.API_URL || 'localhost:3000';

export async function POST(request: Request) {
  try {
    const { username, password } = await request.json();

    if (!username || !password) {
      return NextResponse.json({ error: "Username and password are required" }, { status: 400 });
    }

    // const response = await fetch(`${apiUrl}/auth/login`, {
    //   method: "POST",
    //   headers: { "Content-Type": "application/json" },
    //   body: JSON.stringify({ username, password }),
    // });

    const apiClient = new ApiClient(apiUrl);
    const response = await apiClient.auth.login({
      loginRequest: {
        username,
        password,
      },
    });

    const isSecure = process.env.NODE_ENV === 'production';
    const cookieOptions = {
      secure: isSecure,
      httpOnly: true,
      sameSite: true,
      path: '/',
      maxAge: 86400,
    }

    if(!response.token) return NextResponse.json({ error: "Token missing!" }, { status: 500 });
    cookies().set('token', response.token, cookieOptions);

    return NextResponse.json({ user: response.user, token: response.token }, { 
      status: 200,
      headers: {
        'Set-Cookie': `token=${response.token}; ${isSecure ? 'Secure;' : ''} HttpOnly; SameSite=Strict; Path=/; Max-Age=86400;`
      }
    });

  } catch (error :any) {
    console.error("Login error", error);
    return NextResponse.json({ error: error.message || "Internal server error" }, { status: 500 });
  }
}