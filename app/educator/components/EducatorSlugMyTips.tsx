import React from 'react';
import { getEducatorAll, extractEducatorAll, getCurrentUserDataEducatorSlugPage } from '../helper';
import { AccessedCourse, Course, Educator, UserSession } from '@/interfaces';
import CoursePageTitles from '@/components/text/CoursePageTitles';
import YouTubeVideoCard from '@/components/YouTubeVideoCard';
import H3Text from '@/components/text/H3Text';

interface EducatorSlugMyTipsProps {
    params: { slug: string };
    user: UserSession | null;
    themeColor: string;
}

const EducatorSlugMyTips: React.FC<EducatorSlugMyTipsProps> = async ({ params, user, themeColor }) => {

    const educatorAllProm = getEducatorAll(params);
    const currentUserDataProm = getCurrentUserDataEducatorSlugPage(user?.userDataId || 0);

    const [educatorAll, currentUserData] = await Promise.all([educatorAllProm, currentUserDataProm])

    const { educatorCourses } = extractEducatorAll(educatorAll)

    const userWatchedCourses = currentUserData?.userDataMetadata?.accessedcourses || [];

    const userFinishedCourses = userWatchedCourses.filter((accessedCourse: AccessedCourse) => {
        return accessedCourse?.isCompleted === true;
    });
    const userFinishedCourseIDs = userFinishedCourses.map((accessedCourse: AccessedCourse) =>
        accessedCourse?.accessedcoursemetadata?.courseid || 0
    );
    // Checking if the educator courses are part of accessed courses and completed
    function checkIfCourseCompleted(courseID: number, userFinishedCourseIDs: number[]) {
        return userFinishedCourseIDs.some(databaseId => databaseId === courseID);
    }

    const createOnlineCourseCards = (courses: Course[]) => courses
        .map((course: Course) => (
 

            <YouTubeVideoCard key={course.slug} 
            userDataBaseId={(user?.userDataId || 0).toString()}
            course={course} completed={checkIfCourseCompleted(course.databaseId, userFinishedCourseIDs)} themeColor={themeColor} educators={(course?.courseMetadata?.educators || []).map((educator: Educator) => educator?.educatorMetaData?.instahandle || "")} />

        ));



    return (
        <div >
       
            <div className="flex ">
                <div >

                    <H3Text text='Tips By Me' />
                    <div className="space-under-category-titles" />

                </div>

                <div className="px-2 flex">
                    <H3Text text="(" /> <H3Text text={(educatorCourses.length).toString()} /> <H3Text text=")" />
                </div>
            </div>
            <div className="flex flex-wrap md:gap-x-4">

                tip cards here...

            </div>
            <div className='space-between-categories' />
        </div>
    );
}

export default EducatorSlugMyTips;