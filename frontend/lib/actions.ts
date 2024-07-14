"use server";
import { cookies } from "next/headers";

export async function getUserToken() {
    const token = cookies().get("token");
    if(!token) {
        return null;
    }
    return token.value;
}