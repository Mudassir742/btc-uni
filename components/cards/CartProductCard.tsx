import { FC, HTMLAttributes } from "react";
// Utils
import { cn } from "@/utils/shadcn";
import Stripe from "stripe";
// Components
import Image from "next/image";
import Rating from "@/components/ui/Ratings";
import { PurchasedBundle, PurchasedCourse } from "@/interfaces";
import Link from "next/link";

interface IMetadata {
  "wp-id": string;
  "number-of-reviews": string;
  rating: string;
}

interface IProps extends HTMLAttributes<HTMLDivElement> {
  pData: PurchasedBundle | PurchasedCourse

}

const CartProductCard: FC<IProps> = ({
  className,
  pData,
  ...props
}) => {

  let pImage: string;
  let pName: string;
  let pPrice: number = 0;
  let uri: string;

  if ("course" in pData) {
    pImage = pData.course.courseMetadata.courseDetailPicture.mediaItemUrl
    pName = pData.course.title
    pPrice = pData.course.courseMetadata.price
    uri = `/courses/${pData.course.slug}`
  } else {
    pImage = pData.courseBundle.coursebundlemetadata.bundleimage.mediaItemUrl
    pName = pData.courseBundle.title
    uri = `/collections/${pData.courseBundle.slug}`
    pPrice = pData.courseBundle.coursebundlemetadata.actualprice
  }


  return (
    <Link href={uri} target="_blank" className="group block" >
      <div className={cn("flex flex-col   gap-y-4 gap-x-3", className)} {...props}>
        {/* Image */}
        <div>
          <Image
            width={150}
            height={176}
            className="rounded-xl min-h-44 w-full  object-cover min-w-[7.75rem]"
            src={pImage}
            alt={pName}
          />
        </div>
        {/* Name */}
        {/* <div className="flex-1 flex-col flex justify-center gap-y-2 text-themeColor mt-2 xs:mt-0">
        <h2 className="font-bold text-lg">{pData.name}</h2>
        {!isNaN(Number(metaData.rating)) && (
          <Rating value={Number(metaData.rating)} />
        )}
        <span>{metaData["number-of-reviews"]} Reviews</span>
      </div> */}
        <div>
          <h3 className="text-xl group-hover:text-themecolor-500 duration-300">
            {pName}
          </h3>
          <h3 className="font-bold text-lg mt-2">
            ${pPrice && pPrice.toFixed(2)}
          </h3>
        </div>
      </div>
    </Link>
  );
};

export default CartProductCard;
