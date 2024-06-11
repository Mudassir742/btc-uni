import {
  GET_ALL_UPCOMING_COURSES,
  GET_COURSE_BY_SLUG,
  GET_RANDOM_COURSES_BY_CATEGORY,
  GET_USERDATA_BY_DATABASE_ID,
  GET_RANDOM_COURSES_BY_TAG,
  GET_ALL_COURSES_SLUGS,
} from "@/graphql/queries";
import {
  GET_ALL_COURSES_SLUG,
  GET_ALL_COURSE_BUNDLES,
  GET_BRAND,
  GET_COURSE_BY_SLUG_ALL,
  GET_COURSE_BY_SLUG_BASICS,
  GET_COURSE_BY_SLUG_BASICS_AND_LEVEL,
  GET_COURSE_BY_SLUG_BEFORE_AND_AFTER,
  GET_COURSE_BY_SLUG_CATEGORIES,
  GET_COURSE_BY_SLUG_CHAPTERS,
  GET_COURSE_BY_SLUG_DESCRIPTION,
  GET_COURSE_BY_SLUG_DOWNLOADABLES,
  GET_COURSE_BY_SLUG_EDUCATORS_AND_THEIR_COURSES,
  GET_COURSE_BY_SLUG_EDUCATORS_BASIC,
  GET_COURSE_BY_SLUG_EXTRAS_COURSE_HERO,
  GET_COURSE_BY_SLUG_EXTRAS_COURSE_HERO_STICKY,
  GET_COURSE_BY_SLUG_HIGHLIGHTS,
  GET_COURSE_BY_SLUG_ID,
  GET_COURSE_BY_SLUG_METADATA,
  GET_COURSE_BY_SLUG_PART_OF_SERIES,
  GET_COURSE_BY_SLUG_RELATED_COURSES,
  GET_COURSE_BY_SLUG_SUBSCRIPTION_DATA,
  GET_COURSE_BY_SLUG_TAGS,
  GET_COURSE_BY_SLUG_TESTIMONIALS,
  GET_COURSE_BY_SLUG_USED_PRODUCTS,
  GET_COURSE_BY_SLUG_WHATS_INCLUDED,
  GET_COURSE_BY_SLUG_YOU_WILL_LEARN,
} from "@/graphql/queries/courseSlugPage";
import {
  GET_USERDATA_ACCESSED_COURSES_BASIC_BY_DATABASE_ID,
  GET_USERDATA_COURSE_SLUG_PAGE,
  GET_USERDATA_ACCESSED_COURSES_EXTENDED_COURSE_HERO_BY_DATABASE_ID,
  GET_USERDATA_LIKED_COURSES_BY_DATABASE_ID,
  GET_USERDATA_PURCHASED_BUNDLES_BY_DATABASE_ID,
  GET_USERDATA_PURCHASED_COURSES_BY_DATABASE_ID,
  GET_USERDATA_PURCHASED_SUBSCRIPTIONS_BY_DATABASE_ID,
  GET_USERDATA_FIRST_NAME_LAST_NAME_BY_DATABASE_ID,
  GET_USERDATA_ACCESSED_COURSES_FOR_YOUTUBECARDS_BY_DATABASE_ID,
  GET_USERDATA_LIKED_COURSES_FOR_YOUTUBECARDS_BY_DATABASE_ID,
  GET_USERDATA_LIKED_EDUCATORS_FOR_EDUCATORCARDS_BY_DATABASE_ID,
  // GET_USERDATA_TESTIMONIALS_COURSE_HERO_BY_DATABASE_ID
} from "@/graphql/queries/userData";
import {
  AccessedCourse,
  Category,
  Tag,
  Course,
  Testimonial,
  UserData,
  UserSession,
  CourseChapter,
  Brand,
} from "@/interfaces";
import { transformDataForWpUrl, transformWpUrl } from "@/utils/url";
import { generateWpPageError } from "@/utils/wpErrorHandling";

// export async function getCurrentUserData(databaseId: number): Promise<UserData> {
//     const response = await fetch(process.env.NEXT_PUBLIC_WORDPRESS_API_URL!, {
//         method: 'POST',
//         headers: {
//             'Content-Type': 'application/json',
//             'Accept': 'application/json',
//         },
//         next: {
//             revalidate: 2
//         },
//         // cache: "force-cache",
//         body: JSON.stringify({
//             query: GET_USERDATA_COURSE_SLUG_PAGE.loc?.source.body,
//             variables: {
//                 id: `${databaseId}`,
//             },
//         }),
//     });

//     const { data, errors } = await response.json();

//     if (errors) {
//         throw generateWpPageError(errors)
//     }

//     const currentUserData: UserData = data.userData;
//     return transformDataForWpUrl(currentUserData);
// }

// export const getCurrentUserDataIfExist = async (user: UserSession | null) => {

//     // check if the user is logged in
//     const isLoggedIn = (user?.userDataId || 0) > 0;

//     // fetch UserData object from server
//     // const currentUserData = await getCurrentUserData(userDataDatabaseId) || sampleUserData;
//     let currentUserData: UserData | null = null;
//     if (isLoggedIn) {
//         // fetch UserData object from server only if user is logged in
//         return currentUserData = await getCurrentUserData(user?.userDataId!);
//     } else {
//         // If the user is not logged in, set currentUserData to null or a default value
//         return currentUserData = sampleUserData;
//     }

// }

