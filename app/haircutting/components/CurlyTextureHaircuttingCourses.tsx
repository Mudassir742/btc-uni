import React from 'react';
import { getTextureHaircuttingCourses, createCourseCards, Section } from '../helper';

const CurlyTextureHaircuttingCourses: React.FC = async () => {

    const textureHAIRCUTTINGCoursesPromise = getTextureHaircuttingCourses();
    const textureHAIRCUTTINGCourses = await textureHAIRCUTTINGCoursesPromise;
    const textureHAIRCUTTINGCoursesChecked = textureHAIRCUTTINGCourses ? textureHAIRCUTTINGCourses : [];
    const textureHAIRCUTTINGCoursesCards = textureHAIRCUTTINGCoursesChecked.length > 0 ? createCourseCards(textureHAIRCUTTINGCoursesChecked) : [];

    return (
        <div>
        {textureHAIRCUTTINGCoursesCards.length > 0 && (
        <div id="Curly-Texture-section">
          <Section title="Curly & Texture Cuts" cards={textureHAIRCUTTINGCoursesCards} />
        </div>
        )}
        </div>
    );
}

export default CurlyTextureHaircuttingCourses;