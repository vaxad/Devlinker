"use client"
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

export default function ErrorSection() {
    const router = useRouter();
    function handleRefresh() {
        router.refresh();
    }
    return (
        <div className="flex justify-center items-center  h-[calc(100vh-5rem)]">
            <div className="flex w-fit h-fit flex-col gap-4">
                <h1 className="text-2xl md:text-4xl lg:6xl font-bold">Oopsie Doopsie!</h1>
                <p>Some error occurred on the client-side.</p>
                <Button type="button" className="py-4" onClick={handleRefresh}>Refresh</Button>
            </div>
        </div>
    )
}
