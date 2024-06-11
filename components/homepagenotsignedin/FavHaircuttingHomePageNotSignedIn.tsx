import React from 'react';
import { getFavoriteHaircolorCourses, createCourseCards, Section, getFavoriteHaircuttingCourses } from '@/app/helper';

const FavHaircuttingHomePageNotSignedIn: React.FC = async () => {

    const favHAIRCUTTINGCoursesPromise = getFavoriteHaircuttingCourses();
    const favHAIRCUTTINGCourses = await favHAIRCUTTINGCoursesPromise;
    const favHAIRCUTTINGCoursesChecked = favHAIRCUTTINGCourses ? favHAIRCUTTINGCourses : [];
    const favHAIRCUTTINGCoursesCards = favHAIRCUTTINGCoursesChecked.length > 0 ? createCourseCards(favHAIRCUTTINGCoursesChecked) : [];

    return (
        <div>
            {favHAIRCUTTINGCoursesCards.length > 0 && (
                <div id="homepage-Haircutting-favs">
                    <Section title="Haircutting Courses" cards={favHAIRCUTTINGCoursesCards} />
                </div>
            )}
        </div>
    );
}

export default FavHaircuttingHomePageNotSignedIn;