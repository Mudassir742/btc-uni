import { gql } from "@apollo/client";

// mark
export const GET_EDUCATOR_BY_SLUG_FOR_EDU_SLUG_PAGE = gql`
query GetEducatorBySlugForEduSlugPage($id: ID!) {
    educator(id: $id, idType: SLUG) {
      title
      slug
      content
      databaseId
      educatorMetaData {
        firstname
        lastname
        instahandle
        educatortestimonials {
          ... on Testimonial {
            databaseId
            content
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
        educatorpicture {
          mediaItemUrl
        }
        courses {
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
`;

export const GET_EDUCATOR_BY_SLUG_FOR_EDU_SLUG_PAGE_METADATA = gql`
query GetEducatorBySlugForEduSlugPageMetadata($id: ID!) {
  educator(id: $id, idType: SLUG) {
    title
    educatorMetaData {
      instahandle
      shortBio
      educatorpicture {
        mediaItemUrl
      }
    }
  }
}
`;

export const GET_ALL_EDUCATOR_SLUG = gql`
query GetAllEducatorSlug{
  educators(where: {status: PUBLISH}, first: 999)  {
    nodes{
      slug
    }
  }
}

`;