import { IronSession } from "iron-session";

export interface Author {
    node: {
        firstName: string;
        lastName: string;
    };
}

export interface Post {
    title: string;
    content: string;
    uri: string;
    author: Author;
    date: string;
}

export interface ButtonProps {
    text: string;
    link: string;
}

// export interface CourseBasics {
//     title: string;
//     date: string;
//     content: string;
//     databaseId: number;
//     isLive: boolean;
//     isPartOfSubscription: boolean;
//     isAvailableOnlyALaCarte: boolean;
//     isPurchasableALaCarte: boolean;
//     isPartOfBundle: boolean;
//     willBeLive: boolean;
//     id?: string;
//     uri: string;
//     slug: string;
//     tags: Tags;
//     categories: Categories;
// }

// export interface CourseTagsAndCategories {
//     tags: Tags;
//     categories: Categories;
// }

// export interface CourseMetaBasics {
//     courseMetadata: CourseMetadataBasics;
// }

// export interface CourseMetaFormulas {
//     courseMetadata: CourseMetadataFormulas;
// }

// export interface CourseMetaBeforeAndAfter {
//     courseMetadata: CourseMetadataBeforeAndAfter;
// }
// export interface CourseMetaCourseHighlight {
//     courseMetadata: CourseMetadataCourseHighlight;
// }

// export interface CourseMetaTestimonial {
//     courseMetadata: CourseMetadataTestimonial;
// }

// export interface CourseMetaCourseChapter {
//     courseMetadata: CourseMetadataCourseChapter;
// }

// export interface CourseMetaRelatedCourses {
//     courseMetadata: CourseMetadataRelatedCourses;
// }

// export interface CourseMetaVimeoIds {
//     courseMetadata: CourseMetadataVimeoIds;
// }

// export interface CourseMetaEducators {
//     courseMetadata: CourseMetadataEducators;
// }

// export interface CourseMetaSeries {
//     courseMetadata: CourseMetadataSeries;
// }

// export interface CourseMetaProductsUsed {
//     courseMetadata: CourseMetadataProductsUsed;
// }

// export interface CourseMetaDownloadables {
//     courseMetadata: CourseMetadataDownloadables;
// }

// export interface CourseMetaNewCourseHighlight {
//     courseMetadata: CourseMetadataNewCourseHighlight;
// }

// export interface CourseMetadataBasics {
//     subscriptiontier: number;
//     courseThumbnailPicture: CourseThumbnailPicture;
//     courseDetailPicture: CourseDetailPicture;
//     youwilllearn: string;
//     vimeoPromoId: string;
//     coursemetatitle: string;
//     coursemetadescription: string;
//     courseDuration: string;
//     averageRating: number;
//     noOfTestimonials: number;
//     courseHeroDescription: string;
//     price: number;
//     courselevel: string;
//     episodenumber: number;
//     releasedate: string;
//     scheduledreleasedate: string;
//     courseImportance: number;
// }

// export interface CourseMetadataFormulas {
//     formulas: string;
// }

// export interface CourseMetadataBeforeAndAfter {
//     beforeandafter: BeforeAndAfter[];
// }

// export interface CourseMetadataCourseHighlight {
//     courseHighlights: CourseHighlight[];
// }

// export interface CourseMetadataTestimonial {
//     courseTestimonialsNew: Testimonial[];
// }

// export interface CourseMetadataCourseChapter {
//     courseChapters: CourseChapter[];
// }

// export interface CourseMetadataRelatedCourses {
//     relatedcourses: Course[];
// }

// export interface CourseMetadataVimeoIds {
//     vimeoid: VimeoId[];
// }

// export interface CourseMetadataEducators {
//     educators: Educator[];
// }

// export interface CourseMetadataSeries {
//     partofseries: CourseSeries[];
// }

// export interface CourseMetadataProductsUsed {
//     productsUsed: UsedProduct[];
// }

// export interface CourseMetadataDownloadables {
//     downloadables: Downloadable[];
// }

