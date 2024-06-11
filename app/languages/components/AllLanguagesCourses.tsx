import React from 'react';
import { getAllLanguagesCourses, createCourseCards, Section } from '../helper';

const AllLanguagesCourses: React.FC = async () => {

    const allLANGCoursesPromise = getAllLanguagesCourses();
    const allLANGCourses = await allLANGCoursesPromise;
    const allLANGCoursesChecked = allLANGCourses ? allLANGCourses : [];
    const allLANGCoursesCards = allLANGCoursesChecked.length > 0 ? createCourseCards(allLANGCoursesChecked) : [];

    return (
        <div>
        {allLANGCoursesCards.length > 0 && (
        <div id="Languages-section">
          <Section title="Now Offering Subtitles in 6 Languages!" subtitle="English, Spanish, Italian, French, Portuguese & Russian" cards={allLANGCoursesCards} />
        </div>
        )}
        </div>
    );
}

export default AllLanguagesCourses;