// this below is mandatory no-store for purchases
export async function getCurrentUserDataPurchasedSubscriptions(
  databaseId: number
): Promise<UserData> {
  const response = await fetch(process.env.NEXT_PUBLIC_WORDPRESS_API_URL!, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    // cache: "no-cache", // this was already no-cache on jan 2, just commented out empty next section
    next: {
      revalidate: 2,
    },
    // MAJOR UPDATE Jan 15 -- above works when loading the course slug page and doing the router refresh improv
    // cache: "no-store", // brough back on jan 3 as no-cache was causing weird issues
    // next: {

    // },
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

// this below is mandatory no-store for purchases
export async function getCurrentUserDataPurchasedCourses(
  databaseId: number
): Promise<UserData> {
  const response = await fetch(process.env.NEXT_PUBLIC_WORDPRESS_API_URL!, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    next: {
      revalidate: 2,
    }, // changed on Dec 30 to no-store as this needs to instantly update
    // MAJOR UPDATE Jan 15 -- above works when loading the course slug page and doing the router refresh improv
    // cache: "force-cache",
    // cache: "no-store",
    // cache: "no-cache", // changed from no-store on jan 2
    body: JSON.stringify({
      query: GET_USERDATA_PURCHASED_COURSES_BY_DATABASE_ID.loc?.source.body,
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

// this below is mandatory no-store for purchases
export async function getCurrentUserDataPurchasedBundles(
  databaseId: number
): Promise<UserData> {
  console.log(`User data id is ${databaseId}`);
  const response = await fetch(process.env.NEXT_PUBLIC_WORDPRESS_API_URL!, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    next: {
      revalidate: 2,
    }, // changed on Dec 30 to no-store as this needs to instantly update
    // MAJOR UPDATE Jan 15 -- above works when loading the collections slug page and doing the router refresh improv
    // cache: "force-cache",
    // cache: "no-store",
    // cache: "no-cache", // changed from no-store on jan 2
    // cache: "no-store", // brough back on jan 3 as no-cache was causing weird issues
    body: JSON.stringify({
      query: GET_USERDATA_PURCHASED_BUNDLES_BY_DATABASE_ID.loc?.source.body,
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

// this is for making related courses show which ones are completed
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
    // TO DO: this is for related courses -- i.e. making them show which ones are completed. probably no-store but for now will leave it as is on jan14 as we need speed for launch
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

// this below is only used in the home page, not in the course slug page
export async function getCurrentUserDataAccessedCoursesForYoutubeCourses(
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
        GET_USERDATA_ACCESSED_COURSES_FOR_YOUTUBECARDS_BY_DATABASE_ID.loc
          ?.source.body,
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

// this is used on the main course slug page -> CourseInfoServer -> courseinfo, removed from CoursHero -> video card on jan 14
export async function getCurrentUserDataLikedCourses(
  databaseId: number
): Promise<UserData> {
  // updated on jan 17 to fetch slugs and compare direcly in courseslugpushpin componet
  const response = await fetch(process.env.NEXT_PUBLIC_WORDPRESS_API_URL!, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    //   next:{
    //       revalidate: 2
    //   },
    // cache: "force-cache",
    cache: "no-store",
    // next: {
    //     revalidate: 3
    // },
    //   cache: "no-cache", // changed from no-store on jan 2
    // cache: "no-store", // brough back on jan 4 as revalidate:2 was taking too long on prod
    body: JSON.stringify({
      query: GET_USERDATA_LIKED_COURSES_BY_DATABASE_ID.loc?.source.body,
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

// TO DO: might already have what we need in getCurrentUserDataAccessedCoursesForYoutubeCourses. this is in home page only so TO DO when we optimize home page
// do a refresh on the home page to get these
export async function getCurrentUserDataLikedCoursesForYoutubeCards(
  databaseId: number
): Promise<UserData> {
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
    //   cache: "no-store",
    //   cache: "no-cache", // changed from no-store on jan 2
    // cache: "no-store", // brough back on jan 3 as no-cache was causing weird issues
    body: JSON.stringify({
      query:
        GET_USERDATA_LIKED_COURSES_FOR_YOUTUBECARDS_BY_DATABASE_ID.loc?.source
          .body,
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

// this is only on the home page
export async function getCurrentUserDataLikedEducatorsForEducatorCards(
  databaseId: number
): Promise<UserData> {
  const response = await fetch(process.env.NEXT_PUBLIC_WORDPRESS_API_URL!, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    //   next:{
    //       revalidate: 2
    //   },
    // cache: "force-cache",
    //   cache: "no-store",
    next: {
      revalidate: 3,
    },
    //   cache: "no-cache", // changed from no-store on jan 2
    // cache: "no-store", // brough back on jan 3 as no-cache was causing weird issues
    body: JSON.stringify({
      query:
        GET_USERDATA_LIKED_EDUCATORS_FOR_EDUCATORCARDS_BY_DATABASE_ID.loc
          ?.source.body,
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

// this is used for the notes in course hero -> videocard but also in courseinfoserver
// so this is also used to immediately check if user posted a testimonial by checking the hasposted bool in AccessedCourses and doesnt allow the user to post a 2nd testimonial if so
export async function getCurrentUserDataAccessedCoursesExtendedCourseHero(
  databaseId: number
): Promise<AccessedCourse[]> {
  const response = await fetch(process.env.NEXT_PUBLIC_WORDPRESS_API_URL!, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    // next: {
    //     revalidate: 1
    // },
    cache: "no-store", // brough back on jan 3 as no-cache was causing weird issues
    // cache: "no-cache", // changed from no-store on jan 2
    body: JSON.stringify({
      query:
        GET_USERDATA_ACCESSED_COURSES_EXTENDED_COURSE_HERO_BY_DATABASE_ID.loc
          ?.source.body,
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

// export async function getCurrentUserDataTestimonialsCourseHero(databaseId: number): Promise<Testimonial[]> {
//     const response = await fetch(process.env.NEXT_PUBLIC_WORDPRESS_API_URL!, {
//         method: 'POST',
//         headers: {
//             'Content-Type': 'application/json',
//             'Accept': 'application/json',
//         },
//         // next: {
//         //     revalidate: 2
//         // },
//         cache: "no-store", // brough back on jan 3 as no-cache was causing weird issues
//         // cache: "no-cache", // changed from no-store on jan 2
//         body: JSON.stringify({
//             query: GET_USERDATA_TESTIMONIALS_COURSE_HERO_BY_DATABASE_ID.loc?.source.body,
//             variables: {
//                 id: `${databaseId}`,
//             },
//         }),
//     });

//     const { data, errors } = await response.json();

//     if (errors) {
//         throw generateWpPageError(errors)
//     }

//     const userTestimonials: Testimonial[] = data?.userData?.userDataMetadata?.testimonials || [];
//     return transformDataForWpUrl(userTestimonials);
// }
// above deprecated as we are now using the hasPostedTestimonial field in accessedcourse

// this is used in a lot of components, will look very bad if user name doesn't update accordingly after registering so no-store for launch jan 14
// on jan 15 modified all project so this below is only in coursehero fetching first and last name, later used in posting testimonials
export async function getCurrentUserDataForCourseSlugPageAll(
  databaseId: number
): Promise<UserData> {
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
    // cache: "no-cache", // tried to change to this from revalidate: 2 on jan 2 but caused json < error
    // cache: "no-store", // brough back on jan 3 as no-cache was causing weird issues
    body: JSON.stringify({
      query: GET_USERDATA_COURSE_SLUG_PAGE.loc?.source.body,
      // above query updated on jan 15
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

export function extractCurrentUserDataForCourseSlugPageAll(userData: UserData) {
  return {
    accessedCourses: userData?.userDataMetadata?.accessedcourses || [],
    likedCourses: userData?.userDataMetadata?.likedCourses || [],
    purchasedCourses: userData?.userDataMetadata?.purchasedcourses || [],
    purchasedBundless: userData?.userDataMetadata?.purchasedbundless || [],
    purchasedSubscriptions:
      userData?.userDataMetadata?.purchasedsubscriptions || [],
  };
}

export async function getCourse(params: { slug: string }): Promise<Course> {
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
      query: GET_COURSE_BY_SLUG.loc?.source.body,
      variables: {
        id: `${params.slug}`,
      },
    }),
  });

  const { data, errors } = await response.json();

  if (errors) {
    throw generateWpPageError(errors);
  }

  // const client = getClient();
  const course: Course = data?.course;
  return transformDataForWpUrl(course);
}

export async function getCourseAllSlug(): Promise<string[]> {
  try {
    const response = await fetch(process.env.NEXT_PUBLIC_WORDPRESS_API_URL!, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      next: {
        revalidate: 600
      },
      body: JSON.stringify({
        query: GET_ALL_COURSES_SLUGS.loc?.source.body,
      }),
    });

    const { data, errors } = await response.json();

    if (errors) {
      throw generateWpPageError(errors);
    }

    const coursesNodes = data?.courses?.nodes;

    if (!Array.isArray(coursesNodes)) {
      throw new Error("Invalid courses data format");
    }

    const slugs: string[] = coursesNodes.map((course: Course) => {
      return course?.slug || ""; // Assuming 'slug' property exists on each course object
    });
    return slugs; // Filter out any empty or undefined slugs
  } catch (error) {
    console.error("Error fetching course slugs:", error);
    throw error; // Rethrow the error to be handled by the caller
  }
}

export async function getCourseBundleAllSlug(): Promise<string[]> {
  try {
    const response = await fetch(process.env.NEXT_PUBLIC_WORDPRESS_API_URL!, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      next: {
        revalidate: 600
      },
      body: JSON.stringify({
        query: GET_ALL_COURSE_BUNDLES.loc?.source.body,
      }),
    });

    const { data, errors } = await response.json();
    if (errors) {
      throw generateWpPageError(errors);
    }

    const courseBundleNodes = data?.courseBundles?.nodes;

    if (!Array.isArray(courseBundleNodes)) {
      throw new Error("Invalid courses data format");
    }

    const bundleSlugs: string[] = courseBundleNodes.map((courseBundle: Course) => {
      return courseBundle?.slug || ""; // Assuming 'slug' property exists on each course object
    });
    return bundleSlugs; // Filter out any empty or undefined slugs
  } catch (error) {
    console.error("Error fetching course bundle slugs:", error);
    throw error; // Rethrow the error to be handled by the caller
  }
}

export async function getCourseRelatedCourses(params: {
  slug: string;
}): Promise<Course[]> {
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
      query: GET_COURSE_BY_SLUG_RELATED_COURSES.loc?.source.body,
      variables: {
        id: `${params.slug}`,
      },
    }),
  });

  const { data, errors } = await response.json();

  if (errors) {
    throw generateWpPageError(errors);
  }

  // const client = getClient();
  const relatedCourses: Course[] =
    data?.course?.courseMetadata?.relatedCourses || [];
  return transformDataForWpUrl(relatedCourses);
}

export async function getCourseCategories(params: {
  slug: string;
}): Promise<Category[]> {
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
      query: GET_COURSE_BY_SLUG_CATEGORIES.loc?.source.body,
      variables: {
        id: `${params.slug}`,
      },
    }),
  });

  const { data, errors } = await response.json();

  if (errors) {
    throw generateWpPageError(errors);
  }

  // const client = getClient();
  const courseCategories: Category[] = data?.course.categories.nodes;
  return transformDataForWpUrl(courseCategories);
}

export async function getCourseTags(params: { slug: string }): Promise<Tag[]> {
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
      query: GET_COURSE_BY_SLUG_TAGS.loc?.source.body,
      variables: {
        id: `${params.slug}`,
      },
    }),
  });

  const { data, errors } = await response.json();

  if (errors) {
    throw generateWpPageError(errors);
  }

  // const client = getClient();
  const courseTags: Tag[] = data?.course.tags.nodes;
  return transformDataForWpUrl(courseTags);
}

export async function getCourseID(params: { slug: string }): Promise<number> {
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
      query: GET_COURSE_BY_SLUG_ID.loc?.source.body,
      variables: {
        id: `${params.slug}`,
      },
    }),
  });

  const { data, errors } = await response.json();

  if (errors) {
    throw generateWpPageError(errors);
  }

  // const client = getClient();
  const courseID: number = data?.course.databaseId;
  return transformDataForWpUrl(courseID);
}

export async function getCourseWhatsIncluded(params: {
  slug: string;
}): Promise<Course> {
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
      query: GET_COURSE_BY_SLUG_WHATS_INCLUDED.loc?.source.body,
      variables: {
        id: `${params.slug}`,
      },
    }),
  });

  const { data, errors } = await response.json();

  if (errors) {
    throw generateWpPageError(errors);
  }

  // const client = getClient();
  const course: Course = data?.course;
  return transformDataForWpUrl(course);
}

export function extractCourseWhatsIncluded(courseData: Course) {
  return {
    theCourseFormulas: courseData?.courseMetadata?.formulas || "",
    usedProducts: courseData?.courseMetadata?.productsUsed || [],
    downloadables: courseData?.courseMetadata?.newDownloadables || [],
  };
}

export async function getCourseYouWillLearn(params: {
  slug: string;
}): Promise<string> {
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
      query: GET_COURSE_BY_SLUG_YOU_WILL_LEARN.loc?.source.body,
      variables: {
        id: `${params.slug}`,
      },
    }),
  });

  const { data, errors } = await response.json();

  if (errors) {
    throw generateWpPageError(errors);
  }

  // const client = getClient();
  const courseYouWillLearn: string =
    data?.course?.courseMetadata?.youwilllearn || "";
  return transformDataForWpUrl(courseYouWillLearn);
}

