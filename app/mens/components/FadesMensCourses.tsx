import React from 'react';
import { getFadesMensCourses, createCourseCards, Section } from '../helper';

const FadesMensCourses: React.FC = async () => {

    const fadesMENSCoursesPromise = getFadesMensCourses();
    const fadesMENSCourses = await fadesMENSCoursesPromise;
    const fadesMENSCoursesChecked = fadesMENSCourses ? fadesMENSCourses : [];
    const fadesMENSCoursesCards = fadesMENSCoursesChecked.length > 0 ? createCourseCards(fadesMENSCoursesChecked) : [];

    return (
        <div>
        {fadesMENSCoursesCards.length > 0 && (
        <div id="Fades-section">
          <Section title="Fades & Barbering" cards={fadesMENSCoursesCards} />
        </div>
        )}
        </div>
    );
}

export default FadesMensCourses;