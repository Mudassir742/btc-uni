import { GET_ALL_UPCOMING_COURSES, GET_COURSE_BY_SLUG, GET_USERDATA_BY_DATABASE_ID } from "@/graphql/queries";
import { Course, UserData, UserSession } from "@/interfaces";
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
        next:{
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
        next:{
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
    };
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


//  AFTER LAUNCH: when we add sub tiers, replace purchasedsubscriptions[currentUserData.userDataMetadata.purchasedsubscriptions.length - 1] with more complex code, as users might purchase multiple subscriptions that are concurrently valid
// Calculate one day before today and one day after today
export const oneDayBeforeToday = new Date(today);
oneDayBeforeToday.setDate(today.getDate() - 1);
export const oneDayAfterToday = new Date(today);
oneDayAfterToday.setDate(today.getDate() + 1);


