import React from 'react';
import { getSchoremMensCourses, createCourseCards, Section } from '../helper';

const SchoremMensCourses: React.FC = async () => {

    const schoremMENSCoursesPromise = getSchoremMensCourses();
    const schoremMENSCourses = await schoremMENSCoursesPromise;
    const schoremMENSCoursesChecked = schoremMENSCourses ? schoremMENSCourses : [];
    const schoremMENSCoursesCards = schoremMENSCoursesChecked.length > 0 ? createCourseCards(schoremMENSCoursesChecked) : [];

    return (
        <div>
        {schoremMENSCoursesCards.length > 0 && (
        <div id="Schorem-section">
          <Section title="Schorem" cards={schoremMENSCoursesCards} />
        </div>
        )}
        </div>
    );
}

export default SchoremMensCourses;