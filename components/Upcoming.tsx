import React from 'react';
import SH2Text from './text/SH2Text';
import UpcomingCourseCard from './UpcomingCourseCard';
import SH1Text from './text/SH1Text';
import { Course, Educator } from '@/interfaces';
import YouTubeVideoCard from './YouTubeVideoCard';
import H3Text from './text/H3Text';
import YouTubeVideoCardUpcoming from './YouTubeVideoCardUpcoming';
import { is } from 'date-fns/locale';

interface UpcomingProps {
  upcomingCourses: Course[];
  themeColor: string;
  userDataBaseId: string;
}

const Upcoming: React.FC<UpcomingProps> = ({ upcomingCourses, themeColor, userDataBaseId }) => {
  const createUpcomingCourseCards = (courses: Course[]) => courses.map((course: Course) => (
    <div key={course.uri} className='w-full'>
      <YouTubeVideoCardUpcoming
        course={course}
        userDataBaseId={userDataBaseId}
        themeColor={themeColor}
        educators={(course?.courseMetadata?.educators || []).map((educator: Educator) => educator?.educatorMetaData?.instahandle || "")}
      />
    </div>
  ));
  // create the cards for each upcoming course
  const upcomingCards = createUpcomingCourseCards(upcomingCourses);
  if (upcomingCards.length === 0) {
    return null;
  }

  return (

  
    <div className=''>

      
      <div className="flex items-center slider-container md:pl-0">
     
      </div>
      <div className=''>
        <div className="md:flex overflow-x-auto">
          {upcomingCards}
         
        </div>
  </div>
     
    </div>
  );
}
export default Upcoming;
