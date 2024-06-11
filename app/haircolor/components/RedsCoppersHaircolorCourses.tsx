import React from 'react';
import { getRedsCoppersHaircolorCourses, createCourseCards, Section } from '../helper';

const RedsCoppersHaircolorCourses: React.FC = async () => {

    const redsHAIRCOLORCoursesPromise = getRedsCoppersHaircolorCourses();
    const redsHAIRCOLORCourses = await redsHAIRCOLORCoursesPromise;
    const redsHAIRCOLORCoursesChecked = redsHAIRCOLORCourses ? redsHAIRCOLORCourses : [];
    const redsHAIRCOLORCoursesCards = redsHAIRCOLORCoursesChecked.length > 0 ? createCourseCards(redsHAIRCOLORCoursesChecked) : [];

    return (
        <div>
        {redsHAIRCOLORCoursesCards.length > 0 && (
        <div id="Reds-section">
          <Section title="Reds & Coppers" cards={redsHAIRCOLORCoursesCards} />
        </div>
        )}
        </div>
    );
}

export default RedsCoppersHaircolorCourses;