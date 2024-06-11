import { gql } from "@apollo/client";

// PAGES

// Recent courses (all categories) -- for categories, we filter fetched courses by date directly with js but good to have in case we need it
export const GET_RECENT_COURSES = gql`
query getRecentCourses($day: Int!, $month: Int!, $year: Int!) {
  courses(
    where: { dateQuery: { after: { day: $day, month: $month, year: $year } }, status: PUBLISH, orderby: { field: DATE, order: DESC } }
    first: 10
  ) {
    nodes {
      databaseId
      title
      slug
      categories {
          nodes {
            name
          }
      }
      courseMetadata {
        subscriptiontier
        scheduledreleasedate
        courseDetailPicture {
          mediaItemUrl
        }
        courseDuration
        averageRating
        noOfTestimonials
        courseHeroDescription
        vimeoPromoId
        price
        educators {
          ... on Educator {
            educatorMetaData {
              instahandle
            }
          }
        }
      }
    }
  }
}
`;

// Random 10 courses from the course's category
export const GET_RANDOM_COURSES_BY_CATEGORY = gql`
  query GetRandomCoursesByCategory($categoryName: String!, $count: Int!) {
    courses(
      where: { categoryName: $categoryName, status: PUBLISH }
      first: $count
    ) {
      nodes {
        databaseId
        title
        slug
        categories {
            nodes {
              name
            }
        }
        courseMetadata {
          subscriptiontier
          scheduledreleasedate
          courseDetailPicture {
            mediaItemUrl
          }
          courseDuration
          averageRating
          noOfTestimonials
          courseHeroDescription
          vimeoPromoId
          price
          educators {
            ... on Educator {
              educatorMetaData {
                instahandle
              }
            }
          }
        }
      }
    }
  }
`;

// Random 10 courses from the course's tag
export const GET_RANDOM_DOWNLOADABLES = gql`
  query GetRandomDownloadables($count: Int!) {
    downloadables(
      where: { status: PUBLISH }
      first: $count
    ) {
      nodes {
        databaseId
        slug
        title
        content
        downloadablemetadata {
          downloadableImage {
            mediaItemUrl
          }
        }
      }
    }
  }
`;

// Random 50 downloadables
export const GET_RANDOM_COURSES_BY_TAG = gql`
  query GetRandomCoursesByTag($tag: String!, $count: Int!) {
    courses(
      where: { tag: $tag, status: PUBLISH }
      first: $count
    ) {
      nodes {
        databaseId
        title
        slug
        categories {
            nodes {
              name
            }
        }
        courseMetadata {
          subscriptiontier
          scheduledreleasedate
          courseDetailPicture {
            mediaItemUrl
          }
          courseDuration
          averageRating
          noOfTestimonials
          courseHeroDescription
          vimeoPromoId
          price
          educators {
            ... on Educator {
              educatorMetaData {
                instahandle
              }
            }
          }
        }
      }
    }
  }
`;

// PAGE - Haircutting
export const GET_ALL_HAIRCUTTING_COURSES = gql`
query haircutting {
  courses(where: {categoryName: "Haircutting", status: PUBLISH}, first: 100) {
    nodes {
      databaseId
      title
      date
      isLive
      isPartOfSubscription
      isAvailableOnlyALaCarte
      isPurchasableALaCarte
      isPartOfBundle
      willBeLive
      slug
      uri
      tags{
        nodes{
          name
          slug
        }
      } 
      courseMetadata {
        subscriptiontier
        courseThumbnailPicture {
          mediaItemUrl
        }
        courseDuration
        averageRating
        noOfTestimonials
        courseHeroDescription
        educators {
          ... on Educator {
            databaseId
            educatorMetaData {
              instahandle
            }
          }
        }
        scheduledreleasedate
        courseImportance
        vimeoPromoId
      }
    }
  }
}
`;

//// PAGE - Styling
export const GET_ALL_STYLING_COURSES = gql`
query businessbyCat {
  courses(where: {categoryName: "Styling", status: PUBLISH}, first: 100) {
    nodes {
      databaseId
      title
      date
      isLive
      isPartOfSubscription
      isAvailableOnlyALaCarte
      isPurchasableALaCarte
      isPartOfBundle
      willBeLive
      slug
      uri
      tags{
        nodes{
          name
          slug
        }
      } 
      courseMetadata {
        subscriptiontier
        courseThumbnailPicture {
          mediaItemUrl
        }
        courseDuration
        averageRating
        noOfTestimonials
        courseHeroDescription
        educators {
          ... on Educator {
            databaseId
            educatorMetaData {
              instahandle
            }
          }
        }
        scheduledreleasedate
        courseImportance
        vimeoPromoId
      }
    }
  }
}
`;

// PAGE - Master Classes
export const GET_ALL_MASTERCLASS_COURSES = gql`
query businessbyCat {
  courses(where: {categoryName: "Master-Classes", status: PUBLISH}, first: 100) {
    nodes {
      databaseId
      title
      date
      isLive
      isPartOfSubscription
      isAvailableOnlyALaCarte
      isPurchasableALaCarte
      isPartOfBundle
      willBeLive
      slug
      uri
      tags{
        nodes{
          name
          slug
        }
      } 
      courseMetadata {
        subscriptiontier
        courseThumbnailPicture {
          mediaItemUrl
        }
        courseDuration
        averageRating
        noOfTestimonials
        courseHeroDescription
        educators {
          ... on Educator {
            databaseId
            educatorMetaData {
              instahandle
            }
          }
        }
        scheduledreleasedate
        courseImportance
        vimeoPromoId
      }
    }
  }
}
`;

// PAGE - Hair Color
export const GET_ALL_HAIRCOLOR_COURSES = gql`
query hairColorCats {
  courses(where: {categoryName: "Hair-Color", status: PUBLISH}, first: 100) {
    nodes {
      databaseId
      title
      date
      isLive
      isPartOfSubscription
      isAvailableOnlyALaCarte
      isPurchasableALaCarte
      isPartOfBundle
      willBeLive
      slug
      uri
      tags{
        nodes{
          name
          slug
        }
      } 
      courseMetadata {
        subscriptiontier
        courseThumbnailPicture {
          mediaItemUrl
        }
        courseDuration
        averageRating
        noOfTestimonials
        courseHeroDescription
        educators {
          ... on Educator {
            databaseId
            educatorMetaData {
              instahandle
            }
          }
        }
        scheduledreleasedate
        courseImportance
        vimeoPromoId
      }
    }
  }
}
`;

