
"use client"
import React, { useState } from 'react';
import HeartDash from './icons/HeartDash';
import { UserPlus } from 'lucide-react';

interface SubscribeToUseProps {
  // text: string;
}

const FollowEducator: React.FC<SubscribeToUseProps> = ({ }) => {
  const [isSubscribed, setIsSubscribed] = useState(false);

  const handleButtonClick = () => {
    setIsSubscribed((prevState) => !prevState); // Toggle the subscription status
  };

  return (

    <div >

      {/* Mobile */}
      <div className='md:hidden'>
        <button onClick={handleButtonClick} className="relative">
          <div className="justify-center items-center">
            <div className='flex justify-center h-8 w-12'>
              <UserPlus />

            </div>


            <div className='flex justify-center py-1'>

              Follow
            </div>
          </div>

        </button>
      </div>

      {/* Desktop */}
      <div className='hidden md:block relative'>
        <button onClick={handleButtonClick} className="relative">
          <div className="justify-center items-center">
            <div className='flex justify-center h-8 w-12'>
              <UserPlus />

            </div>


            <div className='flex justify-center py-1'>

              Follow
            </div>
          </div>

        </button>
      </div>

    </div>


    //     <div >
    //       <div onClick={handleButtonClick}>
    //       <div className="justify-center items-center">
    //       <div className=' justify-center h-8 w-12'>

    //       follow icon


    //       <div className='flex justify-center py-1'>

    // Follow
    // </div>
    //         </div>



    //       </div>
    //     </div>
  );
};

export default FollowEducator;


