import { useState, useEffect, createContext } from "react";
import { useParams } from "react-router-dom";
import useAuth from "../../../hooks/useAuth";
import userApi from "../../../apis/user";

export const ProfileContext = createContext();

export default function ProfileContextProvider({ children }) {
  const [profileUser, setProfileUser] = useState(null);

  const { userId } = useParams();
  const { authUser } = useAuth();

  const fetchProfileUser = async () => {
    try {
      const res = await userApi.getProfileUser(userId);
      setProfileUser(res.data.user);
      // console.log(res);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchProfileUser();
  }, [userId]);

  useEffect(() => {
    if (authUser?.id === +userId) {
      setProfileUser(authUser);
    }
  }, [authUser, userId]);

  const value = {
    profileUser,
    fetchProfileUser, // เพิ่ม fetchProfileUser ใน context
  };

  // console.log("ProfileContext value:", value);

  return (
    <ProfileContext.Provider value={value}>{children}</ProfileContext.Provider>
  );
}
