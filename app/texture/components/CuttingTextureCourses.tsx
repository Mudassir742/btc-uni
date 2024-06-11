import React from 'react';
import { getCuttingTextureCourses, createCourseCards, Section } from '../helper';

const CuttingTextureCourses: React.FC = async () => {

    const cuttingTEXTURECoursesPromise = getCuttingTextureCourses();
    const cuttingTEXTURECourses = await cuttingTEXTURECoursesPromise;
    const cuttingTEXTURECoursesChecked = cuttingTEXTURECourses ? cuttingTEXTURECourses : [];
    const cuttingTEXTURECoursesCards = cuttingTEXTURECoursesChecked.length > 0 ? createCourseCards(cuttingTEXTURECoursesChecked) : [];

    return (
        <div>
        {cuttingTEXTURECoursesCards.length > 0 && (
        <div id="Cutting-section">
          <Section title="Cutting & Styling" cards={cuttingTEXTURECoursesCards} />
        </div>
        )}
        </div>
    );
}

export default CuttingTextureCourses;