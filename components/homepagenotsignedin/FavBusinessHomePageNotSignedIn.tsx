import React from 'react';
import { getFavoriteBusinessCourses, createCourseCards, Section } from '@/app/helper';

const FavBusinessHomePageNotSignedIn: React.FC = async () => {

    const favBUSINESSCoursesPromise = getFavoriteBusinessCourses();
    const favBUSINESSCourses = await favBUSINESSCoursesPromise;
    const favBUSINESSCoursesCoursesChecked = favBUSINESSCourses ? favBUSINESSCourses : [];
    const favBUSINESSCoursesCoursesCards = favBUSINESSCoursesCoursesChecked.length > 0 ? createCourseCards(favBUSINESSCoursesCoursesChecked) : [];

    return (
        <div>
            {favBUSINESSCoursesCoursesCards.length > 0 && (
                <div id="homepage-Business-favs">
                    <Section title="Business Courses" cards={favBUSINESSCoursesCoursesCards} />
                </div>
            )}
        </div>
    );
}

export default FavBusinessHomePageNotSignedIn;