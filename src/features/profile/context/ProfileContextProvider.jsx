/* eslint-disable react/prop-types */
import { useState } from "react";
import { useEffect } from "react";
import { createContext } from "react";
import { useParams } from "react-router-dom";
import userApi from "../../../apis/user";
import useAuth from "../../../hooks/useAuth";

export const ProfileContext = createContext();

export default function ProfileContextProvider({ children }) {
  const [profileUser, setProfileUser] = useState(null);
  const { userId } = useParams();
  const { authUser } = useAuth();

  useEffect(() => {
    const fetchProfileUser = async () => {
      try {
        const res = await userApi.getProfileUser(userId);
        setProfileUser(res.data.user);
      } catch (err) {
        console.log(err);
      }
    };
    fetchProfileUser();
  }, [userId]);

  useEffect(() => {
    if (authUser?.id === +userId) {
      setProfileUser(authUser);
    }
  }, [authUser, userId]);

  const value = {
    profileUser,
  };

  return (
    <ProfileContext.Provider value={value}>{children}</ProfileContext.Provider>
  );
}
