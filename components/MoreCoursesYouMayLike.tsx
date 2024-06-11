import React from 'react';
import SH1Text from './text/SH1Text';
import { Course, Educator } from '@/interfaces';
import YouTubeVideoCardMoreCoursesYouMayLike from './YouTubeVideoCard';

interface MoreCoursesYouMayLikeProps {
    relatedCourses: Course[];
    themeColor: string;
    userDataBaseId: string;
}

const MoreCoursesYouMayLike: React.FC<MoreCoursesYouMayLikeProps> = ({ relatedCourses, themeColor, userDataBaseId }) => {


    const createRelatedCourseCards = (courses: Course[]) => courses
        .map((course: Course) => (
            <YouTubeVideoCardMoreCoursesYouMayLike key={course.slug}
            userDataBaseId={userDataBaseId} course={course} completed={false} themeColor={themeColor} educators={(course?.courseMetadata?.educators || []).map((educator: Educator) => educator?.educatorMetaData?.instahandle || "")} />
        ));

    // create the cards for each upcoming course
    const relatedCoursesCards = createRelatedCourseCards(relatedCourses);

    return (
        <div>
            {relatedCourses.length > 0 && (
                <div>
                        <div className="flex items-center">

                                <SH1Text text="More Courses You May Like" />
                       

                            <div className='space-under-category-titles' />

                        </div>

                  
                    <div className="flex overflow-x-auto space-x-4 w-full">
                        {relatedCoursesCards}
                    </div>
                </div>
            )}
        </div>
    );
}

export default MoreCoursesYouMayLike;
