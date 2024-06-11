import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Button } from "../ui/Button";
import { XCircle } from "lucide-react";
import dynamic from "next/dynamic";
import SH1Text from "../text/SH1Text";
import ParagraphText from "../text/Paragraph";
import ButtonText from "../text/ButtonText";
import InputTextBold from "../text/InputTextBold";
import ParagraphSmall from "../text/ParagraphSmall";

function PopupCallToAction() {
  const [isVisible, setIsVisible] = useState(true);

  const handleOpenClick = () => {
    setIsVisible(true);
  };

  const handleCloseClick = () => {
    setIsVisible(false);
  };

  return (
    <>

      {isVisible && (
        <div className="fixed top-0 left-0 h-screen p-4 w-screen flex items-center justify-center bg-opacity-80 bg-gray-600 z-50">
          <div className="bg-white p-4 border border-border max-w-md rounded-xl">
            <div className="flex justify-end">
              <button onClick={handleCloseClick}>
                <XCircle size={24} />
              </button>
            </div>
            <div className="text-center">
              <div className="pb-4 text-themeColor flex justify-center whitespace-normal">
                <div>
                  <p className="text-2xl font-semibold">Welcome to an all-new</p>
                  {/* <p className="text-2xl  font-semibold"> BTC University!</p> */}
                  <div className="px-6 pt-1">
                    <Image src={'/logo.png'}
                      className='relative'
                      width={350} height={150}
                      alt='btcuniversity' />
                  </div>


                </div>

              </div>


              <div className="pb-4">
                <ParagraphText text="We can’t wait for you to see everything" />
                <div className=" md:mt-0">
                  <ParagraphText text="our new site has to offer! " />
                </div>

              </div>

              <div className="pb-2 justify-center">
                <div>

                </div>
                <ButtonText text="To unlock a subscription," className="text-themeColor flex justify-center" />
                <ButtonText text="reset your current password below" className="text-themeColor  flex justify-center" />

              </div>




              <div className="mt-2 flex justify-center">
                {/* <Link href="/subscribe" className="px-3">
                  <Button variant="white">Subscribe</Button>
                </Link> */}
                <Link href="/forgot-password" className="px-3" onClick={handleCloseClick}>
                  <Button >Reset Password</Button>
                </Link>
              </div>
              <div className="py-4">
                <ButtonText text="If you have already reset your password, hit X and Log In." className="text-themeColor  flex justify-center" />

              </div>

            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default PopupCallToAction;
