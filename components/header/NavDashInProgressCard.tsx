import React from 'react';
import Image from 'next/image';
import HeartDash from '../icons/HeartDash';
import PlayVideo from '../icons/PlayVideo';
import DashboardTitle from '../text/DashboardTitle';
import DashboardArtist from '../text/DashboardArtist';

interface NavDashInProgressCardProps {
  videoId: number;
}

const NavDashInProgressCard: React.FC<NavDashInProgressCardProps> = ({ videoId }) => {
return (
    <div className="">
      <div className="relative" style={{ width: 238, height: '100%' }}>
        <div style={{ position: 'relative', width: '100%', height: '100%' }}>
  
                        
                         <iframe
        // ref={iframeRef}
        src={`https://player.vimeo.com/video/${videoId}`}
        width="100%" // Width relative to the container
        height="auto" // Automatically adjusts the height based on the aspect ratio
 
        allowFullScreen
        className="justify-start"
     />
        </div>
        {/* <div style={{ position: 'absolute', right: '6px', bottom: '6px' }}>
          <PlayVideo fill={'white'} />
        </div>  */}
      </div>
      <div className="pl-2">
      <DashboardTitle text="Class Title" color="white" />
      <DashboardArtist text="Artist Title" color="white" />
      </div>
    

    </div>
  );
};

export default NavDashInProgressCard;


// to do: dynamically pull everything in. also add the real video and not an image, with a progress bar. videos will go here as soon as the user starts it and has not finished it. 

