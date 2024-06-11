
import ExploreMoreCategories from "@/components/ExploreMoreCategories";
// import { transformWpUrl } from "@/utils/url";
import Image from "next/image";
import Link from "next/link";

export default function CelebStylists() {
  return (
    <main className="bg-black">
      
      <div className="bg-black justify-center ">
      {/* <div className="absolute top-5 left-5 z-10"> */}
  {/* </div> */}
  {/* <div className="relative"> */}
        <Link href="/courses/the-iconic-celebrity-stylist-panel">
          <div className="flex justify-center text-center">
            <Image
              // src={transformWpUrl("https://cms.btcuniversity.com/wp-content/uploads/2023/08/yq55nmwk7nwn-1.png")}
              src={"https://cms.btcuniversity.com/wp-content/uploads/2023/08/yq55nmwk7nwn-1.png"}
              alt="celeb stylist"
              width={1000}
              height={1000}
            />
          </div>
       
        </Link>
        {/* </div> */}
        <Link href="/courses/celeb-interview-justin-anderson">
          <div className="flex justify-center text-center">
            <Image
              // src={transformWpUrl("https://cms.btcuniversity.com/wp-content/uploads/2023/08/upe85xryfo5l-justin-newrecovered.png")}
              src={"https://cms.btcuniversity.com/wp-content/uploads/2023/08/upe85xryfo5l-justin-newrecovered.png"}
              alt="just anderson interview"
              width={1000}
              height={1000}
            />
          </div>
        </Link>
        <Link href="/courses/chris-appletons-iconic-celebrity-styles">
           <Image
              // src={transformWpUrl("https://cms.btcuniversity.com/wp-content/uploads/2023/08/qaw45z3c6z1m-chris-appleton-Recovered.png")}
              src={"https://cms.btcuniversity.com/wp-content/uploads/2023/08/qaw45z3c6z1m-chris-appleton-Recovered.png"}
              alt="chris appleton loog and learn"
              width={1000}
              height={1000}
            />
        </Link>
        <Link href="/courses/celebrity-interview-frederic-aspiras-with-marybehindthechair">
          <div className="flex justify-center text-center">
            <Image
              // src={transformWpUrl("https://cms.btcuniversity.com/wp-content/uploads/2023/08/d85dnsgfibfl-celeb-series-Recovered.png")}
              src={"https://cms.btcuniversity.com/wp-content/uploads/2023/08/d85dnsgfibfl-celeb-series-Recovered.png"}
              alt="frederi aspiras interview"
              width={1000}
              height={1000}
            />
          </div>
        </Link>
{/* 
        <ExploreMoreCategories activeCategory="celeb-stylist" /> */}





      </div>
    </main>
  )
}

