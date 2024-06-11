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
import CourseHeroReviewsComplete from './CourseHeroReviewsComplete';

let imageWidth = 60;
let imageHeight = 60;


interface EducatorTeamCardCourseSlugProps {
  userDataId: string;
  courseTitle: string;
  educator: Educator;
  numberOfCourses: number;
  variant2?: boolean;
}

const EducatorTeamCardCourseSlug: React.FC<EducatorTeamCardCourseSlugProps> = ({ userDataId, courseTitle, educator, numberOfCourses, variant2 }) => {

  const [screenWidth, setScreenWidth] = useState(0);
  const slug = educator?.slug || "";
  const courseText = numberOfCourses > 1 ? "Courses" : "Course";

  const onUserClick = () => {
    (window as any).dataLayer.push({
      event: "clickedEducator",

      onPageOfCourse: courseTitle,
      userDataId: userDataId,

      educatorName: educator?.educatorMetaData?.firstname + " " + educator?.educatorMetaData?.lastname,
      educatorHandle: educator?.educatorMetaData?.instahandle,

      timestamp: new Date().toISOString(),
    });
  }

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

      <Link id="Educator-Card-In-Course-Page" href={`/educator/${slug}`} className='w-full' onClick={onUserClick}>





        <div className='flex items-center text-center '>
          <Image
            src={educator?.educatorMetaData?.educatorpicture?.mediaItemUrl || "/placeholder.png"}
            alt={educator?.educatorMetaData?.instahandle || ""}
            width={imageWidth}
            height={imageHeight}

            className='rounded-full aspect-square object-cover'
          />


          {
            variant2 ?
              <>
                <div className='pl-2 w-full ml-auto place-items-end items-center '>
                  <div>
                    <div className='md:flex justify-between items-center'>
                      <div className='truncate'>
                        <ButtonText text={educator?.educatorMetaData?.instahandle || ""} className='text-secondarythemecolor' />
                      </div>
                      {/* Removed by hamzah on 28th march */}
                      {/* <CourseHeroReviewsComplete
                        params={{ slug: 'hybrid-toning-gray-coverage' }}
                        themeColor={'#523D34'} /> */}
                    </div>
                    <div className='flex justify-between items-center'>
                      <ParagraphText text={educator?.educatorMetaData?.firstname || ""} /> <ParagraphText text='&nbsp;' /> <ParagraphText text={educator?.educatorMetaData?.lastname || ""} />

                    {/* Added margin class by hamzah */}
                      <div className='items-center text-secondarythemecolor text-xs underline flex-grow justify-end pr-1 flex nowrap  -mt-5'>
                        {numberOfCourses} {courseText}
                      </div>
                    </div>
                  </div>

                </div>

              </>
              :

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

          }
        </div>

      </Link>
    </div>
  );
};

export default EducatorTeamCardCourseSlug;