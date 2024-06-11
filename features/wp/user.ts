import { GET_USER_PROFILE } from "@/graphql/queries";
import { generateWpPageError } from "@/utils/wpErrorHandling";

export interface IUserProfile {
    user: {
        firstName: string,
        lastName: string,
        address: { address1: string },
        avatarUrl: string,
        phone:string
    }
}

export const getProfile = async (userId: number) => {
    if(userId) {

        const response = await fetch(process.env.NEXT_PUBLIC_WORDPRESS_API_URL!, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
            },
            // cache: "force-cache",
            body: JSON.stringify({
                query: GET_USER_PROFILE.loc?.source.body,
                cache: "no-cache",
                variables: {
                    id: Number(`${userId}`),
                }
            }),
        });
    
        const { data, errors } = await response.json();
    
        if (errors) {
            throw generateWpPageError(errors)
        }
    
        const currentUserData = data as IUserProfile
        return currentUserData;
    }else {
        return null
    }
};