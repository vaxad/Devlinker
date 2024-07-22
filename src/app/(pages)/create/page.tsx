import { CodeIcon } from "@radix-ui/react-icons";
import Link from "next/link";

function Card({ title, description, url }: { title: string, description: string, url: string }) {
    return (
        <Link href={url} className="flex flex-row h-full rounded-lg border border-foreground p-4">
            <div className="w-1/3 flex h-full justify-center items-center p-2">
                <CodeIcon className="w-full h-full " />
            </div>
            <div className="w-2/3 flex flex-col gap-2 justify-center ">
                <h1 className="text-2xl font-semibold">{title}</h1>
                <p className="text-sm font-light">{description}</p>
            </div>
        </Link>
    )
}
export default function Page() {
    const data: { title: string, description: string, url: string }[] = [
        {
            title: "Resource",
            description: "Create a resource to share with the community",
            url: "/create/resource"
        },
        {
            title: "Subcategory",
            description: "Create a subcategory to organize resources",
            url: "/create/subcategory"
        },
        {
            title: "Category",
            description: "Create a category to organize subcategories",
            url: "/create/category"
        }
    ]
    return (
        <div className="flex min-h-[calc(100vh-10rem)] flex-grow justify-center items-center">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 h-fit p-4">
                {data.map((item, index) => <Card key={index} title={item.title} description={item.description} url={item.url} />)}
            </div>
        </div>
    )
}
