import { gql } from "@apollo/client";

export const GET_USERDATA_FIRST_NAME_LAST_NAME_BY_DATABASE_ID = gql`
query GetUserDatFirstNameLastNameByDBID($id: ID!) {
  userData(id: $id, idType: DATABASE_ID) {
    userDataMetadata {
      firstname
      lastname
    }
  }
}
`;

export const GET_USERDATA_ACCESSED_COURSES_BASIC_BY_DATABASE_ID = gql`
query GetUserDataAccessedCoursesBasicByDBID($id: ID!) {
  userData(id: $id, idType: DATABASE_ID) {
    userDataMetadata {
      accessedcourses {
        ... on AccessedCourse {
          databaseId
          isCompleted
          accessedcoursemetadata {
            courseid
          }
        }
      }
    }
  }
}
`;

export const GET_USERDATA_ACCESSED_COURSES_FOR_YOUTUBECARDS_BY_DATABASE_ID = gql`
query GetUserDataAccessedCoursesForYoutubeCardsByDBID($id: ID!) {
  userData(id: $id, idType: DATABASE_ID) {
    userDataMetadata {
      accessedcourses {
        ... on AccessedCourse {
          databaseId
          isCompleted
          accessedcoursemetadata {
            courseid
            belongstocourse {
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
    }
  }
}
`;

