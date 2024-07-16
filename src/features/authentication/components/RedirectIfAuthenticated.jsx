import { Navigate } from "react-router-dom";

// ฟังก์ชันสำหรับดึงค่า token จาก localStorage
const getAccessToken = () => {
  return localStorage.getItem("ACCESS_TOKEN");
};

// Route สำหรับป้องกันไม่ให้เข้าถ้าหากมี Token
function RedirectIfAuthenticated({ children }) {
  const token = getAccessToken();

  return token ? <Navigate to="/" /> : children;
}

export default RedirectIfAuthenticated;