// PAGE - Men's
export const GET_ALL_MENS_COURSES = gql`
query mens {
  courses(where: {categoryName: "Mens", status: PUBLISH}, first: 40) {
    nodes {
      databaseId
      title
      date
      databaseId
      isLive
      isPartOfSubscription
      isAvailableOnlyALaCarte
      isPurchasableALaCarte
      isPartOfBundle
      willBeLive
      slug
      uri
      tags{
        nodes{
          name
          slug
        }
      } 
      courseMetadata {
        subscriptiontier
        courseThumbnailPicture {
          mediaItemUrl
        }
        courseDetailPicture {
          mediaItemUrl
        }
        vimeoPromoId
        vimeoid {
          chapter
        }
        youwilllearn
        courseTestimonialsNew {
          ... on Testimonial {
            testimonialMetadata {
              rating
            }
          }
        }
        educators {
          ... on Educator {
            id
            educatorMetaData {
              firstname
              lastname
              instahandle
            }
          }
        }       
        formulas
        coursemetatitle
        coursemetadescription
        courseDuration
        scheduledreleasedate
        courseImportance
        vimeoPromoId
      }
    }
  }
}
`;

// business id 433263

export const GET_CATEGORY_PAGE_GENERAL_DATA_BASICS = gql`
query getCategoryPageBasics ($id: ID!) {
  page(id: $id, idType: DATABASE_ID) {
    categoryPage {
      title
      subtitle
      video
      category {
        name
      }
      desktopImage {
        mediaItemUrl
      }
      mobileImage {
        mediaItemUrl
      }
      externalLink
    }
  }
}`;

// export const GET_CATEGORY_PAGE_GENERAL_DATA_DOWNLOADABLES = gql`
// query getCategoryPageDownloadables ($id: ID!) {
//   page(id: $id, idType: DATABASE_ID) {
//     categoryPage {
//       newCategoryDownloadables {
//         ... on Downloadable {
//           databaseId
//           title
//           content
//           downloadablemetadata {
//             downloadableFile {
//               mediaItemUrl
//             }
//             downloadableImage {
//               mediaItemUrl
//             }
//             downloadableHorizontalImage {
//               mediaItemUrl
//             }
//             accessLevel
//             relatedDownloadables {
//               ... on Downloadable {
//                 databaseId
//                 title
//                 content
//                 downloadablemetadata {
//                   downloadableFile {
//                     mediaItemUrl
//                   }
//                   downloadableImage {
//                     mediaItemUrl
//                   }
//                   downloadableHorizontalImage {
//                     mediaItemUrl
//                   }
//                   accessLevel
//                 }
//               }
//             }
//           }
//         }
//       }
//     }
//   }
// }`;

export const GET_DOWNLOADABLES_BY_TAG = gql`
query getDownloadablesByTag ($tag: String!) {
  downloadables(where: {tag: $tag, status: PUBLISH}, first: 99) {
    nodes {
      slug
      databaseId
      title
      content
      downloadablemetadata {
        downloadableImage {
          mediaItemUrl
        }
      }
    }
  }
}`;

export const GET_CATEGORY_PAGE_GENERAL_DATA_DOWNLOADABLES = gql`
query getCategoryPageDownloadables ($id: ID!) {
  page(id: $id, idType: DATABASE_ID) {
    categoryPage {
      newCategoryDownloadables {
        ... on Downloadable {
          slug
          databaseId
          title
          content
          downloadablemetadata {
            downloadableImage {
              mediaItemUrl
            }
            accessLevel
          }
        }
      }
    }
  }
}`;

export const GET_CATEGORY_PAGE_GENERAL_DATA_DOWNLOADABLES_TEN_TIPS = gql`
query getCategoryPageDownloadablesTenTipsNew ($id: ID!) {
  page(id: $id, idType: DATABASE_ID) {
    tenTipsInDownloadsPage {
      tenDownloadableTips {
        ... on Downloadable {
          slug
          databaseId
          title
          content
          downloadablemetadata {
            downloadableImage {
              mediaItemUrl
            }
            accessLevel
          }
        }
      }
    }
  }
}`;

export const GET_CATEGORY_PAGE_GENERAL_DATA_DOWNLOADABLES_SOCIAL_CLIMBING_SOCIAL_MEDIA = gql`
query getCategoryPageDownloadablesSocialClimbingSocialMedia ($id: ID!) {
  page(id: $id, idType: DATABASE_ID) {
    socialClimbingSocialMediaCombo {
      socialClimbingSocialMediaCombination {
        ... on Downloadable {
          slug
          databaseId
          title
          content
          downloadablemetadata {
            downloadableImage {
              mediaItemUrl
            }
            accessLevel
          }
        }
      }
    }
  }
}`;

export const GET_CATEGORY_PAGE_GENERAL_DATA_DOWNLOADABLES_BUSINESS = gql`
query getCategoryPageDownloadablesBusinessNew ($id: ID!) {
  page(id: $id, idType: DATABASE_ID) {
    tenTipsPage {
      businessDownloadsDownloadPageOnly {
        ... on Downloadable {
          slug
          databaseId
          title
          content
          downloadablemetadata {
            downloadableImage {
              mediaItemUrl
            }
            accessLevel
          }
        }
      }
    }
  }
}`;

export const GET_CATEGORY_PAGE_GENERAL_DATA_TIPS = gql`
query getCategoryPageTips ($id: ID!) {
  page(id: $id, idType: DATABASE_ID) {
    categoryPage {
      externalLink
      newTips {
        ... on Tip {
          databaseId
          title
          tipmetadata {
            isTipSponsoredByTheBrand
            video
            tipBrands {
              ... on Brand {
                title
                slug
              }
            }
            tipCourse {
              ... on Course {
                title
                slug
              }
            }
            tipEducator {
              ... on Educator {
                slug
                title
                educatorMetaData {
                  firstname
                  lastname
                  instahandle
                  educatorpicture {
                    mediaItemUrl
                  }
                }
              }
            }
          }
        }
      }
    }
  }
}`;

