import React, { useState } from 'react';
import NavDashInProgressCard from './NavDashInProgressCard';
import B1Text from '../text/B1Text';
const videoId = 878799631

function NavDashInProgress() {
  return (
    <div className='pl-2 pr-2 pb-2'>

      <div className='overflow-x-auto'>
        <div className='flex'>
          <div className='p-1'>
            <NavDashInProgressCard videoId={878799631} />
          </div>
          <div className='p-1'>
          <NavDashInProgressCard videoId={878799631} />
          </div>
          <div className='p-1'>
          <NavDashInProgressCard videoId={878799631} />
          </div>
          <div className='p-1'>
          <NavDashInProgressCard videoId={878799631} />
          </div>
          <div className='p-1'>
          <NavDashInProgressCard videoId={878799631} />
          </div>
          <div className='p-1'>
          <NavDashInProgressCard videoId={878799631} />
          </div>
          <div className='p-1'>
          <NavDashInProgressCard videoId={878799631} />
          </div>
          <div className='p-1'>
          <NavDashInProgressCard videoId={878799631} />
          </div>
        </div>
      </div>
      <div className='flex justify-center pt-5 pb-3'>


        {/* <Link href='/' className='flex space-under-category-titles'> */}
          <div className="flex items-center">
            <div className='space-under-category-titles' />
            <B1Text text={'In Progress Courses'} className='text-themeColor'  />
          { }
          </div>
        {/* </Link> */}
      </div>
    </div>
  );
}

export default NavDashInProgress;


// to do: pull the correct number of cards in somehow, 
// to do: dynamically pull everything in. also add the real video and not an image, with a progress bar. videos will go here as soon as the user starts it and has not finished it. 

