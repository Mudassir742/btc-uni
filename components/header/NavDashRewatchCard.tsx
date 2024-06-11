import React from 'react';
import Image from 'next/legacy/image';

import HeartDash from '../icons/HeartDash';
import Rewatch from '../icons/Rewatch';
import DashboardTitle from '../text/DashboardTitle';
import DashboardArtist from '../text/DashboardArtist';
import Checkmark from '../icons/Checkmark';
import { themeColor } from '@/app/courses/helper';


interface NavDashRewatchCardProps {
  videoId: number;
}

const NavDashRewatchCard: React.FC<NavDashRewatchCardProps> = ({ videoId }) => {
return (

    <div className="">
      <div className="relative" style={{ width: 238, height: 'auto' }}>
        <div>
        <iframe
        // ref={iframeRef}
        src={`https://player.vimeo.com/video/${videoId}`}
        width="100%" // Width relative to the container
        height="auto" // Automatically adjusts the height based on the aspect ratio
 
        allowFullScreen
        className="justify-start"
     />
     
       <div
style={{
  position: 'absolute',
  left: '4px',
  bottom: '4px',
  width: '30px', // Set the size of the white circle
  height: '30px',
  backgroundColor: 'white',
  borderRadius: '50%',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
}}
>
<Rewatch fill={themeColor} />
</div>
        </div>
      </div>
      <div className="pl-2">
      <DashboardTitle text="Class Title" color="white" />
      <DashboardArtist text="Artist Title" color="white" />
      </div>
    </div>
  );
};

export default NavDashRewatchCard;







// to do: dynamically pull everything in.

