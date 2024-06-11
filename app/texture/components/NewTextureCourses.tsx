import React from 'react';
import { getCurrentUserDataAccessedCoursesBasic, getNewTextureCourses, themeColor  } from '../helper';
import RecentlyReleased from '@/components/RecentlyReleased';
import { UserSession } from '@/interfaces';

interface NewTextureCoursesProps {
    heroTitle: string;
    user: UserSession | null;
}

const NewTextureCourses: React.FC<NewTextureCoursesProps> = async ({ heroTitle, user }) => {

    const newTEXTURECoursesPromise = getNewTextureCourses();
    const userDataAccessedCoursesPromise = getCurrentUserDataAccessedCoursesBasic(user?.userDataId || 0);
    const [newTEXTURECourses, userDataAccessedCourses] = await Promise.all([newTEXTURECoursesPromise, userDataAccessedCoursesPromise]);
    const newTextureCourses = newTEXTURECourses ? newTEXTURECourses : [];

    return (
        <div>
            {newTextureCourses.length > 0 && (
                <RecentlyReleased userDataBaseId={(user?.userDataId || 0).toString()} recentlyReleasedCourses={newTextureCourses} heroTitle={heroTitle} userDataAccessedCourses={userDataAccessedCourses} themeColor={themeColor} />
            )}
        </div>
    );
}

export default NewTextureCourses;