import React, { HTMLAttributes } from 'react';
// import { extractCourseAll, getCourseAll, getCourseContent } from '../helper';
import { extractCourseAll, getCourseAll } from '@/app/courses/helper';

interface CourseSlugCourseDescriptionProps extends HTMLAttributes<HTMLDivElement> {
    params: { slug: string };
}

const WelcomeCourseCard: React.FC<CourseSlugCourseDescriptionProps> = async ({ params, className }) => {

    // const courseDescriptionProm = getCourseContent(params);
    // const courseDescription = await courseDescriptionProm;

    const courseAllProm = getCourseAll(params);
    const courseAll = await courseAllProm;
    const { courseDescription } = extractCourseAll(courseAll)

    function truncateText(text:string, maxLength:number) {
        if (text.length > maxLength) {
            // Find the last space within the maxLength
            const lastSpaceIndex = text.lastIndexOf(' ', maxLength);
            if (lastSpaceIndex !== -1) {
                // Truncate the text at the last space
                return text.slice(0, lastSpaceIndex) + '...';
            }
        }
        return text;
    }


    const truncatedText = truncateText(courseDescription, 120)
    return (
        <div dangerouslySetInnerHTML={{ __html: truncatedText }} />
    );
}

export default WelcomeCourseCard;