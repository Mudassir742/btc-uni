import React from 'react';
import { getCategoryPageEducators } from '../helper';
import RecommendedEducator from '@/components/RecommendedEducator';
const heroTitle = 'Hair Color'
const HaircolorEducators: React.FC = async () => {

    const educatorsCategoryDataPromise = getCategoryPageEducators("433285");
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

export default HaircolorEducators;