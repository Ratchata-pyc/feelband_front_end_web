/* eslint-disable no-undef */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      screens: {
        xxs: "380px",
        xs: "480px",
        sm: "900px",
        md: "1755px",
        pc: "1800px",
        // สามารถเพิ่ม screen sizes ตามที่คุณต้องการ
      },
    },
  },
  plugins: [require("@tailwindcss/aspect-ratio")],
};
