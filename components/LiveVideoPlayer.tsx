"use client"
import { useState, useEffect, useRef } from 'react';
import VimeoPlayer from '@vimeo/player';

interface LiveVideoPlayerProps {
    videoId: string;
}

// IMPORTANT: this is the player for the live video (useful to segregate in case we want separate logic)
const LiveVideoPlayer: React.FC<LiveVideoPlayerProps> = ({
    videoId,
  }) => {
    const [screenWidth, setScreenWidth] = useState<number>(0);
    const iframeRef = useRef<HTMLIFrameElement | null>(null);
  
    const handleVideoPlay = async () => {
      try {
        // ... (video play logic, if any for live video)
        if (iframeRef.current) {
          const player = new VimeoPlayer(iframeRef.current);
  
          // Write logic...
        }
        
      } catch (error) {
        console.error('Error performing logic', error);
      }
    };
  
  
    useEffect(() => {
      const updateScreenWidth = () => {
        setScreenWidth(window.innerWidth);
      };
  
      updateScreenWidth();
  
      window.addEventListener('resize', updateScreenWidth);
  
      return () => {
        window.removeEventListener('resize', updateScreenWidth);
      };
    }, []);
  
    useEffect(() => {
      // eslint-disable-next-line react-hooks/exhaustive-deps
      handleVideoPlay();
    },);
  
    return (
      <iframe
        ref={iframeRef}
        src={`https://player.vimeo.com/video/${videoId}`}
        width={screenWidth.toString()}
        height={(screenWidth * 0.66666).toString()}
        style={{ position: 'relative' }}
        frameBorder="0"
        allowFullScreen
      ></iframe>
    );
  };
  
  export default LiveVideoPlayer;
  