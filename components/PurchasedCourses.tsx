import React from 'react';
import SH1Text from './text/SH1Text';
import { AccessedCourse, Course, Educator } from '@/interfaces';
import YouTubeVideoCard from './YouTubeVideoCard';
import { hasUserCompletedCourse } from '@/app/courses/helper';
import ParagraphText from './text/Paragraph';


interface PurchasedCoursesProps {
  purchasedCourses: Course[];
  userDataAccessedCourses: AccessedCourse[];
  themeColor: string;
  userDataBaseId: string;
}

const PurchasedCourses: React.FC<PurchasedCoursesProps> = ({ purchasedCourses, userDataAccessedCourses, themeColor, userDataBaseId }) => {

  return (
    <div>
      <div className='space-between-categories' />
     
          <div className="flex items-center slider-container">
        <SH1Text text={`Purchased Courses`} />
       

        {/* <ParagraphText text='We are aware and working on a solution that not all your purchased courses may be showing up here. Rest assured, you should still have access to them by searching for either the course or collection name. We are working on a solution so that they all appear here soon. Thank you for your patience.' />           */}
        </div>
      
        <div className="space-under-category-titles" />
        <div className="flex overflow-x-auto space-x-4 slider-container">
        {/* <div className="flex overflow-y-hidden overflow-x-auto space-x-4 slider-container"> */}
          {purchasedCourses.map((course: Course) => (
            // <RecentlyReleasedCard 
            //   key={course?.slug || ""}
            //   educatorhandles={(course?.courseMetadata?.educators || []).map((educator: Educator) => educator?.educatorMetaData?.instahandle || "")} 
            //   courseTitle={course?.title || ""} 
            //   url={course?.slug || ""} 
            //   videoId={course?.courseMetadata?.vimeoPromoId || ""} />
            <YouTubeVideoCard
              key={course.slug}
              course={course}
              completed={hasUserCompletedCourse(course?.databaseId, userDataAccessedCourses)}
              themeColor={themeColor}
              educators={(course?.courseMetadata?.educators || []).map((educator: Educator) => educator?.educatorMetaData?.instahandle || "")}
              userDataBaseId={userDataBaseId} />
          ))}
       
        </div>
    
      <div className='space-between-categories' />
    </div>
  );
}

export default PurchasedCourses;

