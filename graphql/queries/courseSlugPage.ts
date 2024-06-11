import { gql } from "@apollo/client";

export const GET_ALL_COURSES_SLUG = gql`
  {
    courses {
      nodes {
        id
        slug
      }
    }
  }
`;
export const GET_ALL_COURSE_BUNDLES = gql`
  query GetCourseBundles{
    courseBundles(where: {status: PUBLISH}, first: 99) {
      nodes {
        slug
      }
    }
  }
`;

export const GET_COURSE_BY_SLUG_RELATED_COURSES = gql`
  query GetCourseRelatedCoursesBySlug($id: ID!) {
    course(id: $id, idType: SLUG) {
      courseMetadata {
        relatedcourses {
          ... on Course {
            title
            slug
            courseMetadata {
              subscriptiontier
              courseDetailPicture {
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
      }
    }
  }
`;

export const GET_COURSE_BY_SLUG_CATEGORIES = gql`
  query GetCourseCategories($id: ID!) {
    course(id: $id, idType: SLUG) {
      categories {
        nodes {
          name
          slug
        }
      }
    }
  }
`;

export const GET_COURSE_BY_SLUG_TAGS = gql`
  query GetCourseTags($id: ID!) {
    course(id: $id, idType: SLUG) {
      tags {
        nodes {
          name
          slug
        }
      }
    }
  }
`;

export const GET_COURSE_BY_SLUG_ID = gql`
  query GetCourseSlugBySlug($id: ID!) {
    course(id: $id, idType: SLUG) {
      databaseId
    }
  }
`;

export const GET_COURSE_BY_SLUG_WHATS_INCLUDED = gql`
  query GetCourseIncludedByDBID($id: ID!) {
    course(id: $id, idType: SLUG) {
      courseMetadata {
        formulas
        productsUsed {
          ... on UsedProduct {
            title
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
      }
    }
  }
`;

export const GET_COURSE_BY_SLUG_YOU_WILL_LEARN = gql`
  query GetCourseYWLByDBID($id: ID!) {
    course(id: $id, idType: SLUG) {
      courseMetadata {
        youwilllearn
      }
    }
  }
`;

export const GET_COURSE_BY_SLUG_CHAPTERS = gql`
  query GetCourseSlugChaptsByDBID($id: ID!) {
    course(id: $id, idType: SLUG) {
      courseMetadata {
        courseChapters {
          chapterDuration
          chapterName
          chapterStartsAt
          fieldGroupName
        }
      }
    }
  }
`;

export const GET_COURSE_BY_SLUG_SUBSCRIPTION_DATA = gql`
  query GetCourseSubDataByDBID($id: ID!) {
    course(id: $id, idType: SLUG) {
      databaseId
      isPartOfSubscription
      courseMetadata {
        subscriptiontier
        price
      }
    }
  }
`;

export const GET_COURSE_BY_SLUG_DESCRIPTION = gql`
  query GetCourseDescripByDBID($id: ID!) {
    course(id: $id, idType: SLUG) {
      content
    }
  }
`;

export const GET_COURSE_BY_SLUG_EDUCATORS_AND_THEIR_COURSES = gql`
  query GetCourseSlugEducatByDBID($id: ID!) {
    course(id: $id, idType: SLUG) {
      courseMetadata {
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
`;

export const GET_COURSE_BY_SLUG_USED_PRODUCTS = gql`
  query GetCourseProducstsByDBID($id: ID!) {
    course(id: $id, idType: SLUG) {
      courseMetadata {
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
      }
    }
  }
`;

export const GET_COURSE_BY_SLUG_TESTIMONIALS = gql`
  query GetCourseReviewsByDBID($id: ID!) {
    course(id: $id, idType: SLUG) {
      courseMetadata {
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
      }
    }
  }
`;

export const GET_COURSE_BY_SLUG_DOWNLOADABLES = gql`
  query GetCourseSlugDownloadsByDBID($id: ID!) {
    course(id: $id, idType: SLUG) {
      courseMetadata {
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
      }
    }
  }
`;

export const GET_COURSE_BY_SLUG_BASICS = gql`
  query GetCourseBasicsByDBID($id: ID!) {
    course(id: $id, idType: SLUG) {
      title
      databaseId
      isLive
      isPartOfSubscription
      isAvailableOnlyALaCarte
      isPurchasableALaCarte
      isPartOfBundle
      willBeLive
    }
  }
`;

export const GET_COURSE_BY_SLUG_BASICS_AND_LEVEL = gql`
  query GetCourseBasicsLevelByDBID($id: ID!) {
    course(id: $id, idType: SLUG) {
      title
      databaseId
      isLive
      isPartOfSubscription
      isAvailableOnlyALaCarte
      isPurchasableALaCarte
      isPartOfBundle
      willBeLive
      courseMetadata {
        courselevel
      }
    }
  }
`;

export const GET_COURSE_BY_SLUG_HIGHLIGHTS = gql`
  query GetCourseHighlightsByDBID($id: ID!) {
    course(id: $id, idType: SLUG) {
      courseMetadata {
        newCourseHighlights {
          highlightDescription
          videoId
        }
      }
    }
  }
`;

