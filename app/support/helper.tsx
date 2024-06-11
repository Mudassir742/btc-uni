export interface IAccordionData {
    id: number;
    title: string;
    content1: string;
    content2?: string;
    content1href?: string;
    content2href?: string;
    category: string;
}




export const accordionData = [
    {
        id: 0,
        title: "Contact",
        content1: `
        <a class="email-here" href="mailto: membership@btcuniversity.com"> Email: membership@btcuniversity.com</a>
       
        Phone: (800) 760-3010`
        ,
        // content2: "Email: membership@btcuniversity.com",
        content1href: "mailto: membership@btcuniversity.com",
        // content2href: ``,
        category: "getting-started",
    },
    {
        id: 1,
        title: "About your subscription",
        content1:
            `When you log in, your profile will show you all the upcoming classes you can add to your calendar. Don’t forget you always have unlimited access to over 250+ courses on-demand!
            
            To manage your subscription, go to your account and click ‘Update Subscription.’ 

            Your subscription will auto-renew on your next billing cycle. You can cancel at any time and your subscription will remain active until the following billing cycle.
            `,
        content2: "",
        content1href: "",
        content2href: "",
        category: "getting-started",
    },
    {
        id: 2,
        title: "What's included in the membership?",
        content1:
            `Instant access to 250+ pro tutorials, quick tips and downloadable resources including: color, cutting, texture, men’s barbering and grooming, extensions, styling, business and social media. PLUS, new content is added weekly!
           `,
        // content2: "",
        // content1href: "",
        // content2href: "",
        category: "getting-started",
    },
    {
        id: 3,
        title: "How much does the membership cost?",
        content1: `See our plans and prices* <a class="faq-here" href="/subscribe">HERE!</a> 
        *Our prices are in USD
        `,
        // content2: "*Our prices are in USD",
        // content1href: "/subscribe",
        // content2href: "",
        category: "getting-started",
    },
    {
        id: 4,
        title: "How do I log in?",
        content1: `Log in <a class="faq-here" href="/log-in">HERE!</a> `,
        // content2: "",
        // content1href: "/log-in",
        // content2href: "",
        category: "getting-started",
    },
    {
        id: 5,
        title: "I’m having trouble signing in",
        content1: `Make sure you are using the correct email address and password for BTCUniversity.com.  
        
        This login is different from the one on behindthechair.com. Also keep in mind, you may have multiple accounts with BTC-U.`,
        // content2: "",
        // content1href: "/log-in",
        // content2href: "",
        category: "getting-started",
    },
    {
        id: 6,
        title: "It’s telling me my email address is invalid.",
        content1: `Please make sure you are logging in to btcuniversity.com and NOT behindthechair.com. 

        Behindthechair.com is a separate website.`,
        category: "getting-started",
    },
    {
        id: 7,
        title: `How do I navigate courses?`,
        content1: `All of our courses can be found under their corresponding category. Categories are located in the hamburger menu. 

        When you click on a category, you can explore different topics within the category and clicking on them up top will bring you down to that section of the page. 

        Select the course you would like to take and click ‘Start Course’ below the trailer. The ‘Play’ button is located in the center of the video. Chapter markers are located in the progress bar, as well as closed captions and additional video settings.`,
        category: "getting-started",
    },
    {
        id: 8,
        title: `I would like to update my personal info.`,
        content1: `You can update your email, password, payment method, address and more in your profile. Click <a class="faq-here" href="/profile">HERE</a> to visit your profile.`,
        category: "manage-account",
    },
    {
        id: 9,
        title: `I forgot my password. How can I reset it?`,
        content1: `Click <a class="faq-here" href="/forgot-password">HERE!</a> to reset your password. 
        Enter your email address and you will receive an email shortly to reset your password.`,
        category: "manage-account",
    },
    {
        id: 10,
        title: `Can I take notes in my courses?`,
        content1: `Yes. There is a ‘Take Notes’ button below each course. There you are able to take and save notes, which are available for as long as you have access to the course.
        `,
        category: "course-question",
    },
    {
        id: 11,
        title: `Can I download course materials?`,
        content1: `Yes. If there are downloadables, you will see these in the course page under ‘Downloadables.’ You can download these by simply clicking on the button.
        `,
        category: "course-question",
    },
    {
        id: 12,
        title: `How do I contact the instructor?`,
        content1: `Our courses show the educator(s) and their Instagram handle(s). You can simply follow them on Instagram and message them with questions you may have about the techniques or products used in the video.
        `,
        category: "course-question",
    },
    {
        id: 13,
        title: `Can I take more than one course at a time?`,
        content1: `There is no limit to the number of courses that can be taken at any given time.`,
        category: "course-question",
    },
    {
        id: 14,
        title: `Do I have to be online at a specific time?`,
        content1: `No. Your online courses are available around the clock, which means that you can sign in at any time, day or night, and take your course.`,
        category: "course-question",
    },
    {
        id: 15,
        title: `I can’t watch my course during the time it premieres, can I watch it at a later time?`,
        content1: `YES! All of your courses on BTCUniversity.com will be added to your profile where you have unlimited access. Take your classes on your time at your own pace.`,
        category: "course-question",
    },
    {
        id: 16,
        title: `Where can I find the formulas for the color courses?`,
        content1: `Color courses will have any formula information located under ‘Formulas’ directly under the video. You must be a subscriber to access formula information.`,
        category: "course-question",
    },

    {
        id: 17,
        title: `Do these courses count toward my CE hours?`,
        content1: `At this time, BTC-U courses are not offered as CE hours, as each state has different regulations. However, we recommend that you contact your state board to find out if they will accept our courses to gain CE hours.`,
        category: "course-question",
    },
    {
        id: 18,
        title: `Where can I find my certificates?`,
        content1: `To easily access all certificates granted, click <a class="faq-here" href="/profile?q=certificates">HERE!</a>.`,
        category: "course-question",
    },
    // {
    //     id: 19,
    //     title: `Where can I find my certificates?`,
    //     content1: `To easily access all certificates granted, Click <a class="faq-here" href="/profile?q=certificates">HERE!</a>.`,
    //     category: "course-question",
    // },
    {
        id: 20,
        title: `How long will I have to watch a course?`,
        content1: `Once you start a course, it will be added to your profile and if you do not finish the course, you can find it under ‘Continue Your Courses.’ You will have unlimited access as long as the class remains on BTCUniversity.com and you are a subscriber.`,
        category: "course-question",
    },
    {
        id: 21,
        title: `When do new courses get added?`,
        content1: `Similar to other subscriptions, new classes will be added monthly. Don’t worry, we'll be sure to email you with updates!
        
        Don’t forget to follow @btcuniversity on Instagram to stay updated and enjoy more education from the industry’s top educators!`,
        category: "course-question",
    },
    {
        id: 22,
        title: `Do courses get removed?`,
        content1: `Courses are sometimes archived, but it is rare. If you completed a course that is now archived, your certificate will remain on your account–you do not lose it.`,
        category: "course-question",
    },
    {
        id: 23,
        title: `Subtitles and languages`,
        content1: `Our courses are spoken in English with numerous courses offering subtitles in English, Spanish, Italian, French, Portuguese and Russian. Click <a class="faq-here" href="/languages">HERE</a> to view the courses we currently offer with subtitles.`,
        category: "course-question",
    },
    {
        id: 24,
        title: `What forms of payment do you accept?`,
        content1: `We accept all major credit cards. `,
        category: "payment-cancellation",
    },
    // {
    //     id: 25,
    //     title: `Expired credit cards`,
    //     content1: `Credit cards can become inactive for a number of reasons including card expiration, inactivation, etc. If you are aware that the credit card we have on file is out of date or no longer valid, please update your credit card details or else you may lose access to your account.`,
    //     category: "payment-cancellation",
    // },
    {
        id: 26,
        title: `Expired credit cards`,
        content1: `Credit cards can become inactive for a number of reasons including card expiration, inactivation, etc. If you are aware that the credit card we have on file is out of date or no longer valid, please update your credit card details or else you may lose access to your account.
        
        To update your credit card details, sign into your account and click the 'Account' icon at the top. You will be directed to your account page. From here, select ‘Edit Payment Info’ and add your new payment method.
        `,
        category: "payment-cancellation",
    },
    {
        id: 27,
        title: `Can I cancel anytime?`,
        content1: `Yes. You may cancel your subscription at any time, but if you cancel your subscription before the end of the current subscription period, we will not refund any subscription fees already paid to us. 

        Following any cancellation, however, you will continue to have access to the service through the end of your current subscription period. Payments are non-refundable and there are no refunds or credits issued for partially used periods.
       
        How to cancel:<a class="cancel" href="/cancel">
1. Log in to your account
2. Click on your profile icon
3. Go to Update Subscription
4. Select 'Change Plan'
4. Click 'Cancel Plan'
</a>
`,
        category: "payment-cancellation",
    },
    {
        id: 28,
        title: `Will my subscription automatically renew?`,
        content1: `Yes. Subscriptions automatically renew each year on their anniversary date for annual subscriptions, each month on their anniversary date for monthly subscriptions and each 6-month period on their anniversary date for 6-month subscriptions`,
        category: "payment-cancellation",
    },
    {
        id: 29,
        title: `Can I take courses on my smartphone or tablet?`,
        content1: `Yes, our courses are fully HTML5 compatible which means you can experience each course on your smartphone or tablet. Layouts, scrolling or displays may vary depending on the device you have.`,
        category: "suppported-browser",
    },
    {
        id: 30,
        title: `What browsers are supported?`,
        content1: `We support the current and the previous major release(s) of Chrome, Firefox, Safari, and Microsoft browsers. Each time a new browser version is released, we begin supporting that version and stop supporting the third most recent version.`,
        category: "suppported-browser",
    },
    // {
    //     id: 31,
    //     title: `Troubleshooting audio issues`,
    //     content1: `If you are experiencing audio issues, we recommend you check your internet connection. If necessary, you may need to reset your internet connection, clear your cache, update your browser or try a different one. Additionally, check your speaker/headphone connection and your audio system preferences.`,
    //     category: "suppported-browser",
    // },
    {
        id: 32,
        title: `Troubleshooting audio issues`,
        content1: `If you are having problems viewing a video, we recommend you check your internet connection. If necessary, reset your internet connection, clear your cache, update your browser or try another browser.`,
        category: "suppported-browser",
    },

];

export const category = [
    {
        name: "Getting Started",
        link: "getting-started",
    },
    {
        name: "Manage My Account",
        link: "manage-account",
    },
    {
        name: "Course Questions",
        link: "course-question",
    },
    {
        name: "Payment and Cancellation",
        link: "payment-cancellation",
    },
    {
        name: "Supported Browsers, Devices and Technology",
        link: "suppported-browser",
    },
];