import React from 'react';
import SH1Text from './text/SH1Text';
import { Course, Educator } from '@/interfaces';
import YouTubeVideoCardSameEducator from './YouTubeVideoCard';

interface SameEducatorProps {
    coursesFromTheSameEducator: Course[];
    themeColor: string;
    educator: string[];
    userDataBaseId: string;

}

const SameEducator: React.FC<SameEducatorProps> = ({ educator, coursesFromTheSameEducator, themeColor, userDataBaseId }) => {


    const createSameEducatorCourseCards = (courses: Course[]) => courses
        .map((course: Course) => (
            <YouTubeVideoCardSameEducator key={course.slug} course={course} completed={false} themeColor={themeColor} educators={(course?.courseMetadata?.educators || []).map((educator: Educator) => educator?.educatorMetaData?.instahandle || "")} userDataBaseId={userDataBaseId} />
        ));

    // create the cards for each upcoming course
    const sameEducatorCards = createSameEducatorCourseCards(coursesFromTheSameEducator);

    return (
        <div>
            {coursesFromTheSameEducator.length > 0 && (
                <div>
                    <div className="flex items-center justify-between">
                        <div className="flex items-center">
                     

                        <SH1Text text={`More Courses From ${educator}`} />
                        

                            <div className='space-under-category-titles' />

                        </div>

                    </div>
                    <div className="flex overflow-x-auto space-x-4">
                        {sameEducatorCards}
                    </div>
                </div>
            )}
        </div>
    );
}

export default SameEducator;
