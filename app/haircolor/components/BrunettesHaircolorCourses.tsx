import React from 'react';
import { getBrunettesHaircolorCourses, createCourseCards, Section } from '../helper';

const BrunettesHaircolorCourses: React.FC = async () => {

    const brunettesHAIRCOLORCoursesPromise = getBrunettesHaircolorCourses();
    const brunettesHAIRCOLORCourses = await brunettesHAIRCOLORCoursesPromise;
    const brunettesHAIRCOLORCoursesChecked = brunettesHAIRCOLORCourses ? brunettesHAIRCOLORCourses : [];
    const brunettesHAIRCOLORCoursesCards = brunettesHAIRCOLORCoursesChecked.length > 0 ? createCourseCards(brunettesHAIRCOLORCoursesChecked) : [];

    return (
        <div>
        {brunettesHAIRCOLORCoursesCards.length > 0 && (
        <div id="Brunettes-section">
          <Section title="Brunettes" cards={brunettesHAIRCOLORCoursesCards} />
        </div>
        )}
        </div>
    );
}

export default BrunettesHaircolorCourses;