export async function getCourseChapters(params: {
  slug: string;
}): Promise<CourseChapter[]> {
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
      query: GET_COURSE_BY_SLUG_CHAPTERS.loc?.source.body,
      variables: {
        id: `${params.slug}`,
      },
    }),
  });

  const { data, errors } = await response.json();

  if (errors) {
    throw generateWpPageError(errors);
  }

  // const client = getClient();
  const courseChapters: CourseChapter[] =
    data?.course?.courseMetadata?.courseChapters || [];
  return transformDataForWpUrl(courseChapters);
}

export async function getCourseSubscriptionData(params: {
  slug: string;
}): Promise<Course> {
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
      query: GET_COURSE_BY_SLUG_SUBSCRIPTION_DATA.loc?.source.body,
      variables: {
        id: `${params.slug}`,
      },
    }),
  });

  const { data, errors } = await response.json();

  if (errors) {
    throw generateWpPageError(errors);
  }

  // const client = getClient();
  const course: Course = data?.course;
  return transformDataForWpUrl(course);
}

export function extractCourseSubscriptionData(courseData: Course) {
  return {
    courseID: courseData.databaseId,
    isPartOfSubscription: courseData.isPartOfSubscription,
    subscriptiontier: courseData?.courseMetadata?.subscriptiontier || 0,
    price: courseData?.courseMetadata?.price?.toString() ?? "",
  };
}

