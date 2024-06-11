import React from 'react';
import { getCurrentUserDataAccessedCoursesBasic, getNewStylingCourses, themeColor  } from '../helper';
import RecentlyReleased from '@/components/RecentlyReleased';
import { UserSession } from '@/interfaces';

interface NewStylingCoursesProps {
    heroTitle: string;
    user: UserSession | null;
}

const NewStylingCourses: React.FC<NewStylingCoursesProps> = async ({ heroTitle, user }) => {

    const newSTYLINGCoursesPromise = getNewStylingCourses();
    const userDataAccessedCoursesPromise = getCurrentUserDataAccessedCoursesBasic(user?.userDataId || 0);
    const [newSTYLINGCourses, userDataAccessedCourses] = await Promise.all([newSTYLINGCoursesPromise, userDataAccessedCoursesPromise]);
    const newStylingCourses = newSTYLINGCourses ? newSTYLINGCourses : [];

    return (
        <div>
            {newStylingCourses.length > 0 && (
                <RecentlyReleased userDataBaseId={(user?.userDataId || 0).toString()} recentlyReleasedCourses={newStylingCourses} heroTitle={heroTitle} userDataAccessedCourses={userDataAccessedCourses} themeColor={themeColor} />
            )}
        </div>
    );
}

export default NewStylingCourses;