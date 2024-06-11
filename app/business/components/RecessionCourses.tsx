import React from 'react';
import { getRecessionBusinessCourses, createCourseCards, Section } from '../helper';

const RecessionCourses: React.FC = async () => {

    const recessionBUSNCoursesPromise = getRecessionBusinessCourses();
    const recessionBUSNCourses = await recessionBUSNCoursesPromise;
    const recessionBUSNCoursesChecked = recessionBUSNCourses ? recessionBUSNCourses : [];
    const businessRecessionCards = recessionBUSNCoursesChecked.length > 0 ? createCourseCards(recessionBUSNCoursesChecked) : [];

    return (
      <div>
      {businessRecessionCards.length > 0 && (
        <div id="Recession-section">
          <Section title="Recession" cards={businessRecessionCards} />
        </div>
      )}
      </div>
    );
}

export default RecessionCourses;