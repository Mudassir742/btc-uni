import { gql } from "@apollo/client";

export const GET_NEW_STYLING_COURSES = gql`
query getNewStylingCourses {
  page(id: "433287", idType: DATABASE_ID) {
    stylingCourses {
      newStylingCourses {
        ... on Course {
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
          categories{
            nodes{
              name
            }
          } 
          courseMetadata {
            price
            subscriptiontier
            courseThumbnailPicture {
              mediaItemUrl
            }
            courseDetailPicture {
              mediaItemUrl
            }
            price
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
  }
}`;

export const GET_BRAIDS_STYLING_COURSES = gql`
query getBraidsStylingCourses {
  page(id: "433287", idType: DATABASE_ID) {
    stylingCourses {
      braidsStylingCourses {
        ... on Course {
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
            price
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
  }
}`;

export const GET_HEAT_STYLING_COURSES = gql`
query getHeatStylingCourses {
  page(id: "433287", idType: DATABASE_ID) {
    stylingCourses {
      heatStylesStylingCourses {
        ... on Course {
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
            price
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
  }
}`;

export const GET_SPECIAL_OCCASION_STYLING_COURSES = gql`
query getSpecialStylingCourses {
  page(id: "433287", idType: DATABASE_ID) {
    stylingCourses {
      specialOccasionStylingCourses {
        ... on Course {
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
            price
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
  }
}`;

export const GET_TEXTURE_STYLING_COURSES = gql`
query getTextureStylingCourses {
  page(id: "433287", idType: DATABASE_ID) {
    stylingCourses {
      textureStylingCourses {
        ... on Course {
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
            price
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
  }
}`;

export const GET_UPSTYLES_STYLING_COURSES = gql`
query getNewStylingCourses {
  page(id: "433287", idType: DATABASE_ID) {
    stylingCourses {
      upstylesAndBridalStylingCourses {
        ... on Course {
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
            price
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
  }
}`;