export const GET_CLIENT_LETTERS = gql`
query getClientLetters ($id: ID!) {
  page(id: $id, idType: DATABASE_ID) {
    clientLetterPage {
      clientLetters {
        ... on Downloadable {
          slug
          databaseId
          title
          content
          downloadablemetadata {
            downloadableImage {
              mediaItemUrl
            }
            accessLevel
          }
        }
      }
    }
  }
}`;

export const GET_TEN_TIPS = gql`
query getTenTips ($id: ID!) {
  page(id: $id, idType: DATABASE_ID) {
    tenTipsPage {
      tenTips {
        ... on Tip {
          databaseId
          title
          tipmetadata {
            video
            tipCourse {
              ... on Course {
                title
                slug
              }
            }
            tipEducator {
              ... on Educator {
                slug
                title
                educatorMetaData {
                  firstname
                  lastname
                  instahandle
                  educatorpicture {
                    mediaItemUrl
                  }
                }
              }
            }
          }
        }
      }
    }
  }
}`;

export const GET_HOME_PAGE_DOWNLOADABLES_AND_TIPS = gql`
query getHomePageDownloadablesTips ($id: ID!) {
  page(id: $id, idType: DATABASE_ID) {
    homePage {
      downloadables {
        ... on Downloadable {
          slug
          databaseId
          title
          content
          downloadablemetadata {
            downloadableImage {
              mediaItemUrl
            }
            accessLevel
          }
        }
      }
      tips {
        ... on Tip {
          databaseId
          title
          tipmetadata {
            video
            tipCourse {
              ... on Course {
                title
                slug
              }
            }
            tipEducator {
              ... on Educator {
                slug
                title
                educatorMetaData {
                  firstname
                  lastname
                  instahandle
                  educatorpicture {
                    mediaItemUrl
                  }
                }
              }
            }
          }
        }
      }
    }
  }
}`;

export const GET_CATEGORY_PAGE_GENERAL_DATA_EDUCATORS = gql`
query getCategoryPage ($id: ID!) {
  page(id: $id, idType: DATABASE_ID) {
    categoryPage {
      externalLink
      categoryEducators {
        ... on Educator {
          slug
          educatorMetaData {
            firstname
            lastname
            instahandle
            educatorpicture {
              mediaItemUrl
            }
          }
        }
      }
    }
  }
}`;

// mihai may 23 new query for category page metadata including metatile, metadescription and featured image
export const GET_CATEGORY_PAGE_GENERAL_DATA_METADATA = gql`
query getCategoryPage ($id: ID!) {
  page(id: $id, idType: DATABASE_ID) {
    featuredImage {
      node {
        mediaItemUrl
      }
    }
    categoryPage {
      metaDescription
      metaTitle
    }
  }
}`;

export const GET_CATEGORY_PAGE_GENERAL_DATA_SPOTLIGHT = gql`
query getCategoryPage ($id: ID!) {
  page(id: $id, idType: DATABASE_ID) {
    categoryPage {
      externalLink
      courseSpotlight {
        ... on Course {
          id
          title
          slug
          courseMetadata {
            courseThumbnailPicture {
              mediaItemUrl
            }
            courseDetailPicture {
              mediaItemUrl
            }
            vimeoPromoId
            educators {
              ... on Educator {
                slug
                educatorMetaData {
                  firstname
                  lastname
                  instahandle
                  educatorpicture {
                    mediaItemUrl
                  }
                  courses {
                    ... on Course {
                      databaseId
                    }
                  }
                }
              }
            }
          }
        }
      }
      specialReviewsForCourseSpotlight {
        content
        reviewerName
      }
    }
  }
}`;


// PAGE - BTC Events
export const GET_ALL_BTC_EVENTS_COURSES = gql`
query eventbyCat {
  courses(where: {categoryName: "BTC-Events", status: PUBLISH}, first: 100) {
    nodes {
      databaseId
      title
      date
      isLive
      isPartOfSubscription
      isAvailableOnlyALaCarte
      isPurchasableALaCarte
      isPartOfBundle
      willBeLive
      slug
      uri
      tags{
        nodes{
          name
          slug
        }
      } 
      courseMetadata {
        subscriptiontier
        courseThumbnailPicture {
          mediaItemUrl
        }
        courseDuration
        averageRating
        noOfTestimonials
        courseHeroDescription
        educators {
          ... on Educator {
            databaseId
            educatorMetaData {
              instahandle
            }
          }
        }
        scheduledreleasedate
        courseImportance
        vimeoPromoId
      }
    }
  }
}
`;


// PAGES - Texture
export const GET_ALL_TEXTURE_COURSES = gql`
query getTextureByCat {
  courses(where: {categoryName: "Texture", status: PUBLISH}, first: 100) {
   nodes {
          title
          date
          databaseId
          isLive
          isPartOfSubscription
          isAvailableOnlyALaCarte
          isPurchasableALaCarte
          isPartOfBundle
          willBeLive
          slug
          uri
          tags{
            nodes{
              name
              slug
            }
          } 
          courseMetadata {
            subscriptiontier
            courseThumbnailPicture {
              mediaItemUrl
            }
            courseDuration
            averageRating
            noOfTestimonials
            courseHeroDescription
            educators {
              ... on Educator {
                databaseId
                educatorMetaData {
                  instahandle
                }
              }
            }
            scheduledreleasedate
            courseImportance
            vimeoPromoId
          }
        }
  }
}
`;

// PAGE - Hair Extensions
export const GET_ALL_HAIR_EXTENSIONS_COURSES = gql`
query getHairExtensionsByCat {
  courses(where: {categoryName: "Extensions", status: PUBLISH}, first: 100) {
    nodes {
      databaseId
      title
      date
      isLive
      isPartOfSubscription
      isAvailableOnlyALaCarte
      isPurchasableALaCarte
      isPartOfBundle
      willBeLive
      slug
      uri
      tags{
        nodes{
          name
          slug
        }
      } 
      courseMetadata {
        subscriptiontier
        courseThumbnailPicture {
          mediaItemUrl
        }
        courseDuration
        averageRating
        noOfTestimonials
        courseHeroDescription
        educators {
          ... on Educator {
            databaseId
            educatorMetaData {
              instahandle
            }
          }
        }
        scheduledreleasedate
        courseImportance
        vimeoPromoId
      }
    }
  }
}
`;

