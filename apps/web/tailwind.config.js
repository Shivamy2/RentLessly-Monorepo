/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        './src/pages/**/*.{js,jsx}',
        './src/components/**/*.{js,jsx}',
        './src/app/**/*.{js,jsx}',
    ],
    theme: {
        extend: {
            colors: {
                // Primary — deep teal-blue from logo icon
                primary: {
                    50: '#EBF5FB',
                    100: '#D6EAF8',
                    200: '#AED6F1',
                    300: '#7FB8E3',
                    400: '#3B82B8',
                    500: '#1A5276', // main brand blue
                    600: '#154360',
                    700: '#0D2F4B',
                    800: '#0A2239', // darkest logo shade
                    900: '#071826',
                },

                // Accent — orange dot from logo
                accent: {
                    50: '#FFF3E8',
                    100: '#FFE0C2',
                    200: '#FFBF80',
                    300: '#FF9E3D',
                    400: '#F57E1B',
                    500: '#E8641B', // main accent orange
                    600: '#C4520F',
                    700: '#9E3F0A',
                    800: '#7A3008',
                    900: '#5A2306',
                },

                // Neutral — clean grays for backgrounds, borders, text
                neutral: {
                    50: '#F8F9FA', // page background (like NoBroker light gray)
                    100: '#F1F3F5',
                    200: '#E9ECEF',
                    300: '#DEE2E6',
                    400: '#CED4DA',
                    500: '#ADB5BD',
                    600: '#6C757D',
                    700: '#495057',
                    800: '#343A40',
                    900: '#212529',
                },

                // Semantic colors
                success: '#16A34A',
                warning: '#EAB308',
                error: '#DC2626',
                info: '#0EA5E9',
            },

            fontFamily: {
                // Headings & UI — geometric, clean (NoBroker uses this)
                sans: [
                    'Poppins',
                    'sans-serif',
                ],
                // Body text — slightly more readable at small sizes
                body: [
                    'DM Sans',
                    'Poppins',
                    'sans-serif',
                ],
            },

            borderRadius: {
                none: '0',
                sm: '0',
                DEFAULT: '0',
                md: '0',
                lg: '0',
                xl: '0',
                '2xl': '0',
                '3xl': '0',
                full: '9999px', // Keep full for circular elements like avatars
            },

            boxShadow: {
                card: '0 1px 3px rgba(0,0,0,0.08), 0 1px 2px rgba(0,0,0,0.06)',
                'card-hover': '0 4px 12px rgba(0,0,0,0.10), 0 2px 4px rgba(0,0,0,0.06)',
                nav: '0 1px 4px rgba(0,0,0,0.06)',
            },
        },
    },
    plugins: [],
};