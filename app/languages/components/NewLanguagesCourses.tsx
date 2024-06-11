import React from 'react';
import { getCurrentUserDataAccessedCoursesBasic, getNewLanguagesCourses, themeColor } from '../helper';
import RecentlyReleased from '@/components/RecentlyReleased';
import { UserSession } from '@/interfaces';

interface NewLanguagesCoursesProps {
    heroTitle: string;
    user: UserSession | null;
}

const NewLanguagesCourses: React.FC<NewLanguagesCoursesProps> = async ({ heroTitle, user }) => {

    const newLANGUAGESCoursesPromise = getNewLanguagesCourses();
    const userDataAccessedCoursesPromise = getCurrentUserDataAccessedCoursesBasic(user?.userDataId || 0);
    const [newLANGUAGESCourses, userDataAccessedCourses] = await Promise.all([newLANGUAGESCoursesPromise, userDataAccessedCoursesPromise]);
    const newLanguagesCourses = newLANGUAGESCourses ? newLANGUAGESCourses : [];

    return (
        <div>
            {newLanguagesCourses.length > 0 && (
                <div>
                    
                <RecentlyReleased userDataBaseId={(user?.userDataId || 0).toString()} recentlyReleasedCourses={newLanguagesCourses} heroTitle={heroTitle} userDataAccessedCourses={userDataAccessedCourses} themeColor={themeColor} />
                    <div className="space-between-categories" />
                    </div>
            )}
        </div>
    );
}

export default NewLanguagesCourses;