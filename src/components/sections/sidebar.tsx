/* eslint-disable @next/next/no-img-element */
"use client";
import React, { useState } from "react";
import { Sidebar, SidebarBody, SidebarLink } from "../ui/sidebar";
import { ScrollArea } from "../ui/scroll-area";
import { GetCategoriesWithSubCategories } from "@/lib/types";
import { MagnifyingGlassIcon } from "@radix-ui/react-icons";
import { Input } from "../ui/input";

export function SidebarSection({ data: allData }: { data: GetCategoriesWithSubCategories }) {

    const [open, setOpen] = useState(false);
    const [search, setSearch] = useState("");

    const data = search ? [...allData].filter((category) => {
        return category.name.toLowerCase().includes(search.toLowerCase()) || category.subCategories.some((subCategory) => subCategory.name.toLowerCase().includes(search.toLowerCase()))
    }) : allData;
    const links = data.map((category) => {
        const subCategories = category.subCategories.map((subCategory) => {
            return {
                label: subCategory.name,
                id: subCategory.id
            }
        })
        return {
            label: category.name,
            id: category.id,
            subCategories: subCategories
        }
    })
    return (
        <Sidebar open={open} setOpen={setOpen}>
            <SidebarBody className="justify-between gap-2">
                {open ? <TopSection search={search} setSearch={setSearch} /> : <TopIcon />}
                <ScrollArea className="flex flex-col flex-1 overflow-y-auto pr-2">
                    <div className="mt-4 flex flex-col gap-2">
                        {links.map((link, idx) => (
                            <SidebarLink key={idx} link={link} />
                        ))}
                    </div>
                </ScrollArea>
            </SidebarBody>
        </Sidebar>
    );
}
const TopSection = ({ search, setSearch }: { search: string, setSearch: (str: string) => void }) => {
    return (
        <div className="font-normal flex items-center gap-2 ">
            {/* <MagnifyingGlassIcon className="w-6 h-6 p-1 rounded-md bg-white text-neutral-700" /> */}
            <Input className="w-full" value={search} onChange={(e) => { setSearch(e.target.value) }} placeholder="Search here" />
        </div>
    );
};

const TopIcon = () => {
    return (
        <MagnifyingGlassIcon className="w-6 h-6 p-1 rounded-md dark:bg-white bg-black text-neutral-300 dark:text-neutral-700" />
    );
};

