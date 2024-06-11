import React, { useEffect, useState } from "react";
import CardHandle from "./text/CardHandle";
import CardTitle from "./text/CardTitle";

import toast from "react-hot-toast";
import { LockKeyhole, Play, XCircle } from "lucide-react";
import ParagraphText from "./text/Paragraph";
import Link from "next/link";
import { Button } from "./ui/Button";
import Image from "next/image";
import { useGenerateThumbnails } from "@/hooks/useGenerateThumbnails";

interface CourseHighlightsCardProps {
	highlightDescription: string;
	// imageURL: string;
	videoId: string;
	canWatch: boolean;
	isPurchasableALaCarte: boolean;
	isPurchasableOnlyALaCarte: boolean;
	courseId: number;
	userDataBaseId: string;
}

let imageWidth = 238;

const CourseHighlightsCard: React.FC<CourseHighlightsCardProps> = ({
	highlightDescription,
	videoId,
	canWatch,
	isPurchasableALaCarte,
	isPurchasableOnlyALaCarte,
	courseId,
	userDataBaseId,
}) => {
	const [screenWidth, setScreenWidth] = useState(0);
	const [lightboxOpen, setLightboxOpen] = useState(false);
	const { imageUrl } = useGenerateThumbnails(+videoId);

	useEffect(() => {
		if (typeof window !== "undefined") {
			setScreenWidth(window.innerWidth);
		}

		const handleResize = () => {
			setScreenWidth(window.innerWidth);
		};

		window.addEventListener("resize", handleResize);

		return () => {
			window.removeEventListener("resize", handleResize);
		};
	}, []);

	if (screenWidth < 768) {
		imageWidth = 238;
	} else {
		imageWidth = 238;
	}

	const openLightbox = () => {
		// Send to GA
		(window as any).dataLayer.push({
			event: "clickedCourseHighlight",

			onPageOfCourse: courseId.toString(),
			userDataId: userDataBaseId,

			videoId: videoId,
			highlightDescription: highlightDescription,
			wasAbleToExpand: canWatch,

			timestamp: new Date().toISOString(),
		});

		// Only open the lightbox if the user is subscribed
		if (canWatch) {
			setLightboxOpen(true);
		} else {
			toast.custom((t) => (
				<div
					className={`${
						t.visible ? "animate-enter" : "animate-leave"
					}   bg-white w-full  border-[1px]  border-border shadow-lg justify-center items-center m-auto  rounded-xl pointer-events-auto   `}
				>
					<div className="flex px-4">
						<button
							onClick={() => toast.dismiss(t.id)}
							className="absolute top-2 right-2 flex  text-themeColor"
						>
							<XCircle />
						</button>
					</div>
					<div>
						<div>
							<div>
								<div>
									{/* <p className="text-sm font-medium text-gray-900">
                  Oops!
                </p> */}
									{isPurchasableALaCarte && !isPurchasableOnlyALaCarte && (
										<div className="p-2">
											<div className="flex justify-center">
												<div>
													<p className="mt-1 text-[22px] text-themeColor uppercase bold flex justify-center">
														<b>Subscribe to unlock </b>
													</p>
													<p className="mt-1 text-[18px] uppercase text-themeColor flex justify-center">
														6-Month or Annual All-Access Plan Required
													</p>
												</div>
											</div>
										</div>
									)}
									{!isPurchasableALaCarte && (
										<div className="p-2">
											<div className="flex justify-center">
												<div>
													<p className="mt-1 text-[22px] uppercase text-themeColor bold flex justify-center">
														<b>Subscribe to unlock </b>
													</p>
													<p className="mt-1 text-[18px] uppercase text-themeColor flex justify-center">
														6-Month or Annual All-Access Plan Required
													</p>
												</div>
											</div>
										</div>
									)}
									{isPurchasableOnlyALaCarte && (
										<div className="p-2">
											<div className="flex justify-center">
												<div>
													<p className="mt-1 text-[22px] uppercase text-themeColor bold flex justify-center">
														<b>Subscribe to unlock </b>
													</p>
													<p className="mt-1 text-[18px] uppercase text-themeColor flex justify-center">
														6-Month or Annual All-Access Plan Required
													</p>
												</div>
											</div>
										</div>
									)}
								</div>
							</div>
						</div>

						{isPurchasableALaCarte && !isPurchasableOnlyALaCarte && (
							<div className="flex justify-center pb-4">
								<div className="flex ">
									<Link href={"/subscribe"}>
										<Button className="subscribe-button-click-highlight">
											SUBSCRIBE TO UNLOCK
										</Button>
									</Link>
								</div>
							</div>
						)}
						{!isPurchasableALaCarte && (
							<div className="flex justify-center pb-4">
								<div className="flex ">
									<Link href={"/subscribe"}>
										<Button className="subscribe-button-click-highlight">
											SUBSCRIBE TO UNLOCK
										</Button>
									</Link>
								</div>
							</div>
						)}
						{isPurchasableOnlyALaCarte && (
							<div className="flex justify-center pb-4">
								<div className="flex ">
									<Link href={"/subscribe"}>
										<Button className="subscribe-button-click-highlight">
											SUBSCRIBE TO UNLOCK
										</Button>
									</Link>
								</div>
							</div>
						)}
					</div>
				</div>
			));
		}
	};

	const closeLightbox = () => {
		setLightboxOpen(false);
	};

	const iframeStyle = lightboxOpen
		? {
				transform: "scale(3)", // Scale up the video 3 times
				transformOrigin: "center",
		  }
		: {};

	const iframeWidth = lightboxOpen
		? screenWidth > 768
			? "960px"
			: "100%"
		: "320px"; // Example sizes, adjust as needed

	return (
		<div className="tipcard  border-[1px] border-border rounded-xl shadow-lg">
			{/* Image with lightbox functionality */}
			<div
				id="Course-Highlight-Card"
				className="h-full object-cover"
				onClick={openLightbox}
			>
				<div style={{ width: `${imageWidth}px` }}>
					<div className="relative">
						<div className="!w-full border-r rounded-t-lg relative pb-[56.25%] h-0  xl:mt-0">
							<Image
								fill
								priority
								src={imageUrl}
								alt="tip-card"
								className="rounded-t-[24px] "
							/>
							<div className="absolute flex top-0 h-full items-center justify-center w-full ">
								<div className="w-14 h-14 relative cursor-pointer">
									<div className="w-12 h-12 left-0 top-0 absolute flex items-center justify-center bg-white/opacity-10 rounded-full shadow border border-white backdrop-blur-[23.33px]">
										<Play fill="white" size={16} color="#fff" />
									</div>
								</div>
							</div>
						</div>
						{highlightDescription && (
							<div className="p-2">
								<ParagraphText text={highlightDescription} />
							</div>
						)}

						{/* <iframe
              // ref={iframeRef}
              src={`https://player.vimeo.com/video/${videoId}`}
              width="100%" // Width relative to the container
              height="auto" // Automatically adjusts the height based on the aspect ratio

              allowFullScreen
              className="justify-start rounded-xl"
            /> */}

						<div>
							{/* Overlay with "subscribe to view" message */}
							<div
								className={`absolute inset-0 items-center justify-center ${
									!canWatch ? "" : ""
								} ${lightboxOpen ? "hidden" : ""}`}
							>
								{!canWatch && (
									<div className="flex justify-center items-center h-full">
										{/* <div className='bg-white w-20 h-8 rounded-xl flex justify-center items-center'>
                  <LockKeyhole fill={'white'} />
</div> */}
									</div>
								)}
							</div>
						</div>
					</div>
				</div>
				<div style={{ width: `${imageWidth}px`, height: "auto" }}>
					{/* <div className='line-clamp-3 pr-4'>
          {highlightDescription}
          </div> */}
				</div>
			</div>

			{/* Lightbox */}
			{lightboxOpen && (
				<div
					className="fixed inset-0 z-50 flex justify-center items-center bg-black bg-opacity-75"
					onClick={closeLightbox}
				>
					{/* Lightbox container */}
					<div className="relative max-w-5xl w-full h-full px-4">
						<iframe
							src={`https://player.vimeo.com/video/${videoId}?autoplay=1`}
							allowFullScreen
							className="w-full h-full"
						/>

						{/* Close button, positioned relative to the lightbox container */}
						<div
							className="absolute top-0 right-0 z-50 cursor-pointer p-2"
							onClick={closeLightbox}
						>
							<XCircle fill={"white"} size={38} />
						</div>
					</div>
				</div>
			)}
		</div>
	);
};

export default CourseHighlightsCard;
