import type { Metadata } from "next";
import { Inter as FontSans } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import { ThemeProvider } from "@/components/ui/theme-provider"
import Topbar from "@/components/sections/topbar";
import { getCategoriesWithSubCategories, getCategoriesWithSubCategoriesAndResources } from "@/services/category";
import ErrorSection from "@/components/sections/error";
import { SidebarSection } from "@/components/sections/sidebar";
import { getSubcategoriesByCategory } from "@/services/subcategory";
import { ScrollArea } from "@/components/ui/scroll-area";

const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
})

export const metadata: Metadata = {
  title: "DevLinks",
  description: "A collection of useful links for developers",
};

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
                  <SidebarSection data={data} />
                  <ScrollArea className="flex h-[calc(100vh-5rem)] overflow-y-auto ">
                    {children}
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
