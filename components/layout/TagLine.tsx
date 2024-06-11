import Link from 'next/link'
import React from 'react'

const TagLine = () => {
  return (
    <div className='bg-themeColor text-white relative z-20'>
      <div className='wrapper'>
        <div className='flex justify-center items-center gap-x-5 py-2'>
          {/* <p className='hidden md:block text-16'>Lorem Ipsum is simply dummy text of the printing and typesetting industry.</p> */}
          <Link href={'/bulk-subscription'} className='underline'>Gift A Subscription</Link>
        </div>
      </div>
    </div>
  )
}

export default TagLine