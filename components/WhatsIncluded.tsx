import React from 'react';
import SH1Text from './text/SH1Text';
import Certificate from './icons/Certificate';
import Formulas from './icons/Formulas';
import SH4Text from './text/SH4Text';
import CertificateIcon from './icons/CertificateIcon';
import SH2Text from './text/SH2Text';
import InputTextBold from './text/InputTextBold';
import HeadSheet from './icons/HeadSheet';
import ParagraphText from './text/Paragraph';
import CoursePageTitles from './text/CoursePageTitles';
import HairSpray from './icons/ShoppingBasket';
import ShoppingBasket from './icons/ShoppingBasket';
import Image from 'next/image';
import { Download } from 'lucide-react';

interface WhatsIncludedProps {
  hasDownloadables: boolean;
  hasFormulas: boolean;
  themecolor: string;
  hasProducts: boolean;
}

const WhatsIncluded: React.FC<WhatsIncludedProps> = ({ themecolor, hasDownloadables, hasFormulas, hasProducts }) => {
  // Check if Formulas component is available
  // const shouldRenderFormulas = Formulas !== null && Formulas !== undefined;


  return (
<div>
<div className='flex justify-center'>
  {/* Workbook */}
  {hasDownloadables && (
    <div className="items-center justify-center h-[42px]">
      <div className='w-[42px] flex items-center justify-center'>
        <Download />
      </div>
      <div className='text-xs flex justify-center'>
        PDFs
      </div>
    </div>
  )}

  {/* Formulas */}
  {hasFormulas && (
    <div className="items-center justify-center h-[42px]">
      <div className='w-[42px] flex items-center justify-center'>
        <ShoppingBasket />
      </div>
      <div className='text-xs flex justify-center'>
        Formulas
      </div>
    </div>
  )}

  {/* Products */}
  {hasProducts && (
    <div className={`items-center h-[42px] mx-auto ${!hasDownloadables && !hasFormulas ? 'justify-center' : ''}`}>
      <div className='w-[42px] flex items-center justify-center bg-${themecolor}'>
        <ShoppingBasket />
      </div>
      <div className='text-xs flex justify-center'>
        Products
      </div>
    </div>
  )}

  {/* Certificate of Completion */}
  <div className={`items-center h-[42px] mx-auto ${!hasDownloadables && !hasFormulas ? 'justify-end' : ''}`}>
    <div className='flex flex-col items-center'>
      <div className='w-[42px] flex items-center justify-center'>
        <CertificateIcon fill="black" width={23} height={23} />
      </div>
      <div className='text-xs flex justify-center'>
        Certificate
      </div>
    </div>
  </div>
</div>

  <div className="grey-line" />
</div>

  
  );
}

export default WhatsIncluded;
