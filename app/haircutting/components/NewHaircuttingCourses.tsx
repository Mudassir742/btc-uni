import React from 'react';
import { getCurrentUserDataAccessedCoursesBasic, getNewHaircuttingCourses, themeColor } from '../helper';
import RecentlyReleased from '@/components/RecentlyReleased';
import { UserSession } from '@/interfaces';

interface NewHaircuttingCoursesProps {
    heroTitle: string;
    user: UserSession | null;
}

const NewHaircuttingCourses: React.FC<NewHaircuttingCoursesProps> = async ({ heroTitle, user }) => {

    const newHAIRCUTTINGCoursesPromise = getNewHaircuttingCourses();
    const userDataAccessedCoursesPromise = getCurrentUserDataAccessedCoursesBasic(user?.userDataId || 0);
    const [newHAIRCUTTINGCourses, userDataAccessedCourses] = await Promise.all([newHAIRCUTTINGCoursesPromise, userDataAccessedCoursesPromise]);
    const newHaircuttingCourses = newHAIRCUTTINGCourses ? newHAIRCUTTINGCourses : [];

    return (
        <div>
            {newHaircuttingCourses.length > 0 && (
                <RecentlyReleased userDataBaseId={(user?.userDataId || 0).toString()} recentlyReleasedCourses={newHaircuttingCourses} heroTitle={heroTitle} userDataAccessedCourses={userDataAccessedCourses} themeColor={themeColor} />
            )}
        </div>
    );
}

export default NewHaircuttingCourses;