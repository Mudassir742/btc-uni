import React, { useState } from 'react'
import { getRequestCookie } from '../auth/getAuthCookie'
import { cookies } from 'next/headers';
import { getCurrentUserDataPurchasedSubscriptions } from '@/app/courses/helper';
import { Course, Educator, UserSession } from '@/interfaces';
import { checkSubIsValidSubscriptionObject } from '@/utils/subValidation';
import { SEARCH_QUERY_COURSES, SEARCH_QUERY_EDUCATORS } from '@/graphql/queries';
import { generateWpPageError } from '@/utils/wpErrorHandling';
import { getProfile } from '@/features/wp/user';
import { transformDataForWpUrl } from '@/utils/url';
import MainHeaderClient from './MainHeaderClient'

const MainHeader = async ({ className }: { className?: string }) => {


  const userProm = getRequestCookie(cookies());
  const user = await userProm;

  // get full UserData object
  const userDataPromise = getCurrentUserDataPurchasedSubscriptions(user?.userDataId || 0);
  // const currentUserData = await userDataPromise;
  const [currentUserData, userAdditionalData, getTheSearchEducators, getTheSearchCourses] = await Promise.all([userDataPromise, getProfile(user?.userData?.databaseId || 0), getSearchEducators(), getSearchCourses()])
  const loggedIn = user?.isLoggedIn || false;

  const purchasedSubscriptions = currentUserData?.userDataMetadata?.purchasedsubscriptions || [];
  // Sorting the array in descending order based on the subscription start date
  purchasedSubscriptions.sort((a, b) => {
    const dateA = new Date(a.subscriptionMetadata.subscriptionstartson).getTime();
    const dateB = new Date(b.subscriptionMetadata.subscriptionstartson).getTime();
    return dateA - dateB;  // Ascending order
  });
  // Now the last element in the sorted array is the most recent subscription
  const lastSubscription = purchasedSubscriptions[purchasedSubscriptions.length - 1] || {};

  const userIsCurrentlySubscribed = await checkSubIsValidSubscriptionObject(lastSubscription);

  return (
    <div className={'wrapper py-4 relative z-20 bg-white' + className}>
      <MainHeaderClient
        courses={getTheSearchCourses}
        currentUserData={currentUserData}
        userAdditionalData={userAdditionalData}
        educators={getTheSearchEducators}
        user={user}
        userIsCurrentlySubscribed={userIsCurrentlySubscribed}
        themecolor='#523D34'
      />
    </div>
  )
}

export default MainHeader
async function getSearchCourses(): Promise<Course[]> {
  const allCourses = await fetchAllCourses(null, []);
  return allCourses;
}

async function getSearchEducators(): Promise<Educator[]> {
  const allEducators = await fetchAllEducators(null, []);
  return allEducators;
}

async function fetchAllCourses(
  afterCursor: string | null,
  allCourses: Course[]
): Promise<Course[]> {
  const response = await fetch(process.env.NEXT_PUBLIC_WORDPRESS_API_URL!, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
    },
    next: {
      revalidate: 600
    },
    body: JSON.stringify({
      query: SEARCH_QUERY_COURSES.loc?.source.body,
      variables: { after: afterCursor },
    }),
  });

  const { data, errors } = await response.json();

  if (errors) {
    throw generateWpPageError(errors)
  }

  const { pageInfo, nodes } = data.courses;
  const updatedAllCourses = [...allCourses, ...nodes];

  if (pageInfo.hasNextPage) {
    return fetchAllCourses(pageInfo.endCursor, updatedAllCourses);
  }

  return transformDataForWpUrl(updatedAllCourses);
}

async function fetchAllEducators(
  afterCursor: string | null,
  allEducators: Educator[]
): Promise<Educator[]> {
  const response = await fetch(process.env.NEXT_PUBLIC_WORDPRESS_API_URL!, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
    },
    next: {
      revalidate: 600
    },
    body: JSON.stringify({
      query: SEARCH_QUERY_EDUCATORS.loc?.source.body,
      variables: { after: afterCursor },
    }),
  });

  const { data, errors } = await response.json();

  if (errors) {
    throw generateWpPageError(errors)
  }

  const { pageInfo, nodes } = data.educators;
  const updatedAllEducators = [...allEducators, ...nodes];

  if (pageInfo.hasNextPage) {
    return fetchAllEducators(pageInfo.endCursor, updatedAllEducators);
  }

  return transformDataForWpUrl(updatedAllEducators);
}