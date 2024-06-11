import React from "react";
// import OneEducatorCert from "@/components/certificates/OneEducatorCert";
import ExitFlow from "@/components/ExitFlow";
import ParentExitFlow from "@/components/ParentExitFlow";
import ShareButton from "@/components/Share";
import Link from "next/link";
import YouTubeVideoCard from "@/components/YouTubeVideoCard";
import { Categories, Course, CourseMetadata, MediaItem, Tags } from "@/interfaces";
import TrailerVideoPlayer from "@/components/TrailerVideoPlayer";
import CancelFlow from "@/components/CancelFlow";
import { transformWpUrl } from "@/utils/url";

let imageWidth = 172; 
let imageHeight = 229;
let containerWidth = 326;
const completed = false;
const price = 'FREE';
const CourseFree = true; // Define the value here
const courseTitle = 'Course title here. yay titles!';
const category = 'Shags'
// const imageSrc = 'https://cms.btcuniversity.com/wp-content/uploads/2023/06/Frame-161-1.jpg';
const amountOfReviews = 215;
const link = '/'
const testimonials = 988
const durationOfCourse = '1 hr'
const pdfFilePath = `${__dirname}/example.pdf`;
const customColor = '#523D34'
const testPicture: MediaItem = {
  mediaItemUrl: transformWpUrl("https://cms.btcuniversity.com/wp-content/uploads/2023/06/Frame-161-1.jpg")
}
const testCourseMetadata: CourseMetadata = {
  subscriptiontier: 0,
  courseThumbnailPicture: testPicture,
  courseDetailPicture: testPicture,
  beforeandafter: [],
  courseHighlights: [],
  courseTestimonialsNew: [],
  courseChapters: [],
  youwilllearn: "",
  relatedcourses: [],
  vimeoPromoId: "",
  vimeoid: [],
  educators: [],
  formulas: "",
  coursemetatitle: "",
  coursemetadescription: "",
  courseDuration: "",
  averageRating: 0,
  noOfTestimonials: 0,
  courseHeroDescription: "",
  price: 0,
  courselevel: "",
  episodenumber: 0,
  partofseries: [],
  productsUsed: [],
  newDownloadables: [],
  releasedate: "",
  scheduledreleasedate: "",
  courseImportance: 0,
  newCourseHighlights: []
};
const testCourseTags: Tags = {
  nodes: []
};
const testCourseCategories: Categories = {
  nodes: []
};
const testCourse: Course = {
  title: "",
  date: "",
  content: "",
  databaseId: 0,
  isLive: false,
  isPartOfSubscription: false,
  isPartOfSeries: false,
  isAvailableOnlyALaCarte: false,
  isPurchasableALaCarte: false,
  isPartOfBundle: false,
  willBeLive: false,
  courseMetadata: testCourseMetadata,
  uri: "",
  slug: "",
  tags: testCourseTags,
  categories: testCourseCategories
}


