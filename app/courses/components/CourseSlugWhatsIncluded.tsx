import React from 'react';
import { getCourseWhatsIncluded, extractCourseWhatsIncluded, getCourseAll, extractCourseAll, } from '../helper';
import WhatsIncluded from '@/components/WhatsIncluded';

interface CourseSlugWhatsIncludedProps {
    params: { slug: string };
    themeColor: string;
}

const CourseSlugWhatsIncluded: React.FC<CourseSlugWhatsIncludedProps> = async ({ params, themeColor }) => {

    const courseAllProm = getCourseAll(params);
    const courseAll = await courseAllProm;
    const { theCourseFormulas, usedProducts, downloadables} = extractCourseAll(courseAll)

    const hasFormulas = theCourseFormulas !== "";
    const hasProducts = usedProducts.length > 0;
    const hasDownloadables = downloadables.length > 0;

    return (
        <WhatsIncluded
            hasDownloadables={hasDownloadables}
            hasFormulas={hasFormulas}
            themecolor={themeColor}
            hasProducts={hasProducts} />
    );
}

export default CourseSlugWhatsIncluded;