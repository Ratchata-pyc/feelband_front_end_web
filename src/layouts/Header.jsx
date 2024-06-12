import { Link, useNavigate, useLocation } from "react-router-dom";
import { FeelbandIcon } from "../icons";
import { useContext, useState } from "react";
import { AuthContext } from "../contexts/AuthContext";
import useAuth from "../hooks/useAuth";
import Modal from "../components/Modal";
import SearchForm from "../features/profile/components/SearchForm";

const getAccessToken = () => {
  return localStorage.getItem("ACCESS_TOKEN");
};

const checkIfAdmin = () => {
  const token = getAccessToken();
  if (!token) return false;

  try {
    const payload = JSON.parse(atob(token.split(".")[1]));
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
  const { authUser } = useAuth();
  const [isModalSearchOpen, setIsModalSearchOpen] = useState(false);

  const handleClickLogout = () => {
    logout();
    navigate("/login");
  };

  const hideSearchButton =
    location.pathname === "/register" || location.pathname === "/login";

  const toggleModalSearch = () => {
    setIsModalSearchOpen(!isModalSearchOpen);
  };

  const closeSearchModal = () => {
    setIsModalSearchOpen(false);
    // ถ้ามีการเปิด Modal อื่นๆ ที่อาจเป็นปัญหา ให้ปิดที่นี่ เช่น:
    // setIsReviewOpen(false);
  };

  return (
    <header className="flex bg-stone-500 justify-between items-center h-16 z-10">
      <div className="px-8">
        <Link to="/">
          <FeelbandIcon />
        </Link>
      </div>
      <div className="flex gap-4">
        {!hideSearchButton && (
          <button
            onClick={toggleModalSearch}
            className="text-white hover:bg-stone-600 py-2 px-4 rounded"
          >
            Search
          </button>
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
              to={`/profile/${authUser?.id}`}
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
      <Modal open={isModalSearchOpen} onClose={closeSearchModal}>
        <SearchForm onClose={closeSearchModal} />
      </Modal>
    </header>
  );
}
