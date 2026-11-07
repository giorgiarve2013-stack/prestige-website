import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        graphite: {
          950: "#0b0d10",
          900: "#101317",
          800: "#171b20",
          700: "#1f242b",
          600: "#2a3038",
          500: "#3a424c",
        },
        silver: {
          100: "#f2f4f6",
          200: "#e1e5e9",
          300: "#c5cad1",
          400: "#9aa2ad",
          500: "#737c88",
        },
        accent: {
          DEFAULT: "#c8a96b",
          soft: "#e3cf9f",
        },
      },
      fontFamily: {
        sans: ["var(--font-sans)", "system-ui", "sans-serif"],
      },
      letterSpacing: {
        wideplus: "0.22em",
      },
      keyframes: {
        marquee: {
          from: { transform: "translateX(0)" },
          to: { transform: "translateX(-50%)" },
        },
        fadeUp: {
          from: { opacity: "0", transform: "translateY(18px)" },
          to: { opacity: "1", transform: "none" },
        },
        float: {
          "0%,100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-10px)" },
        },
      },
      animation: {
        marquee: "marquee 40s linear infinite",
        fadeUp: "fadeUp .7s cubic-bezier(.2,.7,.2,1) both",
        float: "float 7s ease-in-out infinite",
      },
    },
  },
  plugins: [],
};

export default config;
