import React from 'react';
import Link from 'next/link';
import ParagraphText from './text/Paragraph';

import { Button } from './ui/Button';
import H3Text from './text/H3Text';


// interface CourseSubCallOutProps {
//   userSubscribed: boolean;
// }

// const CourseSubCallOut: React.FC<CourseSubCallOutProps> = ({ userSubscribed }) => {
//   if (userSubscribed) {
//     return null;
//   }



const CourseSubCallOut = () => {
  return (
    <div className='py-4'>
      <div className='container m-auto bg-themecolor-500 rounded-xl justify-center'>
        <div className='py-8 px-6 items-center md:flex'>

          <div className='md:w-[755px] md:mx-auto '>
            <div className='flex items-center'>
              <H3Text
                text='Are you ready to level up?'
                className='text-white'
              />
            </div>

            <div className='mx-auto py-2 text-white'>
              <ParagraphText text='Subscribe today & gain access to the largest and most current online education in the industry. Pick the plan that’s right for you. Cancel anytime.' className='text-white' />
            </div>
          </div>


          <div className='md:flex md:justify-center items-center w-1/2 md:w-[200px] md:mx-auto pt-4 md:pt-0'>
            <Link href='/subscribe'>
              <Button variant='white'>Subscribe Now</Button>
            </Link>
          </div>
          <div className="space-under-category-titles" />
        </div>
      </div>
    </div>
   
  
  );
};

export default CourseSubCallOut;

// to do: should only show if not an active paid subscriber 