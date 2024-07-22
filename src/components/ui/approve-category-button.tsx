"use client"

import { CheckIcon } from "@radix-ui/react-icons"
import { Button } from "./button"
import { toast } from "./use-toast";
import { approveCategory } from "@/services/category";

export default function ApproveCategoryButton({ id }: { id: string }) {
    async function handleApprove() {
        const authToken = localStorage.getItem("devlinker-auth-token");
        if (!authToken) {
            return;
        }
        const res = await approveCategory({ id, authToken });
        if (res) {
            toast({
                description: "The resource has been approved."
            })
        }

    }
    return (
        <Button title="Approve" onClick={handleApprove} className="py-2 px-6 border border-background active:scale-90 transition-transform">
            <CheckIcon className="w-6 h-6" />
        </Button>
    )
}
