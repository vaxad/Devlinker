import { Resource } from "@prisma/client"
import { Button } from "./button"
import { ArrowTopRightIcon } from "@radix-ui/react-icons"
import ApproveResourceButton from "./approve-resource-button"

export default function ApproveResourceCard({ resource }: { resource: Resource }) {

    return (
        <div className="flex flex-col h-full justify-between flex-grow p-4 rounded-md gap-2 border border-foreground hover:bg-foreground hover:text-background transition-[background-color,color,border-color,transform] ">
            <h2 className="text-lg font-semibold">{resource.name}</h2>
            <p className="text-sm font-light text-ellipsis">{resource.description}</p>
            <div className="flex items-center justify-between gap-2">
                <div className="flex items-center gap-4">
                    <ApproveResourceButton id={resource.id} />
                </div>
                <a href={resource.url} target="_blank" className="w-full">
                    <Button title={`Visit ${resource.url}`} className="hover:bg-background w-full group hover:text-foreground border-background border transition-[background-color,color,border-color]">
                        <span className=" group-hover:scale-125 transition-transform">
                            <ArrowTopRightIcon />
                        </span>
                    </Button>
                </a>
            </div>
        </div>
    )
}
