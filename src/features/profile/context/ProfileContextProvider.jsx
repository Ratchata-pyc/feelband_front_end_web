import { useState, useEffect, createContext } from "react";
import { useParams } from "react-router-dom";
import useAuth from "../../../hooks/useAuth";
import userApi from "../../../apis/user";

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
        // console.log(res);
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

  // console.log("ProfileContext value:", value); // Log the context value

  return (
    <ProfileContext.Provider value={value}>{children}</ProfileContext.Provider>
  );
}
