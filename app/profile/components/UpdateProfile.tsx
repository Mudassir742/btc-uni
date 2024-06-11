"use client"

import { FC, useState, useTransition } from "react";
// Libs
import { UserSession } from "@/interfaces";
import toast from "react-hot-toast";
import { generateWpPageError } from "@/utils/wpErrorHandling";
import { IUserProfile } from "@/features/wp/user";
// Constants
// Components

import B1Text from "@/components/text/B1Text";
import Loader from "@/components/ui/Loader";
import { User } from 'lucide-react';
import { useRouter } from "next/navigation";
import ParagraphText from "@/components/text/Paragraph";
import H4Text from "@/components/text/H4Text";
import H3Text from "@/components/text/H3Text";

const themecolor = '#523D34'

interface IProps {
    user: UserSession
    userAdditionalData: IUserProfile
}


export const UpdateProfile: FC<IProps> = ({ user, userAdditionalData }) => {
    // const [selectedImage, setSelectedImage] = useState<File | null>(null);
    const [url, setUrl] = useState<string | null>(userAdditionalData.user?.avatarUrl);
    const [pending, startTransition] = useTransition()
    const [isLoading, setIsLoading] = useState(false)

    const handleImageChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files && event.target.files.length > 0) {
            // setSelectedImage(event.target.files[0]);
            handleUpload(event.target.files[0]);
        }

    };

    const { refresh } = useRouter()

    const handleUpload = (file: File | null) => {
        if (file && file?.size < 2000000) {
            setIsLoading(true);
            const formData = new FormData();
            formData.append("operations", JSON.stringify({
                query: `
                    mutation upload($id:ID!, $avatar:Upload!) {
                        uploadUserAvatar(
                            input: {userId: $id, avatar:$avatar}
                        ) {
                            avatarUrl
                        }
                    }
                `,
                variables: {
                    id: Number(user.userData?.databaseId),
                    avatar: null // Placeholder for the selected image file
                }
            }));
            formData.append("map", JSON.stringify({ "0": ["variables.avatar"] }));
            formData.append("0", file);

            fetch(process.env.NEXT_PUBLIC_WORDPRESS_API_URL!, {
                method: "POST",
                body: formData,
                headers: {
                    "Authorization": `Bearer ${user?.authToken}`,
                }
            })

                .then(response => response.json())
                .then(data => {
                    if (data?.errors) {
                        console.log(data?.errors)
                        throw data.errors;
                    }
                    startTransition(() => {
                        setUrl(data.data.uploadUserAvatar?.avatarUrl);
                    })
                    // return data.
                })
                .catch(error => {
                    toast.error(generateWpPageError(error).message);
                    console.log(error)
                })
                .finally(() => {
                    setIsLoading(false);
                    refresh();
                })
        } else {
            toast.error('File limit exceeds 2MB. Please select smaller files.');
        }
    };
    return <>
        <div >
            <div className="items-center flex justify-center md:justify-start">

             

                <H3Text text="My Profile" />
            </div>
        </div>
        <div className="space-under-category-titles" />
        <label
            htmlFor="avatar"
            className="flex justify-center items-center flex-col w-fit mx-auto cursor-pointer"
        >
            {/* File upload component */}
            <input
                name="avatar"
                type="file"
                id="avatar"
                hidden
                accept="image/png, image/jpeg, image/jpg"
                onChange={handleImageChange}
            />
            <div className="rounded-full w-36 h-36 flex relative justify-center items-center bg-pressedGrey">

                {
                    pending || isLoading ?

                        <Loader className="h-10 w-10 ml-3" /> :
                        url ?


                            <img
                                className="rounded-full w-36 h-36 object-cover object-top "
                                src={url}
                                alt="avatar"
                            />
                            :
                            <div className='rounded-full '>

                                <User size={90}
                                    color={themecolor} />


                            </div>
                }
            </div>
            <div className="flex justify-center mt-2 text-themeColor">
                <B1Text text={!url ? 'Add your photo' : 'Update your photo'} />
            </div>
        </label>
        <div className="small-space" />
        <div className="flex text-center justify-center">
            <H4Text text={`${userAdditionalData.user.firstName}\u00A0${userAdditionalData.user.lastName}`} />
        </div>
        <div className="flex justify-center">
            <ParagraphText text={user.userData?.email!} />
            <div className="space-between-categories" />
        </div>

        {/* <div className="flex justify-center">
            <button onClick={handleUpload}>Upload Avatar</button>
        </div> */}

    </>;
}