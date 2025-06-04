// tailwind.config.cjs
const { heroui } = require("@heroui/react");

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/contexts/**/*.{js,ts,jsx,tsx,mdx}",
    "./node_modules/@heroui/theme/dist/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        primary: {
          DEFAULT: "var(--bg-primary)",
          secondary: "var(--bg-secondary)",
          card: "var(--bg-card)",
          "card-hover": "var(--bg-card-hover)",
        },
        border: "var(--border-color)",
        text: {
          primary: "var(--text-primary)",
          secondary: "var(--text-secondary)",
          tertiary: "var(--text-tertiary)",
        },
        accent: {
          blue: "var(--accent-blue)",
          green: "var(--accent-green)",
          orange: "var(--accent-orange)",
          red: "var(--accent-red)",
          purple: "var(--accent-purple)",
        },
      },
      boxShadow: {
        DEFAULT: "var(--shadow)",
      },
      transitionProperty: {
        DEFAULT: "var(--transition)",
      },
      backgroundImage: {
        "gradient-blue": "var(--gradient-blue)",
        "gradient-green": "var(--gradient-green)",
        "gradient-orange": "var(--gradient-orange)",
      },
    },
  },
  darkMode: "class",
  plugins: [require("@heroui/react").heroui()],
}