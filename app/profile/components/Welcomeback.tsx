"use client"

import { FC, useState, useTransition } from "react";
// Libs
import { UserSession } from "@/interfaces";
import { gql } from "@apollo/client";
import toast from "react-hot-toast";

import { IUserProfile } from "@/features/wp/user";
// Constants

// Components

import { useRouter } from "next/navigation";

import H3Text from "@/components/text/H3Text";


interface IProps {
    user: UserSession
    userAdditionalData: IUserProfile
}


export const Welcomeback: FC<IProps> = ({ user, userAdditionalData }) => {
    // const [selectedImage, setSelectedImage] = useState<File | null>(null);
    const [url, setUrl] = useState<string | null>(userAdditionalData.user?.avatarUrl);
    const [pending, startTransition] = useTransition()
    const [isLoading, setIsLoading] = useState(false)



    const { refresh } = useRouter()


    return <>
        <div className="container flex md:justify-center pt-4">
            <H3Text text={`Welcome back, ${userAdditionalData.user.firstName} ${userAdditionalData.user.lastName}!`} />

        </div>
        <div className="space-under-category-titles" />



    </>;
}