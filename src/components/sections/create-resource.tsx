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
import { CreateResourceData } from "@/lib/types"
import { useEffect, useState } from "react"
import { toast } from "../ui/use-toast"
import { useRouter } from "next/navigation"
import { Category, SubCategory } from "@prisma/client"
import { createSubcategory } from "@/services/subcategory"
import SelectComponent from "./select"
import { createResource, createResourceRequest } from "@/services/resource"

export function CreateResourceForm({ categories, subCategories }: { categories: Category[], subCategories: SubCategory[] }) {
    const router = useRouter();
    const [resource, setResource] = useState<CreateResourceData>({
        description: "",
        name: "",
        categoryId: "",
        subCategoryId: "",
        url: ""
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

    function handleResourceChange(e: React.ChangeEvent<HTMLInputElement>) {
        setResource({
            ...resource,
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
        if (resource.categoryId === "") {
            toast({
                title: "Error!",
                description: "Please elect a category first."
            })
            return;
        }
        if (resource.subCategoryId === "") {
            toast({
                title: "Error!",
                description: "Please elect a subcategory first."
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
        const res = await createResource({ data: resource });
        if (!res) {
            return toast({
                title: "Error!",
                description: "An error occurred while creating the resource."
            })
        }
        const res2 = await createResourceRequest({
            data: {
                name: storedProfileJson.name,
                email: storedProfileJson.email,
                github: storedProfileJson.github,
                resourceId: res.id
            }
        })
        if (!res2) {
            return toast({
                title: "Error!",
                description: "An error occurred while creating the resource request."
            })
        }
        toast({
            title: "Success!",
            description: "Resource created successfully."
        })
        router.push("/")
    }

    const selectCategoryData = categories.map((item) => ({
        label: item.name,
        value: item.id
    }))

    const selectSubCategoryData = subCategories.filter((item) => item.categoryId === resource.categoryId).map((item) => ({
        label: item.name,
        value: item.id
    }))

    console.log({ subCategories, selectSubCategoryData, resource })

    function checkSubCategory(categoryId: string) {
        // if (categoryId === "" || resource.categoryId === "") return;
        const selectedSubCategory = subCategories.find((item) => item.categoryId === categoryId && item.id === resource.subCategoryId);
        if (!selectedSubCategory) {
            setResource((prev) => ({
                ...prev,
                categoryId,
                subCategoryId: ""
            }))
        } else {
            setResource((prev) => ({
                ...prev,
                categoryId
            }))
        }
    }


    return (
        <form onSubmit={handleSubmit}>
            <Card className="w-full max-w-sm">
                <CardHeader>
                    <CardTitle className="text-2xl">Submit your Resource</CardTitle>
                    <CardDescription>
                        Enter resource details below.
                    </CardDescription>
                </CardHeader>
                <CardContent className="grid gap-4">
                    <div className="grid gap-2">
                        <Label htmlFor="name">Name</Label>
                        <Input id="name" type="name" name="name" required placeholder="web dev" value={resource.name} onChange={handleResourceChange} />
                    </div>
                    <div className="grid gap-2">
                        <Label htmlFor="description">Description</Label>
                        <Input id="description" type="description" name="description" required placeholder="its cool" value={resource.description} onChange={handleResourceChange} />
                    </div>
                    <div className="grid gap-2">
                        <Label htmlFor="url">Link</Label>
                        <Input id="url" type="url" name="url" required placeholder="https://js.org/" value={resource.url} onChange={handleResourceChange} />
                    </div>

                    <div className="grid gap-2">
                        <Label htmlFor="category">Category</Label>
                        <SelectComponent<string> data={selectCategoryData} placeholder="Select a category" value={resource.categoryId} setValue={(val: string) => checkSubCategory(val)} />
                    </div>
                    <div className="grid gap-2">
                        <Label htmlFor="subcategory">SubCategory</Label>
                        <SelectComponent<string> data={selectSubCategoryData} placeholder="Select a subcategory" value={resource.subCategoryId} setValue={(val: string) => setResource((prev) => ({
                            ...prev,
                            subCategoryId: val
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
