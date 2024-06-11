
import ExploreMoreCategories from "@/components/ExploreMoreCategories";

import { transformWpUrl } from "@/utils/url";
import Image from "next/image";
import Link from "next/link";

// export const dynamic = "force-dynamic"
export const metadata = {
  title: 'Social Climbing',
  description: 'Everything you need to know to grow on social media! Complete with 10 hours of education and a workbook.',
}

// export default function SocialClimbing() {
//   return (
//     <main>

//     <div className="bg-[#194D9F] relative justify-center">
   
          
//           <div className="absolute top-5 left-5 z-10">
//             <BackButton />
//           </div>
//     <div className="flex justify-center text-center">
//       <div className="hidden md:block">
//         {/* This image will be visible on desktop */}
//         <Image
//           src={transformWpUrl("https://cms.btcuniversity.com/wp-content/uploads/2023/08/2uw9msn3j9on-desktop_sc-logo.png")}
//           alt="Image"
//           width={1000}
//           height={1000}
//         />
//       </div>
//       <div className="md:hidden">
//         {/* This image will be visible on mobile */}
//         <Image
//           src={transformWpUrl("https://cms.btcuniversity.com/wp-content/uploads/2023/08/6req0itckyhl-mobile_sc-logo.png")}
//           alt="Image"
//           width={1000}
//           height={1000}
//         />
//       </div>
//     </div>



//       <Link href="/subscribe">
//       <div className="flex justify-center text-center">


//           <Image
//             src={transformWpUrl("https://cms.btcuniversity.com/wp-content/uploads/2023/08/Screenshot-2023-08-16-at-10.50.40-AM.png")}
//             alt="Image"
//             width={1000}
//             height={1000}
//           />
// {/* this needs to be the vimeo trailer. */}

//         </div>
//         <div className="flex justify-center text-center">


// <Image
//   src={transformWpUrl("https://cms.btcuniversity.com/wp-content/uploads/2023/08/t5kem71d4ly1-2-workbook.png")}
//   alt="download the workbook for free"
//   width={1000}
//   height={1000}
// />
// </div>
//       </Link>
// <div className="flex justify-center p-6">

// <Image
//   src={transformWpUrl("https://cms.btcuniversity.com/wp-content/uploads/2023/08/fvqtjrhfufq4-desktopepisodes.png")}
//   alt="episodes include"
//   width={1000}
//   height={1000}
// />

// </div>

//       <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">

//       <Link href="/courses/instagram-virgins-build-your-business-online">
//         <Image
//           src={transformWpUrl("https://cms.btcuniversity.com/wp-content/uploads/2023/08/rblf3xvc4d60-1.png")}
//           alt="episode 1"
//           width={1000}
//           height={1000}
//         />
//         </Link>
//         <Link href="/courses/optimizing-your-salon-space-for-photos">
//         <Image
//           src={transformWpUrl("https://cms.btcuniversity.com/wp-content/uploads/2023/08/4wkuohsv80qz-2.png")}
//           alt="episode 2"
//           width={1000}
//           height={1000}
//         />
// </Link>
//         <Link href="/courses/instagram-photography-101-the-btc-show-online-2020">
//         <Image
//           src={transformWpUrl("https://cms.btcuniversity.com/wp-content/uploads/2023/08/zzqtq2y1ijgb-3.png")}
//           alt="episode 3"
//           width={1000}
//           height={1000}
//         />
//         </Link>
//         <Link href="/courses/everything-you-need-to-become-an-influencer">
//         <Image
//           src={transformWpUrl("https://cms.btcuniversity.com/wp-content/uploads/2023/08/9kgpzb1b0s0d-4.png")}
//           alt="episode 4"
//           width={1000}
//           height={1000}
//         />
//         </Link>
//         <Link href="/courses/salon-instagram-attracting-more-clients">
//         <Image
//           src={transformWpUrl("https://cms.btcuniversity.com/wp-content/uploads/2023/08/qrwj32m5qojp-5.png")}
//           alt="episode 5"
//           width={1000}
//           height={1000}
//         />
//         </Link>
//         <Link href="/courses/how-to-build-your-personal-brand-on-instagram">
//         <Image
//           src={transformWpUrl("https://cms.btcuniversity.com/wp-content/uploads/2023/08/irbiqpgaq3d0-6.png")}
//           alt="episode 6"
//           width={1000}
//           height={1000}
//         />
//         </Link>
//            <Link href="/courses/instagram-videos-101-basic-advanced">
//         <Image
//           src={transformWpUrl("https://cms.btcuniversity.com/wp-content/uploads/2023/08/e4yzrnplncub-7.png")}
//           alt="episode 7"
//           width={1000}
//           height={1000}
//         />
//         </Link>
//         <Link href="/courses/larisa-loves-top-instagram-tips-and-tricks">
//         <Image
//           src={transformWpUrl("https://cms.btcuniversity.com/wp-content/uploads/2023/08/zr1ek1a1sfpp-8.png")}
//           alt="episode 8"
//           width={1000}
//           height={1000}
//         />
//         </Link>


        

//       </div>
    