// export interface CourseMetadataNewCourseHighlight {
//     newCourseHighlights: NewCourseHighlight[];
// }


export interface Course {
    title: string;
    date: string;
    content: string;
    databaseId: number;
    isLive: boolean;
    isPartOfSubscription: boolean;
    isAvailableOnlyALaCarte: boolean;
    isPurchasableALaCarte: boolean;
    isPartOfBundle: boolean;
    willBeLive: boolean;
    isPartOfSeries: boolean;
    id?: string;
    courseMetadata: CourseMetadata;
    uri: string;
    slug: string;
    tags: Tags;
    categories: Categories;
}

export interface CourseMetadata {
    subscriptiontier: number;
    stripeId?: string;
    //thumbnailpictures: ThumbnailPicture[];
    courseThumbnailPicture: CourseThumbnailPicture;
    courseDetailPicture: CourseDetailPicture;
    beforeandafter: BeforeAndAfter[];
    courseHighlights: CourseHighlight[];
    courseTestimonialsNew: Testimonial[];
    courseChapters: CourseChapter[];
    youwilllearn: string;
    relatedcourses: Course[];
    vimeoPromoId: string;
    vimeoid: VimeoId[];
    educators: Educator[];
    formulas: string;
    coursemetatitle: string;
    coursemetadescription: string;
    courseDuration: string;
    averageRating: number;
    noOfTestimonials: number;
    courseHeroDescription: string;
    price: number;
    courselevel: string;
    episodenumber: number;
    partofseries: CourseSeries[];
    productsUsed: UsedProduct[];
    // downloadables: Downloadable[];
    newDownloadables: Downloadable[];
    releasedate: string;
    scheduledreleasedate: string;
    courseImportance: number;
    newCourseHighlights: NewCourseHighlight[];
    courseBrands?: Brand[];
    brandCertificateLogo?: {
        title: string,
        url: string,
    },
}

export interface UsedProductMetadata {
    brandName: string;
    externalLink: string;
    price: number;
    productpictures: ProductPicture[];
}
export interface UsedProduct {
    id: string;
    title: string;
    usedproductmetadata: UsedProductMetadata;
}
export interface Downloadable {
    databaseId: number;
    slug: string;
    title: string;
    content: string;
    downloadablemetadata: DownloadableMetadata;
    tags: Tags;
}
export interface DownloadableMetadata {
    downloadableFile: DownloadableFile;
    downloadableImage: DownloadableImage;
    downloadableEducators: Educator[];
    downloadableBrands?: Brand[];
    downloadableHorizontalImage: DownloadableHorizontalImage;
    relatedDownloadables: Downloadable[];
    accessLevel: string;
    metaTitle: string;
    metaDescription: string;
}
export interface DownloadableFile {
    mediaItemUrl: string;
}
export interface DownloadableImage {
    mediaItemUrl: string;
}
export interface DownloadableHorizontalImage {
    mediaItemUrl: string;
}

export interface ProductPicture {
    mediaItemUrl: string;
}

export interface VimeoId {
    chapter?: string;
}

export interface Tags {
    nodes: Tag[];
}

export interface Tag {
    name: string;
    slug: string;
}

export interface Categories {
    nodes: Category[];
}

export interface Category {
    name: string;
    slug: string;
}


export interface FullCourse {
    title: string;
}
export interface CourseThumbnailPicture {
    mediaItemUrl: string;
}
export interface CourseDetailPicture {
    mediaItemUrl: string;
}

export interface BeforeAndAfter {
    mediaItemUrl: string;
}
export interface CourseHighlight {
    mediaItemUrl: string;
}

// the new course highlights are actually videos
export interface NewCourseHighlight {
    highlightDescription: string;
    videoId: string;
}

export interface CourseChapter {
    chapterDuration: string;
    chapterName: string;
    chapterStartsAt: string;
    fieldGroupName: string;
}

