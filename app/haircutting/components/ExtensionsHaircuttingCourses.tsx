import React from 'react';
import { getExtensionsHaircuttingCourses, createCourseCards, Section } from '../helper';

const ExtensionsHaircuttingCourses: React.FC = async () => {

    const extensionsHAIRCUTTINGCoursesPromise = getExtensionsHaircuttingCourses();
    const extensionsHAIRCUTTINGCourses = await extensionsHAIRCUTTINGCoursesPromise;
    const extensionsHAIRCUTTINGCoursesChecked = extensionsHAIRCUTTINGCourses ? extensionsHAIRCUTTINGCourses : [];
    const extensionsHAIRCUTTINGCoursesCards = extensionsHAIRCUTTINGCoursesChecked.length > 0 ? createCourseCards(extensionsHAIRCUTTINGCoursesChecked) : [];

    return (
        <div>
        {extensionsHAIRCUTTINGCoursesCards.length > 0 && (
        <div id="Extensions-section">
          <Section title="Extensions" cards={extensionsHAIRCUTTINGCoursesCards} />
        </div>
        )}
        </div>
    );
}

export default ExtensionsHaircuttingCourses;