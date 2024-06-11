import CourseCard from "@/components/CourseCard";
import DownloadableCard from "@/components/DownloadableCard";
import ActionButtonPDFs from "@/components/buttons/ActionButtonPDFs";
import SH1Text from "@/components/text/SH1Text";
import { GET_ALL_UPCOMING_COURSES, GET_COURSE_BY_SLUG, GET_HOME_PAGE_DOWNLOADABLES_AND_TIPS, GET_RECENT_COURSES, GET_USERDATA_BY_DATABASE_ID } from "@/graphql/queries";
import { GET_FAVORITE_BUSINESS_COURSES, GET_FAVORITE_EXTENSIONS_COURSES, GET_FAVORITE_HAIRCOLOR_COURSES, GET_FAVORITE_HAIRCUTTING_COURSES, GET_FAVORITE_MENS_COURSES, GET_FAVORITE_STYLING_COURSES, GET_FAVORITE_TEXTURE_COURSES, GET_HOME_PAGE_DOWNLOADABLES, GET_HOME_PAGE_TIPS } from "@/graphql/queries/homePage";
import { GET_USERDATA_ACCESSED_COURSES_BASIC_BY_DATABASE_ID, GET_USERDATA_ACCESSED_COURSES_FOR_YOUTUBECARDS_BY_DATABASE_ID, GET_USERDATA_FIRST_NAME_LAST_NAME_BY_DATABASE_ID, GET_USERDATA_LIKED_COURSES_FOR_YOUTUBECARDS_BY_DATABASE_ID, GET_USERDATA_LIKED_EDUCATORS_FOR_EDUCATORCARDS_BY_DATABASE_ID, GET_USERDATA_PURCHASED_BUNDLES_FOR_YOUTUBECARDS_BY_DATABASE_ID, GET_USERDATA_PURCHASED_COURSES_FOR_YOUTUBECARDS_BY_DATABASE_ID, GET_USERDATA_PURCHASED_SUBSCRIPTIONS_BY_DATABASE_ID } from "@/graphql/queries/userData";
import { AccessedCourse, Course, CourseBundle, Downloadable, HomePageDownloadables, HomePageDownloadablesAndTips, HomePageTips, UserData, UserSession } from "@/interfaces";
import { client } from "@/lib/apolloClient";
import { transformDataForWpUrl, transformWpUrl } from "@/utils/url";
import { generateWpPageError } from "@/utils/wpErrorHandling";

export async function getCurrentUserData(databaseId: number): Promise<UserData> {
    const response = await fetch(process.env.NEXT_PUBLIC_WORDPRESS_API_URL!, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
        },
        // cache: "force-cache",
        body: JSON.stringify({
            query: GET_USERDATA_BY_DATABASE_ID.loc?.source.body,
            variables: {
                id: `${databaseId}`,
            },
        }),
    });

    const { data, errors } = await response.json();

    if (errors) {
        throw generateWpPageError(errors)
    }

    const currentUserData: UserData = data.userData;
    return transformDataForWpUrl(currentUserData);
}

export async function getCourse(params: { slug: string }): Promise<Course> {
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
            query: GET_COURSE_BY_SLUG.loc?.source.body,
            variables: {
                id: `${params.slug}`,
            },
        }),
    });

    const { data, errors } = await response.json();

    if (errors) {
        throw generateWpPageError(errors)
    }

    // const client = getClient();
    const course: Course = data?.course;
    return transformDataForWpUrl(course);
}

export async function getUpcomingCourses(): Promise<Course[]> {
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
            query: GET_ALL_UPCOMING_COURSES.loc?.source.body,

        }),
    });

    const { data, errors } = await response.json();

    if (errors) {
        throw generateWpPageError(errors)
    }

    // const client = getClient();
    const courses: [Course] = (data.courses.nodes);
    return transformDataForWpUrl(courses);
}