export const GET_USERDATA_PURCHASED_COURSES_FOR_YOUTUBECARDS_BY_DATABASE_ID = gql`
query GetUserDataPurchasedCoursesByDBIDForYtCards($id: ID!) {
  userData(id: $id, idType: DATABASE_ID) {
    userDataMetadata {
      purchasedcourses {
        ... on Course {
          databaseId
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

export const GET_USERDATA_PURCHASED_BUNDLES_FOR_YOUTUBECARDS_BY_DATABASE_ID = gql`
query GetUserDataPurchasedBundlesByDBIDForYtCards($id: ID!) {
  userData(id: $id, idType: DATABASE_ID) {
    userDataMetadata {
      purchasedbundless {
        ... on CourseBundle {
          databaseId
          coursebundlemetadata {
            coursesinbundle {
              ... on Course {
                databaseId
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
    }
  }
}
`;

export const GET_USERDATA_PURCHASED_SUBSCRIPTIONS_BY_DATABASE_ID = gql`
query GetUserDataPurchasedSubsByDBID($id: ID!) {
  userData(id: $id, idType: DATABASE_ID) {
    userDataMetadata {
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
    }
  }
}
`;

export const GET_USERDATA_PURCHASED_COURSES_BY_DATABASE_ID = gql`
query GetUserDataPurchasedCoursesByDBID($id: ID!) {
  userData(id: $id, idType: DATABASE_ID) {
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

export const GET_USERDATA_PURCHASED_BUNDLES_BY_DATABASE_ID = gql`
query GetUserDataPurchasedBundlesByDBID($id: ID!) {
  userData(id: $id, idType: DATABASE_ID) {
    userDataMetadata {
      purchasedbundless {
        ... on CourseBundle {
          databaseId
          coursebundlemetadata {
            coursesinbundle {
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

export const GET_USERDATA_LIKED_COURSES_BY_DATABASE_ID = gql`
query GetUserDataLidedCoursesByDBID($id: ID!) {
  userData(id: $id, idType: DATABASE_ID) {
    databaseId
    userDataMetadata {
      likedCourses {
        ... on Course {
          databaseId
        }
      }
    }
  }
}
`;

export const GET_USERDATA_LIKED_EDUCATORS_BY_DATABASE_ID = gql`
query GetUserDataLikedEducatorsByDBID($id: ID!) {
  userData(id: $id, idType: DATABASE_ID) {
    databaseId
    userDataMetadata {
      likededucators {
        ... on Educator {
          databaseId
        }
      }
    }
  }
}
`;

export const GET_USERDATA_LIKED_COURSES_FOR_YOUTUBECARDS_BY_DATABASE_ID = gql`
query GetUserDataLidedCoursesForYoutubeCardsByDBID($id: ID!) {
  userData(id: $id, idType: DATABASE_ID) {
    databaseId
    userDataMetadata {
      likedCourses {
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

export const GET_USERDATA_LIKED_EDUCATORS_FOR_EDUCATORCARDS_BY_DATABASE_ID = gql`
query GetUserDataLikedEducatorsForEducatorCardsByDBID($id: ID!) {
  userData(id: $id, idType: DATABASE_ID) {
    databaseId
    userDataMetadata {
      likededucators {
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
    }
  }
}
`;

export const GET_USERDATA_ACCESSED_COURSES_EXTENDED_COURSE_HERO_BY_DATABASE_ID = gql`
query GetUserDataCourseHeroByDBID($id: ID!) {
  userData(id: $id, idType: DATABASE_ID) {
    userDataMetadata {
      accessedcourses {
        ... on AccessedCourse {
          databaseId
          isCompleted
          hasPostedTestimonial
          accessedcoursemetadata {
            courseid
            endedAtChapter
            endTime
            coursenotes
            courseNotesLastSavedOn
          }
        }
      }
    }
  }
}
`;

// export const GET_USERDATA_TESTIMONIALS_COURSE_HERO_BY_DATABASE_ID = gql`
// query GetUserDataTestimonialsByDBID($id: ID!) {
//   userData(id: $id, idType: DATABASE_ID) {
//     userDataMetadata {
//       testimonials {
//         ... on Testimonial {
//           databaseId
//           testimonialMetadata {
//             courseid
//           }
//         }
//       }
//     }
//   }
// }
// `;
// deprecated, instead of fetching all testimonials we use the hasPostedTestimonial bool in accessedcourses to tell if a testimonial has already been posted


// export const GET_USERDATA_COURSE_SLUG_PAGE = gql`
// query GetUserDataForCourseSlugByDBID($id: ID!) {
//   userData(id: $id, idType: DATABASE_ID) {
//     databaseId
//     userDataMetadata {
//       emailaddress
//       likedCourses {
//         ... on Course {
//           databaseId
//         }
//       }
//       purchasedsubscriptions {
//         ... on Subscription {
//           id
//           databaseId
//           subscriptionMetadata {
//             subscriptionstartson
//             subscriptionexpireson
//             subscriptionrenewson
//             subscriptiontype {
//               ... on SubscriptionType {
//                 id
//                 databaseId
//                 subscriptionTypeMetadata {
//                   tier
//                 }
//               }
//             }
//           }
//         }
//       }
//       purchasedcourses {
//         ... on Course {
//           databaseId
//         }
//       }
//       purchasedbundless {
//         ... on CourseBundle {
//           coursebundlemetadata {
//             coursesinbundle {
//               ... on Course {
//                 databaseId
//               }
//             }
//           }
//         }
//       }
//       accessedcourses {
//         ... on AccessedCourse {
//           databaseId
//           isCompleted
//           accessedcoursemetadata {
//             courseid
//             endedAtChapter
//             endTime
//           }
//         }
//       }
//     }
//   }
// }
// `;
// above deprecated and made more efficient below for the course slug page on jan 5

// export const GET_USERDATA_COURSE_SLUG_PAGE = gql`
// query GetUserDataForCourseSlugByDBID($id: ID!) {
//   userData(id: $id, idType: DATABASE_ID) {
//     databaseId
//     userDataMetadata {
//       emailaddress
//       firstname
//       lastname
//       purchasedsubscriptions {
//         ... on Subscription {
//           id
//           databaseId
//           subscriptionMetadata {
//             subscriptionstartson
//             subscriptionexpireson
//             subscriptionrenewson
//             subscriptiontype {
//               ... on SubscriptionType {
//                 id
//                 databaseId
//                 subscriptionTypeMetadata {
//                   tier
//                 }
//               }
//             }
//           }
//         }
//       }
//     }
//   }
// }
// `;
// above deprecated on jan 15

export const GET_USERDATA_COURSE_SLUG_PAGE = gql`
query GetUserDataForCourseSlugByDBID($id: ID!) {
  userData(id: $id, idType: DATABASE_ID) {
    userDataMetadata {
      fullname
    }
  }
}
`;

export const GET_USERDATA_EDUCATOR_SLUG_PAGE = gql`
query GetUserDataForEducatorSlugByDBID($id: ID!) {
  userData(id: $id, idType: DATABASE_ID) {
    userDataMetadata {
      accessedcourses {
        ... on AccessedCourse {
          databaseId
          isCompleted
          accessedcoursemetadata {
            courseid
          }
        }
      }
    }
  }
}
`;