export const GET_COURSE_BY_SLUG_BEFORE_AND_AFTER = gql`
  query GetCourseBefAfterByDBID($id: ID!) {
    course(id: $id, idType: SLUG) {
      courseMetadata {
        beforeandafter {
          mediaItemUrl
        }
      }
    }
  }
`;

export const GET_COURSE_BY_SLUG_EXTRAS_COURSE_HERO = gql`
  query GetCourseExtrasHeroByDBID($id: ID!) {
    course(id: $id, idType: SLUG) {
      courseMetadata {
        courseDuration
        courselevel
        scheduledreleasedate
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
`;

export const GET_COURSE_BY_SLUG_EXTRAS_COURSE_HERO_STICKY = gql`
  query GetCourseExtasByDBID($id: ID!) {
    course(id: $id, idType: SLUG) {
      slug
      courseMetadata {
        courseDetailPicture {
          mediaItemUrl
        }
        courseThumbnailPicture {
          mediaItemUrl
        }
        vimeoid {
          chapter
        }
        averageRating
        noOfTestimonials
        courseHeroDescription
        courseHeroDescription
        vimeoPromoId
      }
    }
  }
`;

export const GET_COURSE_BY_SLUG_EDUCATORS_BASIC = gql`
  query GetCourseEdusByDBID($id: ID!) {
    course(id: $id, idType: SLUG) {
      courseMetadata {
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
            }
          }
        }
      }
    }
  }
`;

export const GET_COURSE_BY_SLUG_FORMULAS = gql`
  query GetCourseFormulasByDBID($id: ID!) {
    course(id: $id, idType: SLUG) {
      courseMetadata {
        formulas
      }
    }
  }
`;

export const GET_COURSE_BY_SLUG_PART_OF_SERIES = gql`
  query GetCourseSlugSeriesByDBID($id: ID!) {
    course(id: $id, idType: SLUG) {
      courseMetadata {
        partofseries {
          ... on CourseSeries {
            id
            courseSeriesMetadata {
              coursesinseries {
                ... on Course {
                  id
                  databaseId
                }
              }
            }
          }
        }
      }
    }
  }
`;

export const GET_COURSE_BY_SLUG_ALL = gql`
  query GetCourseBySlugAll($id: ID!) {
    course(id: $id, idType: SLUG) {
      title
      content
      databaseId
      isLive
      isPartOfSubscription
      isAvailableOnlyALaCarte
      isPurchasableALaCarte
      isPartOfBundle
      willBeLive
      isPartOfSeries
      tags {
        nodes {
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
        scheduledreleasedate
        courseDuration
        courselevel
        averageRating
        noOfTestimonials
        courseHeroDescription
        vimeoPromoId
        formulas
        subscriptiontier
        price
        youwilllearn
        relatedcourses {
          ... on Course {
            title
            slug
            databaseId
            categories {
              nodes {
                name
              }
            }
            courseMetadata {
              subscriptiontier
              scheduledreleasedate
              courseDuration
              averageRating
              noOfTestimonials
              courseHeroDescription
              vimeoPromoId
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
        courseChapters {
          chapterDuration
          chapterName
          chapterStartsAt
          fieldGroupName
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
        newCourseHighlights {
          highlightDescription
          videoId
        }
        beforeandafter {
          mediaItemUrl
        }
        courseDetailPicture {
          mediaItemUrl
        }
        courseThumbnailPicture {
          mediaItemUrl
        }
        vimeoid {
          chapter
        }
        educators {
          ... on Educator {
            id
            slug
            title
            databaseId
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
          }
        }
        courseBrands{
          ... on Brand{
            slug
          }
        }
        partofseries {
          ... on CourseSeries {
            id
            courseSeriesMetadata {
              coursesinseries {
                ... on Course {
                  id
                  databaseId
                }
              }
            }
          }
        }
      }
    }
  }
`;

export const GET_DOWNLOADABLE_BY_SLUG_ALL = gql`
  query GetDownloadableBySlugAll($id: ID!) {
    downloadable(id: $id, idType: SLUG) {
      slug
      databaseId
      title
      content
      tags {
        nodes {
          name
          slug
        }
      }
      downloadablemetadata {
        downloadableFile {
          mediaItemUrl
        }
        downloadableImage {
          mediaItemUrl
        }
        downloadableHorizontalImage {
          mediaItemUrl
        }
        accessLevel
        relatedDownloadables {
          ... on Downloadable {
            slug
            databaseId
            title
            content
            downloadablemetadata {
              downloadableFile {
                mediaItemUrl
              }
              downloadableImage {
                mediaItemUrl
              }
              downloadableHorizontalImage {
                mediaItemUrl
              }
              accessLevel
            }
          }
        }
      }
    }
  }
`;

export const GET_COURSE_BY_SLUG_METADATA = gql`
  query GetCourseMetadataByDBID($id: ID!) {
    course(id: $id, idType: SLUG) {
      courseMetadata {
        coursemetatitle
        coursemetadescription
        courseThumbnailPicture {
          mediaItemUrl
        }
      }
    }
  }
`;


export const GET_BRAND = gql`
query getBrand {
  brands {
    nodes {
      slug
      title
      brandmetadata{
        logo{
          sourceUrl
        }
        brandCourses{
          ...on Course{
            databaseId
          }
        }
      }
    }
  }
}`