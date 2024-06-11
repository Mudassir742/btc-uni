"use client";
import React, { useState } from 'react';
import ProductsUsedCard from './ProductsUsedCard';
import { UsedProduct } from '@/interfaces';
import CoursePageTitles from './text/CoursePageTitles';
import H3Text from './text/H3Text';
import H4Text from './text/H4Text';

interface ProductsUsedCardProps {
  productsUsed: UsedProduct[];
  productTitleTextColor: string;
  userDataId: string;
  courseId: number;
}

const ProductsUsed: React.FC<ProductsUsedCardProps> = ({ productTitleTextColor, productsUsed, userDataId, courseId }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleExpansion = () => {
    setIsExpanded(!isExpanded);
  };
  
  // const products = true; // Change this value based on your condition

  if (!productsUsed) {
    // If products is false, return null to render nothing
    return null;
  }


  const createUsedProductsCards = (usedProducts: UsedProduct[]) => usedProducts
  .map((usedProduct: UsedProduct) => (
    <ProductsUsedCard key={usedProduct.id} productUsed={usedProduct} productTitleTextColor={productTitleTextColor} userDataId={userDataId} courseId={courseId} />
  ));
  
  const usedProductsCards = createUsedProductsCards(productsUsed);

  return (
    <div > 
      <div>
        <div className="px-0">

          {/* <H4Text text='Products Used' className={`text-${productTitleTextColor}`} /> */}
          <div className="space-under-category-titles" /> 

    
          </div>
     
        {/* {isExpanded ? ( */}
        <div className="flex space-x-auto overflow-x-auto gap-4 px-0">
          
            {usedProductsCards}
          </div>
        {/* ) : null} */}
      </div>
      <div className='space-between-categories' />

    </div>
  );
}

export default ProductsUsed;
