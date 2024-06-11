import Sort from './Sort';
import { FC, Suspense } from "react";
import { cn } from "@/utils/shadcn";
import { UserSession } from "@/interfaces";
import dynamic from "next/dynamic";
// Components
import { AccessedCourse, getCertificates } from "../helper";
import { Button } from "@/components/ui/Button";
import { getProfile } from "@/features/wp/user";
import { formatDateToDisplay } from "@/utils/formatDate";
import CertificateClient from "./CertificateClient";

const image = '';


interface IProps extends React.HTMLAttributes<HTMLDivElement> {
    user: UserSession;
    sort: string
    certificateWrapperClassName?: string
}

const Certificate: FC<IProps> = async ({ sort,certificateWrapperClassName, user, className }) => {

    const userAdditionalDataProm = getProfile(user.userData?.databaseId!);
    const certificatesProm = getCertificates(user.userDataId!);

    const [userAdditionalData, certificates] = await Promise.all([userAdditionalDataProm, certificatesProm]);

    if (!certificates?.length) {
        return <div className="mt-4 text-themeColor">
            No Available Certificates
        </div>
    }
    // const uniqueCertificates: AccessedCourse[] = Array.from(new Set(certificates?.map(certificate => certificate.accessedcoursemetadata.belongstocourse.databaseId)))
    //     .map(id => {
    //         return certificates.find(certificate => certificate.accessedcoursemetadata.belongstocourse.databaseId === id);
    //     }) as AccessedCourse[];
    const fileteredCertificateData = certificates.filter(accessedCourse => (accessedCourse.isCompleted));
    const sortedCertificateData = sortData(fileteredCertificateData, sort);

    return (
        <CertificateClient className={certificateWrapperClassName} image={image} sortedCertificateData={sortedCertificateData} userAdditionalData={userAdditionalData}
        />
    );
};

export default Certificate;

const sortData = (data: AccessedCourse[], sortOrder: string): AccessedCourse[] => {
    return data.sort((a, b) => {
        const dateA = a.accessedcoursemetadata.completiondate ? new Date(a.accessedcoursemetadata.completiondate) : new Date(0);
        const dateB = b.accessedcoursemetadata.completiondate ? new Date(b.accessedcoursemetadata.completiondate) : new Date(0);

        if (sortOrder === "asc") {
            return dateB.getTime() - dateA.getTime();
        } else if (sortOrder === "desc") {
            return dateA.getTime() - dateB.getTime();
        }
        return 0;
    });
};