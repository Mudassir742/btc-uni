import React from 'react';
import FinishedLookCard from './FinishedLookCard';
import SH2Text from './text/SH2Text';
import Formulas from './icons/Formulas';
import B1Text from './text/B1Text';
import he from 'he';
import ParagraphText from './text/Paragraph';


interface CourseFomrulasCardProps {
  courseFormulas: string;
}

const  CourseFormulasCard: React.FC<CourseFomrulasCardProps> = ({ courseFormulas }) => {

  if (!courseFormulas) {
    return null; // Handle the case where youWillLearn is undefined or null
  }
  
  // removing html entities from content
  // const formattedContent = he.decode(courseFormulas).replace(/<\/?p>/g, '').split('<br />').join('\n');
  // above deprecated, we are using (for now)
  const modifiedCourseFormulas = courseFormulas.replace(/(<ul[^>]*)>/g, '$1 class="list-disc pl-5">');

  return (
    <div className="w-full">

<ParagraphText text={modifiedCourseFormulas} color='white'/>


    </div>
  );
}

export default CourseFormulasCard;



