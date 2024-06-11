"use client";
import { useState, useEffect, useRef } from 'react';
import VimeoPlayer from '@vimeo/player';

interface TrailerVideoPlayerAutoplayProps {
  videoId: string;
  // startTime: number;
}

const TrailerVideoPlayerAutoplay: React.FC<TrailerVideoPlayerAutoplayProps> = ({
  videoId,
  // startTime,
}) => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const iframeRef = useRef<HTMLIFrameElement | null>(null);
  // video width based on the container it goes into (same as in VideoPlayer.tsx)
  const [containerWidth, setContainerWidth] = useState(0);
  const playerRef = useRef<VimeoPlayer | null>(null);

  useEffect(() => {
    if (containerRef.current && !playerRef.current) {
      // Create a new Vimeo player instance
      playerRef.current = new VimeoPlayer(containerRef.current, {
        id: parseInt(videoId),
        width: containerWidth,
        // You can add more player options here if needed
      });

      // Autoplay the video when it's ready
      playerRef.current.on('loaded', () => {
        playerRef.current?.play().catch(error => console.error('Error playing video:', error));
      });
    }
  }, [videoId, containerWidth]);

  useEffect(() => {

    const handleResize = () => {
      if (containerRef.current) {
        setContainerWidth(containerRef.current.offsetWidth);
      }
    };
    // Set the initial width
    handleResize();
    // Add event listener
    window.addEventListener('resize', handleResize);
    // Remove event listener on cleanup
    return () => window.removeEventListener('resize', handleResize);
  }, []);

// below deprecared on jan 15
//   useEffect(() => {
//     const resizeHandler = () => {
//       // Trigger a re-render when the window resizes
//       setContainerWidth(containerRef.current?.offsetWidth || 500);
//     };

//     // Call the resize handler initially and add the event listener
//     resizeHandler();
//     window.addEventListener('resize', resizeHandler);

//     // Clean up the event listener
//     return () => {
//       window.removeEventListener('resize', resizeHandler);
//     };
//   }, []);

  return (
    <div ref={containerRef} className="w-full relative z-0 ">
      <iframe
        ref={iframeRef}
        src={`https://player.vimeo.com/video/${videoId}?muted=1&autoplay=1&playsinline=1`} // autoplay removed on jan 10
        // src={`https://player.vimeo.com/video/${videoId}?autoplay=1`} // autoplay added on jan 8
        width={(containerWidth).toString()}
        height={((containerWidth * 9) / 16).toString()}
        style={{ position: 'relative' }}
        frameBorder="0"
        allowFullScreen
        allow="autoplay"
        className='rounded-t-xl'
      ></iframe>
    </div>
  );
};

export default TrailerVideoPlayerAutoplay;