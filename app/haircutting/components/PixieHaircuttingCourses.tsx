import React from 'react';
import { getPixieHaircuttingCourses, createCourseCards, Section } from '../helper';

const PixieHaircuttingCourses: React.FC = async () => {

    const pixieHAIRCUTTINGCoursesPromise = getPixieHaircuttingCourses();
    const pixieHAIRCUTTINGCourses = await pixieHAIRCUTTINGCoursesPromise;
    const pixieHAIRCUTTINGCoursesChecked = pixieHAIRCUTTINGCourses ? pixieHAIRCUTTINGCourses : [];
    const pixieHAIRCUTTINGCoursesCards = pixieHAIRCUTTINGCoursesChecked.length > 0 ? createCourseCards(pixieHAIRCUTTINGCoursesChecked) : [];

    return (
        <div>
        {pixieHAIRCUTTINGCoursesCards.length > 0 && (
        <div id="Pixie-section">
          <Section title="Pixie" cards={pixieHAIRCUTTINGCoursesCards} />
        </div>
        )}
        </div>
    );
}

export default PixieHaircuttingCourses;