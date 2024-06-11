import { gql } from "@apollo/client";

// export const REGISTER_USER = gql`
//   mutation registerUser(
//     $email: String!
//     $firstName: String!
//     $lastName: String!
//   ) {
//     registerUser(
//       input: {
//         username: $email
//         email: $email
//         firstName: $firstName
//         lastName: $lastName
//       }
//     ) {
//       user {
//         databaseId
//       }
//     }
//   }
// `;

export const LOG_IN = gql`
  mutation logIn($login: String!, $password: String!) {
    loginWithCookies(input: {
      login: $login
      password: $password
    }) {
      status
    }
  }
`;

// in case user chose paid sub, after stripe payment is confirmed, a Sunbscription object is created in WP
// successfulPayment below is a formality, all will be true as we will only be tracking unsuccessful transations in stripe
export const CREATE_SUBSCRIPTION_MUTATION = gql`
  mutation CREATE_SUBSCRIPTION($input: CreateSubscriptionInput!) {
    createSubscription(input: $input) {
      subscription {
        title
        date
        successfulPayment
        subscriptionMetadata {
            subscriptiontype {
              ... on SubscriptionType {
                id
              }
            }
            subscriptionstartson
            subscriptionrenewson
            subscriptionexpireson
            subscriptionduration
            tigiftrecipientemail
            userid
            tipurchaseid
            tiaffiliate
            tiamountcharged
            appliedcodename
            revenuetype
            quantity
            referrer
            referrertype
            paymenttype
            timestampdate
            activeon
            personalizedmessage
          }
      }
    }
  }
`;

// in case user chose paid sub, after stripe payment is confirmed, a UserData object is created in WP
// alternatively, if the user only regisers w/o subscribing, a UserData object is created in WP
export const CREATE_USERDATA_MUTATION = gql`
  mutation CREATE_USERDATA($input: CreateUserDataInput!) {
    createUserData(input: $input) {
      userData {
        title
        date
        userDataMetadata {
            emailaddress
            firstname
            lastname
            fullname
            address1
            address2
            city
            state
            zipcode
            tistripecustomerid
            userid
            joindate
            latestsubscription {
            ... on Subscription {
                id
            }
            }
            birthday
            referrer {
            ... on UserData {
                id
            }
            }
            usedcodes {
            ... on Code {
                id
            }
            }
            userlatitude
            userlongitude
        }
      }
    }
  }
`;

export const ADD_SUBSCRIPTION_TO_USERDATA = gql`
  mutation AddVideoPlaysToCourse($courseId: ID!, $videoPlayIds: [ID!]!) {
    addVideoPlaysToCourse(input: { courseId: $courseId, videoPlayIds: $videoPlayIds }) {
      course {
        id
        title
        courseMetadata {
          testrel {
            ... on VideoPlay {
              id
              title
            }
          }
        }
      }
    }
  }
`;

// Mutation to create an AccessedCourse object in case the user never accessed the course before

// export const CREATE_ACCESSED_COURSE_MUTATION = gql`
//   mutation CREATE_ACCESSED_COURSE($input: CreateAccessedCourseInput!) {
//     createAccessedCourse(input: $input) {
//       accessedCourse {
//         title
//         accessedcoursemetadata {
//           userid
//           courseid
//           startdate
//           status
//           endTime
//           endedAtChapter
//         }
//       }
//     }
//   }
// `;

// Mutation to create and add the AccessedCourse object to a UserData object
export const CREATE_ACCESSED_COURSE_MUTATION = gql`
  mutation CompleteCourse($input: CompleteCourseInput!) {
    completeCourse(input: $input) {
      accessedCourseId
    }
  }
`;

export const UPDATE_ACCESSED_COURSE_MUTATION = gql`
  mutation MyUpdateAccessedCourse($input: MyUpdateAccessedCourseInput!) {
    myUpdateAccessedCourse(input: $input) {
      accessedCourseId
    }
  }
`;

