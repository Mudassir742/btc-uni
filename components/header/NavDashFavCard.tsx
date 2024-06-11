import React from 'react';
import Image from 'next/legacy/image';
import HeartDash from '../icons/HeartDash';
import DashboardTitle from '../text/DashboardTitle';
import DashboardArtist from '../text/DashboardArtist';

interface NavDashFavCardProps {
  videoId: number;
  themecolor: string;
}

const NavDashFavCard: React.FC<NavDashFavCardProps> = ({ videoId, themecolor }) => {
return (

    <div className="">
      <div
        className="relative"
        style={{
          width: 238,
          height: '100%',
          position: 'relative',
          overflow: 'hidden',
        }}
      > 
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

          {/* <Bookmark fill={themecolor} height={34} width={24}/> */}
        </div>
      </div>
      <div className="pl-2">
        <DashboardTitle text="Class Title" color="white" />
        <DashboardArtist text="Artist Title" color="white" />
      </div>
    </div>
  );
};

export default NavDashFavCard;




// to do: dynamically pull everything in.