export async function getCourseContent(params: {
  slug: string;
}): Promise<string> {
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
      query: GET_COURSE_BY_SLUG_DESCRIPTION.loc?.source.body,
      variables: {
        id: `${params.slug}`,
      },
    }),
  });

  const { data, errors } = await response.json();

  if (errors) {
    throw generateWpPageError(errors);
  }

  // const client = getClient();
  const courseContent: string = data?.course.content;
  return transformDataForWpUrl(courseContent);
}

export async function getCourseEducatorsAndTheirCourses(params: {
  slug: string;
}): Promise<Course> {
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
      query: GET_COURSE_BY_SLUG_EDUCATORS_AND_THEIR_COURSES.loc?.source.body,
      variables: {
        id: `${params.slug}`,
      },
    }),
  });

  const { data, errors } = await response.json();

  if (errors) {
    throw generateWpPageError(errors);
  }

  // const client = getClient();
  const course: Course = data?.course;
  return transformDataForWpUrl(course);
}

export function extractCourseEducatorsAndTheirCourses(courseData: Course) {
  return {
    courseEducatorsAndTheirCourses: (
      courseData?.courseMetadata?.educators || []
    ).map((educator) => ({
      educator,
      numberOfCourses: educator.educatorMetaData?.courses.length || 0,
    })),
  };
}

