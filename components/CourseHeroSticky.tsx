import React, { useEffect } from 'react';
import { getCourseAll, extractCourseAll } from '@/app/courses/helper';
import '@/styles/globals.css';
import CourseHeroStickyClient from './CourseHeroStickyClient';

interface CourseHeroStickyProps {
  params: { slug: string };
  duration: string;
  theCourseTitle: string;
  
}

const CourseHeroSticky: React.FC<CourseHeroStickyProps> = async ({
  params,
  duration,
  theCourseTitle,


}) => {


  const courseAllProm = getCourseAll(params);


  const courseAll = await courseAllProm;




  const {
    courseDetailPicture,
    videoTrailerId,
    courseSlug,

   

    
  } = extractCourseAll(courseAll);


  const courseLink = "https://www.btcuniversity.com/courses/" + courseSlug;

  return (
    <div>
      <CourseHeroStickyClient
        duration={duration}
        theCourseTitle={theCourseTitle}
        courseDetailPicture={courseDetailPicture}
        videoTrailerId={videoTrailerId}
           />
    </div>
  );
}

export default CourseHeroSticky;

