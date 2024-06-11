import React from 'react';
import FollowEducator from '@/components/FollowEducator';
import { UserSession } from '@/interfaces';
import PushPinOnEducatorPage from '@/components/icons/PushPinOnEducatorPage';
import { getCurrentUserDataLikedEducators, getEducatorAll } from '../helper';

interface EducatorSlugPushPinProps {
    params: { slug: string };
    user: UserSession | null;
}

const EducatorSlugPushPin: React.FC<EducatorSlugPushPinProps> = async ({ params, user }) => {

     const userDataId = user?.userDataId || 0;
     // check if user is logged in
     const isLoggedIn = userDataId > 0;

     const educatorAllProm = getEducatorAll(params);
 
     const userDataAllProm = getCurrentUserDataLikedEducators(user?.userDataId || 0);
 
     // fetch data in parallel
     const [
         educatorAll, 
         userDataAll
     ] = await Promise.all([
         educatorAllProm, 
         userDataAllProm]);
 
     const educatorID = educatorAll.databaseId;
 
     const likedCourses = userDataAll?.userDataMetadata?.likededucators || [];
 
     // whether or not the course is pinned
     const pinned = likedCourses.some((educator) => {
         const educatorId = educator.databaseId;
         return educatorId === educatorID;
     });

    return (
        <PushPinOnEducatorPage isPinned={pinned} userDataId={userDataId} educatorId={educatorID} isSignedIn={isLoggedIn} />
    );
}

export default EducatorSlugPushPin;