export interface CourseChapter {
    chapterDuration: string;
    chapterName: string;
    chapterStartsAt: string;
    fieldGroupName: string;
}
export interface TestimonialMetadata {
    firstname: string;
    lastname: string;
    rating: number;
    timestamp: string;
    userid: string;
    educatorid: string;
    educatorrating: number;
    educatorratingcontent: string;
    // contentrating: number; DEPRECATED
    // contentratingcontent: string; DEPRECATED
    difficultyRating: string;
    // courseid: string; DEPRECATED, not needed on the front end
}
export interface Testimonial {
    content: string;
    date: string;
    testimonialMetadata: TestimonialMetadata;
    status: string;
}
export interface User {
    firstname: string;
    lastname: string;
}
// export interface CourseNode {
//     id: string;
//     title: string;
//     slug: string;
//     uri: string;
//     courseMetadata: CourseMetadata;
// }

// export interface CourseEdge {
//     node: CourseNode;
// }

// export interface HaircuttingShagsData {
//     courses: {
//         edges: CourseEdge[];
//     };
// }
export interface MediaItem {
    mediaItemUrl: string;
}

// Educator page
// export interface EducatorMetaDataNew {
//     firstname: string;
//     lastname: string;
//     instahandle: string;
//     educatorpicture: MediaItem;
// }

// export interface EducatorNew {
//     id: string;
//     slug: string;
//     educatorMetaData: EducatorMetaDataNew;
// }

export interface EducatorGroup {
    // educator: EducatorNew;
    educator: Educator;
}

export interface EducatorCategory {
    name: string;
}

export interface TagBlockNew {
    educatorCategory: {
        name: string;
    };
    educatorGroup: EducatorGroup[];
}

export interface EducatorsPage {
    tagBlockNew: TagBlockNew[];
}

export interface Page {
    educatorsPage: EducatorsPage;
    categoryPageMetadata: CategoryPageMetadata;
}

// Categories page
export interface CategoryBlock {
    courseSpotlight: Course;
    category: {
        name: string;
    };
    desktopImage: {
        mediaItemUrl: string;
    };
    mobileImage: {
        mediaItemUrl: string;
    };
    subtitle: string;
    title: string;
    video: string;
    tips: Tip[];
    specialReviews: SpecialReview[];
}

export interface Tip {
    databaseId: number;
    title: string;
    tipmetadata: TipMetadata;
}
export interface TipMetadata {
    isTipSponsoredByTheBrand: true | null
    video: string;
    tipCourse: Course;
    tipEducator: Educator[];
    tipBrands?: Brand[];
}

export interface SpecialReview {
    content: string;
    reviewerName: string;
}

export interface CategoryPage {
    categoryBlock: CategoryBlock[];
}

export interface CategoriesPage {
    categoriesPage: CategoryPage;
}
// end of Categories Page

// New Category Page Interfaces as of Dec 4
export interface CategoryPageBasics {
    title: string;
    subtitle: string;
    video: string;
    category: {
        name: string;
    };
    desktopImage: {
        mediaItemUrl: string;
    };
    mobileImage: {
        mediaItemUrl: string;
    };
    externalLink: string;
}
export interface CategoryPageDownloadables {
    // categoryDownloadables: Downloadable[];
    newCategoryDownloadables: Downloadable[];
    externalLink: string;
}
export interface CategoryPageTips {
    // tips: Tip[];
    newTips: Tip[];
    externalLink: string;
}

export interface HomePageDownloadablesAndTips {
    downloadables: Downloadable[];
    tips: Tip[];
}
export interface HomePageDownloadables {
    downloadables: Downloadable[];
}
export interface HomePageTips {
    tips: Tip[];
}

export interface CategoryPageSpotlight {
    courseSpotlight: Course;
    specialReviewsForCourseSpotlight: SpecialReview[];
    externalLink: string;
}
export interface CategoryPageEducators {
    categoryEducators: Educator[];
    externalLink: string;
}

export interface CategoryPageMetadata {
    featuredImage: {
        node: {
            mediaItemUrl: string;
        }
    };
    categoryPage: {
        metaTitle: string;
        metaDescription: string;
    };
}

export interface Educator {
    content: string;
    title: string;
    educatorMetaData: EducatorMetaData;
    uri: string;
    slug: string;
    databaseId: number;
}

