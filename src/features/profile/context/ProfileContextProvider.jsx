import { useState, useEffect, createContext, startTransition } from "react";
import { useParams } from "react-router-dom";

import useAuth from "../../../hooks/useAuth";

export const ProfileContext = createContext();

export default function ProfileContextProvider({ children }) {
  const [profileUser, setProfileUser] = useState(null);

  const { userId } = useParams();
  const { authUser } = useAuth();

  useEffect(() => {
    if (authUser?.id === +userId) {
      startTransition(() => {
        setProfileUser(authUser);
      });
    }
  }, [authUser, userId]);

  const value = {
    profileUser,
  };

  return (
    <ProfileContext.Provider value={value}>{children}</ProfileContext.Provider>
  );
}
