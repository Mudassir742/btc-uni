import { gql } from "@apollo/client";

export const GET_NEW_EXTENSIONS_COURSES = gql`
query getNewExtensionsCourses {
  page(id: "433290", idType: DATABASE_ID) {
    extensionsCourses {
      newExtensionsCourses {
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

export const GET_ALL_EXTENSIONS_COURSES = gql`
query getAllExtensionsCourses {
  page(id: "433290", idType: DATABASE_ID) {
    extensionsCourses {
      hairExtensionsCourses {
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