// PAGE - Languages

export const GET_ALL_LANGUAGES_COURSES = gql`
query getLanguagesByCat {
  courses(where: {categoryName: "Languages", status: PUBLISH}, first: 100) {
    nodes {
      databaseId
      title
      date
      isLive
      isPartOfSubscription
      isAvailableOnlyALaCarte
      isPurchasableALaCarte
      isPartOfBundle
      willBeLive
      slug
      uri
      tags{
        nodes{
          name
          slug
        }
      } 
      courseMetadata {
        subscriptiontier
        courseThumbnailPicture {
          mediaItemUrl
        }
        courseDuration
        averageRating
        noOfTestimonials
        courseHeroDescription
        educators {
          ... on Educator {
            databaseId
            educatorMetaData {
              instahandle
            }
          }
        }
        scheduledreleasedate
        courseImportance
        vimeoPromoId
      }
    }
  }
}
`;

// PAGE - Educators

export const GET_All_EDUCATORS = gql`
query GetAllEducators {
  educators(first: 100) {
    nodes {
      title
      educatorMetaData {
        educatorjobtitle
        educatortype
        educatorpicture {
          mediaItemUrl
        }
        careerslink
        courses {
          ... on Course {
            id
          }
        }
        topartistlevel
        instahandle
        facebookaccount
        twitterhandle
        pinteresthandle
        youtubeusername
        othersociallink
        othersociallink2
        othersociallink3
        educatoremail
        educatorwebsite
        educatorwebsitetext
        relatededucators {
          ... on Educator {
            id
            title
          }
        }
        educatortestimonials {
          ... on Testimonial {
            id
            testimonialMetadata {
              firstname
              lastname
              rating
              timestamp
              whatdidyoulove
              educatorrating
              educatorratingcontent
            }
            uri
          }
        }
      }
      content
      hasJobs
      isTop
      isEducatorEmailPublic
      isEducatorWebsitePublic
    }
  }
}
`;

// DYNAMIC LINKING

// Individual Course Page
export const GET_COURSE_BY_SLUG = gql`
    query GetCourseByURI($id: ID!) {
      course(id: $id, idType: SLUG) {
        title
        databaseId
        isLive
        isPartOfSubscription
        isAvailableOnlyALaCarte
        isPurchasableALaCarte
        isPartOfBundle
        willBeLive
        id
        categories {
          nodes {
            name
            slug
          }
        }
        tags {
          nodes {
            name
            slug
          }
        }
        content
        uri
        courseMetadata {
          releasedate
          stripeId
          subscriptiontier
          courseThumbnailPicture {
            mediaItemUrl
          }
          courseDetailPicture {
            mediaItemUrl
          }
          beforeandafter {
            mediaItemUrl
          }
          courseHighlights {
            mediaItemUrl
          }
          vimeoPromoId
          vimeoid {
            chapter
          }
          youwilllearn
          courseTestimonialsNew {
            ... on Testimonial {
              content
              date
              status
              testimonialMetadata {
                firstname
                lastname
                rating
                timestamp
                userid
                type
                educatorid
                educatorrating
                educatorratingcontent
                difficultyRating
              }
            }
          }
          educators {
            ... on Educator {
              id
              slug
              title
              educatorMetaData {
                firstname
                lastname
                instahandle
                educatorpicture {
                  mediaItemUrl
                }
                courses {
                  ... on Course {
                    databaseId
                  }
                }
              }
            }
          }   
          formulas
          coursemetatitle
          coursemetadescription
          courseDuration 
          courseChapters {
            chapterDuration
            chapterName
            chapterStartsAt
            fieldGroupName
          }
          courseHeroDescription
          price
          courselevel
          episodenumber
          relatedcourses {
            ... on Course {
                title
                slug
                courseMetadata {
                  subscriptiontier
                  courseThumbnailPicture {
                    mediaItemUrl
                  }
                  courseDuration
                  averageRating
                  noOfTestimonials
                  courseHeroDescription
                  vimeoPromoId
                }
            }
          }
          productsUsed {
            ... on UsedProduct {
              id
              title
              usedproductmetadata {
                brandName
                externalLink
                price
                productpictures {
                  mediaItemUrl
                }
              }
            }
          }
          newDownloadables {
            ... on Downloadable {
              slug
              databaseId
              title
              content
              downloadablemetadata {
                downloadableImage {
                  mediaItemUrl
                }
              }
            }
          } 
          scheduledreleasedate
          averageRating
          noOfTestimonials
          newCourseHighlights {
            highlightDescription
            videoId
          }
        }
        
      }
    }
`;





export const GET_ALL_COURSES_SLUGS = gql`
    query GetAllCoursesSlugs {
        courses(where: {status: PUBLISH}, first: 999) {
            nodes {
                id
                slug
            }
        }
    }
`;


// Individual Educator Page

export const GET_EDUCATOR_BY_SLUG = gql`
query GetEducatorByURI($id: ID!) {
    educator(id: $id, idType: SLUG) {
      title
      educatorMetaData {
        firstname
        lastname
        educatorjobtitle
        educatortype
        educatorpicture {
          mediaItemUrl
        }
        careerslink
        courses {
          ... on Course {
            databaseId
            title
            databaseId
            isLive
            isPartOfSubscription
            isAvailableOnlyALaCarte
            isPurchasableALaCarte
            isPartOfBundle
            willBeLive
            slug
            uri
            tags{
              nodes{
                name
                slug
              }
            } 
            categories {
              nodes {
                name
                slug
              }
            }
            courseMetadata {
              subscriptiontier
              courseThumbnailPicture {
                mediaItemUrl
              }
              courseDetailPicture {
                mediaItemUrl
              }
              vimeoPromoId
              vimeoid {
                chapter
              }
              youwilllearn
              courseTestimonialsNew {
                ... on Testimonial {
                  testimonialMetadata {
                    rating
                  }
                }
              }
              educators {
                ... on Educator {
                  id
                  educatorMetaData {
                    firstname
                    lastname
                  }
                }
              }       
              formulas
              coursemetatitle
              coursemetadescription
              courseDuration
            }
          }
        }
        topartistlevel
        instahandle
        facebookaccount
        twitterhandle
        pinteresthandle
        youtubeusername
        othersociallink
        othersociallink2
        othersociallink3
        educatoremail
        educatorwebsite
        educatorwebsitetext
        relatededucators {
          ... on Educator {
            id
            title
          }
        }
        educatortestimonials {
          ... on Testimonial {
            id
            testimonialMetadata {
              firstname
              lastname
              rating
              timestamp
              whatdidyoulove
              educatorrating
              educatorratingcontent
            }
            uri
          }
        }
      }
      content
      hasJobs
      isTop
      isEducatorEmailPublic
      isEducatorWebsitePublic
    }
}
`;

