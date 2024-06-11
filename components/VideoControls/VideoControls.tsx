import { Pause, Play } from "lucide-react";
import React, { forwardRef } from "react";

interface VideoControlsProps {
	handlePlayPause: () => void;
	isPlaying: boolean;
}

const ICONS_COLOR = "#FFF";

const VideoControls = forwardRef<HTMLDivElement, VideoControlsProps>(
	({ handlePlayPause, isPlaying }, ref) => {
		return (
			<div className="absolute top-0 h-full w-full lg:z-[100]">
				<div className="flex h-full items-center justify-center">
					<div className="w-14 h-14 lg:w-20 cursor-pointer lg:h-20 flex items-center justify-center opacity-70 rounded-full backdrop-blur-[61.72px]">
						{isPlaying ? (
							<Pause color={ICONS_COLOR} onClick={handlePlayPause} />
						) : (
							<Play color={ICONS_COLOR} onClick={handlePlayPause} />
						)}
					</div>
				</div>
			</div>
		);
	}
);
VideoControls.displayName = "VideoControls";

export { VideoControls };
