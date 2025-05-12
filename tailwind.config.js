module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx,html,mdx}"],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        primary: {
          background: "var(--primary-background)",
          foreground: "var(--primary-foreground)",
          light: "var(--primary-light)",
          dark: "var(--primary-dark)",
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
      },
    },
  },
  plugins: [],
};