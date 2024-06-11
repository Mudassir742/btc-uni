import React from 'react';
import { getPlatinumBlondesHaircolorCourses, createCourseCards, Section } from '../helper';

const PlatinumBlondesHaircolorCourses: React.FC = async () => {

    const platinumBlondesHAIRCOLORCoursesPromise = getPlatinumBlondesHaircolorCourses();
    const platinumBlondesHAIRCOLORCourses = await platinumBlondesHAIRCOLORCoursesPromise;
    const platinumBlondesHAIRCOLORCoursesChecked = platinumBlondesHAIRCOLORCourses ? platinumBlondesHAIRCOLORCourses : [];
    const platinumBlondesHAIRCOLORCoursesCards = platinumBlondesHAIRCOLORCoursesChecked.length > 0 ? createCourseCards(platinumBlondesHAIRCOLORCoursesChecked) : [];

    return (
        <div>
        {platinumBlondesHAIRCOLORCoursesCards.length > 0 && (
        <div id="Platinum-section">
          <Section title="Platinum Blondes" cards={platinumBlondesHAIRCOLORCoursesCards} />
        </div>
        )}
        </div>
    );
}

export default PlatinumBlondesHaircolorCourses;