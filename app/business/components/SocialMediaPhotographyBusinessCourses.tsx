import React from 'react';
import { getSocialMediaPhotographyBusinessCourses, createCourseCards, Section  } from '../helper';

const SocialMediaPhotographyBusinessCourses: React.FC = async () => {

    const socialMediaPhotographyBUSNCoursesPromise = getSocialMediaPhotographyBusinessCourses();
    const socialMediaPhotographyBUSNCourses = await socialMediaPhotographyBUSNCoursesPromise;
    const socialMediaPhotographyBUSNCoursesChecked = socialMediaPhotographyBUSNCourses ? socialMediaPhotographyBUSNCourses : [];
    const businessSocialMediaForHairdressersCards = socialMediaPhotographyBUSNCoursesChecked.length > 0 ? createCourseCards(socialMediaPhotographyBUSNCoursesChecked) : [];

    return (
        <div>
        {businessSocialMediaForHairdressersCards.length > 0 && (
        <div id="social-photography-section">
          <Section title="Social Media Photography" cards={businessSocialMediaForHairdressersCards} />
        </div>
        )}
        </div>
    );
}

export default SocialMediaPhotographyBusinessCourses;