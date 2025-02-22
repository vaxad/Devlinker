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
import { CreateCategoryData, CreateResourceRequestData } from "@/lib/types"
import { useEffect, useState } from "react"
import { toast } from "../ui/use-toast"
import { useRouter } from "next/navigation"
import { createCategory, createCategoryRequest } from "@/services/category"

export function CreateCategoryForm() {
    const router = useRouter();
    const [categoryData, setCategoryfData] = useState<CreateCategoryData>({
        description: "",
        name: "",
    })

    function handleNoProfile() {
        toast({
            title: "Error!",
            description: "Please fill Profile Details first."
        })
        router.push("/create/profile");
    }

    useEffect(() => {
        const storedSelfData = localStorage.getItem("devlinker-selfData");
        if (storedSelfData) {
            const storedSelfDataJson = (JSON.parse(storedSelfData));
            if (!storedSelfDataJson.email || !storedSelfDataJson.name) {
                return handleNoProfile();
            }
        } else {
            return handleNoProfile();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    function handleCategoryDataChange(e: React.ChangeEvent<HTMLInputElement>) {
        setCategoryfData({
            ...categoryData,
            [e.target.name]: e.target.value
        })
    }

    function handleError() {
        toast({
            title: "Error!",
            description: "Please fill Profile Details first."
        })
        router.push("/create/profile");
    }

    async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        const storedProfile = localStorage.getItem("devlinker-selfData");
        if (!storedProfile) {
            return handleError();
        }
        const storedProfileJson = JSON.parse(storedProfile);
        if (!storedProfileJson.email || !storedProfileJson.name) {
            return handleError();
        }
        const res = await createCategory({ data: categoryData });
        console.log({ categoryData })
        if (!res) {
            return toast({
                title: "Error!",
                description: "An error occurred while creating the category."
            })
        }
        const res2 = await createCategoryRequest({
            data: {
                name: storedProfileJson.name,
                email: storedProfileJson.email,
                categoryId: res.id,
                github: storedProfileJson.github,
            }
        })
        if (!res2) {
            return toast({
                title: "Error!",
                description: "An error occurred while creating the category request."
            })
        }
        toast({
            title: "Success!",
            description: "Category created successfully."
        })
        router.push("/");
    }

    return (
        <form onSubmit={handleSubmit} className="min-w-[50vh]">
            <Card className="w-full max-w-sm">
                <CardHeader>
                    <CardTitle className="text-2xl">Submit your Category</CardTitle>
                    <CardDescription>
                        Enter category details below.
                    </CardDescription>
                </CardHeader>
                <CardContent className="grid gap-4">
                    <div className="grid gap-2">
                        <Label htmlFor="name">Name</Label>
                        <Input id="name" type="name" name="name" required placeholder="web dev" value={categoryData.name} onChange={handleCategoryDataChange} />
                    </div>
                    <div className="grid gap-2">
                        <Label htmlFor="description">Description</Label>
                        <Input id="description" type="description" name="description" required placeholder="its cool" value={categoryData.description} onChange={handleCategoryDataChange} />
                    </div>
                </CardContent>
                <CardFooter>
                    <Button type="submit" className="w-full">Submit</Button>
                </CardFooter>
            </Card>
        </form>
    )
}
