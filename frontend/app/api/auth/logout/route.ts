import { NextResponse } from 'next/server';

export async function POST() {
  try {
    const clearCookie = 'token=; Path=/; Expires=Thu, 01 Jan 1970 00:00:00 GMT; HttpOnly; Secure; SameSite=Strict';
    
    return NextResponse.json({ message: "Logged out successfully" }, {
      status: 200,
      headers: {
        'Set-Cookie': clearCookie
      }
    });
  } catch (error) {
    console.error("Logout error", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}