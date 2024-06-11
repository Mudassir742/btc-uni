import React, { HTMLAttributes } from 'react';
import { extractCourseAll, extractCourseTestimonials, getCourseAll } from '../helper';
import Testimonials from '@/components/Testimonials';
import { UserSession } from '@/interfaces';

interface CourseSlugTestimonialsProps extends HTMLAttributes<HTMLDivElement> {
    params: { slug: string };
    user: UserSession | null;
}

const CourseSlugTestimonials: React.FC<CourseSlugTestimonialsProps> = async ({ params, className, user }) => {

    // const courseTestimonialsProm = getCourseTestimonials(params);
    // const courseTestimonials = await courseTestimonialsProm;
    // const { courseTestimonialsNew } = extractCourseTestimonials(courseTestimonials);

    const courseAllProm = getCourseAll(params);
    const courseAll = await courseAllProm;
    const { courseTestimonialsNew, courseID } = extractCourseAll(courseAll)

    // Check if there are testimonials available
    const hasTestimonials = courseTestimonialsNew && courseTestimonialsNew.length > 0;

    return (
        <div className='px-3 lg:px-0'>
            {hasTestimonials && (
                <Testimonials testimonials={courseTestimonialsNew} userDataBaseId={(user?.userDataId || 0).toString()} courseId={courseID} />
            )}        </div>
    );
}

export default CourseSlugTestimonials;