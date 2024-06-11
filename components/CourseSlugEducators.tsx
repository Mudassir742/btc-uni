import React, { HTMLAttributes } from 'react';

import EducatorTeamName from '@/components/EducatorTeamName';
import H3Text from '@/components/text/H3Text';
import EducatorTeamNameCourseSlug from '@/components/EducatorTeamNameCourseSlug';
import { UserSession } from '@/interfaces';
import { extractCourseAll, getCourseAll } from '@/app/courses/helper';

interface CourseSlugEducatorsProps extends HTMLAttributes<HTMLDivElement> {
    params: { slug: string };
    user: UserSession | null;
}

const CourseSlugEducators: React.FC<CourseSlugEducatorsProps> = async ({ params, className, user }) => {

    // const courseEducatorsAndTheirCoursesProm = getCourseEducatorsAndTheirCourses(params);

    // const courseSubscriptionDataProm = getCourseSubscriptionData(params);
    // const educatorsAndTheirCourses = await courseEducatorsAndTheirCoursesProm;
    // const { courseEducatorsAndTheirCourses } = extractCourseEducatorsAndTheirCourses(educatorsAndTheirCourses);

    const courseAllProm = getCourseAll(params);

    const courseAll = await courseAllProm;
    const { courseEducatorsAndTheirCourses } = extractCourseAll(courseAll)
    const { theCourseTitle } = extractCourseAll(courseAll)

    return (
        <div className='container md:px-0'>
            

            <H3Text text={theCourseTitle} className='text-themeColor' />
            <div className="space-under-category-titles" /> 
            {courseEducatorsAndTheirCourses.length > 0 && (
                <div>
                    <EducatorTeamNameCourseSlug 
                    courseEducatorsAndTheirCourses={courseEducatorsAndTheirCourses} 
                    userDataId={(user?.userDataId || 0).toString()}
                    courseTitle={theCourseTitle}
                    />
                </div>
            )}
        </div>
    );
}

export default CourseSlugEducators;