"use client"

import { Button } from "./button"
import { CopyIcon } from "@radix-ui/react-icons"
import { useToast } from "./use-toast"

export default function CopyButton({ url }: { url: string }) {
    const { toast } = useToast();
    function handleCopy() {
        navigator.clipboard.writeText(url)
        toast({
            title: "Link Copied!",
            description: "The link has been copied to your clipboard."
        })
    }

    return (
        <Button title="Copy Link" onClick={handleCopy} className="p-2 border border-background active:scale-90 transition-transform">
            <CopyIcon className="w-6 h-6" />
        </Button>
    )
}
