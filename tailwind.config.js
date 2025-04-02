
// tailwind.config.js
/** @type {import('tailwindcss').Config} */
module.exports = {
    darkMode: 'class',
    content: [
        "./resources/**/*.blade.php",
        "./resources/**/*.js",
        "./resources/**/*.jsx",
    ],
    theme: {
        extend: {
            colors: {
                dark: {
                    DEFAULT: '#121212',
                    paper: '#1E1E1E',
                    light: '#2D2D2D',
                    accent: '#2196F3',
                    primary: '#1115c1',
                    secondary: '#4F46E5',
                    success: '#03DAC6',
                    error: '#CF6679',
                    warning: '#FFAB00',
                    info: '#2196F3',
                },
            },
        },
    },
    plugins: [],
}
