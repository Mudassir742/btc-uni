import React from 'react';
import { getShagsHaircuttingCourses, createCourseCards, Section } from '../helper';

const ShagsHaircuttingCourses: React.FC = async () => {

    const shagsHAIRCUTTINGCoursesPromise = getShagsHaircuttingCourses();
    const shagsHAIRCUTTINGCourses = await shagsHAIRCUTTINGCoursesPromise;
    const shagsHAIRCUTTINGCoursesChecked = shagsHAIRCUTTINGCourses ? shagsHAIRCUTTINGCourses : [];
    const shagsHAIRCUTTINGCoursesCards = shagsHAIRCUTTINGCoursesChecked.length > 0 ? createCourseCards(shagsHAIRCUTTINGCoursesChecked) : [];

    return (
        <div>
        {shagsHAIRCUTTINGCoursesCards.length > 0 && (
        <div id="Shags-section">
          <Section title="Shags" cards={shagsHAIRCUTTINGCoursesCards} />
        </div>
        )}
        </div>
    );
}

export default ShagsHaircuttingCourses;