//       <div className="flex justify-center text-center">
//       <div className="hidden md:block">
//         {/* This image will be visible on desktop */}
//         <Image
//           src={transformWpUrl("https://cms.btcuniversity.com/wp-content/uploads/2023/08/5y71gb4mdkq2-desktoptestimonials.png")}
//           alt="testimonials"
//           width={1000}
//           height={1000}
//         />
//       </div>
//       <div className="md:hidden">
//         {/* This image will be visible on mobile */}
//         <Image
//           src={transformWpUrl("https://cms.btcuniversity.com/wp-content/uploads/2023/08/2lsiiamlp2qz-testimonials.png")}
//           alt="testimonials"
//           width={1000}
//           height={1000}
//         />
//       </div>
//     </div>

//     <ExploreMoreCategories activeCategory="social-climbing" />

//     </div>
//   </main>
// );
// }

export default function SocialClimbing() {
  return (
    <main>

    <div className="bg-[#194D9F] relative justify-center">
   
          
          <div className="absolute top-5 left-5 z-10">
          </div>
    <div className="flex justify-center text-center">
      <div className="hidden md:block">
        {/* This image will be visible on desktop */}
        <Image
          src={"https://cms.btcuniversity.com/wp-content/uploads/2023/08/2uw9msn3j9on-desktop_sc-logo.png"}
          alt="Image"
          width={1000}
          height={1000}
        />
      </div>
      <div className="md:hidden">
        {/* This image will be visible on mobile */}
        <Image
          src={"https://cms.btcuniversity.com/wp-content/uploads/2023/08/6req0itckyhl-mobile_sc-logo.png"}
          alt="Image"
          width={1000}
          height={1000}
        />
      </div>
    </div>



      <Link href="/subscribe">
      <div className="flex justify-center text-center">


          <Image
            src={"https://cms.btcuniversity.com/wp-content/uploads/2023/08/Screenshot-2023-08-16-at-10.50.40-AM.png"}
            alt="Image"
            width={1000}
            height={1000}
          />
{/* this needs to be the vimeo trailer. */}

        </div>
        <div className="flex justify-center text-center">


<Image
  src={"https://cms.btcuniversity.com/wp-content/uploads/2023/08/t5kem71d4ly1-2-workbook.png"}
  alt="download the workbook for free"
  width={1000}
  height={1000}
/>
</div>
      </Link>
<div className="flex justify-center p-6">

<Image
  src={"https://cms.btcuniversity.com/wp-content/uploads/2023/08/fvqtjrhfufq4-desktopepisodes.png"}
  alt="episodes include"
  width={1000}
  height={1000}
/>

</div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">

      <Link href="/courses/instagram-virgins-build-your-business-online">
        <Image
          src={"https://cms.btcuniversity.com/wp-content/uploads/2023/08/rblf3xvc4d60-1.png"}
          alt="episode 1"
          width={1000}
          height={1000}
        />
        </Link>
        <Link href="/courses/optimizing-your-salon-space-for-photos">
        <Image
          src={"https://cms.btcuniversity.com/wp-content/uploads/2023/08/4wkuohsv80qz-2.png"}
          alt="episode 2"
          width={1000}
          height={1000}
        />
</Link>
        <Link href="/courses/instagram-photography-101-the-btc-show-online-2020">
        <Image
          src={"https://cms.btcuniversity.com/wp-content/uploads/2023/08/zzqtq2y1ijgb-3.png"}
          alt="episode 3"
          width={1000}
          height={1000}
        />
        </Link>
        <Link href="/courses/everything-you-need-to-become-an-influencer">
        <Image
          src={"https://cms.btcuniversity.com/wp-content/uploads/2023/08/9kgpzb1b0s0d-4.png"}
          alt="episode 4"
          width={1000}
          height={1000}
        />
        </Link>
        <Link href="/courses/salon-instagram-attracting-more-clients">
        <Image
          src={"https://cms.btcuniversity.com/wp-content/uploads/2023/08/qrwj32m5qojp-5.png"}
          alt="episode 5"
          width={1000}
          height={1000}
        />
        </Link>
        <Link href="/courses/how-to-build-your-personal-brand-on-instagram">
        <Image
          src={"https://cms.btcuniversity.com/wp-content/uploads/2023/08/irbiqpgaq3d0-6.png"}
          alt="episode 6"
          width={1000}
          height={1000}
        />
        </Link>
           <Link href="/courses/instagram-videos-101-basic-advanced">
        <Image
          src={"https://cms.btcuniversity.com/wp-content/uploads/2023/08/e4yzrnplncub-7.png"}
          alt="episode 7"
          width={1000}
          height={1000}
        />
        </Link>
        <Link href="/courses/larisa-loves-top-instagram-tips-and-tricks">
        <Image
          src={"https://cms.btcuniversity.com/wp-content/uploads/2023/08/zr1ek1a1sfpp-8.png"}
          alt="episode 8"
          width={1000}
          height={1000}
        />
        </Link>


        

      </div>
    
      <div className="flex justify-center text-center">
      <div className="hidden md:block">
        {/* This image will be visible on desktop */}
        <Image
          src={"https://cms.btcuniversity.com/wp-content/uploads/2023/08/5y71gb4mdkq2-desktoptestimonials.png"}
          alt="testimonials"
          width={1000}
          height={1000}
        />
      </div>
      <div className="md:hidden">
        {/* This image will be visible on mobile */}
        <Image
          src={"https://cms.btcuniversity.com/wp-content/uploads/2023/08/2lsiiamlp2qz-testimonials.png"}
          alt="testimonials"
          width={1000}
          height={1000}
        />
      </div>
    </div>

    {/* <ExploreMoreCategories activeCategory="social-climbing" /> */}

    </div>
  </main>
);
}

