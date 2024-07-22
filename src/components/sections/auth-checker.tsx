"use client"
import { isLoggedIn } from "@/services/auth";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function AuthChecker() {
    const router = useRouter();

    async function checkAuth({ authToken }: { authToken: string }) {
        const isVerified = await isLoggedIn({ authToken });
        if (!isVerified) {
            router.push("/auth");
        }
    }
    useEffect(() => {
        const authToken = localStorage.getItem("devlinker-auth-token");
        if (!authToken) {
            router.push("/auth");
            return;
        }
        checkAuth({ authToken });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return (
        <>
        </>
    )
}
