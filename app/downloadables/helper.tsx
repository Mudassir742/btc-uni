import {
  GET_CATEGORIES_PAGE,
  GET_CATEGORY_PAGE_GENERAL_DATA_BASICS,
  GET_CATEGORY_PAGE_GENERAL_DATA_TIPS,
  GET_CATEGORY_PAGE_GENERAL_DATA_EDUCATORS,
  GET_CATEGORY_PAGE_GENERAL_DATA_SPOTLIGHT,
  GET_EDUCATOR_PAGE,
  GET_USERDATA_BY_DATABASE_ID,
  GET_CATEGORY_PAGE_GENERAL_DATA_DOWNLOADABLES,
  GET_CLIENT_LETTERS,
  GET_TEN_TIPS,
  GET_CATEGORY_PAGE_GENERAL_DATA_DOWNLOADABLES_TEN_TIPS,
  GET_CATEGORY_PAGE_GENERAL_DATA_DOWNLOADABLES_BUSINESS,
  GET_CATEGORY_PAGE_GENERAL_DATA_DOWNLOADABLES_SOCIAL_CLIMBING_SOCIAL_MEDIA,
  GET_CATEGORY_PAGE_GENERAL_DATA_METADATA,
} from "@/graphql/queries";
import {
  CategoriesPage,
  Course,
  Page,
  UserData,
  UserSession,
  CategoryPageBasics,
  CategoryPageTips,
  CategoryPageSpotlight,
  CategoryPageEducators,
  CategoryPageDownloadables,
  Downloadable,
  AccessedCourse,
  Tip,
  CategoryPageMetadata,
} from "@/interfaces";
import { generateWpPageError } from "@/utils/wpErrorHandling";
import { client } from "../../lib/apolloClient";
import { transformDataForWpUrl, transformWpUrl } from "@/utils/url";
import {
  GET_CONSULTATIONS_BUSINESS_COURSES,
  GET_INTERVIEW_BUSINESS_COURSES,
  GET_MGMT_BUSINESS_COURSES,
  GET_NEW_BUSINESS_COURSES,
  GET_RECESSION_BUSINESS_COURSES,
  GET_SERIES_SOCIAL_BUSINESS_COURSES,
  GET_SOCIAL_CLIMBING_BUSINESS_COURSES,
  GET_SOCIAL_MEDIA_BUSINESS_COURSES,
  GET_SOCIAL_MEDIA_PHOTOGRAPHY_BUSINESS_COURSES,
} from "@/graphql/queries/business";
import SH1Text from "@/components/text/SH1Text";
import CourseCard from "@/components/CourseCard";
import ActionButtonPDFs from "@/components/buttons/ActionButtonPDFs";
import {
  GET_USERDATA_ACCESSED_COURSES_BASIC_BY_DATABASE_ID,
  GET_USERDATA_PURCHASED_SUBSCRIPTIONS_BY_DATABASE_ID,
} from "@/graphql/queries/userData";
import H3Text from "@/components/text/H3Text";
import DownloadableCard from "@/components/DownloadableCard";

// ///////////////////
// Helper functions
// ///////////////////

// get user data

export async function getCurrentUserDataAccessedCoursesBasic(
  databaseId: number
): Promise<AccessedCourse[]> {
  const response = await fetch(process.env.NEXT_PUBLIC_WORDPRESS_API_URL!, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    next: {
      revalidate: 2,
    },
    // cache: "force-cache",
    body: JSON.stringify({
      query:
        GET_USERDATA_ACCESSED_COURSES_BASIC_BY_DATABASE_ID.loc?.source.body,
      variables: {
        id: `${databaseId}`,
      },
    }),
  });

  const { data, errors } = await response.json();

  if (errors) {
    throw generateWpPageError(errors);
  }

  const accessedCourses: AccessedCourse[] =
    data?.userData?.userDataMetadata?.accessedcourses || [];
  return transformDataForWpUrl(accessedCourses);
}

