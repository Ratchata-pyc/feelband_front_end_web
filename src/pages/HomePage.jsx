import { useState } from "react";
import { useNavigate } from "react-router-dom";
import GetAllUserProfile from "../features/profile/components/GetAllUserProfile";
import Musician from "../components/MusicianCard";
import defaultProfileImage from "../assets/defaultProfile.png";

export default function Homepage() {
  const [users, setUsers] = useState([]); // สร้าง state เพื่อเก็บข้อมูลผู้ใช้
  const [expandedGenres, setExpandedGenres] = useState({}); // สร้าง state เพื่อจัดการการขยาย/ยุบของ genre
  const navigate = useNavigate();

  // ฟังก์ชันนี้จะถูกส่งไปให้ GetAllUserProfile และจะถูกเรียกเมื่อดึงข้อมูลผู้ใช้ได้สำเร็จ
  const handleDataFetched = (data) => {
    setUsers(shuffleArray(data)); // อัพเดต state ของผู้ใช้ด้วยข้อมูลที่ดึงมาได้และสุ่มเรียงลำดับ
  };

  // ฟังก์ชันจัดกลุ่มผู้ใช้ตาม genre (ถ้าต้องการ)
  const groupByGenre = (users) => {
    return users.reduce((groups, user) => {
      const genre = user.genre ? user.genre.genre : "N/A"; // ตรวจสอบว่าผู้ใช้มี genre หรือไม่ ถ้าไม่มีให้ตั้งค่าเป็น "N/A"
      if (!groups[genre]) {
        groups[genre] = []; // ถ้ายังไม่มี genre นี้ในกลุ่ม ให้สร้าง array ใหม่
      }
      groups[genre].push(user); // เพิ่มผู้ใช้ในกลุ่ม genre นั้นๆ
      return groups;
    }, {});
  };

  // ฟังก์ชันสุ่มเรียงลำดับผู้ใช้ในแต่ละ genre
  const shuffleArray = (array) => {
    return array.sort(() => Math.random() - 0.5);
  };

  const groupedUsers = groupByGenre(users); // จัดกลุ่มผู้ใช้ตาม genre

  // ฟังก์ชันจัดรูปแบบตัวเลขงบประมาณให้มีลูกน้ำ (comma)
  const formatBudget = (budget) => {
    return new Intl.NumberFormat("en-US", { style: "decimal" }).format(budget);
  };

  // ฟังก์ชันนำทางไปที่หน้า SearchPage พร้อมกับส่งพารามิเตอร์ genre
  const handleGenreClick = (genreId) => {
    navigate(`/search?genreId=${genreId}`);
  };

  return (
    <div className="shadow-md mx-16 bg-white min-h-[1024px]">
      <GetAllUserProfile onDataFetched={handleDataFetched} />{" "}
      {/* เรียก component GetAllUserProfile และส่งฟังก์ชัน handleDataFetched ไปด้วย */}
      <div className="py-8 px-4">
        <p>เราได้ค้นหาให้คุณแล้ว</p>
        <p>พบนักดนตรี {users.length} คน</p>
      </div>
      {Object.keys(groupedUsers).map((genre) => (
        <div key={genre} className="mb-8">
          <div className="flex justify-between items-center px-4">
            <h2
              className="text-xl font-bold cursor-pointer hover:text-blue-500"
              onClick={() => handleGenreClick(groupedUsers[genre][0].genre.id)}
            >
              {genre}
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 pl-4 pr-4 pb-8">
            {groupedUsers[genre]
              .slice(0, expandedGenres[genre] ? undefined : 4)
              .map((user) => (
                <Musician
                  key={user.id}
                  userId={user.id} // ส่ง userId เป็น prop
                  firstName={user.firstName}
                  lastName={user.lastName}
                  src={user.profileImage || defaultProfileImage}
                  role={user.role ? user.role.role : "N/A"}
                  genre={genre}
                  provider={user.province ? user.province.province : "N/A"}
                  district={user.district ? user.district.district : "N/A"}
                  budget={user.budget ? formatBudget(user.budget) : "N/A"}
                />
              ))}
          </div>
        </div>
      ))}
    </div>
  );
}
