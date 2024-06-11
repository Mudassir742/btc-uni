import React from 'react';
import { getCurlsTextureHaircolorCourses, createCourseCards, Section } from '../helper';

const CurlsTextureHaircolorCourses: React.FC = async () => {

    const curlsHAIRCOLORCoursesPromise = getCurlsTextureHaircolorCourses();
    const curlsHAIRCOLORCourses = await curlsHAIRCOLORCoursesPromise;
    const curlsHAIRCOLORCoursesChecked = curlsHAIRCOLORCourses ? curlsHAIRCOLORCourses : [];
    const curlsHAIRCOLORCoursesCards = curlsHAIRCOLORCoursesChecked.length > 0 ? createCourseCards(curlsHAIRCOLORCoursesChecked) : [];

    return (
        <div>
        {curlsHAIRCOLORCoursesCards.length > 0 && (
        <div id="Curls-section">
          <Section title="Curls & Texture" cards={curlsHAIRCOLORCoursesCards} />
        </div>
        )}
        </div>
    );
}

export default CurlsTextureHaircolorCourses;