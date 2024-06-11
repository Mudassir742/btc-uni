import React from 'react';
import { getOneshotEventsCourses, createCourseCards, Section } from '../helper';

const OneshotEventsCourses: React.FC = async () => {

    const oneshotEVENTSCoursesPromise = getOneshotEventsCourses();
    const oneshotEVENTSCourses = await oneshotEVENTSCoursesPromise;
    const oneshotEVENTSCoursesChecked = oneshotEVENTSCourses ? oneshotEVENTSCourses : [];
    const oneshotEVENTSCoursesCards = oneshotEVENTSCoursesChecked.length > 0 ? createCourseCards(oneshotEVENTSCoursesChecked) : [];

    return (
        <div>
        {oneshotEVENTSCoursesCards.length > 0 && (
        <div id="Oneshot-section">
          <Section title="#ONESHOT Hair Awards" cards={oneshotEVENTSCoursesCards} />
        </div>
        )}
        </div>
    );
}

export default OneshotEventsCourses;