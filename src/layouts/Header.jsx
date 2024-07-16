import { Link, useNavigate, useLocation } from "react-router-dom";
import { FeelbandIcon } from "../icons";
import { useContext, useState, useRef, useEffect } from "react";
import { AuthContext } from "../contexts/AuthContext";
import useAuth from "../hooks/useAuth";
import Modal from "../components/Modal";
import SearchForm from "../features/profile/components/SearchForm";
import searchIcon from "../assets/search.svg";

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
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

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
  };

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setIsDropdownOpen(false);
    }
  };

  useEffect(() => {
    if (isDropdownOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isDropdownOpen]);

  return (
    <header className="flex flex-row bg-stone-500 justify-between items-center h-16 p-4 z-50 fixed top-0 left-0 w-full">
      <div className="px-4 sm:px-8">
        <Link to="/">
          <FeelbandIcon />
        </Link>
      </div>
      <div className="flex flex-row gap-4 items-center justify-center ml-auto">
        {!hideSearchButton && (
          <div>
            <button
              onClick={toggleModalSearch}
              className="text-white bg-stone-600 hover:bg-stone-800 py-2 px-4 rounded flex items-center gap-2"
            >
              <span>Search</span>
              <img src={searchIcon} alt="Search Icon" className="w-6 h-6" />
            </button>
          </div>
        )}
        <div className="relative sm:hidden" ref={dropdownRef}>
          <button
            onClick={toggleDropdown}
            className="text-white bg-stone-600 hover:bg-stone-800 py-2 px-4 rounded flex items-center gap-2"
          >
            <span>Menu</span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M5.293 9.293a1 1 0 011.414 0L10 12.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                clipRule="evenodd"
              />
            </svg>
          </button>
          {isDropdownOpen && (
            <div className="absolute right-0 mt-2 w-48 bg-white border border-stone-300 rounded shadow-lg z-20">
              {!accessToken ? (
                <>
                  <Link
                    to="/register"
                    className="block px-4 py-2 text-stone-700 hover:bg-stone-100 border-b border-stone-200"
                    onClick={() => setIsDropdownOpen(false)}
                  >
                    Register
                  </Link>
                  <Link
                    to="/login"
                    className="block px-4 py-2 text-stone-700 hover:bg-stone-100"
                    onClick={() => setIsDropdownOpen(false)}
                  >
                    Login
                  </Link>
                </>
              ) : (
                <>
                  <Link
                    to={`/profile/${authUser?.id}`}
                    className="block px-4 py-2 text-stone-700 hover:bg-stone-100 border-b border-stone-200"
                    onClick={() => setIsDropdownOpen(false)}
                  >
                    Profile
                  </Link>
                  {isAdmin && (
                    <Link
                      to="/report"
                      className="block px-4 py-2 text-stone-700 hover:bg-stone-100 border-b border-stone-200"
                      onClick={() => setIsDropdownOpen(false)}
                    >
                      Report
                    </Link>
                  )}
                  <button
                    onClick={() => {
                      handleClickLogout();
                      setIsDropdownOpen(false);
                    }}
                    className="block w-full text-left px-4 py-2 text-stone-700 hover:bg-stone-100"
                  >
                    Logout
                  </button>
                </>
              )}
            </div>
          )}
        </div>
        {accessToken && (
          <div className="hidden sm:flex">
            <Link
              to={`/profile/${authUser?.id}`}
              className="text-white hover:bg-stone-600 py-2 px-4 rounded"
            >
              Profile
            </Link>
            {isAdmin && (
              <Link
                to="/report"
                className="text-white hover:bg-stone-600 py-2 px-4 rounded"
              >
                Report
              </Link>
            )}
            <button
              onClick={handleClickLogout}
              className="text-white hover:bg-stone-600 py-2 px-4 rounded"
            >
              Logout
            </button>
          </div>
        )}
        {!accessToken && (
          <div className="hidden sm:flex">
            <Link
              to="/register"
              className="text-white hover:bg-stone-600 py-2 px-4 rounded"
            >
              Register
            </Link>
            <Link
              to="/login"
              className="text-white hover:bg-stone-600 py-2 px-4 rounded"
            >
              Login
            </Link>
          </div>
        )}
      </div>
      <Modal open={isModalSearchOpen} onClose={closeSearchModal}>
        <div className="relative ">
          <button
            onClick={closeSearchModal}
            className="absolute top-[-10px] right-0 m-2 text-red-500 hover:text-red-700"
          >
            X
          </button>
          <SearchForm onClose={closeSearchModal} />
        </div>
      </Modal>
    </header>
  );
}
