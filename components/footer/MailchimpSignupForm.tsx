import React from "react";

import InputTextBold from "../text/InputTextBold";
import ParagraphText from "../text/Paragraph";
import ButtonText from "../text/ButtonText";

<link
  href="//cdn-images.mailchimp.com/embedcode/classic-061523.css"
  rel="stylesheet"
  type="text/css"
/>;
const MailchimpSignupForm = () => {
  return (
    <>
      {/* <style dangerouslySetInnerHTML={{ __html: `
        #mc_embed_signup {
          background: #fff;
          clear: left;
          font: 14px Helvetica, Arial, sans-serif;
          width: 600px;
        }        
      `}} /> */}
      <div id="mc_embed_shell">
        <div
          id="mc_embed_signup"
          className="!w-full bg-transparent clear-left !font-'__Poppins_0fd924' text-base flex flex-wrap items-center mb-5"
        >
          <form
            action="https://btcuniversity.us12.list-manage.com/subscribe/post?u=7c5c34894c443c59e5c06dcb7&id=e616551742"
            method="post"
            id="mc-embedded-subscribe-form"
            name="mc-embedded-subscribe-form"
            className="validate"
            target="_self"
            noValidate
          >
            <div id="mc_embed_signup_scroll" className="flex items-center">
              <div className="mc-field-group text-themeColor flex-grow w-full ">
                <input
                  type="email"
                  name="EMAIL"
                  className="rounded-l-xl required email  h-14 appearance-none w-full p-4"
                  id="mce-EMAIL"
                  required
                  // value=""
                  placeholder="Email Address"
                />
              </div>
              <div hidden>
                <input type="hidden" name="tags" value="10524693" />
              </div>
              <div id="mce-responses" className="clear">
                <div
                  className="response"
                  id="mce-error-response"
                  style={{ display: "none" }}
                ></div>
                <div
                  className="response"
                  id="mce-success-response"
                  style={{ display: "none" }}
                ></div>
              </div>
              <div
                aria-hidden="true"
                style={{ position: "absolute", left: "-5000px" }}
              >
                <input
                  type="text"
                  name="b_7c5c34894c443c59e5c06dcb7_e616551742"
                  tabIndex={-1}
                  value=""
                />
              </div>
              <div className="clear">
                <input
                  type="submit"
                  name="subscribe"
                  id="mc-embedded-subscribe"
                  className="button  w-full  h-14  rounded-r-xl bg-themeColor text-white px-4 flex justify-center"
                  value="Subscribe"
                />
              </div>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default MailchimpSignupForm;
