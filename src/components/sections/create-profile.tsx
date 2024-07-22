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
import { CreateResourceRequestData } from "@/lib/types"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"

export function CreateProfileForm() {
    const router = useRouter();
    const [selfData, setSelfData] = useState<CreateResourceRequestData>({
        email: "",
        name: "",
        github: "",
        resourceId: ""
    })

    useEffect(() => {
        const storedSelfData = localStorage.getItem("devlinker-selfData");
        if (storedSelfData) {
            const storedSelfDataJson = (JSON.parse(storedSelfData));
            if (storedSelfDataJson.email && storedSelfDataJson.name) {
                setSelfData(storedSelfDataJson)
            }
        }
    }, [])


    function handleChangeSelfData(e: React.ChangeEvent<HTMLInputElement>) {
        setSelfData({
            ...selfData,
            [e.target.name]: e.target.value
        })
    }

    function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        localStorage.setItem("devlinker-selfData", JSON.stringify(selfData));
        router.back();
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
                        <Input id="email" type="email" name="email" placeholder="x@gmail.com" required value={selfData.email} onChange={handleChangeSelfData} />
                    </div>
                    <div className="grid gap-2">
                        <Label htmlFor="name">Name</Label>
                        <Input id="name" type="name" name="name" required placeholder="joe mama" value={selfData.name} onChange={handleChangeSelfData} />
                    </div>

                    <div className="grid gap-2">
                        <Label htmlFor="github">Github Username <sub>{"(optional)"}</sub></Label>
                        <Input id="github" type="github" name="github" required placeholder="joe_mama" value={selfData.github || ""} onChange={handleChangeSelfData} />
                    </div>
                </CardContent>
                <CardFooter>
                    <Button type="submit" className="w-full">Submit</Button>
                </CardFooter>
            </Card>
        </form>
    )
}
