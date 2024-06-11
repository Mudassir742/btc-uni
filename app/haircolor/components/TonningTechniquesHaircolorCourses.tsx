import React from 'react';
import { getToningHaircolorCourses, createCourseCards, Section } from '../helper';

const TonningTechniquesHaircolorCourses: React.FC = async () => {

    const tonningHAIRCOLORCoursesPromise = getToningHaircolorCourses();
    const tonningHAIRCOLORCourses = await tonningHAIRCOLORCoursesPromise;
    const tonningHAIRCOLORCoursesChecked = tonningHAIRCOLORCourses ? tonningHAIRCOLORCourses : [];
    const tonningHAIRCOLORCoursesCards = tonningHAIRCOLORCoursesChecked.length > 0 ? createCourseCards(tonningHAIRCOLORCoursesChecked) : [];

    return (
        <div>
        {tonningHAIRCOLORCoursesCards.length > 0 && (
        <div id="Toning-section">
          <Section title="Toning Techniques" cards={tonningHAIRCOLORCoursesCards} />
        </div>
        )}
        </div>
    );
}

export default TonningTechniquesHaircolorCourses;