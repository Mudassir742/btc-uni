import React, { HTMLAttributes } from 'react';
import Upcoming from '@/components/Upcoming';
import { getUpcomingCourses } from '@/app/helper';
import SH1Text from '../text/SH1Text';

interface UpcomingCoursesHomePageNotSignedInProps extends HTMLAttributes<HTMLDivElement> {
    themeColor: string;
    userDataBaseId: string;
}

const UpcomingCoursesHomePageNotSignedIn: React.FC<UpcomingCoursesHomePageNotSignedInProps> = async ({ themeColor, className, userDataBaseId }) => {

    const upcomingCoursesProm = getUpcomingCourses();
    const upcomingCourses = await upcomingCoursesProm;
    const upcomingCoursesChecked = upcomingCourses ? upcomingCourses : [];

    return (
        <div className='md:pl-[6%]'>
            {upcomingCoursesChecked.length > 0 && (
                <div>

 <SH1Text text="Upcoming Courses"
                        className='text-themeColor slider-container md:pl-0' />
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

export default UpcomingCoursesHomePageNotSignedIn;