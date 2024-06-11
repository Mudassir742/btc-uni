import React from 'react';
import RecentlyReleased from '@/components/RecentlyReleased';
import { UserSession } from '@/interfaces';
import { getCurrentUserDataAccessedCoursesBasic, getCurrentUserDataAccessedCoursesForYoutubeCourses, getCurrentUserDataLikedEducatorsForEducatorCards, getRecentCourses } from '@/app/helper';
import CoursesStarted from '../CoursesStarted';
import CoursesFromEducatorsYouFollow from '../CoursesFromEducatorsYouFollow';
import SH1Text from '../text/SH1Text';
import ParagraphText from '../text/Paragraph';
import Link from 'next/link';

interface CoursesFromEducatorsFollowedHomePageProps {
    themeColor: string;
    user: UserSession | null;
}

const CoursesFromEducatorsFollowedHomePage: React.FC<CoursesFromEducatorsFollowedHomePageProps> = async ({ user, themeColor }) => {

    const userDataEducatorsYouFollowPromise = getCurrentUserDataLikedEducatorsForEducatorCards(user?.userDataId || 0);
    const userDataAccessedCoursesPromise = getCurrentUserDataAccessedCoursesForYoutubeCourses(user?.userDataId || 0);
    const [userDataEducatorsYouFollow, userDataAccessedCourses] = await Promise.all([userDataEducatorsYouFollowPromise, userDataAccessedCoursesPromise]);
    const checkedAccessedCourses = userDataAccessedCourses ? userDataAccessedCourses : [];
    const educatorsYouFollow = userDataEducatorsYouFollow?.userDataMetadata?.likededucators || [];
    const coursesFromEducatorsYouFollow = educatorsYouFollow.flatMap(educator => educator.educatorMetaData.courses);
    const checkedCoursesFromEducatorsYouFollow = coursesFromEducatorsYouFollow ? coursesFromEducatorsYouFollow : [];

    return (
        <div>
            {checkedCoursesFromEducatorsYouFollow.length > 0 && (
                <CoursesFromEducatorsYouFollow
                    coursesFromEducatorsYouFollow={checkedCoursesFromEducatorsYouFollow}
                    userDataAccessedCourses={checkedAccessedCourses}
                    themeColor={themeColor}
                    userDataBaseId={(user?.userDataId || 0).toString()}
                />
            )}

            {checkedCoursesFromEducatorsYouFollow.length < 1 && (
                <div className='slider-container'>

                    <SH1Text text={`Courses From Your Saved Educators`} />
                    <div className="space-under-category-titles" /> 
                    <Link href={'/all-educators'}>
                        <div className='flex flex-wrap'>
                            <ParagraphText
                                text="Start saving educators to stay in the loop on your favorite educators' courses."
                            />
                            {/* <ParagraphText
                                text="Check them all out here!"
                                className='underline text-themeColor'
                            /> */}



                        </div>
                      
                    </Link>
                    <div className='space-between-categories' />
</div>

            )}

        </div>
    );
}

export default CoursesFromEducatorsFollowedHomePage;