export async function getCurrentUserDataPurchasedSubscriptions(
  databaseId: number
): Promise<UserData> {
  const response = await fetch(process.env.NEXT_PUBLIC_WORDPRESS_API_URL!, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    // cache: "force-cache",
    // cache: "no-store",
    next: {
      revalidate: 2,
    },
    body: JSON.stringify({
      query:
        GET_USERDATA_PURCHASED_SUBSCRIPTIONS_BY_DATABASE_ID.loc?.source.body,
      variables: {
        id: `${databaseId}`,
      },
    }),
  });

  const { data, errors } = await response.json();

  if (errors) {
    throw generateWpPageError(errors);
  }

  const currentUserData: UserData = data?.userData || sampleUserData;
  return transformDataForWpUrl(currentUserData);
}

// get category page info

// export async function getCategoriesPage(): Promise<CategoriesPage> {
//   const response = await fetch(process.env.NEXT_PUBLIC_WORDPRESS_API_URL!, {
//       method: 'POST',
//       headers: {
//           'Content-Type': 'application/json',
//           'Accept': 'application/json',
//       },
//       // cache: "force-cache", // if we want to cache the data and if we remove the const const dynamic = "force-dynamic"; it will automatically cache
//       // or we could do:
//       cache: "no-store", // we have other options, like "no-store" / no-cache will revalidate the data, with no-store it's checking with each request if there are any changes
//       body: JSON.stringify({
//           query: GET_CATEGORIES_PAGE.loc?.source.body,
//       }),
//   });

//   const { data, errors } = await response.json();

//   if (errors) {
//       throw generateWpPageError(errors)
//   }

//   const page: CategoriesPage = data.page;
//   return transformDataForWpUrl(page);
// }

export async function getCategoryPageBasics(
  databaseId: string
): Promise<CategoryPageBasics> {
  const response = await fetch(process.env.NEXT_PUBLIC_WORDPRESS_API_URL!, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    next: {
      revalidate: 600,
    },
    // cache: "force-cache", // if we want to cache the data and if we remove the const const dynamic = "force-dynamic"; it will automatically cache
    // or we could do:
    // cache: "no-store", // we have other options, like "no-store" / no-cache will revalidate the data, with no-store it's checking with each request if there are any changes
    body: JSON.stringify({
      query: GET_CATEGORY_PAGE_GENERAL_DATA_BASICS.loc?.source.body,
      variables: {
        id: `${databaseId}`,
      },
    }),
  });

  const { data, errors } = await response.json();

  if (errors) {
    throw generateWpPageError(errors);
  }

  const page: CategoryPageBasics = data.page.categoryPage;
  return transformDataForWpUrl(page);
}

// mihai may 27 new function for querying category page metadata including metatile, metadescription and featured image
export async function getCategoryPageMetadata(): Promise<CategoryPageMetadata> {
  const response = await fetch(process.env.NEXT_PUBLIC_WORDPRESS_API_URL!, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    next: {
      revalidate: 600,
    },
    body: JSON.stringify({
      query: GET_CATEGORY_PAGE_GENERAL_DATA_METADATA.loc?.source.body,
      variables: {
        id: `828937`, // all downloadables page wp id
      },
    }),
  });

  const { data, errors } = await response.json();

  if (errors) {
    throw generateWpPageError(errors);
  }


  const page: CategoryPageMetadata = data.page;
  return transformDataForWpUrl(page);
}

export async function getCategoryPageDownloadables(
  databaseId: string
): Promise<CategoryPageDownloadables> {
  const response = await fetch(process.env.NEXT_PUBLIC_WORDPRESS_API_URL!, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    next: {
      revalidate: 600,
    },
    // cache: "force-cache", // if we want to cache the data and if we remove the const const dynamic = "force-dynamic"; it will automatically cache
    // or we could do:
    // cache: "no-store", // we have other options, like "no-store" / no-cache will revalidate the data, with no-store it's checking with each request if there are any changes
    body: JSON.stringify({
      query: GET_CATEGORY_PAGE_GENERAL_DATA_DOWNLOADABLES.loc?.source.body,
      variables: {
        id: `${databaseId}`,
      },
    }),
  });

  const { data, errors } = await response.json();

  if (errors) {
    throw generateWpPageError(errors);
  }

  const page: CategoryPageDownloadables = data.page.categoryPage;
  return transformDataForWpUrl(page);
}

