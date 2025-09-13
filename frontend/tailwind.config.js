/** @type {import('tailwindcss').Config} */
module.exports = {
  // NOTE: Update this to include the paths to all files that contain Nativewind classes.
  content: ["./App.tsx", "./components/**/*.{js,jsx,ts,tsx}"
, "./app/**/*.{js,jsx,ts,tsx}"

  ],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
        primary: "#3E1E68",
        secondary: "#5D2F77",
        accent: "#E45A92",
        background: "#FFACAC",
        text: "#37353E",
      },
    },
  },
  plugins: [],
}