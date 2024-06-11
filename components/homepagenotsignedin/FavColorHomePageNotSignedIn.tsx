import React from 'react';
import { getFavoriteHaircolorCourses, createCourseCards, Section } from '@/app/helper';

const FavColorHomePageNotSignedIn: React.FC = async () => {

    const favHAIRCOLORCoursesPromise = getFavoriteHaircolorCourses();
    const favHAIRCOLORCourses = await favHAIRCOLORCoursesPromise;
    const favHAIRCOLORCoursesChecked = favHAIRCOLORCourses ? favHAIRCOLORCourses : [];
    const favHAIRCOLORCoursesCards = favHAIRCOLORCoursesChecked.length > 0 ? createCourseCards(favHAIRCOLORCoursesChecked) : [];

    return (
        <div>
            {favHAIRCOLORCoursesCards.length > 0 && (
                <div id="homepage-Haircolor-favs">
                    <Section title="Hair Color Courses" cards={favHAIRCOLORCoursesCards} />
                </div>
            )}
        </div>
    );
}

export default FavColorHomePageNotSignedIn;