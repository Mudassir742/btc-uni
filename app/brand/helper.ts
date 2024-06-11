import { GET_ALL_BRANDS_PRODUCTS, GET_ALL_BRAND_COURSE, GET_ALL_BRAND_TIPS, GET_ALL_UPCOMING_COURSES, GET_BRAND_BIO, GET_BRAND_HERO, GET_COURSE_BY_SLUG, GET_USERDATA_BY_DATABASE_ID } from "@/graphql/queries";
import { GET_EDUCATOR_BY_SLUG_FOR_EDU_SLUG_PAGE, GET_EDUCATOR_BY_SLUG_FOR_EDU_SLUG_PAGE_METADATA } from "@/graphql/queries/educatorSlugPage";
import { GET_ALL_DOWNLOADABLES, GET_ALL_TIPS } from "@/graphql/queries/homePage";
import { GET_USERDATA_EDUCATOR_SLUG_PAGE, GET_USERDATA_LIKED_EDUCATORS_BY_DATABASE_ID, GET_USERDATA_PURCHASED_SUBSCRIPTIONS_BY_DATABASE_ID } from "@/graphql/queries/userData";
import { Brand, Course, Downloadable, Educator, Tip, UsedProduct, UserData, UserSession } from "@/interfaces";
import { transformDataForWpUrl, transformWpUrl } from "@/utils/url";
import { generateWpPageError } from "@/utils/wpErrorHandling";
import DownloadableCard from "@/components/DownloadableCard";

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

export async function getCurrentUserDataLikedEducators(databaseId: number): Promise<UserData> {
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
        //   cache: "no-cache", // changed from no-store on jan 2
        cache: "no-store", // brough back on jan 3 as no-cache was causing weird issues
        body: JSON.stringify({
            query: GET_USERDATA_LIKED_EDUCATORS_BY_DATABASE_ID.loc?.source.body,
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

export async function getCurrentUserDataEducatorSlugPage(databaseId: number): Promise<UserData> {
    const response = await fetch(process.env.NEXT_PUBLIC_WORDPRESS_API_URL!, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
        },
        // next:{
        //     revalidate: 2
        // },
        // cache: "force-cache",
        // cache: "no-store",
        // cache: "no-cache", // changed from no-store on jan 2
        cache: "no-store", // brough back on jan 3 as no-cache was causing weird issues
        body: JSON.stringify({
            query: GET_USERDATA_EDUCATOR_SLUG_PAGE.loc?.source.body,
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

export function extractCurrentUserDataForEducatorSlugPageAll(userData: UserData) {
    return {
        accessedCourses: userData?.userDataMetadata?.accessedcourses || []
    };
}

export async function getEducatorMetadata(params: { slug: string }): Promise<Educator> {
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
            query: GET_EDUCATOR_BY_SLUG_FOR_EDU_SLUG_PAGE_METADATA.loc?.source.body,
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
    const educator: Educator = data?.educator;
    return transformDataForWpUrl(educator);
}

export async function getEducatorAll(params: { slug: string }): Promise<Educator> {
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
            query: GET_EDUCATOR_BY_SLUG_FOR_EDU_SLUG_PAGE.loc?.source.body,
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
    const educator: Educator = data?.educator;
    return transformDataForWpUrl(educator);
}

export async function getBrandAll(params: { slug: string }): Promise<Brand[]> {
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
            query: GET_ALL_BRAND_COURSE.loc?.source.body,
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
    const educator: Brand[] = data.brands.nodes;
    return transformDataForWpUrl(educator);
}

export async function getBrandHero(id: string) {
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
            query: GET_BRAND_HERO.loc?.source.body,
            variables: {
                id: `${id}`,
            },
        }),
    });

    const { data, errors } = await response.json();

    if (errors) {
        throw generateWpPageError(errors)
    }

    // const client = getClient();
    const brand: Brand = data.brand;
    return transformDataForWpUrl(brand);
}

export async function getAllTips(): Promise<Tip[]> {
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
            query: GET_ALL_TIPS.loc?.source.body,

        }),
    });

    const { data, errors } = await response.json();

    // if (errors) {
    //     throw generateWpPageError(errors)
    // }
    // removed temporarily by Mihai on March 6 2024 as there are missing courses and educators which would give an error but also give the query results

    // const client = getClient();
    const tips: [Tip] = (data.tips.nodes);
    return transformDataForWpUrl(tips);
}

export async function getAllBrand(): Promise<Brand[]> {
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
            query: GET_ALL_BRAND_TIPS.loc?.source.body,

        }),
    });

    const { data, errors } = await response.json();
    const Brand: [Brand] = (data.brands.nodes);
    return transformDataForWpUrl(Brand);
}

export async function getAllDownloadables(): Promise<Downloadable[]> {
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
            query: GET_ALL_DOWNLOADABLES.loc?.source.body,

        }),
    });

    const { data, errors } = await response.json();

    // if (errors) {
    //     throw generateWpPageError(errors)
    // }
    // removed temporarily by Mihai on March 6 2024 as there are missing courses and educators which would give an error but also give the query results

    // const client = getClient();
    const downloadables: [Downloadable] = (data?.downloadables?.nodes);
    return transformDataForWpUrl(downloadables);
}

export async function getAllBrandProductUsed(): Promise<Brand[]> {
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
            query: GET_ALL_BRANDS_PRODUCTS.loc?.source.body,

        }),
    });
    const { data, errors } = await response.json();
    const downloadables: [Brand] = (data?.brands?.nodes);
    return transformDataForWpUrl(downloadables);
}

export async function getBrandBio(id: string): Promise<Brand> {
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
            query: GET_BRAND_BIO.loc?.source.body,
            variables: {
                id: `${id}`,
            },
        }),
    });
    const { data, errors } = await response.json();
    const brandBio: Brand = (data?.brand);
    return transformDataForWpUrl(brandBio);
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

export function extractEducatorAll(educatorData: Educator) {
    return {
        educatorId: educatorData?.databaseId,
        educatorTitle: educatorData?.title || "",
        educatorSlug: educatorData?.slug || "",
        educatorContent: educatorData?.content || "",
        educatorFirstName: educatorData?.educatorMetaData?.firstname || "",
        educatorLastName: educatorData?.educatorMetaData?.lastname || "",
        educatorInstaHandle: educatorData?.educatorMetaData?.instahandle || "",
        // educatorPictureUrl: educatorData?.educatorMetaData?.educatorpicture?.mediaItemUrl || transformWpUrl("https://cms.btcuniversity.com/wp-content/uploads/2023/07/placeholder-profile-sq.jpg"),
        educatorPictureUrl: educatorData?.educatorMetaData?.educatorpicture?.mediaItemUrl || "https://cms.btcuniversity.com/wp-content/uploads/2023/07/placeholder-profile-sq.jpg",
        educatorCourses: educatorData?.educatorMetaData?.courses || [],
        educatorTestimonials: educatorData?.educatorMetaData?.educatortestimonials || [],
    };
};

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
        numberOfEpisodesInSeries: (courseData?.courseMetadata?.partofseries || []).length,
        series: ((courseData?.courseMetadata?.partofseries || []).length) + ' parts',
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
        releasedate: courseData?.courseMetadata?.releasedate || "",
        scheduledreleasedate: courseData?.courseMetadata?.scheduledreleasedate || "",
    };
};





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
