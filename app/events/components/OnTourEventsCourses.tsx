import React from 'react';
import { getOnTourEventsCourses, createCourseCards, Section } from '../helper';

const OnTourEventsCourses: React.FC = async () => {

    const onTourEVENTSCoursesPromise = getOnTourEventsCourses();
    const onTourEVENTSCourses = await onTourEVENTSCoursesPromise;
    const onTourEVENTSCoursesChecked = onTourEVENTSCourses ? onTourEVENTSCourses : [];
    const onTourEVENTSCoursesCards = onTourEVENTSCoursesChecked.length > 0 ? createCourseCards(onTourEVENTSCoursesChecked) : [];

    return (
        <div>
        {onTourEVENTSCoursesCards.length > 0 && (
        <div id="On-Tour-section">
          <Section title="BTC “On Tour“" cards={onTourEVENTSCoursesCards} />
        </div>
        )}
        </div>
    );
}

export default OnTourEventsCourses;