export const getCurrentUserDataIfExist = async (user: UserSession | null) => {

    // check if the user is logged in
    const isLoggedIn = (user?.userDataId || 0) > 0;

    // fetch UserData object from server
    // const currentUserData = await getCurrentUserData(userDataDatabaseId) || sampleUserData;
    let currentUserData: UserData | null = null;
    if (isLoggedIn) {
        // fetch UserData object from server only if user is logged in
        return currentUserData = await getCurrentUserData(user?.userDataId!);
    } else {
        // If the user is not logged in, set currentUserData to null or a default value
        return currentUserData = sampleUserData;
    }

}

export async function getFavoriteBusinessCourses(): Promise<Course[]> {
    const response = await fetch(process.env.NEXT_PUBLIC_WORDPRESS_API_URL!, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
        },
        next: {
            revalidate: 600
        },
        // cache: "force-cache", // if we want to cache the data and if we remove the const const dynamic = "force-dynamic"; it will automatically cache
        // or we could do:
        // cache: "no-store", // we have other options, like "no-store" / no-cache will revalidate the data, with no-store it's checking with each request if there are any changes
        body: JSON.stringify({
            query: GET_FAVORITE_BUSINESS_COURSES.loc?.source.body,
        }),
    });

    const { data, errors } = await response.json();

    if (errors) {
        throw generateWpPageError(errors)
    }

    const courses: Course[] = data.page.businessCourses.favoriteBusinessCourses;

    return transformDataForWpUrl(courses);
}

export async function getFavoriteHaircolorCourses(): Promise<Course[]> {
    const response = await fetch(process.env.NEXT_PUBLIC_WORDPRESS_API_URL!, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
        },
        next: {
            revalidate: 600
        },
        // cache: "force-cache", // if we want to cache the data and if we remove the const const dynamic = "force-dynamic"; it will automatically cache
        // or we could do:
        // cache: "no-store", // we have other options, like "no-store" / no-cache will revalidate the data, with no-store it's checking with each request if there are any changes
        body: JSON.stringify({
            query: GET_FAVORITE_HAIRCOLOR_COURSES.loc?.source.body,
        }),
    });

    const { data, errors } = await response.json();

    if (errors) {
        throw generateWpPageError(errors)
    }

    const courses: Course[] = data.page.hairColorCourses.favoriteHairColorCourses;

    return transformDataForWpUrl(courses);
}

export async function getFavoriteHaircuttingCourses(): Promise<Course[]> {
    const response = await fetch(process.env.NEXT_PUBLIC_WORDPRESS_API_URL!, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
        },
        next: {
            revalidate: 600
        },
        // cache: "force-cache", // if we want to cache the data and if we remove the const const dynamic = "force-dynamic"; it will automatically cache
        // or we could do:
        // cache: "no-store", // we have other options, like "no-store" / no-cache will revalidate the data, with no-store it's checking with each request if there are any changes
        body: JSON.stringify({
            query: GET_FAVORITE_HAIRCUTTING_COURSES.loc?.source.body,
        }),
    });

    const { data, errors } = await response.json();

    if (errors) {
        throw generateWpPageError(errors)
    }

    const courses: Course[] = data.page.haircuttingCourses.favoriteHaircuttingCourses;

    return transformDataForWpUrl(courses);
}

export async function getFavoriteTextureCourses(): Promise<Course[]> {
    const response = await fetch(process.env.NEXT_PUBLIC_WORDPRESS_API_URL!, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
        },
        next: {
            revalidate: 600
        },
        // cache: "force-cache", // if we want to cache the data and if we remove the const const dynamic = "force-dynamic"; it will automatically cache
        // or we could do:
        // cache: "no-store", // we have other options, like "no-store" / no-cache will revalidate the data, with no-store it's checking with each request if there are any changes
        body: JSON.stringify({
            query: GET_FAVORITE_TEXTURE_COURSES.loc?.source.body,
        }),
    });

    const { data, errors } = await response.json();

    if (errors) {
        throw generateWpPageError(errors)
    }

    const courses: Course[] = data.page.textureCourses.favoriteTextureCourses;

    return transformDataForWpUrl(courses);
}