export default function Test() {
  return (
    <main>
      <h1>I am brianas test page! 
       </h1>
       {/* <CancelFlow
        numberOfPinnedCourses={185}
        numberOfCertificates={15}
        /> */}
        
{/* <ExitFlow upcomingCourses={[]} courseName={"course name"} educatorHandles={[]} image={""} certificateimage={""} customeremail={'customeremail@email.com'} /> */}
      
 {/* <ExitFlow upcomingCourses={[]} courseName={""} educatorName={""} /> */}
       <div className='container'>


        <div>
  


          <div className='space-between-categories' />
          <Link href='courses/the-butterfly-haircut'>
            <button className='primary bg-pink-500 text-white hover:bg-purple-700'>
            Butterfly haircut </button><button>
             course with course highlights & a product
            </button>
          </Link>


          <div className='space-between-categories' />
          <Link href='courses/3-bridal-styling-techniques'>
            <button className='primary bg-pink-500 text-white hover:bg-purple-700'>
              3 Bridal Styling Techniques</button><button>
              3 before & after images
            </button>
          </Link>


          <div className='space-between-categories' />
          <Link href='courses/everything-you-need-to-become-an-influencer'>
            <button className='primary bg-pink-500 text-white hover:bg-purple-700'>
            Everything You Need To Become An Influencer</button><button>
              available a la carte!
            </button>
          </Link>


          <div className='space-between-categories' />
          <Link href='courses/the-6-figure-haircut'>
            <button className='primary bg-pink-500 text-white hover:bg-purple-700'>
              The 6-Figure Haircut</button><button>
              downloadbales, products & chapters
            </button>
          </Link>
       

          <div className='space-between-categories' />
          <Link href='courses/on-trend-color-styling-techniques-for-every-client'>
            <button className='primary bg-pink-500 text-white hover:bg-purple-700'>
              on trend styling techniques for every client: </button><button>
              multi educator example course
            </button>
          </Link>
          <div className='space-between-categories' />

          <Link href='/courses/cutting-to-enhance-color '>
            <button className='primary bg-orange-500 text-white hover:bg-purple-700'>
              cutting to enhance color
            </button>
           FREE CLASS: hair cutting course w/ a product & chapters!
            <button>
            </button>
          </Link>



          <div className='space-between-categories' />

          <Link href='/courses/test-upcoming-course '>
            <button className='primary bg-orange-500 text-white hover:bg-purple-700'>
              test upcoming course
            </button>
          (also an upcoming course) & has related courses at the bottom to see
            <button>
            </button>
          </Link>



          <div className='space-between-categories' />

          <Link href='/courses/the-perfect-summer-copper '>
            <button className='primary bg-yellow-500 text-white hover:bg-purple-700'>
              the perfect summer </button><button> color course w/ chapters & a formula!
            </button>
          </Link>
          <div className='space-between-categories' />

          Courses with Free Watch:
          <div className='space-between-categories' />
          <Link href='/courses/smoothing-foundational-techniques'>
            <button className='primary bg-yellow-500 text-white hover:bg-purple-700'>
              /smoothing-foundational-techniques </button><button> FREE
            </button>
          </Link>
          <div className='space-between-categories' />
          <Link href='/courses/safely-lighten-curly-hair'>
            <button className='primary bg-yellow-500 text-white hover:bg-purple-700'>
             /safely-lighten-curly-hair </button><button> FREE
            </button>
          </Link>
          <div className='space-between-categories' />
          <Link href='/courses/the-wash-go-for-curls'>
            <button className='primary bg-yellow-500 text-white hover:bg-purple-700'>
              /the-wash-go-for-curls </button><button> FREE
            </button>
          </Link>
          <div className='space-between-categories' />
          <Link href='/courses/multi-dimensional-reds'>
            <button className='primary bg-yellow-500 text-white hover:bg-purple-700'>
              /multi-dimensional-reds </button><button> FREE
            </button>
          </Link>
          <div className='space-between-categories' />
          <Link href='/courses/courses/the-perfect-summer-copper'>
            <button className='primary bg-yellow-500 text-white hover:bg-purple-700'>
              /the-perfect-summer-copper</button><button> FREE
            </button>
          </Link>
          <div className='space-between-categories' />
          <Link href='/courses/the-iconic-celebrity-stylist-panel'>
            <button className='primary bg-yellow-500 text-white hover:bg-purple-700'>
              /the-iconic-celebrity-stylist-panel</button><button> FREE
            </button>
          </Link>
         
          <div className='space-between-categories' />
          <Link href='/courses/cutting-styling-techniques'>
            <button className='primary bg-yellow-500 text-white hover:bg-purple-700'>
              /cutting-styling-techniquesl</button><button> FREE
            </button>
          </Link>
          <div className='space-between-categories' />
    
          <Link href='courses/90s-supermodel-blowout'>
            <button className='primary bg-yellow-500 text-white hover:bg-purple-700'>
              /90s-supermodel-blowout</button><button> FREE
            </button>
          </Link>
          <div className='space-between-categories' />
       
          <Link href='courses/live-instagram-page-reviews-session-2'>
            <button className='primary bg-yellow-500 text-white hover:bg-purple-700'>
              /live-instagram-page-reviews-session-2</button><button> FREE
            </button>
          </Link>
          <div className='space-between-categories' />
       
          <Link href='courses/your-financial-future'>
            <button className='primary bg-yellow-500 text-white hover:bg-purple-700'>
              /your-financial-future</button><button> FREE
            </button>
          </Link>

          <div className='space-between-categories' />
          /celebrity-interview-frederic-aspiras-with-marybehindthechair
          <Link href='courses/celebrity-interview-frederic-aspiras-with-marybehindthechair'>
            <button className='primary bg-yellow-500 text-white hover:bg-purple-700'>
              /celebrity-interview-frederic-aspiras-with-marybehindthechair</button><button> FREE
            </button>
          </Link>
          <div className='space-between-categories' />      <div className='space-between-categories' />      <div className='space-between-categories' />
          <div className='space-between-categories' />

          Courses you can buy a la carte:
          <br>
          </br>

          <Link href='/courses/how-to-build-your-personal-brand-on-instagram'>
            <button className='primary bg-yellow-500 text-white hover:bg-purple-700'>
              /how-to-build-your-personal-brand-on-instagram</button><button>  buy a la carte
            </button>
          </Link>
          <div className='space-between-categories' />
          <Link href='/courses/larisa-loves-top-instagram-tips-and-tricks'>
            <button className='primary bg-yellow-500 text-white hover:bg-purple-700'>
              /larisa-loves-top-instagram-tips-and-tricks</button><button>  buy a la carte
            </button>
          </Link>
          <div className='space-between-categories' />
          <Link href='/courses/instagram-videos-101-basic-advanced'>
            <button className='primary bg-yellow-500 text-white hover:bg-purple-700'>
              /instagram-videos-101-basic-advanced</button><button>  buy a la carte
            </button>
          </Link>
          <div className='space-between-categories' />
          <Link href='/courses/photography-101-take-better-hair-photos'>
            <button className='primary bg-yellow-500 text-white hover:bg-purple-700'>
              /photography-101-take-better-hair-photos</button><button>  buy a la carte
            </button>
          </Link>
          <div className='space-between-categories' />
          <Link href='/courses/optimizing-your-salon-space-for-photos'>
            <button className='primary bg-yellow-500 text-white hover:bg-purple-700'>
              /optimizing-your-salon-space-for-photos</button><button>  buy a la carte
            </button>
          </Link>
          <div className='space-between-categories' />
          <Link href='/courses/salon-instagram-attracting-more-clientss'>
            <button className='primary bg-yellow-500 text-white hover:bg-purple-700'>
              /salon-instagram-attracting-more-clients</button><button>  buy a la carte
            </button>
          </Link>
          <div className='space-between-categories' />
          <Link href='/courses/instagram-virgins-build-your-business-online'>
            <button className='primary bg-yellow-500 text-white hover:bg-purple-700'>
              /instagram-virgins-build-your-business-online</button><button>  buy a la carte
            </button>
          </Link>
          <div className='space-between-categories' />
          <Link href='/courses/everything-you-need-to-become-an-influencer'>
            <button className='primary bg-yellow-500 text-white hover:bg-purple-700'>
              /everything-you-need-to-become-an-influencers</button><button>  buy a la carte
            </button>
          </Link>
          <div className='space-between-categories' />
  

      
          <div className='space-between-categories' />
        </div>
    <TrailerVideoPlayer 
      videoId={"889322038"} 
      // startTime={0}
    />
    <div className="w-[690px] h-[388px]">
       {/* <TrailerVideoPlayer videoId={"889322038"} startTime={0}/> */}
       </div>
      </div>

    </main>
  );
}