export const UPDATE_ACCESSED_COURSE = gql`
  mutation MyUpdateAccessedCourse($input: MyUpdateAccessedCourseInput!) {
    myUpdateAccessedCourse(input: $input) {
      clientMutationId
    }
  }
`;

export const UPDATE_ACCESSED_COURSE_NOTE = gql`
  mutation MyUpdateAccessedCourseNote($input: MyUpdateAccessedCourseNoteInput!) {
    myUpdateAccessedCourseNote(input: $input) {
      clientMutationId
    }
  }
`;

// export const UPDATE_ACCESSED_COURSE_MUTATION = gql`
//   mutation UpdateAccessedCourse($input: UpdateAccessedCourseInput!) {
//     updateAccessedCourse(input: $input) {
//       accessedCourseId
//     }
//   }
// `;


export const UPDATE_ACCESSED_COURSE_COMPLETION = gql`
  mutation UpdateAccessedCourse($input: UpdateAccessedCourseCompletionInput!) {
    updateAccessedCourse(input: $input) {
      updated
    }
  }
`;


// Mutation to add the AccessedCourse object to a UserData object -- deprecated
export const ADD_ONE_ACCESED_COURSE_TO_USER_DATA = gql`
  mutation AddAccessedCourseToUserData($userdataId: ID!, $accessedcourseId: ID!) {
    addAccessedCourseToUserData(input: { userdataId: $userdataId, accessedcourseId: $accessedcourseId }) {
      userData {
        databaseId
        userDataMetadata {
          accessedcourses {
            ... on AccessedCourse {
              id
            }
          }
        }
      }
    }
  }
`;


// Mutation to edit the AccessedCourse object - completiondate and endTime fields
export const UPDATE_ACCESED_COURSE_COMPLETION_END = gql`
  mutation UpdateAccessedCourse($input: UpdateAccessedCourseCompletionAndEndInput!) {
    updateAccessedCourse(input: $input) {
      accessedCourse {
        databaseId
        isCompleted
        accessedcoursemetadata {
          completiondate
        }
      }
    }
  }
`;


// Mutation to edit the AccessedCourse object - endedAtChapter field
export const UPDATE_ACCESED_COURSE_COMPLETION_END_CHAPTER = gql`
  mutation UpdateAccessedCourse($input: UpdateAccessedCourseChapterInput!) {
    updateAccessedCourse(input: $input) {
      accessedCourse {
        databaseId
        accessedcoursemetadata {
          endedAtChapter
        }
      }
    }
  }
`;


// Mutation to edit the AccessedCourse object - endTime field
export const UPDATE_ACCESED_COURSE_COMPLETION_END_TIME = gql`
  mutation UpdateAccessedCourse($input: UpdateAccessedCourseEndInput!) {
    updateAccessedCourse(input: $input) {
      accessedCourse {
        databaseId
        accessedcoursemetadata {
          endTime
        }
      }
    }
  }
`;

// Hamzah subscription mutations
export const RESET_PASSWORD = gql`
  mutation ResetPassword($key: String!, $password: String!, $login: String!) {
    resetUserPassword(
      input: { login: $login, password: $password, key: $key }
    ) {
      clientMutationId
    }
  }
`;
export const SEND_PASSWORD_EMAIL = gql`
  mutation SendPassoword($username: String!) {
    sendPasswordResetEmail(input: { username: $username }) {
      success
    }
  }
`;

export const CREATE_SUBSCRIPTION = gql`
  mutation CreateSubscription($input: CreateSubscriptionInput!) {
    createSubscription(
      input: $input
    ) {
      subscription{
        databaseId
      }
    }
  }
`;
export const UPDATE_SUBSCRIPTION_IN_USERDATA = gql`
  mutation UpdateSubscriptionInUserData($input: UpdateUserDataInput!) {
    updateUserData(
      input: $input
    ) {
      clientMutationId
    }
  }
`;