export async function getFavoriteStylingCourses(): Promise<Course[]> {
    const response = await fetch(process.env.NEXT_PUBLIC_WORDPRESS_API_URL!, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
        },
        next: {
            revalidate: 600
        },
        // cache: "force-cache", // if we want to cache the data and if we remove the const const dynamic = "force-dynamic"; it will automatically cache
        // or we could do:
        // cache: "no-store", // we have other options, like "no-store" / no-cache will revalidate the data, with no-store it's checking with each request if there are any changes
        body: JSON.stringify({
            query: GET_FAVORITE_STYLING_COURSES.loc?.source.body,
        }),
    });

    const { data, errors } = await response.json();

    if (errors) {
        throw generateWpPageError(errors)
    }

    const courses: Course[] = data.page.stylingCourses.favoriteStylingCourses;

    return transformDataForWpUrl(courses);
}

export async function getFavoriteMensCourses(): Promise<Course[]> {
    const response = await fetch(process.env.NEXT_PUBLIC_WORDPRESS_API_URL!, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
        },
        next: {
            revalidate: 600
        },
        // cache: "force-cache", // if we want to cache the data and if we remove the const const dynamic = "force-dynamic"; it will automatically cache
        // or we could do:
        // cache: "no-store", // we have other options, like "no-store" / no-cache will revalidate the data, with no-store it's checking with each request if there are any changes
        body: JSON.stringify({
            query: GET_FAVORITE_MENS_COURSES.loc?.source.body,
        }),
    });

    const { data, errors } = await response.json();

    if (errors) {
        throw generateWpPageError(errors)
    }

    const courses: Course[] = data.page.mensCourses.favoriteMensCourses;

    return transformDataForWpUrl(courses);
}

export async function getFavoriteExtensionsCourses(): Promise<Course[]> {
    const response = await fetch(process.env.NEXT_PUBLIC_WORDPRESS_API_URL!, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
        },
        next: {
            revalidate: 600
        },
        // cache: "force-cache", // if we want to cache the data and if we remove the const const dynamic = "force-dynamic"; it will automatically cache
        // or we could do:
        // cache: "no-store", // we have other options, like "no-store" / no-cache will revalidate the data, with no-store it's checking with each request if there are any changes
        body: JSON.stringify({
            query: GET_FAVORITE_EXTENSIONS_COURSES.loc?.source.body,
        }),
    });

    const { data, errors } = await response.json();

    if (errors) {
        throw generateWpPageError(errors)
    }

    const courses: Course[] = data.page.extensionsCourses.favoriteExtensionsCourses;

    return transformDataForWpUrl(courses);
}

// // Recent courses (any category) -- for categories, we filter fetched courses by date directly with js but good to have in case we need it
function getNinetyDaysAgo() {
    const today = new Date();
    const ninetyDaysAgo = new Date(today);
    ninetyDaysAgo.setDate(today.getDate() - 90);

    const year = ninetyDaysAgo.getFullYear();
    const month = ninetyDaysAgo.getMonth() + 1; // Month is zero-based, so add 1
    const day = ninetyDaysAgo.getDate();

    return { year, month, day };
}

//   export async function getRecentCourses(): Promise<Course[]> {
//     const { year, month, day } = getNinetyDaysAgo();
//     const response = await client.query({
//       query: GET_RECENT_COURSES,
//       variables: {
//         day,
//         month,
//         year,
//       },
//     });

//     const courses: [Course] = (response.data.courses.nodes);

//     return courses;
//   }


export async function getRecentCourses(): Promise<Course[]> {
    const { year, month, day } = getNinetyDaysAgo();
    const response = await fetch(process.env.NEXT_PUBLIC_WORDPRESS_API_URL!, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
        },
        // cache: "force-cache", // if we want to cache the data and if we remove the const const dynamic = "force-dynamic"; it will automatically cache
        // or we could do:
        // cache: "no-store", // we have other options, like "no-store" / no-cache will revalidate the data, with no-store it's checking with each request if there are any changes
        // cache: "no-cache", // changed from no-store on jan 2
        cache: "no-store", // brough back on jan 3 as no-cache was causing weird issues
        body: JSON.stringify({
            query: GET_RECENT_COURSES.loc?.source.body,
            variables: {
                day,
                month,
                year,
            },
        }),
    });

    const { data, errors } = await response.json();

    if (errors) {
        throw generateWpPageError(errors)
    }

    const courses: Course[] = data.courses.nodes;

    return transformDataForWpUrl(courses);
}



