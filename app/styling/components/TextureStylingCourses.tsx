import React from 'react';
import { getTextureStylingCourses, createCourseCards, Section } from '../helper';

const TextureStylingCourses: React.FC = async () => {

    const textureSTYLINGCoursesPromise = getTextureStylingCourses();
    const textureSTYLINGCourses = await textureSTYLINGCoursesPromise;
    const textureSTYLINGCoursesChecked = textureSTYLINGCourses ? textureSTYLINGCourses : [];
    const textureSTYLINGCoursesCards = textureSTYLINGCoursesChecked.length > 0 ? createCourseCards(textureSTYLINGCoursesChecked) : [];

    return (
        <div>
        {textureSTYLINGCoursesCards.length > 0 && (
        <div id="Texture-section">
          <Section title="Texture" cards={textureSTYLINGCoursesCards} />
        </div>
        )}
        </div>
    );
}

export default TextureStylingCourses;