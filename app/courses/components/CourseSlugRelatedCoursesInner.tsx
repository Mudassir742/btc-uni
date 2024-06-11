import React from 'react';
import { getRandomCategoryCourses, getRandomTagCourses, hasUserCompletedCourse, shuffleArray } from '../helper';
import { AccessedCourse, Course, Educator, UserSession } from '@/interfaces';
import YouTubeVideoCard from '@/components/YouTubeVideoCard';
import YouTubeVideoCardSuggestedCourse from '@/components/YouTubeVideoCardSuggestedCourse';

interface CourseSlugRelatedCoursesInnerProps {
    relatedCourses: Course[];
    filteredTagName: string;
    courseCategory: string;
    courseID: number;
    userDataAccessedCourses: AccessedCourse[];
    themeColor: string;
    userDataId: string;
  }

const CourseSlugRelatedCoursesInner: React.FC<CourseSlugRelatedCoursesInnerProps> = async ({relatedCourses, filteredTagName, courseCategory, courseID, userDataAccessedCourses, themeColor, userDataId}) => {

  const doubleFilteredTagName = filteredTagName ? filteredTagName : "";
  const tagCoursesProm = getRandomTagCourses(doubleFilteredTagName);
  const filteredCourseCategory = courseCategory.toLowerCase() === "haircolor" ? "hair-color" : (courseCategory.toLowerCase() === "hairextensions" ? "extensions" : (courseCategory.toLowerCase() === "events" ? "btc-events" : courseCategory.toLowerCase()));
  const categoryCoursesProm = getRandomCategoryCourses(filteredCourseCategory.toLowerCase());
  
  // below in CoursesInnerComponents, gets filteredTagName and courseID as prop
  // fetch 10 random courses in the category
  let displayedRelatedCourses: Course[] = relatedCourses;
  // if (relatedCourses.length < 20) {
  //   const [fetchedTagCourses, fetchedCategoryCourses] = await Promise.all([tagCoursesProm, categoryCoursesProm]);
  //   // Fetch same tag and same category courses in parallel
  //   // randomize the order of the courses
  //   const randomTagCourses = shuffleArray<Course>(fetchedTagCourses);
  //   const randomCategoryCourses = shuffleArray<Course>(fetchedCategoryCourses);
  //   // merge arrays
  //   const combinedRelatedAndTagCourses = [...relatedCourses, ...randomTagCourses];
  //   // const combinedRelatedAndCategoryCourses = [...relatedCourses, ...randomCategoryCourses];
  //   // filtered to exclude current course (would be weird to see same course as a related course)
  //   const eitherTagOrCategoryCourses = combinedRelatedAndTagCourses.length < 20 ? [...combinedRelatedAndTagCourses, ...randomCategoryCourses] : combinedRelatedAndTagCourses;
  //   displayedRelatedCourses = eitherTagOrCategoryCourses.filter((course: Course) => course.databaseId !== courseID);
  // }

  if (relatedCourses.length < 1) {
    const [fetchedTagCourses, fetchedCategoryCourses] = await Promise.all([tagCoursesProm, categoryCoursesProm]);
    // Create a Set of unique course database IDs
    const uniqueCourseIds = new Set(relatedCourses.map(course => course.databaseId));

    // Filter the fetched courses to exclude duplicates
    const uniqueTagCourses = fetchedTagCourses.filter(course => !uniqueCourseIds.has(course.databaseId));
    const uniqueTagCourseIds = new Set(uniqueTagCourses.map(course => course.databaseId));
    const uniqueCategoryCourses = fetchedCategoryCourses.filter(course => !uniqueCourseIds.has(course.databaseId) && !uniqueTagCourseIds.has(course.databaseId));

    // Add unique courses to the Set
    uniqueTagCourses.forEach(course => uniqueCourseIds.add(course.databaseId));
    uniqueCategoryCourses.forEach(course => uniqueCourseIds.add(course.databaseId));

    // Combine the arrays
    const combinedCourses = [...relatedCourses, ...shuffleArray<Course>(uniqueTagCourses), ...shuffleArray<Course>(uniqueCategoryCourses)];

    // Filter the combined array to exclude the current course
    displayedRelatedCourses = combinedCourses.filter((course: Course) => course.databaseId !== courseID);

  }

//   if (relatedCourses.length < 20) {
//     const [fetchedTagCourses, fetchedCategoryCourses] = await Promise.all([tagCoursesProm, categoryCoursesProm]);

//     // Create a Set of unique course IDs
//     const uniqueCourseIds = new Set(relatedCourses.map(course => course.databaseId));

//     // Combine the arrays and filter out duplicates and the current course
//     const combinedCourses = [...relatedCourses, ...fetchedTagCourses, ...fetchedCategoryCourses];
//     displayedRelatedCourses = combinedCourses.filter(course => {
//         return !uniqueCourseIds.has(course.databaseId) && course.databaseId !== courseID;
//     });

//     // Update the Set with new unique IDs
//     displayedRelatedCourses.forEach(course => uniqueCourseIds.add(course.databaseId));
// }


  const createCategoryCourseCards = (courses: Course[]) => courses
    .map((course: Course) => (
      <YouTubeVideoCardSuggestedCourse
        key={course.slug}
        course={course}
        completed={hasUserCompletedCourse(course?.databaseId, userDataAccessedCourses)}
        themeColor={themeColor}
        educators={(course?.courseMetadata?.educators || []).map((educator: Educator) => educator?.educatorMetaData?.instahandle || "")} 
        courseId={courseID} 
        userDataBaseId={userDataId}         />
  ));

  const categoryCoursesCards = createCategoryCourseCards(displayedRelatedCourses);

    return (
        <div className="md:max-h-[1000px]  overflow-y-auto">
            {categoryCoursesCards}
        </div>
    );
}

export default CourseSlugRelatedCoursesInner;