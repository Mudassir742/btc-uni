"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import Checkmark from "./icons/Checkmark";
import SH2Text from "./text/SH2Text";
import SH4Text from "./text/SH4Text";
import Stars from "./icons/Stars";
import SH1Text from "./text/SH1Text";
import H2Text from "./text/H2Text";
import { Button } from "./ui/Button";
import CoursePageTitles from "./text/CoursePageTitles";
import CardHandleCourseCard from "@/components/text/CardHandleCourseCard";
import Herotext from "./text/Hero";
import ParagraphText from "./text/Paragraph";
import H3Text from "./text/H3Text";

interface ExitFlowSection1Props {
	courseName: string;
	educatorHandles: string[];
	image: string;
	hasMultipleEducators: boolean;
	onClassRatingChange: (rating: number) => void;
	onClassFeedbackChange: (feedback: string) => void;
	onEducatorRatingChange: (rating: number) => void;
	onEducatorFeedbackChange: (feedback: string) => void;
	onSelectedDifficultyChange: (difficulty: string) => void;
}

const ExitFlowSection1: React.FC<ExitFlowSection1Props> = ({
	image,
	courseName,
	educatorHandles,
	hasMultipleEducators,
	onClassRatingChange,
	onClassFeedbackChange,
	onEducatorRatingChange,
	onEducatorFeedbackChange,
	onSelectedDifficultyChange,
}) => {
	const [section, setSection] = useState(1);
	const [classStars, setClassStars] = useState([
		false,
		false,
		false,
		false,
		false,
	]);
	const [educatorStars, setEducatorStars] = useState([
		false,
		false,
		false,
		false,
		false,
	]);
	const [courseDifficulty, setCourseDifficulty] = useState("");
	const [selectedDifficulty, setSelectedDifficulty] = useState<string>("");
	const [educatorFeedback, setEducatorFeedback] = useState<string>("");
	const [courseContentStars, setCourseContentStars] = useState([
		false,
		false,
		false,
		false,
		false,
	]);
	const [courseContentFeedback, setCourseContentFeedback] =
		useState<string>("");
	const [classFeedback, setClassFeedback] = useState<string>("");
	const [classFeedbackVisible, setClassFeedbackVisible] = useState(false);
	const [classPlaceholder, setClassPlaceholder] = useState<string>("");
	const [classPlaceholderVisible, setClassPlaceholderVisible] = useState(false);
	const [EducatorPlaceholder, setEducatorPlaceholder] = useState<string>("");
	const [educatorFeedbackVisible, setEducatorFeedbackVisible] = useState(false);
	const [educatorPlaceholderVisible, setEducatorPlaceholderVisible] =
		useState(false);
	const [courseContentFeedbackVisible, setCourseContentFeedbackVisible] =
		useState(false);
	const [courseContentPlaceholderVisible, setCourseContentPlaceholderVisible] =
		useState(false);
	const [classFeedbackText, setClassFeedbackText] = useState<string>(""); // Feedback text for class
	const [educatorFeedbackText, setEducatorFeedbackText] = useState<string>(""); // Feedback text for educator
	const [courseContentFeedbackText, setCourseContentFeedbackText] =
		useState<string>(""); // Feedback text for course content
	const [screenWidth, setScreenWidth] = useState(0);

	const [defaultValue, setDefaultValue] = useState("");

	let imageWidth = 172;
	let imageHeight = 229;
	let containerWidth = 326;

	const handleClassFeedbackChange = (
		event: React.ChangeEvent<HTMLTextAreaElement>
	) => {
		setClassFeedback(event.target.value);
		onClassFeedbackChange(event.target.value); // added for callback function jan 2
		// Calculate the number of rows based on the textarea's scrollHeight
		const textarea = event.target;
		textarea.rows = 2; // Reset to the initial number of rows (you can adjust this value)

		// Calculate the number of rows needed based on the scrollHeight and lineHeight
		const lineHeight = textarea.scrollHeight / textarea.rows;
		const newRows = Math.floor(textarea.scrollHeight / lineHeight);

		// Set the number of rows to match the calculated value
		textarea.rows = newRows;
	};

	const handleEducatorFeedbackChange = (
		event: React.ChangeEvent<HTMLTextAreaElement>
	) => {
		setEducatorFeedback(event.target.value);
		onEducatorFeedbackChange(event.target.value); // added for callback function jan 2

		// Calculate the number of rows based on the textarea's scrollHeight
		const textarea = event.target;
		textarea.rows = 2; // Reset to the initial number of rows (you can adjust this value)

		// Calculate the number of rows needed based on the scrollHeight and lineHeight
		const lineHeight = textarea.scrollHeight / textarea.rows;
		const newRows = Math.floor(textarea.scrollHeight / lineHeight);

		// Set the number of rows to match the calculated value
		textarea.rows = newRows;
	};

	const handleDifficultyClick = (difficulty: string) => {
		setSelectedDifficulty(difficulty);
		onSelectedDifficultyChange(difficulty); // added for callback function jan 2
	};
	let starCount;
	const handleStarClick = (
		index: number,
		setStars: React.Dispatch<React.SetStateAction<boolean[]>>,
		setFeedbackVisible: React.Dispatch<React.SetStateAction<boolean>>,
		setClassPlaceholderVisible: React.Dispatch<React.SetStateAction<boolean>>,
		setFeedback: React.Dispatch<React.SetStateAction<string>>,
		setPlaceholder: React.Dispatch<React.SetStateAction<string>>,
		feedbackType: string, // Add a parameter to identify feedback type
		placeholderType: string // Add a parameter to identify placeholder type
	) => {
		const newRating = index + 1; // added for callback function jan 2
		setStars((prevStars) => prevStars.map((_, i) => i <= index)); // added for callback function jan 2

		// Existing logic for setting feedback text and visibility...
		starCount = index + 1; // Convert index to star count (1-based)

		setStars((prevStars) => prevStars.map((_, i) => i <= index));

		// Determine the appropriate text and visibility based on the star count and feedback type
		let newFeedbackText = "";
		let newFeedbackVisible = false;
		let placeholderText = "";
		let placeholderVisible = false;
		if (starCount === 1) {
			newFeedbackText =
				feedbackType === "class"
					? "Sorry, what can we improve?"
					: "Sorry, what can we improve?";
			setDefaultValue("What can we improve?");
			newFeedbackVisible = true;
		} else if (starCount === 2) {
			newFeedbackText =
				feedbackType === "class"
					? "Sorry, what can we improve?"
					: "Sorry, what can we improve?";
			newFeedbackVisible = true;
			setDefaultValue("What can we improve?");
		} else if (starCount === 3) {
			newFeedbackText =
				feedbackType === "class"
					? "Sorry, what can we improve?"
					: "Sorry, what can we improve?";
			newFeedbackVisible = true;
			setDefaultValue("What can we improve?");
		} else if (starCount === 4) {
			newFeedbackText =
				feedbackType === "class" ? "What did you love?" : "What did you love?";
			newFeedbackVisible = true;
			setDefaultValue("I loved ");
		} else if (starCount === 5) {
			newFeedbackText =
				feedbackType === "class" ? "What did you love?" : "What did you love?";
			newFeedbackVisible = true;
			setDefaultValue("I loved ");
		}

		if (starCount < 4) {
			placeholderText =
				placeholderType === "class"
					? "What we can improve?"
					: "What we can improve?";
			placeholderVisible = true;
		} else {
			placeholderText =
				placeholderType === "class" ? "I loved..." : "I loved...";
			placeholderVisible = true;
		}
		setFeedback(newFeedbackText);
		setPlaceholder(placeholderText);
		// setClassPlaceholder(placeholderText);
		// setClassPlaceholder2(placeholderText);

		// Set the appropriate feedback text state based on feedback type
		if (feedbackType === "class") {
			setClassFeedbackText(newFeedbackText);
			setClassPlaceholder(placeholderText);
		} else if (feedbackType === "educator") {
			setEducatorFeedbackText(newFeedbackText);
			setEducatorPlaceholder(placeholderText);
		} else if (feedbackType === "courseContent") {
			setCourseContentFeedbackText(newFeedbackText);
			setClassPlaceholder(placeholderText);
		}

		// Set the visibility state variable based on the feedback type
		if (feedbackType === "class") {
			setClassFeedbackVisible(newFeedbackVisible);
			setClassPlaceholderVisible(placeholderVisible);
		} else if (feedbackType === "educator") {
			setEducatorFeedbackVisible(newFeedbackVisible);
			setEducatorPlaceholderVisible(placeholderVisible);
		} else if (feedbackType === "courseContent") {
			setCourseContentFeedbackVisible(newFeedbackVisible);
			setCourseContentPlaceholderVisible(placeholderVisible);
		}

		// Call the appropriate callback with the new rating
		// added for callback function jan 2
		if (feedbackType === "class") {
			onClassRatingChange(newRating);
		} else if (feedbackType === "educator") {
			onEducatorRatingChange(newRating);
		}
	};

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

	if (screenWidth < 768) {
		imageHeight = 175;
		imageWidth = 134;
		containerWidth = 326;
	} else {
		imageHeight = 266;
		imageWidth = 200;
		containerWidth = 200;
	}

	return (
		<div className="flex flex-col items-center justify-center scrollbar-none">
			<div className="relative ">
				<div className="flex items-center justify-center">
					<Image
						src={image || "/vertical-placeholder.png"}
						alt="Course Image"
						width={172}
						height={229}
					/>
				</div>
				<div className="absolute inset-0 flex items-center justify-center">
					<Checkmark fill="black" width={98} height={81} />
				</div>
			</div>
			<div className="justify-center">
				{/* <div className="flex justify-center">
          <SH2Text text="COMPLETED" />
        </div> */}
				<div className="space-under-category-titles" />
				<div className="flex justify-center text-center">
					<H3Text text={courseName} />
				</div>

				<div className="flex justify-center">
					{educatorHandles.length > 0 && (
						<CardHandleCourseCard
							text={educatorHandles.join(", ")}
							className="text-secondarythemecolor text-center whitespace-pre-line pr-1"
						/>
					)}
				</div>
				<div className="grey-line" />
			</div>

			{/* Rating for Class */}
			<div className="flex-wrap justify-center text-center break-words px-2">
				<Herotext text="Rate This Class" />
			</div>
			<div className="space-under-category-titles" />

			<div className="flex">
				{classStars.map((selected, index) => (
					<div
						onClick={() =>
							handleStarClick(
								index,
								setClassStars,
								setClassFeedbackVisible,
								setClassPlaceholderVisible,
								setClassFeedback,
								setClassPlaceholder,
								"class",
								"class"
							)
						}
						key={index}
					>
						<Stars
							fill={selected ? "#C4A18D" : "white"}
							stroke="black"
							width="24px"
							height="24px"
						/>
					</div>
				))}
			</div>

			<div className="w-full">
				{classFeedbackVisible && (
					<div>
						<div className="flex justify-center">
							<ParagraphText text={classFeedbackText} />
						</div>

						<textarea
							// ref={classFeedback}
							rows={2}
							className="w-full border border-border p-2 rounded-md focus:outline-none focus:border-blue-500 text-themeColor"
							placeholder={classPlaceholder}
							onChange={handleClassFeedbackChange}
						/>

						{/* <input
  type="text"
  placeholder="Start typing..."
  onChange={handleClassFeedbackChange}
  className="w-full h-auto  border rounded-xl min-h-[38px]" // Use w-full for full width and h-auto for automatic height
  
/> */}
					</div>
				)}
			</div>
			<div className="space-between-categories" />
			{/* Rating for Educator */}
			<div className="flex-wrap justify-center text-center break-words p-2">
				<Herotext
					text={
						hasMultipleEducators ? "Rate The Educators" : "Rate The Educator"
					}
				/>
			</div>

			<div className="space-under-category-titles" />
			<div className="flex">
				{educatorStars.map((selected, index) => (
					<div
						onClick={() =>
							handleStarClick(
								index,
								setEducatorStars,
								setEducatorFeedbackVisible,
								setEducatorPlaceholderVisible,
								setEducatorFeedback,
								setEducatorPlaceholder,
								"educator",
								"educator"
							)
						}
						key={index}
					>
						<Stars
							fill={selected ? "#C4A18D" : "white"}
							stroke="black"
							width="24px"
							height="24px"
						/>
					</div>
				))}
			</div>

			<div className="w-full">
				{educatorFeedbackVisible && (
					<div>
						<div className="flex justify-center">
							<ParagraphText text={educatorFeedbackText} />
						</div>
						<textarea
							rows={2}
							className="w-full border border-border p-2 rounded-md focus:outline-none focus:border-blue-500 text-themeColor resize-y"
							placeholder={EducatorPlaceholder}
							onChange={handleEducatorFeedbackChange}
						/>

						{/* <input
              type="text"
              placeholder="Start typing..."
              // value={educatorFeedback}
              onChange={handleEducatorFeedbackChange}
              className="w-full h-auto  border rounded-xl min-h-[38px]" // Use w-full for full width and h-auto for automatic height

            /> */}
					</div>
				)}
			</div>

			<div className="space-between-categories" />
			{/* Difficulty Level */}
			<div className="flex-wrap justify-center text-center break-words p-2">
				<Herotext
					className="whitespace-normal"
					text="What level of difficulty was this course?"
				/>
			</div>
			<div className="space-under-category-titles" />

			<div className="flex flex-wrap xs:flex-nowrap gap-4  justify-center">
				<Button
					className={`${
						selectedDifficulty === "Beginner"
							? "bg-themeColor text-white"
							: "bg-white text-themeColor"
					}`}
					onClick={() => handleDifficultyClick("Beginner")}
				>
					Beginner
				</Button>

				<Button
					className={`${
						selectedDifficulty === "Intermediate"
							? "bg-themecolor text-white"
							: "bg-white text-themeColor"
					}`}
					onClick={() => handleDifficultyClick("Intermediate")}
				>
					Intermediate
				</Button>

				<Button
					className={` ${
						selectedDifficulty === "Advanced"
							? "bg-themecolor text-white"
							: "bg-white text-themeColor"
					}`}
					onClick={() => handleDifficultyClick("Advanced")}
				>
					Advanced
				</Button>
			</div>

			<div></div>
		</div>
	);
};

export default ExitFlowSection1;
