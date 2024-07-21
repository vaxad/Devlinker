import Link from 'next/link'
import React from 'react'
import { ThemeToggle } from '../ui/theme-toggler'

export default function Topbar() {
    return (
        <div className='flex py-6 px-4 md:px-12 items-center justify-between fixed top-0 right-0 w-full bg-background text-foreground'>
            <div className='block md:hidden'>
            </div>
            <Link href='/'>
                <h1 className='text-2xl font-black'>DevLinks</h1>
            </Link>
            <div className='flex items-center gap-4'>
                <ThemeToggle />
            </div>
        </div>
    )
}
