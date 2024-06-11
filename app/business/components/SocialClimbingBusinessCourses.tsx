import React from 'react';
import { getSocialClimbingBusinessCourses, createCourseCards, Section  } from '../helper';

const SocialClimbingBusinessCourses: React.FC = async () => {

    const socialClimbingBUSNCoursesPromise = getSocialClimbingBusinessCourses();
    const socialClimbingBUSNCourses = await socialClimbingBUSNCoursesPromise;
    const socialClimbingBUSNCoursesChecked = socialClimbingBUSNCourses ? socialClimbingBUSNCourses : [];
    const businessSocialMediaForHairdressersCards = socialClimbingBUSNCoursesChecked.length > 0 ? createCourseCards(socialClimbingBUSNCoursesChecked) : [];

    return (
        <div>
        {businessSocialMediaForHairdressersCards.length > 0 && (
        <div id="social-climbing-section">
          <Section title="Social Climbing" cards={businessSocialMediaForHairdressersCards} />
        </div>
        )}
        </div>
    );
}

export default SocialClimbingBusinessCourses;