import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        primary: "#e84e1b",
        'error-color': "#ff5c5c"
      },
      fontFamily: {
        sans: ['Montserrat', 'Roboto', 'Arial', 'Helvetica', 'sans-serif'],
        serif: ['"Darumadrop One"', 'serif'],
      },
    },
  },
  plugins: [
    require('daisyui'),
  ],
} satisfies Config;
