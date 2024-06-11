import React from 'react';
import SH1Text from './text/SH1Text';
import { AccessedCourse, Course, Educator } from '@/interfaces';
import YouTubeVideoCard from './YouTubeVideoCard';
import { hasUserCompletedCourse } from '@/app/courses/helper';
import H3Text from './text/H3Text';


interface CoursesYouBookmarkedProps {
  coursesYouBookmarked: Course[];
  userDataAccessedCourses: AccessedCourse[];
  themeColor: string;
  userDataBaseId: string;
}

const CoursesYouBookmarked: React.FC<CoursesYouBookmarkedProps> = ({ coursesYouBookmarked, userDataAccessedCourses, themeColor, userDataBaseId }) => {

  return (
    <div>

          <div className="flex items-center slider-container">

        < SH1Text text={`Saved Courses`}  />
         
          </div>
      
      <div className="space-under-category-titles" />
      <div className='slider-container'>
        <div className="overflow-x-auto flex">
          {/* <div className="flex overflow-y-hidden overflow-x-auto space-x-4 slider-container"> */}
          {coursesYouBookmarked.map((course: Course) => (
            // <RecentlyReleasedCard 
            //   key={course?.slug || ""}
            //   educatorhandles={(course?.courseMetadata?.educators || []).map((educator: Educator) => educator?.educatorMetaData?.instahandle || "")} 
            //   courseTitle={course?.title || ""} 
            //   url={course?.slug || ""} 
            //   videoId={course?.courseMetadata?.vimeoPromoId || ""} />
            <YouTubeVideoCard
              key={course.slug}
              userDataBaseId={userDataBaseId}
              course={course}
              completed={hasUserCompletedCourse(course?.databaseId, userDataAccessedCourses)}
              themeColor={themeColor}
              educators={(course?.courseMetadata?.educators || []).map((educator: Educator) => educator?.educatorMetaData?.instahandle || "")} />
          ))}

        </div>
      </div>
     
    
      <div className='space-between-categories' />
    </div>
  );
}

export default CoursesYouBookmarked;

