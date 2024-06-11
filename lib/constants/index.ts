// prod_OmBRgjzjrDiaxm
// prod_OmBQxeeE6PaKpX
// prod_OmBK6mk6Epe825
export const annualSub = process.env.NODE_ENV === "development" ? "prod_OmBRgjzjrDiaxm" : "prod_GyDQICk7im7Cci"
export const biannual = process.env.NODE_ENV === "development" ? "prod_OmBQxeeE6PaKpX" : "prod_PPMu8oFt0ZACPk"
export const monthlySub = process.env.NODE_ENV === "development" ? "prod_OmBK6mk6Epe825" : "prod_GyDQX1Y2jQsyld"
// export const annualSub = process.env.NODE_ENV === "development" ? "prod_GyDQICk7im7Cci" : "prod_GyDQICk7im7Cci"
// export const biannual = process.env.NODE_ENV === "development" ? "prod_PPMu8oFt0ZACPk" : "prod_PPMu8oFt0ZACPk"
// export const monthlySub = process.env.NODE_ENV === "development" ? "prod_GyDQX1Y2jQsyld" : "prod_GyDQX1Y2jQsyld"
// Wordpress Subscriptions IdS
export const annualSubWP = 229344
export const biannualWP = 229343
export const monthlySubWP = 229342

// Coupons
export const annualSubCoupon = "NEWANNUAL"
export const AnnualDiscountAmount = 7000;
export const MonthlyDiscountAmount = 1496;


// Day is for testing
export const day = "prod_P6qOReifMY2i3a"
export const subscriptionIds = [annualSub, monthlySub, biannual]

// Bulk Subscription qty array
export const subscriptionQty = Array.from({ length: 20 }, (_, i) => String(i + 1))

// Bulk subscription discount in cents
export const BulkSubDiscounts: { [key: number]: number } = {
    1: 7000,
    2: 10100,
    3: 10600,
    4: 11000,
    5: 11600,
    6: 11900,
    7: 12100,
    8: 12400,
    9: 12500,
    10: 13100,
    11: 13300,
    12: 13400,
    13: 13600,
    14: 13700,
    15: 13900,
    16: 14000,
    17: 14200,
    18: 14300,
    19: 14500,
    20: 14600
};

// Cancelation reasons
export const cancelationReasons = [
    "I don't use BTC-U enough.",
    "I did not find the content valuable.",
    "The price is over my budget.",
    "I am frustrated using the site.",
    "I choose not to answer"
]

// Theme Color
export const themeColor = '#523D34'

// Auth
// Paths that can't be accessed if user didn't fill out the onboarding form
export const restrictedPathsOnboarding = ["/profile", "/checkout"];

// screen sizes
export const SMALL_SCREEN_BREAKPOINT = 768;

export const nav = [
    {
        slug: 'all-educators',
        name: 'Educators',

    },
    {
        name: 'Quick Tips',
        slug: 'tips',
    },
    {
        name: 'Downloadable Resources',
        slug: 'downloadables',
    },
    {
        name: 'Business',
        slug: 'business',
    },
    {
        slug: 'haircolor',
        name: 'Hair Color',
    },
    {
        slug: 'haircutting',
        name: 'Haircutting',
    },
    {
        slug: 'styling',
        name: 'Styling',
    },
    {
        name: 'Texture',
        slug: 'texture',
    },

    {
        name: "Men's",
        slug: 'mens',
    },
    {
        name: 'Hair Extensions',
        slug: 'hairextensions',
    },
    {
        name: 'BTC Events',
        slug: 'events',
    },
    {
        name: 'Collections',
        slug: 'masterclasses',
    },
    {
        name: 'Languages',
        slug: 'languages',
    },
    {
        name: 'Gift A Subscription',
        slug: 'bulk-subscription',
    },
]
