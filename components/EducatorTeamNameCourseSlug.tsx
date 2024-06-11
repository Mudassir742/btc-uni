import React from 'react';

import EducatorTeamCard from './EducatorTeamCard';
import { EducatorAndTheirCourses } from '@/interfaces';
import EducatorTeamCardCourseSlug from './EducatorTeamCardCourseSlug';


interface EducatorTeamNameCourseSlugProps {
  userDataId: string;
  courseTitle: string;
  courseEducatorsAndTheirCourses: EducatorAndTheirCourses[];
  variant2?: true;
}

const EducatorTeamNameCourseSlug: React.FC<EducatorTeamNameCourseSlugProps> = ({ courseEducatorsAndTheirCourses, userDataId, courseTitle,variant2 }) => {
  const numberOfEducators = courseEducatorsAndTheirCourses.length;
  const educatorText = numberOfEducators === 1 ? 'Educator' : 'Educators';

  return (
    <div>
      {/* <div className='pb-6'>
        <InputTextBold text={educatorText} />
      </div> */}
      <div className='space-y-4'>
        {courseEducatorsAndTheirCourses.map((educator: EducatorAndTheirCourses) => (
          <EducatorTeamCardCourseSlug 
            key={educator.educator.slug} 
            educator={educator.educator} 
            numberOfCourses={educator.numberOfCourses}
            userDataId={userDataId}
            courseTitle={courseTitle}
            variant2={true}
            />
        ))}
      </div>

      {/* <div className="grey-line"/> */}
    </div>
  );
};

export default EducatorTeamNameCourseSlug;
 