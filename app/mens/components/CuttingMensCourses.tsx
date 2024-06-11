import React from 'react';
import { getCuttingMensCourses, createCourseCards, Section } from '../helper';

const CuttingMensCourses: React.FC = async () => {

    const cuttingMENSCoursesPromise = getCuttingMensCourses();
    const cuttingMENSCourses = await cuttingMENSCoursesPromise;
    const cuttingMENSCoursesChecked = cuttingMENSCourses ? cuttingMENSCourses : [];
    const cuttingMENSCoursesCards = cuttingMENSCoursesChecked.length > 0 ? createCourseCards(cuttingMENSCoursesChecked) : [];

    return (
        <div>
        {cuttingMENSCoursesCards.length > 0 && (
        <div id="Cutting-section">
          <Section title="Cutting & Styling" cards={cuttingMENSCoursesCards} />
        </div>
        )}
        </div>
    );
}

export default CuttingMensCourses;