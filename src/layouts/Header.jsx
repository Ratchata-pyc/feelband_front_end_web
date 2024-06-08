import { Link, useNavigate, useLocation } from "react-router-dom";
import { FeelbandIcon } from "../icons";
import { useContext } from "react";
import { AuthContext } from "../contexts/AuthContext";

const getAccessToken = () => {
  return localStorage.getItem("ACCESS_TOKEN");
};

const checkIfAdmin = () => {
  const token = getAccessToken();
  if (!token) return false;

  try {
    const payload = JSON.parse(atob(token.split(".")[1]));
    console.log("Payload:", payload); // เพิ่มการแสดงผล payload
    return payload.isAdmin || false;
  } catch (error) {
    console.error("Invalid token format", error);
    return false;
  }
};

export default function Header() {
  const navigate = useNavigate();
  const location = useLocation();
  const { logout } = useContext(AuthContext);
  const accessToken = getAccessToken();
  const isAdmin = checkIfAdmin();

  // console.log("AccessToken:", accessToken); // เพิ่มการแสดงผล accessToken
  // console.log("IsAdmin:", isAdmin); // เพิ่มการแสดงผล isAdmin

  const handleClickLogout = () => {
    logout();
    navigate("/login");
  };

  const hideSearchButton =
    location.pathname === "/register" || location.pathname === "/login";

  return (
    <header className="flex bg-stone-500 justify-between items-center h-16">
      <div className="px-8">
        <Link to="/">
          <FeelbandIcon />
        </Link>
      </div>
      <div className="flex gap-4">
        {!hideSearchButton && (
          <Link
            to="/search"
            className="text-white hover:bg-stone-600 py-2 px-4 rounded"
          >
            Search
          </Link>
        )}
        {!accessToken && (
          <>
            <Link
              to="/register"
              className="text-white hover:bg-stone-600 py-2 px-4 rounded"
            >
              Register
            </Link>
            <Link
              to="/login"
              className="text-white hover:bg-stone-600 py-2 px-4 rounded mr-8"
            >
              Login
            </Link>
          </>
        )}
        {accessToken && !isAdmin && (
          <>
            <Link
              to="/profile"
              className="text-white hover:bg-stone-600 py-2 px-4 rounded"
            >
              Profile
            </Link>
            <button
              onClick={handleClickLogout}
              className="text-white hover:bg-stone-600 py-2 px-4 rounded mr-8"
            >
              Logout
            </button>
          </>
        )}
        {accessToken && isAdmin && (
          <>
            <Link
              to="/report"
              className="text-white hover:bg-stone-600 py-2 px-4 rounded"
            >
              Report
            </Link>
            <button
              onClick={handleClickLogout}
              className="text-white hover:bg-stone-600 py-2 px-4 rounded mr-8"
            >
              Logout
            </button>
          </>
        )}
      </div>
    </header>
  );
}
