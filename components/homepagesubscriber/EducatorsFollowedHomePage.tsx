import React from 'react';
import RecentlyReleased from '@/components/RecentlyReleased';
import { UserSession } from '@/interfaces';
import { getCurrentUserDataAccessedCoursesBasic, getCurrentUserDataAccessedCoursesForYoutubeCourses, getCurrentUserDataLikedEducatorsForEducatorCards, getRecentCourses } from '@/app/helper';
import CoursesStarted from '../CoursesStarted';
import CoursesFromEducatorsYouFollow from '../CoursesFromEducatorsYouFollow';
import SH1Text from '../text/SH1Text';
import EducatorsYouFollow from '../EducatorsYourFollow';
import ParagraphText from '../text/Paragraph';
import InputTextBold from '../text/InputTextBold';
import Link from 'next/link';

interface EducatorsFollowedHomePageHomePageProps {
    user: UserSession | null;
}

const EducatorsFollowedHomePage: React.FC<EducatorsFollowedHomePageHomePageProps> = async ({ user }) => {

    const userDataEducatorsYouFollowPromise = getCurrentUserDataLikedEducatorsForEducatorCards(user?.userDataId || 0);
    const userDataEducatorsYouFollow = await userDataEducatorsYouFollowPromise;
    const educatorsYouFollow = userDataEducatorsYouFollow?.userDataMetadata?.likededucators || [];

    return (
        <div>
            {educatorsYouFollow.length > 0 && (
                <div className="container">
                    <div className="">
                        <SH1Text text={`Saved Educators`} />
                        <div className="space-under-category-titles" />
                        <EducatorsYouFollow educatorsYouFollow={educatorsYouFollow} />
                    </div>
                </div>
            )}

            {educatorsYouFollow.length < 1 && (
                      <div className="container">
                    <div className="">
                        <SH1Text text={`Saved Educators`} />
                        <div className="space-under-category-titles" />

                        <Link href={'/all-educators'}>
                            <div className='flex flex-wrap'>
                                <ParagraphText
                                    text="You haven't saved any educators yet.&nbsp;"
                                />
                                <ParagraphText
                                    text="Check them all out here!"
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

export default EducatorsFollowedHomePage;