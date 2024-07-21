import ErrorSection from "@/components/sections/error";
import ResourceCard from "@/components/ui/resource-card";
import { getResourcesBySubcategory } from "@/services/resource"
import { getSubcategory } from "@/services/subcategory";

export default async function Page({ params: { id: subCategoryId } }: { params: { id: string } }) {
    const subCategory = await getSubcategory({ id: subCategoryId });
    const resources = await getResourcesBySubcategory({ subCategoryId });
    return resources.length && subCategory ? (
        <div className="flex flex-col h-full">
            <div className="flex flex-col py-6 px-6">
                <h1 className="text-2xl font-semibold">{subCategory.name}</h1>
                <p className="text-sm font-light">{subCategory.description}</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 px-4 pb-4">
                {resources.map((resource) => <ResourceCard key={resource.id} resource={resource} />)}
            </div>
        </div>
    ) : (
        <ErrorSection />
    )
}
