import React from 'react';
import { createCourseCards, Section, getFavoriteExtensionsCourses } from '@/app/helper';

const FavExtensionsHomePageNotSignedIn: React.FC = async () => {

    const favEXTENSIONSCoursesPromise = getFavoriteExtensionsCourses();
    const favEXTENSIONSCourses = await favEXTENSIONSCoursesPromise;
    const favEXTENSIONSCoursesChecked = favEXTENSIONSCourses ? favEXTENSIONSCourses : [];
    const favEXTENSIONSCoursesCards = favEXTENSIONSCoursesChecked.length > 0 ? createCourseCards(favEXTENSIONSCoursesChecked) : [];

    return (
        <div>
            {favEXTENSIONSCoursesCards.length > 0 && (
                <div id="homepage-Extensions-favs">
                    <Section title="Extensions Courses" cards={favEXTENSIONSCoursesCards} />
                </div>
            )}
        </div>
    );
}

export default FavExtensionsHomePageNotSignedIn;