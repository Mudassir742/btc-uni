import React from "react";
import { extractDownloadableAll, getDownloadableAll } from "../helper";
import { Suspense } from "react";
import { Skeleton } from "@/components/ui/Skeleton";
import ParagraphText from "@/components/text/Paragraph";

interface DownloadYouWillLearnProps {
  params: { slug: string };
}

const DownloadYouWillLearn: React.FC<DownloadYouWillLearnProps> = async ({
  params,
}) => {
  const downloadableAllProm = getDownloadableAll(params);

  const downloadableData = await downloadableAllProm;
  const { relatedDownloadables } = extractDownloadableAll(
    downloadableData
  );
  const DownloadYouWillLearn = 'you will learn - of the downloads here (if description is available)' || "null";

  return (
    <Suspense
      fallback={
        <div className="w-full flex flex-col gap-y-6">
          <Skeleton className="h-14" />
          <Skeleton className="h-14" />
          <Skeleton className="h-14" />
        </div>
      }
    >
      <ParagraphText text={DownloadYouWillLearn} />
    </Suspense>
  );
};

export default DownloadYouWillLearn;
