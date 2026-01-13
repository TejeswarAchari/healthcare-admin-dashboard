/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  // 🚨 THIS LINE IS THE FIX 🚨
  // It tells Tailwind: "Don't use the OS settings. Only turn dark if I add the class."
 darkMode: 'selector',
  theme: {
    extend: {},
  },
  plugins: [],
}

