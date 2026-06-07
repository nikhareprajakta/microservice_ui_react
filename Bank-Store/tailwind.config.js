/** @type {import('tailwindcss').Config} */
export default {
    content: ["./src/**/*.{html,js,jsx,ts,tsx}"],
    theme: {
        extend: {
            colors:{
                'custom-gray':'#e5e7eb',
                'color-primary':' #5B21B6',
                'color-dark': '#4C1D95',
                'color-lighter':' #F5F3FF',
                'color-light':' #DDD6FE',
                'font-primary': 'Josefin Sans'
            }
        },
    },
    plugins: [],
}

