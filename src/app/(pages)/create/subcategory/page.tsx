import { CreateSubCategoryForm } from "@/components/sections/create-sub-category";
import ErrorSection from "@/components/sections/error";
import { getCategories } from "@/services/category";

export default async function Page() {
    const categories = await getCategories();
    return categories ? (
        <div className="flex h-full justify-center items-center">
            <CreateSubCategoryForm categories={categories} />
        </div>
    ) : (
        <ErrorSection />
    )
}
