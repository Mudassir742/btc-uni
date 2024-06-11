import React from 'react';
import { getCreativeHaircolorCourses, createCourseCards, Section } from '../helper';

const CreativeColorHaircolorCourses: React.FC = async () => {

    const creativeHAIRCOLORCoursesPromise = getCreativeHaircolorCourses();
    const creativeHAIRCOLORCourses = await creativeHAIRCOLORCoursesPromise;
    const creativeHAIRCOLORCoursesChecked = creativeHAIRCOLORCourses ? creativeHAIRCOLORCourses : [];
    const creativeHAIRCOLORCoursesCards = creativeHAIRCOLORCoursesChecked.length > 0 ? createCourseCards(creativeHAIRCOLORCoursesChecked) : [];

    return (
        <div>
        {creativeHAIRCOLORCoursesCards.length > 0 && (
        <div id="Creative-section">
          <Section title="Creative Color" cards={creativeHAIRCOLORCoursesCards} />
        </div>
        )}
        </div>
    );
}

export default CreativeColorHaircolorCourses;