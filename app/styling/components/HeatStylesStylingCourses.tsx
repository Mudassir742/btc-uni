import React from 'react';
import { getHeatStylingCourses, createCourseCards, Section } from '../helper';

const HeatStylingCourses: React.FC = async () => {

    const heatSTYLINGCoursesPromise = getHeatStylingCourses();
    const heatSTYLINGCourses = await heatSTYLINGCoursesPromise;
    const heatSTYLINGCoursesChecked = heatSTYLINGCourses ? heatSTYLINGCourses : [];
    const heatSTYLINGCoursesCards = heatSTYLINGCoursesChecked.length > 0 ? createCourseCards(heatSTYLINGCoursesChecked) : [];

    return (
        <div>
        {heatSTYLINGCoursesCards.length > 0 && (
        <div id="Heat-section">
          <Section title="Heat Styles" cards={heatSTYLINGCoursesCards} />
        </div>
        )}
        </div>
    );
}

export default HeatStylingCourses;