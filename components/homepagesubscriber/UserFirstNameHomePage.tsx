import React from 'react';
import { UserSession } from '@/interfaces';
import { getCurrentUserDataFirstNameLastName } from '@/app/helper';
import H3Text from '../text/H3Text';

interface UserFirstNameHomePageProps {
    user: UserSession | null;
}

const UserFirstNameHomePage: React.FC<UserFirstNameHomePageProps> = async ({ user }) => {

    // check if user is logged in
    const isLoggedIn = (user?.userDataId || 0) > 0;

    const userDataFirstLastNamePromise = getCurrentUserDataFirstNameLastName(user?.userDataId || 0);

    const userDataFirstLastName = await userDataFirstLastNamePromise;
    const firstName = userDataFirstLastName?.userDataMetadata?.firstname || "";
    const lastName = userDataFirstLastName?.userDataMetadata?.fullname || "";

    return (
        <H3Text
          text={`Welcome back, ${firstName}!`}
          className="text-themeColor"
        />
    );
}

export default UserFirstNameHomePage;