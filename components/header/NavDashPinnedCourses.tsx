import React, { useState } from 'react';
import NavDashFavCard from './NavDashFavCard';
import EducatorIconCard from '../EducatorIconCard';
import Link from 'next/link';
import B1Text from '../text/B1Text';

const videoId = 878799631
const themecolor = '#523D34'

function NavDashPinnedCourses() {
  return (
    <div className='pl-2 pr-2 pb-2'>

      <div className='overflow-x-auto'>
        <div className='flex'>
          <div className='p-1'>
            <NavDashFavCard videoId={878799631} themecolor={themecolor} />
          </div>
          <div className='p-1'>
          <NavDashFavCard videoId={878799631} themecolor={themecolor} />
          </div>
          <div className='p-1'>
          <NavDashFavCard videoId={878799631} themecolor={themecolor} />
   
            </div>
          <div className='p-1'>
          <NavDashFavCard videoId={878799631} themecolor={themecolor} />

          </div>
          <div className='p-1'>
          <NavDashFavCard videoId={878799631} themecolor={themecolor} />

          </div>
          <div className='p-1'>
          <NavDashFavCard videoId={878799631} themecolor={themecolor} />
          </div>
          <div className='p-1'>
          <NavDashFavCard videoId={878799631} themecolor={themecolor} />
          </div>
        </div>
      </div>
      <div className='flex justify-center pt-5 pb-3'>


{/* <Link href='/' className='flex space-under-category-titles'> */}
  <div className="flex items-center">
    <div className='space-under-category-titles'/>
    <B1Text text={'Bookmarked Courses'} className='text-themeColor' />
    {/* <span className="ml-1"> 
    <ChevronRight />
    ></span> */}
  </div>
{/* </Link> */}
</div>
    </div>
  );
}



export default NavDashPinnedCourses;




// to do: pull the correct number of cards in somehow,
// to do: i commented out all the educator iconcards, because when you add a buildClientSchema, it makes them weirdly small and also because we haven't set up the favorite an educator yet. 
