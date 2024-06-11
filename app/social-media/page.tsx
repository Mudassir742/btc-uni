
import Link from "next/link";
import Image from "next/image";
import H1Text from "@/components/text/H1Text";
import ExploreMoreCategories from "@/components/ExploreMoreCategories";


// export const dynamic = "force-dynamic"
export const metadata = {
  title: 'Social Media',
  description: 'Want to get more clients, work with a brand or become an influencer? Then you need this exclusive series with BTC VP of Influencer Strategy Haley Gable.',
}

// export default function SocialMedia() {
//   return (
//     <main className="relative">
          
//   <div className="absolute top-5 left-5 z-10">
//     <BackButton />
//   </div>
//       <div className="bg-[#CAA28B] justify-center">
//         <div className="flex justify-center text-center">
//           <Image
//             src={transformWpUrl("https://cms.btcuniversity.com/wp-content/uploads/2023/08/dfkjcbz7ly0j-sc-logo.png")}
//             alt="Image"
//             width={1000}
//             height={1000}
//           />
//         </div>
//         <Link href="/subscribe">
//         <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">


//             <Image
//               src={transformWpUrl("https://cms.btcuniversity.com/wp-content/uploads/2023/08/Screenshot-2023-08-16-at-10.04.09-AM.png")}
//               alt="Image"
//               width={1000}
//               height={1000}
//             />
// {/* this needs to be the vimeo trailer. */}

//             <Image
//               src={transformWpUrl("https://cms.btcuniversity.com/wp-content/uploads/2023/08/j5bi682wxken-sc-logocopy.png")}
//               alt="Image"
//               width={1000}
//               height={1000}
//             />
//           </div>
//         </Link>
// <div className="flex justify-center p-6">
// <H1Text text="Episodes include:" />

// </div>

//         <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">

//         <Link href="/courses/instagram-101-handles-bios-profile-pics">
//           <Image
//             src={transformWpUrl("https://cms.btcuniversity.com/wp-content/uploads/2023/08/6f214rna80cn-virgins.png")}
//             alt="episode 1"
//             width={1000}
//             height={1000}
//           />
//           </Link>
//           <Link href="/courses/captions-hashtags-for-your-audience">
//           <Image
//             src={transformWpUrl("https://cms.btcuniversity.com/wp-content/uploads/2023/08/yhuh92s9nekt-virginscopy.png")}
//             alt="episode 2"
//             width={1000}
//             height={1000}
//           />
// </Link>
//           <Link href="/courses/brands-how-to-get-them-to-notice-you">
//           <Image
//             src={transformWpUrl("https://cms.btcuniversity.com/wp-content/uploads/2023/08/jxb7939qh4lq-virginscopy2.png")}
//             alt="episode 3"
//             width={1000}
//             height={1000}
//           />
//           </Link>
//           <Link href="/courses/build-your-clientele-with-instagram">
//           <Image
//             src={transformWpUrl("https://cms.btcuniversity.com/wp-content/uploads/2023/08/7602zy7fwkau-virginscopy3.png")}
//             alt="episode 4"
//             width={1000}
//             height={1000}
//           />
//           </Link>
//           <Link href="/courses/your-complete-guide-to-running-a-salon-instagram">
//           <Image
//             src={transformWpUrl("https://cms.btcuniversity.com/wp-content/uploads/2023/08/3temhceaaom7-virginscopy4.png")}
//             alt="episode 5"
//             width={1000}
//             height={1000}
//           />
//           </Link>
//           <Link href="/courses/10-instagram-mistakes-how-to-fix-them">
//           <Image
//             src={transformWpUrl("https://cms.btcuniversity.com/wp-content/uploads/2023/08/u4wucb6n9okm-virginscopy5.png")}
//             alt="episode 6"
//             width={1000}
//             height={1000}
//           />
//           </Link>
//              <Link href="/courses/your-most-asked-social-media-questions">
//           <Image
//             src={transformWpUrl("https://cms.btcuniversity.com/wp-content/uploads/2023/08/51b8xcbgafcp-virginscopy71.png")}
//             alt="episode 7"
//             width={1000}
//             height={1000}
//           />
//           </Link>
//         </div>
//         <div className="flex justify-center text-center">


//           <Image
//             src={transformWpUrl("https://cms.btcuniversity.com/wp-content/uploads/2023/08/z2wdw6ldxg4x-workbook.png")}
//             alt="download the workbook for free"
//             width={1000}
//             height={1000}
//           />
//         </div>
//         <div className="flex justify-center text-center">