export interface EducatorMetaData {
    educatorjobtitle: string;
    educatortype: string;
    educatorpicture: Thumbnail;
    careerslink: string;
    courses: Course[];
    topartistlevel: string;
    instahandle: string;
    facebookaccount: string;
    twitterhandle: string;
    pinteresthandle: string;
    youtubeusername: string;
    othersociallink: string;
    othersociallink2: string;
    othersociallink3: string;
    educatoremail: string;
    educatorwebsite: string;
    educatorwebsitetext: string;
    relatededucators: string;
    firstname: string;
    lastname: string;
    testimonials: Testimonial[];
    educatortestimonials: Testimonial[];
    shortBio: string;
}

export interface EducatorAndTheirCourses {
    educator: Educator;
    numberOfCourses: number;
}

export interface Thumbnail {
    mediaItemUrl: string;
}

export interface ArcScissor {
    node: {
        title: string;
        description: string;
    };
}

export interface AccessedCourse {
    title: string;
    databaseId: number;
    accessedcoursemetadata: AccessedCourseMetaData;
    uri: string;
    slug: string;
    isFavorited: boolean;
    wantToWatch: boolean;
    registeredToCourse: boolean;
    addedToCalendar: boolean;
    watchedTrailer: boolean;
    isCompleted: boolean;
    isNotStarted: boolean;
    isStarted: boolean;
    hasPostedTestimonial: boolean;
}

export interface AccessedCourseMetaData {
    userid: number;
    courseid: number;
    startdate: string;
    status: string;
    endTime: number;
    endedAtChapter: number;
    belongstocourse: Course;
    coursenotes: string;
    courseNotesLastSavedOn: string;
    // videoplays: VideoPlay;
}

export interface VideoPlay {
    databaseId: string;
    isLastPart: boolean;
    isLive: boolean;
    isCompleted: boolean;
    videoplaymetadata: VideoPlayMetadata;
}

export interface VideoPlayMetadata {
    startedatchapter: number;
    endedatchapter: number;
    starttime: number;
    endtime: number;
    part: number;
    iscompletednew: boolean;
    userid: string;
    courseid: string;
}

export interface UserData {
    title: string;
    databaseId: number;
    userDataMetadata: UserDataMetadata;
}

export interface UserDataMetadata {
    fullname: string;
    firstname: string;
    lastname: string;
    emailaddress: string;
    accessedcourses: AccessedCourse[];
    purchasedcourses: Course[];
    purchasedbundless: CourseBundle[];
    purchasedsubscriptions: Subscription[];
    likedCourses: Course[];
    likedBundles: CourseBundle[];
    likededucators: Educator[];
    zipcode: string;
    city: string;
    country: string;
    state: string;
    userid: string;
    // answeredquizes: AnsweredQuiz[];
}

export interface AnsweredQuiz {
    databaseId: string;
    isCompleted: boolean;
    answeredquizmetadata: AnsweredQuizMetaData;
}

export interface AnsweredQuizMetaData {
    quiz: Quiz;
}

export interface Quiz {
    databaseId: string;
    quizmetadata: QuizMetaData;
}

export interface QuizMetaData {
    courseId: string;
}

export interface Subscription {
    subscriptionMetadata: SubscriptionMetadata;
}

export interface SubscriptionMetadata {
    paymentStatus: string;
    upcomingsubscriptionid: string;
    subscriptionstartson: string;
    subscriptionexpireson: string;
    subscriptionrenewson: string;
    subscriptiontype: SubscriptionType;
}

export interface SubscriptionType {
    id: string;
    databaseId: number;
    title: string;
    subscriptionTypeMetadata: SubscriptionTypeMetaData;
}

export interface SubscriptionTypeMetaData {
    tier: number;
}

export enum LoginProviderEnum {
    Password = "PASSWORD",
    Google = "GOOGLE",
    Facebook = "FACEBOOK",
    Instagram = "INSTAGRAM",
}

