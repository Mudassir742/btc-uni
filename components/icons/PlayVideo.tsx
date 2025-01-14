import React from 'react';

interface PlayVideoProps {
  fill: string;
}

const PlayVideo: React.FC<PlayVideoProps> = ({ fill }) => (
  <div className='pr-2'>
 <svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 -960 960 960" width="24">
    <path d="M320-200v-560l440 280-440 280Z" fill={fill} />
  </svg>
  </div>
 
);

export default PlayVideo;
 