export const GET_All_EDUCATORS_SLUGS = gql`
query GetAllEducatorsSlugs{
    educators {
        nodes {
            slug
        }
    }
}
`;

// get the educators from educator wordpress EDIT THIS PAGE HERE
// https://cms.btcuniversity.com/wp-admin/post.php?post=432661&action=edit
export const GET_EDUCATOR_PAGE = gql`
query getEducatorPageEducatorsByCategory {
  page(id: "432661", idType: DATABASE_ID) {
    educatorsPage {
      tagBlockNew {
        ... on Page_Educatorspage_TagBlockNew_EducatorOrderByCategory {
          educatorCategory {
            name
          }
          educatorGroup {
            educator {
              ... on Educator {
                id
                slug
                educatorMetaData {
                  firstname
                  lastname
                  instahandle
                  educatorpicture {
                    mediaItemUrl
                  }
                }
              }
            }
          }
        }
      }
    }
  }
}`;


// get the course categories from categories page in wordpress EDIT THIS PAGE HERE
// https://cms.btcuniversity.com/wp-admin/post.php?post=433123&action=edit
// this method has been deprecated as we will be fetching courses from each individual category page
export const GET_CATEGORIES_PAGE = gql`
query getCategoryPage {
  page(id: "433123", idType: DATABASE_ID) {
    categoriesPage {
      categoryBlock {
        ... on Page_Categoriespage_CategoryBlock_CategoriesAndTheirProperties {
          courseSpotlight {
            ... on Course {
              id
              title
              slug
              courseMetadata {
                courseThumbnailPicture {
                  mediaItemUrl
                }
                courseDetailPicture {
                  mediaItemUrl
                }
                vimeoPromoId
                educators {
                  ... on Educator {
                    slug
                    educatorMetaData {
                      firstname
                      lastname
                      instahandle
                      educatorpicture {
                        mediaItemUrl
                      }
                      courses {
                        ... on Course {
                          databaseId
                        }
                      }
                    }
                  }
                }   
              }
            }
          }
          category {
            name
          }
          desktopImage {
            mediaItemUrl
          }
          mobileImage {
            mediaItemUrl
          }
          subtitle
          title
          video
          tips {
            title
            video
          }
          specialReviews {
            content
            reviewerName
          }
        }
      }
    }
  }
}`;




// below not used for now but might be needed

export const GET_COURSE_BY_DATABASE_ID = gql`
query GetCourseByDBID($id: ID!) {
  course(id: $id, idType: DATABASE_ID) {
    title
    databaseId
    isLive
    isPartOfSubscription
    isAvailableOnlyALaCarte
    isPurchasableALaCarte
    isPartOfBundle
    willBeLive
    id
    slug
    uri
    courseMetadata {
      subscriptiontier
      youwilllearn
      courseThumbnailPicture {
        mediaItemUrl
      }
      courseDetailPicture {
        mediaItemUrl
      }
      beforeandafter {
        mediaItemUrl
      }
      vimeoPromoId
      vimeoid {
        chapter
      }
      courseTestimonialsNew {
        ... on Testimonial {
          id
          testimonialMetadata {
            firstname
            lastname
            rating
            timestamp
            userid
            educatorid
          }
        }
      }
      educators {
        ... on Educator {
          id
          title
          educatorMetaData {
            firstname
            lastname
          }
        }
      }
      formulas
      coursemetatitle
      coursemetadescription
      courseDuration 
      relatedcourses {
        ... on Course {
            title
            isLive
            isPartOfSubscription
            isAvailableOnlyALaCarte
            isPurchasableALaCarte
            isPartOfBundle
            willBeLive
            slug
            uri
            tags{
              nodes{
                name
                slug
              }
            } 
            courseMetadata {
              subscriptiontier
              courseThumbnailPicture {
                mediaItemUrl
              }
              courseDuration
              averageRating
              noOfTestimonials
              courseHeroDescription
            }
        }
      }    
      courseChapters {
        chapterDuration
        chapterName
        chapterStartsAt
      }
    }
  }
}
`;



// this will not be needed, but CourseHighlights.tsx, FinishedLook.tsx, StudentsAreViewing.tsx will error out for now without
export const GET_ALL_COURSES = gql`
    query GetAllCourses {
        courses(where: {status: PUBLISH}, first: 999) {
            nodes {
                title
                databaseId
                isLive
                isPartOfSubscription
                isAvailableOnlyALaCarte
                isPurchasableALaCarte
                isPartOfBundle
                willBeLive
                id
                tags{
                  nodes{
                    name
                    slug
                  }
                }
                courseMetadata {
                  subscriptiontier
                    youwilllearn
                    courseThumbnailPicture {
                        mediaItemUrl
                    }
                    courseDetailPicture {
                      mediaItemUrl
                    }
                    vimeoPromoId
                    vimeoid {
                      chapter
                    }
                    educators {
                      ... on Educator {
                        id
                        educatorMetaData {
                          firstname
                          lastname
                        }
                      }
                    }      
                    formulas
                    coursemetatitle
                    coursemetadescription 
                    courseDuration                     
                }
                slug
                uri
            }
        }
    }
`;


// User Data

export const GET_USER_DATA_BY_USER_ID = gql`
  query getUserData($userId: String!) {
    userDatas(where: { name: $userId }) {
      edges {
        node {
          title
          databaseId
          userDataMetadata {
            fullname
            firstname
            lastname
            accessedcourses {
              ... on AccessedCourse {
                title
                databaseId
                isCompleted
                accessedcoursemetadata {
                  userid
                  courseid
                }
              }
            }
          }
        }
      }
    }
  }
`;