// ///////////////////
// Helper functions
// ///////////////////
export function extractCourseDetails(courseData: Course) {
    return {
        courseID: courseData.databaseId,
        courseHerodescription: courseData?.courseMetadata?.courseHeroDescription || 'Unique course brought to you by BTC',
        vimeoIds: courseData?.courseMetadata.vimeoid || [""],
        vimeoIdStrings: (courseData?.courseMetadata.vimeoid && courseData?.courseMetadata.vimeoid.length > 0) ? courseData?.courseMetadata.vimeoid.map((videoId) => videoId?.chapter || "") : [""],
        liveVideoId: (courseData?.courseMetadata.vimeoid && courseData?.courseMetadata.vimeoid[0]?.chapter) || "",
        videoTrailerId: courseData?.courseMetadata?.vimeoPromoId || "",
        mediaItemUrl: courseData?.courseMetadata?.courseThumbnailPicture?.mediaItemUrl || "/placeholder.png",
        courseDetailPicture: courseData?.courseMetadata?.courseDetailPicture?.mediaItemUrl || "",
        youWillLearnText: courseData?.courseMetadata?.youwilllearn || "",
        theCourseChapters: courseData?.courseMetadata?.courseChapters || [],
        theCourseFormulas: courseData?.courseMetadata?.formulas || "",
        theCourseTitle: courseData.title || "",
        theCourseEducators: courseData?.courseMetadata?.educators || [],
        upcoming: courseData.willBeLive, // deprecated
        live: courseData.isLive,
        shareText: courseData?.courseMetadata?.courseHeroDescription || "",
        ratingNumber: courseData?.courseMetadata?.noOfTestimonials || 0,
        isCourseAvailableToBePurchasedOnlyALaCarte: courseData.isAvailableOnlyALaCarte,
        price: courseData?.courseMetadata?.price?.toString() ?? "",
        level: courseData?.courseMetadata?.courselevel || "",
        numberOfEpisodesInSeries: (courseData?.courseMetadata?.partofseries[0].courseSeriesMetadata.coursesinseries || []).length,
        series: (courseData?.courseMetadata?.partofseries[0].courseSeriesMetadata.coursesinseries || []).length + ' parts',
        relatedCourses: courseData?.courseMetadata?.relatedcourses || [],
        usedProducts: courseData?.courseMetadata?.productsUsed || [],
        downloadables: courseData?.courseMetadata?.newDownloadables || [],
        courseCategories: courseData?.categories || [],
        courseDuration: courseData?.courseMetadata?.courseDuration || "",
        courseEducatorsAndTheirCourses: (courseData?.courseMetadata?.educators || []).map(educator => ({
            educator,
            numberOfCourses: educator.educatorMetaData?.courses.length || 0
        })),
        // Safely access the educatorName, checking if educators array is not empty
        educatorName: courseData?.courseMetadata?.educators && courseData?.courseMetadata?.educators.length > 0
            ? courseData?.courseMetadata.educators[0].title
            : "",
    };
}

export async function getHomePageDownloadablesAndTips(databaseId: string): Promise<HomePageDownloadablesAndTips> {
    const response = await fetch(process.env.NEXT_PUBLIC_WORDPRESS_API_URL!, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
        },
        next: {
            revalidate: 600
        },
        // cache: "force-cache", // if we want to cache the data and if we remove the const const dynamic = "force-dynamic"; it will automatically cache
        // or we could do:
        // cache: "no-store", // we have other options, like "no-store" / no-cache will revalidate the data, with no-store it's checking with each request if there are any changes
        body: JSON.stringify({
            query: GET_HOME_PAGE_DOWNLOADABLES_AND_TIPS.loc?.source.body,
            variables: {
                id: `${databaseId}`,
            },
        }),
    });

    const { data, errors } = await response.json();

    if (errors) {
        throw generateWpPageError(errors)
    }

    const page: HomePageDownloadablesAndTips = data.page.homePage;
    return transformDataForWpUrl(page);
}

