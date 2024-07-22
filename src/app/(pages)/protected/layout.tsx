import AuthChecker from "@/components/sections/auth-checker";

export default function Layout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {

    return (
        <>
            <AuthChecker />
            {children}
        </>
    );
}
