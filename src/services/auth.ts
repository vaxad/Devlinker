"use server"

import { AuthResponse, LoginData } from "@/lib/types";

export async function login({ data }: { data: LoginData }): Promise<AuthResponse | null> {
    try {
        const email = process.env.EMAIL_SECRET;
        const password = process.env.PASSWORD_SECRET;
        const authToken = process.env.AUTH_TOKEN;
        if (data.email === email && data.password === password && authToken) {
            return { authToken }
        }
        return null;
    } catch (error) {
        console.error(error);
        return null;
    }
}

export async function isLoggedIn({ authToken }: { authToken: string }): Promise<boolean> {
    try {
        const storedAuthToken = process.env.AUTH_TOKEN;
        if (authToken === storedAuthToken) {
            return true;
        }
        return false;
    } catch (error) {
        console.error(error);
        return false;
    }
}