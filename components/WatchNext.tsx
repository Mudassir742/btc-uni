import React from 'react';
import SH2Text from './text/SH2Text';
import Upcoming from './Upcoming';
import SH1Text from './text/SH1Text';
import B1Text from './text/B1Text';
import RelatedCourses from './RelatedCourses';
import { Course } from '@/interfaces';
import CoursePageTitles from './text/CoursePageTitles';
import SameSeries from './SameSeries';
import SameEducator from './SameEducator';
import MoreCoursesYouMayLike from './MoreCoursesYouMayLike';

interface WatchNextProps {
  upcomingCourses: Course[];
  // coursesFromTheSameSeries: Course[]; // make sure current course is removed // DEPRECATD for now, TO DO after launch,these courses already appear in relatedCourses below
  coursesFromTheSameEducator: Course[]; // make sure current course is removed
  relatedCourses: Course[]; // this should already have current course removed
  themeColor: string;
  educatorname: string[];
  userDataBaseId: string;
}


const WatchNext: React.FC<WatchNextProps> = ({ 
  upcomingCourses, 
  educatorname,
  themeColor, 
  // coursesFromTheSameSeries, 
  coursesFromTheSameEducator, 
  relatedCourses,
  userDataBaseId, }) => {
  return (

    <div className='max-w-[33rem]'>
      {/* courses from same series */}
      {/* <SameSeries coursesFromTheSameSeries={coursesFromTheSameSeries} themeColor={themeColor} /> */}

  

      {/* courses from same educator */}
      <SameEducator coursesFromTheSameEducator={coursesFromTheSameEducator} themeColor={themeColor} educator={educatorname}  userDataBaseId={userDataBaseId} />
      <div className='space-between-categories ' />


      {/* courses you may like, for now related courses */}
      <MoreCoursesYouMayLike relatedCourses={relatedCourses} themeColor={themeColor} userDataBaseId={userDataBaseId}/>

      <div className='space-between-categories ' />
      
            {/* upcoming courses */}
            <Upcoming upcomingCourses={upcomingCourses} themeColor={themeColor} userDataBaseId={userDataBaseId}/>

<div className='space-between-categories ' />

    </div>
  );
}

export default WatchNext;
