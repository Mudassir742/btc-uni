import React from 'react';
import { getSocialMediaBusinessCourses, createCourseCards, Section } from '../helper';

const SocialMediaBusinessCourses: React.FC = async () => {

    const socialMediaBUSNCoursesPromise = getSocialMediaBusinessCourses();
    const socialMediaBUSNCourses = await socialMediaBUSNCoursesPromise;
    const socialMediaBUSNCoursesChecked = socialMediaBUSNCourses ? socialMediaBUSNCourses : [];
    const businessSocialMediaCards = socialMediaBUSNCoursesChecked.length > 0 ? createCourseCards(socialMediaBUSNCoursesChecked) : [];

    return (
      <div>
      {businessSocialMediaCards.length > 0 && (
        <div id="Social-section">
          <Section title="Social Media" cards={businessSocialMediaCards} />
        </div>
      )}
      </div>
    );
}

export default SocialMediaBusinessCourses;