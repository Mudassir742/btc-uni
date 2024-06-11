import React from 'react';
import { getCategoryPageEducators } from '../helper';
import RecommendedEducator from '@/components/RecommendedEducator';

const heroTitle = 'Business'

const BusinessEducators: React.FC = async () => {

    const educatorsCategoryDataPromise = getCategoryPageEducators("433263");
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

export default BusinessEducators;