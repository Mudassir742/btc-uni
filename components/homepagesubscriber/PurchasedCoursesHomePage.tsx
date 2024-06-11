import React from 'react';
import RecentlyReleased from '@/components/RecentlyReleased';
import { UserSession } from '@/interfaces';
import { getCurrentUserDataAccessedCoursesBasic, getCurrentUserDataAccessedCoursesForYoutubeCourses, getCurrentUserDataPurchasedBundleCoursesForYoutubeCourses, getCurrentUserDataPurchasedCoursesForYoutubeCourses, getRecentCourses } from '@/app/helper';
import CoursesStarted from '../CoursesStarted';
import PurchasedCourses from '../PurchasedCourses';

interface PurchasedCoursesHomePageProps {
    themeColor: string;
    user: UserSession | null;
}

const PurchasedCoursesHomePage: React.FC<PurchasedCoursesHomePageProps> = async ({ user, themeColor }) => {

    const userDataPurchasedCoursesPromise = getCurrentUserDataPurchasedCoursesForYoutubeCourses(user?.userDataId || 0);
    const userDataPurchasedBundleCoursesPromise = getCurrentUserDataPurchasedBundleCoursesForYoutubeCourses(user?.userDataId || 0);
    const userDataAccessedCoursesPromise = getCurrentUserDataAccessedCoursesForYoutubeCourses(user?.userDataId || 0);
    const [userDataPurchasedCourses, userDataPurchasedBundleCourses, userDataAccessedCourses] = await Promise.all([userDataPurchasedCoursesPromise, userDataPurchasedBundleCoursesPromise, userDataAccessedCoursesPromise]);
    
    const checkedPurchasedCourses = userDataPurchasedCourses ? userDataPurchasedCourses : [];
    const checkedPurchasedBundleCourses = userDataPurchasedBundleCourses ? userDataPurchasedBundleCourses : [];
    const checkedAccessedCourses = userDataAccessedCourses ? userDataAccessedCourses : [];

    // Combine the purchased courses and courses within purchases bundles
    // const combinedCourses = checkedPurchasedCourses.concat(checkedPurchasedBundleCourses);
    const combinedCourses = [...checkedPurchasedCourses, ...checkedPurchasedBundleCourses];

    // Filter out duplicates
    const uniqueCombinedCourses = combinedCourses.filter((course, index, self) => 
        self.findIndex(c => c.databaseId === course.databaseId) === index
    );


    return (
        <div>
            {uniqueCombinedCourses.length > 0 && (
                <PurchasedCourses 
                    purchasedCourses={uniqueCombinedCourses} 
                    userDataAccessedCourses={checkedAccessedCourses} 
                    themeColor={themeColor}
                    userDataBaseId={(user?.userDataId || 0).toString()}
                />
            )}
        </div>
    );
}

export default PurchasedCoursesHomePage;