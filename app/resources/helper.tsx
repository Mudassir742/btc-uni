import { GET_ALL_UPCOMING_COURSES, GET_COURSE_BY_SLUG, GET_RANDOM_COURSES_BY_CATEGORY, GET_USERDATA_BY_DATABASE_ID, GET_RANDOM_COURSES_BY_TAG, GET_RANDOM_DOWNLOADABLES, GET_USERDATA_GOOGLE_ANALYTICS_DATA_BY_ID, GET_DOWNLOADABLES_BY_TAG, GET_DOWNLOADABLE_BY_SLUG_FOR_DOWNLOADABLE_SLUG_PAGE_METADATA } from "@/graphql/queries";
import { GET_COURSE_BY_SLUG_ALL, GET_COURSE_BY_SLUG_BASICS, GET_COURSE_BY_SLUG_BASICS_AND_LEVEL, GET_COURSE_BY_SLUG_BEFORE_AND_AFTER, GET_COURSE_BY_SLUG_CATEGORIES, GET_COURSE_BY_SLUG_CHAPTERS, GET_COURSE_BY_SLUG_DESCRIPTION, GET_COURSE_BY_SLUG_DOWNLOADABLES, GET_COURSE_BY_SLUG_EDUCATORS_AND_THEIR_COURSES, GET_COURSE_BY_SLUG_EDUCATORS_BASIC, GET_COURSE_BY_SLUG_EXTRAS_COURSE_HERO, GET_COURSE_BY_SLUG_EXTRAS_COURSE_HERO_STICKY, GET_COURSE_BY_SLUG_HIGHLIGHTS, GET_COURSE_BY_SLUG_ID, GET_COURSE_BY_SLUG_METADATA, GET_COURSE_BY_SLUG_PART_OF_SERIES, GET_COURSE_BY_SLUG_RELATED_COURSES, GET_COURSE_BY_SLUG_SUBSCRIPTION_DATA, GET_COURSE_BY_SLUG_TAGS, GET_COURSE_BY_SLUG_TESTIMONIALS, GET_COURSE_BY_SLUG_USED_PRODUCTS, GET_COURSE_BY_SLUG_WHATS_INCLUDED, GET_COURSE_BY_SLUG_YOU_WILL_LEARN, GET_DOWNLOADABLE_BY_SLUG_ALL } from "@/graphql/queries/courseSlugPage";
import { GET_ALL_RESOURCES_SLUG } from "@/graphql/queries/downloadables";
import {
    GET_USERDATA_ACCESSED_COURSES_BASIC_BY_DATABASE_ID, GET_USERDATA_COURSE_SLUG_PAGE, GET_USERDATA_ACCESSED_COURSES_EXTENDED_COURSE_HERO_BY_DATABASE_ID, GET_USERDATA_LIKED_COURSES_BY_DATABASE_ID, GET_USERDATA_PURCHASED_BUNDLES_BY_DATABASE_ID, GET_USERDATA_PURCHASED_COURSES_BY_DATABASE_ID, GET_USERDATA_PURCHASED_SUBSCRIPTIONS_BY_DATABASE_ID, GET_USERDATA_FIRST_NAME_LAST_NAME_BY_DATABASE_ID, GET_USERDATA_ACCESSED_COURSES_FOR_YOUTUBECARDS_BY_DATABASE_ID, GET_USERDATA_LIKED_COURSES_FOR_YOUTUBECARDS_BY_DATABASE_ID, GET_USERDATA_LIKED_EDUCATORS_FOR_EDUCATORCARDS_BY_DATABASE_ID,
    // GET_USERDATA_TESTIMONIALS_COURSE_HERO_BY_DATABASE_ID 
} from "@/graphql/queries/userData";
import { AccessedCourse, Category, Tag, Course, Testimonial, UserData, UserSession, CourseChapter, Downloadable } from "@/interfaces";
import { transformDataForWpUrl, transformWpUrl } from "@/utils/url";
import { generateWpPageError } from "@/utils/wpErrorHandling";

export async function getResourceSlug(): Promise<string[]> {
    try {
      const response = await fetch(process.env.NEXT_PUBLIC_WORDPRESS_API_URL!, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          query: GET_ALL_RESOURCES_SLUG.loc?.source.body,
        }),
      });
  
      const { data, errors } = await response.json();
      if (errors) {
        throw generateWpPageError(errors);
      }
  
      const resourceNodes = data?.downloadables?.nodes;
  
      if (!Array.isArray(resourceNodes)) {
        throw new Error("Invalid resource data format");
      }
  
      const resourceSlugs: string[] = resourceNodes.map((resource: Course) => {
        return resource?.slug || ""; // Assuming 'slug' property exists on each course object
      });
      return resourceSlugs; // Filter out any empty or undefined slugs
    } catch (error) {
      console.error("Error fetching course bundle slugs:", error);
      throw error; // Rethrow the error to be handled by the caller
    }
  }

