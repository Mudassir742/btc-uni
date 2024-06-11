import React from 'react';
import SH1Text from './text/SH1Text';
import { Course, Educator } from '@/interfaces';
import YouTubeVideoCard from './YouTubeVideoCard';

interface SameSeriesProps {
    coursesFromTheSameSeries: Course[];
    themeColor: string;
    userDataBaseId: string;
}

const SameSeries: React.FC<SameSeriesProps> = ({ coursesFromTheSameSeries, themeColor, userDataBaseId }) => {


    const createSameSeriesCourseCards = (courses: Course[]) => courses
        .map((course: Course) => (
            <YouTubeVideoCard key={course.slug} course={course} completed={false} themeColor={themeColor} educators={(course?.courseMetadata?.educators || []).map((educator: Educator) => educator?.educatorMetaData?.instahandle || "")} userDataBaseId={userDataBaseId}/>
        ));

    // create the cards for each upcoming course
    const sameSeriesCards = createSameSeriesCourseCards(coursesFromTheSameSeries);

    return (
        <div>
            {coursesFromTheSameSeries.length > 0 && (
                <div>
                    <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center">
                            <div className='upcoming-title'>

                                <SH1Text text="Same Series" />
                            </div>

                            <div className='space-under-category-titles' />

                        </div>

                    </div>
                    <div className="flex overflow-x-auto space-x-4">
                        {sameSeriesCards}
                    </div>
                </div>
            )}
        </div>
    );
}

export default SameSeries;
