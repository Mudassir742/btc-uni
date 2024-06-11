"use client";
import classNames from "classnames";
import React, {
	Dispatch,
	SetStateAction,
	useCallback,
	useMemo,
	useRef,
	useState,
} from "react";
import { Story } from "../Story";
import { Tip } from "@/interfaces";
import { useMediaQuery } from "react-responsive";
import {
	Carousel,
	CarouselApi,
	CarouselContent,
	CarouselItem,
} from "../ui/carousel";

const emptyStorySlot = {
	databaseId: "empty",
};

interface TipsListProps {
	data: Array<Tip>;
	initialIndex: number;
	setInitialIndex: Dispatch<SetStateAction<number>>;
}
const TipsList: React.FC<TipsListProps> = ({
	data,
	initialIndex,
	setInitialIndex,
}) => {
	const isMobile = useMediaQuery({ maxWidth: 767 });
	const [api, setApi] = useState<CarouselApi>();
	const [current, setCurrent] = useState(initialIndex);
	const [moveLeft, setMoveLeft] = useState(false);
	const [moveRight, setMoveRight] = useState(false);
	const activeIndex = useRef(0);
	const visibleStories = useMemo(() => {
		const extendedStories = [
			emptyStorySlot,
			emptyStorySlot,
			emptyStorySlot,
			...data,
			emptyStorySlot,
			emptyStorySlot,
			emptyStorySlot,
		];

		return extendedStories.slice(initialIndex, initialIndex + 7);
	}, [initialIndex, data]);

	function nextStory() {
		setMoveLeft(true);
	}

	function prevStory() {
		if (initialIndex > 0) {
			setMoveRight(true);
		}
	}

	function moveToVideo(index: number) {
		if (index === 4) return nextStory();
		if (index === 5) return moveNextTwice();
		if (index === 2) return prevStory();
		if (index === 1) return moveBackTwice();
	}

	const moveNextTwice = () => {
		setMoveLeft(true);
		activeIndex.current = activeIndex.current + 1;
		setInitialIndex((prevIndex) => prevIndex + 1);
	};

	const moveBackTwice = () => {
		setMoveRight(true);
		activeIndex.current = activeIndex.current - 1;
		setInitialIndex((prevIndex) => prevIndex - 1);
	};

	const transitionend = useCallback(
		(index: number) => {
			if (index > 0) return;
			if (moveLeft) {
				activeIndex.current++;
				setInitialIndex((prevIndex) => prevIndex + 1);

				setMoveLeft(false);
			} else if (moveRight) {
				activeIndex.current--;
				setInitialIndex((prevIndex) => prevIndex - 1);

				setMoveRight(false);
			}
		},
		[moveLeft, moveRight, setInitialIndex]
	);

	React.useEffect(() => {
		if (!isMobile) return;
		if (!api) {
			return;
		}

		api.on("select", () => {
			setCurrent(api.selectedScrollSnap());
		});

		api.scrollTo(initialIndex, true);
	}, [api, initialIndex, isMobile]);

	return (
		<div className="relative lg:h-screen  md:flex items-center bg-blackV2 bg-opacity-50 overflow-x-hidden">
			{!isMobile ? (
				<div className="absolute flex left-1/2 -translate-x-1/2">
					<div className="fixed top-0 left-0 z-50 text-white"></div>
					{visibleStories.map((story, index) => (
						<Story
							key={index}
							className={classNames({
								"transition-all duration-300 -translate-x-[150%]": moveLeft,
								"transition-all duration-300 translate-x-[150%]": moveRight,
								"scale-150":
									(index === 3 && !moveLeft && !moveRight) ||
									(index === 4 && moveLeft) ||
									(index === 2 && moveRight),
							})}
							focused={index === 3 && !moveLeft && !moveRight}
							story={story}
							canMoveForward={initialIndex !== data.length - 1}
							canMoveBackward={initialIndex !== 0}
							onNextStory={nextStory}
							onPrevStory={prevStory}
							moveToVideo={() => moveToVideo(index)}
							onTransitionEnd={() => transitionend(index)}
						/>
					))}
				</div>
			) : (
				<Carousel
					setApi={setApi}
					opts={{
						align: "start",
					}}
					orientation="vertical"
					className="w-full "
				>
					<CarouselContent className="-mt-1 h-screen">
						{data.map((elem, index) => (
							<CarouselItem
								key={elem.databaseId}
								className="pt-1 flex items-center justify-center"
							>
								<div className="p-1  w-full">
									<Story
										key={current}
										focused={index === current}
										onNextStory={() => api?.scrollNext()}
										story={elem}
									/>
								</div>
							</CarouselItem>
						))}
					</CarouselContent>
				</Carousel>
			)}
		</div>
	);
};

export { TipsList };
