"use client"
import React, { Component, useEffect, useState } from 'react';
import Image from 'next/image';

import Link from 'next/link';
import FreeText from './text/FreeText';
import Checkmark from './icons/Checkmark';

import CardHandle from './text/CardHandle';
import CardTitle from './text/CardTitle';
import { Rating } from '@mui/material';
import { AccessedCourse, Course, UserData, Educator } from '@/interfaces';
import ParagraphText from './text/Paragraph';


const themeColor = "#523D34";
let imageWidth = 172; // Default for mobile
let imageHeight = 229; // Default for mobile


interface RelatedCoursesCardProps {
  course: Course;
  userData: UserData | null;
}


const RelatedCoursesCard: React.FC<RelatedCoursesCardProps> = ({ course, userData }) => {
  const [screenWidth, setScreenWidth] = useState(0);

  const currentUserData = userData;

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
    imageHeight = 324;
    imageWidth = 242
  }
  else {  
    imageHeight = 324;
    imageWidth = 242
  }


  if (!course) {
    return null;
  }

  const { title, courseMetadata, slug, databaseId } = course;
  const imageSrc = courseMetadata?.courseThumbnailPicture?.mediaItemUrl || '/placeholder.png';
  const durationOfCourse = courseMetadata?.courseDuration || "";
  const price = courseMetadata?.price?.toString() ?? "";
  const isCourseFree = price === "0";
  // const educatorHandle = courseMetadata?.maineducatorinstahandl || ""; // deprecated and replaced with all educator handles
  const educators = (courseMetadata?.educators || []).map((educator: Educator) => educator?.educatorMetaData?.instahandle || "");
  const amountOfReviews = courseMetadata?.noOfTestimonials || 0;
  const courseSlug = slug;
  const accessedCourses = currentUserData?.userDataMetadata?.accessedcourses || [];
  const completed = accessedCourses.some((accessedCourse) => {
    return ((accessedCourse.accessedcoursemetadata?.courseid || 0) === databaseId) && ((accessedCourse.accessedcoursemetadata?.status || "") === "completed");
  }); // to replace currentUserData with actual user data



  return (
    <div style={{ maxWidth: `${imageWidth}px` }}>
    <div className="bg-[#F8F4F2] rounded-md"  >
  

  
    
    <Link href={courseSlug}>
      <div style={{ position: 'relative', width: `${imageWidth}px`, height: 'auto' }}>
        {/* to do: checkmark & Overlay, will only appear if the user has completed the course. */}
        {completed && (
          <div
            style={{
              position: 'absolute',
              top: '0',
              left: '0',
              width: '100%',
              height: '100%',
              backgroundColor: 'rgba(255, 255, 255, 0.7)', // White with 70% opacity
              zIndex: '1', // Ensure it's above the image
            }}
          ></div>
        )}
        {/* Image */} 
        <Image
          src={imageSrc}
          alt={courseSlug}
          width={imageWidth}
          height={imageHeight}
          style={{
          
            maxWidth: '100%', // Add this line to limit the width to the specified size
            borderTopLeftRadius: '10px', // Adjust the radius as needed
            borderTopRightRadius: '10px', // Adjust the radius as needed
            overflow: 'hidden',
          }}
        />
        {/* <Duration /> */}
        {/* to do: this should only be there if the course is free and also show to people who are either not signed in or signed in with a free account. */}
        {/* in the conditional statement below, if the price is 0 it will show FREE */}
        {isCourseFree &&    <FreeText price="FREE" />}
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
    
<div className='pl-[8px]'>
  
   
    <CardTitle text={title} />
    {/* <CardHandle text={educatorHandle} /> */}
    {educators.length > 0 && (
      <CardHandle text={educators.join(', ')} className="text-gray-500" />
    )}
    <div className='flex'>


    <div className="flex">
    <Rating name="half-rating-read" defaultValue={5} precision={0.5} readOnly style={{ color: themeColor }} />

    </div>
    
    <div className='px-2 flex'>

                <ParagraphText text="(" className="text-themeColor" />
                <ParagraphText text={amountOfReviews.toString()} className="text-themeColor" />
                <ParagraphText text=")" className="text-themeColor" />
</div>
    </div>
    </div>
    </Link>
    </div>
  </div>
);
}

export default RelatedCoursesCard;