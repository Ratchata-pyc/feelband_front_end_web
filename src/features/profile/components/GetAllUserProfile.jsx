import { useEffect } from "react";
import axios from "axios";

export default function GetAllUserProfile({ onDataFetched }) {
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get("/users/all");
        const completeUsers = response.data.filter(
          (user) =>
            user.id &&
            user.firstName &&
            user.lastName &&
            user.role &&
            user.genre &&
            user.province &&
            user.district &&
            user.budget
          // user.profileImage
        );
        onDataFetched(completeUsers);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };

    fetchUsers(); // เรียกฟังก์ชัน fetchUsers เมื่อ component ถูก mount
  }, []); // dependencies array ว่างเปล่าหมายความว่าจะเรียกใช้เฉพาะเมื่อ component mount ครั้งแรก

  return null; // Component นี้ไม่จำเป็นต้อง render อะไร
}
