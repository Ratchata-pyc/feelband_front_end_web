import { useState, useEffect, createContext } from "react";
import authApi from "../apis/auth";
import {
  getAccessToken,
  removeAccessToken,
  setAccessToken,
} from "../utils/local-storage";
import userApi from "../apis/user";

export const AuthContext = createContext();

export default function AuthContextProvider({ children }) {
  const [authUser, setAuthUser] = useState(null);
  const [isAuthUserLoading, setIsAuthUserLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        if (getAccessToken()) {
          const res = await authApi.getAuthUser();
          setAuthUser(res.data.user);
        }
      } catch (err) {
        console.log(err);
      } finally {
        setIsAuthUserLoading(false);
      }
    };

    fetchUser();
  }, []);

  const login = async (credentials) => {
    const res = await authApi.login(credentials);
    setAccessToken(res.data.accessToken);
    const resGetAuthUser = await authApi.getAuthUser();
    setAuthUser(resGetAuthUser.data.user);
  };

  const logout = () => {
    removeAccessToken();
    setAuthUser(null);
  };

  const updateAuthUser = async (formData) => {
    const res = await userApi.uploadUserImage(formData);
    setAuthUser((prev) => ({ ...prev, ...res.data }));
  };

  return (
    <AuthContext.Provider
      value={{ login, logout, authUser, isAuthUserLoading, updateAuthUser }}
    >
      {children}
    </AuthContext.Provider>
  );
}
