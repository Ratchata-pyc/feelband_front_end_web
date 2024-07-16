/* eslint-disable no-undef */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      screens: {
        xs: "480px",
        sm: "900px",
        md: "1755px",
        // สามารถเพิ่ม screen sizes ตามที่คุณต้องการ
      },
    },
  },
  plugins: [require("@tailwindcss/aspect-ratio")],
};
