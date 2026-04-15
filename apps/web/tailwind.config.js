/**
 * Tailwind CSS Configuration
 * Used for styling component and layout
 */

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
                // Minimal design - mostly black, white, grays
                primary: '#000000',
                secondary: '#666666',
            },
            fontSize: {
                xs: ['12px', '16px'],
                sm: ['14px', '20px'],
                base: ['16px', '24px'],
                lg: ['18px', '28px'],
                xl: ['20px', '28px'],
                '2xl': ['24px', '32px'],
                '3xl': ['30px', '36px'],
            },
            spacing: {
                0: '0',
                1: '4px',
                2: '8px',
                3: '12px',
                4: '16px',
                6: '24px',
                8: '32px',
            },
        },
    },
    plugins: [],
};