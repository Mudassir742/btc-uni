import React from "react";
import {
  getEducatorAll,
  extractEducatorAll,
  getCurrentUserDataEducatorSlugPage,
} from "../helper";
import { AccessedCourse, Course, Educator, UserSession } from "@/interfaces";
import CoursePageTitles from "@/components/text/CoursePageTitles";
import YouTubeVideoCard from "@/components/YouTubeVideoCard";
import H3Text from "@/components/text/H3Text";
import SH1Text from "@/components/text/SH1Text";
import { hasUserCompletedCourse } from "@/app/courses/helper";
import YouTubeVideoCardSuggestedCourse from "@/components/YouTubeVideoCardSuggestedCourse";
import YouTubeVideoCardEducatorsMyCourses from "@/components/YouTubeVideoCardEducatorsMyCourses";

interface EducatorSlugMyCoursesDesktopProps {
  params: { slug: string };
  user: UserSession | null;
  themeColor: string;
}

const EducatorSlugMyCoursesDesktop: React.FC<
  EducatorSlugMyCoursesDesktopProps
> = async ({ params, user, themeColor }) => {
  const educatorAllProm = getEducatorAll(params);
  const currentUserDataProm = getCurrentUserDataEducatorSlugPage(
    user?.userDataId || 0
  );

  const [educatorAll, currentUserData] = await Promise.all([
    educatorAllProm,
    currentUserDataProm,
  ]);

  const { educatorCourses, educatorId } = extractEducatorAll(educatorAll);

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
        educatorId={educatorId}
        userDataBaseId={(user?.userDataId || 0).toString()}
      />
    ));

  const onlineCoursesCards = createOnlineCourseCards(educatorCourses);

  return (
    <div>
      <div className="flex container md:px-0">
        <div>
          <SH1Text text="Courses on BTC-U" />
          <div className="space-under-category-titles" />
        </div>

        <div className="px-2 flex">
          <SH1Text text="(" />{" "}
          <SH1Text text={educatorCourses.length.toString()} />{" "}
          <SH1Text text=")" />
        </div>
      </div>
      <div className="">
        <div className="flex flex-wrap">{onlineCoursesCards}</div>
      </div>
    </div>
  );
};

export default EducatorSlugMyCoursesDesktop;
