import React from 'react';
import { getConsultationsBusinessCourses, createCourseCards, Section } from '../helper';

const ConsultationBusinessCourses: React.FC = async () => {

    const consultationsBUSNCoursesPromise = getConsultationsBusinessCourses();
    const consultationsBUSNCourses = await consultationsBUSNCoursesPromise;
    const consultationsBUSNCoursesChecked = consultationsBUSNCourses ? consultationsBUSNCourses : [];
    const businessConsultationsCards = consultationsBUSNCoursesChecked.length > 0 ? createCourseCards(consultationsBUSNCoursesChecked) : [];

    return (
      <div>
      {businessConsultationsCards.length > 0 && (
        <div id="Consultations-section">
          <Section title="Consultations" cards={businessConsultationsCards} />
        </div>
      )}
      </div>
    );
}

export default ConsultationBusinessCourses;