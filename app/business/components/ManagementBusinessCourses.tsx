import React from 'react';
import { getManagementBusinessCourses, createCourseCards, Section } from '../helper';

const ManagementBusinessCourses: React.FC = async () => {

    const managementBUSNCoursesPromise = getManagementBusinessCourses();
    const managementBUSNCourses = await managementBUSNCoursesPromise;
    const managementBUSNCoursesChecked = managementBUSNCourses ? managementBUSNCourses : [];
    const businessManagementCultureCards = managementBUSNCoursesChecked.length > 0 ? createCourseCards(managementBUSNCoursesChecked) : [];

    return (
      <div>
      {businessManagementCultureCards.length > 0 && (
        <div id="Management-section">
          <Section title="Management & Culture" cards={businessManagementCultureCards} />
        </div>
      )}
      </div>
    );
}

export default ManagementBusinessCourses;