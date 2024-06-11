/** @type {import('next').NextConfig} */
const nextConfig = {
	images: {
		domains: [
			"cms.btcuniversity.com",
			"btcu2023react.wpengine.com",
			"btcu2023react1.wpengine.com",
			"files.stripe.com",
			"localhost",
			"btcu.vercel.app",
			"new-btcuniversity.vercel.app",
			"btcuniversity.com",
			"i.vimeocdn.com",
		],
	},
	async rewrites() {
		return [
			{
				source: "/images/:all*",
				destination: "https://cms.btcuniversity.com/wp-content/:all*",
			},
			{
				source: "/pdf/:all*",
				destination: "https://cms.btcuniversity.com/wp-content/:all*",
			},
		];
	},
	// MIHAI: added redirects here
	async redirects() {
		return [
			// all redirects below
			// added redirect
			{
				source: "/update-subscription",
				destination: "/profile?q=update-subscription",
				permanent: true,
			},
			{
				source: "/completed",
				destination: "/profile?q=certificates",
				permanent: true,
			},
			// added feb 14
			{
				source: "/courses/the-reality-of-stylist-salaries/:path*",
				destination: "/business/:path*",
				permanent: true,
			},
			// added jan 31
			{
				source: "/profile/manager/dashboard/:path*",
				destination: "/profile/:path*",
				permanent: true,
			},
			// added jan 26
			{
				source: "/pages/sponsorships-postcards/:path*",
				destination: "/social-media/:path*",
				permanent: true,
			},
			// added jan 25
			{ source: "/homepage/:path*", destination: "/:path*", permanent: true },
			{ source: "/home/:path*", destination: "/:path*", permanent: true },
			{
				source: "/pages/homepage/:path*",
				destination: "/:path*",
				permanent: true,
			},
			{
				source: "/bundles/overall-best-selling-education",
				// destination: "/collections/best-selling-cutting-collection/:path*",
				// changed to below by Mihai as the above doesnt exist
				destination: "/subscribe",
				permanent: true,
			},
			{ source: "/catalog/:path*", destination: "/:path*", permanent: true },
			{
				source:
					"/collections/4-of-our-best-selling-cutting-videos-from-our-arc-artists/:path*",
				destination: "/collections/top-haircutting-trends-of-2023-2/:path*",
				permanent: true,
			},
			{
				source: "/courses/social-media-for-hairdressers/:path*",
				destination: "/courses/instagram-101-handles-bios-profile-pics/:path*",
				permanent: true,
			},
			{ source: "/learn", destination: "/profile", permanent: true },
			{
				source: "/learn/account/:path*",
				destination: "/profile/:path*",
				permanent: true,
			},
			{
				source: "/learn/change_password/:path*",
				destination: "/forgot-password/:path*",
				permanent: true,
			},
			{
				source:
					"/learn/course/90s-supermodel-layers/90s-supermodel-layers/90s-supermodel-layers/:path*",
				destination: "/courses/90s-supermodel-blowout/:path*",
				permanent: true,
			},
			{
				source:
					"/learn/course/ashleenormanhair-balayage-vs-foilayage-how-to-master-both-techniques/what-is-balayage/part-1-of-2/:path*",
				destination: "/courses/master-balayage-foilayage/:path*",
				permanent: true,
			},
			{
				source: "/learn/course/amanukyan-your-financial-future/:path*",
				destination: "/courses/your-financial-future/:path*",
				permanent: true,
			},
			{
				source:
					"/learn/course/brianacisneros-the-bixie/the-bixie-cut/part-1-of-2/:path*",
				destination: "/courses/the-bixie-cut/:path*",
				permanent: true,
			},
			{
				source:
					"/learn/course/btc-live-co-lab-how-to-texturize-style-a-bob/chrisjones-hair-buddywporter-how-to-texturize-style-a-bob/part-1-of-2/:path*",
				destination: "/courses/how-to-cut-style-a-bob/:path*",
				permanent: true,
			},
			{
				source:
					"/learn/course/btc-live-platinum-retouch-application/btc-live/zachmesquit-platinum-retouch-application/:path*",
				destination: "/courses/platinum-retouch-application/:path*",
				permanent: true,
			},
			{
				source:
					"/learn/course/btc-live-smart-blonding-foil-placement-strategies-with-theblondechronicles/before-after/part-2-of-3/:path*",
				destination: "/courses/smart-blonding-techniques/:path*",
				permanent: true,
			},
			{
				source:
					"/learn/course/btc-live-smart-blonding-foil-placement-strategies-with-theblondechronicles/theblondechronicles-smart-blonding-foil-placement-strategies/part-1-of-3/:path*",
				destination: "/courses/smart-blonding-techniques/:path*",
				permanent: true,
			},
			{
				source:
					"/learn/course/btc-live-smart-blonding-foil-placement-strategies-with-theblondechronicles/theblondechronicles-smart-blonding-foil-placement-strategies/part-1-of-3/completed/:path*",
				destination: "/courses/smart-blonding-techniques/:path*",
				permanent: true,
			},
			{
				source:
					"/learn/course/btc-live-textured-pixie-haircut-by-mattswinney/mattswinney-textured-pixie-haircut/part-1-of-2/:path*",
				destination: "/textured-pixie-haircut/:path*",
				permanent: true,
			},
			{
				source:
					"/learn/course/chrisjoneshair-how-to-style-texturize-any-haircut/chrisjones-hair-how-to-cut-a-bob/part-1-of-2/:path*",
				destination: "/courses/how-to-cut-style-a-bob/:path*",
				permanent: true,
			},
			{
				source:
					"/learn/course/coloredbycaitlin-bronde-highlights-lowlights-toning/coloredbycaitlin-bronde-highlights-lowlights-toning/coloredbycaitlin-bronde-highlights-lowlights-toning/:path*",
				destination: "/courses/bronde-highlights-lowlights/:path*",
				permanent: true,
			},
			{
				source:
					"/learn/course/danielmbeauty-high-contrast-foilayage/danielmbeauty-high-contrast-foilyage/danielmbeauty-high-contrast-foilyage/:path*",
				destination: "/courses/high-contrast-foilayage/:path*",
				permanent: true,
			},
			{
				source:
					"/learn/course/dimensional-warm-bronze/dimensional-warm-bronze/dimensional-warm-bronze/:path*",
				destination: "/courses/dimensional-warm-bronze/:path*",
				permanent: true,
			},
			{
				source:
					"/learn/course/express-lowlights-content-creation/express-lowlights-content-creation/express-lowlights-content-creation/:path*",
				destination: "/courses/lowlights-content-creation/:path*",
				permanent: true,
			},
			{
				source:
					"/learn/course/foil-free-express-lowlights/foil-free-express-lowlights/foil-free-express-lowlights/:path*",
				destination: "/courses/foil-free-express-lowlights/:path*",
				permanent: true,
			},
			{
				source:
					"/learn/course/honey-blonde-balayage/honey-blonde-balayage/honey-blonde-balayage/:path*",
				destination: "/courses/honey-blonde-balayage/:path*",
				permanent: true,
			},
			{
				source:
					"/learn/course/how-to-bright-blonde-in-20-foils/how-to-bright-blonde-in-20-foils/how-to-bright-blonde-in-20-foils/:path*",
				destination: "/courses/bright-blonde-in-20-foils/:path*",
				permanent: true,
			},
			{
				source:
					"/learn/course/rachelwstylist-face-framing-shag-haircut/rachelwstylist-face-framing-shag-haircut/part-1-of-2/:path*",
				destination: "/courses/face-framing-shag-haircut/:path*",
				permanent: true,
			},
			{
				source:
					"/learn/course/reverse-balayage/reverse-balayage/reverse-balayage/:path*",
				destination: "/courses/reverse-balayage/:path*",
				permanent: true,
			},
			{
				source:
					"/learn/course/social-media-for-hairdresser/series-introduction/part-1-of-3/:path*",
				destination: "/courses/instagram-101-handles-bios-profile-pics/:path*",
				permanent: true,
			},
			{
				source:
					"/learn/course/social-media-for-hairdresser/upcoming-episodes/part-3-of-3/:path*",
				destination: "/courses/instagram-101-handles-bios-profile-pics/:path*",
				permanent: true,
			},
			{
				source:
					"/learn/course/styling-photographing-hair-for-social-media/styling-photographing-hair-for-social-media/styling-photographing-hair-for-social-media/:path*",
				destination:
					"/courses/styling-and-photographing-hair-for-social-media/:path*",
				permanent: true,
			},
			{
				source:
					"/learn/course/styling-photographing-hair-for-social-media/styling-photographing-hair-for-social-media/styling-photographing-hair-for-social-media/course-completed/:path*",
				destination:
					"/courses/styling-and-photographing-hair-for-social-media/:path*",
				permanent: true,
			},
			{
				source:
					"/learn/course/the-butterfly-cut/the-butterfly-cut/part-1-of-2/:path*",
				destination: "/courses/the-butterfly-haircut/:path*",
				permanent: true,
			},
			{
				source: "/learn/course/the-fade/the-fade/the-fade/:path*",
				destination: "/courses/the-fade-technique/:path*",
				permanent: true,
			},
			{
				source:
					"/learn/course/the-french-bob/the-french-bob/the-french-bob/:path*",
				destination: "/courses/the-french-bob/:path*",
				permanent: true,
			},
			{
				source:
					"/learn/course/xofarhanabalayage-brightening-brunettes-for-summer/xofarhanabalayage-brightening-brunettes-for-summer/xofarhanabalayage-brightening-brunettes-for-summer/:path*",
				destination: "/courses/brightening-brunettes/:path*",
				permanent: true,
			},
			{
				source: "/learn/dashboard/:path*",
				destination: "/profile/:path*",
				permanent: true,
			},
			{
				source: "/learn/enroll/2792fef2-7446-48f9-9476-e689bce431e0/:path*",
				destination: "/courses/the-butterfly-haircut/:path*",
				permanent: true,
			},
			{
				source: "/learn/enroll/29618b89-806e-47ee-bccd-711563e825a4/:path*",
				destination: "/courses/90s-supermodel-layers/:path*",
				permanent: true,
			},
			{
				source: "/learn/enroll/394b12c0-b1d1-4528-9886-26da713c39c7/:path*",
				destination: "/courses/reverse-balayage/:path*",
				permanent: true,
			},
			{
				source: "/learn/enroll/830642c3-9b03-4b54-a477-5f02faa453db/:path*",
				destination: "/courses/high-contrast-foilayage/:path*",
				permanent: true,
			},
			{
				source: "/learn/enroll/a0823998-6723-4e58-be1e-2c44b2c94306/:path*",
				destination: "/courses/smart-blonding-techniques/:path*",
				permanent: true,
			},
			{
				source: "/learn/enroll/b2dc5ea9-c433-4175-a8cb-6f88a63d7b86/:path*",
				destination:
					"/courses/styling-and-photographing-hair-for-social-media/:path*",
				permanent: true,
			},
			{
				source: "/learn/forgot/:path*",
				destination: "/forgot-password/:path*",
				permanent: true,
			},
			{
				source: "/learn/reset_password/:path*",
				destination: "/forgot-password/:path*",
				permanent: true,
			},
			{
				source: "/learn/sign_in/:path*",
				destination: "/log-in/:path*",
				permanent: true,
			},
			{
				source: "/learn/sign_out/:path*",
				destination: "/:path*",
				permanent: true,
			},
			{
				source: "/learn/survey/:path*",
				destination: "/:path*",
				permanent: true,
			},
			{
				source: "/learn/transcript/:path*",
				destination: "/:path*",
				permanent: true,
			},
			{
				source: "/learn/update_card/:path*",
				destination: "/profile/:path*",
				permanent: true,
			},
			{ source: "/not-found/:path*", destination: "/:path*", permanent: true },
			{ source: "/orders/:path*", destination: "/:path*", permanent: true },
			{
				source: "/orders/confirmation/:path*",
				destination: "/:path*",
				permanent: true,
			},
			{
				source: "/pages/balayage-blonding/:path*",
				destination: "/haircolor/:path*",
				permanent: true,
			},
			{
				source: "/pages/btc-events/:path*",
				destination: "/events",
				permanent: true,
			},
			{
				source: "/pages/btcuniversity-home/:path*",
				destination: "/",
				permanent: true,
			},
			{
				source: "/pages/business/:path*",
				destination: "/business/:path*",
				permanent: true,
			},
			{
				source: "/pages/celeb-series/:path*",
				destination: "/:path*",
				permanent: true,
			},
			{
				source: "/pages/collections/:path*",
				destination: "/masterclasses/:path*",
				permanent: true,
			},
			{
				source: "/pages/educators/:path*",
				destination: "/all-educators/:path*",
				permanent: true,
			},
			{
				source: "/pages/extensions/:path*",
				destination: "/hairextensions/:path*",
				permanent: true,
			},
			{
				source: "/pages/haircolor/:path*",
				destination: "/haircolor/:path*",
				permanent: true,
			},
			{
				source: "/pages/haircutting-1/:path*",
				destination: "/haircutting/:path*",
				permanent: true,
			},
			{
				source: "/pages/languages/:path*",
				destination: "/languages/:path*",
				permanent: true,
			},
			{
				source: "/pages/mens-1/:path*",
				destination: "/mens/:path*",
				permanent: true,
			},
			{
				source: "/pages/social-media/:path*",
				destination: "/social-media/:path*",
				permanent: true,
			},
			{
				source: "/pages/styling-na4p/:path*",
				destination: "/styling/:path*",
				permanent: true,
			},
			{
				source: "/pages/subscribe/:path*",
				destination: "/subscribe/:path*",
				permanent: true,
			},
			{
				source: "/pages/texture/:path*",
				destination: "/texture/",
				permanent: true,
			},
			{
				source: "/pages/upcoming-classes/:path*",
				destination: "/:path*",
				permanent: true,
			},
			{
				source:
					"/learn/course/btc-live-hairbypf-dimensional-balayage/btc-live/philipforesto-dimensional-balayage/:path*",
				destination: "/courses/dimensional-balayage-3/:path*",
				permanent: true,
			},
			{
				source:
					"/learn/course/ashleenormanhair-balayage-vs-foilayage-how-to-master-both-techniques/before-after/2-of-2/:path*",
				destination: "/courses/master-balayage-foilayage/:path*",
				permanent: true,
			},
			{
				source:
					"/learn/course/btc-live-sallyhershberger-the-shag/sallyhershberger-the-shag/part-1-of-2/:path*",
				destination: "/courses/the-shag-haircut/:path*",
				permanent: true,
			},
			{
				source: "/learn/enroll/7a8585b2-f68e-405b-80cc-061670ab825c/:path*",
				destination: "/courses/foil-free-express-lowlights/:path*",
				permanent: true,
			},
			{
				source:
					"/learn/course/danielmbeauty-high-contrast-blonding/danielmbeauty-high-contrast-blonding/danielmbeauty-high-contrast-blonding/:path*",
				destination: "/courses/high-contrast-blonding/:path*",
				permanent: true,
			},
			{
				source: "/learn/enroll/2df4d10d-d75e-4af7-9646-a02844bad2e8/:path*",
				destination: "/courses/brightening-brunettes/:path*",
				permanent: true,
			},
			{
				source:
					"/courses/btc-live-co-lab-reversible-bob-medium-length-layered-cut/:path*",
				destination: "/courses/bob-midlength-cut/:path*",
				permanent: true,
			},
			{
				source: "/courses/btc-live-sallyhershberger-the-shag/:path*",
				destination: "/courses/the-shag-haircut/:path*",
				permanent: true,
			},
			{
				source: "/learn/enroll/bafdc37e-7c44-4e72-8425-ae4b917c6448/:path*",
				destination: "/courses/the-bixie-cut/:path*",
				permanent: true,
			},
			{
				source:
					"/learn/course/the-butterfly-cut/the-butterfly-cut/part-1-of-2/completed/:path*",
				destination: "/courses/the-butterfly-haircut/:path*",
				permanent: true,
			},
			{
				source:
					"/learn/course/theblondechronicles-expensive-brunette-in-25-foils-or-less/finished-look/part-1-of-3/:path*",
				destination: "/courses/expensive-brunette/:path*",
				permanent: true,
			},
			{
				source:
					"/courses/theblondechronicles-expensive-brunette-in-25-foils-or-less/:path*",
				destination: "/courses/expensive-brunette/:path*",
				permanent: true,
			},
			{
				source: "/pages/social-climbing/:path*",
				destination: "/:path*",
				permanent: true,
			},
			{
				source: "/courses/btc-live-hairbypf-dimensional-balayage/:path*",
				destination: "/courses/dimensional-balayage-3/:path*",
				permanent: true,
			},
			{
				source:
					"/learn/course/social-media-for-hairdresser/series-introduction/part-1-of-3/completed/:path*",
				destination: "/courses/instagram-101-handles-bios-profile-pics/:path*",
				permanent: true,
			},
			{
				source:
					"/learn/course/btc-live-shadow-foilayage-money-piece-with-coloredbycaitlin/btc-live/coloredbycaitlin-shadow-foilayage-money-piece/:path*",
				destination: "/courses/bronde-highlights-lowlights/:path*",
				permanent: true,
			},
			{
				source:
					"/learn/course/social-media-for-hairdresser/instagram-101-handles-bios-and-why-your-profile-pic-matters/part-2-of-3/completed/:path*",
				destination: "/courses/instagram-101-handles-bios-profile-pics/:path*",
				permanent: true,
			},
			{
				source:
					"/learn/course/how-to-curate-the-captions-and-hashtags-for-your-audience/how-to-curate-captions-and-hashtags-for-your-audience/part-1-of-2/:path*",
				destination: "/courses/captions-hashtags-for-your-audience/:path*",
				permanent: true,
			},
			{
				source:
					"/learn/course/low-slow-lightening/low-slow-lightening/low-slow-lightening/:path*",
				destination: "/courses/low-slow-lightening/:path*",
				permanent: true,
			},
			{
				source: "/courses/how-to-use-instagram-to-gain-more-clients-1/:path*",
				destination: "/courses/build-your-clientele-with-instagram/:path*",
				permanent: true,
			},
			{
				source:
					"/learn/course/the-butterfly-cut/before-after/part-2-of-2/:path*",
				destination: "/courses/the-butterfly-haircut/:path*",
				permanent: true,
			},
			{
				source:
					"/courses/btc-live-textured-pixie-haircut-by-mattswinney/:path*",
				destination: "/courses/textured-pixie-haircut/:path*",
				permanent: true,
			},
			{
				source:
					"/courses/hairbychrissydanielle-the-blonde-roadmap-gray-coverage-melt-ribbon-balayage-in-one-service/:path*",
				destination: "/courses/gray-coverage-melt/:path*",
				permanent: true,
			},
			{
				source: "/courses/curly-hair-cutting-styling-techniques/:path*",
				destination: "/courses/curly-cutting-techniques/:path*",
				permanent: true,
			},
			{
				source: "/courses/falls-hottest-haircuts/:path*",
				destination: "/courses/this-years-4-hottest-haircuts/:path*",
				permanent: true,
			},
			{
				source:
					"/learn/course/danielmbeauty-high-contrast-foilayage/formulas/10-of-10/:path*",
				destination: "/courses/high-contrast-foilayage/:path*",
				permanent: true,
			},
			{
				source:
					"/learn/course/btc-live-co-lab-reversible-bob-medium-length-layered-cut/styled-by-carolynn-mattswinney-signature-bob-midlength-layered-cut/part-1-of-2/:path*",
				destination: "/courses/bob-midlength-cut/:path*",
				permanent: true,
			},
			{
				source: "/learn/course/the-butterfly-cut/:path*",
				destination: "/courses/the-butterfly-haircut/:path*",
				permanent: true,
			},
			{
				source: "/courses/kevinluchmun-mens-midlength-textured-cut/:path*",
				destination: "/courses/midlength-textured-cut/:path*",
				permanent: true,
			},
			{
				source:
					"/learn/course/how-to-use-instagram-to-gain-more-clients-1/how-to-use-instagram-to-gain-more-clients/part-1-of-2/:path*",
				destination: "/courses/build-your-clientele-with-instagram/:path*",
				permanent: true,
			},
			{
				source:
					"/learn/course/curly-hair-cutting-styling-techniques/curly-hair-cutting-styling-techniques/part-1-of-3/:path*",
				destination: "/courses/curly-cutting-techniques/:path*",
				permanent: true,
			},
			{
				source: "/learn/enroll/85e58d6b-b2f6-4397-ab3d-1641f8bfdc0c/:path*",
				destination: "/educator/haley-gable/:path*",
				permanent: true,
			},
			{
				source:
					"/courses/btc-live-popethebarber-fade-taper-like-a-badass-in-under-90-minutes/:path*",
				destination: "/courses/fade-taper-techniques/:path*",
				permanent: true,
			},
			{
				source: "/courses/btc-live-platinum-retouch-application/:path*",
				destination: "/courses/platinum-retouch-application/:path*",
				permanent: true,
			},
			{
				source:
					"/learn/course/contour-layering/contour-layering/part-1-of-2/:path*",
				destination: "/courses/contour-layering/:path*",
				permanent: true,
			},
			{
				source:
					"/learn/course/btc-live-smart-blonding-foil-placement-strategies-with-theblondechronicles/before-after/part-2-of-3/completed/:path*",
				destination: "/courses/smart-blonding-techniques/:path*",
				permanent: true,
			},
			{
				source: "/collections/top-haircutting-trends-of-2023/:path*",
				destination: "/collections/top-haircutting-trends-of-2023-2/:path*",
				permanent: true,
			},
			{
				source:
					"/courses/exclusive-social-media-tips-to-get-noticed-by-brands/:path*",
				destination: "/courses/brands-how-to-get-them-to-notice-you/:path*",
				permanent: true,
			},
			{
				source:
					"/learn/course/hybrid-extension-application/hybrid-extension-application/hybrid-extension-application/:path*",
				destination: "/courses/hybrid-extension-application/:path*",
				permanent: true,
			},
			{
				source:
					"/learn/course/social-media-for-hairdresser/upcoming-episodes/first-lesson/:path*",
				destination: "/courses/instagram-101-handles-bios-profile-pics/:path*",
				permanent: true,
			},
			{
				source:
					"/courses/johnwgeorge-learn-the-silk-press-technique-from-start-to-finish/:path*",
				destination: "/courses/the-silk-press-technique/:path*",
				permanent: true,
			},
			{
				source:
					"/learn/course/styled-by-carolynn-the-short-shag/styled-by-carolynn-the-short-shag/part-1-of-2/:path*",
				destination: "/courses/the-short-shag-haircut/:path*",
				permanent: true,
			},
			{
				source: "/courses/curlfactor-curly-cutting-dos-donts/:path*",
				destination: "/courses/curly-client-consultations/:path*",
				permanent: true,
			},
			{
				source:
					"/learn/course/social-media-for-hairdresser/instagram-101-handles-bios-and-why-your-profile-pic-matters/part-2-of-3/:path*",
				destination: "/collections/best-selling-cutting-collection/:path*",
				permanent: true,
			},
			{
				source:
					"/learn/course/andreahenty-how-to-build-your-business-with-extensions/andreahenty-how-to-build-your-business-with-extensions/episode-1/:path*",
				destination: "/courses/build-your-business-with-extensions/:path*",
				permanent: true,
			},
			{
				source:
					"/learn/course/linsonhair-dimensional-balayage-refresh/linsonhair-dimensional-balayage-refresh/linsonhair-dimensional-balayage-refresh/:path*",
				destination: "/courses/dimensional-balayage-3/:path*",
				permanent: true,
			},
			{
				source: "/courses/danielmbeauty-high-contrast-blonding/:path*",
				destination: "/courses/high-contrast-blonding/:path*",
				permanent: true,
			},
			{
				source:
					"/courses/hairandmakeupbysteph-3-bridal-styles-high-bun-low-updo-bridal-ponytail/:path*",
				destination: "/courses/3-bridal-styling-techniques/:path*",
				permanent: true,
			},
			{
				source: "/register/:path*",
				destination: "/subscribe/:path*",
				permanent: true,
			},
			{
				source:
					"/learn/course/hybrid-toning/hybrid-toning-gray-coverage/hybrid-toning-gray-coverage/:path*",
				destination: "/courses/hybrid-toning-gray-coverage/:path*",
				permanent: true,
			},
			{
				source:
					"/learn/course/xofarhanabalayage-brightening-brunettes-for-summer/xofarhanabalayage-brightening-brunettes-for-summer/xofarhanabalayage-brightening-brunettes-for-summer/course-completed/:path*",
				destination: "/courses/brightening-brunettes/:path*",
				permanent: true,
			},
			{
				source:
					"/learn/course/btc-live-smart-blonding-foil-placement-strategies-with-theblondechronicles/:path*",
				destination: "/courses/smart-blonding-techniques/:path*",
				permanent: true,
			},
			{
				source:
					"/learn/course/ashleenormanhair-balayage-vs-foilayage-how-to-master-both-techniques/:path*",
				destination: "/courses/master-balayage-foilayage/:path*",
				permanent: true,
			},
			{
				source: "/courses/hybrid-toning/:path*",
				destination: "/courses/hybrid-toning-gray-coverage/:path*",
				permanent: true,
			},
			{
				source: "/courses/schorem-barbers-clipper-fade/:path*",
				destination:
					"/courses/clipper-cutting-classics-executive-contour/:path*",
				permanent: true,
			},
			{
				source:
					"/learn/course/ashleenormanhair-balayage-vs-foilayage-how-to-master-both-techniques/what-is-balayage/part-1-of-2/completed/:path*",
				destination: "/courses/master-balayage-foilayage/:path*",
				permanent: true,
			},
			{
				source:
					"/learn/course/btc-live-smart-blonding-foil-placement-strategies-with-theblondechronicles/formulas/first-lesson/:path*",
				destination: "/courses/smart-blonding-techniques/:path*",
				permanent: true,
			},
			{
				source:
					"/learn/course/btc-live-dry-cutting-long-layers-with-philipwolffhair/dry-cutting-long-layers/part-1-of-2/:path*",
				destination: "/courses/dry-cutting-long-layers/:path*",
				permanent: true,
			},
			{
				source:
					"/learn/course/social-media-for-hairdresser/upcoming-episodes/part-3-of-3/course-completed/:path*",
				destination: "/courses/instagram-101-handles-bios-profile-pics/:path*",
				permanent: true,
			},
			{
				source: "/courses/amanukyan-your-financial-future/:path*",
				destination: "/courses/your-financial-future/:path*",
				permanent: true,
			},
			{
				source:
					"/learn/course/social-media-for-hairdresser/instagram-101-handles-bios-and-why-your-profile-pic-matters/first-lesson/:path*",
				destination: "/courses/instagram-101-handles-bios-profile-pics/:path*",
				permanent: true,
			},
			{
				source:
					"/learn/course/btc-live-smart-blonding-foil-placement-strategies-with-theblondechronicles/formulas/part-3-of-3/:path*",
				destination: "/courses/smart-blonding-techniques/:path*",
				permanent: true,
			},
			{
				source: "/learn/enroll/e5673b4a-8e33-47e0-9e2c-515e76f9a286/:path*",
				destination: "/courses/master-balayage-foilayage/:path*",
				permanent: true,
			},
			{
				source:
					"/courses/thelovelyhairclass-bridal-styling-how-to-create-multiple-looks-for-one-bride/:path*",
				destination: "/courses/multiple-looks-for-one-bride/:path*",
				permanent: true,
			},
			{
				source:
					"/learn/course/brianacisneros-the-bixie/the-bixie-cut/part-1-of-2/completed/:path*",
				destination: "/courses/the-bixie-cut/:path*",
				permanent: true,
			},
			{
				source:
					"/learn/course/btc-live-popethebarber-fade-taper-like-a-badass-in-under-90-minutes/btc-live/popethebarber-fade-taper-like-a-badass/:path*",
				destination: "/courses/fade-taper-techniques/:path*",
				permanent: true,
			},
			{
				source:
					"/courses/how-to-create-64-pieces-of-content-from-1-client/:path*",
				destination:
					"/courses/create-64-pieces-of-content-from-1-client/:path*",
				permanent: true,
			},
			{
				source:
					"/learn/course/90s-supermodel-blowout/90s-supermodel-blowout/90s-supermodel-blowout/:path*",
				destination: "/courses/90s-supermodel-blowout/:path*",
				permanent: true,
			},
			{
				source:
					"/courses/btc-live-dry-cutting-long-layers-with-philipwolffhair/:path*",
				destination: "/courses/dry-cutting-long-layers/:path*",
				permanent: true,
			},
			{
				source:
					"/learn/course/btc-live-smart-blonding-foil-placement-strategies-with-theblondechronicles/before-after/first-lesson/:path*",
				destination: "/courses/smart-blonding-techniques/:path*",
				permanent: true,
			},
			{
				source:
					"/courses/dredrehair-how-to-cut-style-extensions-like-a-celebrity-stylist/:path*",
				destination: "/courses/cut-style-extensions/:path*",
				permanent: true,
			},
			{
				source:
					"/learn/course/btc-live-smart-blonding-foil-placement-strategies-with-theblondechronicles/formulas/part-3-of-3/course-completed/:path*",
				destination: "/courses/smart-blonding-techniques/:path*",
				permanent: true,
			},
			{
				source: "/redeem/:path*",
				destination: "/free/:path*",
				permanent: true,
			},
			{
				source: "/learn/enroll/faf2a8d7-722a-476c-9019-7c292d3153bf/:path*",
				destination: "/courses/lowlights-content-creation/:path*",
				permanent: true,
			},
			{
				source:
					"/courses/watchmyhairbounce-corrective-blonding-for-any-texture/:path*",
				destination: "/courses/blonding-for-any-texture/:path*",
				permanent: true,
			},
			{
				source:
					"/courses/watchmyhairbounce-foil-placement-for-highly-textured-hair/:path*",
				destination: "/courses/foil-placement-for-texture/:path*",
				permanent: true,
			},
			{
				source:
					"/learn/course/foil-free-express-lowlights/foil-free-express-lowlights/foil-free-express-lowlights/course-completed/:path*",
				destination: "/courses/foil-free-express-lowlights/:path*",
				permanent: true,
			},
			{
				source: "/learn/course/danielmbeauty-high-contrast-foilayage/:path*",
				destination: "/courses/high-contrast-blonding/:path*",
				permanent: true,
			},
			{
				source:
					"/learn/course/reverse-balayage/reverse-balayage/reverse-balayage/course-completed/:path*",
				destination: "/courses/reverse-balayage/:path*",
				permanent: true,
			},
			{
				source:
					"/courses/btc-live-hybrid-blonding-shadow-root-techniques-with-kathynunezhair/:path*",
				destination: "/courses/blended-shadow-roots/:path*",
				permanent: true,
			},
			{
				source: "/courses/styled-by-carolynn-the-short-shag/:path*",
				destination: "/courses/the-short-shag-haircut/:path*",
				permanent: true,
			},
			{
				source:
					"/learn/course/watchmyhairbounce-foil-placement-for-highly-textured-hair/watchmyhairbounce-foil-placement-for-highly-textured-hair/watchmyhairbounce-foil-placement-for-highly-textured-hair/:path*",
				destination: "/courses/foil-placement-for-texture/:path*",
				permanent: true,
			},
			{
				source: "/collections/reuzel-schorem/:path*",
				destination: "/masterclasses/:path*",
				permanent: true,
			},
			{
				source: "/learn/enroll/a9ba3b6e-15e6-4d77-a632-f8b16768b560/:path*",
				destination: "/courses/the-french-bob/:path*",
				permanent: true,
			},
			{
				source: "/courses/btc-live-mattswinney-the-6-figure-haircut/:path*",
				destination: "/courses/the-6-figure-haircut/:path*",
				permanent: true,
			},
			{
				source:
					"/learn/course/the-butterfly-cut/before-after/part-2-of-2/course-completed/:path*",
				destination: "/courses/the-butterfly-haircut/:path*",
				permanent: true,
			},
			{
				source: "/learn/enroll/c68a397a-beb1-41e4-888d-310f2a182a9b/:path*",
				destination: "/courses/how-to-cut-style-a-bob/:path*",
				permanent: true,
			},
			{
				source: "/learn/enroll/374c8b44-7f85-448f-aa5a-fe246aa0010d/:path*",
				destination: "/courses/bright-blonde-in-20-foils/:path*",
				permanent: true,
			},
			{
				source:
					"/learn/course/low-maintenance-blonde-that-pops/low-maintenance-blonde-that-pops/low-maintenance-blonde-that-pops/:path*",
				destination: "/:path*",
				permanent: true,
			},
			{
				source:
					"/learn/course/btc-live-mattswinney-the-6-figure-haircut/mattswinney-the-6-figure-haircut/part-1-of-2/:path*",
				destination: "/courses/the-6-figure-haircut/:path*",
				permanent: true,
			},
			{
				source: "/courses/queenofthesouth512-braid-designing-101/:path*",
				destination: "/courses/braid-designing-101/:path*",
				permanent: true,
			},
			{
				source:
					"/learn/course/dredrehair-how-to-cut-style-extensions-like-a-celebrity-stylist/andreahenty-how-to-cut-style-extensions-like-a-celebrity-stylist/andreahenty-how-to-cut-style-extensions-like-a-celebrity-stylist/:path*",
				destination: "/courses/cut-style-extensions/:path*",
				permanent: true,
			},
			{
				source:
					"/learn/course/danielmbeauty-high-contrast-foilayage/danielmbeauty-high-contrast-foilyage/danielmbeauty-high-contrast-foilyage/completed/:path*",
				destination: "/courses/high-contrast-foilayage/:path*",
				permanent: true,
			},
			{
				source: "/learn/enroll/897e2a6d-97eb-4422-8e86-c2dea2a5b1c0/:path*",
				destination: "/courses/captions-hashtags-for-your-audience/:path*",
				permanent: true,
			},
			{
				source:
					"/learn/course/the-butterfly-cut/before-after/first-lesson/:path*",
				destination: "/courses/the-butterfly-haircut/:path*",
				permanent: true,
			},
			{
				source: "/courses/chadkenyon-creating-the-perfect-summer-copper/:path*",
				destination: "/courses/the-perfect-summer-copper/:path*",
				permanent: true,
			},
			{
				source:
					"/courses/colorbycarlos-root-shadow-toning-techniques-for-brunettes/:path*",
				destination: "/courses/toning-techniques-for-brunettes/:path*",
				permanent: true,
			},
			{
				source:
					"/courses/btc-live-textured-a-line-bob-by-styled-by-carolynn/:path*",
				destination: "/courses/textured-a-line-bob/:path*",
				permanent: true,
			},
			{
				source: "/courses/larisa-loves-top-instagram-tips/:path*",
				destination:
					"/courses/larisa-loves-top-instagram-tips-and-tricks/:path*",
				permanent: true,
			},
			{
				source: "/courses/blonde-balayage-blend-with-tape-in-extensions/:path*",
				destination: "/courses/balayage-blend-with-tape-in-extensions/:path*",
				permanent: true,
			},
			{
				source: "/courses/ai-social-media-workshop/:path*",
				destination: "/courses/the-btc-show-2023-day-1/:path*",
				permanent: true,
			},
			{
				source: "/learn/enroll/da00ea0f-f503-47d6-a5a4-bb3de7b09ce9/:path*",
				destination: "/courses/the-fade-technique/:path*",
				permanent: true,
			},
			{
				source: "/courses/linsonhair-dimensional-balayage-refresh/:path*",
				destination: "/courses/dimensional-balayage-3/:path*",
				permanent: true,
			},
			{
				source:
					"/courses/instagram-mistakes-to-avoid-what-to-do-instead/:path*",
				destination: "/courses/10-instagram-mistakes-how-to-fix-them/:path*",
				permanent: true,
			},
			{
				source: "/learn/enroll/4ec36636-4865-4f6e-8638-cdcafd268dba/:path*",
				destination: "/courses/build-your-clientele-with-instagram/:path*",
				permanent: true,
			},
			{
				source: "/learn/enroll/26facb42-f043-440c-956e-6e1c32decd02/:path*",
				destination: "/courses/bronde-highlights-lowlights/:path*",
				permanent: true,
			},
			{
				source:
					"/courses/free-live-class-curlfactor-perfecting-the-wash-go-for-curls/:path*",
				destination: "/courses/the-wash-go-for-curls/:path*",
				permanent: true,
			},
			{
				source: "/learn/enroll/f85c07b8-c3a7-4aed-a4e1-be6e7b43d5de/:path*",
				destination: "/courses/textured-pixie-haircut/:path*",
				permanent: true,
			},
			{
				source: "/courses/greg-gilmore-how-to-cut-style-a-curly-pixie/:path*",
				destination: "/courses/cutting-styling-a-curly-pixie/:path*",
				permanent: true,
			},
			{
				source:
					"/courses/haircolorkilla-the-versatile-textured-haircut-flat-twist-styling/:path*",
				destination: "/courses/the-versatile-textured-cut/:path*",
				permanent: true,
			},
			{
				source: "/courses/larisadoll-fast-base-color-application-tips/:path*",
				destination: "/courses/fast-base-color-application/:path*",
				permanent: true,
			},
			{
				source:
					"/courses/btc-live-platinum-blonding-with-rachelwstylist/:path*",
				destination: "/courses/platinum-blonding/:path*",
				permanent: true,
			},
			{
				source: "/learn/enroll/2b4430f0-3391-4c47-9921-ca4315f2d78f/:path*",
				destination: "/courses/honey-blonde-balayage/:path*",
				permanent: true,
			},
			{
				source: "/learn/enroll/ecf73a39-b06e-4017-802b-a73807349bf7/:path*",
				destination: "/courses/hybrid-extension-application/:path*",
				permanent: true,
			},
			{
				source:
					"/learn/course/styling-photographing-hair-for-social-media/:path*",
				destination:
					"/courses/styling-and-photographing-hair-for-social-media/:path*",
				permanent: true,
			},
			{
				source:
					"/courses/pearlthestylist-learn-to-create-jumbo-knotless-braids/:path*",
				destination: "/courses/jumbo-knotless-braids/:path*",
				permanent: true,
			},
			{
				source: "/learn/enroll/be668ac3-b2c9-4da0-b548-53f00ee64c5c/:path*",
				destination: "/courses/high-contrast-blonding/:path*",
				permanent: true,
			},
			// added jan 23
			{
				source:
					"/courses/courses/btc-live-smart-blonding-foil-placement-strategies-with-theblondechronicles/:path*",
				destination: "/courses/courses/smart-blonding-techniques/:path*",
				permanent: true,
			},
			{
				source: "/courses/marys-monday-motivation/:path*",
				destination: "/courses/22-years-of-business-lessons/:path*",
				permanent: true,
			},
			{
				source:
					"/courses/btc-live-modern-bridal-hair-hairandmakeupbysteph/:path*",
				destination: "/courses/3-quick-15-minute-updos-2/:path*",
				permanent: true,
			},
			{
				source:
					"/courses/kasia-fortuna-bridal-styling-4-looks-for-every-bride/:path*",
				destination: "/courses/4-bridal-styling-techniques/:path*",
				permanent: true,
			},
			{
				source:
					"/courses/sassoon-academys-diannedegnan-advanced-foiling-techniques/:path*",
				destination: "/courses/advanced-foiling-techniques/:path*",
				permanent: true,
			},
			{
				source:
					"/courses/btc-live-airlights-blonding-technique-with-danilobozic/:path*",
				destination: "/courses/air-lights-blonding/:path*",
				permanent: true,
			},
			{
				source:
					"/courses/btc-live-the-blonde-roadmap-babylights-balayage-toning-with-hairbychrissydanielle/:path*",
				destination: "/courses/babylights-balayage-toning/:path*",
				permanent: true,
			},
			{
				source:
					"/courses/jackhowardcolor-balayage-101-from-basics-to-advanced-episode-3-balayage-for-curls-texture/:path*",
				destination: "/courses/balayage-for-curls-texture/:path*",
				permanent: true,
			},
			{
				source: "/courses/barbering-4-cuts-for-every-client/:path*",
				destination: "/courses/barbering-4-hair-cuts-for-every-client/:path*",
				permanent: true,
			},
			{
				source:
					"/courses/btc-live-barbering-beards-mens-grooming-with-mattyconrad/:path*",
				destination: "/courses/barbering-beards/:path*",
				permanent: true,
			},
			{
				source:
					"/courses/btc-live-beach-blonde-dimension-with-hairbysarayah/:path*",
				destination: "/courses/beach-blonde-dimension/:path*",
				permanent: true,
			},
			{
				source: "/courses/blunt-textured-bob-with-bescene/:path*",
				destination: "/courses/blunt-textured-bob-haircut/:path*",
				permanent: true,
			},
			{
				source:
					"/courses/btc-live-samirasjewelry-half-upstyle-braiding-techniques/:path*",
				destination: "/courses/braiding-techniques/:path*",
				permanent: true,
			},
			{
				source: "/courses/btc-live-alexandralee1016-braids-simply-boho/:path*",
				destination: "/courses/braids-up-your-styling-game-2/:path*",
				permanent: true,
			},
			{
				source: "/courses/how-to-bright-blonde-in-20-foils/:path*",
				destination: "/courses/bright-blonde-in-20-foils/:path*",
				permanent: true,
			},
			{
				source:
					"/courses/xofarhanabalayage-brightening-brunettes-for-summer/:path*",
				destination: "/courses/brightening-brunettes/:path*",
				permanent: true,
			},
			{
				source:
					"/courses/coloredbycaitlin-bronde-highlights-lowlights-toning/:path*",
				destination: "/courses/bronde-highlights-lowlights/:path*",
				permanent: true,
			},
			{
				source:
					"/courses/andreahenty-how-to-build-your-business-with-extensions/:path*",
				destination: "/courses/build-your-business-with-extensions/:path*",
				permanent: true,
			},
			{
				source:
					"/courses/justinanderson-california-beachy-blonde-highlights/:path*",
				destination: "/courses/california-beachy-blonde/:path*",
				permanent: true,
			},
			{
				source:
					"/courses/how-to-curate-the-captions-and-hashtags-for-your-audience/:path*",
				destination: "/courses/captions-hashtags-for-your-audience/:path*",
				permanent: true,
			},
			{
				source: "/courses/reuzel-schorem-long-trim-pompador-copy/:path*",
				destination:
					"/courses/clipper-cutting-classics-faded-pompadour-2/:path*",
				permanent: true,
			},
			{
				source: "/courses/schorem-hard-part-pompadour/:path*",
				destination:
					"/courses/clipper-cutting-classics-hard-part-pompadour-2/:path*",
				permanent: true,
			},
			{
				source: "/courses/schorem-barbers-2/:path*",
				destination:
					"/courses/clipper-cutting-classics-junior-pompadour/:path*",
				permanent: true,
			},
			{
				source: "/courses/schorem-long-trim-pompador/:path*",
				destination:
					"/courses/clipper-cutting-classics-long-trim-pompadour-2/:path*",
				permanent: true,
			},
			{
				source: "/courses/schorem-low-fade-pomp/:path*",
				destination:
					"/courses/clipper-cutting-classics-low-fade-pompadour-2/:path*",
				permanent: true,
			},
			{
				source: "/courses/schorem-phyco-quiff/:path*",
				destination: "/courses/clipper-cutting-classics-psycho-quiff-2/:path*",
				permanent: true,
			},
			{
				source: "/courses/schorem-quiff/:path*",
				destination: "/courses/clipper-cutting-classics-quiff/:path*",
				permanent: true,
			},
			{
				source: "/courses/reuzel-schorem-scumbag-boogie/:path*",
				destination:
					"/courses/clipper-cutting-classics-scumbag-boogie-2/:path*",
				permanent: true,
			},
			{
				source: "/courses/reuzel-schorem-vanguard/:path*",
				destination: "/courses/clipper-cutting-classics-vanguard/:path*",
				permanent: true,
			},
			{
				source: "/courses/wesdoeshair-formulating-a-copper-root-melt/:path*",
				destination: "/courses/copper-root-melt/:path*",
				permanent: true,
			},
			{
				source:
					"/courses/free-live-class-curlfactor-complete-guide-to-curly-cut-consultations/:path*",
				destination: "/courses/curly-client-consultations/:path*",
				permanent: true,
			},
			{
				source:
					"/courses/btc-live-cutting-styling-a-soft-blunt-bob-with-chrisjones-hair/:path*",
				destination: "/courses/cut-style-a-soft-blunt-bob-2/:path*",
				permanent: true,
			},
			{
				source: "/courses/brianhickman1-cutting-shags-mullets/:path*",
				destination: "/courses/cutting-shags-mullets/:path*",
				permanent: true,
			},
			{
				source: "/courses/danilobozic-cutting-to-enhance-balayage/:path*",
				destination: "/courses/cutting-to-enhance-color/:path*",
				permanent: true,
			},
			{
				source:
					"/courses/btc-live-high-impact-dimensional-blondes-with-ryanweeden/:path*",
				destination: "/courses/dimensional-blondes/:path*",
				permanent: true,
			},
			{
				source:
					"/courses/btc-live-dimensional-reds-blondes-with-leahfreeman1/:path*",
				destination: "/courses/dimensional-reds-blondes/:path*",
				permanent: true,
			},
			{
				source: "/courses/btc-live-buddywporter-dry-cutting-la-waves/:path*",
				destination: "/courses/dry-cutting-la-waves-2/:path*",
				permanent: true,
			},
			{
				source:
					"/courses/donovanmillshair-dry-cutting-triangulated-layers/:path*",
				destination: "/courses/dry-cutting-techniques/:path*",
				permanent: true,
			},
			{
				source: "/courses/so-you-wanna-be-an-influencer/:path*",
				destination:
					"/courses/everything-you-need-to-become-an-influencer/:path*",
				permanent: true,
			},
			{
				source: "/courses/social-climbing/:path*",
				destination:
					"/courses/everything-you-need-to-know-to-grow-on-instagram/:path*",
				permanent: true,
			},
			{
				source:
					"/courses/jackhowardcolor-balayage-101-from-basics-to-advanced-episode-2-express-balayage/:path*",
				destination: "/courses/express-balayage-technique/:path*",
				permanent: true,
			},
			{
				source: "/courses/seangodard-express-chunky-highlights/:path*",
				destination: "/courses/express-chunky-highlights/:path*",
				permanent: true,
			},
			{
				source:
					"/courses/cassiskovic-perfecting-face-framing-foil-techniques/:path*",
				destination: "/courses/face-framing-foil-techniques/:path*",
				permanent: true,
			},
			{
				source: "/courses/rachelwstylist-face-framing-shag-haircut/:path*",
				destination: "/courses/face-framing-shag-haircut/:path*",
				permanent: true,
			},
			{
				source:
					"/courses/btc-live-california-foilayage-technique-with-jleighwebdoeshair/:path*",
				destination: "/courses/foilayage-techniques/:path*",
				permanent: true,
			},
			{
				source:
					"/courses/jhair-stylist-toning-how-to-formulate-the-perfect-pastel/:path*",
				destination: "/courses/formulate-the-perfect-pastel/:path*",
				permanent: true,
			},
			{
				source:
					"/courses/btc-live-glam-holiday-hair-styling-with-andrew-fitzsimons/:path*",
				destination: "/courses/glam-holiday-styling-2/:path*",
				permanent: true,
			},
			{
				source:
					"/courses/btc-live-hair-painting-tips-and-tricks-with-wesdoeshair/:path*",
				destination: "/courses/hair-painting-techniques/:path*",
				permanent: true,
			},
			{
				source: "/courses/mens-grooming-haircuts-beard-shaping/:path*",
				destination: "/courses/haircuts-beard-shaping/:path*",
				permanent: true,
			},
			{
				source:
					"/courses/natalieannehair-creating-hairstyles-for-instagram-how-to-photograph-them/:path*",
				destination: "/courses/hairstyles-for-instagram/:path*",
				permanent: true,
			},
			{
				source: "/courses/mickeycolonjr-hand-touch-balayage-toning/:path*",
				destination: "/courses/hand-touch-balayage/:path*",
				permanent: true,
			},
			{
				source:
					"/courses/hairbymickk-creating-high-contrast-blondes-that-pop/:path*",
				destination: "/courses/high-contrast-blondes/:path*",
				permanent: true,
			},
			{
				source: "/courses/danielmbeauty-high-contrast-foilayage/:path*",
				destination: "/courses/high-contrast-foilayage/:path*",
				permanent: true,
			},
			{
				source: "/courses/how-to-high-impact-balayage-treatment/:path*",
				destination: "/courses/high-impact-balayage/:path*",
				permanent: true,
			},
			{
				source:
					"/courses/btc-live-hairagami-new-foil-placement-blonding-technique-by-larisadoll/:path*",
				destination: "/courses/high-impact-blondes/:path*",
				permanent: true,
			},
			{
				source:
					"/courses/hairbystevie-express-high-impact-highlights-toning/:path*",
				destination: "/courses/high-impact-highlights/:path*",
				permanent: true,
			},
			{
				source:
					"/courses/btc-live-lo-wheelerdavis-high-speed-balayage-technique/:path*",
				destination: "/courses/high-speed-balayage-2/:path*",
				permanent: true,
			},
			{
				source:
					"/courses/haircolorkilla-highlighting-curly-textured-hair/:path*",
				destination: "/courses/highlighting-curly-hair/:path*",
				permanent: true,
			},
			{
				source:
					"/courses/omgartistry-how-to-book-blondes-techniques-business-tips-to-grow-your-clientele/:path*",
				destination: "/courses/how-to-book-blondes/:path*",
				permanent: true,
			},
			{
				source: "/courses/btc-live-brazilian-balayage/:path*",
				destination: "/courses/how-to-brazilian-balayage/:path*",
				permanent: true,
			},
			{
				source: "/courses/build-your-personal-brand-on-instagram/:path*",
				destination:
					"/courses/how-to-build-your-personal-brand-on-instagram/:path*",
				permanent: true,
			},
			{
				source:
					"/courses/chrisjoneshair-how-to-style-texturize-any-haircut/:path*",
				destination: "/courses/how-to-cut-style-a-bob/:path*",
				permanent: true,
			},
			{
				source: "/courses/jacobhkhan-short-shag-haircut/:path*",
				destination: "/courses/how-to-shaggy-bob-haircut/:path*",
				permanent: true,
			},
			{
				source: "/courses/btc-live-co-lab-how-to-texturize-style-a-bob/:path*",
				destination: "/courses/how-to-texturize-style-a-bob-haircut/:path*",
				permanent: true,
			},
			{
				source: "/courses/jill901-timeless-blondes/:path*",
				destination: "/courses/how-to-timeless-blondes/:path*",
				permanent: true,
			},
			{
				source:
					"/courses/free-live-class-emmaco-infinity-butterfly-braid/:path*",
				destination: "/courses/infinity-braid-styling-cheats/:path*",
				permanent: true,
			},
			{
				source:
					"/courses/get-a-grip-how-the-pandemic-inflation-supply-chain-will-change-business-as-you-know-it/:path*",
				destination: "/courses/inflation-supply-chain-what-to-know/:path*",
				permanent: true,
			},
			{
				source: "/courses/social-media-for-hairdresser/:path*",
				destination: "/courses/instagram-101-handles-bios-profile-pics/:path*",
				permanent: true,
			},
			{
				source:
					"/courses/instagram-videos-101-how-to-shoot-content-for-social-media/:path*",
				destination: "/courses/instagram-videos-101-basic-advanced/:path*",
				permanent: true,
			},
			{
				source:
					"/courses/ig-virgins-how-to-build-your-business-on-instagram/:path*",
				destination:
					"/courses/instagram-virgins-build-your-business-online/:path*",
				permanent: true,
			},
			{
				source:
					"/courses/amyerrett-and-marybehindthechair-madison-reed-founder-amy-errett-interviewed-by-btc-founder-mary-rector/:path*",
				destination: "/courses/interview-with-madison-reed-founder/:path*",
				permanent: true,
			},
			{
				source: "/courses/btc-live-business-making-it-against-the-odds/:path*",
				destination: "/courses/interview-with-virtue-labs-founder/",
				permanent: true,
			},
			{
				source: "/courses/live-instagram-page-reviews-with-mary-kevin/:path*",
				destination: "/courses/live-instagram-page-reviews-session-1/:path*",
				permanent: true,
			},
			{
				source: "/courses/express-lowlights-content-creation/:path*",
				destination: "/courses/lowlights-content-creation/:path*",
				permanent: true,
			},
			{
				source:
					"/courses/ashleenormanhair-balayage-vs-foilayage-how-to-master-both-techniques/:path*",
				destination: "/courses/master-balayage-foilayage/:path*",
				permanent: true,
			},
			{
				source:
					"/courses/btc-live-episode-midlights-foil-base-bump-technique/:path*",
				destination: "/courses/midlights-techniques/:path*",
				permanent: true,
			},
			{
				source:
					"/courses/btc-live-money-piece-balayage-with-mickeycolonjr/:path*",
				destination: "/courses/money-piece-balayage-2/:path*",
				permanent: true,
			},
			{
				source:
					"/courses/btc-live-money-piece-balayage-con-mickeycolonjr/:path*",
				destination: "/courses/money-piece-balayage-spanish/:path*",
				permanent: true,
			},
			{
				source:
					"/courses/larisadoll-formulating-multi-dimensional-reds-coppers/:path*",
				destination: "/courses/multi-dimensional-reds/:path*",
				permanent: true,
			},
			{
				source:
					"/courses/btc-live-no-toner-balayage-with-georgepapanikolas/:path*",
				destination: "/courses/no-toner-balayage-technique/:path*",
				permanent: true,
			},
			{
				source: "/courses/2019-oneshot-hair-awards-show-live/:path*",
				destination: "/courses/oneshot-hair-awards-2019/:path*",
				permanent: true,
			},
			{
				source:
					"/courses/salon-photography-optimize-your-space-for-photos/:path*",
				destination: "/courses/optimizing-your-salon-space-for-photos/:path*",
				permanent: true,
			},
			{
				source:
					"/courses/instagram-photography-101-how-to-take-better-hair-photos/:path*",
				destination: "/courses/photography-101-take-better-hair-photos/:path*",
				permanent: true,
			},
			{
				source:
					"/courses/rachelwstylist-layered-toning-transitioning-platinum-to-lived-in/:path*",
				destination: "/courses/platinum-to-lived-in/:path*",
				permanent: true,
			},
			{
				source: "/courses/nickarrojo-precision-razor-cutting/:path*",
				destination: "/courses/precision-razor-cutting/:path*",
				permanent: true,
			},
			{
				source:
					"/courses/btc-live-robert-cromeans-razor-cutting-techniques/:path*",
				destination: "/courses/razor-cutting-techniques/:path*",
				permanent: true,
			},
			{
				source:
					"/courses/shmeggsandbaconn-formulating-for-red-ginger-haircolor/:path*",
				destination: "/courses/red-ginger-haircolor/:path*",
				permanent: true,
			},
			{
				source: "/courses/maggiemh-adding-natural-depth-to-blondes/:path*",
				destination: "/courses/reverse-balayage-technique/:path*",
				permanent: true,
			},
			{
				source: "/courses/curlfactor-how-to-safely-lighten-curly-hair/:path*",
				destination: "/courses/safely-lighten-curly-hair/:path*",
				permanent: true,
			},
			{
				source:
					"/courses/salon-instagram-curate-staff-content-attract-clients-with-social-media/:path*",
				destination: "/courses/salon-instagram-attracting-more-clients/:path*",
				permanent: true,
			},
			{
				source:
					"/courses/btc-live-balayage-the-perfect-blend-with-camouflageandbalayage/:path*",
				destination: "/courses/seamless-balayage-blend-2/:path*",
				permanent: true,
			},
			{
				source:
					"/courses/btc-live-seamless-balayage-techniques-with-xofarhanabalayage/:path*",
				destination: "/courses/seamless-balayage-techniques/:path*",
				permanent: true,
			},
			{
				source:
					"/courses/btc-live-shadow-foilayage-money-piece-with-coloredbycaitlin/:path*",
				destination: "/courses/shadow-foilayage/:path*",
				permanent: true,
			},
			{
				source: "/courses/richardmannah-short-layered-haircut/:path*",
				destination: "/courses/short-layered-haircut/:path*",
				permanent: true,
			},
			{
				source:
					"/courses/btc-live-smart-blonding-foil-placement-strategies-with-theblondechronicles/:path*",
				destination: "/courses/smart-blonding-techniques/:path*",
				permanent: true,
			},
			{
				source:
					"/courses/michelleoconnorbeauty-davidlopezzz-smoothing-foundational-techniques-for-all-hair-types/:path*",
				destination: "/courses/smoothing-foundational-techniques/:path*",
				permanent: true,
			},
			{
				source: "/courses/styling-photographing-hair-for-social-media/:path*",
				destination:
					"/courses/styling-and-photographing-hair-for-social-media/:path*",
				permanent: true,
			},
			{
				source:
					"/courses/michelleoconnorbeauty-holiday-glam-styling-for-any-celebration/:path*",
				destination: "/courses/styling-for-any-celebration/:path*",
				permanent: true,
			},
			{
				source:
					"/courses/btc-live-sun-kissed-balayaged-with-chelseahaircutters/:path*",
				destination: "/courses/sun-kissed-balayage-2/:path*",
				permanent: true,
			},
			{
				source: "/courses/scissor-ensemble-tapered-mens-clipper-cut/:path*",
				destination: "/courses/tapered-mens-clipper-cut/:path*",
				permanent: true,
			},
			{
				source: "/courses/brianacisneros-the-bixie/:path*",
				destination: "/courses/the-bixie-cut/:path*",
				permanent: true,
			},
			{
				source: "/courses/ai-social-media-workshop/:path*",
				destination: "/courses/the-btc-show-2023-day-3/:path*",
				permanent: true,
			},
			{
				source: "/courses/the-butterfly-cut/:path*",
				destination: "/courses/the-butterfly-haircut/:path*",
				permanent: true,
			},
			{
				source: "/courses/the-fade/:path*",
				destination: "/courses/the-fade-technique/:path*",
				permanent: true,
			},
			{
				source:
					"/courses/jackhowardcolor-balayage-101-from-basics-to-advanced/:path*",
				destination: "/courses/the-four-gestures-of-balayage-2/:path*",
				permanent: true,
			},
			{
				source: "/courses/alishajaredhairartistry-the-modern-bride/:path*",
				destination: "/courses/the-modern-bride/:path*",
				permanent: true,
			},
			{
				source:
					"/courses/btc-live-how-to-achieve-the-perfect-ash-blonde/:path*",
				destination: "/courses/the-perfect-ash-blonde-2/:path*",
				permanent: true,
			},
			{
				source: "/courses/blow-dries-cushion-brush/:path*",
				destination: "/courses/toniguy-blow-dry-cushion-brush-2/:path*",
				permanent: true,
			},
			{
				source: "/courses/blow-dries-paddle-brush/:path*",
				destination: "/courses/toniguy-blow-dry-paddle-brush-2/:path*",
				permanent: true,
			},
			{
				source: "/courses/blow-dries-round-brush/:path*",
				destination: "/courses/toniguy-blow-dry-round-brush-2/:path*",
				permanent: true,
			},
			{
				source: "/courses/blow-dries-twist/:path*",
				destination: "/courses/toniguy-blow-dry-twist-2/:path*",
				permanent: true,
			},
			{
				source: "/courses/future-foundation-2-step-colour/:path*",
				destination:
					"/courses/toniguy-future-foundation-2-step-colour-2/:path*",
				permanent: true,
			},
			{
				source: "/courses/future-foundation-3-step-graduation/:path*",
				destination:
					"/courses/toniguy-future-foundation-3-step-graduation-2/:path*",
				permanent: true,
			},
			{
				source: "/courses/future-foundation-balayage/:path*",
				destination: "/courses/toniguy-future-foundation-balayage-2/:path*",
				permanent: true,
			},
			{
				source:
					"/courses/future-foundation-classic-full-head-highlights/:path*",
				destination:
					"/courses/toniguy-future-foundation-classic-full-head-highlights-2/:path*",
				permanent: true,
			},
			{
				source:
					"/courses/future-foundation-fundamental-full-head-highlights/:path*",
				destination:
					"/courses/toniguy-future-foundation-fundamental-full-head-highlights-2/:path*",
				permanent: true,
			},
			{
				source: "/courses/future-foundation-lumi-ombrage/:path*",
				destination: "/courses/toniguy-future-foundation-lumi-ombrage-2/:path*",
				permanent: true,
			},
			{
				source: "/courses/future-foundation-mid-band-application/:path*",
				destination:
					"/courses/toniguy-future-foundation-mid-band-application-2/:path*",
				permanent: true,
			},
			{
				source: "/courses/future-foundation-natural-inversion-cut/:path*",
				destination:
					"/courses/toniguy-future-foundation-natural-inversion-cut-2/:path*",
				permanent: true,
			},
			{
				source:
					"/courses/future-foundation-reverse-diagonal-full-head-highlights/:path*",
				destination:
					"/courses/toniguy-future-foundation-reverse-diagonal-full-head-highlights-2/:path*",
				permanent: true,
			},
			{
				source: "/courses/future-foundation-the-bevel-cut-toniguy/:path*",
				destination:
					"/courses/toniguy-future-foundation-the-bevel-cut-2/:path*",
				permanent: true,
			},
			{
				source: "/courses/future-foundation-the-classic-bob-cut/:path*",
				destination:
					"/courses/toniguy-future-foundation-the-classic-bob-cut-2/:path*",
				permanent: true,
			},
			{
				source: "/courses/future-foundation-the-graduated-bob-cut/:path*",
				destination:
					"/courses/toniguy-future-foundation-the-graduated-bob-cut-2/:path*",
				permanent: true,
			},
			{
				source: "/courses/future-foundation-the-round-layers-cut/:path*",
				destination:
					"/courses/toniguy-future-foundation-the-round-layers-cut-2/:path*",
				permanent: true,
			},
			{
				source: "/courses/future-foundation-ombre/:path*",
				destination: "/courses/toniguy-future-foundations-ombre-2/:path*",
				permanent: true,
			},
			{
				source: "/courses/future-foundation-pre-lightener-tone/:path*",
				destination:
					"/courses/toniguy-future-foundations-pre-lightener-tone-2/:path*",
				permanent: true,
			},
			{
				source: "/courses/future-foundation-square-graduation-cut/:path*",
				destination:
					"/courses/toniguy-future-foundations-square-graduation-cut-2/:path*",
				permanent: true,
			},
			{
				source: "/courses/future-foundation-surface-lights/:path*",
				destination:
					"/courses/toniguy-future-foundations-surface-lights-2/:path*",
				permanent: true,
			},
			{
				source: "/courses/future-foundation-the-classic-graduation-cut/:path*",
				destination:
					"/courses/toniguy-future-foundations-the-classic-graduation-cut-2/:path*",
				permanent: true,
			},
			{
				source: "/courses/future-foundation-the-forward-graduation-cut/:path*",
				destination:
					"/courses/toniguy-future-foundations-the-forward-graduation-cut-2/:path*",
				permanent: true,
			},
			{
				source: "/courses/future-foundation-the-one-length-cut/:path*",
				destination:
					"/courses/toniguy-future-foundations-the-one-length-cut-2/:path*",
				permanent: true,
			},
			{
				source: "/courses/future-foundation-the-square-layers-cut/:path*",
				destination:
					"/courses/toniguy-future-foundations-the-square-layers-cut-2/:path*",
				permanent: true,
			},
			{
				source: "/courses/future-foundation-the-textured-crop/:path*",
				destination:
					"/courses/toniguy-future-foundations-the-textured-crop-2/:path*",
				permanent: true,
			},
			{
				source: "/courses/future-foundation-the-transient-cut/:path*",
				destination:
					"/courses/toniguy-future-foundations-the-transient-cut-2/:path*",
				permanent: true,
			},
			{
				source:
					"/courses/future-foundation-the-transient-graduation-cut/:path*",
				destination:
					"/courses/toniguy-future-foundations-the-transient-graduation-cut-2/:path*",
				permanent: true,
			},
			{
				source: "/courses/future-foundation-the-transient-length-cut/:path*",
				destination:
					"/courses/toniguy-future-foundations-the-transient-length-cut-2/:path*",
				permanent: true,
			},
			{
				source: "/courses/future-foundation-the-undercut/:path*",
				destination:
					"/courses/toniguy-future-foundations-the-undercut-2/:path*",
				permanent: true,
			},
			{
				source: "/courses/future-foundation-the-vertical-graduation-cut/:path*",
				destination:
					"/courses/toniguy-future-foundations-the-vertical-graduation-cut-2/:path*",
				permanent: true,
			},
			{
				source: "/courses/future-foundation-tint-regrowth-application/:path*",
				destination:
					"/courses/toniguy-future-foundations-tint-regrowth-application-2/:path*",
				permanent: true,
			},
			{
				source: "/courses/future-foundation-veil-colour/:path*",
				destination: "/courses/toniguy-future-foundations-veil-colour-2/:path*",
				permanent: true,
			},
			{
				source: "/courses/lexicon-i-pop-colour-1/:path*",
				destination: "/courses/toniguy-lexicon-i-pop-colour-2/:path*",
				permanent: true,
			},
			{
				source: "/courses/lexicon-i-pop-cut/:path*",
				destination: "/courses/toniguy-lexicon-i-pop-cut-2/:path*",
				permanent: true,
			},
			{
				source: "/courses/lexicon-the-atomic-colour/:path*",
				destination: "/courses/toniguy-lexicon-the-atomic-colour-2/:path*",
				permanent: true,
			},
			{
				source: "/courses/lexicon-the-atomic-cut/:path*",
				destination: "/courses/toniguy-lexicon-the-atomic-cut-2/:path*",
				permanent: true,
			},
			{
				source: "/courses/lexicon-the-clash-colour/:path*",
				destination: "/courses/toniguy-lexicon-the-clash-colour-2/:path*",
				permanent: true,
			},
			{
				source: "/courses/lexicon-the-clash-cut/:path*",
				destination: "/courses/toniguy-lexicon-the-clash-cut-2/:path*",
				permanent: true,
			},
			{
				source: "/courses/lexicon-the-contour-colour/:path*",
				destination: "/courses/toniguy-lexicon-the-contour-colour-2/:path*",
				permanent: true,
			},
			{
				source: "/courses/lexicon-the-contour-cut/:path*",
				destination: "/courses/toniguy-lexicon-the-contour-cut-2/:path*",
				permanent: true,
			},
			{
				source: "/courses/lexicon-the-edie-colour/:path*",
				destination: "/courses/toniguy-lexicon-the-edie-colour-2/:path*",
				permanent: true,
			},
			{
				source: "/courses/lexicon-the-edie-cut/:path*",
				destination: "/courses/toniguy-lexicon-the-edie-cut-2/:path*",
				permanent: true,
			},
			{
				source: "/courses/lexicon-the-korbin-colour-1/:path*",
				destination: "/courses/toniguy-lexicon-the-korbin-colour-2/:path*",
				permanent: true,
			},
			{
				source: "/courses/lexicon-the-korbin-cut/:path*",
				destination: "/courses/toniguy-lexicon-the-korbin-cut-2/:path*",
				permanent: true,
			},
			{
				source: "/courses/lexicon-the-ldn-cut-men/:path*",
				destination: "/courses/toniguy-lexicon-the-ldn-cut-men-2/:path*",
				permanent: true,
			},
			{
				source: "/courses/lexicon-the-linea-colour/:path*",
				destination: "/courses/toniguy-lexicon-the-linea-colour-2/:path*",
				permanent: true,
			},
			{
				source: "/courses/lexicon-the-linea-cut/:path*",
				destination: "/courses/toniguy-lexicon-the-linea-cut-2/:path*",
				permanent: true,
			},
			{
				source: "/courses/lexicon-the-roxy-colour-1/:path*",
				destination: "/courses/toniguy-lexicon-the-roxy-colour-2/:path*",
				permanent: true,
			},
			{
				source: "/courses/lexicon-the-roxy-cut/:path*",
				destination: "/courses/toniguy-lexicon-the-roxy-cut-2/:path*",
				permanent: true,
			},
			{
				source: "/courses/lexicon-the-tetra-cut-men/:path*",
				destination: "/courses/toniguy-lexicon-the-tetra-cut-men-2/:path*",
				permanent: true,
			},
			{
				source: "/courses/socialized-the-bailey-colour/:path*",
				destination: "/courses/toniguy-socialized-the-bailey-colour-2/:path*",
				permanent: true,
			},
			{
				source: "/courses/socialized-the-bailey-cut/:path*",
				destination: "/courses/toniguy-socialized-the-bailey-cut-2/:path*",
				permanent: true,
			},
			{
				source: "/courses/socialized-the-bohemia-colour/:path*",
				destination: "/courses/toniguy-socialized-the-bohemia-colour-2/:path*",
				permanent: true,
			},
			{
				source: "/courses/socialized-the-bohemia-cut/:path*",
				destination: "/courses/toniguy-socialized-the-bohemia-cut-2/:path*",
				permanent: true,
			},
			{
				source: "/courses/socialized-the-bronte-cut/:path*",
				destination: "/courses/toniguy-socialized-the-bronte-cut-2/:path*",
				permanent: true,
			},
			{
				source: "/courses/socialized-the-ikon-colour/:path*",
				destination: "/courses/toniguy-socialized-the-ikon-colour-2/:path*",
				permanent: true,
			},
			{
				source: "/courses/socialized-the-ikon-cut/:path*",
				destination: "/courses/toniguy-socialized-the-ikon-cut-2/:path*",
				permanent: true,
			},
			{
				source: "/courses/socialized-the-instalux-colour/:path*",
				destination: "/courses/toniguy-socialized-the-instalux-colour-2/:path*",
				permanent: true,
			},
			{
				source: "/courses/socialized-the-instalux-cut/:path*",
				destination: "/courses/toniguy-socialized-the-instalux-cut-2/:path*",
				permanent: true,
			},
			{
				source: "/courses/socialized-the-kidult-cut-men/:path*",
				destination: "/courses/toniguy-socialized-the-kidult-cut-men-2/:path*",
				permanent: true,
			},
			{
				source: "/courses/socialized-the-kroma-colour/:path*",
				destination: "/courses/toniguy-socialized-the-kroma-colour-2/:path*",
				permanent: true,
			},
			{
				source: "/courses/socialized-the-kroma-cut/:path*",
				destination: "/courses/toniguy-socialized-the-kroma-cut-2/:path*",
				permanent: true,
			},
			{
				source: "/courses/socialized-the-pearl-colour/:path*",
				destination: "/courses/toniguy-socialized-the-pearl-colour-2/:path*",
				permanent: true,
			},
			{
				source: "/courses/socialized-the-pearl-cut/:path*",
				destination: "/courses/toniguy-socialized-the-pearl-cut-2/:path*",
				permanent: true,
			},
			{
				source: "/courses/socialized-the-sonic-boom-cut-men/:path*",
				destination:
					"/courses/toniguy-socialized-the-sonic-boom-cut-men-2/:path*",
				permanent: true,
			},
			{
				source: "/courses/socialized-the-soraya-colour/:path*",
				destination: "/courses/toniguy-socialized-the-soraya-colour-2/:path*",
				permanent: true,
			},
			{
				source: "/courses/socialized-the-soraya-cut/:path*",
				destination: "/courses/toniguy-socialized-the-soraya-cut-2/:path*",
				permanent: true,
			},
			{
				source: "/courses/jessicascotthair-weave-tease-foil-technique/:path*",
				destination: "/courses/weave-tease-foiling/:path*",
				permanent: true,
			},
			{
				source:
					"/courses/btc-live-wig-coloring-techniques-with-kimberlytayhair/:path*",
				destination: "/courses/wig-coloring-techniques/:path*",
				permanent: true,
			},
			{
				source:
					"/courses/salon-owners-your-complete-guide-to-running-a-salon-instagram/:path*",
				destination:
					"/courses/your-complete-guide-to-running-a-salon-instagram/:path*",
				permanent: true,
			},
			{
				source:
					"/courses/your-most-asked-social-media-questions-haleys-answers/:path*",
				destination: "/courses/your-most-asked-social-media-questions/:path*",
				permanent: true,
			},

			//Nabeel Redirection Links:

			//mihai: below is tricky due to the format of the url, TO DO eventually
			{
				source: "/_next/static/media/bd427f25ac24d036-s.p.woff2",
				destination: "/subscribe",
				permanent: true,
			},
			// below removed by Mihai, can cause issues
			// {
			//   source: "/$/:path*",
			//   destination: "/subscribe/:path*",
			//   permanent: true,
			// },
			{
				source: "/bundles/btc-class-pass-monthly-subscription/:path*",
				destination: "/subscribe/:path*",
				permanent: true,
			},
			// below removed by Mihai, duplicate root
			{
				source: "/bundles/overall-best-selling-education/1000/:path*",
				destination: "/subscribe",
				permanent: true,
			},
			{
				source:
					// "/c/-9IPPKmGQhaIvHHqgQtmBQ\\?trk=public_profile_certification-title/:path*",
					// changed by mihai as escape was not working right
					"/c/-9IPPKmGQhaIvHHqgQtmBQ/:path*",
				// destination: "/profile/:path*",
				destination: "/profile",
				permanent: true,
			},
			{
				source: "/c/6xRvgnVrRE6ICQaNGK-J_A/:path*",
				// destination: "/subscribe/:path*",
				destination: "/subscribe",
				permanent: true,
			},
			{
				source:
					// "/c/6xRvgnVrRE6ICQaNGK-J_A\\?trk=public_profile_certification-title/:path*",
					"/c/6xRvgnVrRE6ICQaNGK-J_A/:path*",
				// destination: "/profile/:path*",
				destination: "/profile",
				permanent: true,
			},
			{
				source: "/c/dNUxvGR2TYqVFe2YclL4Ag/:path*",
				// destination: "/subscribe/:path*",
				destination: "/subscribe",
				permanent: true,
			},
			{
				source: "/c/GE-Yq45BTEC0fe9rRy5HVg/:path*",
				// destination: "/subscribe/:path*",
				destination: "/subscribe",
				permanent: true,
			},
			{
				source: "/c/ipwnKT0jQ9S_DEVzWf-z7w/:path*",
				// destination: "/subscribe/:path*",
				destination: "/subscribe",
				permanent: true,
			},
			{
				source: "/c/kNlohhQBTqiBwo2YZpBAxA/:path*",
				// destination: "/subscribe/:path*",
				destination: "/subscribe",
				permanent: true,
			},
			{
				source: "/c/nM4Fxeu2TmWUdE-sEWyGlA/:path*",
				// destination: "/subscribe/:path*",
				destination: "/subscribe",
				permanent: true,
			},
			{
				source: "/c/OEPI87agRne5yylU20IPMA/:path*",
				// destination: "/subscribe/:path*",
				destination: "/subscribe",
				permanent: true,
			},
			{
				source: "/c/ryxpdPVLQyKTQD_BKVp3NA/:path*",
				// destination: "/subscribe/:path*",
				destination: "/subscribe",
				permanent: true,
			},
			{
				source: "/c/VVvQpa3CR_GGjA_MgwnMKQ/:path*",
				// destination: "/subscribe/:path*",
				destination: "/subscribe",
				permanent: true,
			},
			{
				source: "/collections/3-finger-wave-techniques/:path*",
				destination: "/masterclasses/:path*",
				permanent: true,
			},
			{
				source: "/collections/prettylittleombre-4-video-balayage-series/:path*",
				destination: "/masterclasses/:path*",
				permanent: true,
			},
			{
				source:
					"/collections/toniguy-future-foundations-classic-colouring/:path*",
				destination:
					"/collections/toniguy-future-foundation-classic-colour-collection",
				permanent: true,
			},
			// mihai: below conflicted with above
			// {
			//   source:
			//     "/collections/toniguy-future-foundations-classic-colouring/1000/:path*",
			//   destination:
			//     "/collections/toniguy-future-foundation-classic-colour-collection/:path*",
			//   permanent: true,
			// },
			{
				source:
					"/collections/toniguy-future-foundations-classic-cutting/:path*",
				destination: "/masterclasses",
				permanent: true,
			},
			// mihai: below conflicted with above
			// {
			//   source:
			//     "/collections/toniguy-future-foundations-classic-cutting/1000/:path*",
			//   destination:
			//     "/collections/toniguy-future-foundations-classic-cutting-collection/:path*",
			//   permanent: true,
			// },
			{
				source: "/course/22-years-of-business-lessons/:path*",
				destination: "/courses/22-years-of-business-lessons/:path*",
				permanent: true,
			},
			{
				source: "/course/3-bridal-styling-techniques/:path*",
				destination: "/courses/3-bridal-styling-techniques/:path*",
				permanent: true,
			},
			{
				source: "/course/3-quick-15-minute-updos-2/:path*",
				destination: "/courses/3-quick-15-minute-updos-2/:path*",
				permanent: true,
			},
			{
				source: "/course/90s-supermodel-blowout/:path*",
				destination: "/courses/90s-supermodel-blowout/:path*",
				permanent: true,
			},
			{
				source: "/course/90s-supermodel-layers/:path*",
				destination: "/courses/90s-supermodel-blowout/:path*",
				permanent: true,
			},
			{
				source: "/course/barbering-4-hair-cuts-for-every-client/:path*",
				destination: "/courses/barbering-4-hair-cuts-for-every-client/:path*",
				permanent: true,
			},
			{
				source: "/course/braiding-techniques/:path*",
				destination: "/courses/braiding-techniques/:path*",
				permanent: true,
			},
			{
				source: "/course/braids-up-your-styling-game-2/:path*",
				destination: "/courses/braids-up-your-styling-game-2/:path*",
				permanent: true,
			},
			{
				source: "/course/brightening-brunettes/:path*",
				destination: "/courses/brightening-brunettes/:path*",
				permanent: true,
			},
			{
				source: "/course/california-beachy-blonde/:path*",
				destination: "/courses/california-beachy-blonde/:path*",
				permanent: true,
			},
			{
				source: "/course/captions-hashtags-for-your-audience/:path*",
				destination: "/courses/captions-hashtags-for-your-audience/:path*",
				permanent: true,
			},
			{
				source: "/course/celeb-interview-justin-anderson/:path*",
				destination: "/courses/celeb-interview-justin-anderson/:path*",
				permanent: true,
			},
			{
				source:
					"/course/celebrity-interview-frederic-aspiras-with-marybehindthechair/:path*",
				destination:
					"/courses/celebrity-interview-frederic-aspiras-with-marybehindthechair/:path*",
				permanent: true,
			},
			{
				source: "/course/chris-appletons-iconic-celebrity-styles/:path*",
				destination: "/courses/chris-appletons-iconic-celebrity-styles/:path*",
				permanent: true,
			},
			{
				source: "/course/contour-layering/:path*",
				destination: "/courses/contour-layering/:path*",
				permanent: true,
			},
			{
				source: "/course/create-64-pieces-of-content-from-1-client/:path*",
				destination:
					"/courses/create-64-pieces-of-content-from-1-client/:path*",
				permanent: true,
			},
			{
				source: "/course/curly-client-consultations/:path*",
				destination: "/courses/curly-client-consultations/:path*",
				permanent: true,
			},
			{
				source: "/course/curly-cutting-techniques/:path*",
				destination: "/courses/curly-cutting-techniques/:path*",
				permanent: true,
			},
			{
				source: "/course/cut-style-extensions/:path*",
				destination: "/courses/cut-style-extensions/:path*",
				permanent: true,
			},
			{
				source: "/course/cutting-styling-a-curly-pixie/:path*",
				destination: "/courses/cutting-styling-a-curly-pixie/:path*",
				permanent: true,
			},
			{
				source: "/course/cutting-styling-techniques/:path*",
				destination: "/courses/cutting-styling-techniques/:path*",
				permanent: true,
			},
			{
				source: "/course/dimensional-balayage/:path*",
				destination: "/courses/dimensional-balayage-3/:path*",
				permanent: true,
			},
			{
				source: "/course/dimensional-warm-bronze/:path*",
				destination: "/courses/dimensional-warm-bronze/:path*",
				permanent: true,
			},
			{
				source: "/course/dry-cutting-la-waves-2/:path*",
				destination: "/courses/dry-cutting-la-waves-2/:path*",
				permanent: true,
			},
			{
				source:
					"/course/everything-you-need-to-know-to-grow-on-instagram/:path*",
				destination:
					"/courses/everything-you-need-to-know-to-grow-on-instagram/:path*",
				permanent: true,
			},
			{
				source: "/course/expensive-brunette/:path*",
				destination: "/courses/expensive-brunette/:path*",
				permanent: true,
			},
			{
				source: "/course/face-framing-shag-haircut/:path*",
				destination: "/courses/face-framing-shag-haircut/:path*",
				permanent: true,
			},
			{
				source: "/course/fade-taper-techniques/:path*",
				destination: "/courses/fade-taper-techniques/:path*",
				permanent: true,
			},
			{
				source: "/course/fine-haired-mens-cutting/:path*",
				destination: "/courses/fine-haired-mens-cutting/:path*",
				permanent: true,
			},
			{
				source: "/course/foil-free-express-lowlights/:path*",
				destination: "/courses/foil-free-express-lowlights/:path*",
				permanent: true,
			},
			{
				source: "/course/glam-holiday-styling-2/:path*",
				destination: "/courses/glam-holiday-styling-2/:path*",
				permanent: true,
			},
			{
				source: "/course/hairstyles-for-instagram/:path*",
				destination: "/courses/hairstyles-for-instagram/:path*",
				permanent: true,
			},
			{
				source: "/course/high-contrast-foilayage/:path*",
				destination: "/courses/high-contrast-foilayage/:path*",
				permanent: true,
			},
			{
				source: "/course/high-impact-highlights/:path*",
				destination: "/courses/high-impact-highlights/:path*",
				permanent: true,
			},
			{
				source: "/course/highlighting-curly-hair/:path*",
				destination: "/courses/highlighting-curly-hair/:path*",
				permanent: true,
			},
			{
				source: "/course/honey-blonde-balayage/:path*",
				destination: "/courses/honey-blonde-balayage/:path*",
				permanent: true,
			},
			{
				source: "/course/how-to-brazilian-balayage/:path*",
				destination: "/courses/how-to-brazilian-balayage/:path*",
				permanent: true,
			},
			{
				source: "/course/how-to-cut-style-a-bob/:path*",
				destination: "/courses/how-to-cut-style-a-bob/:path*",
				permanent: true,
			},
			{
				source: "/course/how-to-timeless-blondes/:path*",
				destination: "/courses/how-to-timeless-blondes/:path*",
				permanent: true,
			},
			{
				source: "/course/instagram-101-handles-bios-profile-pics/:path*",
				destination: "/courses/instagram-101-handles-bios-profile-pics/:path*",
				permanent: true,
			},
			{
				source: "/course/instagram-virgins-build-your-business-online/:path*",
				destination:
					"/courses/instagram-virgins-build-your-business-online/:path*",
				permanent: true,
			},
			{
				source: "/course/interview-with-madison-reed-founder/:path*",
				destination: "/courses/interview-with-madison-reed-founder/:path*",
				permanent: true,
			},
			{
				source: "/course/live-instagram-page-reviews-session-1/:path*",
				destination: "/courses/live-instagram-page-reviews-session-1/:path*",
				permanent: true,
			},
			{
				source: "/course/low-slow-lightening/:path*",
				destination: "/courses/low-slow-lightening/:path*",
				permanent: true,
			},
			{
				source: "/course/lowlights-content-creation/:path*",
				destination: "/courses/lowlights-content-creation/:path*",
				permanent: true,
			},
			{
				source: "/course/mid-length-layered-lob/:path*",
				destination: "/courses/mid-length-layered-lob/:path*",
				permanent: true,
			},
			{
				source: "/course/midlength-textured-cut/:path*",
				destination: "/courses/midlength-textured-cut/:path*",
				permanent: true,
			},
			{
				source: "/course/midlights-techniques/:path*",
				destination: "/courses/midlights-techniques/:path*",
				permanent: true,
			},
			{
				source: "/course/money-piece-balayage-spanish/:path*",
				destination: "/courses/money-piece-balayage-spanish/:path*",
				permanent: true,
			},
			{
				source: "/course/multiple-looks-for-one-bride/:path*",
				destination: "/courses/multiple-looks-for-one-bride/:path*",
				permanent: true,
			},
			{
				source: "/course/old-money-blonde/:path*",
				destination: "/courses/old-money-blonde/:path*",
				permanent: true,
			},
			{
				source: "/course/oneshot-hair-awards-2017/:path*",
				destination: "/educator/oneshot-hair-awards/:path*",
				permanent: true,
			},
			{
				source: "/course/oneshot-hair-awards-2018/:path*",
				destination: "/educator/oneshot-hair-awards/:path*",
				permanent: true,
			},
			{
				source: "/course/platinum-retouch-application/:path*",
				destination: "/courses/platinum-retouch-application/:path*",
				permanent: true,
			},
			{
				source: "/course/razor-cutting-techniques/:path*",
				destination: "/courses/razor-cutting-techniques/:path*",
				permanent: true,
			},
			{
				source: "/course/red-ginger-haircolor/:path*",
				destination: "/courses/red-ginger-haircolor/:path*",
				permanent: true,
			},
			{
				source: "/course/reverse-balayage/:path*",
				destination: "/courses/reverse-balayage/:path*",
				permanent: true,
			},
			{
				source: "/course/rooted-icy-blonde-balayage/:path*",
				destination: "/courses/rooted-icy-blonde-balayage/:path*",
				permanent: true,
			},
			{
				source: "/course/safely-lighten-curly-hair/:path*",
				destination: "/courses/safely-lighten-curly-hair/:path*",
				permanent: true,
			},
			{
				source: "/course/shadow-foilayage/:path*",
				destination: "/courses/shadow-foilayage/:path*",
				permanent: true,
			},
			{
				source: "/course/smart-blonding-techniques/:path*",
				destination: "/courses/smart-blonding-techniques/:path*",
				permanent: true,
			},
			{
				source: "/course/textured-a-line-bob/:path*",
				destination: "/courses/textured-a-line-bob/:path*",
				permanent: true,
			},
			{
				source: "/course/textured-pixie-haircut/:path*",
				destination: "/courses/textured-pixie-haircut/:path*",
				permanent: true,
			},
			{
				source: "/course/the-bixie-cut/:path*",
				destination: "/courses/the-bixie-cut/:path*",
				permanent: true,
			},
			{
				source: "/course/the-btc-show-2023-day-3/:path*",
				destination: "/courses/the-btc-show-2023-day-3/:path*",
				permanent: true,
			},
			{
				source: "/course/the-butterfly-haircut/:path*",
				destination: "/courses/the-butterfly-haircut/:path*",
				permanent: true,
			},
			{
				source: "/course/the-french-bob/:path*",
				destination: "/courses/the-french-bob/:path*",
				permanent: true,
			},
			{
				source: "/course/the-modern-bride/:path*",
				destination: "/courses/the-modern-bride/:path*",
				permanent: true,
			},
			{
				source: "/course/the-perfect-ash-blonde-2/:path*",
				destination: "/courses/the-perfect-ash-blonde-2/:path*",
				permanent: true,
			},
			{
				source: "/course/the-silk-press-technique/:path*",
				destination: "/courses/the-silk-press-technique/:path*",
				permanent: true,
			},
			{
				source: "/course/the-wash-go-for-curls/:path*",
				destination: "/courses/the-wash-go-for-curls/:path*",
				permanent: true,
			},
			{
				source: "/course/toniguy-future-foundation-balayage-2/:path*",
				destination: "/courses/toniguy-future-foundation-balayage-2/:path*",
				permanent: true,
			},
			{
				source: "/course/toniguy-future-foundation-lumi-ombrage-2/:path*",
				destination: "/courses/toniguy-future-foundation-lumi-ombrage-2/:path*",
				permanent: true,
			},
			{
				source:
					"/course/toniguy-future-foundation-mid-band-application-2/:path*",
				destination:
					"/courses/toniguy-future-foundation-mid-band-application-2/:path*",
				permanent: true,
			},
			{
				source:
					"/course/toniguy-future-foundation-reverse-diagonal-full-head-highlights-2/:path*",
				destination:
					"/courses/toniguy-future-foundation-reverse-diagonal-full-head-highlights-2/:path*",
				permanent: true,
			},
			{
				source: "/course/toniguy-lexicon-the-contour-colour-2/:path*",
				destination: "/courses/toniguy-lexicon-the-contour-colour-2/:path*",
				permanent: true,
			},
			{
				source: "/course/toniguy-lexicon-the-korbin-cut-2/:path*",
				destination: "/courses/toniguy-lexicon-the-korbin-cut-2/:path*",
				permanent: true,
			},
			{
				source: "/course/weave-tease-foiling/:path*",
				destination: "/courses/weave-tease-foiling/:path*",
				permanent: true,
			},
			{
				source:
					"/course/your-complete-guide-to-running-a-salon-instagram/:path*",
				destination:
					"/courses/your-complete-guide-to-running-a-salon-instagram/:path*",
				permanent: true,
			},
			{
				source: "/coursebundle/best-selling-cutting-collection/:path*",
				destination: "/collections/best-selling-cutting-collection/:path*",
				permanent: true,
			},
			{
				source:
					"/coursebundle/schorem-clipper-cutting-classics-collection/:path*",
				destination:
					"/collections/schorem-clipper-cutting-classics-collection/:path*",
				permanent: true,
			},
			{
				source: "/coursebundle/social-climbing/:path*",
				destination: "/collections/social-climbing/:path*",
				permanent: true,
			},
			{
				source: "/coursebundle/social-media-for-hairdressers/:path*",
				destination: "/collections/social-media-for-hairdressers/:path*",
				permanent: true,
			},
			{
				source:
					"/coursebundle/toniguy-future-foundations-classic-cutting-collection/:path*",
				destination:
					"/collections/toniguy-future-foundations-classic-cutting-collection/:path*",
				permanent: true,
			},
			{
				source: "/coursebundle/top-haircutting-trends-of-2023-2/:path*",
				destination: "/collections/top-haircutting-trends-of-2023-2/:path*",
				permanent: true,
			},
			{
				source:
					"/courses/alexandralee1016-upstyling-tricks-for-braids-chignons/:path*",
				destination: "/:path*",
				permanent: true,
			},
			{
				source:
					"/courses/american-crew-brand-presentation-the-btc-show-online-2020/:path*",
				destination: "/:path*",
				permanent: true,
			},
			{
				source:
					"/courses/anh-co-tran-lived-in-hair-transformation-lob-with-extensions/:path*",
				destination: "/:path*",
				permanent: true,
			},
			{
				source: "/courses/annette-updo-artist-low-boho-chignon/:path*",
				destination: "/:path*",
				permanent: true,
			},
			{
				source:
					"/courses/balayage-foil-highlight-technique-with-iamginabianca/:path*",
				destination: "/:path*",
				permanent: true,
			},
			{
				source: "/courses/balayage-techniques-with-paintedhair/:path*",
				destination: "/:path*",
				permanent: true,
			},
			{
				source: "/courses/blonding-color-techniques-for-every-hair-type/:path*",
				destination: "/:path*",
				permanent: true,
			},
			{
				source: "/courses/blondme-certification-1/:path*",
				destination: "/:path*",
				permanent: true,
			},
			{
				source:
					"/courses/bridal-fishtail-braid-by-stephanie-brinkerhoff/:path*",
				destination: "/:path*",
				permanent: true,
			},
			{
				source: "/courses/bronde-balayage/:path*",
				destination: "/:path*",
				permanent: true,
			},
			{
				source:
					"/courses/btc-live-internal-diamond-balayage-with-kristenlumiere/:path*",
				destination: "/:path*",
				permanent: true,
			},
			{
				source: "/courses/btc-live-one-night-stand/:path*",
				destination: "/:path*",
				permanent: true,
			},
			{
				source: "/courses/btc-live-photographing-hair-for-instagram/:path*",
				destination: "/:path*",
				permanent: true,
			},
			{
				source:
					"/courses/btc-live-replay-creating-the-perfect-money-piece/:path*",
				destination: "/:path*",
				permanent: true,
			},
			{
				source: "/courses/btc-live-strandlights-technique-with-lizhaven/:path*",
				destination: "/:path*",
				permanent: true,
			},
			{
				source:
					"/courses/btc-live-the-lived-in-lob-learn-it-from-the-master-anhcotran/:path*",
				destination: "/:path*",
				permanent: true,
			},
			{
				source:
					"/courses/btc-live-watch-the-btc-show-2018-live-from-san-antonio/:path*",
				destination: "/:path*",
				permanent: true,
			},
			// mihai: this course no longer exists, redirected to events
			{
				source: "/courses/btc-on-tour-dallas/:path*",
				// destination: "/courses/btc-on-tour-dallas-2023/:path*",
				destination: "/events/:path*",
				permanent: true,
			},
			// mihai: this course no longer exists, redirected to events
			{
				source: "/courses/btc-on-tour-dallas-2022/:path*",
				// destination: "/courses/btc-on-tour-dallas-2023/:path*",
				destination: "/events/:path*",
				permanent: true,
			},
			// mihai: this course no longer exists, redirected to events
			{
				source:
					"/courses/btc-on-tour-dallas-2022\\?source_id=email\\?wtime\\?wtime%3D%7Bseek_to_second_number%7D\\?wtime%3D%7Bseek_to_second_number%7D/:path*",
				// destination: "/courses/btc-on-tour-dallas-2023/:path*",
				destination: "/events/:path*",
				permanent: true,
			},
			{
				source: "/courses/btc-on-tour-london/:path*",
				destination: "/:path*",
				permanent: true,
			},
			{
				source: "/courses/btc-on-tour-new-york-city/:path*",
				destination: "/:path*",
				permanent: true,
			},
			{
				source:
					"/courses/btc-on-tour-new-york-city\\?source_id=email\\?wtime\\?wtime%3D%7Bseek_to_second_number%7D\\?wtime\\?wtime\\?wtime%3D%7Bseek_to_second_number%7D\\?wtime%3D%7Bseek_to_second_number%7D\\?wtime%3D%7Bseek_to_second_number%7D/:path*",
				destination: "/:path*",
				permanent: true,
			},
			{
				source: "/courses/camouflageandbalayage-wet-balayage-root-melt/:path*",
				destination: "/:path*",
				permanent: true,
			},
			{
				source:
					"/courses/cassiskovic-watchmyhairbounce-blonding-customized-foil-balayage-application/:path*",
				destination: "/:path*",
				permanent: true,
			},
			{
				source: "/courses/ccs-2017-beachwaver/:path*",
				destination: "/:path*",
				permanent: true,
			},
			{
				source:
					"/courses/celebrity-color-with-justin-anderson-and-george-papanikolas/:path*",
				destination: "/:path*",
				permanent: true,
			},
			{
				source: "/courses/color-blocking-technique-by-caitlinfordhair/:path*",
				destination: "/:path*",
				permanent: true,
			},
			{
				source:
					"/courses/color-blocking-technique-by-caitlinfordhair\\?source_id=email\\?wtime\\?wtime%3D%7Bseek_to_second_number%7D\\?wtime\\?wtime\\?wtime\\?wtime%3D%7Bseek_to_second_number%7D\\?wtime\\?wtime\\?wtime\\?wtime%3D%7Bseek_to_second_number%7D\\?wtime\\?wtime%3D%7Bseek_to_second_number%7D\\?wtime%3D%7Bseek_to_second_number%7D\\?wtime\\?wtime\\?wtime\\?wtime%3D%7Bseek_to_second_number%7D/:path*",
				destination: "/:path*",
				permanent: true,
			},
			{
				source:
					"/courses/color-blocking-technique-by-caitlinfordhair\\?source_id=email\\?wtime\\?wtime%3D%7Bseek_to_second_number%7D\\?wtime\\?wtime\\?wtime\\?wtime%3D%7Bseek_to_second_number%7D\\?wtime\\?wtime\\?wtime\\?wtime%3D%7Bseek_to_second_number%7D\\?wtime\\?wtime%3D%7Bseek_to_second_number%7D\\?wtime%3D%7Bseek_to_second_number%7D\\?wtime\\?wtime\\?wtime\\?wtime%3D%7Bseek_to_second_number%7D&wtime=%7Bseek_to_second_number%7D/:path*",
				destination: "/:path*",
				permanent: true,
			},
			{
				source:
					"/courses/color-blocking-technique-by-caitlinfordhair\\?source_id=email\\?wtime%3D%7Bseek_to_second_number%7D\\?wtime%3D%7Bseek_to_second_number%7D\\?wtime%3D%7Bseek_to_second_number%7D\\?wtime\\?wtime%3D%7Bseek_to_second_number%7D\\?wtime\\?wtime\\?wtime\\?wtime%3D%7Bseek_to_second_number%7D\\?wtime%3D%7Bseek_to_second_number%7D\\?wtime%3D%7Bseek_to_second_number%7D/:path*",
				destination: "/:path*",
				permanent: true,
			},
			{
				source:
					"/courses/color-blocking-technique-by-caitlinfordhair\\?wtime=%7Bseek_to_second_number%7D/:path*",
				destination: "/:path*",
				permanent: true,
			},
			{
				source: "/courses/color-cut-style-2016-opening/:path*",
				destination: "/:path*",
				permanent: true,
			},
			{
				source:
					"/courses/danilobozic-cutting-to-enhance-balayage\\?source_id=email\\?wtime%3D%7Bseek_to_second_number%7D\\?wtime\\?wtime%3D%7Bseek_to_second_number%7D\\?wtime\\?wtime%3D%7Bseek_to_second_number%7D\\?wtime\\?wtime%3D%7Bseek_to_second_number%7D\\?wtime\\?wtime%3D%7Bseek_to_second_number%7D/:path*",
				destination: "/courses/cutting-to-enhance-color/:path*",
				permanent: true,
			},
			{
				source: "/courses/dimensional-copper-balayage-tutorial/:path*",
				destination: "/:path*",
				permanent: true,
			},
			{
				source:
					"/courses/free-certification-gkhair-keratin-smoothing-treatment/:path*",
				destination: "/:path*",
				permanent: true,
			},
			{
				source: "/courses/free-certification-hand-tied-weft-extensions/:path*",
				destination: "/:path*",
				permanent: true,
			},
			{
				source: "/courses/free-certification-mens-long-razor-haircut/:path*",
				destination: "/:path*",
				permanent: true,
			},
			{
				source:
					"/courses/free-certification-mens-razor-cut-on-long-hair/:path*",
				destination: "/:path*",
				permanent: true,
			},
			{
				source:
					"/courses/free-certification-schwarzkopf-professional-express-service-certification-10-minute-gray-coverage/:path*",
				destination: "/:path*",
				permanent: true,
			},
			{
				source:
					"/courses/free-certification-sew-in-weft-hair-extensions/:path*",
				destination: "/:path*",
				permanent: true,
			},
			{
				source: "/courses/free-checklist-opening-your-own-salon-suite/:path*",
				destination: "/:path*",
				permanent: true,
			},
			{
				source:
					"/courses/free-live-class-how-to-grow-your-salon-business-income/:path*",
				destination: "/",
				permanent: true,
			},
			{
				source: "/courses/free-live-class-paulwilsoncrew-mens-razor-cut/:path*",
				destination: "/:path*",
				permanent: true,
			},
			{
				source: "/courses/future-foundation-the-classic-bob-cut/:path*",
				destination:
					"/courses/toniguy-future-foundation-the-classic-bob-cut-2/:path*",
				permanent: true,
			},
			{
				source:
					"/courses/hairbychrissydanielle-the-blonde-roadmap-gray-coverage-melt-ribbon-balayage-in-one-service\\?source_id=email\\?wtime\\?wtime%3D%7Bseek_to_second_number%7D&wtime=%7Bseek_to_second_number%7D\\?wtime%3D%7Bseek_to_second_number%7D/:path*",
				destination: "/courses/gray-coverage-melt/:path*",
				permanent: true,
			},
			{
				source: "/courses/haircolorkilla-highlighting-curls-texture/:path*",
				destination: "/courses/highlighting-curly-hair/:path*",
				permanent: true,
			},
			{
				source: "/courses/hellobalayage/:path*",
				destination: "/:path*",
				permanent: true,
			},
			{
				source: "/courses/hotheads-hair-extensions-certification/:path*",
				destination: "/:path*",
				permanent: true,
			},
			{
				source: "/courses/how-to-/:path*",
				destination: "/:path*",
				permanent: true,
			},
			{
				source: "/courses/how-to-braided-bun-updo/:path*",
				destination: "/:path*",
				permanent: true,
			},
			{
				source: "/courses/how-to-double-waterfall-braid/:path*",
				destination: "/:path*",
				permanent: true,
			},
			{
				source: "/courses/how-to-fiery-red-cut-color-1/:path*",
				destination: "/:path*",
				permanent: true,
			},
			{
				source:
					"/courses/how-to-hybrid-hair-extensions-application-with-sew-in-and-tape-in-methods/:path*",
				destination: "/:path*",
				permanent: true,
			},
			{
				source: "/courses/how-to-long-layered-with-bangs/:path*",
				destination: "/:path*",
				permanent: true,
			},
			{
				source: "/courses/how-to-pastel-color-melt/:path*",
				destination: "/:path*",
				permanent: true,
			},
			{
				source:
					"/courses/how-to-use-olaplex-to-maintain-curly-blonde-hair/:path*",
				destination: "/:path*",
				permanent: true,
			},
			{
				source:
					"/courses/hybrid-toning\\?wtime=%7Bseek_to_second_number%7D/:path*",
				destination: "/courses/hybrid-toning-gray-coverage/:path*",
				permanent: true,
			},
			{
				source:
					"/courses/ig-virgins-how-to-build-your-business-on-instagram\\?source_id=email\\?wtime%3D%7Bseek_to_second_number%7D\\?wtime%3D%7Bseek_to_second_number%7D\\?wtime\\?wtime%3D%7Bseek_to_second_number%7D\\?wtime%3D%7Bseek_to_second_number%7D\\?wtime%3D%7Bseek_to_second_number%7D/:path*",
				destination:
					"/courses/instagram-virgins-build-your-business-online/:path*",
				permanent: true,
			},
			{
				source: "/courses/influentialdesigns-by-kenra-professional/:path*",
				destination: "/:path*",
				permanent: true,
			},
			{
				source:
					"/courses/instagram-photography-101-the-btc-show-online-2020/:path*",
				destination: "/:path*",
				permanent: true,
			},
			{
				source:
					"/courses/instagram-to-build-your-business-the-btc-show-online-2020/:path*",
				destination: "/:path*",
				permanent: true,
			},
			{
				source:
					"/courses/jack-winn-pro-president-huntley-tarrant-inflation-strategies-for-running-a-profitable-salon/:path*",
				destination: "/:path*",
				permanent: true,
			},
			{
				source:
					"/courses/jleighwebdoeshair-wet-balayage-root-smudge-techniques/:path*",
				destination: "/:path*",
				permanent: true,
			},
			{
				source:
					"/courses/karifuller-how-to-install-beaded-i-tip-hair-extensions/:path*",
				destination: "/:path*",
				permanent: true,
			},
			{
				source:
					"/courses/karifuller-how-to-install-fusion-hair-extensions/:path*",
				destination: "/:path*",
				permanent: true,
			},
			{
				source: "/courses/keratin-complex-express-blowout-certification/:path*",
				destination: "/",
				permanent: true,
			},
			{
				source:
					"/courses/keratin-complex-express-blowout-certification/1000/:path*",
				destination: "/",
				permanent: true,
			},
			{
				source:
					"/courses/keratin-complex-personalized-blowout-certification/:path*",
				destination: "/",
				permanent: true,
			},
			{
				source:
					"/courses/keratin-complex-personalized-blowout-certification\\?utm_content=bufferebaaa&utm_medium=social&utm_source=twitter.com&utm_campaign=buffer/:path*",
				destination: "/:path*",
				permanent: true,
			},
			{
				source: "/courses/layered-haircut-with-textured-fringe/:path*",
				destination: "/:path*",
				permanent: true,
			},
			{
				source:
					"/courses/lexicon-i-pop-cut\\?source_id=email\\?wtime%3D%7Bseek_to_second_number%7D\\?wtime%3D%7Bseek_to_second_number%7D/:path*",
				destination: "/courses/toniguy-lexicon-i-pop-cut-2/:path*",
				permanent: true,
			},
			{
				source: "/courses/lexicon-the-korbin-cut/:path*",
				destination: "/courses/toniguy-lexicon-the-korbin-cut-2/:path*",
				permanent: true,
			},
			{
				source: "/courses/loreal-the-hottest-celebrity-color-trends/:path*",
				destination: "/:path*",
				permanent: true,
			},
			{
				source: "/courses/modern-shag-haircut-with-philipdowning7/:path*",
				destination: "/:path*",
				permanent: true,
			},
			{
				source: "/courses/mustafas-hollywood-waves-vintage-updos/:path*",
				destination: "/:path*",
				permanent: true,
			},
			{
				source: "/courses/mustafas-signature-holllywood-waves/:path*",
				destination: "/:path*",
				permanent: true,
			},
			{
				source:
					"/courses/realericvaughn-combining-extension-methods-tape-ins-and-k-tips/:path*",
				destination: "/:path*",
				permanent: true,
			},
			{
				source: "/courses/rebecca-taylor-neon-pastels/:path*",
				destination: "/:path*",
				permanent: true,
			},
			{
				source: "/courses/reuzel-the-scumbag-barbers-of-rotterdam/:path*",
				destination: "/:path*",
				permanent: true,
			},
			{
				source: "/courses/rich-dimensional-brunette-tutorial/:path*",
				destination: "/:path*",
				permanent: true,
			},
			{
				source:
					"/courses/robert-cromeans-presentation-skills-master-class/:path*",
				destination: "/:path*",
				permanent: true,
			},
			{
				source:
					"/courses/salon-owners-managing-your-business-through-covid-19-the-btc-show-online-2020/:path*",
				destination: "/:path*",
				permanent: true,
			},
			{
				source:
					"/courses/seangodard-express-highlights-foil-placement-toning-techniques/:path*",
				destination: "/:path*",
				permanent: true,
			},
			{
				source:
					"/courses/shadow-root-retouch-with-metallic-blend-by-bescene/:path*",
				destination: "/:path*",
				permanent: true,
			},
			{
				source:
					"/courses/so-you-wanna-be-an-influencer-the-btc-show-online-2020/:path*",
				destination: "/",
				permanent: true,
			},
			{
				source: "/courses/stephanie-brinkerhoff-webinar-5-19-14/:path*",
				destination: "/:path*",
				permanent: true,
			},
			{
				source: "/courses/styling-shortcuts-for-quicker-updos/1000/:path*",
				destination: "/",
				permanent: true,
			},
			{
				source: "/courses/suite-success-test/:path*",
				destination: "/:path*",
				permanent: true,
			},
			{
				source: "/courses/the-btc-show-2019-3-days-of-education/:path*",
				destination: "/:path*",
				permanent: true,
			},
			{
				source: "/courses/the-btc-show-2021-3-days-of-education/:path*",
				destination: "/:path*",
				permanent: true,
			},
			{
				source: "/courses/the-btc-show-2022-3-days-of-education/:path*",
				destination: "/:path*",
				permanent: true,
			},
			{
				source: "/courses/the-tatami/:path*",
				destination: "/:path*",
				permanent: true,
			},
			{
				source: "/courses/tracey-hughes-graduation/:path*",
				destination: "/:path*",
				permanent: true,
			},
			{
				source:
					"/courses/watchmyhairbounce-corrective-blonding-for-any-texture\\?source_id=email\\?wtime\\?wtime%3D%7Bseek_to_second_number%7D\\?wtime%3D%7Bseek_to_second_number%7D\\?wtime\\?wtime\\?wtime\\?wtime%3D%7Bseek_to_second_number%7D\\?wtime%3D%7Bseek_to_second_number%7D/:path*",
				destination: "/courses/blonding-for-any-texture/:path*",
				permanent: true,
			},
			{
				source:
					"/courses/wella-presents-sessions-express-salon-services/:path*",
				destination: "/:path*",
				permanent: true,
			},
			{
				source:
					"/courses/wella-presents-sessions-summer-ready-cutting-color-techniques/:path*",
				destination: "/:path*",
				permanent: true,
			},
			{
				source: "/courses/what-now/:path*",
				destination: "/:path*",
				permanent: true,
			},
			{
				source:
					"/learn/course/blondme-certification-1/blondme-balayage-on-dark-hair/video/:path*",
				destination: "/:path*",
				permanent: true,
			},
			{
				source:
					"/learn/course/btc-live-airlights-blonding-technique-with-danilobozic/:path*",
				destination: "/:path*",
				permanent: true,
			},
			{
				source:
					"/learn/course/btc-live-business-making-it-against-the-odds/btc-live-business-making-it-against-the-odds",
				destination: "/courses/interview-with-virtue-labs-founder/",
				permanent: true,
			},
			{
				source:
					"/learn/course/btc-live-platinum-retouch-application/platinum-re-touch-application/live-class/:path*",
				destination: "/:path*",
				permanent: true,
			},
			{
				source:
					"/learn/course/btc-live-strandlights-technique-with-lizhaven/btc-live/lizhaven-strandlights-technique/:path*",
				destination: "/:path*",
				permanent: true,
			},
			{
				source:
					"/learn/course/haircolorkilla-the-versatile-textured-haircut-flat-twist-styling/haircolorkilla-how-to-cut-textured-hair-for-curly-or-straight-styles/haircolorkilla-how-to-cut-textured-hair-for-curly-or-straight-styles/:path*",
				destination: "/courses/the-versatile-textured-cut/:path*",
				permanent: true,
			},
			{
				source:
					"/learn/course/jacobhkhan-short-shag-haircut/jacobhkhan-shaggy-bob/jacobhkhan-shaggy-bob/:path*",
				destination: "/courses/how-to-shaggy-bob-haircut/:path*",
				permanent: true,
			},
			{
				source:
					"/learn/course/rooted-icy-blonde-balayage/btc-live/hellobalayage-rooted-icy-blonde-balayage/:path*",
				destination: "/courses/rooted-icy-blonde-balayage/:path*",
				permanent: true,
			},
			{
				source:
					"/learn/course/tigi-color-technique-soft-shading/section/lesson/:path*",
				destination: "/:path*",
				permanent: true,
			},
			{
				source:
					"/learn/course/wella-trend-reveal-dimensional-brunettes-curly-hair-techniques/free-dimensional-brunettes-curly-hair-techniques-from-wella-trend-reveal/free-dimensional-brunettes-curly-hair-techniques-from-wella-trend-reveal/:path*",
				destination: "/:path*",
				permanent: true,
			},
			{
				source: "/learn/forgot/:path*",
				destination: "/forgot-password/:path*",
				permanent: true,
			},
			{
				source: "/learn/knowledgeCenterJWT/:path*",
				destination: "/subscribe/:path*",
				permanent: true,
			},
			{
				source: "/pages/ayuda-en-espanol/:path*",
				destination: "/languages/:path*",
				permanent: true,
			},
			{
				source: "/pages/black-friday/:path*",
				destination: "/:path*",
				permanent: true,
			},
			// {
			//   source:
			//     "/pages/btc-events/:path*",
			//   destination: "/events",
			//   permanent: true,
			// },
			{
				source: "/pages/btc-events/1000/:path*",
				destination: "/events",
				permanent: true,
			},
			{
				source: "/pages/btc-shows-btc-on-tour/:path*",
				destination: "/events/:path*",
				permanent: true,
			},
			{
				source: "/pages/btc-u-membership-courses/:path*",
				destination: "/subscribe/:path*",
				permanent: true,
			},
			{
				source: "/pages/btcuniversity-home/1000/:path*",
				destination: "/subscribe",
				permanent: true,
			},
			{
				source: "/pages/collection-schorem-barbers/:path*",
				destination: "/subscribe/:path*",
				permanent: true,
			},
			{
				source: "/pages/collections-sassoon/:path*",
				destination:
					"/collections/schorem-clipper-cutting-classics-collection/:path*",
				permanent: true,
			},
			{
				source: "/pages/collections-toni-guy/:path*",
				destination: "/masterclasses/:path*",
				permanent: true,
			},
			{
				source: "/pages/discover/:path*",
				destination: "/masterclasses/:path*",
				permanent: true,
			},
			{
				source:
					"/pages/extensions\\?source_id=email\\?wtime\\?wtime\\?wtime%3D%7Bseek_to_second_number%7D/:path*",
				destination: "/subscribe/:path*",
				permanent: true,
			},
			{
				source: "/pages/free-certifications/:path*",
				destination: "/subscribe/:path*",
				permanent: true,
			},
			{
				source: "/pages/gift/:path*",
				destination: "/subscribe/:path*",
				permanent: true,
			},
			{
				source: "/pages/haircolor-reds-brunettes-1/:path*",
				destination: "/bulk-subscription/:path*",
				permanent: true,
			},
			//error
			// {
			//   source: "/pages/haircolor\\?source_id=:source_id&wtime=:seek_to_second_number*",
			//   destination: "/haircolor/:path*?source_id=:source_id&wtime=:wtime",
			//   permanent: true
			// },

			// mihai: below not needed since we already have pages/haircolor/:path TO DO remove superflous redirects like 10 or so below and others
			{
				source:
					"/pages/haircolor\\?source_id=email\\?wtime%3D%7Bseek_to_second_number%7D\\?wtime\\?wtime%3D%7Bseek_to_second_number%7D\\?wtime\\?wtime%3D%7Bseek_to_second_number%7D\\?wtime\\?wtime%3D%7Bseek_to_second_number%7D\\?wtime\\?wtime%3D%7Bseek_to_second_number%7D/:path*",
				destination: "/haircolor/:path*",
				permanent: true,
			},
			{
				source:
					"/pages/haircolor\\?source_id=email\\?wtime%3D%7Bseek_to_second_number%7D\\?wtime\\?wtime%3D%7Bseek_to_second_number%7D\\?wtime\\?wtime%3D%7Bseek_to_second_number%7D\\?wtime\\?wtime%3D%7Bseek_to_second_number%7D\\?wtime%3D%7Bseek_to_second_number%7D\\?wtime\\?wtime\\?wtime\\?wtime%3D%7Bseek_to_second_number%7D/:path*",
				destination: "/haircolor/:path*",
				permanent: true,
			},
			{
				source:
					"/pages/haircolor\\?source_id=email\\?wtime%3D%7Bseek_to_second_number%7D\\?wtime\\?wtime%3D%7Bseek_to_second_number%7D\\?wtime\\?wtime%3D%7Bseek_to_second_number%7D\\?wtime%3D%7Bseek_to_second_number%7D\\?wtime\\?wtime%3D%7Bseek_to_second_number%7D/:path*",
				destination: "/haircolor/:path*",
				permanent: true,
			},
			{
				source:
					"/pages/haircolor\\?source_id=email\\?wtime%3D%7Bseek_to_second_number%7D\\?wtime%3D%7Bseek_to_second_number%7D\\?wtime\\?wtime\\?wtime%3D%7Bseek_to_second_number%7D\\?wtime\\?wtime%3D%7Bseek_to_second_number%7D\\?wtime%3D%7Bseek_to_second_number%7D\\?wtime\\?wtime%3D%7Bseek_to_second_number%7D/:path*",
				destination: "/haircolor/:path*",
				permanent: true,
			},
			{
				source: "/pages/haircutting/:path*",
				destination: "/haircolor/:path*",
				permanent: true,
			},
			{
				source:
					"/pages/haircutting-1\\?labels=%5B%22Filter%22%5D&values=%5B%22Extensions%22%5D&source_id=email\\?wtime\\?wtime%3D%7Bseek_to_second_number%7D\\?wtime%3D%7Bseek_to_second_number%7D\\?wtime\\?wtime\\?wtime%3D%7Bseek_to_second_number%7D\\?wtime%3D%7Bseek_to_second_number%7D\\?wtime\\?wtime%3D%7Bseek_to_second_number%7D\\?wtime\\?wtime\\?wtime%3D%7Bseek_to_second_number%7D/:path*",
				destination: "/haircutting/:path*",
				permanent: true,
			},
			{
				source:
					"/pages/haircutting-1\\?source_id=email\\?wtime\\?wtime\\?wtime\\?wtime%3D%7Bseek_to_second_number%7D\\?wtime\\?wtime%3D%7Bseek_to_second_number%7D\\?wtime%3D%7Bseek_to_second_number%7D/:path*",
				destination: "/haircutting/:path*",
				permanent: true,
			},
			{
				source:
					"/pages/languages\\?utm_medium=btcusocial&utm_source=linktree&utm_campaign=learn in 6 languages/:path*",
				destination: "/languages/:path*",
				permanent: true,
			},
			{
				source:
					"/pages/mens-1\\?labels=%5B%22Mens%22%5D&values=%5B%22Fades%22%5D/:path*",
				destination: "/languages/:path*",
				permanent: true,
			},
			{
				source:
					"/pages/mens-1\\?labels=%5B%22Mens%22%5D&values=%5B%22SchoremCollection%22%5D/:path*",
				destination: "/mens/:path*",
				permanent: true,
			},
			{
				source:
					"/pages/social-climbing\\?source_id=email\\?wtime\\?wtime%3D%7Bseek_to_second_number%7D\\?wtime\\?wtime\\?wtime\\?wtime%3D%7Bseek_to_second_number%7D\\?wtime\\?wtime\\?wtime\\?wtime%3D%7Bseek_to_second_number%7D\\?wtime\\?wtime\\?wtime%3D%7Bseek_to_second_number%7D/:path*",
				destination: "/mens/:path*",
				permanent: true,
			},
			{
				source:
					"/pages/social-climbing\\?source_id=email\\?wtime%3D%7Bseek_to_second_number%7D\\?wtime%3D%7Bseek_to_second_number%7D\\?wtime\\?wtime%3D%7Bseek_to_second_number%7D\\?wtime%3D%7Bseek_to_second_number%7D\\?wtime%3D%7Bseek_to_second_number%7D\\?wtime\\?wtime%3D%7Bseek_to_second_number%7D/:path*",
				destination: "/collections/social-climbing/:path*",
				permanent: true,
			},
			{
				source:
					"/pages/styling-na4p\\?labels=%5B%22Filter%22%5D&values=%5B%22Braids%22%5D/:path*",
				destination: "/collections/social-climbing/:path*",
				permanent: true,
			},
			{
				source:
					"/pages/styling-na4p\\?labels=%5B%22Filter%22%5D&values=%5B%22SpecialOccasion%22%5D&source_id=email\\?wtime%3D%7Bseek_to_second_number%7D\\?wtime\\?wtime%3D%7Bseek_to_second_number%7D\\?wtime\\?wtime%3D%7Bseek_to_second_number%7D\\?wtime\\?wtime%3D%7Bseek_to_second_number%7D\\?wtime\\?wtime\\?wtime%3D%7Bseek_to_second_number%7D\\?wtime\\?wtime\\?wtime%3D%7Bseek_to_second_number%7D/:path*",
				destination: "/styling/:path*",
				permanent: true,
			},
			{
				source:
					"/pages/styling-na4p\\?sub1=btcu&sub2=general&source_id=google/:path*",
				destination: "/styling/:path*",
				permanent: true,
			},
			{
				source:
					"/pages/subscribe\\?utm_campaign=Hybrid_Toning_&utm_source=Overview_Tab&utm_medium=btcuniversity.com/:path*",
				destination: "/styling/:path*",
				permanent: true,
			},
			{
				source: "/pages/subscription-/:path*",
				destination: "/subscribe/:path*",
				permanent: true,
			},
			{
				source: "/pages/subscription-overall/:path*",
				destination: "/subscribe/:path*",
				permanent: true,
			},
			// mihai: not needed given the above
			// {
			//   source:
			//     // "/pages/subscription-overall\\?utm_source=BTCSite&utm_medium=mobile nav image links&utm_campaign=sub fifty coupon february&afmc=BTC-SITE/:path*",
			//     "/pages/subscription-overall/:path*",
			//   destination: "/subscribe/:path*",
			//   permanent: true,
			// },
			// {
			//   source:
			//     "/pages/subscription-overall\\?utm_source=btcusite&utm_medium=btcu half off sub slidein&utm_campaign=btcu half off sub slidein/:path*",
			//   destination: "/subscribe/:path*",
			//   permanent: true,
			// },
			{
				source: "/pages/subscription-overall/1000/:path*",
				destination: "/subscribe",
				permanent: true,
			},
			// {
			//   source:
			//     "/pages/texture/:path*",
			//   destination: "/texture",
			//   permanent: true,
			// },
			// {
			//   source:
			//     "/pages/texture\\?sub1=btcu&sub2=general&source_id=google/:path*",
			//   destination: "/texture/:path*",
			//   permanent: true,
			// },
			{
				source: "/pages/texture/1000/:path*",
				destination: "/texture",
				permanent: true,
			},
			{
				source: "/pages/thebtcteam/:path*",
				destination: "/courses/textured-a-line-bob/:path*",
				permanent: true,
			},
			{
				source: "/pages/thebtcteam\\?page=2/:path*",
				destination: "/subscribe/:path*",
				permanent: true,
			},
			{
				source: "/pages/thebtcteam\\?page=3/:path*",
				destination: "/subscribe/:path*",
				permanent: true,
			},
			{
				source:
					"/pages/upcoming-classes\\?source_id=email\\?wtime%3D%7Bseek_to_second_number%7D\\?wtime\\?wtime%3D%7Bseek_to_second_number%7D\\?wtime\\?wtime\\?wtime\\?wtime%3D%7Bseek_to_second_number%7D\\?wtime%3D%7Bseek_to_second_number%7D\\?wtime\\?wtime%3D%7Bseek_to_second_number%7D\\?wtime%3D%7Bseek_to_second_number%7D/:path*",
				destination: "/subscribe/:path*",
				permanent: true,
			},
			{
				source: "/pages/webinars/:path*",
				destination: "/subscribe/:path*",
				permanent: true,
			},
			{
				source:
					"/redeem\\?source_id=email\\?wtime%3D%7Bseek_to_second_number%7D\\?wtime\\?wtime%3D%7Bseek_to_second_number%7D\\?wtime\\?wtime%3D%7Bseek_to_second_number%7D\\?wtime\\?wtime%3D%7Bseek_to_second_number%7D\\?wtime\\?wtime\\?wtime%3D%7Bseek_to_second_number%7D\\?wtime\\?wtime\\?wtime%3D%7Bseek_to_second_number%7D/:path*",
				destination: "/subscribe/:path*",
				permanent: true,
			},
			{
				source:
					"/redeem\\?source_id=email\\?wtime%3D%7Bseek_to_second_number%7D\\?wtime%3D%7Bseek_to_second_number%7D\\?wtime\\?wtime\\?wtime%3D%7Bseek_to_second_number%7D\\?wtime\\?wtime%3D%7Bseek_to_second_number%7D\\?wtime%3D%7Bseek_to_second_number%7D/:path*",
				destination: "/subscribe/:path*",
				permanent: true,
			},
			{
				source:
					"/redeem\\?source_id=email\\?wtime%3D%7Bseek_to_second_number%7D\\?wtime%3D%7Bseek_to_second_number%7D\\?wtime\\?wtime\\?wtime%3D%7Bseek_to_second_number%7D\\?wtime%3D%7Bseek_to_second_number%7D\\?wtime\\?wtime\\?wtime\\?wtime%3D%7Bseek_to_second_number%7D\\?wtime\\?wtime\\?wtime\\?wtime%3D%7Bseek_to_second_number%7D/:path*",
				destination: "/subscribe/:path*",
				permanent: true,
			},
			{
				source:
					"/register\\?courseId=04288cbe-ac8a-4938-8554-4bb579c2c483&returnTo=/courses/on-trend-color-styling-techniques-for-every-client\\?source_id%3Demail%253Fwtime%253Fwtime%253D%257Bseek_to_second_number%257D%253Fwtime%253Fwtime%253Fwtime%253Fwtime%253D%257Bseek_to_second_number%257D%253Fwtime%253Fwtime%253Fwtime%253Fwtime%253D%257Bseek_to_second_number%257D%253Fwtime%253Fwtime%253D%257Bseek_to_second_number%257D/:path*",
				destination: "/subscribe/:path*",
				permanent: true,
			},
			{
				source:
					"/register\\?courseId=40d37013-8f37-4978-b250-a22172a32be2&returnTo=/courses/blonding-color-techniques-for-every-hair-type/:path*",
				destination: "/subscribe/:path*",
				permanent: true,
			},
			{
				source:
					"/register\\?courseId=4c958366-3485-4287-9af7-c1ece95f90e7&returnTo=/courses/mens-haircut-collection/:path*",
				destination: "/subscribe/:path*",
				permanent: true,
			},
			{
				source:
					"/register\\?courseId=5b52ddc4-7d9b-4330-9464-b78442ace05f&returnTo=/courses/oneshot-hair-awards-2017/:path*",
				destination: "/subscribe/:path*",
				permanent: true,
			},
			{
				source:
					"/register\\?courseId=9bfb830e-378f-4aed-acfa-7915216b30bb&returnTo=/courses/balayage-blonding-techniques/:path*",
				destination: "/subscribe/:path*",
				permanent: true,
			},
			{
				source:
					"/register\\?courseId=ec38754e-b769-43af-9154-ed751f689aad&returnTo=/courses/amyerrett-and-marybehindthechair-madison-reed-founder-amy-errett-interviewed-by-btc-founder-mary-rector\\?source_id%3Demail%253Fwtime%253Fwtime%253D%257Bseek_to_second_number%257D%253Fwtime%253D%257Bseek_to_second_number%257D\\?wtime%3D%7Bseek_to_second_number%7D/:path*",
				destination: "/subscribe/:path*",
				permanent: true,
			},
			{
				source:
					"/register\\?source_id=email\\?wtime%3D%7Bseek_to_second_number%7D\\?wtime\\?wtime%3D%7Bseek_to_second_number%7D\\?wtime\\?wtime%3D%7Bseek_to_second_number%7D\\?wtime\\?wtime%3D%7Bseek_to_second_number%7D\\?wtime\\?wtime\\?wtime\\?wtime%3D%7Bseek_to_second_number%7D/:path*",
				destination: "/subscribe/:path*",
				permanent: true,
			},
			{
				source: "/support/1000/:path*",
				destination: "/subscribe",
				permanent: true,
			},
			//error
			//Incorrect
			// {
			//   source: "/:path*",
			//   destination: "/support\\?q=getting-started/:path*",
			//   permanent: true,
			// },
			{
				source: "/courses/haircolorkilla-highlighting-curls-texture/:path*",
				destination: "/courses/highlighting-curly-hair/:path*",
				permanent: true,
			},
		];
	},
	// mihai added vercel cors settings may 8

	async headers() {
		return [
			{
				// Configure CORS headers for API routes
				source: "/api/:path*", // Match all API routes
				headers: [
					{ key: "Access-Control-Allow-Credentials", value: "true" },
					{ key: "Access-Control-Allow-Origin", value: "*" },
					{
						key: "Access-Control-Allow-Methods",
						value: "GET,OPTIONS,PATCH,DELETE,POST,PUT",
					},
					{
						key: "Access-Control-Allow-Headers",
						value:
							"X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version",
					},
				],
			},
		];
	},
};

module.exports = nextConfig;