export type LoginInput = {} & (
    | {
        provider: LoginProviderEnum.Password;
        credentials?: {
            username: string;
            password: string;
        };
    }
    | {
        provider: LoginProviderEnum.Google | LoginProviderEnum.Facebook | LoginProviderEnum.Instagram;
        oauthResponse?: {
            code: string;
            state?: string;
        };
    }
);

export type Address = {
    country: string;
    state: string;
    city: string;
    address1: string;
    address2?: string;
    zipcode: string;
    __typename?: string;
};

export type SignupInput = {
    email: string;
    username: string;
    is_verified: boolean;
};

export interface UserSession {
    isLoggedIn: boolean;
    authToken?: string;
    refreshToken?: string;
    userDataId?: number;
    stripe: {
        cus_id: string;
    };
    userData?: {
        userDatas: IWPUserData
        databaseId?: number;
        name?: string;
        email?: string;
        isVerified?: boolean;
    };
}

export interface IWPUserData {
    edges: {
        node: {
            databaseId: number;
        }
    }[]
}

export interface RegisterUser {
    userData: {
        databaseId: number;
        name: string;
        email: string;
        isVerified: boolean;
        auth: {
            authToken: string;
            refreshToken: string;
        };
    };
}

export interface IUserSession extends IronSession {
    user: UserSession;
}

export interface IAuthProvidersQueryResponse {
    loginClients: ILoginClient[];
}

export interface ILoginClient {
    authorizationUrl: string;
    name: string;
    clientId: string;
    isEnabled: boolean;
    stripe: {
        cus_id: string;
    };
}

export type AuthSource = "login" | "signup";

export interface IGetAll<nodes> {
    data: {
        subscriptionTypes: {
            __typename: string;
            nodes: nodes[];
        };
    };
}

export interface ISubscriptionType {
    __typename: string;
    title: string;
    id: string;
    subscriptionTypeMetadata: {
        __typename: string;
        price: number;
        duration: string;
    };
}


// master classes aka bundles


export interface CourseBundle {
    title: string;
    content: string;
    databaseId: number;
    id?: string;
    coursebundlemetadata: CourseBundleMetadata;
    uri: string;
    slug: string;
    categories: Categories;
    tags: Tags;
}

export interface CourseBundleMetadata {
    actualprice: number;
    thumbnailPicture: CourseThumbnailPicture;
    bundleimage: CourseDetailPicture;
    coursesinbundle: Course[];
    collectionDownloadables: Downloadable[];
}

// course series (different from bundles)

export interface CourseSeries {
    title: string;
    content: string;
    databaseId: number;
    id?: string;
    courseSeriesMetadata: CourseSeriesMetadata;
    uri: string;
    slug: string;
    categories: Categories;
    tags: Tags;
}

export interface CourseSeriesMetadata {
    coursesinseries: Course[];
}

export interface ICountry {
    "name": string,
    "country_code": string
}

export interface IState {
    "id": number,
    "name": string,
    "state_code": string,
    "country_code": string
}

export interface PurchasedCourse {
    course: {
        title: string;
        isPurchasableALaCarte: boolean;
        databaseId: number;
        uri: string;
        slug: string
        courseMetadata: {
            courseDetailPicture: {
                mediaItemUrl: string
            }
            price: number;
            averageRating: number;
        };
    }
}
export interface PurchasedBundle {
    "courseBundle": {
        "title": string,
        databaseId: number;
        uri: string;
        slug: string
        "coursebundlemetadata": {
            "actualprice": number
            bundleimage: {
                mediaItemUrl: string
            }
        }
    }
}

export interface Brand {
    title: string;
    brandmetadata: BrandMetaData;
    uri: string;
    slug: string;
    content: string;
    databaseId: number;
}

export interface BrandMetaData {
    brandCourses: Course[];
    brandDownloadables: Downloadable[];
    brandProducts: UsedProduct[];
    brandTips: Tip[];
    externalUrl: string;
    facebookLink: string;
    instagramLink: string;
    logo: { sourceUrl: string };
    xLink: string;
    youtubeLink: string;
}