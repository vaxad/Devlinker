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
import { CreateSubcategoryData } from "@/lib/types"
import { useEffect, useState } from "react"
import { toast } from "../ui/use-toast"
import { useRouter } from "next/navigation"
import { Category } from "@prisma/client"
import { createSubcategory } from "@/services/subcategory"
import SelectComponent from "./select"

export function CreateSubCategoryForm({ categories }: { categories: Category[] }) {
    const router = useRouter();
    const [subCategoryData, setSubCategoryData] = useState<CreateSubcategoryData>({
        description: "",
        name: "",
        categoryId: ""
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

    function handleSubCategoryDataChange(e: React.ChangeEvent<HTMLInputElement>) {
        setSubCategoryData({
            ...subCategoryData,
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
        if (subCategoryData.categoryId === "") {
            toast({
                title: "Error!",
                description: "Please elect a category first."
            })
            return;
        }
        if (!storedProfile) {
            return handleError();
        }
        const storedProfileJson = JSON.parse(storedProfile);
        if (!storedProfileJson.email || !storedProfileJson.name) {
            return handleError();
        }
        const res = await createSubcategory({ data: subCategoryData });
        if (!res) {
            return toast({
                title: "Error!",
                description: "An error occurred while creating the subcategory."
            })
        }
        toast({
            title: "Success!",
            description: "SubCategory created successfully."
        })
        router.push("/")
    }

    const selectCategoryData = categories.map((item) => ({
        label: item.name,
        value: item.id
    }))

    return (
        <form onSubmit={handleSubmit}>
            <Card className="w-full max-w-sm">
                <CardHeader>
                    <CardTitle className="text-2xl">Submit your SubCategory</CardTitle>
                    <CardDescription>
                        Enter subcategory details below.
                    </CardDescription>
                </CardHeader>
                <CardContent className="grid gap-4">
                    <div className="grid gap-2">
                        <Label htmlFor="name">Name</Label>
                        <Input id="name" type="name" name="name" required placeholder="web dev" value={subCategoryData.name} onChange={handleSubCategoryDataChange} />
                    </div>
                    <div className="grid gap-2">
                        <Label htmlFor="description">Description</Label>
                        <Input id="description" type="description" name="description" required placeholder="its cool" value={subCategoryData.description} onChange={handleSubCategoryDataChange} />
                    </div>
                    <div className="grid gap-2">
                        <Label htmlFor="category">Category</Label>
                        <SelectComponent<string> data={selectCategoryData} placeholder="Select a category" value={subCategoryData.categoryId} setValue={(val: string) => setSubCategoryData((prev) => ({
                            ...prev,
                            categoryId: val
                        }))} />
                    </div>
                </CardContent>
                <CardFooter>
                    <Button type="submit" className="w-full">Submit</Button>
                </CardFooter>
            </Card>
        </form>
    )
}
