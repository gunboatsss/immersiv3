/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
        "./public/**/*.{html,js}",
        "./src/components/**/*.{js,ts,jsx,tsx}",
    ],
    safelist: [
        'flex',
        'justify-between',
        'items-center',
        'px-4',
        'py-2',
        'border',
        'rounded-md',
        'text-sm',
        'opacity-80',
        'text-4xl',
        'max-w-2xl',
    ],
    theme: {
        extend: {
            screens: {
                // Custom breakpoints for responsive design control
                'custom-md': '1025px', // Applies to viewports 1025px and wider
                'custom-xl': '1550px', // Applies to viewports 1550px and wider
            },
        },
    },
    plugins: [],
};