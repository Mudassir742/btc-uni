import React, { useState } from 'react';
import HeartOutline from '../icons/HeartOutline';
import Rewatch from '../icons/Rewatch';
import NavDashRewatchCard from './NavDashRewatchCard';
import B1Text from '../text/B1Text';

const videoId = 878799631
const themecolor = '#523D34'

function NavDashRewatch() {
  return (
    <div className='pl-2 pr-2 pb-2'>
   
    <div className='overflow-x-auto'>
      <div className='flex'>
        <div className='p-1'>
          <NavDashRewatchCard videoId={videoId} />
        </div>
        <div className='p-1'>
        <NavDashRewatchCard videoId={videoId} />
 
              </div>
        <div className='p-1'>
        <NavDashRewatchCard videoId={videoId} />
   
          </div>
        <div className='p-1'>
        <NavDashRewatchCard videoId={videoId} />

        </div>
        <div className='p-1'>
        <NavDashRewatchCard videoId={videoId} />

        </div>
        <div className='p-1'>
        <NavDashRewatchCard videoId={videoId} />

        </div>
        <div className='p-1'>
        <NavDashRewatchCard videoId={videoId} />

        </div>
        <div className='p-1'>
        <NavDashRewatchCard videoId={videoId} />

        </div>
        <div className='p-1'>
        <NavDashRewatchCard videoId={videoId} />

        </div>
      </div>
    </div>
    <div className='flex justify-center pt-5 pb-3'>


{/* <Link href='/' className='flex space-under-category-titles'> */}
  <div className="flex items-center">
    <div className='space-under-category-titles'/>
    <B1Text text={'Rewatch Completed Courses'} className='text-themeColor'  />
          { }
  </div>
{/* </Link> */}
</div>
  </div>
);
}

    

export default NavDashRewatch;




// to do: pull the correct number of cards in somehow, 
