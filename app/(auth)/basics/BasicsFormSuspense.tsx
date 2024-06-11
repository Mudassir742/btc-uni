import { FC, HTMLAttributes } from "react";
// Utils
import { cn } from "@/utils/shadcn";
// Lib
import { getUserAddress } from "@/features/login/userHandler";
// Types
import { Address, UserSession } from "@/interfaces";
import { IUserProfile } from "@/features/wp/user";
// Components
import BasicInfoForm from "@/components/auth/BasicInfoForm";
import H3Text from "@/components/text/H3Text";
import H5Text from "@/components/text/H5Text";

interface IProps extends HTMLAttributes<HTMLDivElement> {
  user: UserSession;
  refreshedToken?: string;
  type?: "page" | "modal";
  userAdditionalData?: IUserProfile;
  searchParams?: { [key: string]: string | string[] | undefined };
}

export const getUserInfo = async (session: UserSession) => {
  const res = await getUserAddress(session, {
    idType: "DATABASE_ID",
  });

  return res;
};

const BasicsFormSuspense: FC<IProps> = async ({
  className,
  refreshedToken,
  user,
  type = "page",
  userAdditionalData,
  searchParams,
  ...props
}) => {
  // Replace user token with the fresh token
  if (refreshedToken) {
    user.authToken = refreshedToken;
  }
  let userAddress = await getUserInfo(user);

  if (typeof userAddress === "string") {
    throw new Error("Somthing went wrong!");
  }
  const searchVal = searchParams?.q;
  return (
    <div className={cn("", className)} {...props}>
      <H5Text
        text="My Info"
className="pb-2 text-themeColor"
      />

  
      <BasicInfoForm
        user={user}
        type={type}
        addressData={{
          ...userAddress,
          phone: userAdditionalData?.user?.phone ?? userAddress.phone,
          firstName:
            userAdditionalData?.user.firstName ?? userAddress.firstName,
          lastName: userAdditionalData?.user.lastName ?? userAddress.lastName,
        }}
      />
    </div>
  )
};

export default BasicsFormSuspense;
