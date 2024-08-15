"use server";
// import { apiUrl } from '@/setupEnv';
import { NextResponse } from 'next/server';
import { ApiClient } from '@asfilab/janun-client';

const apiUrl = process.env.API_URL || 'localhost:3000';

export async function POST(request: Request) {
  try {
    const { email } = await request.json();

    if (!email) {
      return NextResponse.json({ error: "Email is required" }, { status: 400 });
    }

    // const response = await fetch(`${apiUrl}/auth/forgot-password`, {
    //   method: "POST",
    //   headers: { "Content-Type": "application/json" },
    //   body: JSON.stringify({ email }),
    // });

    const apiClient = new ApiClient(apiUrl);
    const response = await apiClient.auth.forgotPassword({forgotPasswordRequest: {email}});

    return NextResponse.json({ message: response.message ||"Email sent successfully!" }, {
      status: 200,
    });
  } catch (error:any) {
    console.error("Forgot Password error", error);
    return NextResponse.json({ error: error.message ||"Internal server error" }, { status: 500 });
  }
}