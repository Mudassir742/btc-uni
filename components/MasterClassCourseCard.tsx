"use client";
import React, { Component, useEffect, useState } from 'react';
import Image from 'next/image';
import { Course, CourseBundle } from '@/interfaces';
import Link from 'next/link';

import Checkmark from './icons/Checkmark';

import CollectionPrice from './text/CollectionPrice';
import { Rating } from '@mui/material';

import CardHandle from './text/CardHandle';
import CardTitle from './text/CardTitle';
import ParagraphText from './text/Paragraph';
import DurationText from './text/Duration';
import CourseTitle from './text/CourseTitle';
import EducatorsName from './text/EducatorsName';

interface MasterClassCourseCardProps {
  courseBundle: CourseBundle;
}







let imageWidth = 172; // Default for mobile
let imageHeight = 229; // Default for mobile

const themeColor = "#523D34";
const CourseFree = true; // Define the value here


// to do: pull the completed dynamically
const completed = false;

const MasterClassCourseCard: React.FC<MasterClassCourseCardProps> = ({ courseBundle }) => {
  const [screenWidth, setScreenWidth] = useState(0);

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
    imageWidth = 327
  }
  else {
    imageWidth = 370
  }

  if (!courseBundle) {
    return null;
  }
  const { title, coursebundlemetadata, slug } = courseBundle;
  const pictureUrl = coursebundlemetadata?.thumbnailPicture?.mediaItemUrl || '/placeholder.png';
  const priceOfCourseBundle = (coursebundlemetadata?.actualprice || 9999).toString();
  const amountOfCourses = (coursebundlemetadata?.coursesinbundle || []).length;
  const amountOfReviews = (coursebundlemetadata?.coursesinbundle || []).map((course: Course) => (
    course.courseMetadata?.noOfTestimonials || 0
  )).reduce((accumulator, currentValue) => accumulator + currentValue, 0);



  return (
    <main style={{ width: `${imageWidth}px` }}>






      <div style={{ position: 'relative', width: `${imageWidth}px`, height: 'auto' }}>
        <div className="rounded-xl border border-border shadow-lg "  >
          <Link href={`/collections/${slug}`}>
            <div className="relative" >


              {/* Image */}

              <div className="!w-full object-contain relative pb-[56.25%] h-0 overflow-hidden ">

                <Image
                  src={pictureUrl}
                  alt={slug}
                  // fill={true}
                  width={imageWidth}
                  height={1000}
                  className="object-contain rounded-t-xl  "

                />
              </div>

              <div className={`absolute top-2 right-2 z-1`}>
                {priceOfCourseBundle !== "9999" && (
                  <DurationText text={"$" + priceOfCourseBundle} />
                )}
              </div>






              {/* to do: this should only be there if the course is free and also show to people who are either not signed in or signed in with a free account. */}

              {/* to do: checkmark & Overlay, will only appear if the user has completed the course. */}
              {completed && (
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
              )}
            </div>

            <div className="inline-block">





              <div className='pt-[12px] pb-[12px] pr-[8px] pl-[8px]'>
                <CourseTitle text={title} />

                <div className='flex'>
                  <EducatorsName text={amountOfCourses.toString()} />
                  <EducatorsName text='&nbsp;Courses' />
                </div>

                {amountOfReviews>0 && (
                <div className='flex'>
                  <div className="flex">
                    <Rating name="half-rating-read" defaultValue={5} precision={0.5} readOnly style={{ color: themeColor }} />
                  </div>
                  <div className='flex items-center'>
                    <div className='px-2 flex'>

                      <ParagraphText text="(" className="text-themeColor" />
                      <ParagraphText text={amountOfReviews.toString()} className="text-themeColor underline" />
                      <ParagraphText text=")" className="text-themeColor" />
                    </div>
                  </div>
                </div>
                )}

              </div>

            </div>

          </Link>
        </div>
      </div>
    </main>
  );
};

export default MasterClassCourseCard;
// /* to do: everything for this course card, also this needs to go to a unique page for masterclasses and not an indivual course page)