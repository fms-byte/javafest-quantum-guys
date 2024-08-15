"use server";
import { NextResponse } from "next/server";
import { ApiClient } from "@asfilab/janun-client";

const apiUrl = process.env.API_URL || 'localhost:3000';
const apiClient = new ApiClient(apiUrl);

export async function GET(request: Request) {
    try {
        const url = new URL(request.url);
        const username = url.searchParams.get('username');

        if (!username) {
            return NextResponse.json({ error: "Username is required" }, { status: 400 });
        }

        const response = await apiClient.auth.checkUsername({ username });

        return NextResponse.json(response, { status: 200 });
    } catch (error: any) {
        console.error("Check username error", error);
        return NextResponse.json({ error: error.message || "Internal server error" }, { status: 500 });
    }
};
