import CreateCategoryForm from "@/components/sections/create-category";

export default function Page() {
    return (
        <div className="flex flex-col p-4">
            <h1 className="text-2xl font-semibold">Create Category</h1>
            <div className="flex flex-col h-full">
                <CreateCategoryForm />
            </div>
        </div>
    )
}
