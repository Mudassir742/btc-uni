"use client";
import React, { useCallback, useRef, useState } from "react";
import ReactPlayer from "react-forked-player/lazy";
import { VideoControls } from "../VideoControls";
import { OnProgressProps } from "react-forked-player/base";
import { RotatingLines } from "react-loader-spinner";
import { Progress } from "../ui/progress";
import Link from "next/link";
import { cn } from "@/utils/shadcn";
import { Educator } from "@/interfaces";
import { Avatar, AvatarImage } from "../ui/avatar";
import { useMediaQuery } from "react-responsive";

type VideoPlayerProps =
	| {
			hideControls?: false;
			videoId: string;
			isFocused: boolean;
			onNextVideo: () => void;
			title: string;
			educatorLink: string | false;
			educatorHandle: string | false;
			educator?: Educator;
			courseTitle?: string;
			courseLink?: string;
			moveToVideo: () => void;
	  }
	| {
			hideControls?: true;
			videoId: string;
			isFocused?: never;
			onNextVideo?: never;
			title?: never;
			educatorLink?: never;
			educatorHandle?: never;
			courseTitle?: string;
			educator?: Educator;
			courseLink?: string;
			moveToVideo: () => void;
	  };

let count = 0;

const VideoPlayer: React.FC<VideoPlayerProps> = ({
	videoId,
	isFocused,
	onNextVideo,
	title,
	educatorHandle,
	educatorLink,
	hideControls,
	courseTitle,
	educator,
	courseLink,
	moveToVideo,
}) => {
	const isMobile = useMediaQuery({ maxWidth: 767 });

	const [isPlaying, setIsPlaying] = useState(isMobile ? false : isFocused);
	const [isLoading, setIsLoading] = useState(isFocused || false);
	const [duration, setDuration] = useState(0);
	const [playedSeconds, setPlayedSeconds] = useState(0);

	const controlsRef = useRef<HTMLDivElement>(null);
	const handlePlayPause = useCallback(() => {
		setIsPlaying(!isPlaying);
	}, [isPlaying]);

	const handleMouseMove = useCallback(() => {
		if (!isFocused) return;
		if (!controlsRef.current) return;
		controlsRef.current.style.visibility = "visible";
		count = 0;
	}, [isFocused]);

	const handleMouseLeave = useCallback(() => {
		if (!isFocused) return;
		if (!controlsRef.current) return;
		controlsRef.current.style.visibility = "hidden";
		count = 0;
	}, [isFocused]);

	const handleProgress = (changeState: OnProgressProps) => {
		setPlayedSeconds(changeState.playedSeconds);
		if (!controlsRef.current) return;
		if (count > 3) {
			controlsRef.current.style.visibility = "hidden";
			count = 0;
		}
		if (controlsRef.current.style.visibility == "visible") {
			count += 1;
		}
	};
	const handleDuration = (duration: number) => {
		setDuration(duration);
	};

	return (
		<div
			onMouseMove={handleMouseMove}
			onMouseEnter={handleMouseLeave}
			className="absolute top-0 right-0 bottom-0 w-full h-full"
		>
			<div className="absolute top-0 w-full z-[100]">
				<div className="relative inline-block px-4 pt-2 w-full">
					<div
						className={cn("absolute inset-0 flex items-stretch", {
							"overlay-background": !hideControls,
						})}
					></div>
					{isFocused && !isLoading && (
						<div className="z-[100] mb-2 lg:mx-0 mx-3 ">
							<Progress
								className="h-1"
								value={(playedSeconds / duration) * 100}
								max={duration}
							/>
						</div>
					)}
					<div className="relative z-10 pb-3 text-white text-14 lg:text-[12px] font-semibold">
						{title}
					</div>
				</div>
			</div>

			<>
				{/* {isFocused && isLoading && (
					<div className="absolute top-0 h-full w-full flex items-center justify-center">
						<RotatingLines
							visible={true}
							width="24"
							strokeWidth="5"
							animationDuration="0.75"
							strokeColor="gray"
							ariaLabel="rotating-lines-loading"
						/>
					</div>
				)} */}
				<div className="relative h-full z-[-1] lg:z-50">
					<ReactPlayer
						key={videoId}
						playsinline={true}
						playing={isPlaying}
						light={!isFocused}
						style={{
							position: "absolute",
							top: 0,
						}}
						onClickPreview={() => moveToVideo()}
						onProgress={handleProgress}
						width={"100%"}
						height={"100%"}
						url={`https://player.vimeo.com/video/${videoId}`}
						onPlay={() => setIsLoading(false)}
						onEnded={onNextVideo}
						onDuration={handleDuration}
					/>
				</div>
				{!hideControls && (
					<>
						<div className="z-[10000] absolute bottom-0 w-full ">
							<div className="relative inline-block px-2 pt-2 w-full">
								<div className="overlay-background absolute inset-0 flex items-stretch rotate-180"></div>

								<div className="flex flex-col gap-2">
									{educatorLink && (
										<Link
											target="_blank"
											href={educatorLink}
											className="flex gap-1 items-center"
										>
											<Avatar>
												<AvatarImage
													src={
														educator?.educatorMetaData.educatorpicture
															?.mediaItemUrl
													}
												/>
											</Avatar>
											<div className="flex flex-col gap-1">
												<div className="relative z-10  text-white text-14 lg:text-[12px] font-semibold">
													{educatorHandle}
												</div>
											</div>
										</Link>
									)}

									<Link target="_blank" href={`/courses/${courseLink}`}>
										<div className="relative z-10 pb-3 text-white text-14 lg:text-[12px] font-semibold">
											<div className="text-left text-stone-400 text-14 lg:text-[10px] font-semibold  underline">
												{courseTitle && `Watch The Course : ${courseTitle}`}
											</div>
										</div>
									</Link>
								</div>
							</div>
						</div>
						{isFocused && (
							<VideoControls
								ref={controlsRef}
								isPlaying={isPlaying || false}
								handlePlayPause={handlePlayPause}
							/>
						)}
					</>
				)}
			</>
		</div>
	);
};

export { VideoPlayer };
