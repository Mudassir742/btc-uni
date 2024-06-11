import { gql } from "@apollo/client";

export const GET_FAVORITE_BUSINESS_COURSES = gql`
query getFavoriteBusinessCourses {
  page(id: "433263", idType: DATABASE_ID) {
    businessCourses {
      favoriteBusinessCourses {
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

export const GET_FAVORITE_HAIRCOLOR_COURSES = gql`
query getFavoriteHaircolorCourses {
  page(id: "433285", idType: DATABASE_ID) {
    hairColorCourses {
      favoriteHairColorCourses {
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

export const GET_FAVORITE_HAIRCUTTING_COURSES = gql`
query getFavoriteHaircuttingCourses {
  page(id: "433286", idType: DATABASE_ID) {
    haircuttingCourses {
      favoriteHaircuttingCourses {
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

export const GET_FAVORITE_TEXTURE_COURSES = gql`
query getFavoriteTextureCourses {
  page(id: "433288", idType: DATABASE_ID) {
    textureCourses {
      favoriteTextureCourses {
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

export const GET_FAVORITE_STYLING_COURSES = gql`
query getFavoriteStylingCourses {
  page(id: "433287", idType: DATABASE_ID) {
    stylingCourses {
      favoriteStylingCourses {
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

export const GET_FAVORITE_MENS_COURSES = gql`
query getFavoriteMensCourses {
  page(id: "433289", idType: DATABASE_ID) {
    mensCourses {
      favoriteMensCourses {
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
export const GET_FAVORITE_EXTENSIONS_COURSES = gql`
query getFavoriteExtensionsCourses {
  page(id: "433290", idType: DATABASE_ID) {
    extensionsCourses {
      favoriteExtensionsCourses {
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

export const GET_HOME_PAGE_DOWNLOADABLES = gql`
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
          }
        }
      }
    }
  }
}`;

export const GET_HOME_PAGE_TIPS = gql`
query getHomePageDownloadablesTips ($id: ID!) {
  page(id: $id, idType: DATABASE_ID) {
    homePage {
      tips {
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

export const GET_ALL_TIPS = gql`
query getAllTips {
  tips(first: 999) {
    nodes {
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
}`;

export const GET_ALL_DOWNLOADABLES = gql`
query getAllDownloadables {
  downloadables(first: 999) {
    nodes {
      slug
      databaseId
      title
      content
      downloadablemetadata {
        downloadableImage {
          mediaItemUrl
        }
        downloadableEducators {
          ... on Educator {
            slug
          }
        }
        downloadableBrands{
          ... on Brand{
            slug
          }
        }
      }
    }
  }
}`;