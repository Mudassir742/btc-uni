{/* <ExploreMoreCategories activeCategory="social-media" /> */}

import React from 'react';
import InputTextBold from './text/InputTextBold';
import SH1Text from './text/SH1Text';
import Link from 'next/link';
import { ChevronRight } from 'lucide-react';
import Image from "next/image";
import { transformWpUrl } from '@/utils/url';
import H2Text from './text/H2Text';
import H3Text from './text/H3Text';



const allCategories = [
  
  // 'celeb-stylists',
  // 'social-media',
  // 'social-climbing',
  'downloadables',
  'tips',
  'business',
  'haircolor',
  'haircutting',
  'styling',
  'texture',
 
  'mens',
  'hairextensions',
  'events',
  'masterclasses',
];

// Define a type for categoryDisplayNames with an index signature
interface CategoryDisplayNames {
  [key: string]: string;
}

const categoryDisplayNames: CategoryDisplayNames = {

  // 'celeb-stylists': 'Celeb Stylists',
  // 'social-media': 'Social Media',
  // 'social-climbing': 'Social Climbing',
  'downloadables': 'Downloadable Resources',
  'tips': 'Quick Tips',

  'business': 'Business',
  'haircolor': 'Hair Color',
  'haircutting': 'Hair Cutting',
  'styling': 'Styling',
  'texture': 'Texture',
 
  'mens': "Men's",
  'hairextensions': 'Hair Extensions',
  'events': 'Events',
  'masterclasses': 'Collections',

};

interface ExploreMoreCategoriesProps {
  activeCategory: string;
}

function ExploreMoreCategories({ activeCategory }: ExploreMoreCategoriesProps) {
  // Filter out the active category from the list
  const remainingCategories = allCategories.filter(category => category !== activeCategory);

  return (
    <div className=' bg-themecolor-50 py-[64px]'>
      <div className=' md:flex'>

    
        <div className='md:w-1/2 flex justify-center items-center m-auto'>
        <div className='md:w-[498px] flex justify-center items-center m-auto container'>
  <Image
              // src={transformWpUrl("https://cms.btcuniversity.com/wp-content/uploads/2023/12/square.png")}
              src={"https://cms.btcuniversity.com/wp-content/uploads/2023/12/square.png"}
              alt="explore more categories"
              width={1000}
              height={1000}
      
            />
    </div>
    <div className="med-space"/> 
    </div> 
    <div className='md:w-1/2 px-8 md:px-0'>
    <div className='md:max-w-[424px] mr-auto pt-4 md:pt-0'>
      
      <H3Text
        text="Explore More Categories"
        className="text-themeColor"
      />
      <ul>
        
        {remainingCategories.map((category, index) => (
          <li key={category}>
            <Link href={`/${category}`}>
                <div className='flex items-center'>

                {/* w-full pt-4 pb-4 flex flex-col space-y-4" */}
              <div className='w-full py-[14px] px-4 flex-col space-y-4'>
                <InputTextBold text={categoryDisplayNames[category]} />
              </div>
              <ChevronRight />
                </div>
              <div className="h-[1px] bg-gray-500"></div>
            </Link>
          </li>
        ))}
      </ul>
      </div> 
    </div>
    </div>
    </div>
  );
}

export default ExploreMoreCategories;
