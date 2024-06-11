import React from 'react';
import { getCategoryPageEducators } from '../helper';
import RecommendedEducator from '@/components/RecommendedEducator';
const heroTitle = 'Extension'
const ExtensionEducators: React.FC = async () => {

    const educatorsCategoryDataPromise = getCategoryPageEducators("433290");
    const educatorCategoryData = await educatorsCategoryDataPromise;
    const educators = educatorCategoryData?.categoryEducators || [];

    return (
        <div>
          {educators.length > 0 && (
          <RecommendedEducator educators={educators} heroTitle={`${heroTitle}s`} />          )}
        </div>
    );
}

export default ExtensionEducators;

