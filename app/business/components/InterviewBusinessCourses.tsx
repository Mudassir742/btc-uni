import React from 'react';
import { getInterviewBusinessCourses, createCourseCards, Section } from '../helper';

const InterviewBusinessCourses: React.FC = async () => {

    const interviewBUSNCoursesPromise = getInterviewBusinessCourses();
    const interviewBUSNCourses = await interviewBUSNCoursesPromise;
    const interviewBUSNCoursesChecked = interviewBUSNCourses ? interviewBUSNCourses : [];
    const businessInterviewsCards = interviewBUSNCoursesChecked.length > 0 ? createCourseCards(interviewBUSNCoursesChecked) : [];

    return (
      <div>
      {businessInterviewsCards.length > 0 && (
        <div id="Interviews-section">
          <Section title="Interviews" cards={businessInterviewsCards} />
        </div>
      )}
      </div>
    );
}

export default InterviewBusinessCourses;