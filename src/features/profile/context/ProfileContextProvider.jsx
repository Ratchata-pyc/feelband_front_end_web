// /* eslint-disable react-hooks/exhaustive-deps */
// import { useState, useEffect, createContext } from "react";
// import { useParams } from "react-router-dom";
// import useAuth from "../../../hooks/useAuth";
// import userApi from "../../../apis/user";
// import axios from "axios";

// export const ProfileContext = createContext();

// export default function ProfileContextProvider({ children }) {
//   const [profileUser, setProfileUser] = useState(null);
//   const [reviews, setReviews] = useState([]);

//   const { userId } = useParams();
//   const { authUser } = useAuth();

//   const fetchProfileUser = async () => {
//     try {
//       const res = await userApi.getProfileUser(userId);
//       setProfileUser(res.data.user);
//     } catch (err) {
//       console.log(err);
//     }
//   };

//   const fetchReviews = async () => {
//     try {
//       const response = await axios.get(`/api/reviews/user/${userId}`);
//       setReviews(response.data);
//     } catch (error) {
//       console.error("Error fetching reviews:", error);
//     }
//   };

//   useEffect(() => {
//     fetchProfileUser();
//   }, [userId]);

//   useEffect(() => {
//     if (authUser?.id === +userId) {
//       setProfileUser(authUser);
//     }
//   }, [authUser, userId]);

//   useEffect(() => {
//     fetchReviews();
//   }, [userId]);

//   const value = {
//     profileUser,
//     fetchProfileUser,
//     reviews,
//     fetchReviews,
//   };

//   return (
//     <ProfileContext.Provider value={value}>{children}</ProfileContext.Provider>
//   );
// }

import { useState, useEffect, createContext } from "react";
import { useParams } from "react-router-dom";
import useAuth from "../../../hooks/useAuth";
import userApi from "../../../apis/user";
import axios from "axios";

export const ProfileContext = createContext();

export default function ProfileContextProvider({ children }) {
  const [profileUser, setProfileUser] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [reports, setReports] = useState([]); // เพิ่ม state สำหรับรายงาน

  const { userId } = useParams();
  const { authUser } = useAuth();

  const fetchProfileUser = async () => {
    try {
      const res = await userApi.getProfileUser(userId);
      setProfileUser(res.data.user);
    } catch (err) {
      console.log(err);
    }
  };

  const fetchReviews = async () => {
    try {
      const response = await axios.get(`/api/reviews/user/${userId}`);
      setReviews(response.data);
    } catch (error) {
      console.error("Error fetching reviews:", error);
    }
  };

  const fetchReports = async () => {
    try {
      const response = await axios.get(`/api/reports/user/${userId}`);
      setReports(response.data); // ตั้งค่า state ของรายงาน
    } catch (error) {
      console.error("Error fetching reports:", error);
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

  useEffect(() => {
    fetchReviews();
    fetchReports(); // เรียกใช้ fetchReports เมื่อ userId เปลี่ยน
  }, [userId]);

  const value = {
    profileUser,
    fetchProfileUser,
    reviews,
    fetchReviews,
    reports,
    fetchReports,
  };

  return (
    <ProfileContext.Provider value={value}>{children}</ProfileContext.Provider>
  );
}
