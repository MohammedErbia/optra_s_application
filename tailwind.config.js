/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class', // Enable class-based dark mode
  theme: {
    extend: {
      colors: {
        primary: {
          light: '#4f46e5',
          dark: '#6366f1',
        },
        background: {
          light: '#ffffff',
          dark: '#1a1a1a',
        },
        text: {
          light: '#1f2937',
          dark: '#f3f4f6',
        },
        secondary: {
          background: "var(--secondary-background)",
          foreground: "var(--secondary-foreground)",
          light: "var(--secondary-light)",
          dark: "var(--secondary-dark)",
        },
        accent: {
          DEFAULT: "var(--accent-color)",
          foreground: "var(--accent-foreground)",
          light: "var(--accent-light)",
          dark: "var(--accent-dark)",
        },
        border: {
          primary: "var(--border-primary)",
          secondary: "var(--border-secondary)",
          light: "var(--border-light)",
          dark: "var(--border-dark)",
        },
        optra: {
          green: "#11ecb5",
          darkGreen: "#319a7f",
          black: "#000000",
          darkGray: "#121212",
          lightGray: "#b0b0b0",
          white: "#ffffff",
          border: "#2c2c2c",
        }
      },
      fontFamily: {
        'cairo': ['Cairo', 'sans-serif'],
        'roboto': ['Roboto', 'sans-serif'],
        'orbitron': ['Orbitron', 'sans-serif'],
      },
    },
  },
  plugins: [require('@tailwindcss/typography')],
}