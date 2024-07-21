"use client";
import { cn } from "@/lib/utils";
import Link, { LinkProps } from "next/link";
import React, { useState, createContext, useContext } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { IconBrandTabler, IconMenu2, IconX } from "@tabler/icons-react";
import { ChevronDownIcon } from "@radix-ui/react-icons";
import { useRouter } from "next/navigation";

interface Links {
    label: string;
    id: string;
    subCategories: {
        label: string;
        id: string;
    }[];
}

interface SidebarContextProps {
    open: boolean;
    setOpen: React.Dispatch<React.SetStateAction<boolean>>;
    animate: boolean;
}

const SidebarContext = createContext<SidebarContextProps | undefined>(
    undefined
);

export const useSidebar = () => {
    const context = useContext(SidebarContext);
    if (!context) {
        throw new Error("useSidebar must be used within a SidebarProvider");
    }
    return context;
};

export const SidebarProvider = ({
    children,
    open: openProp,
    setOpen: setOpenProp,
    animate = true,
}: {
    children: React.ReactNode;
    open?: boolean;
    setOpen?: React.Dispatch<React.SetStateAction<boolean>>;
    animate?: boolean;
}) => {
    const [openState, setOpenState] = useState(false);

    const open = openProp !== undefined ? openProp : openState;
    const setOpen = setOpenProp !== undefined ? setOpenProp : setOpenState;

    return (
        <SidebarContext.Provider value={{ open, setOpen, animate: animate }}>
            {children}
        </SidebarContext.Provider>
    );
};

export const Sidebar = ({
    children,
    open,
    setOpen,
    animate,
}: {
    children: React.ReactNode;
    open?: boolean;
    setOpen?: React.Dispatch<React.SetStateAction<boolean>>;
    animate?: boolean;
}) => {
    return (
        <SidebarProvider open={open} setOpen={setOpen} animate={animate}>
            {children}
        </SidebarProvider>
    );
};

export const SidebarBody = (props: React.ComponentProps<typeof motion.div>) => {
    return (
        <>
            <DesktopSidebar {...props} />
            <MobileSidebar {...(props as React.ComponentProps<"div">)} />
        </>
    );
};

export const DesktopSidebar = ({
    className,
    children,
    ...props
}: React.ComponentProps<typeof motion.div>) => {
    const { open, setOpen, animate } = useSidebar();
    return (
        <>
            <motion.div
                className={cn(
                    "h-[calc(100vh-5rem)]  px-4 py-4 hidden  md:flex md:flex-col w-[300px] flex-shrink-0 overflow-hidden",
                    className
                )}
                animate={{
                    width: animate ? (open ? "300px" : "60px") : "300px",
                }}
                onMouseEnter={() => setOpen(true)}
                onMouseLeave={() => setOpen(false)}
                {...props}
            >
                {children}
            </motion.div>
        </>
    );
};

export const MobileSidebar = ({
    className,
    children,
    ...props
}: React.ComponentProps<"div">) => {
    const { open, setOpen } = useSidebar();
    return (
        <>
            <div
                className={cn(
                    "h-10 px-4 py-4 fixed top-6 left-0 md:static flex flex-row md:hidden items-center justify-between w-fit md:w-full "
                )}
                {...props}
            >
                <div className="flex justify-end z-20 md:w-full w-fit">
                    <IconMenu2
                        className="text-neutral-800 dark:text-neutral-200"
                        onClick={() => setOpen(!open)}
                    />
                </div>
                <AnimatePresence>
                    {open && (
                        <motion.div
                            initial={{ x: "-100%", opacity: 0 }}
                            animate={{ x: 0, opacity: 1 }}
                            exit={{ x: "-100%", opacity: 0 }}
                            transition={{
                                duration: 0.3,
                                ease: "easeInOut",
                            }}
                            className={cn(
                                "fixed h-full w-full inset-0 bg-white dark:bg-neutral-900 p-10 z-[100] flex flex-col justify-between",
                                className
                            )}
                        >
                            <div
                                className="absolute right-4 top-4 z-50 text-neutral-800 dark:text-neutral-200"
                                onClick={() => setOpen(!open)}
                            >
                                <IconX />
                            </div>
                            {children}
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </>
    );
};

export const SidebarLink = ({
    link,
    className,
    ...props
}: {
    link: Links;
    className?: string;
    props?: LinkProps;
}) => {
    const { open, animate, setOpen } = useSidebar();
    const [expanded, setExpanded] = useState(false);
    function toggleExpanded() {
        setExpanded((prev) => !prev);
    }
    const router = useRouter();
    return (
        <div
            className={cn(
                "flex items-start justify-start gap-2  group/sidebar py-2 w-full",
                className
            )}
            {...props}
        >
            <IconBrandTabler className="text-neutral-700 dark:text-neutral-200 h-5 w-5 flex-shrink-0 mt-2" />

            <motion.span
                animate={{
                    display: animate ? (open ? "inline-block" : "none") : "inline-block",
                    opacity: animate ? (open ? 1 : 0) : 1,
                }}
                className="text-neutral-700 dark:text-neutral-200 text-sm group-hover/sidebar:translate-x-1 transition duration-150 whitespace-pre inline-block !p-0 !m-0 w-full"
            >
                <div className="flex flex-col w-full pr-6">
                    <button onClick={toggleExpanded} className="flex items-center justify-between w-full py-2 px-4 rounded-md dark:hover:bg-white dark:hover:text-neutral-700  hover:bg-neutral-700 hover:text-white">
                        {link.label}
                        <span>
                            <ChevronDownIcon className={` w-4 h-4 ${expanded ? "rotate-180" : ""} transition-[transform] duration-500 `} />
                        </span>
                    </button>
                    <div className={`overflow-hidden flex flex-col ${expanded ? "max-h-screen" : "max-h-0"} h-fit transition-all duration-500`}>
                        {link.subCategories.map((subCategory) => {
                            function handleClick() {
                                setOpen(false);
                                router.push(`/subcategory/${subCategory.id}`);
                            }
                            return (
                                <button onClick={handleClick} key={`subcategory-${link.id}`} className="flex w-full py-2 px-4 rounded-md dark:hover:bg-white dark:hover:text-neutral-700  hover:bg-neutral-700 hover:text-white">
                                    {subCategory.label}
                                </button>
                            );
                        })}
                    </div>
                </div>
            </motion.span>
        </div>
    );
};
