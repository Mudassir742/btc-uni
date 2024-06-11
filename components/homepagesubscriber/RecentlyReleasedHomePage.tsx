import React from 'react';
import RecentlyReleased from '@/components/RecentlyReleased';
import { UserSession } from '@/interfaces';
import { getCurrentUserDataAccessedCoursesBasic, getRecentCourses } from '@/app/helper';

interface RecentlyReleasedHomePageProps {
    themeColor: string;
    user: UserSession | null;
}

const RecentlyReleasedHomePage: React.FC<RecentlyReleasedHomePageProps> = async ({ user, themeColor }) => {
    
    const recentlyReleasedCoursesProm = getRecentCourses();
    const userDataAccessedCoursesPromise = getCurrentUserDataAccessedCoursesBasic(user?.userDataId || 0);
    const [recentlyReleasedCourses, userDataAccessedCourses] = await Promise.all([recentlyReleasedCoursesProm, userDataAccessedCoursesPromise]);
    const recentCourses = recentlyReleasedCourses ? recentlyReleasedCourses : [];

    return (
        <div>
            {recentCourses.length > 0 && (
                <div>
                   
                    <RecentlyReleased
                        userDataBaseId={(user?.userDataId || 0).toString()}
                        recentlyReleasedCourses={recentCourses}
                        heroTitle={""}
                        userDataAccessedCourses={userDataAccessedCourses}
                        themeColor={themeColor}
                        background='white'
                    />
                </div>

            )}
        </div>
    );
}

export default RecentlyReleasedHomePage;