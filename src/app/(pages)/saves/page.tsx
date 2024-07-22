"use client"
import ResourceCard from "@/components/ui/resource-card";
import { getResourcesByIds } from "@/services/resource"
import { Resource } from "@prisma/client";
import { useEffect, useState } from "react";

export default function Page() {
    const [savedPosts, setSavedPosts] = useState<Resource[]>([]);

    async function getSavedPosts({ ids }: { ids: string[] }) {
        const res = await getResourcesByIds({ ids });
        setSavedPosts(res);
    }
    useEffect(() => {
        const savedPosts = localStorage.getItem('devlinker-savedPosts');
        if (savedPosts) {
            const savedPostsObj = JSON.parse(savedPosts);
            if (savedPostsObj.length) {
                getSavedPosts({ ids: savedPostsObj });
            }
        }
    }, [])

    return (
        <div className="flex flex-col h-full">
            <div className="flex flex-col py-6 px-6">
                <h1 className="text-2xl font-semibold">Saves</h1>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 px-4 pb-4">
                {savedPosts.map((resource) => <ResourceCard key={resource.id} resource={resource} />)}
            </div>
        </div>
    )
}
