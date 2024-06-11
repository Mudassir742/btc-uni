import React from 'react';
import { getCurrentUserDataAccessedCoursesBasic, getNewEventsCourses, themeColor } from '../helper';
import RecentlyReleased from '@/components/RecentlyReleased';
import { UserSession } from '@/interfaces';

interface NewEventsCoursesProps {
    heroTitle: string;
    user: UserSession | null;
}

const NewEventsCourses: React.FC<NewEventsCoursesProps> = async ({ heroTitle, user }) => {

    const newEVENTSCoursesPromise = getNewEventsCourses();
    const userDataAccessedCoursesPromise = getCurrentUserDataAccessedCoursesBasic(user?.userDataId || 0);
    const [newEVENTSCourses, userDataAccessedCourses] = await Promise.all([newEVENTSCoursesPromise, userDataAccessedCoursesPromise]);
    const eventsCourses = newEVENTSCourses ? newEVENTSCourses : [];

    return (
        <div>
            {eventsCourses.length > 0 && (
                <RecentlyReleased userDataBaseId={(user?.userDataId || 0).toString()} recentlyReleasedCourses={eventsCourses} heroTitle={heroTitle} userDataAccessedCourses={userDataAccessedCourses} themeColor={themeColor} />
            )}
        </div>
    );
}

export default NewEventsCourses;