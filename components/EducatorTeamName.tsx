import React from 'react';

import EducatorTeamCard from './EducatorTeamCard';
import { EducatorAndTheirCourses } from '@/interfaces';


interface EducatorTeamNameProps {
  courseEducatorsAndTheirCourses: EducatorAndTheirCourses[]
}

const EducatorTeamName: React.FC<EducatorTeamNameProps> = ({ courseEducatorsAndTheirCourses }) => {
  const numberOfEducators = courseEducatorsAndTheirCourses.length;
  const educatorText = numberOfEducators === 1 ? 'Educator' : 'Educators';

  return (
    <div>
      {/* <div className='pb-6'>
        <InputTextBold text={educatorText} />
      </div> */}
      <div className='space-y-4'>
        {courseEducatorsAndTheirCourses.map((educator: EducatorAndTheirCourses) => (
          <EducatorTeamCard key={educator.educator.slug} educator={educator.educator} numberOfCourses={educator.numberOfCourses} />
        ))}
      </div>

      {/* <div className="grey-line"/> */}
    </div>
  );
};

export default EducatorTeamName;
 