//           <Image
//             src={transformWpUrl("https://cms.btcuniversity.com/wp-content/uploads/2023/08/txu25lk6jl3r-testimonials.png")}
//             alt="testimonials"
//             width={1000}
//             height={1000}
//           />
//         </div>
//       </div>
//       <ExploreMoreCategories activeCategory="social-media" />
//     </main>
//   );
// }

export default function SocialMedia() {
  return (
    <main className="relative">
          
  <div className="absolute top-5 left-5 z-10">
  </div>
      <div className="bg-[#CAA28B] justify-center">
        <div className="flex justify-center text-center">
      

         
          <Image
            src={"https://cms.btcuniversity.com/wp-content/uploads/2023/08/dfkjcbz7ly0j-sc-logo.png"}
            alt="Image"
            width={1000}
            height={1000}
          />
        </div>
        <Link href="/subscribe">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 items-center">

            <div className="relative slider-container items-center">
              <div className="!w-full relative pb-[56.25%] h-0 overflow-hidden ">
                <iframe
                  src={`https://player.vimeo.com/video/889179129?autoplay=1`}
                  className="!w-full !h-full !absolute !top-0 !left-0 rounded-xl"
                />
              </div>
            </div>
          

            <Image
              src={"https://cms.btcuniversity.com/wp-content/uploads/2023/08/j5bi682wxken-sc-logocopy.png"}
              alt="Image"
              width={1000}
              height={1000}
            />
          </div>
        </Link>
<div className="flex justify-center p-6">
<H1Text text="Episodes include:" />

</div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">

        <Link href="/courses/instagram-101-handles-bios-profile-pics">
          <Image
            src={"https://cms.btcuniversity.com/wp-content/uploads/2023/08/6f214rna80cn-virgins.png"}
            alt="episode 1"
            width={1000}
            height={1000}
          />
          </Link>
          <Link href="/courses/captions-hashtags-for-your-audience">
          <Image
            src={"https://cms.btcuniversity.com/wp-content/uploads/2023/08/yhuh92s9nekt-virginscopy.png"}
            alt="episode 2"
            width={1000}
            height={1000}
          />
</Link>
          <Link href="/courses/brands-how-to-get-them-to-notice-you">
          <Image
            src={"https://cms.btcuniversity.com/wp-content/uploads/2023/08/jxb7939qh4lq-virginscopy2.png"}
            alt="episode 3"
            width={1000}
            height={1000}
          />
          </Link>
          <Link href="/courses/build-your-clientele-with-instagram">
          <Image
            src={"https://cms.btcuniversity.com/wp-content/uploads/2023/08/7602zy7fwkau-virginscopy3.png"}
            alt="episode 4"
            width={1000}
            height={1000}
          />
          </Link>
          <Link href="/courses/your-complete-guide-to-running-a-salon-instagram">
          <Image
            src={"https://cms.btcuniversity.com/wp-content/uploads/2023/08/3temhceaaom7-virginscopy4.png"}
            alt="episode 5"
            width={1000}
            height={1000}
          />
          </Link>
          <Link href="/courses/10-instagram-mistakes-how-to-fix-them">
          <Image
            src={"https://cms.btcuniversity.com/wp-content/uploads/2023/08/u4wucb6n9okm-virginscopy5.png"}
            alt="episode 6"
            width={1000}
            height={1000}
          />
          </Link>
             <Link href="/courses/your-most-asked-social-media-questions">
          <Image
            src={"https://cms.btcuniversity.com/wp-content/uploads/2023/08/51b8xcbgafcp-virginscopy71.png"}
            alt="episode 7"
            width={1000}
            height={1000}
          />
          </Link>
        </div>
        <div className="flex justify-center text-center">


          <Image
            src={"https://cms.btcuniversity.com/wp-content/uploads/2023/08/z2wdw6ldxg4x-workbook.png"}
            alt="download the workbook for free"
            width={1000}
            height={1000}
          />
        </div>
        <div className="flex justify-center text-center">

          <Image
            src={"https://cms.btcuniversity.com/wp-content/uploads/2023/08/txu25lk6jl3r-testimonials.png"}
            alt="testimonials"
            width={1000}
            height={1000}
          />
        </div>
      </div>
      {/* <ExploreMoreCategories activeCategory="social-media" /> */}
    </main>
  );
}
