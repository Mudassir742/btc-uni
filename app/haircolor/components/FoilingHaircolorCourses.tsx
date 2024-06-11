import React from 'react';
import { getFoilingHaircolorCourses, createCourseCards, Section } from '../helper';

const FoilingHaircolorCourses: React.FC = async () => {

    const foilingHAIRCOLORCoursesPromise = getFoilingHaircolorCourses();
    const foilingHAIRCOLORCourses = await foilingHAIRCOLORCoursesPromise;
    const foilingHAIRCOLORCoursesChecked = foilingHAIRCOLORCourses ? foilingHAIRCOLORCourses : [];
    const foilingHAIRCOLORCoursesCards = foilingHAIRCOLORCoursesChecked.length > 0 ? createCourseCards(foilingHAIRCOLORCoursesChecked) : [];

    return (
        <div>
        {foilingHAIRCOLORCoursesCards.length > 0 && (
        <div id="Foiling-section">
          <Section title="Foiling" cards={foilingHAIRCOLORCoursesCards} />
        </div>
        )}
        </div>
    );
}

export default FoilingHaircolorCourses;