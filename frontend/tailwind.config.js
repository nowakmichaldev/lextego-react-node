/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        fontFamily: {
            sans: ['"PressStart2P"', 'sans-serif'],
        },
        extend: {
            boxShadow: {
                'square': '6px 6px 0px -1px rgba(0,0,0,0.75)',
            }
        },
    },
    plugins: [],
}
