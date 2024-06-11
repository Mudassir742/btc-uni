import React from 'react';
import { getBobsHaircuttingCourses, createCourseCards, Section } from '../helper';

const BobsLobsHaircuttingCourses: React.FC = async () => {

    const bobsHAIRCUTTINGCoursesPromise = getBobsHaircuttingCourses();
    const bobsHAIRCUTTINGCourses = await bobsHAIRCUTTINGCoursesPromise;
    const bobsHAIRCUTTINGCoursesChecked = bobsHAIRCUTTINGCourses ? bobsHAIRCUTTINGCourses : [];
    const bobsHAIRCUTTINGCoursesCards = bobsHAIRCUTTINGCoursesChecked.length > 0 ? createCourseCards(bobsHAIRCUTTINGCoursesChecked) : [];

    return (
        <div>
        {bobsHAIRCUTTINGCoursesCards.length > 0 && (
        <div id="Bobs-section">
          <Section title="Bobs + Lobs" cards={bobsHAIRCUTTINGCoursesCards} />
        </div>
        )}
        </div>
    );
}

export default BobsLobsHaircuttingCourses;