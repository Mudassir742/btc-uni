import React from 'react';
import { getAllExtensionsCourses, createCourseCards, Section } from '../helper';

const AllExtensionCourses: React.FC = async () => {

    const allExtensionsCoursesPromise = getAllExtensionsCourses();
    const allExtensionsCourses = await allExtensionsCoursesPromise;
    const allExtensionsCoursesChecked = allExtensionsCourses ? allExtensionsCourses : [];
    const allExtensionsCoursesCards = allExtensionsCoursesChecked.length > 0 ? createCourseCards(allExtensionsCoursesChecked) : [];

    return (
        <div>
        {allExtensionsCoursesCards.length > 0 && (
        <div id="Extensions-section">
          <Section title="Hair Extensions" cards={allExtensionsCoursesCards} />
        </div>
        )}
        </div>
    );
}

export default AllExtensionCourses;