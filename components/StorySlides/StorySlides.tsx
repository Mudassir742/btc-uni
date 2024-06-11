import React, { memo } from "react";

import { VideoPlayer } from "../../components/VideoPlayer/VideoPlayer";
import { Educator } from "@/interfaces";

interface Props {
	videoId?: string;
	title?: string;
	storyFocused?: boolean;
	onNextSlide: () => void;
	educatorLink: string | false;
	educatorHandle: string | false;
	courseTitle?: string;
	educator?: Educator;
	courseLink?: string;
	moveToVideo: () => void;
}

const MemoizedStorySlides: React.FC<Props> = ({
	videoId,
	storyFocused = false,
	onNextSlide,
	title,
	educatorHandle,
	educatorLink,
	educator,
	courseTitle,
	courseLink,
	moveToVideo,
}) => {
	return (
		videoId && (
			<div className="relative h-[80vh] md:h-[50vh] rounded-lg overflow-hidden w-screen md:w-64">
				<div className="top-10 w-full h-full px-2 flex space-x-1">
					{!!title && (
						<VideoPlayer
							moveToVideo={moveToVideo}
							courseLink={courseLink}
							key={videoId}
							title={title}
							onNextVideo={onNextSlide}
							isFocused={storyFocused}
							videoId={videoId}
							educatorLink={educatorLink}
							educatorHandle={educatorHandle}
							hideControls={false}
							educator={educator}
							courseTitle={courseTitle}
						/>
					)}
				</div>
			</div>
		)
	);
};

const StorySlides = memo(MemoizedStorySlides);
export { StorySlides };
