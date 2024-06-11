import React, { useState } from 'react';
import Link from 'next/link';
import { ChevronRight } from 'lucide-react';
import B1Text from '../text/B1Text';
 

function NavDashFavEducator() {
  return (
    <div className='pl-2 pr-2 pb-2'>


      <div className='overflow-x-auto'>
        {/* <div className='flex'>
        <div className='py-2 px-4' style={{ minWidth: '100px', flexShrink: 0 }}>
       
            <FavEducatorDashboardIconCard />
          </div>

          <div className='py-2 px-4' style={{ minWidth: '100px', flexShrink: 0 }}>
          <FavEducatorDashboardIconCard />
          </div>
          <div className='py-2 px-4' style={{ minWidth: '100px', flexShrink: 0 }}>
          <FavEducatorDashboardIconCard />
          </div>
          <div className='py-2 px-4' style={{ minWidth: '100px', flexShrink: 0 }}>
          <FavEducatorDashboardIconCard />
          </div>
          <div className='py-2 px-4' style={{ minWidth: '100px', flexShrink: 0 }}>
          <FavEducatorDashboardIconCard />
          </div>
          <div className='py-2 px-4' style={{ minWidth: '100px', flexShrink: 0 }}>
          <FavEducatorDashboardIconCard />
          </div>
          <div className='py-2 px-4' style={{ minWidth: '100px', flexShrink: 0 }}>
          <FavEducatorDashboardIconCard />
          </div>
          <div className='py-2 px-4' style={{ minWidth: '100px', flexShrink: 0 }}>
          <FavEducatorDashboardIconCard />
          </div>
          <div className='py-2 px-4' style={{ minWidth: '100px', flexShrink: 0 }}>
          <FavEducatorDashboardIconCard />
          </div>
          <div className='py-2 px-4' style={{ minWidth: '100px', flexShrink: 0 }}>
          <FavEducatorDashboardIconCard />
          </div>
          <div className='py-2 px-4' style={{ minWidth: '100px', flexShrink: 0 }}>
          <FavEducatorDashboardIconCard />
          </div>
        </div> */}
      </div>
      <div className='flex justify-center pt-5 pb-3'>


        <Link href='/all-educators' className='flex space-under-category-titles'>
          <div className="flex items-center">
            <div className='space-under-category-titles'/>
            <B1Text text={'View All Educators'} className='text-themeColor'   />
            <span className="ml-1"><ChevronRight color='white' /></span>
          </div>
        </Link>
      </div>
    </div>
  );
}



export default NavDashFavEducator;




// to do: pull the correct number of cards in somehow, 
// to do: i commented out all the educator iconcards, because when you add a buildClientSchema, it makes them weirdly small and also because we haven't set up the favorite an educator yet. 