export async function getCategoryPageDownloadablesTenTips(
  databaseId: string
): Promise<Downloadable[]> {
  const response = await fetch(process.env.NEXT_PUBLIC_WORDPRESS_API_URL!, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    next: {
      revalidate: 600,
    },
    // cache: "force-cache", // if we want to cache the data and if we remove the const const dynamic = "force-dynamic"; it will automatically cache
    // or we could do:
    // cache: "no-store", // we have other options, like "no-store" / no-cache will revalidate the data, with no-store it's checking with each request if there are any changes
    body: JSON.stringify({
      query:
        GET_CATEGORY_PAGE_GENERAL_DATA_DOWNLOADABLES_TEN_TIPS.loc?.source.body,
      variables: {
        id: `${databaseId}`,
      },
    }),
  });

  const { data, errors } = await response.json();

  if (errors) {
    throw generateWpPageError(errors);
  }

  const tipDownloadables: Downloadable[] =
    data?.page?.tenTipsInDownloadsPage?.tenDownloadableTips || [];
  return transformDataForWpUrl(tipDownloadables);
}

export async function getCategoryPageDownloadablesSocialClimbingSocialMedia(
  databaseId: string
): Promise<Downloadable[]> {
  const response = await fetch(process.env.NEXT_PUBLIC_WORDPRESS_API_URL!, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    next: {
      revalidate: 600,
    },
    // cache: "force-cache", // if we want to cache the data and if we remove the const const dynamic = "force-dynamic"; it will automatically cache
    // or we could do:
    // cache: "no-store", // we have other options, like "no-store" / no-cache will revalidate the data, with no-store it's checking with each request if there are any changes
    body: JSON.stringify({
      query:
        GET_CATEGORY_PAGE_GENERAL_DATA_DOWNLOADABLES_SOCIAL_CLIMBING_SOCIAL_MEDIA
          .loc?.source.body,
      variables: {
        id: `${databaseId}`,
      },
    }),
  });

  const { data, errors } = await response.json();

  if (errors) {
    throw generateWpPageError(errors);
  }

  const tipDownloadables: Downloadable[] =
    data?.page?.socialClimbingSocialMediaCombo
      ?.socialClimbingSocialMediaCombination || [];
  return transformDataForWpUrl(tipDownloadables);
}

export async function getCategoryPageDownloadablesBusinessWrongNameInWp(
  databaseId: string
): Promise<Downloadable[]> {
  const response = await fetch(process.env.NEXT_PUBLIC_WORDPRESS_API_URL!, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    next: {
      revalidate: 600,
    },
    // cache: "force-cache", // if we want to cache the data and if we remove the const const dynamic = "force-dynamic"; it will automatically cache
    // or we could do:
    // cache: "no-store", // we have other options, like "no-store" / no-cache will revalidate the data, with no-store it's checking with each request if there are any changes
    body: JSON.stringify({
      query:
        GET_CATEGORY_PAGE_GENERAL_DATA_DOWNLOADABLES_BUSINESS.loc?.source.body,
      variables: {
        id: `${databaseId}`,
      },
    }),
  });

  const { data, errors } = await response.json();

  if (errors) {
    throw generateWpPageError(errors);
  }

  // left tenTipsPage in wp (wrong name for some reason but its actually downloadables page section) to save time TO DO correct in the future
  const tipDownloadables: Downloadable[] =
    data?.page?.tenTipsPage?.businessDownloadsDownloadPageOnly || [];
  return transformDataForWpUrl(tipDownloadables);
}

export async function getCategoryPageTips(
  databaseId: string
): Promise<CategoryPageTips> {
  const response = await fetch(process.env.NEXT_PUBLIC_WORDPRESS_API_URL!, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    next: {
      revalidate: 600,
    },
    // cache: "force-cache", // if we want to cache the data and if we remove the const const dynamic = "force-dynamic"; it will automatically cache
    // or we could do:
    // cache: "no-store", // we have other options, like "no-store" / no-cache will revalidate the data, with no-store it's checking with each request if there are any changes
    body: JSON.stringify({
      query: GET_CATEGORY_PAGE_GENERAL_DATA_TIPS.loc?.source.body,
      variables: {
        id: `${databaseId}`,
      },
    }),
  });

  const { data, errors } = await response.json();

  if (errors) {
    throw generateWpPageError(errors);
  }

  const page: CategoryPageTips = data.page.categoryPage;
  return transformDataForWpUrl(page);
}

