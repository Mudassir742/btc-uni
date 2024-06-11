"use client"
import { FC, HTMLAttributes } from 'react'
// Utils
import { cn } from '@/utils/shadcn'
import { usePathname, useRouter } from 'next/navigation'
// Components
import Link from 'next/link'
import { ChevronLeft } from 'lucide-react'
import ButtonText from '../text/ButtonText'


interface IProps extends HTMLAttributes<HTMLDivElement> {

}


const GoBackButton: FC<IProps> = ({ className, children, ...props }) => {
  const pathname = usePathname() || "";


  const { back } = useRouter()
  return (
    // Removed <main> tag, assuming it's not necessary here
    <>
      {!(pathname === '/') && (
        <div className='mx-auto container'>
          <div className={` z-10 pb-[24px] md:py-[32px]  bg-white w-fit rounded-xl flex items-center justify-center ${className}`}>
            <button className='flex items-center' onClick={() => back()}>
              <ChevronLeft size='24' className='text-themeColor pr-1' />
              <div className=' items-center'>
                <ButtonText text='Back' className='pr-2 text-themeColor ' />
              </div>
            </button>
          </div>
        </div>
       
      )}
    </>
  )
}

export default GoBackButton
