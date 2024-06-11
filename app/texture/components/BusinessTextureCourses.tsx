import React from 'react';
import { getBusinessTextureCourses, createCourseCards, Section } from '../helper';

const BusinessTextureCourses: React.FC = async () => {

    const businessTEXTURECoursesPromise = getBusinessTextureCourses();
    const businessTEXTURECourses = await businessTEXTURECoursesPromise;
    const businessTEXTURECoursesChecked = businessTEXTURECourses ? businessTEXTURECourses : [];
    const businessTEXTURECoursesCards = businessTEXTURECoursesChecked.length > 0 ? createCourseCards(businessTEXTURECoursesChecked) : [];

    return (
        <div>
        {businessTEXTURECoursesCards.length > 0 && (
        <div id="Business-section">
          <Section title="Business" cards={businessTEXTURECoursesCards} />
        </div>
        )}
        </div>
    );
}

export default BusinessTextureCourses;