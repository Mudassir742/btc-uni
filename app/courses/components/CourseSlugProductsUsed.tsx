import React, { HTMLAttributes } from 'react';
import { extractCourseAll, extractCourseProductsUsed, getCourseAll, getCourseProductsUsed, themeColor } from '../helper';
import ProductsUsed from '@/components/ProductsUsed';
import { UserSession } from '@/interfaces';
import H4Text from '@/components/text/H4Text';

interface CourseSlugProductsUsedProps extends HTMLAttributes<HTMLDivElement> {
    params: { slug: string };
    user: UserSession | null;
}
const themecolor = 'red';
// const themecolor = '#523D34'

const CourseSlugProductsUsed: React.FC<CourseSlugProductsUsedProps> = async ({ params, className, user }) => {

    // const courseProductsUsedProm = getCourseProductsUsed(params);
    // const courseProductsUsed = await courseProductsUsedProm;
    // const { usedProducts } = extractCourseProductsUsed(courseProductsUsed);

    const courseAllProm = getCourseAll(params);
    const courseAll = await courseAllProm;
    const { usedProducts, courseID } = extractCourseAll(courseAll)

    return (
        <div className={className}>
            {usedProducts.length > 0 && (
                <div className='slider-container md:px-0'>
                    <H4Text text='Products Used' className='text-themeColor ' />

                    <ProductsUsed productsUsed={usedProducts} productTitleTextColor={themeColor} userDataId={(user?.userDataId || 0).toString()} courseId={courseID} />
              
                </div>
            )}
        </div>
    );
}

export default CourseSlugProductsUsed;