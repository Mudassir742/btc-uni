'use client'

import { Downloadable, UserSession } from '@/interfaces';
import React from 'react';
import { getCourseDownloadables, getCourseBasics, getCourseSubscriptionData, getCurrentUserDataPurchasedBundles, getCurrentUserDataPurchasedCourses, getCurrentUserDataPurchasedSubscriptions, extractCourseDownloadables, extractCourseSubscriptionData, extractCourseBasics, today, getCourseAll, extractCourseAll, getCurrentUserDataForCourseSlugPageAll, getLikedCourses, getCurrentUserDataLikedCourses, getCourseID } from '../helper';
import { checkSubIsValidSubscriptionObject } from '@/utils/subValidation';
import PushPinOnCoursePage from '@/components/icons/PushPinOnCoursePage';
// import { useQuery } from '@apollo/client';
import { useQuery } from '@tanstack/react-query';
const themeColor = "#523D34";

interface CourseSlugPushPinProps {
    params: { slug: string };
    user: UserSession | null;
    // userToken?: string;
    // userDataID?: number;
}

const CourseSlugPushPin: React.FC<CourseSlugPushPinProps> = async ({ params, user }) => {

    const { data: courseID } = useQuery({
        queryKey: ['courseID', params],
        refetchOnMount: true,
        queryFn: async () => {
            const courseIDProm = getCourseID(params);
            const courseID = await courseIDProm as number
            return courseID
        },
    })

    const { data: userDataAll } = useQuery({
        queryKey: ['userDataAll'],
        refetchOnWindowFocus: false,
        queryFn: async () => {
            const userDataAllProm = getCurrentUserDataLikedCourses(user?.userDataId || 0);
            const userDataAll = await userDataAllProm
            return userDataAll
        }
    })


    const isLoggedIn = (user?.userDataId || 0) > 0;

    return (
        <>
            {
                (courseID && userDataAll) &&
                <PushPinOnCoursePage userDataAll={userDataAll} courseId={courseID} isSignedIn={isLoggedIn} userDataId={user?.userDataId} userToken={user?.authToken} />
            }
        </>
    );
}

export default CourseSlugPushPin;