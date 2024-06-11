import React from 'react';
import { getDryHaircuttingCourses, createCourseCards, Section } from '../helper';

const DryCuttingHaircuttingCourses: React.FC = async () => {

    const dryHAIRCUTTINGCoursesPromise = getDryHaircuttingCourses();
    const dryHAIRCUTTINGCourses = await dryHAIRCUTTINGCoursesPromise;
    const dryHAIRCUTTINGCoursesChecked = dryHAIRCUTTINGCourses ? dryHAIRCUTTINGCourses : [];
    const dryHAIRCUTTINGCoursesCards = dryHAIRCUTTINGCoursesChecked.length > 0 ? createCourseCards(dryHAIRCUTTINGCoursesChecked) : [];

    return (
        <div>
        {dryHAIRCUTTINGCoursesCards.length > 0 && (
        <div id="Dry-cutting-section">
          <Section title="Dry Cutting" cards={dryHAIRCUTTINGCoursesCards} />
        </div>
        )}
        </div>
    );
}

export default DryCuttingHaircuttingCourses;