export async function getClientLetters(
  databaseId: string
): Promise<Downloadable[]> {
  const response = await fetch(process.env.NEXT_PUBLIC_WORDPRESS_API_URL!, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    next: {
      revalidate: 600,
    },
    // cache: "force-cache", // if we want to cache the data and if we remove the const const dynamic = "force-dynamic"; it will automatically cache
    // or we could do:
    // cache: "no-store", // we have other options, like "no-store" / no-cache will revalidate the data, with no-store it's checking with each request if there are any changes
    body: JSON.stringify({
      query: GET_CLIENT_LETTERS.loc?.source.body,
      variables: {
        id: `${databaseId}`,
      },
    }),
  });

  const { data, errors } = await response.json();

  if (errors) {
    throw generateWpPageError(errors);
  }

  const clientLetters: Downloadable[] =
    data.page.clientLetterPage.clientLetters;
  return transformDataForWpUrl(clientLetters);
}

export async function getTenTips(databaseId: string): Promise<Tip[]> {
  const response = await fetch(process.env.NEXT_PUBLIC_WORDPRESS_API_URL!, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    next: {
      revalidate: 600,
    },
    // cache: "force-cache", // if we want to cache the data and if we remove the const const dynamic = "force-dynamic"; it will automatically cache
    // or we could do:
    // cache: "no-store", // we have other options, like "no-store" / no-cache will revalidate the data, with no-store it's checking with each request if there are any changes
    body: JSON.stringify({
      query: GET_TEN_TIPS.loc?.source.body,
      variables: {
        id: `${databaseId}`,
      },
    }),
  });

  const { data, errors } = await response.json();

  if (errors) {
    throw generateWpPageError(errors);
  }

  const tentTips: Tip[] = data.page.tenTipsPage.tenTips;
  return transformDataForWpUrl(tentTips);
}

export async function getCategoryPageSpotlight(
  databaseId: string
): Promise<CategoryPageSpotlight> {
  const response = await fetch(process.env.NEXT_PUBLIC_WORDPRESS_API_URL!, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    next: {
      revalidate: 600,
    },
    // cache: "force-cache", // if we want to cache the data and if we remove the const const dynamic = "force-dynamic"; it will automatically cache
    // or we could do:
    // cache: "no-store", // we have other options, like "no-store" / no-cache will revalidate the data, with no-store it's checking with each request if there are any changes
    body: JSON.stringify({
      query: GET_CATEGORY_PAGE_GENERAL_DATA_SPOTLIGHT.loc?.source.body,
      variables: {
        id: `${databaseId}`,
      },
    }),
  });

  const { data, errors } = await response.json();

  if (errors) {
    throw generateWpPageError(errors);
  }

  const page: CategoryPageSpotlight = data.page.categoryPage;
  return transformDataForWpUrl(page);
}

export async function getCategoryPageEducators(
  databaseId: string
): Promise<CategoryPageEducators> {
  const response = await fetch(process.env.NEXT_PUBLIC_WORDPRESS_API_URL!, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    next: {
      revalidate: 600,
    },
    // cache: "force-cache", // if we want to cache the data and if we remove the const const dynamic = "force-dynamic"; it will automatically cache
    // or we could do:
    // cache: "no-store", // we have other options, like "no-store" / no-cache will revalidate the data, with no-store it's checking with each request if there are any changes
    body: JSON.stringify({
      query: GET_CATEGORY_PAGE_GENERAL_DATA_EDUCATORS.loc?.source.body,
      variables: {
        id: `${databaseId}`,
      },
    }),
  });

  const { data, errors } = await response.json();

  if (errors) {
    throw generateWpPageError(errors);
  }

  const page: CategoryPageEducators = data.page.categoryPage;
  return transformDataForWpUrl(page);
}

