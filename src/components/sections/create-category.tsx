import { Category, CategoryRequest } from '@prisma/client'
import React from 'react'
import { useForm } from 'react-hook-form'
import { z } from "zod"
import { Button } from "@/components/ui/button"
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"

type x = CategoryRequest

const categoryformSchema = z.object({
    name: z.string().min(2).max(50),
    description: z.string().min(2).max(500),
})

export default function CreateCategoryForm() {
    const form = useForm<z.infer<typeof categoryformSchema>>({
        defaultValues: {
            description: "",
            name: ""
        },
    })

    function onSubmit(values: z.infer<typeof categoryformSchema>) {
        // Do something with the form values.
        // ✅ This will be type-safe and validated.
        console.log(values)
    }
    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Name</FormLabel>
                            <FormControl>
                                <Input placeholder="Backend" {...field} />
                            </FormControl>
                            <FormDescription>
                                Enter Name of the Category.
                            </FormDescription>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="description"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Description</FormLabel>
                            <FormControl>
                                <Input placeholder="This field revolves around..." {...field} />
                            </FormControl>
                            <FormDescription>
                                Enter Description of the Category.
                            </FormDescription>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <Button type="submit">Submit</Button>
            </form>
        </Form>
    )
}