export const GET_USERDATA_BY_DATABASE_ID = gql`
query GetUserDataByDBID($id: ID!) {
  userData(id: $id, idType: DATABASE_ID) {
    title
    databaseId
    userDataMetadata {
      fullname
      firstname
      lastname
      accessedcourses {
        ... on AccessedCourse {
          title
          databaseId
          isFavorited
          wantToWatch
          registeredToCourse
          addedToCalendar
          watchedTrailer
          isCompleted
          isNotStarted
          isStarted
          accessedcoursemetadata {
            userid
            courseid
            startdate
            status
            endTime
            endedAtChapter
            belongstocourse {
              ... on Course {
                databaseId
                title
                isLive
                isPartOfSubscription
                isAvailableOnlyALaCarte
                isPurchasableALaCarte
                isPartOfBundle
                willBeLive
                slug
                uri
                tags {
                  nodes {
                    name
                    slug
                  }
                }
                courseMetadata {
                  subscriptiontier
                  courseThumbnailPicture {
                    mediaItemUrl
                  }
                  courseDuration
                  averageRating
                  noOfTestimonials
                  courseHeroDescription
                }
              }
            }
            coursenotes
          }
        }
      }
      purchasedcourses {
        ... on Course {
          databaseId
          title
          isLive
          isPartOfSubscription
          isAvailableOnlyALaCarte
          isPurchasableALaCarte
          isPartOfBundle
          willBeLive
          slug
          uri
          tags {
            nodes {
              name
              slug
            }
          }
          courseMetadata {
            subscriptiontier
            courseThumbnailPicture {
              mediaItemUrl
            }
            courseDuration
            averageRating
            noOfTestimonials
            courseHeroDescription
          }
        }
      }
      purchasedbundless {
        ... on CourseBundle {
          title
          databaseId
          slug
          uri
          tags {
            nodes {
              name
              slug
            }
          }
          coursebundlemetadata {
            actualprice
            thumbnailPicture {
              mediaItemUrl
            }
            coursesinbundle {
              ... on Course {
                databaseId
                courseMetadata {
                  noOfTestimonials
                  courseHeroDescription
                }
              }
            }
          }
        }
      }
      purchasedsubscriptions {
        ... on Subscription {
          id
          databaseId
          subscriptionMetadata {
            paymentStatus
            upcomingsubscriptionid
            subscriptionstartson
            subscriptionexpireson
            subscriptionrenewson
            subscriptiontype {
              ... on SubscriptionType {
                id
                databaseId
                subscriptionTypeMetadata {
                  tier
                }
              }
            }
          }
        }
      }
      likedCourses {
        ... on Course {
          databaseId
          title
          isLive
          isPartOfSubscription
          isAvailableOnlyALaCarte
          isPurchasableALaCarte
          isPartOfBundle
          willBeLive
          slug
          uri
          tags {
            nodes {
              name
              slug
            }
          }
          courseMetadata {
            subscriptiontier
            courseThumbnailPicture {
              mediaItemUrl
            }
            courseDuration
            averageRating
            noOfTestimonials
            courseHeroDescription
          }
        }
      }
      likedBundles {
        ... on CourseBundle {
          title
          databaseId
          slug
          uri
          tags {
            nodes {
              name
              slug
            }
          }
          coursebundlemetadata {
            actualprice
            thumbnailPicture {
              mediaItemUrl
            }
            coursesinbundle {
              ... on Course {
                databaseId
                courseMetadata {
                  noOfTestimonials
                  courseHeroDescription
                }
              }
            }
          }
        }
      }
      likededucators {
        ... on Educator {
          title
          databaseId
          slug
          educatorMetaData {
            firstname
            lastname
            instahandle
            educatorpicture {
              mediaItemUrl
            }
          }
        }
      }
    }
  }
}
`;


// SEARCH

export const SEARCH_QUERY_EDUCATORS = gql`
  query GetAllSearchedEducators($after: String) {
    educators(where: {status: PUBLISH}, first: 90, after: $after) {
      pageInfo {
        hasNextPage
        endCursor
      }
      nodes {
        title
        slug
        educatorMetaData {
          firstname
          lastname
          educatorpicture {
            mediaItemUrl
          }
          instahandle
          courses {
            ... on Course {
              databaseId
            }
          }
        }
      }
    }
  }
`;

export const SEARCH_QUERY_COURSES = gql`
  query GetAllSearchedCourses($after: String) {
    courses(where: {status: PUBLISH}, first: 90, after: $after) {
      pageInfo {
        hasNextPage
        endCursor
      }
      nodes {
        title
        slug
        courseMetadata {
          courseThumbnailPicture {
            mediaItemUrl
          }
          educators {
            ... on Educator {
              title
              educatorMetaData {
                firstname
                lastname
                instahandle
              }
            }
          }
        }
      }
    }
  }
`;

// Hamzah subscription queries

export const GET_ALL_SUBSCRIPTION_TYPE = gql`
  query GetAllSubscriptionTypes {
    subscriptionTypes {
      nodes {
        title
        id
        subscriptionTypeMetadata {
          price
          duration
        }
      }
    }
  }
`;
export const GET_USER_ADDRESS = gql`
  query GetUser($idType: UserNodeIdTypeEnum, $id: ID!) {
    user(idType: $idType, id: $id) {
      firstName
      lastName
      phone
      address {
        address1
        address2
        city
        country
        state
        zipcode
      }
    }
  }
`;

// Hamzah authentication providers

export const AUTH_PROVIDERS = gql`
  query AuthProviders {
    loginClients {
      authorizationUrl
      name
      clientId
      isEnabled
    }
  }
`;


// Master classes aka course bundles

// PAGE - masterclasses
export const GET_ALL_COURSE_BUNDLES = gql`
query collections {
  courseBundles(where: {status: PUBLISH}, first: 100) {
    nodes {
      databaseId
      title
      slug
      uri
      tags{
        nodes{
          name
          slug
        }
      } 
      coursebundlemetadata {
        actualprice
        thumbnailPicture {
          mediaItemUrl
        }
        coursesinbundle {
          ... on Course {
            databaseId
            courseMetadata {
              noOfTestimonials
              courseHeroDescription
            }
          }
        }
      }
    }
  }
}
`;


