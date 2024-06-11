// "use client"
// import React, { useEffect, useState } from 'react';
import SH1Text from "./text/SH1Text";
import { AccessedCourse, Course, Educator } from "@/interfaces";
import YouTubeVideoCard from "./YouTubeVideoCard";
import { hasUserCompletedCourse } from "@/app/courses/helper";

interface RecentlyReleasedProps {
	recentlyReleasedCourses: Course[];
	heroTitle: string;
	userDataAccessedCourses: AccessedCourse[];
	themeColor: string;
	background?: string;
	userDataBaseId: string;
	isSubscribed?: boolean;
}

const RecentlyReleased: React.FC<RecentlyReleasedProps> = ({
	background = "themecolor-50",
	heroTitle,
	recentlyReleasedCourses,
	userDataAccessedCourses,
	themeColor,
	userDataBaseId,
	isSubscribed,
}) => {
	return (
		<div className="pb-[32px]">
			<div className={`bg-${background}`}>
				<div className="py-[24px] md:py-[72px]">
					<div className="flex items-center slider-container">
						<SH1Text
							text={
								heroTitle ? `What's New In ${heroTitle}` : "What's New At BTC-U"
							}
							className="text-themeColor"
						/>
					</div>

					<div className="space-under-category-titles" />
					<div className="flex overflow-x-scroll custom-scrollbar  slider-container ">
						{/* <div className="flex overflow-y-hidden overflow-x-auto space-x-4 slider-container"> */}
						{recentlyReleasedCourses.map((course: Course) => (
							<YouTubeVideoCard
								key={course.slug}
								userDataBaseId={userDataBaseId}
								course={course}
								completed={hasUserCompletedCourse(
									course?.databaseId,
									userDataAccessedCourses
								)}
								themeColor={themeColor}
								educators={(course?.courseMetadata?.educators || []).map(
									(educator: Educator) =>
										educator?.educatorMetaData?.instahandle || ""
								)}
								backgroundColor="white"
								subscriber={isSubscribed}
							/>
						))}
					</div>
				</div>
			</div>
		</div>
	);
};

export default RecentlyReleased;
