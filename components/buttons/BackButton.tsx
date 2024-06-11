"use client"
import { FC, HTMLAttributes } from 'react'
// Utils

import { useRouter } from 'next/navigation'
// Components

import { cn } from '@/utils/shadcn';
import { ChevronLeft } from 'lucide-react'
import ButtonText from '../text/ButtonText';

interface BackButtonProps {
  fill?: string;
  size?: number;
  className?: string;
}

const BackButton: React.FC<BackButtonProps> = ({ className, fill = 'black', size = 24 }) => {
  const goBack = () => {
    window.history.back(); // Go back to the previous page
  };

  return (
    // this button shows on mobile ONLY
    <main className={cn(`md:hidden pt-1`, className)}>
      {/* <main className={`pt-1 ${className}`}> */}
        <div className='z-10 bg-white w-fit rounded-xl flex items-center justify-center '>
        <button onClick={goBack} className='flex items-center'>
          <ChevronLeft size='24' className='text-themeColor pr-1' />
          <div className='hidden md:block items-center'>
            <ButtonText text='Back' className='pr-2 text-themeColor ' />
          </div>

        </button>
      </div>
    </main>





  );
};

export default BackButton;