// get category courses
export async function getNewBusinessCourses(): Promise<Course[]> {
  const response = await fetch(process.env.NEXT_PUBLIC_WORDPRESS_API_URL!, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    next: {
      revalidate: 600,
    },
    // cache: "force-cache", // if we want to cache the data and if we remove the const const dynamic = "force-dynamic"; it will automatically cache
    // or we could do:
    // cache: "no-store", // we have other options, like "no-store" / no-cache will revalidate the data, with no-store it's checking with each request if there are any changes
    body: JSON.stringify({
      query: GET_NEW_BUSINESS_COURSES.loc?.source.body,
    }),
  });

  const { data, errors } = await response.json();

  if (errors) {
    throw generateWpPageError(errors);
  }

  const courses: Course[] = data.page.businessCourses.newBusinessCourses;

  return transformDataForWpUrl(courses);
}
export async function getSeriesSocialBusinessCourses(): Promise<Course[]> {
  const response = await fetch(process.env.NEXT_PUBLIC_WORDPRESS_API_URL!, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    next: {
      revalidate: 600,
    },
    // cache: "force-cache", // if we want to cache the data and if we remove the const const dynamic = "force-dynamic"; it will automatically cache
    // or we could do:
    // cache: "no-store", // we have other options, like "no-store" / no-cache will revalidate the data, with no-store it's checking with each request if there are any changes
    body: JSON.stringify({
      query: GET_SERIES_SOCIAL_BUSINESS_COURSES.loc?.source.body,
    }),
  });

  const { data, errors } = await response.json();

  if (errors) {
    throw generateWpPageError(errors);
  }

  const courses: Course[] =
    data.page.businessCourses.seriesSocialMediaForHairdressers;

  return transformDataForWpUrl(courses);
}
export async function getConsultationsBusinessCourses(): Promise<Course[]> {
  const response = await fetch(process.env.NEXT_PUBLIC_WORDPRESS_API_URL!, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    next: {
      revalidate: 600,
    },
    // cache: "force-cache", // if we want to cache the data and if we remove the const const dynamic = "force-dynamic"; it will automatically cache
    // or we could do:
    // cache: "no-store", // we have other options, like "no-store" / no-cache will revalidate the data, with no-store it's checking with each request if there are any changes
    body: JSON.stringify({
      query: GET_CONSULTATIONS_BUSINESS_COURSES.loc?.source.body,
    }),
  });

  const { data, errors } = await response.json();

  if (errors) {
    throw generateWpPageError(errors);
  }

  const courses: Course[] = data.page.businessCourses.consultations;

  return transformDataForWpUrl(courses);
}
export async function getInterviewBusinessCourses(): Promise<Course[]> {
  const response = await fetch(process.env.NEXT_PUBLIC_WORDPRESS_API_URL!, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    next: {
      revalidate: 600,
    },
    // cache: "force-cache", // if we want to cache the data and if we remove the const const dynamic = "force-dynamic"; it will automatically cache
    // or we could do:
    // cache: "no-store", // we have other options, like "no-store" / no-cache will revalidate the data, with no-store it's checking with each request if there are any changes
    body: JSON.stringify({
      query: GET_INTERVIEW_BUSINESS_COURSES.loc?.source.body,
    }),
  });

  const { data, errors } = await response.json();

  if (errors) {
    throw generateWpPageError(errors);
  }

  const courses: Course[] = data.page.businessCourses.interviews;

  return transformDataForWpUrl(courses);
}
export async function getManagementBusinessCourses(): Promise<Course[]> {
  const response = await fetch(process.env.NEXT_PUBLIC_WORDPRESS_API_URL!, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    next: {
      revalidate: 600,
    },
    // cache: "force-cache", // if we want to cache the data and if we remove the const const dynamic = "force-dynamic"; it will automatically cache
    // or we could do:
    // cache: "no-store", // we have other options, like "no-store" / no-cache will revalidate the data, with no-store it's checking with each request if there are any changes
    body: JSON.stringify({
      query: GET_MGMT_BUSINESS_COURSES.loc?.source.body,
    }),
  });

  const { data, errors } = await response.json();

  if (errors) {
    throw generateWpPageError(errors);
  }

  const courses: Course[] = data.page.businessCourses.managementCulture;

  return transformDataForWpUrl(courses);
}
export async function getSocialMediaBusinessCourses(): Promise<Course[]> {
  const response = await fetch(process.env.NEXT_PUBLIC_WORDPRESS_API_URL!, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    next: {
      revalidate: 600,
    },
    // cache: "force-cache", // if we want to cache the data and if we remove the const const dynamic = "force-dynamic"; it will automatically cache
    // or we could do:
    // cache: "no-store", // we have other options, like "no-store" / no-cache will revalidate the data, with no-store it's checking with each request if there are any changes
    body: JSON.stringify({
      query: GET_SOCIAL_MEDIA_BUSINESS_COURSES.loc?.source.body,
    }),
  });

  const { data, errors } = await response.json();

  if (errors) {
    throw generateWpPageError(errors);
  }

  const courses: Course[] = data.page.businessCourses.socialMedia;

  return transformDataForWpUrl(courses);
}
export async function getRecessionBusinessCourses(): Promise<Course[]> {
  const response = await fetch(process.env.NEXT_PUBLIC_WORDPRESS_API_URL!, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    next: {
      revalidate: 600,
    },
    // cache: "force-cache", // if we want to cache the data and if we remove the const const dynamic = "force-dynamic"; it will automatically cache
    // or we could do:
    // cache: "no-store", // we have other options, like "no-store" / no-cache will revalidate the data, with no-store it's checking with each request if there are any changes
    body: JSON.stringify({
      query: GET_RECESSION_BUSINESS_COURSES.loc?.source.body,
    }),
  });

  const { data, errors } = await response.json();

  if (errors) {
    throw generateWpPageError(errors);
  }

  const courses: Course[] = data.page.businessCourses.recession;

  return transformDataForWpUrl(courses);
}
// Social Media Photography and Social Climbing (new by ren on dec 9)
export async function getSocialMediaPhotographyBusinessCourses(): Promise<
  Course[]
