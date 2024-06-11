"use client";
import React, { useEffect, useState } from "react";
import CourseHighlightsCard from "@/components/CourseHighlightsCard";
import SH1Text from "./text/SH1Text";
import { client } from "../lib/apolloClient";
import { GET_ALL_COURSES } from "@/graphql/queries";
import SH2Text from "./text/SH2Text";
import { NewCourseHighlight } from "@/interfaces";
import CoursePageTitles from "./text/CoursePageTitles";
import H3Text from "./text/H3Text";
import H4Text from "./text/H4Text";

interface CourseHighlightsProps {
	courseHighlights: NewCourseHighlight[];
	canWatch: boolean;
	isPurchasableALaCarte: boolean;
	isPurchasableOnlyALaCarte: boolean;
	courseId: number;
	userDataBaseId: string;
}

const CourseHighlights: React.FC<CourseHighlightsProps> = ({
	courseHighlights,
	canWatch,
	isPurchasableALaCarte,
	isPurchasableOnlyALaCarte,
	courseId,
	userDataBaseId,
}) => {
	// const [courses, setCourses] = useState([]);

	// useEffect(() => {
	//   const fetchCourses = async () => {
	//     const response = await client.query({
	//       query: GET_ALL_COURSES
	//     })
	//     const fetchedCourses = response.data.courses.nodes.slice(0, 10);
	//     setCourses(fetchedCourses);
	//   };
	//   fetchCourses();
	// }, []);

	return (
		<div>
			<div>
				<div className="flex items-center slider-container md:px-0">
					<H4Text text="Course Highlights" />
				</div>

				<div className="space-under-category-titles" />
				<div className="flex overflow-x-auto space-x-4 slider-container md:px-0">
					{courseHighlights.map(
						(courseHighlight: NewCourseHighlight, index) => (
							<CourseHighlightsCard
								key={index}
								highlightDescription={
									courseHighlight?.highlightDescription || ""
								}
								videoId={courseHighlight?.videoId || ""}
								canWatch={canWatch}
								isPurchasableALaCarte={isPurchasableALaCarte}
								isPurchasableOnlyALaCarte={isPurchasableOnlyALaCarte}
								userDataBaseId={userDataBaseId}
								courseId={courseId}
							/>
						)
					)}
				</div>
			</div>
			<div className="space-between-categories" />
		</div>
	);
};
export default CourseHighlights;
