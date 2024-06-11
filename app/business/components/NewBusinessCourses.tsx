import React from "react";
import {
	getCurrentUserDataAccessedCoursesBasic,
	getNewBusinessCourses,
	themeColor,
} from "../helper";
import RecentlyReleased from "@/components/RecentlyReleased";
import { UserSession } from "@/interfaces";

interface NewBusinessCoursesProps {
	heroTitle: string;
	user: UserSession | null;
}

const NewBusinessCourses: React.FC<NewBusinessCoursesProps> = async ({
	heroTitle,
	user,
}) => {
	const newBUSNCoursesPromise = getNewBusinessCourses();
	const userDataAccessedCoursesPromise = getCurrentUserDataAccessedCoursesBasic(
		user?.userDataId || 0
	);
	const [newBUSNCourses, userDataAccessedCourses] = await Promise.all([
		newBUSNCoursesPromise,
		userDataAccessedCoursesPromise,
	]);

	const businessCourses = newBUSNCourses ? newBUSNCourses : [];

	return (
		<div>
			{businessCourses.length > 0 && (
				<RecentlyReleased
					userDataBaseId={(user?.userDataId || 0).toString()}
					recentlyReleasedCourses={businessCourses}
					heroTitle={heroTitle}
					userDataAccessedCourses={userDataAccessedCourses}
					themeColor={themeColor}
				/>
			)}
		</div>
	);
};

export default NewBusinessCourses;
