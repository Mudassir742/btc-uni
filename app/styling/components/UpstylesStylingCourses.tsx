import React from 'react';
import { getUpstylesStylingCourses, createCourseCards, Section } from '../helper';

const UpstylesStylingCourses: React.FC = async () => {

    const upstylesSTYLINGCoursesPromise = getUpstylesStylingCourses();
    const upstylesSTYLINGCourses = await upstylesSTYLINGCoursesPromise;
    const upstylesSTYLINGCoursesChecked = upstylesSTYLINGCourses ? upstylesSTYLINGCourses : [];
    const upstylesSTYLINGCoursesCards = upstylesSTYLINGCoursesChecked.length > 0 ? createCourseCards(upstylesSTYLINGCoursesChecked) : [];

    return (
        <div>
        {upstylesSTYLINGCoursesCards.length > 0 && (
        <div id="Upstyles-section">
          <Section title="Upstyles & Bridal Hair" cards={upstylesSTYLINGCoursesCards} />
        </div>
        )}
        </div>
    );
}

export default UpstylesStylingCourses;