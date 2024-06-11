
/** @type {import('tailwindcss').Config} */
module.exports = {
  // to see how it looks without Hamzah's changes first
  darkMode: ["class"],
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{ts,tsx}",
  ],
  theme: {
   

    // to see how it looks without Hamzah's changes first
    // container: {
    // center: true,
    // padding: "2rem",
    // screens: {
    // "2xl": "1400px",
    // },
    // },
    extend: {
      lineHeight: {
        '150': "150%",
      },
      screens: {
        xs: "400px",
        sm: "500px",
        md: "640px",
        lg: "768px",
        lg2: "850px",
        xl: "1024px",
        "2xl": "1280px",
        "6xl": "1920px"
      },
      // Extend your theme here
      width: {
        'popover-content-width-same-as-its-trigger': 'var(--radix-popover-trigger-width)',
      },
      maxHeight: {
        'popover-content-width-same-as-its-trigger': 'var(--radix-popover-content-available-height)',
      },
      backgroundImage: {
        'hero-pattern': "url('/public/doodle.jpg')",
        'footer-texture': "url('/img/footer-texture.png')",
      },
       
      colors: {
        'color': '#523D34',
     
        
        themecolor: {
          '50': '#EBE9E2', // used for the light section background color
          '100': '#faf5ed', // Lightest shade
          '200': '#f0e2d1',
          '300': '#e8d2ba',
          '350': '#615855',
          '400': '#d6a889',
          '500': '#523D34', // Main Primary Color BROWN
          '600': '#b0694d',
          '700': '#945037',
          '800': '#753522',
          '900': '#592314',
          '950': '#381208' // Darkest shade
        },
        themeColor: '#523D34', // Main Primary Color BROWN-themecolor-500
        secondarythemecolor: '#A79A95', // light color
        border: '#A79A95',
        black: '#000000',
        blackV2: '#181818',
        // red: '#FF0000', 
        white: '#FFFFFF',
        inactivegrey: '#F5F5F5',
        grey: '#F5F5F5',
        lightgrey: '#7A828A',
        lightred: '#FEC0C0',
        offgreen: '#DEE4DC',
        bglight: '#F3EFED',
        bglightV2: '#F5F3F2',
        videogrey: '#333333',
        pressedGrey: '#D9D9D9',
        lightgreyV2: "#EBEBEB",
        'rich-black': 'var(--Rich-Black, #000)',
        blackV1: '#202020',
      },
     
      fontFamily: {
        'poppins': ['Poppins', 'sans'],
        sans: ['Roboto'],
        display: ['Playfair Display', 'Oswald'],
        heading: [''],
        cursive: ['Style Script', 'cursive'],
      },
      fontSize: {
        '98': '98px',
        '28': '1.75rem',
        '24': '1.5rem',
        '20': '1.25rem',
        '18': '1.125rem',
        '16': '1rem',
        '15': '0.9375rem',
        '14': '0.875rem',
        '12': '0.75rem',
        // to see how it looks without Hamzah's changes first
        42: "2.625rem", // 42px
        36: "2.25rem", // 36px
        32: "2rem", // 32px
        12: "0.75rem", // 12px
      },
      // to see how it looks without Hamzah's changes first

      keyframes: {
        "accordion-down": {
          from: { height: 0 },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: 0 },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
    },
  },
  // plugins: [
  //   // ...
  //   require('@tailwindcss/line-clamp'),
  // ],
  // Add the custom scrollbar plugin
  corePlugins: {
    scrollbar: false, // Disable the default scrollbar
  },
  plugins: [
    require('tailwind-scrollbar')({ nocompatible: true }),
    require("tailwindcss-animate"),
    require('tailwind-scrollbar-hide'),
    // Enable the custom scrollbar plugin
    // ...
  ],
  // to see how it looks without Hamzah's changes first
  // plugins: [require("tailwindcss-animate")],
};



