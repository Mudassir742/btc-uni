import React from "react";
import Image from "next/image";

interface VimeoVideoPlayerProps {
	videoId: string;
}

const VimeoVideoPlayer: React.FC<VimeoVideoPlayerProps> = ({ videoId }) => {
	// commented out on jan 6 due to rerendering performance issues. moreover, yt video cards were not resizing anyway
	// useEffect(() => {
	//   const handleResize = () => {
	//     if (containerRef.current) {
	//       setContainerWidth(containerRef.current.offsetWidth);
	//     }
	//   };

	//   // Log a message to check if the function is called
	//   console.log("Resizing");
	//   // Set the initial width
	//   handleResize();

	//   // Add event listener
	//   window.addEventListener("resize", handleResize);

	//   // Remove event listener on cleanup
	//   return () => window.removeEventListener("resize", handleResize);
	// }, []);

	// useEffect(() => {
	//   const resizeHandler = () => {
	//     // Trigger a re-render when the window resizes
	//     setContainerWidth(containerRef.current?.offsetWidth || 500);
	//   };

	//   // Call the resize handler initially and add the event listener
	//   resizeHandler();
	//   window.addEventListener("resize", resizeHandler);

	//   // Clean up the event listener
	//   return () => {
	//     window.removeEventListener("resize", resizeHandler);
	//   };
	// }, []);
	// commented out on jan 6 due to rerendering performance issues. moreover, yt video cards were not resizing anyway

	return (
		<div>
			<div className="!w-full relative pb-[56.25%] h-0 overflow-hidden  xl:mt-0">
				<iframe
					src={`https://player.vimeo.com/video/${videoId}?controls=0`}
					className="!w-full !h-full !absolute  rounded-t-xl"
					allow="fullscreen"
				/>
			</div>
		</div>
	);
};

export default VimeoVideoPlayer;

// "use client";
// import { useState, useEffect, useRef } from 'react';
// import VimeoPlayer from '@vimeo/player';
// import '@/styles/globals.css';

// interface YouTubeTrailerVideoPlayerProps {
//   videoId: string;
// }

// const YouTubeTrailerVideoPlayer: React.FC<YouTubeTrailerVideoPlayerProps> = ({
//   videoId
// }) => {
//   const containerRef = useRef<HTMLDivElement | null>(null);
//   const iframeRef = useRef<HTMLIFrameElement | null>(null);
//   // video width based on the container it goes into (same as in VideoPlayer.tsx)
//   const [containerWidth, setContainerWidth] = useState(0);

//   useEffect(() => {
//     console.log("Container width:", containerWidth);
//   }, [containerWidth]);

//   useEffect(() => {
//     const handleResize = () => {
//       if (containerRef.current) {
//         setContainerWidth(containerRef.current.offsetWidth);
//       }
//     };

//     // Log a message to check if the function is called
//     console.log('Resizing');
//     // Set the initial width
//     handleResize();

//     // Add event listener
//     window.addEventListener('resize', handleResize);

//     // Remove event listener on cleanup
//     return () => window.removeEventListener('resize', handleResize);
//   }, []);

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

//   return (
//     <div ref={containerRef} >
// <iframe
//   ref={iframeRef}
//   src={`https://player.vimeo.com/video/${videoId}?controls=0`}
//   width={(containerWidth).toString()}
//   height={((containerWidth * 9) / 16).toString()}
//   style={{ position: 'relative' }}

//   frameBorder="0"
//   allowFullScreen
// ></iframe>
//     </div>
//   );
// };

// export default YouTubeTrailerVideoPlayer;