> {
  const response = await fetch(process.env.NEXT_PUBLIC_WORDPRESS_API_URL!, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    next: {
      revalidate: 600,
    },
    // cache: "force-cache", // if we want to cache the data and if we remove the const const dynamic = "force-dynamic"; it will automatically cache
    // or we could do:
    // cache: "no-store", // we have other options, like "no-store" / no-cache will revalidate the data, with no-store it's checking with each request if there are any changes
    body: JSON.stringify({
      query: GET_SOCIAL_MEDIA_PHOTOGRAPHY_BUSINESS_COURSES.loc?.source.body,
    }),
  });

  const { data, errors } = await response.json();

  if (errors) {
    throw generateWpPageError(errors);
  }

  const courses: Course[] = data.page.businessCourses.socialMediaPhotography;

  return transformDataForWpUrl(courses);
}
export async function getSocialClimbingBusinessCourses(): Promise<Course[]> {
  const response = await fetch(process.env.NEXT_PUBLIC_WORDPRESS_API_URL!, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    next: {
      revalidate: 600,
    },
    // cache: "force-cache", // if we want to cache the data and if we remove the const const dynamic = "force-dynamic"; it will automatically cache
    // or we could do:
    // cache: "no-store", // we have other options, like "no-store" / no-cache will revalidate the data, with no-store it's checking with each request if there are any changes
    body: JSON.stringify({
      query: GET_SOCIAL_CLIMBING_BUSINESS_COURSES.loc?.source.body,
    }),
  });

  const { data, errors } = await response.json();

  if (errors) {
    throw generateWpPageError(errors);
  }

  const courses: Course[] = data.page.businessCourses.socialClimbing;

  return transformDataForWpUrl(courses);
}

// below function depecated as courses will be manually added to each category page
// filter recent courses and sort them first by importance, then by date

// export function filterAndSortCourses(courses: Course[]): Course[] {
//   const ninetyDaysAgo: Date = new Date();
//   ninetyDaysAgo.setDate(ninetyDaysAgo.getDate() - 90);

//   const filteredAndSortedCourses: Course[] = courses
//     .filter((course: Course) => {
//       const courseDate: Date = new Date(course.date);
//       return courseDate >= ninetyDaysAgo;
//     })
//     .sort((courseA: Course, courseB: Course) => {
//       const importanceA: number = courseA.courseMetadata?.courseImportance || 9999; // if no course importance number added, it will give it a very large number so it goes to the end of the list
//       const importanceB: number = courseB.courseMetadata?.courseImportance || 9999;
//       const dateA: Date = new Date(courseA.date);
//       const dateB: Date = new Date(courseB.date);

//       // Sort by courseImportance (ascending) and then by date (descending)
//       if (importanceA === importanceB) {
//         return dateB.getTime() - dateA.getTime(); // Sort by date (descending)
//       } else {
//         return importanceA - importanceB; // Sort by courseImportance (ascending)
//       }
//     });

//   return filteredAndSortedCourses;
// }

// ///////////////////
// Constants
// ///////////////////

