import React from "react";
import {
  extractDownloadableAll,
  getDownloadableAll,
} from "../helper";
import { Suspense } from "react";
import { Skeleton } from "@/components/ui/Skeleton";
import SuggestedDownloadsInner from "./SuggestedDownloadsInner";

interface SuggestedDownloadsProps {
  params: { slug: string };
}

const SuggestedDownloads: React.FC<SuggestedDownloadsProps> = async ({
  params,
}) => {
  const downloadableAllProm = getDownloadableAll(params);

  const downloadableData = await downloadableAllProm;

  const { relatedDownloadables } = extractDownloadableAll(downloadableData);

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
      <SuggestedDownloadsInner relatedDownloadables={relatedDownloadables} />
    </Suspense>
  );
};

export default SuggestedDownloads;
