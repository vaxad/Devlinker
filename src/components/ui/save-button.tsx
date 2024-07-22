"use client"

import { useEffect, useState } from "react"
import { Button } from "./button"
import { dedupe } from "@/lib/utils"
import { BookmarkFilledIcon, BookmarkIcon } from "@radix-ui/react-icons"
import { useToast } from "./use-toast"

export default function SaveButton({ id }: { id: string }) {
    const [savedPosts, setSavedPosts] = useState<string[]>([])
    const { toast } = useToast()
    const saved = savedPosts.includes(id)
    useEffect(() => {
        const savedPosts = localStorage.getItem("devlinker-savedPosts")
        if (savedPosts) {
            setSavedPosts(JSON.parse(savedPosts))
        }
    }, [])

    function handleSave() {
        const savedPostsObj = localStorage.getItem("devlinker-savedPosts")
        const savedPosts = savedPostsObj ? JSON.parse(savedPostsObj) : [] as string[]
        let newSavedPosts = savedPosts;
        if (saved) {
            newSavedPosts = dedupe(savedPosts.filter((postId: string) => postId !== id))
            toast({
                title: "Unsaved!",
                description: "The post has been unsaved locally."
            })
        } else {
            newSavedPosts = dedupe([...savedPosts, id])
            toast({
                title: "Saved!",
                description: "The post has been saved locally."
            })
        }
        localStorage.setItem("devlinker-savedPosts", JSON.stringify(newSavedPosts));
        setSavedPosts(newSavedPosts)


    }

    return (
        <Button title="Bookmark" onClick={handleSave} className="p-2 border border-background active:scale-90 transition-transform">
            {saved ?
                <BookmarkFilledIcon className="w-6 h-6" />
                : <BookmarkIcon className="w-6 h-6" />
            }
        </Button>
    )
}
