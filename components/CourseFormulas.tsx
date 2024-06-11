import React, { useState } from 'react';
import CourseFormulasCard from './CourseFormulasCard';
import SH1Text from './text/SH1Text';
import SH2Text from './text/SH2Text';
import InputTextBold from './text/InputTextBold';
import { Plus, Minus } from 'lucide-react';
import CoursePageTitles from './text/CoursePageTitles';
import H3Text from './text/H3Text';

interface CourseFormulasProps {
  courseFormulas: string;
  courseId: number;
  userDataBaseId: string;
}

const CourseFormulas: React.FC<CourseFormulasProps> = ({ courseFormulas, courseId, userDataBaseId }) => {
  const [isExpanded, setIsExpanded] = useState(true);

  const toggleExpansion = () => {
    if (isExpanded) {
      (window as any).dataLayer.push({
          event: "clickedCollapseFormulas",
  
          onPageOfCourse: courseId.toString(),
          userDataId: userDataBaseId,
  
          timestamp: new Date().toISOString(),
      });
    }
    setIsExpanded(!isExpanded);
  };

  if (!courseFormulas) {
    // If it's empty, return null to render nothing
    return null;
  }
  console.log('courseFormulas')
  console.log(courseFormulas)
  return (
    <div >
      <div>
        <div className="items-center justify-between">
          <div className="flex items-center">
            <H3Text text='Formulas' className='text-white'/>

            <button id="Course-Formulas-Expand-Collapse-Button" onClick={toggleExpansion}>
              {isExpanded ? (
                <Minus color='white' size={30} />
              ) : (
                  <Plus color='white' size={30} />
              )}
            </button>
          </div>
        </div>
        <div className="w-full">
          {isExpanded && (
            <CourseFormulasCard courseFormulas={courseFormulas} />
          )}
        </div>
        <div className="w-full h-[1px] bg-white my-8"></div>
      </div>
    </div>
  );
}

export default CourseFormulas;
