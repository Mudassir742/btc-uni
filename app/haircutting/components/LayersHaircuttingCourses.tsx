import React from 'react';
import { getLayersHaircuttingCourses, createCourseCards, Section } from '../helper';

const LayersHaircuttingCourses: React.FC = async () => {

    const layersHAIRCUTTINGCoursesPromise = getLayersHaircuttingCourses();
    const layersHAIRCUTTINGCourses = await layersHAIRCUTTINGCoursesPromise;
    const layersHAIRCUTTINGCoursesChecked = layersHAIRCUTTINGCourses ? layersHAIRCUTTINGCourses : [];
    const layersHAIRCUTTINGCoursesCards = layersHAIRCUTTINGCoursesChecked.length > 0 ? createCourseCards(layersHAIRCUTTINGCoursesChecked) : [];

    return (
        <div>
        {layersHAIRCUTTINGCoursesCards.length > 0 && (
        <div id="Layers-section">
          <Section title="Layers" cards={layersHAIRCUTTINGCoursesCards} />
        </div>
        )}
        </div>
    );
}

export default LayersHaircuttingCourses;