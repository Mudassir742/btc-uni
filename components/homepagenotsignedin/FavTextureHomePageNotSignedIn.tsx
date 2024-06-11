import React from 'react';
import { getFavoriteHaircolorCourses, createCourseCards, Section, getFavoriteTextureCourses } from '@/app/helper';

const FavTextureHomePageNotSignedIn: React.FC = async () => {

    const favTEXTURECoursesPromise = getFavoriteTextureCourses();
    const favTEXTURECourses = await favTEXTURECoursesPromise;
    const favTEXTURECoursesChecked = favTEXTURECourses ? favTEXTURECourses : [];
    const favTEXTURECoursesCards = favTEXTURECoursesChecked.length > 0 ? createCourseCards(favTEXTURECoursesChecked) : [];

    return (
        <div>
            {favTEXTURECoursesCards.length > 0 && (
                <div id="homepage-Texture-favs">
                    <Section title="Texture Courses" cards={favTEXTURECoursesCards} />
                </div>
            )}
        </div>
    );
}

export default FavTextureHomePageNotSignedIn;