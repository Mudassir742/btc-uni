"use client";
import React, { Suspense, useEffect, useRef, useState } from "react";
import Image from "next/image";

import "@/styles/globals.css";
import { SMALL_SCREEN_BREAKPOINT } from "@/lib/constants";

import DurationText from "./text/Duration";

import dynamic from "next/dynamic";
import TrailerVideoPlayerAutoplay from "./TrailerVideoPlayerAutoplay";
import { useRouter, useSearchParams } from "next/navigation";

interface CourseHeroStickyClientProps {
	duration: string;

	theCourseTitle: string;
	courseDetailPicture: string;

	videoTrailerId: string;
}

interface NoteData {
	note: string;
	lastSavedOn: string;
}

interface PlayButtonProps {
	noteData: NoteData;
	onNoteUpdate: (newNote: string, newLastSavedOn: string) => void;
}

// Dynamic import
// const  Rating  = dynamic(() => import("@mui/material").then(item => item.Rating), {
//   ssr: false,
//   loading: () => <p>Loading ...</p>,
// })
const PlayButton = dynamic(() => import("./buttons/PlayButton"), {
	ssr: false,
});

const CourseHeroStickyClient: React.FC<CourseHeroStickyClientProps> = ({
	duration,
	theCourseTitle,
	courseDetailPicture,
	videoTrailerId,
}) => {
	const containerRef = useRef<HTMLDivElement | null>(null);
	const iframeRef = useRef<HTMLIFrameElement | null>(null);
	// video width based on the container it goes into (same as in VideoPlayer.tsx)
	const [containerWidth, setContainerWidth] = useState(0);
	const [isFixed, setIsFixed] = useState(false);
	const [leftOffset, setLeftOffset] = useState(0);
	const [originalTop, setOriginalTop] = useState(0); // State to store the original top position
	const [stickyHeight, setStickyHeight] = useState(0);

	const searchParams = useSearchParams();
	
	const coursePurchase = searchParams?.get("coursePurchase");
	const coursePurchasePrice = searchParams?.get("coursePurchasePrice");
	const coursePurchaseCourseName = searchParams?.get("coursePurchaseCourseName");
	const coursePurchaseCourseId = searchParams?.get("coursePurchaseCourseId");
	const coursePurchaseUserId = searchParams?.get("coursePurchaseUserId");

	const [noteData, setNoteData] = useState<NoteData>({
		note: "",
		lastSavedOn: "",
	});

	const handleNoteUpdate = (newNote: string, newLastSavedOn: string) => {
		setNoteData({ note: newNote, lastSavedOn: newLastSavedOn });
	};

	const router = useRouter();

	useEffect(() => {
		router.refresh();
	}, []);
	// TO DO IMMEDIATELY AFTER LAUNCH: change to more efficient way, right now were improvising to show Start Course after subscribing, course purchase, or bundle purchase

	useEffect(() => {
		const handleScroll = () => {
			if (window.innerWidth < SMALL_SCREEN_BREAKPOINT) {
				if (containerRef.current) {
					const rect = containerRef.current.getBoundingClientRect();
					const shouldBeFixed = rect.top <= 0;

					if (shouldBeFixed && !isFixed) {
						const height = containerRef.current.offsetHeight;
						setStickyHeight(height); // Store the height of the sticky element
						setOriginalTop(window.pageYOffset + rect.top);
						setLeftOffset(rect.left);
						setIsFixed(true);
					} else if (window.pageYOffset <= originalTop && isFixed) {
						setIsFixed(false);
					}
				}
			} else {
				if (isFixed) {
					setIsFixed(false);
				}
			}
		};

		window.addEventListener("scroll", handleScroll);
		return () => window.removeEventListener("scroll", handleScroll);
	}, [isFixed, originalTop, leftOffset]);
  
	useEffect(() => {
  
	  // mihai: making sure that this triggers 1. only in the case of a course purchase and 2. only if this particular course hasn't been purchased before
	  if ((coursePurchase === "yes") && (window.localStorage.getItem(`${theCourseTitle}`) !== "purchased")) {
		console.log("mihai june 3 safari debugging ---- course purchased inner func runs");
		(window as any).dataLayer.push({
			event: "purchase",
			itemName: "course",
  
			userDataId: coursePurchaseUserId,
			purchaseType: "course",
  
			courseName: coursePurchaseCourseName,
			courseId: coursePurchaseCourseId,
			price: coursePurchasePrice,
			currency: "USD",
		});
		window.localStorage.setItem(`${theCourseTitle}`, "purchased");
	  }
  
  }, [coursePurchase, coursePurchaseCourseId, coursePurchaseCourseName, coursePurchasePrice, coursePurchaseUserId, theCourseTitle]);
  
  

	// Calculate the style based on whether the video player is fixed
	const fixedStyle: React.CSSProperties = isFixed
		? {
				position: "fixed",
				top: 0,
				left: leftOffset, // Apply the left offset to maintain horizontal position
				width: containerRef.current?.offsetWidth, // Maintain the original width
				zIndex: 4,
				background: "white",
		  }
		: {};

	return (
		<div className="bg-white h-full">
			{isFixed && <div style={{ height: `${stickyHeight}px` }}></div>}
			<>
				<div className="pb-2 h-full">
					<div
						className="relative w-full h-full aspect-video"
						ref={containerRef}
						style={fixedStyle}
					>
						{/* if videoTrailerId is an empty string, show an image */}
						{/* if courseDetailPicture is an empty string, show the placeholder. otherwise, show trailer image aka courseDetailPicture */}
						{/* <div className="sticky top-0 z-50 transform translate-y-0"> */}
						{videoTrailerId === "" && courseDetailPicture === "" && (
							<Image
								// src={transformWpUrl('https://btcu2023react.wpengine.com/wp-content/uploads/2023/10/trailer.png')}
								src={
									"https://cms.btcuniversity.com/wp-content/uploads/2023/10/trailer.png"
								}
								alt={theCourseTitle}
								fill
								className="object-cover rounded-t-xl"
								style={{ maxHeight: "100%" }}
							/>
						)}

						{/* if courseDetailPicture is an empty string, show the placeholder. otherwise, show trailer image aka courseDetailPicture */}
						{videoTrailerId === "" && courseDetailPicture !== "" && (
							<div className="w-full relative h-full aspect-video">
								<Image
									src={courseDetailPicture}
									alt={theCourseTitle}
									fill
									className="object-cover rounded-t-xl"
									style={{ maxHeight: "100%" }}
								/>
							</div>
						)}

						{/* if videoTrailerId is not an empty string (i.e. it exists), show the Trailer Video Player */}
						{videoTrailerId !== "" && (
							<div className="w-full">
								<div>
									<TrailerVideoPlayerAutoplay
										videoId={videoTrailerId}
										// startTime={trailerStartTime}
									/>
								</div>
								{/* <div className='absolute bottom-4 right-0 mb-4 mr-4 z-50 md:relative md:bottom-0 md:right-0 md:z-1'> */}
							</div>
						)}

						{duration !== "" && (
							<div className={`absolute top-2 right-2 z-1`}>
								<DurationText text={duration} color="white" />
							</div>
						)}
					</div>
				</div>
			</>
		</div>
	);
};

export default CourseHeroStickyClient;
