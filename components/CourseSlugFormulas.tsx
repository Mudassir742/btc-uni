import React from 'react';
import { Course, UserSession } from '@/interfaces';
import { getCourseAll, extractCourseAll } from '@/app/courses/helper';
import '@/styles/globals.css';

import CourseFormulas from './CourseFormulas';

interface CourseSlugFormulasProps {
  params: { slug: string };
  user: UserSession | null;

}

const CourseSlugFormulas: React.FC<CourseSlugFormulasProps> = async ({
  params,
  user,

}) => {

  const courseAllProm = getCourseAll(params);
  const courseAll = await courseAllProm;
  
  const {
    theCourseFormulas, courseID
  } = extractCourseAll(courseAll);



  return (
    <div>
   
  

      {theCourseFormulas.length > 0 && (
        <CourseFormulas courseFormulas={theCourseFormulas} userDataBaseId={(user?.userDataId || 0).toString()} courseId={courseID} />
      )}
    
    </div>
  );
}

export default CourseSlugFormulas;


      