export async function getDownloadableAll(params: { slug: string }): Promise<Downloadable> {
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
            query: GET_DOWNLOADABLE_BY_SLUG_ALL.loc?.source.body,
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
    const downloadable: Downloadable = data?.downloadable;
    return transformDataForWpUrl(downloadable);
}

export function extractDownloadableAll(downloadableData: Downloadable) {
    return {
        title: downloadableData?.title || "",
        content: downloadableData?.content || "",
        databaseId: downloadableData?.databaseId || 0,
        downloadableVerticalPicture: downloadableData?.downloadablemetadata?.downloadableImage?.mediaItemUrl || "",
        downloadableHorizontalPicture: downloadableData?.downloadablemetadata?.downloadableHorizontalImage?.mediaItemUrl || "",
        downloadableFile:  downloadableData?.downloadablemetadata?.downloadableFile?.mediaItemUrl || "",
        downloadableAccessLevel:  downloadableData?.downloadablemetadata?.accessLevel || "",
        relatedDownloadables: downloadableData?.downloadablemetadata?.relatedDownloadables || [],
        tags: downloadableData?.tags?.nodes || [],
    };
}

export async function getDownloadableMetadata(params: { slug: string }): Promise<Downloadable> {
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
            query: GET_DOWNLOADABLE_BY_SLUG_FOR_DOWNLOADABLE_SLUG_PAGE_METADATA.loc?.source.body,
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
    const downloadable: Downloadable = data?.downloadable;
    return transformDataForWpUrl(downloadable);
}


export async function getDownloadablesByTag(tag: string): Promise<Downloadable[]> {
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
            query: GET_DOWNLOADABLES_BY_TAG.loc?.source.body,
            variables: {
                tag: `${tag}`,
            },
        }),
    });

    const { data, errors } = await response.json();

    if (errors) {
        throw generateWpPageError(errors)
    }

    // const client = getClient();
    const downloadables: Downloadable[] = data?.downloadables?.nodes;
    return transformDataForWpUrl(downloadables);
}

// this below is mandatory no-store for purchases
export async function getCurrentUserDataPurchasedSubscriptions(databaseId: number): Promise<UserData> {
    const response = await fetch(process.env.NEXT_PUBLIC_WORDPRESS_API_URL!, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
        },
        // cache: "no-cache", // this was already no-cache on jan 2, just commented out empty next section
        next: {
            revalidate: 2
        },
        // MAJOR UPDATE Jan 15 -- above works when loading the course slug page and doing the router refresh improv
        // cache: "no-store", // brough back on jan 3 as no-cache was causing weird issues
        // next: {

        // },
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

// User Data for GA Data Layer
export async function getUserGAData(databaseId: number): Promise<UserData> {
    const response = await fetch(process.env.NEXT_PUBLIC_WORDPRESS_API_URL!, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
        },
        // cache: "no-cache", // this was already no-cache on jan 2, just commented out empty next section
        next: {
            revalidate: 2
        },
        // MAJOR UPDATE Jan 15 -- above works when loading the course slug page and doing the router refresh improv
        // cache: "no-store", // brough back on jan 3 as no-cache was causing weird issues
        // next: {

        // },
        body: JSON.stringify({
            query: GET_USERDATA_GOOGLE_ANALYTICS_DATA_BY_ID.loc?.source.body,
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

// suggested downloads in case there are no assigned related downloads
export async function getRandomDownloadables(): Promise<Downloadable[]> {
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
            query: GET_RANDOM_DOWNLOADABLES.loc?.source.body,
            variables: {
                count: 30
            },
        }),
    });

    const { data, errors } = await response.json();

    if (errors) {
        throw generateWpPageError(errors)
    }

    // const client = getClient();
    const downloadables: [Downloadable] = (data.downloadables.nodes);
    return transformDataForWpUrl(downloadables);
}

// function to format the course launch date
export function extractDate(dateTimeStr: string) {
    return dateTimeStr.split(' ')[0];
}

// function to generate random downloadables if no chosen related downloadables
// Fisher-Yates shuffle function to randomize an array
export function shuffleArray<T>(array: T[]): T[] {
    const shuffledArray = [...array];
    for (let i = shuffledArray.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffledArray[i], shuffledArray[j]] = [shuffledArray[j], shuffledArray[i]];
    }
    return shuffledArray;
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



export const getLikedCourses = (currentUserData: UserData) => {
    return currentUserData?.userDataMetadata?.likedCourses || [];
}

// Checking if this course is part of accessed courses
export const hasUserCompletedCourse = (courseId: number, userDataAccessedCourses: AccessedCourse[]) =>
    userDataAccessedCourses.some(accessedCourse =>
        accessedCourse.accessedcoursemetadata.courseid === courseId &&
        accessedCourse.isCompleted === true
    );


// Formatting date to US format
export function formatDate(dateString: string): string {
    const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'long', day: 'numeric' };
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', options);
}