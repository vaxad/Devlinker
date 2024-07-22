import { Button } from "@/components/ui/button";
import { getCategories } from "@/services/category";
import { Category } from "@prisma/client";
import Link from "next/link";

function CategoryBadge({ item }: { item: Category }) {

  return (
    <Button className="w-full text-center">
      {item.name}
    </Button>
  )
}

export default async function Home() {
  const categories = await getCategories();
  return (
    <div className="flex flex-col h-full flex-grow justify-center items-center p-4">
      <div className=" flex w-full justify-between border-b-2 border-gray-600 items-end">
        <h1 className="text-3xl md:text-4xl font-black">
          Welcome to <i className="text-blue-600">DevLinker</i>
        </h1>
        <i className="text-gray-600 text-lg hidden md:block">Your source for useful links</i>
      </div>
      <div className="flex flex-col w-full h-full justify-center items-center p-6">
        <h1 className="text-2xl font-bold">Browse through a collection of useful resources</h1>
        <p className="text-lg">DevLinker is a community-driven platform for sharing useful resources for developers.</p>
        <div className="grid grid-cols-1 md:grid-cols-3 w-full gap-4 py-4 h-[40vh] overflow-y-hidden relative">
          {(categories || []).map((category) => (<CategoryBadge key={category.id} item={category} />))}
          <div className="absolute bottom-0 right-0 flex w-full h-full bg-gradient-to-t from-background to-transparent">
          </div>
        </div>
        <div className="flex pt-8 flex-col md:flex-row justify-center items-center gap-4">
          <a href="https://github.com/vaxad/devlinker" target="_blank">
            <Button className=" font-semibold text-lg">
              View Repository
            </Button>
          </a>
          <Link href="/create">
            <Button className=" font-semibold text-lg">
              Add Resource
            </Button>
          </Link>
        </div>
      </div>
    </div>
  )
}