export async function getCourseProductsUsed(params: {
  slug: string;
}): Promise<Course> {
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
      query: GET_COURSE_BY_SLUG_USED_PRODUCTS.loc?.source.body,
      variables: {
        id: `${params.slug}`,
      },
    }),
  });

  const { data, errors } = await response.json();

  if (errors) {
    throw generateWpPageError(errors);
  }

  // const client = getClient();
  const course: Course = data?.course;
  return transformDataForWpUrl(course);
}

export function extractCourseProductsUsed(courseData: Course) {
  return {
    usedProducts: courseData?.courseMetadata?.productsUsed || [],
  };
}

export async function getCourseTestimonials(params: {
  slug: string;
}): Promise<Course> {
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
      query: GET_COURSE_BY_SLUG_TESTIMONIALS.loc?.source.body,
      variables: {
        id: `${params.slug}`,
      },
    }),
  });

  const { data, errors } = await response.json();

  if (errors) {
    throw generateWpPageError(errors);
  }

  // const client = getClient();
  const course: Course = data?.course;
  return transformDataForWpUrl(course);
}

export function extractCourseTestimonials(courseData: Course) {
  return {
    courseTestimonialsNew: (
      courseData?.courseMetadata?.courseTestimonialsNew || []
    ).filter((testimonial: Testimonial) => testimonial.status === "publish"),
  };
}

export async function getCourseDownloadables(params: {
  slug: string;
}): Promise<Course> {
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
      query: GET_COURSE_BY_SLUG_DOWNLOADABLES.loc?.source.body,
      variables: {
        id: `${params.slug}`,
      },
    }),
  });

  const { data, errors } = await response.json();

  if (errors) {
    throw generateWpPageError(errors);
  }

  // const client = getClient();
  const course: Course = data?.course;
  return transformDataForWpUrl(course);
}

export function extractCourseDownloadables(courseData: Course) {
  return {
    downloadables: courseData?.courseMetadata?.newDownloadables || [],
  };
}

export async function getCourseBasics(params: {
  slug: string;
}): Promise<Course> {
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
      query: GET_COURSE_BY_SLUG_BASICS.loc?.source.body,
      variables: {
        id: `${params.slug}`,
      },
    }),
  });

  const { data, errors } = await response.json();

  if (errors) {
    throw generateWpPageError(errors);
  }

  // const client = getClient();
  const course: Course = data?.course;
  return transformDataForWpUrl(course);
}

export async function getCourseBasicsAndLevel(params: {
  slug: string;
}): Promise<Course> {
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
      query: GET_COURSE_BY_SLUG_BASICS_AND_LEVEL.loc?.source.body,
      variables: {
        id: `${params.slug}`,
      },
    }),
  });

  const { data, errors } = await response.json();

  if (errors) {
    throw generateWpPageError(errors);
  }

  // const client = getClient();
  const course: Course = data?.course;
  return transformDataForWpUrl(course);
}

export function extractCourseBasics(courseData: Course) {
  return {
    theCourseTitle: courseData?.title || "",
    courseID: courseData.databaseId,
    live: courseData.isLive,
    isPartOfSubscription: courseData.isPartOfSubscription,
    isCourseAvailableToBePurchasedOnlyALaCarte:
      courseData.isAvailableOnlyALaCarte,
    isCoursePurchasableALaCarte: courseData.isPurchasableALaCarte,
    isPartOfBundle: courseData.isPartOfBundle,
    willBeLive: courseData.willBeLive,
  };
}

export function extractCourseBasicsAndLevel(courseData: Course) {
  return {
    theCourseTitle: courseData?.title || "",
    courseID: courseData.databaseId,
    live: courseData.isLive,
    isPartOfSubscription: courseData.isPartOfSubscription,
    isCourseAvailableToBePurchasedOnlyALaCarte:
      courseData.isAvailableOnlyALaCarte,
    isCoursePurchasableALaCarte: courseData.isPurchasableALaCarte,
    isPartOfBundle: courseData.isPartOfBundle,
    willBeLive: courseData.willBeLive,
    level: courseData?.courseMetadata?.courselevel || "",
  };
}

export async function getCourseHighlights(params: {
  slug: string;
}): Promise<Course> {
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
      query: GET_COURSE_BY_SLUG_HIGHLIGHTS.loc?.source.body,
      variables: {
        id: `${params.slug}`,
      },
    }),
  });

  const { data, errors } = await response.json();

  if (errors) {
    throw generateWpPageError(errors);
  }

  // const client = getClient();
  const course: Course = data?.course;
  return transformDataForWpUrl(course);
}

export function extractCourseHighlights(courseData: Course) {
  return {
    newCourseHighlights: courseData?.courseMetadata?.newCourseHighlights || [],
  };
}

export async function getCourseBeforeAndAfter(params: {
  slug: string;
}): Promise<Course> {
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
      query: GET_COURSE_BY_SLUG_BEFORE_AND_AFTER.loc?.source.body,
      variables: {
        id: `${params.slug}`,
      },
    }),
  });

  const { data, errors } = await response.json();

  if (errors) {
    throw generateWpPageError(errors);
  }

  // const client = getClient();
  const course: Course = data?.course;
  return transformDataForWpUrl(course);
}

export function extractCourseBeforeAndAfter(courseData: Course) {
  return {
    beforeandafter: courseData?.courseMetadata?.beforeandafter || [],
  };
}

export function extractFormulas(courseData: Course) {
  return {
    theCourseFormulas: courseData?.courseMetadata?.formulas || "",
  };
}

