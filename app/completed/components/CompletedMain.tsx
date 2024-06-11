import React, { Suspense } from "react";
import { getRequestCookie } from "@/components/auth/getAuthCookie";
import { cookies } from "next/headers";
import { notFound } from "next/navigation";
// Components
import Certificate from '../components/Certificate'
import Sort from '../components/Sort';
import H3Text from '@/components/text/H3Text';
import { cn } from "@/utils/shadcn";

const CompletedMainCetificate = async ({
    searchParams,
    className,
    certificateWrapperClassName
}: {
    className?: string,
    certificateWrapperClassName?: string,
    searchParams: { [key: string]: string | string[] | undefined };
}) => {
    const user = await getRequestCookie(cookies());

    if (!user) {
        notFound();
    }

    const certificate = [];
    const sort = (
        searchParams.sort != null ? searchParams.sort : "asc"
    ) as string;
    const searchVal = searchParams?.q;
    return (
        <>
            <div className={cn("container max-auto", className)}>
                <div className='flex items-center'>
                    <H3Text text='Certificates' />
                    <div className='flex flex-grow justify-end '>
                        <Suspense>

                            <Sort className="mt-2" />
                        </Suspense>
                    </div>

                </div>

                <Suspense>
                    <Certificate certificateWrapperClassName={certificateWrapperClassName} className='mt-7' user={user} sort={sort} />
                </Suspense>
            </div>
        </>
    );
};

export default CompletedMainCetificate;