export async function getHomePageDownloadables(databaseId: string): Promise<HomePageDownloadables> {
    const response = await fetch(process.env.NEXT_PUBLIC_WORDPRESS_API_URL!, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
        },
        next: {
            revalidate: 600
        },
        // cache: "force-cache", // if we want to cache the data and if we remove the const const dynamic = "force-dynamic"; it will automatically cache
        // or we could do:
        // cache: "no-store", // we have other options, like "no-store" / no-cache will revalidate the data, with no-store it's checking with each request if there are any changes
        body: JSON.stringify({
            query: GET_HOME_PAGE_DOWNLOADABLES.loc?.source.body,
            variables: {
                id: `${databaseId}`,
            },
        }),
    });

    const { data, errors } = await response.json();

    if (errors) {
        throw generateWpPageError(errors)
    }

    const page: HomePageDownloadables = data.page.homePage;
    return transformDataForWpUrl(page);
}

export async function getHomePageTips(databaseId: string): Promise<HomePageTips> {
    const response = await fetch(process.env.NEXT_PUBLIC_WORDPRESS_API_URL!, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
        },
        next: {
            revalidate: 600
        },
        // cache: "force-cache", // if we want to cache the data and if we remove the const const dynamic = "force-dynamic"; it will automatically cache
        // or we could do:
        // cache: "no-store", // we have other options, like "no-store" / no-cache will revalidate the data, with no-store it's checking with each request if there are any changes
        body: JSON.stringify({
            query: GET_HOME_PAGE_TIPS.loc?.source.body,
            variables: {
                id: `${databaseId}`,
            },
        }),
    });

    const { data, errors } = await response.json();

    if (errors) {
        throw generateWpPageError(errors)
    }

    const page: HomePageTips = data.page.homePage;
    return transformDataForWpUrl(page);
}

export async function getCurrentUserDataPurchasedSubscriptions(databaseId: number): Promise<UserData> {
    const response = await fetch(process.env.NEXT_PUBLIC_WORDPRESS_API_URL!, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
        },
        // cache: "force-cache",
        // cache: "no-store",
        // next: {
        //   revalidate: 2
        // },
        // cache: "no-cache", // changed from revalidate: 2 on jan 2
        cache: "no-store", // brough back on jan 3 as no-cache was causing weird issues
        body: JSON.stringify({
            query: GET_USERDATA_PURCHASED_SUBSCRIPTIONS_BY_DATABASE_ID.loc?.source.body,
            variables: {
                id: `${databaseId}`,
            },
        }),
    });

    const { data, errors } = await response.json();

    if (errors) {
        throw generateWpPageError(errors)
    }

    const currentUserData: UserData = data?.userData || sampleUserData;
    return transformDataForWpUrl(currentUserData);
}


// this below is only used in the home page, not in the course slug page
export async function getCurrentUserDataFirstNameLastName(databaseId: number): Promise<UserData> {
    const response = await fetch(process.env.NEXT_PUBLIC_WORDPRESS_API_URL!, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
        },
        // next: {
        //     revalidate: 2
        // },
        // cache: "force-cache",
        cache: "no-store", // used instead of revalidate on jan 14 but before that it was no-cache 
        body: JSON.stringify({
            query: GET_USERDATA_FIRST_NAME_LAST_NAME_BY_DATABASE_ID.loc?.source.body,
            variables: {
                id: `${databaseId}`,
            },
        }),
    });

    const { data, errors } = await response.json();

    if (errors) {
        throw generateWpPageError(errors)
    }

    const userDataFirstLastName: UserData = data?.userData || sampleUserData;
    return transformDataForWpUrl(userDataFirstLastName);
}

export async function getCurrentUserDataAccessedCoursesBasic(databaseId: number): Promise<AccessedCourse[]> {
    const response = await fetch(process.env.NEXT_PUBLIC_WORDPRESS_API_URL!, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
        },
        next: {
            revalidate: 2
        },
        // cache: "force-cache",
        body: JSON.stringify({
            query: GET_USERDATA_ACCESSED_COURSES_BASIC_BY_DATABASE_ID.loc?.source.body,
            variables: {
                id: `${databaseId}`,
            },
        }),
    });

    const { data, errors } = await response.json();

    if (errors) {
        throw generateWpPageError(errors)
    }

    const accessedCourses: AccessedCourse[] = data?.userData?.userDataMetadata?.accessedcourses || [];
    return transformDataForWpUrl(accessedCourses);
}

