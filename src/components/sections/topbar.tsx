import Link from 'next/link'
import React from 'react'
import { ThemeToggle } from '../ui/theme-toggler'
import { Button } from '../ui/button'
import { PlusIcon } from '@radix-ui/react-icons'

export default function Topbar() {
    return (
        <div className='flex py-6 px-4 md:px-12 items-center justify-between fixed top-0 right-0 w-full bg-background text-foreground'>
            <div className='block md:hidden'>
            </div>
            <Link href='/'>
                <h1 className='text-2xl font-black'>DevLinker</h1>
            </Link>
            <div className='flex items-center gap-4'>
                <Link href={'/create'}>
                    <Button className='p-1 aspect-square hover:bg-background hover:text-foreground transition-[background-color,color] border border-foreground' title='Add resources'>
                        <PlusIcon className=' w-6 h-6' />
                    </Button>
                </Link>
                <ThemeToggle />
            </div>
        </div>
    )
}
