"use server";
import { apiUrl } from '@/setupEnv';
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const { email } = await request.json();

    if (!email) {
      return NextResponse.json({ error: "Email is required" }, { status: 400 });
    }

    const response = await fetch(`${apiUrl}/auth/forgot-password`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email }),
    });

    if (!response.ok) {
      return NextResponse.json({ error: "Failed to send email!" }, { status: response.status });
    }

    return NextResponse.json({ message: "Email sent successfully!" }, {
      status: 200,
    });
  } catch (error) {
    console.error("Forgot Password error", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}