// this below is only used in the home page, not in the course slug page
export async function getCurrentUserDataAccessedCoursesForYoutubeCourses(databaseId: number): Promise<AccessedCourse[]> {
    const response = await fetch(process.env.NEXT_PUBLIC_WORDPRESS_API_URL!, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
        },
        next: {
            revalidate: 2
        },
        // cache: "force-cache",
        body: JSON.stringify({
            query: GET_USERDATA_ACCESSED_COURSES_FOR_YOUTUBECARDS_BY_DATABASE_ID.loc?.source.body,
            variables: {
                id: `${databaseId}`,
            },
        }),
    });

    const { data, errors } = await response.json();

    if (errors && !data?.userData) {
        throw generateWpPageError(errors)
    }

    const accessedCourses: AccessedCourse[] = data?.userData?.userDataMetadata?.accessedcourses || [];
    return transformDataForWpUrl(accessedCourses);
}

// users purchsed courses as yt cards
export async function getCurrentUserDataPurchasedCoursesForYoutubeCourses(databaseId: number): Promise<Course[]> {
    const response = await fetch(process.env.NEXT_PUBLIC_WORDPRESS_API_URL!, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
        },
        next: {
            revalidate: 2
        },
        // cache: "force-cache",
        body: JSON.stringify({
            query: GET_USERDATA_PURCHASED_COURSES_FOR_YOUTUBECARDS_BY_DATABASE_ID.loc?.source.body,
            variables: {
                id: `${databaseId}`,
            },
        }),
    });

    const { data, errors } = await response.json();

    if (errors && !data?.userData) {
        throw generateWpPageError(errors)
    }

    const purchasedCourses: Course[] = data?.userData?.userDataMetadata?.purchasedcourses || [];
    return transformDataForWpUrl(purchasedCourses);
}

// users purchsed bundle courses as yt cards
export async function getCurrentUserDataPurchasedBundleCoursesForYoutubeCourses(databaseId: number): Promise<Course[]> {
    const response = await fetch(process.env.NEXT_PUBLIC_WORDPRESS_API_URL!, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
        },
        next: {
            revalidate: 2
        },
        // cache: "force-cache",
        body: JSON.stringify({
            query: GET_USERDATA_PURCHASED_BUNDLES_FOR_YOUTUBECARDS_BY_DATABASE_ID.loc?.source.body,
            variables: {
                id: `${databaseId}`,
            },
        }),
    });

    const { data, errors } = await response.json();

    if (errors && !data?.userData) {
        throw generateWpPageError(errors)
    }

    const purchasedBundles: CourseBundle[] = data?.userData?.userDataMetadata?.purchasedbundless || [];
    const purchasedBundleCourses: Course[] = purchasedBundles.flatMap(
        (courseBundle: CourseBundle) => courseBundle?.coursebundlemetadata?.coursesinbundle || []
    );
    return transformDataForWpUrl(purchasedBundleCourses);
}

// this is only on the home page
export async function getCurrentUserDataLikedEducatorsForEducatorCards(databaseId: number): Promise<UserData> {
    const response = await fetch(process.env.NEXT_PUBLIC_WORDPRESS_API_URL!, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
        },
        //   next:{
        //       revalidate: 2
        //   },
        // cache: "force-cache",
        //   cache: "no-store",
        next: {
            revalidate: 3
        },
        //   cache: "no-cache", // changed from no-store on jan 2
        // cache: "no-store", // brough back on jan 3 as no-cache was causing weird issues
        body: JSON.stringify({
            query: GET_USERDATA_LIKED_EDUCATORS_FOR_EDUCATORCARDS_BY_DATABASE_ID.loc?.source.body,
            variables: {
                id: `${databaseId}`,
            },
        }),
    });

    const { data, errors } = await response.json();

    if (errors && !data?.userData) {
        throw generateWpPageError(errors)
    }

    const currentUserData: UserData = data?.userData || sampleUserData;
    return transformDataForWpUrl(currentUserData);
}

