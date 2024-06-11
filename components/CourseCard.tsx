"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { Course, Educator } from "@/interfaces";
import Link from "next/link";
import FreeText from "./text/FreeText";

import Rating from "@mui/material/Rating";
import ParagraphText from "./text/Paragraph";

import CourseTitle from "./text/CourseTitle";
import DurationText from "./text/Duration";
import ParagraphSmall from "./text/ParagraphSmall";
import EducatorsName from "./text/EducatorsName";
import Checkmark from "./icons/Checkmark";
import { useIsFree } from "@/features/context/IsFreeContext";

let imageWidth = 210;
let imageHeight = 280;

interface CourseCardProps {
	course: Course;
	completed?: boolean;
	variant2?: boolean; // used in welcome compoenent
}

const CourseCard: React.FC<CourseCardProps> = ({
	completed,
	course,
	variant2,
}) => {
	const [screenWidth, setScreenWidth] = useState(0);
	const isFree = useIsFree();
	console.log(isFree);

	function convertTimeToHoursMinutes(time: string): string {
		if (!time) {
			return "";
		}

		const timeParts = time.split(":").map(Number);

		if (timeParts.length === 3) {
			const [hours, minutes, seconds] = timeParts;
			const totalMinutes = hours * 60 + minutes + (seconds >= 30 ? 1 : 0);

			if (totalMinutes === 60) {
				return "1 hr";
			} else {
				const hoursPart =
					totalMinutes >= 60 ? `${Math.floor(totalMinutes / 60)} hr` : "";
				const minutesPart =
					totalMinutes % 60 > 0 ? `${totalMinutes % 60} min` : "";
				return `${hoursPart} ${minutesPart}`;
			}
		} else if (timeParts.length === 2) {
			const [minutes, seconds] = timeParts;
			const totalMinutes = minutes + (seconds >= 30 ? 1 : 0);

			if (totalMinutes === 60) {
				return "1 hr";
			} else {
				return `${totalMinutes} min`;
			}
		} else {
			return "";
		}
	}
	useEffect(() => {
		// Check if we are on the client side before accessing the window object.
		if (typeof window !== "undefined") {
			setScreenWidth(window.innerWidth);
		}

		// Add an event listener to update the screenWidth when the window is resized
		const handleResize = () => {
			setScreenWidth(window.innerWidth);
		};

		window.addEventListener("resize", handleResize);

		return () => {
			window.removeEventListener("resize", handleResize);
		};
	}, []);

	// if (screenWidth < 768) {
	//   imageWidth = 280;
	//   imageHeight = 220;
	// }
	// else {
	// imageWidth = 300
	// imageHeight = 180;

	// }

	if (screenWidth < 768) {
		imageWidth = 210;
		imageHeight = 280;
	} else {
		imageWidth = 270;
		imageHeight = 350;
	}

	if (!course) {
		return null;
	}

	const { title, courseMetadata, slug } = course;
	const pictureUrl =
		courseMetadata?.courseThumbnailPicture?.mediaItemUrl || "/placeholder.png";
	const durationOfCourse = courseMetadata?.courseDuration || "";

	// const mainEducatorHandle = courseMetadata?.maineducatorinstahandl || "";
	const educators = (courseMetadata?.educators || []).map(
		(educator: Educator) => educator?.educatorMetaData?.instahandle || ""
	);
	const noOfTestimonials = courseMetadata?.noOfTestimonials || 0;
	const avgRating = courseMetadata?.averageRating || 0;
	const price = courseMetadata?.price?.toString() ?? "";
	const isCourseFree = price === "0";

	// DEPRECATED Oct 2 - Calculate the average rating from testimonials
	// const testimonials = courseMetadata?.courseTestimonialsNew || [];
	// const averageRating = testimonials.length > 0
	//   ? testimonials.reduce((sum, testimonial) => sum + testimonial.testimonialMetadata.rating, 0) / testimonials.length
	//   : 0;
	// let adjustedAverageRating = (averageRating / 100) * 5 || 5;
	// DEPRECATED Oct 2 - Get total number of reviews
	// const amountOfReviews = courseMetadata.courseTestimonialsNew?.length || 0
	// Star color
	const customColor = "#523D34";

	return (
		<div
			className={`${
				variant2 ? "w-auto" : `flex  w-${imageWidth}`
			}  rounded-xl border border-border shadow-lg`}
		>
			{/* <div style={{ position: 'relative', width: `${imageWidth}px`, height: 'auto', display: 'flex' }}> */}

			<Link href={`/courses/${slug}`}>
				<div className="relative">
					{/* to do: checkmark & Overlay, will only appear if the user has completed the course. */}
					{completed && (
						<div
							style={{
								position: "absolute",
								top: "0",
								left: "0",
								width: "100%",
								height: "100%",
								backgroundColor: "rgba(255, 255, 255, 0.7)", // White with 70% opacity
								zIndex: "2", // Ensure it's above the image
							}}
						></div>
					)}

					{durationOfCourse !== "" && (
						<div className={`absolute top-2 right-2 z-1`}>
							<DurationText
								text={convertTimeToHoursMinutes(durationOfCourse)}
								color="white"
							/>
						</div>
					)}

					<div
						style={{
							width: `${variant2 ? "auto" : `${imageWidth}`}`,
							height: `${imageHeight}px`,
						}}
					>
						<Image
							src={pictureUrl}
							alt={slug}
							width={imageWidth}
							height={imageHeight}
							className="w-full h-full object-cover rounded-t-xl"
						/>
						{!variant2 && (
							<div className="absolute bottom-0 left-0 w-full h-1/4 bg-gradient-to-b from-transparent to-white"></div>
						)}
					</div>

					{/* to do: this should only be there if the course is free and also show to people who are either not signed in or signed in with a free account. */}
					{(!isFree.isLoggedIn || !isFree.userIsCurrentlySubscribed) &&
						isCourseFree && <FreeText price="FREE" />}
					{/* {isCourseFree && <FreeText price="FREE" />} */}
					{/* to do: checkmark & Overlay, will only appear if the user has completed the course. */}
					{completed && (
						<div>
							<div
								style={{
									position: "absolute",
									top: "0",
									left: "0",
									width: "100%",
									height: "100%",
									backgroundColor: "rgba(255, 255, 255, 0.7)", // White with 70% opacity
									zIndex: "2", // Ensure it's above the image
								}}
							></div>
							<div
								style={{
									zIndex: "3",
									position: "absolute",
									top: "50%",
									left: "50%",
									transform: "translate(-50%, -50%)",
									width: "58px",
									height: "58px",
									borderRadius: "50%",
									borderColor: "white",
									backgroundColor: "white", // Set background color to white
									display: "flex",
									alignItems: "center",
									justifyContent: "center",
								}}
							>
								<Checkmark fill={"#C4A18D"} width={40} height={40} />
							</div>
						</div>
					)}
				</div>
				<div style={{ width: `${imageWidth}px`, height: "auto" }}>
					<div className="p-4">
						<div className="flex  pt-1 pr-1">
							{noOfTestimonials > 5 && avgRating > 4 && (
								<Rating
									name="half-rating-read"
									defaultValue={avgRating}
									precision={0.5}
									readOnly
									style={{ color: customColor }}
									size="small"
								/>
							)}
							{noOfTestimonials > 5 && avgRating > 4 && (
								<div className="flex pl-[4px] items-center">
									<ParagraphText text="(" className="text-themeColor " />
									<ParagraphText
										text={noOfTestimonials.toString()}
										className="text-themeColor underline"
									/>
									<ParagraphText text=")" className="text-themeColor " />
								</div>
							)}
						</div>
						<div className="pr-1">
							{/* <div className='text-[14px] text-[#523D34] font-bold'>
                {title}
</div> */}
							<CourseTitle text={title} />
						</div>
						{course.courseMetadata?.courseHeroDescription ? (
							<div className="line-clamp-3">
								<ParagraphSmall
									text={course.courseMetadata.courseHeroDescription}
									className="text-themeColor"
								/>
							</div>
						) : null}

						{/* <div className='text-[12px] text-grey-400  '>
              {educators.join(', ')}
            </div> */}

						<div style={{ width: `${imageWidth}px`, height: "auto" }}>
							<div
								className="truncate pr-1"
								style={{
									whiteSpace: "nowrap",
									overflow: "hidden",
									textOverflow: "ellipsis",
								}}
							>
								{educators.length > 0 && (
									<div className="pr-4">
										<EducatorsName text={educators.join(", ")} />
									</div>
								)}
							</div>
						</div>
					</div>
				</div>
			</Link>
		</div>
	);
};

export default CourseCard;
