import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        ink: "#1c1917",
        cocoa: "#6E2635",
        caramel: "#7A3040",
        leaf: "#2f5d45",
        gold: "#8d6a32",
        almond: "#7A3040",
        matte: {
          DEFAULT: "#6E2635",
          hover: "#5A1E2B",
          supporting: "#7A3040",
        },
        maroon: {
          DEFAULT: "#6E2635",
          light: "#7A3040",
          dark: "#5A1E2B",
        },
        mist: "#f6f3ee",
      },
      fontFamily: {
        serif: ["var(--font-serif)", "Georgia", "serif"],
        sans: ["var(--font-sans)", "system-ui", "sans-serif"],
        script: ["var(--font-script)", "cursive"],
      },
      boxShadow: {
        soft: "0 12px 40px -22px rgba(70, 46, 24, 0.28)",
        lift: "0 22px 50px -28px rgba(70, 46, 24, 0.35)",
      },
      keyframes: {
        rise: {
          from: { opacity: "0", transform: "translateY(14px)" },
          to: { opacity: "1", transform: "translateY(0)" },
        },
        floaty: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-10px)" },
        },
        pop: {
          "0%": { transform: "scale(1)" },
          "45%": { transform: "scale(1.28)" },
          "100%": { transform: "scale(1)" },
        },
        page: {
          from: { opacity: "0", transform: "translateY(8px)" },
          to: { opacity: "1", transform: "translateY(0)" },
        },
      },
      animation: {
        rise: "rise 0.7s ease both",
        floaty: "floaty 6s ease-in-out infinite",
        pop: "pop 0.35s ease",
        page: "page 0.45s ease",
      },
    },
  },
  plugins: [],
};

export default config;
