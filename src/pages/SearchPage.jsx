import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";
import Musician from "../components/MusicianCard";
import defaultProfileImage from "../assets/defaultProfile.png";

export default function SearchPage() {
  const [users, setUsers] = useState([]);
  const [visibleUsers, setVisibleUsers] = useState(8); // จำนวนผู้ใช้ที่จะแสดงผลในครั้งแรก
  const location = useLocation();

  useEffect(() => {
    const fetchFilteredUsers = async () => {
      const searchParams = new URLSearchParams(location.search);
      const filters = Object.fromEntries(searchParams.entries());

      try {
        const response = await axios.get("/users/all");
        const allUsers = response.data;

        // กรองผู้ใช้ที่มีข้อมูลครบถ้วน
        const completeUsers = allUsers.filter(
          (user) =>
            user.id &&
            user.firstName &&
            user.lastName &&
            user.role &&
            user.genre &&
            user.province &&
            user.district &&
            user.budget
        );

        const isFilterApplied = Object.values(filters).some(
          (filter) => filter !== ""
        );

        const filteredUsers = isFilterApplied
          ? completeUsers.filter((user) => {
              return (
                (!filters.firstName ||
                  user.firstName
                    .toLowerCase()
                    .includes(filters.firstName.toLowerCase())) &&
                (!filters.lastName ||
                  user.lastName
                    .toLowerCase()
                    .includes(filters.lastName.toLowerCase())) &&
                (!filters.contact ||
                  (user.contact &&
                    user.contact
                      .toLowerCase()
                      .includes(filters.contact.toLowerCase()))) &&
                (!filters.budget ||
                  (user.budget &&
                    user.budget
                      .toLowerCase()
                      .includes(filters.budget.toLowerCase()))) &&
                (!filters.roleId ||
                  (user.role &&
                    filters.roleId
                      .split(",")
                      .includes(user.role.id.toString()))) &&
                (!filters.genreId ||
                  (user.genre &&
                    filters.genreId
                      .split(",")
                      .includes(user.genre.id.toString()))) &&
                (!filters.provinceId ||
                  (user.province &&
                    user.province.id.toString() === filters.provinceId)) &&
                (!filters.districtId ||
                  (user.district &&
                    user.district.id.toString() === filters.districtId))
              );
            })
          : completeUsers;

        setUsers(filteredUsers);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };

    fetchFilteredUsers();
  }, [location.search]);

  const formatBudget = (budget) => {
    return budget ? parseInt(budget).toLocaleString() : "N/A";
  };

  const loadMoreUsers = () => {
    setVisibleUsers((prevVisibleUsers) => prevVisibleUsers + 8);
  };

  return (
    <div className="shadow-md mx-16 bg-white min-h-[1024px]">
      <div className="py-8 px-4">
        <p>ผลการค้นหา</p>
        <p>พบนักดนตรี {users.length} คน</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 pl-4 pr-4 pb-8">
        {users.slice(0, visibleUsers).map((user, index) => (
          <Musician
            key={`${user.id}-${index}`}
            userId={user.id} // ส่ง userId เป็น prop
            firstName={user.firstName}
            lastName={user.lastName}
            src={user.profileImage || defaultProfileImage}
            role={user.role ? user.role.role : "N/A"}
            genre={user.genre ? user.genre.genre : "N/A"}
            provider={user.province ? user.province.province : "N/A"}
            district={user.district ? user.district.district : "N/A"}
            budget={formatBudget(user.budget)}
            isActive={user.isActive}
          />
        ))}
      </div>

      {visibleUsers < users.length && (
        <div className="text-center pb-8">
          <button
            onClick={loadMoreUsers}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          >
            แสดงผลเพิ่มเติม
          </button>
        </div>
      )}
    </div>
  );
}
