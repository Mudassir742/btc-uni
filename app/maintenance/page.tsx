import { Metadata } from 'next'
import React from 'react';
import Maintenance from '/public/maintenance.png';
import Image from 'next/image';


export const metadata: Metadata = {
  title: 'Maintenance',
  robots: {
    index: false
  }

}

const Page = () => {
  return (
    <main className='wrapper text-center  bg-white -mt-20 !z-20 relative pt-20 '>
      <h1 className='text-3xl sm:text-4xl text-blackV1 font-semibold'>The website is under maintenance!</h1>
      <p className='mt-5 max-w-xl mx-auto text-gray-500  text-lg sm:text-xl !leading-[1.7]'>We are updating BTC University. There will be downtime May 8th from 12am-3am CST</p>
      {/* <Image src={Maintenance} alt='Maintenance' width={500} height={500} className='mx-auto mt-10' /> */}
    </main>
  )
}

export default Page