// pre-defined user data to fall back to when user is not registered (i.e. userDataDatabaseId is 0)
export const sampleUserData: UserData = {
  title: "Unregistered User",
  databaseId: 0,
  userDataMetadata: {
    fullname: "Unregistered User",
    firstname: "Unregistered",
    lastname: "User",
    emailaddress: "",
    accessedcourses: [],
    purchasedcourses: [],
    purchasedbundless: [],
    purchasedsubscriptions: [],
    likedCourses: [],
    likedBundles: [],
    likededucators: [],
    zipcode: "",
    city: "",
    country: "",
    state: "",
    userid: ""
  },
};

// default trailer start time (promos always start from beginning)
export const trailerStartTime = 0;
// default theme color
export const themeColor = "#523D34";
// default fallback img
// export const fallbackImageSrc = transformWpUrl('https://cms.btcuniversity.com/wp-content/uploads/2023/10/trailer.png');
export const fallbackImageSrc =
  "https://cms.btcuniversity.com/wp-content/uploads/2023/10/trailer.png";

export let imageWidth = 700; // Default for mobile
export let imageHeight = 405; // Default for mobile

export let desktopImageWidth = 700; // Default for desktop
export let desktopImageHeight = 405; // Default for desktop

// Checking subscription expiration date
export const today = new Date(); // Get the current date

// TO DO AFTER LAUNCH: when we add sub tiers, replace purchasedsubscriptions[currentUserData.userDataMetadata.purchasedsubscriptions.length - 1] with more complex code, as users might purchase multiple subscriptions that are concurrently valid
// Calculate one day before today and one day after today
export const oneDayBeforeToday = new Date(today);
oneDayBeforeToday.setDate(today.getDate() - 1);
export const oneDayAfterToday = new Date(today);
oneDayAfterToday.setDate(today.getDate() + 1);

export const Section = ({
  title,
  cards,
}: {
  title: string;
  cards: JSX.Element[];
}) => (
  <div>
    <div className="slider-container">
      <SH1Text text={title} className="!text-themeColor" />
      <div className="space-under-category-titles" />
    </div>
    <div className="flex overflow-x-auto space-x-4 slider-container">
      {cards}
    </div>
    <div className="space-between-categories" />
  </div>
);

export const createCourseCards = (courses: Course[]) =>
  courses.map((course: Course) => (
    <CourseCard key={course.uri} course={course} />
  ));

// create cards for downloadables
// export const createActionCards = (downloadables: Downloadable[] = [], userDownloadableAccessLevel: string) => (downloadables ?? []).map(
//   (downloadable: Downloadable) => (
//     <ActionButtonPDFs
//       key={downloadable.databaseId}
//       text={downloadable?.title || ""}
//       link={downloadable?.downloadablemetadata?.downloadableFile?.mediaItemUrl || ""}
//       description={downloadable?.content || ""}
//       textColor={'black'}
//       borderColor={'black'}
//       // canDownload={userIsCurrentlySubscribed}
//       downloadableAccessLevel={downloadable?.downloadablemetadata?.accessLevel}
//       userDownloadableAccessLevel={userDownloadableAccessLevel}
//       isPurchasableALaCarte={false} // only needed for individual courses, not categories
//       isPurchasableOnlyALaCarte={false} // only needed for individual courses, not categories
//       downloadImage={downloadable?.downloadablemetadata?.downloadableImage?.mediaItemUrl || ""}
//       themecolor={themeColor}
//     />
//   )
// );
// above deprecared by mihai on feb 7 2024 and replaced with link action cards that take to the downloadables page
export const createActionCards = (downloadables: Downloadable[] = []) =>
  (downloadables ?? []).map((downloadable: Downloadable) => (
    <DownloadableCard
      key={downloadable.databaseId}
      slug={downloadable.slug}
      text={downloadable?.title || ""}
      link={
        downloadable?.downloadablemetadata?.downloadableFile?.mediaItemUrl || ""
      }
      description={downloadable?.content || ""}
      // canDownload={userIsCurrentlySubscribed}
      downloadImage={
        downloadable?.downloadablemetadata?.downloadableImage?.mediaItemUrl ||
        ""
      }
      accessLevel={downloadable.downloadablemetadata.accessLevel}
      themecolor={themeColor}
    />
  ));