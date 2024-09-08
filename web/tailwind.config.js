/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'dark_theme-background': '#1a202c',
        'dark_theme-text': '#a0aec0',       
        'dark_theme-link': '#63b3ed',     
        'dark_theme-header': '#ffff', 
        "dark_theme-card":'#1f2937'    
  
      },
    },
  },
  plugins: [],
}
