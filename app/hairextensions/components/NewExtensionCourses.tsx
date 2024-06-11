import React from 'react';
import { getCurrentUserDataAccessedCoursesBasic, getNewExtensionsCourses, themeColor } from '../helper';
import RecentlyReleased from '@/components/RecentlyReleased';
import { UserSession } from '@/interfaces';

interface NewExtensionCoursesProps {
    heroTitle: string;
    user: UserSession | null;
}

const NewExtensionCourses: React.FC<NewExtensionCoursesProps> = async ({ heroTitle, user }) => {

    const newEXTENSIONCoursesPromise = getNewExtensionsCourses();
    const userDataAccessedCoursesPromise = getCurrentUserDataAccessedCoursesBasic(user?.userDataId || 0);
    const [newEXTENSIONCourses, userDataAccessedCourses] = await Promise.all([newEXTENSIONCoursesPromise, userDataAccessedCoursesPromise]);
    const newExtensionsCourses = newEXTENSIONCourses ? newEXTENSIONCourses : [];

    return (
        <div>
            {newExtensionsCourses.length > 0 && (
                <RecentlyReleased userDataBaseId={(user?.userDataId || 0).toString()} recentlyReleasedCourses={newExtensionsCourses} heroTitle={heroTitle} userDataAccessedCourses={userDataAccessedCourses} themeColor={themeColor} />
            )}
        </div>
    );
}

export default NewExtensionCourses;