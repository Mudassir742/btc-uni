import React from 'react';
import { extractCourseAll, getCourseAll, getCourseYouWillLearn } from '../helper';
import YouWillLearn from '@/components/YouWillLearn';

interface CourseSlugWhatsIncludedProps {
    params: { slug: string };
}

const CourseSlugYouWillLearn: React.FC<CourseSlugWhatsIncludedProps> = async ({ params }) => {

    // const courseYouWillLearnProm = getCourseYouWillLearn(params);
    // const courseYouWillLearn = await courseYouWillLearnProm;

    const courseAllProm = getCourseAll(params);
    const courseAll = await courseAllProm;
    const { youWillLearnText } = extractCourseAll(courseAll)

    return (
        
        <YouWillLearn youWillLearn={youWillLearnText} />
    );
}

export default CourseSlugYouWillLearn;