/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        bg: "#050608",
        card: "#0a0c10",
        cyan: "#00d4e8",
        blue: "#1a8fff",
        text: "#e8edf2",
        muted: "#7a8694",
        // Light hero surface — used only by the top-of-home Hero/Nav,
        // rest of the site stays on the dark `bg` system above.
        "bg-base": "#EDEEF5",
        ink: "#1a1a1a",
        "ink-muted": "#8e8e8e",
      },
      fontFamily: {
        sans: ["'DM Sans'", "system-ui", "sans-serif"],
        serif: ["'Montserrat'", "system-ui", "sans-serif"],
        display: ["'Space Grotesk'", "sans-serif"],
      },
    },
  },
  plugins: [],
}

