import React from 'react';
import { getCategoryPageEducators } from '../helper';
import RecommendedEducator from '@/components/RecommendedEducator';
const heroTitle = 'Events'
const EventsEducators: React.FC = async () => {

    const educatorsCategoryDataPromise = getCategoryPageEducators("433291");
    const educatorCategoryData = await educatorsCategoryDataPromise;
    const educators = educatorCategoryData?.categoryEducators || [];

    return (
        <div>
          {educators.length > 0 && (
          <RecommendedEducator educators={educators} heroTitle={heroTitle} />
          )}
        </div>
    );
}

export default EventsEducators;