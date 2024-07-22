import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function NotFound() {
    return (
        <div className="flex justify-center items-center h-[calc(100vh-5rem)] ">
            <div className="flex w-fit h-fit flex-col justify-center items-center text-center gap-4">
                <h1 className="text-2xl md:text-4xl lg:6xl font-bold">Where ya headin&apos; mate?</h1>
                <p>The route you&apos;re trying to go does not exist</p>
                <Link href="/" className=" py-4">
                    <Button type="button">Go to Home</Button>
                </Link>
            </div>
        </div>
    )
}
