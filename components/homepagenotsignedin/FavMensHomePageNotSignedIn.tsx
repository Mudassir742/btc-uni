import React from 'react';
import { getFavoriteHaircolorCourses, createCourseCards, Section, getFavoriteMensCourses } from '@/app/helper';

const FavMensHomePageNotSignedIn: React.FC = async () => {

    const favMENSCoursesPromise = getFavoriteMensCourses();
    const favMENSCourses = await favMENSCoursesPromise;
    const favMENSCoursesChecked = favMENSCourses ? favMENSCourses : [];
    const favMENSCoursesCards = favMENSCoursesChecked.length > 0 ? createCourseCards(favMENSCoursesChecked) : [];

    return (
        <div>
            {favMENSCoursesCards.length > 0 && (
                <div id="homepage-Mens-favs">
                    <Section title="Men's Courses" cards={favMENSCoursesCards} />
                </div>
            )}
        </div>
    );
}

export default FavMensHomePageNotSignedIn;