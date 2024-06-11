import React, { HTMLAttributes } from 'react';
import { getUpcomingCourses } from '../helper';
import Upcoming from '@/components/Upcoming';
import SH1Text from '@/components/text/SH1Text';
import H4Text from '@/components/text/H4Text';

interface CourseSlugUpcomingCoursesIncludedProps extends HTMLAttributes<HTMLDivElement> {
    themeColor: string;
    userDataBaseId: string;
}

const CourseSlugUpcomingCourses: React.FC<CourseSlugUpcomingCoursesIncludedProps> = async ({ themeColor, className, userDataBaseId }) => {

    const upcomingCoursesProm = getUpcomingCourses();
    const upcomingCourses = await upcomingCoursesProm;
    const upcomingCoursesChecked = upcomingCourses ? upcomingCourses : [];

    return (
        <div >
            {upcomingCoursesChecked.length > 0 && (
                <div>
                    <H4Text text='Upcoming Courses' className='text-themeColor slider-container md:pl-0' />
                  
                    <div className='space-under-category-titles' />
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

export default CourseSlugUpcomingCourses;