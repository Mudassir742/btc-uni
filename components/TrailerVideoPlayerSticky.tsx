"use client";
import { useState, useEffect, useRef } from "react";
import VimeoPlayer from "@vimeo/player";
import "@/styles/globals.css";
import { SMALL_SCREEN_BREAKPOINT } from "@/lib/constants";

interface TrailerVideoPlayerStickyProps {
	videoId: string;
	// startTime: number;
}

const TrailerVideoPlayerSticky: React.FC<TrailerVideoPlayerStickyProps> = ({
	videoId,
	// startTime,
}) => {
	const containerRef = useRef<HTMLDivElement | null>(null);
	const iframeRef = useRef<HTMLIFrameElement | null>(null);
	// video width based on the container it goes into (same as in VideoPlayer.tsx)
	const [containerWidth, setContainerWidth] = useState(0);
	const [isFixed, setIsFixed] = useState(false);
	const [leftOffset, setLeftOffset] = useState(0);
	const [originalTop, setOriginalTop] = useState(0); // State to store the original top position

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
		window.addEventListener("resize", handleResize);

		// Remove event listener on cleanup
		return () => window.removeEventListener("resize", handleResize);
	}, []);

	useEffect(() => {
		const resizeHandler = () => {
			// Trigger a re-render when the window resizes
			setContainerWidth(containerRef.current?.offsetWidth || 500);
		};

		// Call the resize handler initially and add the event listener
		resizeHandler();
		window.addEventListener("resize", resizeHandler);

		// Clean up the event listener
		return () => {
			window.removeEventListener("resize", resizeHandler);
		};
	}, []);

	// useEffect(() => {
	//   const handleScroll = () => {
	//     const currentScrollPos = window.pageYOffset;
	//     const isScrollingUp = currentScrollPos < prevScrollPos;

	//     // Toggle trailerFixed based on scroll direction
	//     if (isScrollingUp) {
	//       setTrailerFixed(false); // Scroll up, make it relative
	//     } else {
	//       setTrailerFixed(true); // Scroll down, make it fixed
	//     }

	//     setPrevScrollPos(currentScrollPos);
	//   };

	//   window.addEventListener('scroll', handleScroll);

	//   return () => {
	//     window.removeEventListener('scroll', handleScroll);
	//   };
	// }, [prevScrollPos]);

	// useEffect(() => {
	//   const handleScroll = () => {
	//     // Determine the conditions under which you want the player to be sticky.
	//     // For example, if the user has scrolled past a certain point:
	//     const shouldBeSticky = window.pageYOffset > 0;

	//     setTrailerFixed(shouldBeSticky);
	//   };

	//   window.addEventListener('scroll', handleScroll);

	//   return () => {
	//     window.removeEventListener('scroll', handleScroll);
	//   };
	// }, []);

	// SEMI-WORKING SOLUTION below

	// const handleScroll = () => {
	//   if (containerRef.current) {
	//     const offsetTop = containerRef.current.getBoundingClientRect().top;
	//     setIsFixed(offsetTop <= 0);
	//   }
	// };

	// useEffect(() => {
	//   window.addEventListener('scroll', handleScroll);

	//   return () => {
	//     window.removeEventListener('scroll', handleScroll);
	//   };
	// }, []);

	// FULLY WORKING SOLUTION belwo

	const handleScroll = () => {
		// Check if the current window width is less than the breakpoint
		if (window.innerWidth < SMALL_SCREEN_BREAKPOINT) {
			if (containerRef.current) {
				const rect = containerRef.current.getBoundingClientRect();
				const shouldBeFixed = rect.top <= 0;

				if (shouldBeFixed && !isFixed) {
					// Store the original top and left positions
					setOriginalTop(window.pageYOffset + rect.top);
					setLeftOffset(rect.left);
					setIsFixed(true);
				} else if (window.pageYOffset <= originalTop && isFixed) {
					setIsFixed(false);
				}
			}
		} else {
			// If the screen is larger than the breakpoint, ensure the video is not fixed
			if (isFixed) {
				setIsFixed(false);
			}
		}
	};

	useEffect(() => {
		window.addEventListener("scroll", handleScroll);

		return () => {
			window.removeEventListener("scroll", handleScroll);
		};
	}, [isFixed, originalTop, leftOffset]); // Depend on isFixed, originalTop, and leftOffset

	// Calculate the style based on whether the video player is fixed
	const fixedStyle: React.CSSProperties = isFixed
		? {
				position: "fixed",
				top: 0,
				left: leftOffset, // Apply the left offset to maintain horizontal position
				width: containerRef.current?.offsetWidth, // Maintain the original width
				zIndex: 2,
		  }
		: {};

	return (
		<div ref={containerRef} style={fixedStyle}>
			<iframe
				ref={iframeRef}
				src={`https://player.vimeo.com/video/${videoId}`} // autoplay removed on jan 10
				// src={`https://player.vimeo.com/video/${videoId}?autoplay=1`} // autoplay added on jan 8
				width={containerWidth.toString()}
				height={((containerWidth * 9) / 16).toString()}
				style={{ position: "relative" }}
				frameBorder="0"
				allowFullScreen
			></iframe>
		</div>
	);
};

export default TrailerVideoPlayerSticky;