// Mutation to add a liked Course to UserData - Mihai
export const ADD_ONE_LIKED_COURSE_TO_USERDATA = gql`
  mutation AddLikedCourseToUserData($userdataId: ID!, $courseId: ID!) {
    addLikedCourseToUserData(input: { userdataId: $userdataId, courseId: $courseId }) {
      userData {
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
  }
`;

// Mutation to remove a liked Course from UserData - Mihai
export const REMOVE_ONE_LIKED_COURSE_FROM_USERDATA = gql`
  mutation RemoveLikedCourseFromUserData($userdataId: ID!, $courseId: ID!) {
    removeLikedCourseFromUserData(input: { userdataId: $userdataId, courseId: $courseId }) {
      userData {
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
  }
`;

// Mutation to add a liked Educator to UserData - Mihai
export const ADD_ONE_LIKED_EDUCATOR_TO_USERDATA = gql`
  mutation AddLikedEducatorToUserData($userdataId: ID!, $educatorId: ID!) {
    addLikedEducatorToUserData(input: { userdataId: $userdataId, educatorId: $educatorId }) {
      userData {
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
  }
`;

// Mutation to remove a liked Educator from UserData - Mihai
export const REMOVE_ONE_LIKED_EDUCATOR_FROM_USERDATA = gql`
  mutation RemoveLikedEducatorFromUserData($userdataId: ID!, $educatorId: ID!) {
    removeLikedEducatorFromUserData(input: { userdataId: $userdataId, educatorId: $educatorId }) {
      userData {
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
  }
`;



// Hamzah Authentication

export const USER_DATA_FRAG = gql`
  fragment UserDataFrag on User {
    databaseId
    name
    email
    isVerified
    userDatas {
      edges {
        node {
          databaseId
        }
      }
    }
    stripe {
      cus_id
    }
  }
`;

export const LOGIN_MUTATION = gql`
  ${USER_DATA_FRAG}
  mutation Login($input: LoginInput!) {
    login(input: $input) {
      authToken
      refreshToken
      userData: user {
        ...UserDataFrag
      }
    }
  }
`;

export const CREATE_USER_DATA = gql`
  mutation CreateUserData($input: CreateUserDataInput!) {
    createUserData(input: $input) {
      userData {
        databaseId
      }
    }
  }
`;

export const REFRESH_TOKEN_MUTATION = gql`
  mutation RefreshAuthToken($refreshToken: String!) {
    refreshToken(input: { refreshToken: $refreshToken }) {
      authToken
      success
    }
  }
`;

export const REGISTER_USER = gql`
  mutation RegisterUser($input: RegisterUserInput!) {
    registerUser(input: $input) {
      userData: user {
        databaseId
        isVerified
        name
        email
        auth {
          authToken
          refreshToken
        }
      }
    }
  }
`;
export const UPDATE_ADDRESS = gql`
  mutation UpdateUser($input: UpdateUserInput!) {
    updateUser(input: $input) {
      user {
        address {
          address1
        }
      }
    }
  }
`;
export const UPDATE_USER_DATA = gql`
  mutation UpdateUserData($input: UpdateUserDataInput!) {
    updateUserData(input: $input) {
      userData{
        id
      }
    }
  }
`;

// Cancel Subscription
export const CANCEL_SUBSCRIPTION = gql`
mutation updateSub($input: UpdateSubscriptionInput!) {
  updateSubscription(input: $input) {
    subscription {
      databaseId
      subscriptionMetadata {
        stripesubscriptionid
        subscriptioncancelationreason
      }
    }
  }
}
`;

// Mutation to create and add the Testimonial object to a UserData object and Course object
export const CREATE_TESTIMONIAL_MUTATION = gql`
  mutation CompleteTestimonial($input: CompleteTestimonialInput!) {
    completeTestimonial(input: $input) {
      testimonialId
    }
  }
`;