"use server";
import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';

export async function POST() {
  try {
    cookies().set('token', '');    
    return NextResponse.json({ message: "Logged out successfully" }, {
      status: 200,
      headers: {
        'Set-Cookie': `token=; Max-Age=;`
      }
    });
  } catch (error) {
    console.error("Logout error", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}