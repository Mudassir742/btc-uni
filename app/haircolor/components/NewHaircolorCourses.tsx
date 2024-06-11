import React from 'react';
import { getCurrentUserDataAccessedCoursesBasic, getNewHaircolorCourses, themeColor } from '../helper';
import RecentlyReleased from '@/components/RecentlyReleased';
import { UserSession } from '@/interfaces';

interface NewHaircolorCoursesProps {
    heroTitle: string;
    user: UserSession | null;
}

const NewHaircolorCourses: React.FC<NewHaircolorCoursesProps> = async ({ heroTitle, user }) => {

    const newHAIRCOLORCoursesPromise = getNewHaircolorCourses();
    const userDataAccessedCoursesPromise = getCurrentUserDataAccessedCoursesBasic(user?.userDataId || 0);
    const [newHAIRCOLORCourses, userDataAccessedCourses] = await Promise.all([newHAIRCOLORCoursesPromise, userDataAccessedCoursesPromise]);
    const newHaircolorCourses = newHAIRCOLORCourses ? newHAIRCOLORCourses : [];

    return (
        <div>
            {newHaircolorCourses.length > 0 && (
                <RecentlyReleased userDataBaseId={(user?.userDataId || 0).toString()} recentlyReleasedCourses={newHaircolorCourses} heroTitle={heroTitle} userDataAccessedCourses={userDataAccessedCourses} themeColor={themeColor} />
            )}
        </div>
    );
}

export default NewHaircolorCourses;