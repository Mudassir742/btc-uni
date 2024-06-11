import React from 'react';
import { getRazorHaircuttingCourses, createCourseCards, Section } from '../helper';

const RazorCuttingHaircuttingCourses: React.FC = async () => {

    const razorHAIRCUTTINGCoursesPromise = getRazorHaircuttingCourses();
    const razorHAIRCUTTINGCourses = await razorHAIRCUTTINGCoursesPromise;
    const razorHAIRCUTTINGCoursesChecked = razorHAIRCUTTINGCourses ? razorHAIRCUTTINGCourses : [];
    const razorHAIRCUTTINGCoursesCards = razorHAIRCUTTINGCoursesChecked.length > 0 ? createCourseCards(razorHAIRCUTTINGCoursesChecked) : [];

    return (
        <div>
        {razorHAIRCUTTINGCoursesCards.length > 0 && (
        <div id="razor-section">
          <Section title="Razor Cutting" cards={razorHAIRCUTTINGCoursesCards} />
        </div>
        )}
        </div>
    );
}

export default RazorCuttingHaircuttingCourses;