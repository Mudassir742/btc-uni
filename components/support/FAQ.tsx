"use client";
import React, { FC, useState } from "react";
import SH1Text from "../text/SH1Text";
import B2Text from "../text/B2Text";
import Link from "next/link";
import SH3Text from "../text/SH3Text";
import { Search } from "lucide-react";

interface MyComponentProps {
  className?: string;
}

const FAQ: FC<MyComponentProps> = ({className}) => {
  const [accordionOpen, setAccordionOpen] = useState(Array(4).fill(false));
  const [searchTerm, setSearchTerm] = useState("");

  const [isOpen, setIsOpen] = useState(false);
  const toggleMenu = () => setIsOpen(!isOpen);

  const toggleAccordion = (index: number) => {
    const updatedAccordionOpen = [...accordionOpen];
    updatedAccordionOpen[index] = !updatedAccordionOpen[index];
    setAccordionOpen(updatedAccordionOpen);
  };

  // Define your accordion sections data here
  const accordionSections = [
    {
      id: 0,
      title: "Contact",
      content1: "Phone: (800) 760-3010",
      content2: "Email: membership@btcuniversity.com",
      content1href: "",
      content2href: "mailto:membership@btcuniversity.com",
      category: "getting-started",
    },
    {
      id: 1,
      title: "About your subscription",
      content1:
        "When you login to, your homepage will show you all the upcoming classes you can add to your calendar. Don’t forget you always have unlimited access to over 250+ courses on-demand! To manage your subscription, go to: Account and click Manage Subscription. Your subscription will auto-renew on your next billing cycle. You can cancel at any time and your subscription will remain active until the following billing cycle.",
      content2: "",
      content1href: "",
      content2href: "",
      category: "getting-started",
    },
    {
      id: 2,
      title: "What's included in the membership?",
      content1:
        "Instant access to 250+ pro tutorials, quick tips and downloadables including: Color, cutting, texture, men’s barbering and grooming, extensions, styling, business and social media. New content added weekly.",
      content2: "",
      content1href: "",
      content2href: "",
      category: "getting-started",
    },
    {
      id: 3,
      title: "How much does the membership cost?",
      content1: "See our prices* HERE! ",
      content2: "*Our prices are in USD",
      content1href: "/subscribe",
      content2href: "",
      category: "getting-started",
    },
    {
      id: 4,
      title: "How do I log in?",
      content1: "Log in HERE!",
      content2: "",
      content1href: "/log-in",
      content2href: "",
      category: "getting-started",
    },
    {
      id: 5,
      title: "I'm having trouble signing in",
      content1:
        "Make sure you are using the correct email address and password for BTCUniversity.com. This login is different from the one on behindthechair.com. Also keep in mind, you may have multiple accounts with BTC-U.",
      content2: "",
      content1href: "",
      content2href: "",
      category: "getting-started",
    },
    {
      id: 6,
      title: "It's telling me that my email address in invalid.",
      content1:
        "Please make sure you are logging in to btcuniversity.com and NOT behindthechair.com. *behindthechair.com is a separate website.",
      content2: "",
      content1href: "",
      content2href: "",
      category: "getting-started",
    },
    {
      id: 7,
      title: "How do I navigate courses?",
      content1:
        "All of our courses can be found under their corresponding category. Categories are located at the top to the left of the search bar and also in the hamburger menu. When you click on a category, you can explore different topics within the category and clicking on them up top will bring you down to that section of the page. Select the course you would like to take and click ‘Start Course’ below the trailer. The ‘Play’ button is located in the center of the video. Chapter markers are located in the progress bar, as well as closed captions and additional video settings.  ",
      content2: "",
      content1href: "",
      content2href: "",
      category: "getting-started",
    },
    {
      id: 8,
      title: "I would like to update my personal info.",
      content1:
        "You can update your email, password, payment method, address and more in your profile.",
      content2: "",
      content1href: "/profile",
      content2href: "",
      category: "manage-my-account",
    },
    {
      id: 9,
      title: "I forgot my password. How can I reset it?",
      content1: "Click HERE to reset your password.",
      content2:
        "Enter your email address and you will receive an email shortly to reset your password.",
      content1href: "/forgot-password",
      content2href: "",
      category: "manage-my-account",
    },
    {
      id: 10,
      title: "Can I take notes in my course?",
      content1:
        "Yes. There is a ‘Take Notes’ button below each course. There you are able to take and save notes, which are available for as long as you have access to the course.",
      content2: "",
      content1href: "",
      content2href: "",
      category: "course-questions",
    },
    {
      id: 11,
      title: "Can I download course materials?",
      content1:
        "Yes. If there are downloadables, you will see these in the course page under ‘Downloadables.’ You can download these by simply clicking on the button.",
      content2: "",
      content1href: "",
      content2href: "",
      category: "course-questions",
    },
    {
      id: 12,
      title: "How do I contact the instructor?",
      content1:
        "All of our courses show the educator(s) and their Instagram handle(s). You can simply follow them on Instagram and message them with questions you may have about the techniques or products used in the video.",
      content2: "",
      content1href: "",
      content2href: "",
      category: "course-questions",
    },
    {
      id: 13,
      title: "Can I take more than one course at a time?",
      content1:
        "There is no limit to the number of courses that can be taken at any given time.",
      content2: "",
      content1href: "",
      content2href: "",
      category: "course-questions",
    },
    {
      id: 14,
      title: "Do I have to be online at a specific time?",
      content1:
        "No. Your online courses are available around the clock, which means that you can sign in at any time, day or night, and take your course.",
      content2: "",
      content1href: "",
      content2href: "",
      category: "course-questions",
    },
    {
      id: 15,
      title:
        "I can't watch my course during the time it premieres, can I watch it at a later time?",
      content1:
        "YES! All of your courses on BTCUniversity.com will be added to both your homepage and the course category pages where you have unlimited access. Take your classes on your time at your own pace.",
      content2: "",
      content1href: "",
      content2href: "",
      category: "course-questions",
    },
    {
      id: 16,
      title: "Where can I find the formulas for color courses?",
      content1:
        "Color courses will have any formula information located under ‘Formulas’ directly under the video. You must be a subscriber to access formula information.",
      content2: "",
      content1href: "",
      content2href: "",
      category: "course-questions",
    },
    {
      id: 17,
      title: "Do these courses count toward my CE hours?",
      content1:
        "At this time, BTC-U courses are not offered as CE hours, as each state has different regulations. However, we recommend that you contact your state board to find out if they will accept our courses to gain CE hours.",
      content2: "",
      content1href: "",
      content2href: "",
      category: "course-questions",
    },
    {
      id: 18,
      title: "Where can I find my certificates?",
      content1: "To easily access all certificates granted, Click .",
      content2: "HERE",
      content1href: "",
      content2href: "/profile?q=certificates",
      category: "course-questions",
    },
    {
      id: 19,
      title: "How long will I have to watch a course?",
      content1:
        "Once you start a course, it will be added to your homepage  and if you do not finish the course, you can find it under ‘Continue Your Courses.’ You will have unlimited access as long as the class remains on BTCUniversity.com and you are a subscriber.",
      content2: "",
      content1href: "",
      content2href: "",
      category: "course-questions",
    },
    {
      id: 20,
      title: "When do new courses get added?",
      content1:
        "Similar to other subscriptions, new classes will be added monthly. Don’t worry, we'll be sure to email you with updates!",
      content2:
        "Don’t forget to follow @btcuniversity on Instagram to stay updated and enjoy more education from the industry’s top educators!",
      content1href: "",
      content2href: "",
      category: "course-questions",
    },
    {
      id: 21,
      title: "Do courses get removed?",
      content1:
        "Courses are sometimes archived, but it is rare. If you completed a course that is now archived, your certificate will remain on your account–you do not lose it. ",
      content2: "",
      content1href: "",
      content2href: "",
      category: "course-questions",
    },
    {
      id: 22,
      title: "Subtitles and languages",
      content1:
        "Our courses are spoken in English with numerous courses offering subtitles in English, Spanish, Italian, French, Portuguese and Russian.",
      content2:
        "Click HERE to view the courses we currently offer with subtitles.",
      content1href: "",
      content2href: "/languages",
      category: "course-questions",
    },
    {
      id: 23,
      title: "What forms of payments do you accept?",
      content1: "We accept all major credit cards.",
      content2: "",
      content1href: "/profile",
      content2href: "",
      category: "payment-and-cancellations",
    },
    {
      id: 24,
      title: "Expired credit cards",
      content1:
        "Credit cards can become inactive for a number of reasons including card expiration, inactivation, etc. If you are aware that the credit card we have on file is out of date or no longer valid, please update your credit card details or else you may lose access to your account. To update, sign into your account and click the 'Account' icon at the top . You will be directed to your account  page. From here, select ‘Edit Payment Info’ and add your new payment method.",
      content2: "",
      content1href: "/profile",
      content2href: "",
      category: "payment-and-cancellations",
    },
    {
      id: 25,
      title: "Can I cancel anytime?",
      content1:
        "Yes. You may cancel your subscription at any time, but if you cancel your subscription before the end of the current subscription period, we will not refund any subscription fees already paid to us. Following any cancellation, however, you will continue to have access to the service through the end of your current subscription period. Payments are non-refundable and there are no refunds or credits issued for partially used periods.",
      content2: "",
      content1href: "",
      content2href: "",
      category: "payment-and-cancellations",
    },
    {
      id: 26,
      title: "Will my subscription automatically renew?",
      content1:
        "Yes. Subscriptions automatically renew each year on their anniversary date for annual subscriptions, each month on their anniversary date for monthly subscriptions and each 6-month period on their anniversary date for 6-month subscriptions.",
      content2: "",
      content1href: "",
      content2href: "",
      category: "payment-and-cancellations",
    },
    {
      id: 27,
      title: "Can I take my courses on my smartphone or tablet?",
      content1:
        "Yes, our courses are fully HTML5 compatible which means you can experience each course on your smartphone or tablet. Layouts, scrolling or displays may vary depending on the device you have.",
      content2: "",
      content1href: "",
      content2href: "",
      category: "troubleshooting",
    },
    {
      id: 28,
      title: "What browsers are supported?",
      content1:
        "We support the current and the previous major release(s) of Chrome, Firefox, Safari, and Microsoft browsers. This currently includes Microsoft Edge and Internet Explorer. Each time a new browser version is released, we begin supporting that version and stop supporting the third most recent version.",
      content2: "",
      content1href: "",
      content2href: "",
      category: "troubleshooting",
    },
    {
      id: 29,
      title: "Troubleshooting audio issues",
      content1:
        "If you are experiencing audio issues, we recommend you check your internet connection. If necessary, you may need to reset your internet connection, clear your cache, update your browser or try a different one. Additionally, check your speaker/headphone connection and your audio system preferences.",
      content2: "",
      content1href: "",
      content2href: "",
      category: "troubleshooting",
    },
    {
      id: 30,
      title: "Troubleshooting video issues",
      content1:
        "If you are having problems viewing a video, we recommend you check your internet connection. If necessary, reset your internet connection, clear your cache, update your browser or try another browser.",
      content2: "",
      content1href: "",
      content2href: "",
      category: "troubleshooting",
    },
  ];

  const accordionButtonStyle =
    "flex justify-between py-4  items-center w-full text-left focus:outline-none";

  // Filter accordion sections based on the search term
  const filteredSections = searchTerm
    ? accordionSections.filter(
        (section) =>
          section.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          section.content1.toLowerCase().includes(searchTerm.toLowerCase()) ||
          section.content2.toLowerCase().includes(searchTerm.toLowerCase())
      )
    : accordionSections; // If no search term, display all sections

  // filtered sections by category
  const gettingStartedSections = filteredSections.filter((section: any) => {
    return section.category === "getting-started";
  });
  const manageAccountSections = filteredSections.filter((section: any) => {
    return section.category === "manage-my-account";
  });
  const courseQuestionsSections = filteredSections.filter((section: any) => {
    return section.category === "course-questions";
  });
  const paymentAndCancellationsSections = filteredSections.filter(
    (section: any) => {
      return section.category === "payment-and-cancellations";
    }
  );
  const troubleshootingSections = filteredSections.filter((section: any) => {
    return section.category === "troubleshooting";
  });

  return (
    <div className={`mb-4 max-w-[570px] mx-auto ${className}`}>
      <div className="space-under-category-titles" />

      {/* FAQ Categories */}
      <div className="getting started">
        {gettingStartedSections.length !== 0 && (
          <SH1Text text="Getting Started" className="text-themeColor" />
        )}

        {/* Map through filtered accordion sections with category name "getting-started" */}
        {gettingStartedSections.map((section) => (
          <div key={section.id} className="getting-started">
            <button
              className={accordionButtonStyle}
              onClick={() => toggleAccordion(section.id)}
            >
              <SH3Text text={section.title} />
              <span
                className={`transition-transform transform ${
                  accordionOpen[section.id] ? "rotate-0" : "rotate-90"
                }`}
              >
                {accordionOpen[section.id] ? "-" : "+"}
              </span>
            </button>
            {accordionOpen[section.id] && (
              <div>
                <Link
                  href={section.content1href}
                  className={`text-gray-500 ${
                    section.content1href === "" ? "pointer-events-none" : ""
                  }`}
                >
                  <B2Text
                    text={section.content1}
                    className={section.content1href ? "underline" : ""}
                  />
                </Link>
                {section.content2 !== "" && (
                  <Link
                    href={section.content2href}
                    className={`text-gray-500 ${
                      section.content2href === "" ? "pointer-events-none" : ""
                    }`}
                  >
                    <B2Text
                      text={section.content2}
                      className={section.content2href ? "underline" : ""}
                    />
                  </Link>
                )}
              </div>
            )}
          </div>
        ))}
      </div>

      <div className="manage account">
        {manageAccountSections.length !== 0 && (
          <SH1Text text="Manage My Account" className="text-themeColor" />
        )}

        {/* Map through filtered accordion sections with category name "manage-my-account" */}
        {manageAccountSections.map((section) => (
          <div key={section.id} className="manage-my-account">
            <button
              className={accordionButtonStyle}
              onClick={() => toggleAccordion(section.id)}
            >
              <SH3Text text={section.title} />
              <span
                className={`transition-transform transform ${
                  accordionOpen[section.id] ? "rotate-0" : "rotate-90"
                }`}
              >
                {accordionOpen[section.id] ? "-" : "+"}
              </span>
            </button>
            {accordionOpen[section.id] && (
              <div>
                <Link
                  href={section.content1href}
                  className={`text-gray-500 ${
                    section.content1href === "" ? "pointer-events-none" : ""
                  }`}
                >
                  <B2Text
                    text={section.content1}
                    className={section.content1href ? "underline" : ""}
                  />
                </Link>
                {section.content2 !== "" && (
                  <Link
                    href={section.content2href}
                    className={`text-gray-500 ${
                      section.content2href === "" ? "pointer-events-none" : ""
                    }`}
                  >
                    <B2Text
                      text={section.content2}
                      className={section.content2href ? "underline" : ""}
                    />
                  </Link>
                )}
              </div>
            )}
          </div>
        ))}
      </div>

      <div className="course questions">
        {courseQuestionsSections.length !== 0 && (
          <SH1Text text="Course Questions" className="text-themeColor" />
        )}

        {/* Map through filtered accordion sections with category name "course-questions" */}
        {courseQuestionsSections.map((section) => (
          <div key={section.id} className="course-questions">
            <button
              className={accordionButtonStyle}
              onClick={() => toggleAccordion(section.id)}
            >
              <SH3Text text={section.title} />
              <span
                className={`transition-transform transform ${
                  accordionOpen[section.id] ? "rotate-0" : "rotate-90"
                }`}
              >
                {accordionOpen[section.id] ? "-" : "+"}
              </span>
            </button>
            {accordionOpen[section.id] && (
              <div>
                <Link
                  href={section.content1href}
                  className={`text-gray-500 ${
                    section.content1href === "" ? "pointer-events-none" : ""
                  }`}
                >
                  <B2Text
                    text={section.content1}
                    className={section.content1href ? "underline" : ""}
                  />
                </Link>
                {section.content2 !== "" && (
                  <Link
                    href={section.content2href}
                    className={`text-gray-500 ${
                      section.content2href === "" ? "pointer-events-none" : ""
                    }`}
                  >
                    <B2Text
                      text={section.content2}
                      className={section.content2href ? "underline" : ""}
                    />
                  </Link>
                )}
              </div>
            )}
          </div>
        ))}
      </div>

      <div className="payments and cancelations">
        {paymentAndCancellationsSections.length !== 0 && (
          <SH1Text
            text="Payment And Cancellations"
            className="text-themeColor"
          />
        )}

        {/* Map through filtered accordion sections with category name "payment-and-cancellations" */}
        {paymentAndCancellationsSections.map((section) => (
          <div key={section.id} className="payment-and-cancellations">
            <button
              className={accordionButtonStyle}
              onClick={() => toggleAccordion(section.id)}
            >
              <SH3Text text={section.title} />
              <span
                className={`transition-transform transform ${
                  accordionOpen[section.id] ? "rotate-0" : "rotate-90"
                }`}
              >
                {accordionOpen[section.id] ? "-" : "+"}
              </span>
            </button>
            {accordionOpen[section.id] && (
              <div>
                <Link
                  href={section.content1href}
                  className={`text-gray-500 ${
                    section.content1href === "" ? "pointer-events-none" : ""
                  }`}
                >
                  <B2Text
                    text={section.content1}
                    className={section.content1href ? "underline" : ""}
                  />
                </Link>
                {section.content2 !== "" && (
                  <Link
                    href={section.content2href}
                    className={`text-gray-500 ${
                      section.content2href === "" ? "pointer-events-none" : ""
                    }`}
                  >
                    <B2Text
                      text={section.content2}
                      className={section.content2href ? "underline" : ""}
                    />
                  </Link>
                )}
              </div>
            )}
          </div>
        ))}
      </div>

      <div className="supported browsers">
        {troubleshootingSections.length !== 0 && (
          <SH1Text
            text="Supported Browsers, Devices and Technology"
            className="text-themeColor"
          />
        )}

        {/* Map through filtered accordion sections with category name "troubleshooting" */}
        {troubleshootingSections.map((section) => (
          <div key={section.id} className="troubleshooting">
            <button
              className={accordionButtonStyle}
              onClick={() => toggleAccordion(section.id)}
            >
              <SH3Text text={section.title} />
              <span
                className={`transition-transform transform ${
                  accordionOpen[section.id] ? "rotate-0" : "rotate-90"
                }`}
              >
                {accordionOpen[section.id] ? "-" : "+"}
              </span>
            </button>
            {accordionOpen[section.id] && (
              <div>
                <Link
                  href={section.content1href}
                  className={`text-gray-500 ${
                    section.content1href === "" ? "pointer-events-none" : ""
                  }`}
                >
                  <B2Text
                    text={section.content1}
                    className={section.content1href ? "underline" : ""}
                  />
                </Link>
                {section.content2 !== "" && (
                  <Link
                    href={section.content2href}
                    className={`text-gray-500 ${
                      section.content2href === "" ? "pointer-events-none" : ""
                    }`}
                  >
                    <B2Text
                      text={section.content2}
                      className={section.content2href ? "underline" : ""}
                    />
                  </Link>
                )}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default FAQ;
