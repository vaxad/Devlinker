import ErrorSection from "@/components/sections/error";
import ApproveCategoryCard from "@/components/ui/approve-category-card";
import ApproveResourceCard from "@/components/ui/approve-resource-card";
import { getUnapprovedCategories } from "@/services/category";
import { getUnapprovedResources } from "@/services/resource";

export default async function Page() {
    const categories = await getUnapprovedCategories();
    const resources = await getUnapprovedResources();
    return categories && resources ? (
        <div className="flex flex-row w-full h-full gap-2">
            <div className="flex w-full flex-col gap-2 border border-foreground p-4 rounded-lg">
                <h1>Unapproved Categories</h1>
                <hr className="w-full bg-foreground" />
                {categories.map((category) => (
                    <ApproveCategoryCard key={category.id} category={category} />
                ))}
            </div>
            <div className="flex flex-col w-full gap-2 border border-foreground p-4 rounded-lg">
                <h1>Unapproved Resources</h1>
                <hr className="w-full bg-foreground" />
                {resources.map((resource) => (
                    <ApproveResourceCard key={resource.id} resource={resource} />
                ))}
            </div>
        </div>
    ) : (
        <ErrorSection />
    )
}
