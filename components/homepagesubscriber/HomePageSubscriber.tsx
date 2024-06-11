import React from 'react';
import { Suspense } from "react";
import { Skeleton } from "@/components/ui/Skeleton";
import { UserSession } from '@/interfaces';

interface HomePageSubscriberProps {
  // heroTitle: string;
  themeColor: string;
  user: UserSession | null;
  // signedIn: boolean;
  // firstname: string;
  // upcomingCourses: Course[];
  // recentlyReleasedCourses: Course[];
  // userDataAccessedCourses: AccessedCourse[];
  // coursesStartedAndNotFinished: Course[];
  // recommendedCourses: Course[];
  // coursesFromEducatorsYouFollow: Course[];
  // educatorsYouFollow: Educator[];
  // coursesYouBookmarked: Course[];
}
 
const HomePageSubscriber: React.FC<HomePageSubscriberProps> = ({
  // heroTitle,
  themeColor,
  user
  // firstname, 
  // signedIn, 
  // upcomingCourses, 
  // recentlyReleasedCourses, 
  // userDataAccessedCourses,
  // coursesStartedAndNotFinished,
  // recommendedCourses,
  // coursesFromEducatorsYouFollow,
  // educatorsYouFollow,
  // coursesYouBookmarked,
}) => {

  const signedIn = (user?.userDataId || 0) > 0;

  return (
    <div>
      {signedIn &&
        <Suspense fallback={<div className="w-full flex flex-col gap-y-6">
          <Skeleton className="h-14" />
          <Skeleton className="h-14" />
          <Skeleton className="h-14" />
        </div>}>
        
        </Suspense>
      }
      {/* <Upcoming upcomingCourses={upcomingCourses} /> */}
    </div>
  );
};

export default HomePageSubscriber;
