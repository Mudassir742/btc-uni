import React from 'react';
import Image from 'next/image';
import B1Text from './text/B1Text';
import SH4Text from './text/SH4Text';
import Link from 'next/link';
import SH2Text from './text/SH2Text';
import EducatorsHandle from './text/EducatorsHandle';
import Duration from './text/Duration';
import { UsedProduct } from '@/interfaces';
import Shop from './text/ShopText';
import ButtonText from './text/ButtonText';
import ParagraphText from './text/Paragraph';
import { Button } from './ui/Button';


interface ProductsUsedCardProps {
  productUsed: UsedProduct;
  productTitleTextColor: string; 
  userDataId: string;
  courseId: number;
}

let imageWidth = 188; // Default for mobile
let screenWidth = typeof window !== 'undefined' ? window.innerWidth : 0;
if (screenWidth < 766) {
  imageWidth = 188;
} else {
  imageWidth = 270;
}

const ProductsUsedCard: React.FC<ProductsUsedCardProps> = ({ productTitleTextColor, productUsed, userDataId, courseId }) => {
  if (!productUsed) {
    return null;
  }

  const { title, usedproductmetadata } = productUsed;
  // Use optional chaining to safely access the first picture
  const imageSrc = usedproductmetadata?.productpictures?.[0]?.mediaItemUrl || '/placeholder.png';
  const brandName = usedproductmetadata?.brandName || "";
  const externalLink = usedproductmetadata?.externalLink || "";

  const onUserClick = () => {
    (window as any).dataLayer.push({
        event: "clickedProduct",

        onPageOfCourse: courseId.toString(),
        userDataId: userDataId,

        productName: title,
        brandName: brandName,
        productLink: externalLink,

        timestamp: new Date().toISOString(),
    });
  }

  return (
    <Link id="Product-Card" href={externalLink} target="_blank" className='' onClick={onUserClick}>
      <div className='p-4 h-full relative items-center w-fit  border-[1px] border-border rounded-xl'> 
        
        <div style={{ position: 'relative', width: `${imageWidth}px`, height: `${imageWidth}px` }}>
          <Image
            src={imageSrc}
            alt="Products used in btcu course"
         
            fill
            style={{
              objectFit: 'contain',
            }}
          />
        </div>

        
        <div className='' style={{ position: 'relative', width: `${imageWidth}px`,  }}>

        <div className='items-center flex pt-4'>
          <div className='pr-2'>
          
            <ButtonText text={title} className={`text-${productTitleTextColor}`} />
            <ParagraphText text={brandName} className={`text-${productTitleTextColor}`} />

          </div>
          <div className='flex flex-grow tems-center justify-end'>
        
            <Button className='w-[60px] md:w-[80px]'>
              Shop
            </Button>
       
          </div>
        </div>
        </div>
      </div>
    </Link>
  );
}

export default ProductsUsedCard;