// TO DO: might already have what we need in getCurrentUserDataAccessedCoursesForYoutubeCourses. this is in home page only so TO DO when we optimize home page
// do a refresh on the home page to get these
export async function getCurrentUserDataLikedCoursesForYoutubeCards(databaseId: number): Promise<UserData> {
    const response = await fetch(process.env.NEXT_PUBLIC_WORDPRESS_API_URL!, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
        },
        next: {
            revalidate: 2
        },
        // cache: "force-cache",
        //   cache: "no-store",
        //   cache: "no-cache", // changed from no-store on jan 2
        // cache: "no-store", // brough back on jan 3 as no-cache was causing weird issues
        body: JSON.stringify({
            query: GET_USERDATA_LIKED_COURSES_FOR_YOUTUBECARDS_BY_DATABASE_ID.loc?.source.body,
            variables: {
                id: `${databaseId}`,
            },
        }),
    });

    const { data, errors } = await response.json();

    if (errors && !data?.userData) {
        throw generateWpPageError(errors)
    }

    const currentUserData: UserData = data?.userData || sampleUserData;
    return transformDataForWpUrl(currentUserData);
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
        userid: ""
    },
};

// default trailer start time (promos always start from beginning)
export const trailerStartTime = 0;
// default theme color
export const themeColor = "#523D34";
// default fallback img
// export const fallbackImageSrc = transformWpUrl('https://cms.btcuniversity.com/wp-content/uploads/2023/10/trailer.png');
export const fallbackImageSrc = 'https://cms.btcuniversity.com/wp-content/uploads/2023/10/trailer.png';

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
// Checking subscription expiration date


export const Section = ({ title, cards }: { title: string, cards: JSX.Element[] }) => (
    <div>
        <div className="slider-container">
            <SH1Text
                text={title}
                className="!text-themeColor"
            />
            <div className="space-under-category-titles" />
        </div>
        <div className="flex overflow-x-auto space-x-4 slider-container">
            {cards}
        </div>
        <div className="space-between-categories" />
    </div>
);

export const createCourseCards = (courses: Course[]) => courses
    .map((course: Course) => (
        <CourseCard key={course.uri} course={course} />
    ));

// create cards for downloadables
// export const createActionCards = (downloadables: Downloadable[] = [], userDownloadableAccessLevel: string) => (downloadables ?? []).map(
//     (downloadable: Downloadable) => (
//         <ActionButtonPDFs
//             key={downloadable.databaseId}
//             text={downloadable?.title || ""}
//             link={downloadable?.downloadablemetadata?.downloadableFile?.mediaItemUrl || ""}
//             description={downloadable?.content || ""}
//             textColor={'black'}
//             borderColor={'black'}
//             // canDownload={userIsCurrentlySubscribed}
//             downloadableAccessLevel={downloadable?.downloadablemetadata?.accessLevel}
//             userDownloadableAccessLevel={userDownloadableAccessLevel}
//             isPurchasableALaCarte={false} // only needed for individual courses, not categories
//             isPurchasableOnlyALaCarte={false} // only needed for individual courses, not categories
//             downloadImage={downloadable?.downloadablemetadata?.downloadableImage?.mediaItemUrl || ""}
//             themecolor={themeColor}
//         />
//     )
// );
// above deprecared by mihai on feb 7 2024 and replaced with link action cards that take to the downloadables page
export const createActionCards = (downloadables: Downloadable[] = []) => (downloadables ?? []).map(
    (downloadable: Downloadable) => (
        <DownloadableCard
            key={downloadable.databaseId}
            slug={downloadable.slug}
            text={downloadable?.title || ""}
            link={downloadable?.downloadablemetadata?.downloadableFile?.mediaItemUrl || ""}
            description={downloadable?.content || ""}
            // canDownload={userIsCurrentlySubscribed}
            downloadImage={downloadable?.downloadablemetadata?.downloadableImage?.mediaItemUrl || ""}
            accessLevel={downloadable.downloadablemetadata.accessLevel}
            themecolor={themeColor}
        />
    )
);



