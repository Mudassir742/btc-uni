import React from 'react';
import RecentlyReleased from '@/components/RecentlyReleased';
import { UserSession } from '@/interfaces';
import { getCurrentUserDataAccessedCoursesBasic, getCurrentUserDataAccessedCoursesForYoutubeCourses, getRecentCourses } from '@/app/helper';
import CoursesStarted from '../CoursesStarted';

interface CoursesStartedHomePageProps {
    themeColor: string;
    user: UserSession | null;
}

const CoursesStartedHomePage: React.FC<CoursesStartedHomePageProps> = async ({ user, themeColor }) => {

    const userDataAccessedCoursesPromise = getCurrentUserDataAccessedCoursesForYoutubeCourses(user?.userDataId || 0);
    const accessedCourses = await userDataAccessedCoursesPromise
    const checkedAccessedCourses = accessedCourses ? accessedCourses : [];

    const unfinishedAccessedCourses = checkedAccessedCourses
        // Filter out courses that are started and finished
        .filter(accessedCourse => !(accessedCourse.isCompleted))

    const coursesStartedAndNotFinished = unfinishedAccessedCourses
        .map(accessedCourse => accessedCourse.accessedcoursemetadata.belongstocourse);


    return (
        <div>
            {coursesStartedAndNotFinished.length > 0 && (
                <CoursesStarted
                    coursesStartedAndNotFinished={coursesStartedAndNotFinished}
                    userDataAccessedCourses={checkedAccessedCourses}
                    themeColor={themeColor}
                    userDataBaseId={(user?.userDataId || 0).toString()}
                />
            )}
        </div>
    );
}

export default CoursesStartedHomePage;