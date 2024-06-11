import React from 'react';
import SH1Text from './text/SH1Text';
import { AccessedCourse, Course, Educator } from '@/interfaces';
import YouTubeVideoCard from './YouTubeVideoCard';
import { hasUserCompletedCourse } from '@/app/courses/helper';


interface CoursesStartedProps {
  coursesStartedAndNotFinished: Course[];
  userDataAccessedCourses: AccessedCourse[];
  themeColor: string;
  userDataBaseId: string;
}

const CoursesStarted: React.FC<CoursesStartedProps> = ({ coursesStartedAndNotFinished, userDataAccessedCourses, themeColor, userDataBaseId }) => {

  return (
    <div>

          <div className="flex items-center slider-container">

            <SH1Text text={`Continue Your Courses`} className="text-themeColor" />
         
          </div>
      
        <div className="space-under-category-titles" />
        <div className="flex overflow-x-auto space-x-4 slider-container">
        {/* <div className="flex overflow-y-hidden overflow-x-auto space-x-4 slider-container"> */}
          {coursesStartedAndNotFinished.map((course: Course, i) => (
            // <RecentlyReleasedCard 
            //   key={course?.slug || ""}
            //   educatorhandles={(course?.courseMetadata?.educators || []).map((educator: Educator) => educator?.educatorMetaData?.instahandle || "")} 
            //   courseTitle={course?.title || ""} 
            //   url={course?.slug || ""} 
            //   videoId={course?.courseMetadata?.vimeoPromoId || ""} />
            <YouTubeVideoCard
              userDataBaseId={userDataBaseId}
              key={i}
              course={course}
              completed={hasUserCompletedCourse(course?.databaseId, userDataAccessedCourses)}
              themeColor={themeColor}
              educators={(course?.courseMetadata?.educators || []).map((educator: Educator) => educator?.educatorMetaData?.instahandle || "")} />
          ))}
       
        </div>
    
      <div className='space-between-categories' />
    </div>
  );
}

export default CoursesStarted;

