import React from 'react';
import { extractCourseAll, getCourseAll, getCourseContent } from '../helper';

import ShareCourseButton from '@/components/ShareCourseButton';
import { UserSession } from '@/interfaces';

interface CourseSlugShareButtonProps {
    params: { slug: string };
    user: UserSession | null;
}

const CourseSlugShareButton: React.FC<CourseSlugShareButtonProps> = async ({ params, user }) => {

    // const courseContentProm = getCourseContent(params);
    // const courseContent = await courseContentProm;

    const courseAllProm = getCourseAll(params);
    const courseAll = await courseAllProm;
    const { courseDescription, courseThumbnailPicture, courseID } = extractCourseAll(courseAll)

    return (
        <ShareCourseButton shareText={courseDescription} shareImg={courseThumbnailPicture} userDataBaseId={(user?.userDataId || 0).toString()} courseId={courseID}/>
    );
}

export default CourseSlugShareButton;