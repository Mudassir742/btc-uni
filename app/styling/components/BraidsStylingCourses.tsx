import React from 'react';
import { getBraidsStylingCourses, createCourseCards, Section } from '../helper';

const BraidsStylingCourses: React.FC = async () => {

    const braidsSTYLINGCoursesPromise = getBraidsStylingCourses();
    const braidsSTYLINGCourses = await braidsSTYLINGCoursesPromise;
    const braidsSTYLINGCoursesChecked = braidsSTYLINGCourses ? braidsSTYLINGCourses : [];
    const braidsSTYLINGCoursesCards = braidsSTYLINGCoursesChecked.length > 0 ? createCourseCards(braidsSTYLINGCoursesChecked) : [];

    return (
        <div>
        {braidsSTYLINGCoursesCards.length > 0 && (
        <div id="Braids-section">
          <Section title="Braids" cards={braidsSTYLINGCoursesCards} />
        </div>
        )}
        </div>
    );
}

export default BraidsStylingCourses;