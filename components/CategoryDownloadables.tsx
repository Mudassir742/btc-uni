"use client";
import React, { useState } from 'react';
import SH1Text from './text/SH1Text';
import CategoryDownloablesCard from './CategoryDownloablesCard';

interface CategoryDownloadablesProps {
  heroTitle: string;
}

const CategoryDownloadables: React.FC<CategoryDownloadablesProps> = ({heroTitle  }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleExpansion = () => {
    setIsExpanded(!isExpanded);
  };
  
  // const products = true; // Change this value based on your condition

  if (!CategoryDownloadables) {
    // If products is false, return null to render nothing
    return null;
  }




  return (
    <div className="pb-4">
      <div>
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center slider-container">
     
      
          <SH1Text text={`${heroTitle} Downloadables`} />
            {/* <button onClick={toggleExpansion}>
              {isExpanded ? (
             up chevron here>
              ) : (
<ChevronDown />         
   // <Plus fill={'black'} width={'30'} height={'30'} />
              )}
            </button> */}
          </div>
        </div>
        {/* {isExpanded ? ( */}
          <div className="slider-container">
          
      
           <CategoryDownloablesCard externalLink={''} title={''} imageSrc={''}  />
          </div>
        {/* ) : null} */}
      </div>


    </div>
  );
}

export default CategoryDownloadables;
