import React from 'react';
import { getGrayHaircolorCourses, createCourseCards, Section } from '../helper';

const GrayCoverageHaircolorCourses: React.FC = async () => {

    const grayHAIRCOLORCoursesPromise = getGrayHaircolorCourses();
    const grayHAIRCOLORCourses = await grayHAIRCOLORCoursesPromise;
    const grayHAIRCOLORCoursesChecked = grayHAIRCOLORCourses ? grayHAIRCOLORCourses : [];
    const grayHAIRCOLORCoursesCards = grayHAIRCOLORCoursesChecked.length > 0 ? createCourseCards(grayHAIRCOLORCoursesChecked) : [];

    return (
        <div>
        {grayHAIRCOLORCoursesCards.length > 0 && (
        <div id="Gray-coverage-section">
          <Section title="Gray Coverage" cards={grayHAIRCOLORCoursesCards} />
        </div>
        )}
        </div>
    );
}

export default GrayCoverageHaircolorCourses;