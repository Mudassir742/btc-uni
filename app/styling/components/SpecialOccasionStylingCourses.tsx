import React from 'react';
import { getSpecialStylingCourses, createCourseCards, Section } from '../helper';

const SpecialStylingCourses: React.FC = async () => {

    const specialSTYLINGCoursesPromise = getSpecialStylingCourses();
    const specialSTYLINGCourses = await specialSTYLINGCoursesPromise;
    const specialSTYLINGCoursesChecked = specialSTYLINGCourses ? specialSTYLINGCourses : [];
    const specialSTYLINGCoursesCards = specialSTYLINGCoursesChecked.length > 0 ? createCourseCards(specialSTYLINGCoursesChecked) : [];

    return (
        <div>
        {specialSTYLINGCoursesCards.length > 0 && (
        <div id="Special-section">
          <Section title="Special Occasion" cards={specialSTYLINGCoursesCards} />
        </div>
        )}
        </div>
    );
}

export default SpecialStylingCourses;