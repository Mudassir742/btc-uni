"use client";
import Link from 'next/link'
import React from 'react'
import { nav } from '@/lib/constants'
import { cn } from '@/utils/shadcn'
import { usePathname } from 'next/navigation';

interface IProp {
  className: string
}

const Navigations = ({ className }: IProp) => {
  const path = usePathname();
  let slugFromUrl = path?.split('/')[1];
  return (
    <div className={cn('bg-themecolor-50 ', !className)}>

      {/* Desktop */}
      <div className='hidden md:block'>
        <div className=' px-3  overflow-x-scroll custom-scrollbar mx-auto '>

          <div className=' flex mx-auto  gap-x-6  w-fit'>
            {
              nav.map(nav => (
                <div
                  key={nav.slug}
                  className=' duration-300 group relative'>
                  <Link className={cn('text-14  h-16 text-themecolor-500 group-hover:text-secondarythemecolor flex items-center   whitespace-nowrap font-semibold', {
                    "!text-secondarythemecolor": slugFromUrl === nav.slug
                  })}
                    href={`/${nav.slug}`}>
                    {nav.name}
                  </Link>
               
                </div>
              ))
            }
          </div>
        </div>
      </div>

    </div>
  )
}

export default Navigations