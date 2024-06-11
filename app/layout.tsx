import Footer from "@/components/Footer";
import { NavDashboardProvider } from "@/components/header/NavDashboardContext";

import "@/styles/globals.css";

// AuthProvider deprecated following Hamzahs updates on Oct 2-3

import { ActiveCategoryProvider } from "@/components/header/ActiveCategoryContext";

import { Toaster } from "react-hot-toast";
import { Suspense } from "react";
import { Poppins } from "next/font/google";
import { ApolloServerProvider } from "@/components/ApolloServerProvider";
import ParentStickyCTAServer from "@/components/molecules/ParentStickyCTAServer";
import NextTopLoader from "nextjs-toploader";
import { themeColor } from "@/lib/constants";
import Header from "@/components/layout/Header";
import GoogleAnalytics from "@/components/molecules/GoogleAnalytics";
import { QueryProvider } from "@/lib/react-query";
import Script from "next/script";
import Localize from '@/features/localize/localize';
import GoBackButton from "@/components/ui/GoBackButton";
import { HydrationBoundary, QueryClient, dehydrate } from "@tanstack/react-query";


const inter = Poppins({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800", "900"],
});

// export const metadata = {
//   title: 'BTC University',
//   description: 'Copyright © Behindthechair.com 2023. All rights reserved.',
// }
// this already exists in page.tsx

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const queryClient = new QueryClient();

  return (
    <html lang="en">
      <head>
        {/* Google Tag Manager */}
        <Script
          id="google-tag-manager"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
              new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
              j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
              'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
              })(window,document,'script','dataLayer','${process.env.NEXT_PUBLIC_GTM}');
            `,
          }}
        />
        <noscript
          dangerouslySetInnerHTML={{
            __html: `<iframe src="https://www.googletagmanager.com/ns.html?id=${process.env.NEXT_PUBLIC_GTM}" height="0" width="0" style="display: none; visibility: hidden;"></iframe>`,
          }}
        />
        {/* End Google Tag Manager */}

        {/* mihai feb 8 google analytics data layer */}



        {/* vimeo tracker, was set up at launch TO DO optimize with Script? */}
        <script
          type="text/javascript"
          defer={true}
          src="https://extend.vimeocdn.com/ga4/133457541.js"
        ></script>

        {/* Add this line for the favicon */}
        <link rel="icon" href="/favicon.ico" sizes="any" />


        {/* hotjar start */}
        <Script
          id="hotjar"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
         (function(h,o,t,j,a,r){

            h.hj = h.hj || function () { (h.hj.q = h.hj.q || []).push(arguments) };

          h._hjSettings={hjid:2636437,hjsv:6};

          a=o.getElementsByTagName('head')[0];

          r=o.createElement('script');r.async=1;

          r.src=t+h._hjSettings.hjid+j+h._hjSettings.hjsv;

          a.appendChild(r);

})(window,document,'https://static.hotjar.com/c/hotjar-','.js?sv=');`,
          }}
        />
        {/* hotjar end */}



      </head>
      <body
        className={`!overflow-x-hidden text-[16px] lg:text-[17px] 2xl:text-[18px] ${inter.className}`}
        style={inter.style}
      >
        <QueryProvider>
          <HydrationBoundary state={dehydrate(queryClient)}>
            <ApolloServerProvider>
              <ActiveCategoryProvider>
                {/* Page loader */}
                <NextTopLoader showSpinner={false} color={themeColor} />
                {/* <ShoppingCartWrapper> */}
                <NavDashboardProvider>
                  <Header />
                  <div className=" flex flex-col min-h-screen">
                    {/* update the above if you want margins on different screensizes  */}
                    <div className="flex-grow">
                      <Script
                        id="optinmonster"
                        strategy="afterInteractive"
                        dangerouslySetInnerHTML={{
                          __html: `(function(d,u,ac){var s=d.createElement('script');s.type='text/javascript';s.src='https://a.omappapi.com/app/js/api.min.js';s.async=true;s.dataset.user=u;s.dataset.account=ac;d.getElementsByTagName('head')[0].appendChild(s);})(document,45651,51722)`,
                        }}
                      />

                      {/* <Localize /> */}
                      <Suspense fallback="Loading...">
                        <GoBackButton />
                        {children}
                      </Suspense>
                    </div>
                  </div>
                  {/* CTA */}
                  <Suspense>
                    <ParentStickyCTAServer />
                  </Suspense>

                  <Footer />
                </NavDashboardProvider>
              </ActiveCategoryProvider>
            </ApolloServerProvider>
          </HydrationBoundary>
        </QueryProvider>
        <Toaster />
      </body>
    </html>
  );
}
