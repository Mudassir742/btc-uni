import React from 'react';
import { extractCourseAll, extractCurrentUserDataForCourseSlugPageAll, extractDate, getCourseAll, getCourseCategories, getCourseID, getCourseRelatedCourses, getCourseTags, getCurrentUserDataAccessedCoursesBasic, getCurrentUserDataAccessedCoursesExtendedCourseHero, getCurrentUserDataForCourseSlugPageAll, getRandomCategoryCourses, getRandomTagCourses, hasUserCompletedCourse, shuffleArray } from '../helper';
import { headers } from 'next/headers';
import { Course, Educator, UserSession } from '@/interfaces';
import { Suspense } from "react";
import { Skeleton } from "@/components/ui/Skeleton";
import CourseSlugRelatedCoursesInner from './CourseSlugRelatedCoursesInner';
import YouTubeVideoCard from '@/components/YouTubeVideoCard';
import H3Text from '@/components/text/H3Text';
import YouTubeVideoCardSuggestedCourse from '@/components/YouTubeVideoCardSuggestedCourse';
import H4Text from '@/components/text/H4Text';

interface CourseSlugRelatedCoursesProps {
    params: { slug: string };
    user: UserSession | null;
    themeColor: string;
  }

const CourseSlugRelatedCourses: React.FC<CourseSlugRelatedCoursesProps> = async ({params, user, themeColor}) => {
  
  // 1. get related courses
  // 2. get random related courses based on same tags but keeping in mind category (i.e. page) where the user comes from
  // 2. if related courses > 20, displayedRelatedCourses = relatedCourses; else displayedRelatedCourses + subcategory courses
  // 4. if displayedRelatedCourses < 20, append category courses

  // so we will use the tags that contain that category name
  // e.g. if user comes from /haircutting, and course has both "haircutting-shags" and "texture-business" tags, it will only show courses with haircutting-shags
  // get category user is coming from by first getting url where user is coming from
  const headersList = headers();
  const referer = headersList.get('referer');
  let uncapCourseCategory = "";
  let courseCategory = "";
  
  // const courseIDProm = getCourseID(params);
  // const courseRelatedCoursesProm = getCourseRelatedCourses(params);
  // const courseCategoriesProm = getCourseCategories(params);
  // const courseTagsProm = getCourseTags(params);
  const courseAllProm = getCourseAll(params);
  
  const userDataAccessedCoursesPromise = getCurrentUserDataAccessedCoursesBasic(user?.userDataId || 0); // brought back jan 14
  // const userDataAllProm = getCurrentUserDataForCourseSlugPageAll(user?.userDataId || 0);
    // const userDataAccessedCoursesPromise = getCurrentUserDataAccessedCoursesExtendedCourseHero(user?.userDataId || 0); // deprecated jan 14
  

  // fetch course and user data in parallel
  const [
    // courseID, relatedCourses, courseCategories, courseTags, 
    courseAll, accessedCourses] 
    = await Promise.all([
      // courseIDProm, courseRelatedCoursesProm, courseCategoriesProm, courseTagsProm, 
      courseAllProm, userDataAccessedCoursesPromise]);

  const { categories, tags, relatedCourses, courseID } = extractCourseAll(courseAll);
  // const { accessedCourses } = extractCurrentUserDataForCourseSlugPageAll(userDataAll);

  // course category is first category of course in case there is nor referrer (user opens the course link directly)
  const firstCategoryOfCourse = categories[0]?.name || "";
  // console.log("firstCategoryOfCourse is: ", firstCategoryOfCourse);
  // console.log("referer is: ", referer);
  if (
    (referer !== null) && (referer !== "")
    // referer === "" &&
    // referer === "" &&
    // referer === "" &&
    // referer === "" &&
    // referer === "" &&
    // referer === "" &&
    // referer === "" &&
    // referer === "" &&
    // referer === "" &&
    // referer === "" &&
    ) {
    const parts = referer.split('/'); // Split the URL by "/"
    uncapCourseCategory = parts[parts.length - 1]; // Get the last part of the URL
    const processedCategoryNameFromReferer = uncapCourseCategory.charAt(0).toUpperCase() + uncapCourseCategory.slice(1).toLowerCase();
    if (
      processedCategoryNameFromReferer.toLowerCase() === "haircolor" ||
      processedCategoryNameFromReferer.toLowerCase() === "haircutting" ||
      processedCategoryNameFromReferer.toLowerCase() === "styling" ||
      processedCategoryNameFromReferer.toLowerCase() === "texture" ||
      processedCategoryNameFromReferer.toLowerCase() === "business" ||
      processedCategoryNameFromReferer.toLowerCase() === "mens" ||
      processedCategoryNameFromReferer.toLowerCase() === "hairextensions" ||
      processedCategoryNameFromReferer.toLowerCase() === "events" ||
      processedCategoryNameFromReferer.toLowerCase() === "languages"
      ) {
        courseCategory = processedCategoryNameFromReferer;
      } else {
        courseCategory = firstCategoryOfCourse // if user goes on course slug page from anywhere else, use course's first category
      }
  } else {
    courseCategory = firstCategoryOfCourse // if referrer is null, use course's first category
  }

  // course tag names
  const courseTagNames = tags?.map((tag) => tag?.slug || "") || [];
  // CAN BE CHANGED: get only the tag relevant to the category page the user is coming from
  const filteredTagName = courseTagNames?.filter((tagName) => { return tagName.includes(courseCategory.toLowerCase()) ? tagName.includes(courseCategory.toLowerCase()) : tagName })[0];
  // ALTERNATIVELY, we can show courses with any of the tags that course has by using for example where: {tag: "haircutting-shags, haircutting-extensions"} in our gql query; in this case we won't need the category below
  // console.log("filteredTagName is: ", filteredTagName);
  // console.log("courseCategory is: ", courseCategory);

  const doubleFilteredTagName = filteredTagName ? filteredTagName : "";
  const tagCoursesProm = getRandomTagCourses(doubleFilteredTagName);
  const filteredCourseCategory = courseCategory.toLowerCase() === "haircolor" ? "hair-color" : (courseCategory.toLowerCase() === "hairextensions" ? "extensions" : (courseCategory.toLowerCase() === "events" ? "btc-events" : courseCategory.toLowerCase()));
  // console.log("filteredCourseCategory is: ", filteredCourseCategory);
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

    // Combine the randomized arrays
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
        completed={hasUserCompletedCourse(course?.databaseId, accessedCourses)}
        themeColor={themeColor}
        educators={(course?.courseMetadata?.educators || []).map((educator: Educator) => educator?.educatorMetaData?.instahandle || "")} 
        courseId={courseID} 
        userDataBaseId={(user?.userDataId || 0).toString()}         />
  ));

  const categoryCoursesCards = createCategoryCourseCards(displayedRelatedCourses);

  return (
      
    <div className="overflow-y-auto">
      <div className='slider-container'>
        <H4Text text='Suggested Courses' />

      </div>
      <div className="space-under-category-titles" />
      {categoryCoursesCards}
  </div>
    );
}

export default CourseSlugRelatedCourses;