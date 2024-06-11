import React from 'react';
import { getSeriesSocialBusinessCourses, createCourseCards, Section } from '../helper';

const SeriesSocialMediaCourses: React.FC = async () => {

  const seriesSocialBUSNCoursesPromise = getSeriesSocialBusinessCourses();
  const seriesSocialBUSNCourses = await seriesSocialBUSNCoursesPromise;
  const seriesSocialBUSNCoursesChecked = seriesSocialBUSNCourses ? seriesSocialBUSNCourses : [];
  const businessSocialMediaForHairdressersCards = seriesSocialBUSNCoursesChecked.length > 0 ? createCourseCards(seriesSocialBUSNCoursesChecked) : [];

  return (
    <div>
      {businessSocialMediaForHairdressersCards.length > 0 && (
        <div id="Series-section">
          <Section title="Series: Social Media for Hairdressers" cards={businessSocialMediaForHairdressersCards} />
        </div>
      )}
    </div>
  );
}

export default SeriesSocialMediaCourses;