import React from 'react';
import { getCategoryPageBasics } from '../helper';
import CategoryHero from '@/components/CategoryHero';

const BusinessCategoryHero: React.FC = async () => {

    const basicCategoryDataProm = getCategoryPageBasics("433263");
    const basicCategoryData = await basicCategoryDataProm;
    const heroTitle = basicCategoryData?.title || "";
    const desktopImage = basicCategoryData?.desktopImage?.mediaItemUrl || "";
    const mobileImage = basicCategoryData?.mobileImage?.mediaItemUrl || "";

    // const heroSubtitle = basicCategoryData?.subtitle || "";
    // const heroVideo = basicCategoryData?.video || "";
    const externalLink = basicCategoryData?.externalLink || ""; 


    return (
        <CategoryHero
          heroTitle={heroTitle}
          // heroVideo={heroVideo}
          // description={heroSubtitle}
          mobileImage={mobileImage}
          desktopImage={desktopImage}
        externalLink={externalLink}
        button={true} 
        />
    );
}

export default BusinessCategoryHero;