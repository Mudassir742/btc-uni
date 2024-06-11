import React, { HTMLAttributes } from 'react';
import { extractCourseAll, getCourseAll, getCourseContent } from '../helper';
import CourseDescription from '@/components/CourseDescription';

interface CourseSlugCourseDescriptionProps extends HTMLAttributes<HTMLDivElement> {
    params: { slug: string };
}

const CourseSlugCourseDescription: React.FC<CourseSlugCourseDescriptionProps> = async ({ params, className }) => {

    // const courseDescriptionProm = getCourseContent(params);
    // const courseDescription = await courseDescriptionProm;

    const courseAllProm = getCourseAll(params);
    const courseAll = await courseAllProm;
    const { courseDescription } = extractCourseAll(courseAll)

    return (
        <div className={className}>
            <CourseDescription text={courseDescription} />
        </div>
    );
}

export default CourseSlugCourseDescription;