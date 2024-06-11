import React, { HTMLAttributes } from 'react';
import Upcoming from '@/components/Upcoming';
import { getUpcomingCourses } from '@/app/helper';
import SH1Text from '../text/SH1Text';

interface UpcomingCoursesHomePageProps extends HTMLAttributes<HTMLDivElement> {
    themeColor: string;
    userDataBaseId: string;
}

const UpcomingCoursesHomePage: React.FC<UpcomingCoursesHomePageProps> = async ({ themeColor, className, userDataBaseId }) => {

    const upcomingCoursesProm = getUpcomingCourses();
    const upcomingCourses = await upcomingCoursesProm;
    const upcomingCoursesChecked = upcomingCourses ? upcomingCourses : [];

    return (
        <div className={className}>
            {upcomingCoursesChecked.length > 0 && (
                <div>

 <SH1Text text="Upcoming Courses"
                        className='text-themeColor' />
                <Upcoming
                    userDataBaseId={userDataBaseId}
                    upcomingCourses={upcomingCoursesChecked}
                    themeColor={themeColor}
                />
</div>
            )}
        </div>
    );
}

export default UpcomingCoursesHomePage;