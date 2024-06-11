import React from 'react';
import { getCuttingTextureCourses, createCourseCards, Section, getHaircolorTextureCourses } from '../helper';

const HaircolorTextureCourses: React.FC = async () => {

    const haircolorTEXTURECoursesPromise = getHaircolorTextureCourses();
    const haircolorTEXTURECourses = await haircolorTEXTURECoursesPromise;
    const haircolorTEXTURECoursesChecked = haircolorTEXTURECourses ? haircolorTEXTURECourses : [];
    const haircolorTEXTURECoursesCards = haircolorTEXTURECoursesChecked.length > 0 ? createCourseCards(haircolorTEXTURECoursesChecked) : [];

    return (
        <div>
        {haircolorTEXTURECoursesCards.length > 0 && (
        <div id="Haircolor-section">
          <Section title="Hair Color" cards={haircolorTEXTURECoursesCards} />
        </div>
        )}
        </div>
    );
}

export default HaircolorTextureCourses;