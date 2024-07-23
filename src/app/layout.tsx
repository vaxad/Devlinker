import type { Metadata } from "next";
import { Instrument_Sans as FontSans } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import { ThemeProvider } from "@/components/ui/theme-provider"
import Topbar from "@/components/sections/topbar";
import { getCategoriesWithSubCategories } from "@/services/category";
import ErrorSection from "@/components/sections/error";
import { SidebarSection } from "@/components/sections/sidebar";
import { Toaster } from "@/components/ui/toaster"
import { ScrollArea } from "@/components/ui/scroll-area";
import { metadata as defaultMetadata } from "../../public/data/metadata";

const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
})

export const revalidate = 0;

export const metadata: Metadata = defaultMetadata;

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const data = await getCategoriesWithSubCategories();

  return (
    <html lang="en" suppressHydrationWarning>
      <body className={cn(
        "min-h-screen bg-background font-sans antialiased",
        fontSans.variable
      )}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <main className="h-screen flex flex-col overflow-hidden">
            <Topbar />
            {
              data ?
                <div className="flex flex-row h-[calc(100vh-5rem)] mt-[5rem]">
                  <div className="z-40">
                    <SidebarSection data={data} />
                  </div>
                  <ScrollArea className="flex w-full h-[calc(100vh-5rem)] overflow-y-auto z-0 ">
                    {children}
                    <Toaster />
                  </ScrollArea>
                </div>
                :
                <ErrorSection />
            }
          </main>
        </ThemeProvider>
      </body>
    </html>
  );
}
