"use client";
import React, { Component, useEffect, useState } from 'react';
import Image from 'next/image';
import T1Text from './text/T1Text';
import SH4Text from './text/SH4Text';
import { Educator } from '@/interfaces';
import EducatorsHandle from './text/EducatorsHandle';
import EducatorsName from './text/EducatorsName';
import Link from 'next/link';
import ParagraphSmall from './text/ParagraphSmall';
import ButtonText from './text/ButtonText';
import ParagraphText from './text/Paragraph';

let imageWidth = 60;
let imageHeight = 60;


interface EducatorTeamCardProps {
  educator: Educator;
  numberOfCourses: number;
}

const EducatorTeamCard: React.FC<EducatorTeamCardProps> = ({ educator, numberOfCourses }) => {

  const [screenWidth, setScreenWidth] = useState(0);
  const slug = educator?.slug || "";
  const courseText = numberOfCourses > 1 ? "Courses" : "Course";

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


  if (screenWidth < 768) {
    imageHeight = 60;
    imageWidth = 60;

  }
  else {
    imageHeight = 70;
    imageWidth = 70;

  }



  return (
    <div className='min:w-[300px] max:w-[500px] w-full' >

      <Link href={`/educator/${slug}`} className='w-full'>





        <div className='flex items-center text-center '>
          <Image
            src={educator?.educatorMetaData?.educatorpicture?.mediaItemUrl || "/placeholder.png"}
            alt={educator?.educatorMetaData?.instahandle || ""}
            width={imageWidth}
            height={imageHeight}

            className='rounded-full aspect-square object-cover'
          />





          <div className='pl-2 w-full ml-auto place-items-end items-center '>
            <div>

              <div className='flex w-full'>
                <div className='truncate'>
                  <ButtonText text={educator?.educatorMetaData?.instahandle || ""} className='text-secondarythemecolor' />
                </div>
                <div className='items-center text-secondarythemecolor text-xs underline flex-grow justify-end pr-1 flex nowrap'>

                  {numberOfCourses} {courseText}

                </div>
              </div>


              <div className='flex '>
                <ParagraphText text={educator?.educatorMetaData?.firstname || ""} /> <ParagraphText text='&nbsp;' /> <ParagraphText text={educator?.educatorMetaData?.lastname || ""} />
              </div>

            </div>



          </div>
        </div>

      </Link>
    </div>
  );
};

export default EducatorTeamCard;