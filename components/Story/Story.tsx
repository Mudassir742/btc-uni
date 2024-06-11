import { Tip } from "@/interfaces";
import React, { memo } from "react";
import { StorySlides } from "../StorySlides";
import { cn } from "@/utils/shadcn";

interface Props {
	story: { databaseId: string } | Tip;
	focused?: boolean;
	onNextStory: () => void;
	onPrevStory?: () => void;
	className?: string;
	onTransitionEnd?: () => void;
	canMoveForward?: boolean;
	canMoveBackward?: boolean;
	moveToVideo?: () => void;
}

const MemoizedStory: React.FC<Props> = ({
	story,
	focused = false,
	onNextStory,
	onPrevStory,
	className,
	onTransitionEnd,
	canMoveForward = false,
	canMoveBackward = false,
	moveToVideo = () => {},
}) => {
	return (
		<div
			onTransitionEnd={onTransitionEnd}
			className="w-full md:w-96  rounded-xl flex-shrink-0 flex justify-center"
		>
			<div className={cn("flex rounded-xl overflow-hidden", className)}>
				{focused && canMoveBackward && (
					<button
						onClick={onPrevStory}
						className="text-gray-200 hidden outline-none lg:block "
					>
						<svg
							xmlns="http://www.w3.org/2000/svg"
							fill="none"
							viewBox="0 0 24 24"
							strokeWidth="1.5"
							stroke="currentColor"
							className="w-6 h-6"
						>
							<path
								strokeLinecap="round"
								strokeLinejoin="round"
								d="M11.25 9l-3 3m0 0l3 3m-3-3h7.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
							/>
						</svg>
					</button>
				)}

				<StorySlides
					moveToVideo={moveToVideo}
					videoId={
						"tipmetadata" in story && "video" in story.tipmetadata
							? story?.tipmetadata?.video
							: undefined
					}
					title={"title" in story ? story?.title : undefined}
					storyFocused={focused}
					courseTitle={
						("tipmetadata" in story && story.tipmetadata.tipCourse?.title) ||
						undefined
					}
					educator={
						("tipmetadata" in story && story.tipmetadata?.tipEducator?.[0]) ||
						undefined
					}
					educatorLink={
						"tipmetadata" in story &&
						"https://www.btcuniversity.com/educator/" +
							(story?.tipmetadata?.tipEducator[0]?.slug || "")
					}
					courseLink={
						("tipmetadata" in story && story.tipmetadata?.tipCourse?.slug) ||
						undefined
					}
					educatorHandle={
						("tipmetadata" in story &&
							story?.tipmetadata?.tipEducator[0]?.educatorMetaData
								?.instahandle) ||
						""
					}
					onNextSlide={onNextStory}
				/>

				{/* next story button */}
				{focused && canMoveForward && (
					<button
						onClick={onNextStory}
						className="text-gray-200 outline-none hidden lg:block"
					>
						<svg
							xmlns="http://www.w3.org/2000/svg"
							fill="none"
							viewBox="0 0 24 24"
							strokeWidth="1.5"
							stroke="currentColor"
							className="w-6 h-6"
						>
							<path
								strokeLinecap="round"
								strokeLinejoin="round"
								d="M12.75 15l3-3m0 0l-3-3m3 3h-7.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
							/>
						</svg>
					</button>
				)}
			</div>
		</div>
	);
};
const Story = memo(MemoizedStory);
export { Story };