export async function getCourseExtrasCourseHero(params: {
  slug: string;
}): Promise<Course> {
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
      query: GET_COURSE_BY_SLUG_EXTRAS_COURSE_HERO.loc?.source.body,
      variables: {
        id: `${params.slug}`,
      },
    }),
  });

  const { data, errors } = await response.json();

  if (errors) {
    throw generateWpPageError(errors);
  }

  // const client = getClient();
  const course: Course = data?.course;
  return transformDataForWpUrl(course);
}

export function extractCourseExtrasCourseHero(courseData: Course) {
  return {
    courseDuration: courseData?.courseMetadata?.courseDuration || "",
    level: courseData?.courseMetadata?.courselevel || "",
    scheduledreleasedate:
      courseData?.courseMetadata?.scheduledreleasedate || "",
    theCourseEducators: courseData?.courseMetadata?.educators || [],
  };
}

export async function getCourseExtrasCourseHeroSticky(params: {
  slug: string;
}): Promise<Course> {
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
      query: GET_COURSE_BY_SLUG_EXTRAS_COURSE_HERO_STICKY.loc?.source.body,
      variables: {
        id: `${params.slug}`,
      },
    }),
  });

  const { data, errors } = await response.json();

  if (errors) {
    throw generateWpPageError(errors);
  }

  // const client = getClient();
  const course: Course = data?.course;
  return transformDataForWpUrl(course);
}

export function extractCourseExtrasCourseHeroSticky(courseData: Course) {
  return {
    courseDuration: courseData?.courseMetadata?.courseDuration || "",
    courseDetailPicture:
      courseData?.courseMetadata?.courseDetailPicture?.mediaItemUrl ||
      "/placeholder.png",
    liveVideoId:
      (courseData?.courseMetadata.vimeoid &&
        courseData?.courseMetadata.vimeoid[0]?.chapter) ||
      "",
    courseThumbnailPicture:
      courseData?.courseMetadata?.courseThumbnailPicture?.mediaItemUrl ||
      "/placeholder.png",
    ratingNumber: courseData?.courseMetadata?.noOfTestimonials || 0,
    shareText: courseData?.courseMetadata?.courseHeroDescription || "",
    videoTrailerId: courseData?.courseMetadata?.vimeoPromoId || "",
    courseSlug: courseData?.slug || "",
    avgRating: courseData?.courseMetadata?.averageRating || 5,
    vimeoIdStrings:
      courseData?.courseMetadata.vimeoid &&
        courseData?.courseMetadata.vimeoid.length > 0
        ? courseData?.courseMetadata.vimeoid.map(
          (videoId) => videoId?.chapter || ""
        )
        : [""],
  };
}

export async function getCourseEducatorsBasic(params: {
  slug: string;
}): Promise<Course> {
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
      query: GET_COURSE_BY_SLUG_EDUCATORS_BASIC.loc?.source.body,
      variables: {
        id: `${params.slug}`,
      },
    }),
  });

  const { data, errors } = await response.json();

  if (errors) {
    throw generateWpPageError(errors);
  }

  // const client = getClient();
  const course: Course = data?.course;
  return transformDataForWpUrl(course);
}

export function extractCourseEducatorsBasic(courseData: Course) {
  return {
    theCourseEducators: courseData?.courseMetadata?.educators || [],
  };
}

export async function getCourseFormulas(params: {
  slug: string;
}): Promise<string> {
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
      query: GET_COURSE_BY_SLUG_YOU_WILL_LEARN.loc?.source.body,
      variables: {
        id: `${params.slug}`,
      },
    }),
  });

  const { data, errors } = await response.json();

  if (errors) {
    throw generateWpPageError(errors);
  }

  // const client = getClient();
  const courseFormulas: string = data?.course?.courseMetadata?.formulas || "";
  return transformDataForWpUrl(courseFormulas);
}

export async function getCoursePartOfSeries(params: {
  slug: string;
}): Promise<Course> {
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
      query: GET_COURSE_BY_SLUG_PART_OF_SERIES.loc?.source.body,
      variables: {
        id: `${params.slug}`,
      },
    }),
  });

  const { data, errors } = await response.json();

  if (errors) {
    throw generateWpPageError(errors);
  }

  // const client = getClient();
  const course: Course = data?.course;
  return transformDataForWpUrl(course);
}

export async function getCourseMetadata(params: {
  slug: string;
}): Promise<Course> {
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
      query: GET_COURSE_BY_SLUG_METADATA.loc?.source.body,
      variables: {
        id: `${params.slug}`,
      },
    }),
  });

  const { data, errors } = await response.json();

  if (errors) {
    throw generateWpPageError(errors);
  }

  // const client = getClient();
  const course: Course = data?.course;
  return transformDataForWpUrl(course);
}

export function extractCoursePartOfSeries(courseData: Course) {
  return {
    numberOfEpisodesInSeries: (courseData?.courseMetadata?.partofseries || [])
      .length,
    series: (courseData?.courseMetadata?.partofseries || []).length + " parts",
  };
}

export async function getCourseAll(params: { slug: string }): Promise<Course> {
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
      query: GET_COURSE_BY_SLUG_ALL.loc?.source.body,
      variables: {
        id: `${params.slug}`,
      },
    }),
  });

  const { data, errors } = await response.json();

  if (errors) {
    throw generateWpPageError(errors);
  }

  // const client = getClient();
  const course: Course = data?.course;
  return transformDataForWpUrl(course);
}

