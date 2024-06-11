import React from 'react';
import { getCategoryPageEducators } from '../helper';
import RecommendedEducator from '@/components/RecommendedEducator';
const heroTitle = 'Texture'
const TextureEducators: React.FC = async () => {

    const educatorsCategoryDataPromise = getCategoryPageEducators("433288");
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

export default TextureEducators;