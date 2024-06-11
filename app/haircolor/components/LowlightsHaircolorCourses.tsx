import React from 'react';
import { getLowlightsHaircolorCourses, createCourseCards, Section } from '../helper';

const LowlightsHaircolorCourses: React.FC = async () => {

    const lowlightsHAIRCOLORCoursesPromise = getLowlightsHaircolorCourses();
    const lowlightsHAIRCOLORCourses = await lowlightsHAIRCOLORCoursesPromise;
    const lowlightsHAIRCOLORCoursesChecked = lowlightsHAIRCOLORCourses ? lowlightsHAIRCOLORCourses : [];
    const lowlightsHAIRCOLORCoursesCards = lowlightsHAIRCOLORCoursesChecked.length > 0 ? createCourseCards(lowlightsHAIRCOLORCoursesChecked) : [];

    return (
        <div>
        {lowlightsHAIRCOLORCoursesCards.length > 0 && (
        <div id="Lowlights-section">
          <Section title="Lowlights" cards={lowlightsHAIRCOLORCoursesCards} />
        </div>
        )}
        </div>
    );
}

export default LowlightsHaircolorCourses;