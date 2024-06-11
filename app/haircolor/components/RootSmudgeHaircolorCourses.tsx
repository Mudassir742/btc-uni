import React from 'react';
import { getFoilingHaircolorCourses, createCourseCards, Section, getRootSmudgeHaircolorCourses } from '../helper';

const RootSmudgeHaircolorCourses: React.FC = async () => {

    const rootHAIRCOLORCoursesPromise = getRootSmudgeHaircolorCourses();
    const rootHAIRCOLORCourses = await rootHAIRCOLORCoursesPromise;
    const rootHAIRCOLORCoursesChecked = rootHAIRCOLORCourses ? rootHAIRCOLORCourses : [];
    const rootHAIRCOLORCoursesCards = rootHAIRCOLORCoursesChecked.length > 0 ? createCourseCards(rootHAIRCOLORCoursesChecked) : [];

    return (
        <div>
        {rootHAIRCOLORCoursesCards.length > 0 && (
        <div id="Root-section">
            <Section title="Root Smudges, Shadows & Melts" cards={rootHAIRCOLORCoursesCards} />
        </div>
        )}
        </div>
    );
}

export default RootSmudgeHaircolorCourses;