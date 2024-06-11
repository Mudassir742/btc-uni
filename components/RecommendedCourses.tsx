import React from 'react';
import SH1Text from './text/SH1Text';
import { AccessedCourse, Course, Educator } from '@/interfaces';
import YouTubeVideoCard from './YouTubeVideoCard';
import { hasUserCompletedCourse } from '@/app/courses/helper';


interface RecommendedCoursesProps {
  recommendedCourses: Course[];
  userDataAccessedCourses: AccessedCourse[];
  themeColor: string;
  userDataBaseId: string;
}

const RecommendedCourses: React.FC<RecommendedCoursesProps> = ({ recommendedCourses, userDataAccessedCourses, themeColor, userDataBaseId }) => {

  return (
    <div>

          <div className="flex items-center slider-container">

            <SH1Text text={`Recommended courses for you`} className="text-themeColor" />
         
          </div>
      
        <div className="space-under-category-titles" />
        <div className="flex overflow-x-auto space-x-4 slider-container">
        {/* <div className="flex overflow-y-hidden overflow-x-auto space-x-4 slider-container"> */}
          {recommendedCourses.map((course: Course) => (
            // <RecentlyReleasedCard 
            //   key={course?.slug || ""}
            //   educatorhandles={(course?.courseMetadata?.educators || []).map((educator: Educator) => educator?.educatorMetaData?.instahandle || "")} 
            //   courseTitle={course?.title || ""} 
            //   url={course?.slug || ""} 
            //   videoId={course?.courseMetadata?.vimeoPromoId || ""} />
            <YouTubeVideoCard
              userDataBaseId={userDataBaseId}
              key={course.slug}
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

export default RecommendedCourses;

