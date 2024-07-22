import { CreateResourceForm } from "@/components/sections/create-resource";
import ErrorSection from "@/components/sections/error";
import { getCategories } from "@/services/category";
import { getSubcategories } from "@/services/subcategory";

export default async function Page() {
    const categories = await getCategories();
    const subCategories = await getSubcategories();
    return categories && subCategories ? (
        <div className="flex h-full justify-center items-center">
            <CreateResourceForm subCategories={subCategories} categories={categories} />
        </div>
    ) : (
        <ErrorSection />
    )
}
