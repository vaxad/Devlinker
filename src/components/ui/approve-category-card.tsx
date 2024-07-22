import { Category } from "@prisma/client"
import ApproveCategoryButton from "./approve-category-button"

export default function ApproveCategoryCard({ category }: { category: Category }) {

    return (
        <div className="flex flex-col h-full justify-between flex-grow p-4 rounded-md gap-2 border border-foreground hover:bg-foreground hover:text-background transition-[background-color,color,border-color,transform] ">
            <h2 className="text-lg font-semibold">{category.name}</h2>
            <p className="text-sm font-light text-ellipsis">{category.description}</p>
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                    <ApproveCategoryButton id={category.id} />
                </div>
            </div>
        </div>
    )
}
