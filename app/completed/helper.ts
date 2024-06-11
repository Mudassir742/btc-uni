import { GET_USERDATA_ACCESSED_COURSES_FOR_CERTIFICATES_BY_DATABASE_ID } from "@/graphql/queries";
import { Brand, CourseDetailPicture } from "@/interfaces";
import { transformDataForWpUrl } from "@/utils/url";
import { generateWpPageError } from "@/utils/wpErrorHandling";

export async function getCertificates(id: number): Promise<AccessedCourse[] | null> {
    const response = await fetch(process.env.NEXT_PUBLIC_WORDPRESS_API_URL!, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
        },
        cache: "no-cache", // TO DO: maybe switch to no-store
        body: JSON.stringify({
            query: GET_USERDATA_ACCESSED_COURSES_FOR_CERTIFICATES_BY_DATABASE_ID.loc?.source.body,
            variables: { id }
        }),
    });

    const { data, errors } = await response.json();
    if (errors && !data?.userData) {
        throw generateWpPageError(errors)
    }

    const certificates: Data = data;
    return transformDataForWpUrl(certificates.userData.userDataMetadata.accessedcourses);
}


// --------------------------------------------------
// Interface
// --------------------------------------------------

interface CourseMetadata {
    youwilllearn: string;
    educators: Educator[];
    brandCertificateLogo?: {
        title: string,
        sourceUrl: string,
    };
    courseBrands?: Brand[] | undefined,
    courseDetailPicture: CourseDetailPicture;
    vimeoid: {
        chapter: string
    }[]
}

interface Educator {
    databaseId: number;
    educatorMetaData: EducatorMetaData;
}

interface EducatorMetaData {
    firstname: string;
    lastname: string;
    instahandle: string;
    educatorpicture: MediaItem;
}

interface MediaItem {
    mediaItemUrl: string;
}

interface BelongsToCourse {
    databaseId: number;
    content: string
    title: string;
    courseMetadata: CourseMetadata;
}

export interface AccessedCourseMetadata {
    completiondate: string;
    belongstocourse: BelongsToCourse;
}

export interface AccessedCourse {
    isCompleted: boolean;
    accessedcoursemetadata: AccessedCourseMetadata;
}

interface UserDataMetadata {
    accessedcourses: AccessedCourse[];
}

interface UserData {
    userDataMetadata: UserDataMetadata;
}

interface Data {
    userData: UserData;
}

interface RootObject {
    data: Data;
}

