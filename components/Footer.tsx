import Link from "next/link";
import MailchimpSignupForm from '../components/footer/MailchimpSignupForm';
import FooterFAQ from '../components/footer/FooterFAQ';
import FooterSocialIcons from '../components/footer/FooterSocialIcons';
import FooterSupport from '../components/footer/FooterSupport';
import SH4Text from "./text/SH4Text";
import NewsletterText from "./text/NewsletterText";
import SH3Text from "./text/SH3Text";
import SH1Text from "./text/SH1Text";
import InputTextBold from "./text/InputTextBold";
import { ChevronRight } from 'lucide-react';
import Image from "next/image";
import H4Text from "./text/H4Text";
import ParagraphText from "./text/Paragraph";

function Footer() {
  const currentYear = new Date().getFullYear(); // get the current year dynamically
  return (

    <footer className='text-themeColor bg-themecolor-50 '>

      <div className=' py-[64px] md:flex md:mx-auto container'>

        {/* Column 1 */}
        <div className='md:max-w-[438px] md:mx-auto flex'>

          <div className='px-4 md:pl-24'>
            <Link href={"/"} className='justify-start'>
              <Image src={'/logo.png'}
                className='sm:shrink-0 relative cursor-pointer'
                width={350} height={150}
                alt='btcuniversity' />
            </Link>
            <div className="py-4 md:pb-4 w-full">
              <div className="pb-4">
                <SH1Text text="Sign up for our newsletter offering FREE videos & downloads" className="text-themeColor" />
              </div>



              <MailchimpSignupForm />



              <FooterSocialIcons />

           
            </div>

          </div>
          <div className="med-space" />
        </div>


        {/* Column 2 */}


        <div className='md:max-w-[494px] md:mx-auto container md:pr-[48px] md:pl-[100px]  '>




          <div className="pb-[12px]">

            <H4Text text='Quick Links' />



          </div>
          <div className="flex">

            {/* Column 1 -inside of Column 2*/}
            <div className="min:w-1/2 pr-4">
              <Link href="/all-educators" className="py-[12px] flex justify-between items-center ">
                <ParagraphText text="Educators" color="" />
              </Link>
             
              
              <Link href="/downloadables" className="py-[12px] flex justify-between items-center ">
                <ParagraphText text="Downloadables" color="" />
              </Link>

            
              <Link href="/haircolor"  className="py-[12px] flex justify-between items-center ">
                <ParagraphText text="Hair Color" color="" />
              </Link>
           
              <Link href="/styling"  className="py-[12px] flex justify-between items-center ">
                <ParagraphText text="Styling" color="" />
              </Link>

              <Link href="/mens"  className="py-[12px] flex justify-between items-center ">
                <ParagraphText text="Men's" color="" />
              </Link>

              <Link href="/events"  className="py-[12px] flex justify-between items-center ">
                <ParagraphText text="BTC Events" color="" />
              </Link>


              <Link href="/languages"  className="py-[12px] flex justify-between items-center ">
                <ParagraphText text="Languages" color="" />
              </Link>
              
            </div>


            {/* Column 2 -inside of Column 2*/}
            <div className="max:w-1/2">
              <Link href="/tips"  className="py-[12px] flex justify-between items-center ">
                <ParagraphText text="Quick Tips" color="" />
              </Link>
              
              <Link href="/business"  className="py-[12px] flex justify-between items-center ">
                <ParagraphText text="Business" color="" />
              </Link>

              <Link href="/haircutting"  className="py-[12px] flex justify-between items-center ">
                <ParagraphText text="Haircutting" color="" />
              </Link>

              <Link href="/texture"  className="py-[12px] flex justify-between items-center ">
                <ParagraphText text="Texture" color="" />
              </Link>
              
              <Link href="/hairextensions"  className="py-[12px] flex justify-between items-center ">
                <ParagraphText text="Hair Extensions" color="" />
              </Link>
            

              <Link href="/masterclasses"  className="py-[12px] flex justify-between items-center ">
                <ParagraphText text="Collections" color="" />
              </Link>
           
              <Link href="/bulk-subscription"  className="py-[12px] flex justify-between items-center ">
                <ParagraphText text="Gift A Subscription" color="" />
              </Link>
            </div>
            
</div>
       

          
          



          <div className="med-space" />
</div>


        {/* Column 3 */}


        <div className='md:max-w-[260px] md:mx-auto  container md:px-0'>

          <div className="pb-[12px]">

            <H4Text text='Support' />



          </div>

            

          
          <Link href="/support"  className="py-[12px] flex justify-between items-center ">
            <ParagraphText text="Help & Support" color="" />
          </Link>

          
        
             
          <div className="w-full flex flex-col py-[12px]">
            <Link href="/signup?subscription=free" className="flex justify-between items-center ">
                  <ParagraphText text="Register for a FREE Account" color="" />

                </Link>
              </div>

          <div className="w-full flex flex-col py-[12px]">
                <Link href="https://behindthechair.com/privacy-policy/" target="_blank" className="flex justify-between items-center ">
              <ParagraphText text="Privacy Policy" color="" />

                </Link>
              </div>
          <div className="w-full  flex flex-col py-[12px]">
                <Link href="https://behindthechair.com/terms-of-service/" target="_blank" className="flex justify-between items-center ">
                  <ParagraphText text="Terms of Service" color="" />

                </Link>

              </div>
           


      
        </div>
      </div>



      <div>
        <div className="bg-white py-8 flex justify-center">
          <div className="container flex text-center">
            <ParagraphText text={`Copyright &copy; Behindthechair.com  ${currentYear}. All rights reserved. `}  />

          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
