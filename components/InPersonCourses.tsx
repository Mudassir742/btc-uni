"use client";
import React, { Component, useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';

import ProfileCourseTitle from './text/ProfileCourseTitle copy';
import ProfileDateorSubCat from './text/ProfileDateorSubCat';





interface InPersonCoursesProps {

  inPersonPrice: string;
  
  inPersonCourseTitle: string;
  inPersonCity: string;
  inPersonImageSrc: string;
  inPersonLink: string;
  inPersonDate: string;
  inPersonState: string;
  themeColor: string;
}

const InPersonCourses: React.FC<InPersonCoursesProps> = ({

  inPersonPrice,  
  inPersonCourseTitle,
  inPersonCity,
  inPersonImageSrc,
  inPersonLink,
  inPersonDate,
  inPersonState,
  themeColor,
}) => {
  const [screenWidth, setScreenWidth] = useState(0);
  let imageWidth = 113;
  let imageHeight = 86;
  let containerWidth = 326;

  useEffect(() => {
    // Check if we are on the client side before accessing the window object.
    if (typeof window !== 'undefined') {
      setScreenWidth(window.innerWidth);
    }

    // Add an event listener to update the screenWidth when the window is resized
    const handleResize = () => {
      setScreenWidth(window.innerWidth);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  // Conditionally update imageWidth, imageHeight, and containerWidth based on screenWidth
  if (screenWidth >= 768) {
    imageWidth = 225;
    imageHeight = 173;
    containerWidth = 687;
  }


  return (
    <div className={`w-${containerWidth}`}>
    <Link href="/courses" className="flex items-center">
      <div className="relative">
        <div className="py-4">
          <Image
            src={inPersonImageSrc}
            alt="Course Image"
            width={imageWidth}
            height={imageHeight}
              className="object-cover rounded-xl"
          />
        </div>
   

          {/* to do: this should only be there if the course is free and also show to people who are either not signed in or signed in with a free account. */}
          {/* {CourseFree && <FreeText price={price} />} */}
          {/* to do: checkmark & Overlay, will only appear if the user has completed the course. */}
          {/* {completed && (
              <div
                style={{
                  zIndex: '2',
                  position: 'absolute',
                  top: '50%',
                  left: '50%',
                  transform: 'translate(-50%, -50%)',
                  width: '58px',
                  height: '58px',
                  borderRadius: '50%',
                  borderColor: 'white',
                  backgroundColor: 'white', // Set background color to white
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <Checkmark fill={'#C4A18D'} width={40} height={40} />
              </div>
            )} */}
        </div>

        <div className="items-center">
          <div className='bg-white px-4'>


            <ProfileCourseTitle text={inPersonCourseTitle} />
            <div className='flex md:pt-4 items-center'>
  <ProfileDateorSubCat text={inPersonDate} className='text-gray-500' />
  <span className='flex items-center text-gray-500 mx-2'>&bull;</span>
  <ProfileDateorSubCat text={inPersonCity} className='text-gray-500'/>   <ProfileDateorSubCat text=',&nbsp;' className='text-gray-500'/>  <ProfileDateorSubCat text={inPersonState} className='text-gray-500'/>

</div>


            {/* <div className="flex pt-1">
            
                  <Rating name="half-rating-read" defaultValue={5} precision={0.5} readOnly style={{ color: customColor }} size="small" />
<div className="flex pl-[8px] items-center">
                   
                   <ParagraphText
     text="("
     className="text-themeColor" 
/> 
<ParagraphText
  text={testimonials.toString()}
  className="text-themeColor"
/>

<ParagraphText
     text=")"
     className="text-themeColor" 
/> 


                  </div>
             
              </div> */}
          </div>

        </div>



      </Link>
      <div className="w-full h-[1px] bg-gray-500"></div>
    </div>
  );
};

export default InPersonCourses;
