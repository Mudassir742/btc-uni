import React from "react";
import {
  // getEducatorAll,
  extractEducatorAll,
  getCurrentUserDataEducatorSlugPage,
  getBrandAll,
} from "../helper";
import { AccessedCourse, Course, Educator, UserSession } from "@/interfaces";
import CoursePageTitles from "@/components/text/CoursePageTitles";
import YouTubeVideoCard from "@/components/YouTubeVideoCard";
import H3Text from "@/components/text/H3Text";
import SH1Text from "@/components/text/SH1Text";
import { hasUserCompletedCourse } from "@/app/courses/helper";
import YouTubeVideoCardSuggestedCourse from "@/components/YouTubeVideoCardSuggestedCourse";
import YouTubeVideoCardEducatorsMyCourses from "@/components/YouTubeVideoCardEducatorsMyCourses";

interface BrandSlugMyCoursesDesktopProps {
  params: { slug: string };
  user: UserSession | null;
  themeColor: string;
}

const BrandSlugMyCoursesDesktop: React.FC<
  BrandSlugMyCoursesDesktopProps
> = async ({ params, user, themeColor }) => {
  const brandAllProm = getBrandAll(params);
  const currentUserDataProm = getCurrentUserDataEducatorSlugPage(
    user?.userDataId || 0
  );

  const [brandAll, currentUserData] = await Promise.all([
    brandAllProm,
    currentUserDataProm,
  ]);

  const brandCourses = brandAll.find(brand => brand.slug === params.slug) 
  const courses = brandCourses?.brandmetadata.brandCourses

  const userWatchedCourses =
    currentUserData?.userDataMetadata?.accessedcourses || [];

  const userFinishedCourses = userWatchedCourses.filter(
    (accessedCourse: AccessedCourse) => {
      return accessedCourse?.isCompleted === true;
    }
  );
  const userFinishedCourseIDs = userFinishedCourses.map(
    (accessedCourse: AccessedCourse) =>
      accessedCourse?.accessedcoursemetadata?.courseid || 0
  );
  // Checking if the educator courses are part of accessed courses and completed
  function checkIfCourseCompleted(
    courseID: number,
    userFinishedCourseIDs: number[]
  ) {
    return userFinishedCourseIDs.some((databaseId) => databaseId === courseID);
  }

  const createOnlineCourseCards = (courses: Course[]) =>
    courses.map((course: Course) => (
      <YouTubeVideoCardEducatorsMyCourses
        classname="p-0"
        key={course.slug}
        course={course}
        completed={hasUserCompletedCourse(
          course?.databaseId,
          userWatchedCourses
        )}
        themeColor={themeColor}
        educators={(course?.courseMetadata?.educators || []).map(
          (educator: Educator) => educator?.educatorMetaData?.instahandle || ""
        )}
        educatorId={course.courseMetadata.educators[0].databaseId}
        userDataBaseId={(user?.userDataId || 0).toString()}
      />
    ));

  // const onlineCoursesCards = createOnlineCourseCards(educatorCourses);

  return (
    <div>
      {courses &&
        <>
          <div className="flex container md:px-0">
            <div>
            <p className='text-themeColor text-[32px] font-semibold mb-6'>Courses</p>
              <div className="space-under-category-titles" />
            </div>

            <div className="px-2 flex">
              <p className=" text-themeColor text-[32px] font-semibold">({courses.length.toString()})</p>
              {/* <SH1Text text="(" />{" "} */}
              {/* <SH1Text text={courses.length.toString()} />{" "} */}
              {/* <SH1Text text=")" /> */}
            </div>
          </div>

          <div className="">
            <div className="flex flex-wrap gap-8">{createOnlineCourseCards(courses)}</div>
          </div>
        </>
      }
    </div>
  );
};

export default BrandSlugMyCoursesDesktop;
