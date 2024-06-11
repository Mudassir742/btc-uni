import React from 'react';
import RecentlyReleased from '@/components/RecentlyReleased';
import { UserSession } from '@/interfaces';
import { getCurrentUserDataAccessedCoursesBasic, getCurrentUserDataAccessedCoursesForYoutubeCourses, getCurrentUserDataLikedCoursesForYoutubeCards, getRecentCourses } from '@/app/helper';
import CoursesStarted from '../CoursesStarted';
import CoursesYouBookmarked from '../CoursesYouBookmarked';
import SH1Text from '../text/SH1Text';
import ParagraphText from '../text/Paragraph';
import Link from 'next/link';

interface CoursesBookmarkedHomePageProps {
    themeColor: string;
    user: UserSession | null;
}

const CoursesBookmarkedHomePage: React.FC<CoursesBookmarkedHomePageProps> = async ({ user, themeColor }) => {

    const userDataCoursesYouBookmarkedPromise = getCurrentUserDataLikedCoursesForYoutubeCards(user?.userDataId || 0);
    const userDataAccessedCoursesPromise = getCurrentUserDataAccessedCoursesForYoutubeCourses(user?.userDataId || 0);
    const [userDataCoursesYouBookmarked, userDataAccessedCourses] = await Promise.all([userDataCoursesYouBookmarkedPromise, userDataAccessedCoursesPromise]);
    const coursesYouBookmarked = userDataCoursesYouBookmarked?.userDataMetadata?.likedCourses || [];
    const checkedAccessedCourses = userDataAccessedCourses ? userDataAccessedCourses : [];

    const unfinishedAccessedCourses = checkedAccessedCourses
        // Filter out courses that are started and finished
        .filter(accessedCourse => !(accessedCourse.isCompleted))

    const coursesStartedAndNotFinished = unfinishedAccessedCourses
        .map(accessedCourse => accessedCourse.accessedcoursemetadata.belongstocourse);


    return (
        <div>
            {coursesYouBookmarked.length > 0 && (
                <CoursesYouBookmarked
                    coursesYouBookmarked={coursesYouBookmarked}
                    userDataAccessedCourses={userDataAccessedCourses}
                    themeColor={themeColor}
                    userDataBaseId={(user?.userDataId || 0).toString()}
                />
            )}

            {coursesYouBookmarked.length < 1 && (
                <div className="container">
                    <div className="">
                        <SH1Text text={`Saved Courses`} />
                        <div className="space-under-category-titles" />
                        <Link href={'/'}>
                            <div className='flex flex-wrap'>
                                <ParagraphText
                                    text="You haven't saved any courses yet.&nbsp;"
                                />
                                <ParagraphText
                                    text="Get started with our favorite ones here!"
                                    className='underline text-themeColor'
                                />



                            </div>
                        </Link>

                    </div>
                </div>

            )}


        </div>
    );
}

export default CoursesBookmarkedHomePage;