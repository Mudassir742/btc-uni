import React from 'react';
import SH1Text from './text/SH1Text';
import RelatedCoursesCard from './RelatedCoursesCard';
import SH2Text from './text/SH2Text';
import { Course, UserData } from '@/interfaces';
import CourseCard from './CourseCard';
import CoursePageTitles from './text/CoursePageTitles';
import H3Text from './text/H3Text';




interface RelatedCoursesProps {
  relatedCourses: Course[];
  userData: UserData | null;
}

const RelatedCourses: React.FC<RelatedCoursesProps> = ({ relatedCourses, userData }) => {

  // const createRelatedCourseCards = (courses: Course[]) => courses
  // .map((course: Course) => (
  //   <RelatedCoursesCard key={course.uri} course={course} userData={userData} />
  // ));

  const createRelatedCourseCards = (courses: Course[]) => courses
  .map((course: Course) => (
    <CourseCard key={course.slug} course={course} />
  ));
  
  const relatedCoursesCards = createRelatedCourseCards(relatedCourses);


  return (
    <div>
      <div>
    <div className="flex items-center justify-between">
      <div className="flex items-center slider-container">
            <H3Text text='Explore More Courses'/>

      

        </div>
    </div>
    <div className="space-under-category-titles"/> 
      <div className="overflow-y-auto space-x-4 ">
      {relatedCoursesCards}
            {/* {courses.map((course: any) => (
              <CourseCard key={course.uri} course={course} />
            ))} */}
      </div>
      </div>
    </div>
  );
}

export default RelatedCourses;












