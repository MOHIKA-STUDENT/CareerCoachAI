/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#0f172a",
        secondary: "#16213e",
        darkElem: "#1a1a2e",
        accent: "#0ea5e9",
        body: "#e6e6e6",
        error: "#ef4444",
        warning: "#eab308",
        success: "#22c55e",
      },
      animation: {
        fadeInUp: "fadeInUp 0.8s ease-out forwards",
        float: "float 3s ease-in-out infinite", // ✅ added float animation
      },
      keyframes: {
        fadeInUp: {
          "0%": { opacity: 0, transform: "translateY(20px)" },
          "100%": { opacity: 1, transform: "translateY(0)" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-15px)" },
        }, // ✅ added float keyframes
      },

      
      
    },
  },
  plugins: [],
};