export function extractCourseAll(courseData: Course) {
  return {
    tags: courseData?.tags?.nodes || [],
    categories: courseData?.categories?.nodes || [],
    upcoming: (courseData?.categories?.nodes || [])
      .map((category: Category) => (category?.name || "").toLowerCase())
      .includes("upcoming"),
    youWillLearnText: courseData?.courseMetadata?.youwilllearn || "",
    theCourseChapters: courseData?.courseMetadata?.courseChapters || [],
    courseDescription: courseData?.content || "",
    relatedCourses: courseData?.courseMetadata?.relatedcourses || [],
    theCourseFormulas: courseData?.courseMetadata?.formulas || "",
    usedProducts: courseData?.courseMetadata?.productsUsed || [],
    courseID: courseData.databaseId,
    courseDatabaseId: courseData.databaseId,
    isPartOfSubscription: courseData.isPartOfSubscription,
    isPartOfSeries: courseData.isPartOfSeries,
    subscriptiontier: courseData?.courseMetadata?.subscriptiontier || 0,
    price: courseData?.courseMetadata?.price?.toString() ?? "",
    courseEducatorsAndTheirCourses: (
      courseData?.courseMetadata?.educators || []
    ).map((educator) => ({
      educator,
      numberOfCourses: educator.educatorMetaData?.courses.length || 0,
    })),
    downloadables: courseData?.courseMetadata?.newDownloadables || [],
    newCourseHighlights: courseData?.courseMetadata?.newCourseHighlights || [],
    beforeandafter: courseData?.courseMetadata?.beforeandafter || [],
    courseTestimonialsNew: (
      courseData?.courseMetadata?.courseTestimonialsNew || []
    ).filter((testimonial: Testimonial) => testimonial.status === "publish"),
    theCourseTitle: courseData?.title || "",
    live: courseData.isLive,
    isCourseAvailableToBePurchasedOnlyALaCarte:
      courseData.isAvailableOnlyALaCarte,
    isCoursePurchasableALaCarte: courseData.isPurchasableALaCarte,
    isPartOfBundle: courseData.isPartOfBundle,
    willBeLive: courseData.willBeLive,
    level: courseData?.courseMetadata?.courselevel || "",
    courseDuration: courseData?.courseMetadata?.courseDuration || "",
    scheduledreleasedate:
      courseData?.courseMetadata?.scheduledreleasedate || "",
    courseDetailPicture:
      courseData?.courseMetadata?.courseDetailPicture?.mediaItemUrl ||
      "/placeholder.png",
    liveVideoId:
      (courseData?.courseMetadata.vimeoid &&
        courseData?.courseMetadata.vimeoid[0]?.chapter) ||
      "",
    courseThumbnailPicture:
      courseData?.courseMetadata?.courseThumbnailPicture?.mediaItemUrl ||
      "/placeholder.png",
    ratingNumber: courseData?.courseMetadata?.noOfTestimonials || 0,
    shareText: courseData?.courseMetadata?.courseHeroDescription || "",
    videoTrailerId: courseData?.courseMetadata?.vimeoPromoId || "",
    courseSlug: courseData?.slug || "",
    avgRating: courseData?.courseMetadata?.averageRating || 5,
    vimeoIdStrings:
      courseData?.courseMetadata.vimeoid &&
        courseData?.courseMetadata.vimeoid.length > 0
        ? courseData?.courseMetadata.vimeoid.map(
          (videoId) => videoId?.chapter || ""
        )
        : [""],
    theCourseEducators: courseData?.courseMetadata?.educators || [],
    numberOfEpisodesInSeries: (courseData?.courseMetadata?.partofseries || [])
      .length,
    series: (courseData?.courseMetadata?.partofseries || []).length + " parts",
    brandSlug: (courseData.courseMetadata.courseBrands?.find((brand: Brand) => brand))?.slug
  };
}

export async function getUpcomingCourses(): Promise<Course[]> {
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
      query: GET_ALL_UPCOMING_COURSES.loc?.source.body,
    }),
  });

  const { data, errors } = await response.json();

  if (errors) {
    throw generateWpPageError(errors);
  }

  // const client = getClient();
  const courses: [Course] = data?.courses.nodes || [];
  return transformDataForWpUrl(courses);
}

// function to generate random course if no chosen related courses
// Fisher-Yates shuffle function to randomize an array
export function shuffleArray<T>(array: T[]): T[] {
  const shuffledArray = [...array];
  for (let i = shuffledArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffledArray[i], shuffledArray[j]] = [shuffledArray[j], shuffledArray[i]];
  }
  return shuffledArray;
}

export async function getRandomCategoryCourses(
  catName: string
): Promise<Course[]> {
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
      query: GET_RANDOM_COURSES_BY_CATEGORY.loc?.source.body,
      variables: {
        categoryName: catName,
        count: 20,
      },
    }),
  });

  const { data, errors } = await response.json();

  if (errors) {
    throw generateWpPageError(errors);
  }

  // const client = getClient();
  const courses: [Course] = data.courses.nodes;
  return transformDataForWpUrl(courses);
}

export async function getRandomTagCourses(tag: string): Promise<Course[]> {
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
      query: GET_RANDOM_COURSES_BY_TAG.loc?.source.body,
      variables: {
        tag: tag,
        count: 20,
      },
    }),
  });

  const { data, errors } = await response.json();

  if (errors) {
    throw generateWpPageError(errors);
  }

  // const client = getClient();
  const courses: [Course] = data.courses.nodes;
  return transformDataForWpUrl(courses);
}

