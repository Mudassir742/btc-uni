import { gql } from "@apollo/client";

export const GET_ALL_RESOURCES_SLUG = gql`
query GET_ALL_RESOURCES_SLUG{
	downloadables (where: {status: PUBLISH}, first: 999) {
    nodes{
      slug
    }
  }
}
`;