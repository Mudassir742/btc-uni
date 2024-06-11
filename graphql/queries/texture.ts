import { gql } from "@apollo/client";

export const GET_NEW_TEXTURE_COURSES = gql`
query getNewTextureCourses {
  page(id: "433288", idType: DATABASE_ID) {
    textureCourses {
      newTextureCourses {
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

export const GET_BUSINESS_TEXTURE_COURSES = gql`
query getBusinessTextureCourses {
  page(id: "433288", idType: DATABASE_ID) {
    textureCourses {
      businessTextureCourses {
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

export const GET_CUTTING_STYLING_TEXTURE_COURSES = gql`
query getCuttingTextureCourses {
  page(id: "433288", idType: DATABASE_ID) {
    textureCourses {
      cuttingAndStylingTextureCourses {
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

export const GET_HAIRCOLOR_TEXTURE_COURSES = gql`
query getHaircolorTextureCourses {
  page(id: "433288", idType: DATABASE_ID) {
    textureCourses {
      hairColorTextureCourses {
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