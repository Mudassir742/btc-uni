import React from 'react';
import { getCurrentUserDataAccessedCoursesBasic, getNewMensCourses, themeColor } from '../helper';
import RecentlyReleased from '@/components/RecentlyReleased';
import { UserSession } from '@/interfaces';

interface NewMensCoursesProps {
    heroTitle: string;
    user: UserSession | null;
}

const NewMensCourses: React.FC<NewMensCoursesProps> = async ({ heroTitle, user }) => {

    const newMENSCoursesPromise = getNewMensCourses();
    const userDataAccessedCoursesPromise = getCurrentUserDataAccessedCoursesBasic(user?.userDataId || 0);
    const [newMENSCourses, userDataAccessedCourses] = await Promise.all([newMENSCoursesPromise, userDataAccessedCoursesPromise]);
    const newMensCourses = newMENSCourses ? newMENSCourses : [];

    return (
        <div>
            {newMensCourses.length > 0 && (
                <RecentlyReleased userDataBaseId={(user?.userDataId || 0).toString()} recentlyReleasedCourses={newMensCourses} heroTitle={heroTitle} userDataAccessedCourses={userDataAccessedCourses} themeColor={themeColor} />
            )}
        </div>
    );
}

export default NewMensCourses;