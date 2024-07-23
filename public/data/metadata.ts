import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Devlinker",
    description: "A platform where developers can share and discover useful links, organized by categories and subcategories.",
    keywords: [
        "developer links",
        "web development resources",
        "programming links",
        "developer tools",
        "coding resources",
        "frontend development",
        "backend development",
        "full-stack development",
        "Next.js",
        "TypeScript",
        "Prisma",
        "Tailwind CSS",
    ],
    authors: [{
        name: "Varad Prabhu",
        url: "https://varadprabhu.vercel.app"
    }],
    creator: "Varad Prabhu",
    openGraph: {
        title: "Devlinker",
        type: "website",
        url: "https://devlinker.vercel.app",
        description: "Share and discover useful developer links categorized and subcategorized for easy navigation.",
        siteName: "Devlinker",
        images: [
            {
                url: "https://devlinker.vercel.app/assets/logo.png",
                width: 128,
                height: 128,
                alt: "Devlinker",
            },
        ],
    },
    twitter: {
        card: "summary_large_image",
        site: "@vaxaddev",
        title: "Devlinker",
        description: "Share and discover useful developer links categorized and subcategorized for easy navigation.",
        images: [
            {
                url: "https://pbs.twimg.com/media/GTKBzJoXEAApsrM?format=jpg",
                alt: "Devlinker",
            },
        ],
    },
}