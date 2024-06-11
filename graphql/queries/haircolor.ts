import { gql } from "@apollo/client";

export const GET_NEW_HAIRCOLOR_COURSES = gql`
query getNewHaircolorCourses {
  page(id: "433285", idType: DATABASE_ID) {
    hairColorCourses {
      newHairColorCourses {
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

export const GET_BALAYAGE_HAIRCOLOR_COURSES = gql`
query getBalayageHaircolorCourses {
  page(id: "433285", idType: DATABASE_ID) {
    hairColorCourses {
      balayageHairColorCourses {
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

export const GET_BRUNETTES_HAIRCOLOR_COURSES = gql`
query getBrunettesHaircolorCourses {
  page(id: "433285", idType: DATABASE_ID) {
    hairColorCourses {
      brunettesHairColorCourses {
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

export const GET_CREATIVE_HAIRCOLOR_COURSES = gql`
query getCreativeHaircolorCourses {
  page(id: "433285", idType: DATABASE_ID) {
    hairColorCourses {
      creativeColorHairColorCourses {
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

export const GET_CURLS_TEXTURE_HAIRCOLOR_COURSES = gql`
query getCurlsHaircolorCourses {
  page(id: "433285", idType: DATABASE_ID) {
    hairColorCourses {
      curlsAndTextureHairColorCourses {
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

export const GET_FOILING_HAIRCOLOR_COURSES = gql`
query getFoilingHaircolorCourses {
  page(id: "433285", idType: DATABASE_ID) {
    hairColorCourses {
      foilingHairColorCourses {
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

export const GET_GRAY_HAIRCOLOR_COURSES = gql`
query getGrayHaircolorCourses {
  page(id: "433285", idType: DATABASE_ID) {
    hairColorCourses {
      grayCoverageHairColorCourses {
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

export const GET_LOWLIGHTS_HAIRCOLOR_COURSES = gql`
query getLowlightsHaircolorCourses {
  page(id: "433285", idType: DATABASE_ID) {
    hairColorCourses {
      lowlightsHairColorCourses {
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

export const GET_PLATINUM_BLONDES_HAIRCOLOR_COURSES = gql`
query getPlatinumHaircolorCourses {
  page(id: "433285", idType: DATABASE_ID) {
    hairColorCourses {
      platinumBlondesHairColorCourses {
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

export const GET_REDS_COPPERS_HAIRCOLOR_COURSES = gql`
query getRedsHaircolorCourses {
  page(id: "433285", idType: DATABASE_ID) {
    hairColorCourses {
      redsAndCoppersHairColorCourses {
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

export const GET_ROOT_SMUDGE_HAIRCOLOR_COURSES = gql`
query getRootHaircolorCourses {
  page(id: "433285", idType: DATABASE_ID) {
    hairColorCourses {
      rootSmudgeHairColorCourses {
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

export const GET_TONING_HAIRCOLOR_COURSES = gql`
query getToningHaircolorCourses {
  page(id: "433285", idType: DATABASE_ID) {
    hairColorCourses {
      toningTechniquesHairColorCourses {
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