// Individual Course Bundle/Collection Page
export const GET_COURSE_BUNDLE_BY_SLUG = gql`
    query GetCourseBundleByURI($id: ID!) {
      courseBundle(id: $id, idType: SLUG) {
        databaseId
        title
        content
        slug
        uri
        coursebundlemetadata {
          actualprice
          bundleimage {
            mediaItemUrl
          }
          collectionDownloadables {
            ... on Downloadable {
              slug
              databaseId
              title
              content
              downloadablemetadata {
                downloadableImage {
                  mediaItemUrl
                }
              }
            }
          }
          coursesinbundle {
            ... on Course {
              databaseId
              title
              isLive
              isPartOfSubscription
              isAvailableOnlyALaCarte
              isPurchasableALaCarte
              isPartOfBundle
              willBeLive
              slug
              uri
              tags{
                nodes{
                  name
                  slug
                }
              } 
              courseMetadata {
                subscriptiontier
                courseThumbnailPicture {
                  mediaItemUrl
                }
                courseDuration
                averageRating
                noOfTestimonials
                courseHeroDescription
                educators {
                  ... on Educator {
                    id
                    slug
                    title
                    educatorMetaData {
                      firstname
                      lastname
                      instahandle
                      educatorpicture {
                        mediaItemUrl
                      }
                      courses {
                        ... on Course {
                          databaseId
                        }
                      }
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
`;
export const GET_COURSE_BUNDLE_BY_SLUG_METADATA = gql`
    query GetCourseBundleByURI($id: ID!) {
      courseBundle(id: $id, idType: SLUG) {
        title
        content
        coursebundlemetadata {
          bundleimage {
            mediaItemUrl
          }
        }
      }
    }
`;

export const GET_ALL_COURSE_BUNDLES_SLUGS = gql`
    query GetAllCourseBundlesSlugs {
        courseBundles(where: {status: PUBLISH}, first: 999) {
            nodes {
                id
                slug
            }
        }
    }
`;

export const GET_SERIES_BY_NAME = gql`
    query GetCourseBundleByURI($id: ID!) {
      courseBundle(id: $id, idType: SLUG) {
        databaseId
        title
        content
        slug
        uri
        coursebundlemetadata {
          actualprice
          bundleimage {
            mediaItemUrl
          }
          coursesinbundle {
            ... on Course {
              databaseId
              title
              isLive
              isPartOfSubscription
              isAvailableOnlyALaCarte
              isPurchasableALaCarte
              isPartOfBundle
              willBeLive
              slug
              uri
              tags{
                nodes{
                  name
                  slug
                }
              } 
              courseMetadata {
                subscriptiontier
                courseThumbnailPicture {
                  mediaItemUrl
                }
                courseDuration
                averageRating
                noOfTestimonials
              }
            }
          }
        }
      }
    }
`;

// Upcoming courses

export const GET_ALL_UPCOMING_COURSES = gql`
query upcoming {
  courses(where: {categoryName: "Upcoming", status: PUBLISH}, first: 50) {
    nodes {
      databaseId
      content
      title
      isLive
      isPartOfSubscription
      isAvailableOnlyALaCarte
      isPurchasableALaCarte
      isPartOfBundle
      willBeLive
      slug
      uri
      tags{
        nodes{
          name
          slug
        }
      } 
      categories {
          nodes {
            name
          }
      }
      courseMetadata {
        subscriptiontier
        courseDuration
        averageRating
        courseHeroDescription
        scheduledreleasedate
        averageRating
        noOfTestimonials
        vimeoPromoId
        price
        courseThumbnailPicture {
          mediaItemUrl
        }
        courseDetailPicture {
          mediaItemUrl
        }
        educators {
          ... on Educator {
            educatorMetaData {
              instahandle
            }
          }
        }
      }
    }
  }
}
`
// Get Subscription
export const GET_USERS_SUBSCRIPTION = gql`
query CustomerSubscriptions($authorId: Int!) {
  subscriptions(where: {author: $authorId,  orderby: {field: MODIFIED, order: DESC}}, first: 1) {
    nodes {
      title
      databaseId
      subscriptionMetadata {
        paymentStatus
        upcomingsubscriptionid
        upcomingsubscriptionid
        stripesubscriptionid
        subscriptionrenewson
        subscriptionexpireson
        tigiftrecipientemail
        subscriptionstartson
        subscriptioncanceledon
        stripesubscriptionscheduleid
        subscriptiontype {
          ... on SubscriptionType {
            databaseId
            title
          }
        }
      }
    }
  }
}
`;

// Get Top Classes
export const GET_TOP_CLASSES = gql`
query TopClasses($slug:String!) {
  courses(where: {categoryName: $slug, status: PUBLISH}, first: 50) {
    nodes {
      databaseId
      title
      isLive
      isPartOfSubscription
      isAvailableOnlyALaCarte
      isPurchasableALaCarte
      isPartOfBundle
      willBeLive
      slug
      uri
      tags{
        nodes{
          name
          slug
        }
      } 
      courseMetadata {
        subscriptiontier
        courseThumbnailPicture {
          mediaItemUrl
        }
        courseDuration
        averageRating
        noOfTestimonials
        courseHeroDescription
        educators {
          ... on Educator {
            educatorMetaData {
              instahandle
            }
          }
        }
      }
    }
  }
}
`;

export const GET_USER_EDU_INFO = gql`
query GetUserEducationInfo($id:ID!) {
  userData(id: $id, idType:DATABASE_ID){
    userDataMetadata{
      likedCourses{
        ... on Course{
          id
        }
      }
      certificates{
        ... on AccessedCourse{
          id
        }
      }
    }
  }
}
`;

export const GET_USER_PROFILE = gql`
query GetUserEducationInfo($id:ID!) {
  user(idType: DATABASE_ID, id: $id) {
    firstName
    lastName
    address {
      address1
    }
    avatarUrl
  }
}
`;

