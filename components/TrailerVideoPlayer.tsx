"use client";
import { useState, useEffect, useRef } from 'react';
import VimeoPlayer from '@vimeo/player';

interface TrailerVideoPlayerProps {
  videoId: string;
  // startTime: number;
}

const TrailerVideoPlayer: React.FC<TrailerVideoPlayerProps> = ({
  videoId,
  // startTime,
}) => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const iframeRef = useRef<HTMLIFrameElement | null>(null);
  // video width based on the container it goes into (same as in VideoPlayer.tsx)
  const [containerWidth, setContainerWidth] = useState(0);
  const [key, setKey] = useState(0);

  // useEffect(() => {
  //   const handleResize = () => {
  //     if (containerRef.current) {
  //       setContainerWidth(containerRef.current.offsetWidth);
  //     }
  //   };  
  
  //   // Set the initial width
  //   handleResize();
  
  //   // Add event listener
  //   window.addEventListener('resize', handleResize);
  
  //   // Remove event listener on cleanup
  //   return () => window.removeEventListener('resize', handleResize);
  // }, []);

  useEffect(() => {
    // console.log("Container width:", containerWidth);
  }, [containerWidth]);

  // const handleVideoPlay = async () => {
  //   try {
  //     // ... (video play logic, if any for trailer video)
  //     if (iframeRef.current) {
  //       const player = new VimeoPlayer(iframeRef.current);

  //       // Set the initial playback time when the player is ready
  //       player.setCurrentTime(startTime).catch(error => {
  //         console.error('Error setting initial time:', error);
  //       });
  //     }
  //   } catch (error) {
  //     console.error('Error performing logic', error);
  //   }
  // };

  // useEffect(() => {
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  //   handleVideoPlay();
  // }, [startTime]);

  // useEffect(() => {
  //   const resizeHandler = () => {
  //     // Get the container's width
  //     if (containerRef.current) {
  //       const containerWidth = containerRef.current.offsetWidth;
        
  //       // Set the iframe's width based on the container width
  //       if (iframeRef.current) {
  //         iframeRef.current.width = containerWidth.toString();
  //         iframeRef.current.height = (containerWidth * 0.66666).toString();
  //       }
  //     }
  //   };

  //   // Call the resize handler initially and add the event listener
  //   resizeHandler();
  //   window.addEventListener('resize', resizeHandler);

  //   // Clean up the event listener
  //   return () => {
  //     window.removeEventListener('resize', resizeHandler);
  //   };
  // }, []);

  // useEffect(() => {
  //   const resizeHandler = () => {
  //     // Trigger a re-render by changing the key
  //     setKey(key + 1);
  //   };
  
  //   // Call the resize handler initially and add the event listener
  //   resizeHandler();
  //   window.addEventListener('resize', resizeHandler);
  
  //   // Clean up the event listener
  //   return () => {
  //     window.removeEventListener('resize', resizeHandler);
  //   };
  // }, [key]);

  useEffect(() => {
    const handleResize = () => {
      if (containerRef.current) {
        setContainerWidth(containerRef.current.offsetWidth);
      }
    };


    // Log a message to check if the function is called
    // Set the initial width
    handleResize();

    // Add event listener
    window.addEventListener('resize', handleResize);

    // Remove event listener on cleanup
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    const resizeHandler = () => {
      // Trigger a re-render when the window resizes
      setContainerWidth(containerRef.current?.offsetWidth || 500);
    };

    // Call the resize handler initially and add the event listener
    resizeHandler();
    window.addEventListener('resize', resizeHandler);

    // Clean up the event listener
    return () => {
      window.removeEventListener('resize', resizeHandler);
    };
  }, []);

  return (
    <div ref={containerRef} className="w-full relative z-0 ">
      <iframe
        ref={iframeRef}
        src={`https://player.vimeo.com/video/${videoId}`} // autoplay removed on jan 10
        // src={`https://player.vimeo.com/video/${videoId}?autoplay=1`} // autoplay added on jan 8
        width={(containerWidth).toString()}
        height={((containerWidth * 9) / 16).toString()}
        style={{ position: 'relative' }}
        frameBorder="0"
        allowFullScreen
        className='rounded-t-xl'
      ></iframe>
    </div>
  );
};

export default TrailerVideoPlayer;




// "use client"
// import { useState, useEffect, useRef } from 'react';
// import VimeoPlayer from '@vimeo/player';

// interface TrailerVideoPlayerProps {
//     videoId: string;
//     startTime: number;
// }

// // IMPORTANT: this is the player for the class trailer (useful to segregate in case we want separate logic)
// const TrailerVideoPlayer: React.FC<TrailerVideoPlayerProps> = ({
//     videoId,
//     startTime,
//   }) => {
//     const [screenWidth, setScreenWidth] = useState<number>(0);
//     const iframeRef = useRef<HTMLIFrameElement | null>(null);
  
//     const handleVideoPlay = async () => {
//       try {
//         // ... (video play logic, if any for trailer video)
//         if (iframeRef.current) {
//           const player = new VimeoPlayer(iframeRef.current);
  
//           // Set the initial playback time when the player is ready
//           player.setCurrentTime(startTime).catch(error => {
//             console.error('Error setting initial time:', error);
//           });
//         }
        
//       } catch (error) {
//         console.error('Error performing logic', error);
//       }
//     };
  
  
//     useEffect(() => {
//       const updateScreenWidth = () => {
//         setScreenWidth(window.innerWidth);
//       };
  
//       updateScreenWidth();
  
//       window.addEventListener('resize', updateScreenWidth);
  
//       return () => {
//         window.removeEventListener('resize', updateScreenWidth);
//       };
//     }, []);
  
//     useEffect(() => {
//       // eslint-disable-next-line react-hooks/exhaustive-deps
//       handleVideoPlay();
//     }, [startTime]);
  
//     return (
//       <iframe
//         ref={iframeRef}
//         src={`https://player.vimeo.com/video/${videoId}`}
//         width={screenWidth.toString()}
//         height={(screenWidth * 0.66666).toString()}
//         style={{ position: 'relative' }}
//         frameBorder="0"
//         allowFullScreen
//       ></iframe>
//     );
//   };
  
//   export default TrailerVideoPlayer;