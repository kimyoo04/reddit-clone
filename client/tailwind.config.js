/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx}", "./pages/**/*.{js,ts,jsx,tsx}"],
  darkMode: "class", // next-themes 다크모드 설정
  theme: {
    extend: {
      colors: {
        main_color: "#2F80ED",
        light_gray_1: "#303030",
        light_gray_2: "#808080",
        light_gray_3: "#BDBDBD",
        light_gray_4: "#EEEEEE",
        light_bg_1: "#FBFBFB",
        light_font_1: "#101010",

        night_gray_1: "#EEEEEE",
        night_gray_2: "#BDBDBD",
        night_gray_3: "#808080",
        night_gray_4: "#303030",
        night_bg_1: "#101010",
        night_font_1: "#FBFBFB",

        alert_success: "#219653",
        alert_warning: "#F2C94C",
        alert_danger: "#EB5757",
        alert_info: "#2F80ED",
      },
    },
  },
  plugins: [],
};
