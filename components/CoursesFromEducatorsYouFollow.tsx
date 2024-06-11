import React from 'react';
import SH1Text from './text/SH1Text';
import { AccessedCourse, Course, Educator } from '@/interfaces';
import YouTubeVideoCard from './YouTubeVideoCard';
import { hasUserCompletedCourse } from '@/app/courses/helper';
import H3Text from './text/H3Text';


interface CoursesFromEducatorsYouFollowProps {
  coursesFromEducatorsYouFollow: Course[];
  userDataAccessedCourses: AccessedCourse[];
  themeColor: string;
  userDataBaseId: string;
}

const CoursesFromEducatorsYouFollow: React.FC<CoursesFromEducatorsYouFollowProps> = ({ coursesFromEducatorsYouFollow, userDataAccessedCourses, themeColor, userDataBaseId }) => {
  return (
    <div>

      <div className="flex items-center slider-container">

        <SH1Text text={`Courses From Your Saved Educators`}  />

      </div>

      <div className="space-under-category-titles" />
      <div className="flex overflow-x-auto space-x-4 slider-container ">
        {/* <div className="flex overflow-y-hidden overflow-x-auto space-x-4 slider-container"> */}
        {coursesFromEducatorsYouFollow.map((course: Course, i) => (
          // <RecentlyReleasedCard 
          //   key={course?.slug || ""}
          //   educatorhandles={(course?.courseMetadata?.educators || []).map((educator: Educator) => educator?.educatorMetaData?.instahandle || "")} 
          //   courseTitle={course?.title || ""} 
          //   url={course?.slug || ""} 
          //   videoId={course?.courseMetadata?.vimeoPromoId || ""} />
          <YouTubeVideoCard
            key={course?.slug ?? i}
            userDataBaseId={userDataBaseId}
            course={course}
            completed={hasUserCompletedCourse(course?.databaseId, userDataAccessedCourses)}
            themeColor={themeColor}
            educators={(course?.courseMetadata?.educators || []).map((educator: Educator) => educator?.educatorMetaData?.instahandle || "")} />
        ))}

 

      </div>

      {/* {coursesFromEducatorsYouFollow.length > 0 && (
   more than 0
      )} */}



      <div className='space-between-categories' />
    </div>
  );
}

export default CoursesFromEducatorsYouFollow;

