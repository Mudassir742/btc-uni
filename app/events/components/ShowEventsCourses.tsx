import React from 'react';
import { getShowEventsCourses, createCourseCards, Section } from '../helper';

const ShowEventsCourses: React.FC = async () => {

    const showEVENTSCoursesPromise = getShowEventsCourses();
    const showEVENTSCourses = await showEVENTSCoursesPromise;
    const showEVENTSCoursesChecked = showEVENTSCourses ? showEVENTSCourses : [];
    const showEVENTSCoursesCards = showEVENTSCoursesChecked.length > 0 ? createCourseCards(showEVENTSCoursesChecked) : [];

    return (
        <div>
        {showEVENTSCoursesCards.length > 0 && (
        <div id="Show-section">
          <Section title="The BTC Show" cards={showEVENTSCoursesCards} />
        </div>
        )}
        </div>
    );
}

export default ShowEventsCourses;