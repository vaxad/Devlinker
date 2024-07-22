"use client"
import { Button } from "@/components/ui/button"
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { LoginData } from "@/lib/types"
import { login } from "@/services/auth"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import { toast } from "../ui/use-toast"

export function AuthForm() {
    const router = useRouter();
    const [authData, setAuthData] = useState<LoginData>({
        email: "",
        password: ""
    })

    function handleChangeAuthData(e: React.ChangeEvent<HTMLInputElement>) {
        setAuthData({
            ...authData,
            [e.target.name]: e.target.value
        })
    }

    async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        const res = await login({ data: authData });
        if (!res) {
            toast({
                title: "Error!",
                description: "Invalid credentials"
            })
            return;
        }
        localStorage.setItem("devlinker-auth-token", res.authToken);
        router.push('/protected');
    }

    return (
        <form onSubmit={handleSubmit} className="min-w-[50vh]">
            <Card className="w-full max-w-sm">
                <CardHeader>
                    <CardTitle className="text-2xl">Give some details.</CardTitle>
                    <CardDescription>
                        Enter your email below.
                    </CardDescription>
                </CardHeader>
                <CardContent className="grid gap-4">
                    <div className="grid gap-2">
                        <Label htmlFor="email">Email</Label>
                        <Input id="email" type="email" name="email" placeholder="x@gmail.com" required value={authData.email} onChange={handleChangeAuthData} />
                    </div>
                    <div className="grid gap-2">
                        <Label htmlFor="password">Password</Label>
                        <Input id="password" type="password" name="password" required placeholder="********" value={authData.password} onChange={handleChangeAuthData} />
                    </div>
                </CardContent>
                <CardFooter>
                    <Button type="submit" className="w-full">Submit</Button>
                </CardFooter>
            </Card>
        </form>
    )
}
