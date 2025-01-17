/** @type {import('tailwindcss').Config} */
import daisyui from "daisyui";
export default {
  content: [
    "./src/**/*.{html,js,jsx,ts,tsx}", // Adjust based on your project structure
    "./public/index.html", // For simple projects
  ],
  theme: {
    extend: {},
  },
  plugins: [daisyui],
  daisyui: {
    themes: ["light", "dark", "cupcake", "retro"],
  },
};
