import React from 'react';
import { getBalayageHaircolorCourses, createCourseCards, Section } from '../helper';

const BalayageHaircolorCourses: React.FC = async () => {

    const balayageHAIRCOLORCoursesPromise = getBalayageHaircolorCourses();
    const balayageHAIRCOLORCourses = await balayageHAIRCOLORCoursesPromise;
    const balayageHAIRCOLORCoursesChecked = balayageHAIRCOLORCourses ? balayageHAIRCOLORCourses : [];
    const balayageHAIRCOLORCoursesCards = balayageHAIRCOLORCoursesChecked.length > 0 ? createCourseCards(balayageHAIRCOLORCoursesChecked) : [];

    return (
        <div>
        {balayageHAIRCOLORCoursesCards.length > 0 && (
        <div id="Balayage-section">
          <Section title="Balayage" cards={balayageHAIRCOLORCoursesCards} />
        </div>
        )}
        </div>
    );
}

export default BalayageHaircolorCourses;