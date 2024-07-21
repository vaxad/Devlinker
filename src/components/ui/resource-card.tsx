"use client"

import { Resource } from "@prisma/client"
import { IconArrowBadgeDown, IconArrowBadgeDownFilled, IconArrowBadgeUp, IconArrowBadgeUpFilled } from "@tabler/icons-react"
import { Button } from "./button"
import { downvoteResource, upvoteResource } from "@/services/resource"
import { useEffect, useState } from "react"
import { dedupe } from "@/lib/utils"
import { ArrowTopRightIcon } from "@radix-ui/react-icons"

export default function ResourceCard({ resource }: { resource: Resource }) {
    const [upvotes, setUpvotes] = useState<string[]>([])
    const [downvotes, setDownvotes] = useState<string[]>([])
    const liked = upvotes.includes(resource.id)
    const disliked = downvotes.includes(resource.id)
    const votes = resource.upvotes - resource.downvotes + (liked ? 1 : 0) - (disliked ? 1 : 0)

    useEffect(() => {
        const likes = localStorage.getItem('devlinks-resource-upvotes')
        const dislikes = localStorage.getItem('devlinks-resource-downvotes')
        if (likes) {
            setUpvotes(JSON.parse(likes))
        }
        if (dislikes) {
            setDownvotes(JSON.parse(dislikes))
        }
    }, [])


    async function handleLikeResource() {
        if (liked) {
            return;
        } else {
            setUpvotes(() => {
                const likes = localStorage.getItem('devlinks-resource-upvotes')
                const prev = likes ? JSON.parse(likes) : []
                const updated = dedupe([...prev, resource.id])
                localStorage.setItem('devlinks-resource-upvotes', JSON.stringify(updated))
                return updated;
            })
        }
        if (disliked) {
            setDownvotes(() => {
                const dislikes = localStorage.getItem('devlinks-resource-downvotes')
                const prev = dislikes ? JSON.parse(dislikes) : []
                const updated = dedupe(prev.filter((id: string) => id !== resource.id)) as string[]
                localStorage.setItem('devlinks-resource-downvotes', JSON.stringify(updated))
                return updated;
            })
        }
        await upvoteResource({ id: resource.id });
    }

    async function handleDislikeResources() {
        if (disliked) {
            return;
        } else {
            setDownvotes(() => {
                const dislikes = localStorage.getItem('devlinks-resource-downvotes')
                const prev = dislikes ? JSON.parse(dislikes) : []
                const updated = dedupe([...prev, resource.id])
                localStorage.setItem('devlinks-resource-downvotes', JSON.stringify(updated))
                return updated;
            })
        }
        if (liked) {
            setUpvotes(() => {
                const likes = localStorage.getItem('devlinks-resource-upvotes')
                const prev = likes ? JSON.parse(likes) : []
                const updated = dedupe(prev.filter((id: string) => id !== resource.id)) as string[]
                localStorage.setItem('devlinks-resource-upvotes', JSON.stringify(updated))
                return updated;
            })
        }
        await downvoteResource({ id: resource.id });
    }
    return (
        <div className="flex flex-col h-full justify-between flex-grow p-4 rounded-md gap-2 border border-foreground ">
            <h2 className="text-lg font-semibold">{resource.name}</h2>
            <p className="text-sm font-light text-ellipsis">{resource.description}</p>
            <div className="flex items-center justify-between">
                <div className="flex gap-4 items-center">
                    <button onClick={handleLikeResource} className="flex items-center p-2 bg-foreground text-background rounded-md">
                        {!liked ? <IconArrowBadgeUp className="w-4 h-4 " /> : <IconArrowBadgeUpFilled className="w-4 h-4 " />}

                    </button>
                    <button onClick={handleDislikeResources} className="flex items-center p-2 bg-foreground text-background rounded-md">
                        {!disliked ? <IconArrowBadgeDown className="w-4 h-4" /> : <IconArrowBadgeDownFilled className="w-4 h-4" />}
                    </button>
                    <span className="ml-2">{votes}</span>
                </div>
                <a href={resource.url} target="_blank">
                    <Button>
                        Visit
                        <span className="ml-2">
                            <ArrowTopRightIcon />
                        </span>
                    </Button>
                </a>
            </div>
        </div>
    )
}