export const GET_USERS_SUBSCRIPTION_SHORT = gql`
query CustomerSubscriptions($authorId: Int!) {
  subscriptions(where: {author: $authorId}, first: 1) {
    nodes {
      databaseId
      subscriptionMetadata {
        paymentStatus
        upcomingsubscriptionid
        subscriptionrenewson
        subscriptionexpireson
        subscriptionstartson
        subscriptioncanceledon
      }
    }
  }
}
`;

export const GET_CART_COURSE_DATA = gql`
query GetCartCourseData($id: ID!) {
  course(id: $id, idType: DATABASE_ID) {
    title
    uri
    databaseId
    slug
    isPurchasableALaCarte
    courseMetadata {
      price
      courseDetailPicture {
        mediaItemUrl
      }
    }
  }
}`;

export const GET_PURCHASED_COURSE = gql`
query GetPurchasedCourse($id: ID!) {
  userData(id: $id, idType: DATABASE_ID) {
    title
    userDataMetadata {
      purchasedcourses {
        ... on Course {
          databaseId
        }
      }
    }
  }
}
`;

export const GET_PURCHASED_BUNDLE = gql`
query GetPurchasedBundle($id: ID!) {
  userData(id: $id, idType: DATABASE_ID) {
    title
    userDataMetadata {
      purchasedbundless {
        ... on CourseBundle {
          databaseId
        }
      }
    }
  }
}
`;

export const GET_CART_BUNDLE_DATA = gql`
query GetCartBundleData($id: ID!) {
  courseBundle(id: $id, idType: DATABASE_ID) {
    title
    uri
    databaseId
    slug
    coursebundlemetadata{
      actualprice
      bundleimage{
        mediaItemUrl
      }
    }
  }
}`


export const GET_USERDATA_ACCESSED_COURSES_FOR_CERTIFICATES_BY_DATABASE_ID = gql`
query GetUserDataAccessedCoursesForCertificatesByDBID($id: ID!) {
  userData(id: $id, idType: DATABASE_ID) {
    userDataMetadata {
      accessedcourses {
        ... on AccessedCourse {
          databaseId
          isCompleted
          accessedcoursemetadata {
            completiondate
            belongstocourse {
              ... on Course {
                databaseId
                title
                content
                courseMetadata {
                  courseDetailPicture {
                    mediaItemUrl
                  }
                  vimeoid{
                    chapter
                  }
                  courseBrands {
                    ... on Brand {
                      title
                      brandmetadata {
                        logo {
                          sourceUrl
                        }
                      }
                    }
                  }
                  youwilllearn
                  educators {
                    ... on Educator {
                      databaseId
                      educatorMetaData {
                        firstname
                        lastname
                        instahandle
                        educatorpicture {
                          mediaItemUrl
                        }
                      }
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
  }
}
`;

export const GET_USERDATA_GOOGLE_ANALYTICS_DATA_BY_ID = gql`
query GetUserDataGADataByDBID($id: ID!) {
  userData(id: $id, idType: DATABASE_ID) {
    userDataMetadata {
      userid
      zipcode
      city
      country
      state
    }
  }
}
`;

// Mihai Jan 13

// Fetch all downlodables from downlodables page


// Fetch all tips from tips page


// Shayan
export const GET_ALL_BRANDS_PAGE_DATA = gql`
query getEducatorPageEducatorsByCategory {
  brands{
    nodes{
      title,
      slug,
      brandmetadata{
        logo{
          sourceUrl
        }
      }
    }
  }
}`

export const GET_ALL_BRAND_TIPS = gql`query getBrandTips {
  brands {
    nodes {
      slug
      title
      brandmetadata {
        brandTips {
          ... on Tip {
            title
            tipmetadata {
              isTipSponsoredByTheBrand
              video
              tipBrands {
                ... on Brand {
                  title
                  slug
                }
              }
              tipCourse {
                ... on Course {
                  title
                  slug
                }
              }
              tipEducator {
                ... on Educator {
                  slug
                  educatorMetaData {
                    instahandle
                  }
                }
              }
            }
          }
        }
      }
    }
  }
}`

export const GET_ALL_BRAND_COURSE = gql`
query getAllBrandCourses {
  brands {
    nodes {
      slug
      brandmetadata {
        brandCourses {
          ... on Course {
            databaseId
            title
            slug
            uri
            isLive
            willBeLive
            categories {
              nodes {
                name
              }
            }
            courseMetadata {
              subscriptiontier
              scheduledreleasedate
              courseDetailPicture {
                mediaItemUrl
              }
              courseDuration
              noOfTestimonials
              courseHeroDescription
              averageRating
              price
              vimeoPromoId
              vimeoid {
                chapter
              }
              educators {
                ... on Educator {
                  educatorMetaData {
                    instahandle
                  }
                }
              }
            }
          }
        }
      }
    }
  }
}`


export const GET_BRAND_HERO = gql`
query GetBranHero($id: ID!) {
  brand(id: $id, idType: SLUG) {
    title
    brandmetadata {
      logo {
        sourceUrl
      }
      externalUrl
      xLink
      youtubeLink
      facebookLink
      instagramLink
    }
  }
}`

export const GET_ALL_BRANDS_PRODUCTS = gql`
query getAllBrandsProducts {
  brands {
    nodes {
      slug
      brandmetadata {
        brandProducts {
          ... on UsedProduct {
            title
            id
            usedproductmetadata {
              brandName
              externalLink
              productpictures{
                mediaItemUrl
              }
              appearedincourses {
                ... on Course {
                  databaseId
                }
              }
            }
          }
        }
      }
    }
  }
}`


// mihai note may 27: since no downloadables have metatitle and metadescription we are using title and content for now
// to do: switch to metaTitle and metaDescription after Emily adds metaTitle and metaDescription to each downloadable (not sure what the priority is on that)
export const GET_DOWNLOADABLE_BY_SLUG_FOR_DOWNLOADABLE_SLUG_PAGE_METADATA = gql`
query GetDownloadableBySlugForSlugPageMetadata($id: ID!) {
  downloadable(id: $id, idType: SLUG) {
    title
    content
    downloadablemetadata {
      metaTitle
      metaDescription
      downloadableImage {
        mediaItemUrl
      }
    }
  }
}
`;

export const GET_BRAND_BIO = gql`
query GetBranBio($id: ID!) {
  brand(id: $id, idType: SLUG) {
    title
    content
  }
}`