// ///////////////////
// Helper functions
// ///////////////////
// extract course data basics
// extract course data categories
// extract course data tags

export function extractCourseDetails(courseData: Course) {
  return {
    courseID: courseData.databaseId,
    isPartOfSubscription: courseData.isPartOfSubscription,
    subscriptiontier: courseData?.courseMetadata?.subscriptiontier || 0,
    courseDescription: courseData?.content || "",
    courseHerodescription:
      courseData?.courseMetadata?.courseHeroDescription ||
      "Unique course brought to you by BTC",
    vimeoIds: courseData?.courseMetadata.vimeoid || [""],
    vimeoIdStrings:
      courseData?.courseMetadata.vimeoid &&
        courseData?.courseMetadata.vimeoid.length > 0
        ? courseData?.courseMetadata.vimeoid.map(
          (videoId) => videoId?.chapter || ""
        )
        : [""],
    liveVideoId:
      (courseData?.courseMetadata.vimeoid &&
        courseData?.courseMetadata.vimeoid[0]?.chapter) ||
      "",
    videoTrailerId: courseData?.courseMetadata?.vimeoPromoId || "",
    mediaItemUrl:
      courseData?.courseMetadata?.courseThumbnailPicture?.mediaItemUrl ||
      "/placeholder.png",
    courseDetailPicture:
      courseData?.courseMetadata?.courseDetailPicture?.mediaItemUrl || "",
    youWillLearnText: courseData?.courseMetadata?.youwilllearn || "",
    theCourseChapters: courseData?.courseMetadata?.courseChapters || [],
    theCourseFormulas: courseData?.courseMetadata?.formulas || "",
    theCourseTitle: courseData.title || "",
    theCourseEducators: courseData?.courseMetadata?.educators || [],
    upcoming: courseData.categories.nodes
      .map((category: Category) => category.name.toLowerCase())
      .includes("upcoming"),
    willBeLive: courseData.willBeLive,
    live: courseData.isLive,
    shareText: courseData?.courseMetadata?.courseHeroDescription || "",
    ratingNumber: courseData?.courseMetadata?.noOfTestimonials || 0,
    avgRating: courseData?.courseMetadata?.averageRating || 5,
    isCourseAvailableToBePurchasedOnlyALaCarte:
      courseData.isAvailableOnlyALaCarte,
    isCoursePurchasableALaCarte: courseData.isPurchasableALaCarte,
    price: courseData?.courseMetadata?.price?.toString() ?? "",
    level: courseData?.courseMetadata?.courselevel || "",
    numberOfEpisodesInSeries: (courseData?.courseMetadata?.partofseries || [])
      .length,
    series: (courseData?.courseMetadata?.partofseries || []).length + " parts",
    relatedCourses: courseData?.courseMetadata?.relatedcourses || [],
    usedProducts: courseData?.courseMetadata?.productsUsed || [],
    downloadables: courseData?.courseMetadata?.newDownloadables || [],
    courseCategories: courseData?.categories || [],
    courseTags: courseData?.categories || [],
    courseDuration: courseData?.courseMetadata?.courseDuration || "",
    courseEducatorsAndTheirCourses: (
      courseData?.courseMetadata?.educators || []
    ).map((educator) => ({
      educator,
      numberOfCourses: educator.educatorMetaData?.courses.length || 0,
    })),
    // Safely access the educatorName, checking if educators array is not empty
    educatorName:
      courseData?.courseMetadata?.educators &&
        courseData?.courseMetadata?.educators.length > 0
        ? courseData?.courseMetadata.educators[0].title
        : "",
    releasedate: courseData?.courseMetadata?.releasedate || "",
    scheduledreleasedate:
      courseData?.courseMetadata?.scheduledreleasedate || "",
    courseSlug: courseData?.slug || "",
    newCourseHighlights: courseData?.courseMetadata?.newCourseHighlights || [],
    beforeandafter: courseData?.courseMetadata?.beforeandafter || [],
    courseTestimonialsNew: (
      courseData?.courseMetadata?.courseTestimonialsNew || []
    ).filter((testimonial: Testimonial) => testimonial.status === "publish"),
  };
}

// function to format the course launch date
export function extractDate(dateTimeStr: string) {
  return dateTimeStr.split(" ")[0];
}

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
    userid: "",
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

export const getLikedCourses = (currentUserData: UserData) => {
  return currentUserData?.userDataMetadata?.likedCourses || [];
};

// Checking if this course is part of accessed courses
export const hasUserCompletedCourse = (
  courseId: number,
  userDataAccessedCourses: AccessedCourse[]
) =>
  userDataAccessedCourses.some(
    (accessedCourse) =>
      accessedCourse.accessedcoursemetadata.courseid === courseId &&
      accessedCourse.isCompleted === true
  );

// Formatting date to US format
export function formatDate(dateString: string): string {
  const options: Intl.DateTimeFormatOptions = {
    year: "numeric",
    month: "long",
    day: "numeric",
  };
  const date = new Date(dateString);
  return date.toLocaleDateString("en-US", options);
}


export async function getBrandAll(): Promise<Brand[]> {
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
      query: GET_BRAND.loc?.source.body,
    }),
  });

  const { data, errors } = await response.json();

  if (errors) {
    throw generateWpPageError(errors);
  } 
  
  // const client = getClient();
  const brands: [Brand] = data.brands.nodes;
  return transformDataForWpUrl(brands);
}

