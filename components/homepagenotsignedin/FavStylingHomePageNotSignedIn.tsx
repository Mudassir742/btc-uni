import React from 'react';
import { getFavoriteHaircolorCourses, createCourseCards, Section, getFavoriteStylingCourses } from '@/app/helper';

const FavStylingHomePageNotSignedIn: React.FC = async () => {

    const favSTYLINGCoursesPromise = getFavoriteStylingCourses();
    const favSTYLINGCourses = await favSTYLINGCoursesPromise;
    const favSTYLINGCoursesChecked = favSTYLINGCourses ? favSTYLINGCourses : [];
    const favSTYLINGCoursesCards = favSTYLINGCoursesChecked.length > 0 ? createCourseCards(favSTYLINGCoursesChecked) : [];

    return (
        <div>
            {favSTYLINGCoursesCards.length > 0 && (
                <div id="homepage-Styling-favs">
                    <Section title="Styling Courses" cards={favSTYLINGCoursesCards} />
                </div>
            )}
        </div>
    );
}

export default FavStylingHomePageNotSignedIn;