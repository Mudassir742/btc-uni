"use client";
import React, { useState } from 'react';

import CardTitle from './text/CardTitle';
import CardHandle from './text/CardHandle';
import Link from 'next/link';

interface RecentlyReleasedCardProps {
  educatorhandles: string[];
  courseTitle: string;
  url: string;
  videoId: string;
}

// const educatorhandle = '@handle'
// const courseTitle = 'Class Title Goes Here, Max 2 Lines goes here  longer title truncates'
// const url = 'urlofcourse'
// const videoId = '878799631'
const imageWidth = 238


const RecentlyReleasedCard: React.FC<RecentlyReleasedCardProps> = ({ educatorhandles, courseTitle, url, videoId }) => {
  const [isControlBarVisible, setControlBarVisible] = useState(true);
  return (
    <div style={{ width: `${imageWidth}px`, height: 'auto' }}>

      <iframe
        // ref={iframeRef}
        src={`https://player.vimeo.com/video/${videoId}?embed.buttons.fullscreen=0`}
        width="100%" // Width relative to the container
        height="auto" // Automatically adjusts the height based on the aspect ratio
        allowFullScreen
        className="justify-start"
      />

      <Link href={`/courses/${url}`}>


        <div style={{ width: `${imageWidth}px`, height: 'auto' }}>


          <CardTitle text={courseTitle} className='' />



          <div className='truncate pr-4'>
            <CardHandle text={educatorhandles.join(', ')} className="text-secondarythemecolor" />
          </div>
        </div>

      </Link>
    </div>
  );
}

export default RecentlyReleasedCard;
