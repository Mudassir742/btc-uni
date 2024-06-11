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
import ActionButtonPDFs from './buttons/ActionButtonPDFs';

interface CategoryDownloablesCardProps {
  externalLink: string;
  title: string;
  imageSrc: string;
}

const CategoryDownloablesCard: React.FC<CategoryDownloablesCardProps> = ({ imageSrc, title, externalLink }) => {




  return (
    <Link href={externalLink}>
            {/* <ActionButtonPDFs
        key={downloadable.downloadableName}
        text={downloadable?.downloadableName || ""}
        link={downloadable.downloadableFile?.mediaItemUrl || ""}
        textColor={'black'}
        borderColor={'black'}
        canDownload={userCanViewMainContent}
        isPurchasableALaCarte={isCourseAvailableToBePurchasedALaCarte}
        isPurchasableOnlyALaCarte={isCourseAvailableToBePurchasedOnlyALaCarte}
      /> */}


      
      {/* <div className='flex items-center py-1'> 
        <div className='w-20 h-20 overflow-hidden'>
          <Image
            src={imageSrc}
            alt="Image"
            width={80}
            height={80}
          />
        </div>
        <div className='items-center px-4'>
          <EducatorsHandle text={title} />
          <div className='flex items-center'>
         
        
          </div> 
          <div></div>
        </div>
      </div> */}
    </Link>



  );
}

export default CategoryDownloablesCard;
