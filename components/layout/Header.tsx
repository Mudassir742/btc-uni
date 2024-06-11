import React, { Suspense } from 'react'
import Navigations from './Navigations'
import MainHeader from './MainHeader'
import TagLine from './TagLine'
import Hamburger from './Hamburger'
import { Skeleton } from '../ui/Skeleton'

const Header = () => {

  return (
    <>
      {/* <Hamburger className='md:hidden' /> */}
      {/* <TagLine /> */}
      <div className='z-30 bg-white'>
        <Suspense fallback={
          <Skeleton className='h-[4.25rem] w-full  bg-gray-200' />
        }>
          <MainHeader className='w-72 !z-30' />
        </Suspense>
      </div>
      <Navigations className='hidden md:block' />
    </>
  )
}

export default Header