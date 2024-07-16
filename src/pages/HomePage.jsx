// /* eslint-disable no-unused-vars */
// import { useState, useCallback } from "react";
// import { useNavigate } from "react-router-dom";
// import GetAllUserProfile from "../features/profile/components/GetAllUserProfile";
// import Musician from "../components/MusicianCard";
// import defaultProfileImage from "../assets/defaultProfile.png";
// import welcome from "../assets/welcome.png";

// export default function Homepage() {
//   const [users, setUsers] = useState([]);
//   const [expandedGenres, setExpandedGenres] = useState({});
//   const navigate = useNavigate();

//   const handleDataFetched = useCallback((data) => {
//     setUsers(shuffleArray(data));
//   }, []);

//   const groupByGenre = (users) => {
//     const orderedGenres = [
//       "Pop",
//       "Rock",
//       "Jazz",
//       "Blues",
//       "Hip-Hop/Rap",
//       "Classical",
//       "Country",
//       "Reggae",
//       "R&B",
//       "Soul",
//       "Funk",
//       "Electronic",
//       "Dance",
//       "Metal",
//       "Punk",
//       "Disco",
//       "Folk",
//       "Latin",
//       "Reggaeton",
//       "Gospel",
//       "K-Pop",
//       "Alternative",
//       "Indie",
//       "Ska",
//     ];
//     const groupedUsers = users.reduce((groups, user) => {
//       const genre = user.genre ? user.genre.genre : "N/A";
//       if (!groups[genre]) {
//         groups[genre] = [];
//       }
//       groups[genre].push(user);
//       return groups;
//     }, {});
//     const sortedGroupedUsers = {};
//     orderedGenres.forEach((genre) => {
//       if (groupedUsers[genre]) {
//         sortedGroupedUsers[genre] = groupedUsers[genre];
//       }
//     });
//     return sortedGroupedUsers;
//   };

//   const shuffleArray = (array) => {
//     return array.sort(() => Math.random() - 0.5);
//   };

//   const formatBudget = (budget) => {
//     return new Intl.NumberFormat("en-US", { style: "decimal" }).format(budget);
//   };

//   const handleGenreClick = (genreId) => {
//     navigate(`/search?genreId=${genreId}`);
//   };

//   const groupedUsers = groupByGenre(users);

//   return (
//     <div className="w-full  bg-white">
//       <div className="block w-full h-[300px] sm:h-[500px] mb-4 sm:mb-8 bg-gradient-to-b from-stone-500 to-white mt-[60px]">
//         <img
//           src={welcome}
//           className="w-full h-full object-contain"
//           alt="Welcome"
//         />
//       </div>
//       <div className="shadow-md  mx-4 sm:mx-16 bg-white min-h-[800px] sm:min-h-[1024px] -mt-4 sm:-mt-8 pt-4 sm:pt-8">
//         <GetAllUserProfile onDataFetched={handleDataFetched} />
//         {Object.keys(groupedUsers).map((genre) => (
//           <div key={genre} className="mb-4 sm:mb-8">
//             <div className="flex justify-between items-center px-2 sm:px-4">
//               <h2
//                 className="text-lg sm:text-xl font-bold cursor-pointer hover:text-blue-500"
//                 onClick={() =>
//                   handleGenreClick(groupedUsers[genre][0].genre.id)
//                 }
//               >
//                 {genre}
//               </h2>
//             </div>
//             <div className="items-center xs:flex w-full justify-start">
//               <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-4 gap-2 sm:gap-4 pl-2 pr-2 sm:pl-4 sm:pr-4 pb-4 sm:pb-8 ">
//                 {groupedUsers[genre]
//                   .slice(0, expandedGenres[genre] ? undefined : 4)
//                   .map((user) => (
//                     <Musician
//                       key={user.id}
//                       userId={user.id}
//                       firstName={user.firstName}
//                       lastName={user.lastName}
//                       src={user.profileImage || defaultProfileImage}
//                       role={user.role ? user.role.role : "N/A"}
//                       genre={genre}
//                       provider={user.province ? user.province.province : "N/A"}
//                       district={user.district ? user.district.district : "N/A"}
//                       budget={user.budget ? formatBudget(user.budget) : "N/A"}
//                       isActive={user.isActive}
//                     />
//                   ))}
//               </div>
//             </div>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// }

/* eslint-disable no-unused-vars */
import { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import GetAllUserProfile from "../features/profile/components/GetAllUserProfile";
import Musician from "../components/MusicianCard";
import defaultProfileImage from "../assets/defaultProfile.png";
import welcome from "../assets/welcome.png";
import Skeleton from "react-loading-skeleton"; // เพิ่ม import สำหรับ Skeleton

export default function Homepage() {
  const [users, setUsers] = useState([]);
  const [expandedGenres, setExpandedGenres] = useState({});
  const [loading, setLoading] = useState(true); // State เพื่อติดตามสถานะการโหลดข้อมูล
  const navigate = useNavigate();

  useEffect(() => {
    setLoading(true); // เริ่มต้นโหลดข้อมูลใหม่เมื่อมีการเปลี่ยนแปลง
    fetchData(); // เรียกใช้ฟังก์ชัน fetchData เมื่อโหลดครั้งแรก

    // Mock function สำหรับดึงข้อมูล
    async function fetchData() {
      try {
        // ในที่นี้เรียกใช้ API หรือฟังก์ชันที่ดึงข้อมูล
        const data = await fetchYourData(); // เรียกใช้ API หรือข้อมูลที่ต้องการ
        setUsers(shuffleArray(data));
        setLoading(false); // ตั้งค่า loading เป็น false เมื่อโหลดเสร็จสมบูรณ์
      } catch (error) {
        console.error("Error fetching data:", error);
        setLoading(false); // ในกรณีที่เกิด error ก็ต้องหยุด loading ด้วย
      }
    }
  }, []); // ที่ [] เพื่อให้ useEffect ทำงานเฉพาะครั้งแรกเท่านั้น

  // ฟังก์ชันในการจัดกลุ่มผู้ใช้ตามแนวเพลง
  const groupByGenre = (users) => {
    const orderedGenres = [
      "Pop",
      "Rock",
      "Jazz",
      "Blues",
      "Hip-Hop/Rap",
      "Classical",
      "Country",
      "Reggae",
      "R&B",
      "Soul",
      "Funk",
      "Electronic",
      "Dance",
      "Metal",
      "Punk",
      "Disco",
      "Folk",
      "Latin",
      "Reggaeton",
      "Gospel",
      "K-Pop",
      "Alternative",
      "Indie",
      "Ska",
    ];

    const groupedUsers = users.reduce((groups, user) => {
      const genre = user.genre ? user.genre.genre : "N/A";
      if (!groups[genre]) {
        groups[genre] = [];
      }
      groups[genre].push(user);
      return groups;
    }, {});

    const sortedGroupedUsers = {};
    orderedGenres.forEach((genre) => {
      if (groupedUsers[genre]) {
        sortedGroupedUsers[genre] = groupedUsers[genre];
      }
    });

    return sortedGroupedUsers;
  };

  // ฟังก์ชันสำหรับสลับลำดับของ array
  const shuffleArray = (array) => {
    return array.sort(() => Math.random() - 0.5);
  };

  // ฟังก์ชันในการแสดงรูปแบบตัวเลขของงบประมาณ
  const formatBudget = (budget) => {
    return new Intl.NumberFormat("en-US", { style: "decimal" }).format(budget);
  };

  // ฟังก์ชันในการนำทางไปยังหน้าค้นหาจากแนวเพลง
  const handleGenreClick = (genreId) => {
    navigate(`/search?genreId=${genreId}`);
  };

  // ฟังก์ชัน callback สำหรับอัปเดตข้อมูลหลังจากการดึงข้อมูล
  const handleDataFetched = useCallback((data) => {
    setUsers(shuffleArray(data));
  }, []);

  // ฟังก์ชันในการจัดกลุ่มผู้ใช้ตามแนวเพลง
  const groupedUsers = groupByGenre(users);

  return (
    <div className={`w-full bg-white ${loading ? "loading" : ""}`}>
      <div className="block w-full h-[300px] sm:h-[500px] mb-4 sm:mb-8 bg-gradient-to-b from-stone-500 to-white mt-[60px]">
        <img
          src={welcome}
          className="w-full h-full object-contain"
          alt="Welcome"
        />
      </div>
      <div className="shadow-md mx-4 sm:mx-16 bg-white min-h-[800px] sm:min-h-[1024px] -mt-4 sm:-mt-8 pt-4 sm:pt-8">
        <GetAllUserProfile onDataFetched={handleDataFetched} />
        {Object.keys(groupedUsers).map((genre) => (
          <div key={genre} className="mb-4 sm:mb-8">
            <div className="flex justify-between items-center px-2 sm:px-4">
              <h2
                className="text-lg sm:text-xl font-bold cursor-pointer hover:text-blue-500"
                onClick={() =>
                  handleGenreClick(groupedUsers[genre][0].genre.id)
                }
              >
                {genre}
              </h2>
            </div>
            <div className="items-center xs:flex w-full justify-start">
              <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-4 gap-2 sm:gap-4 pl-2 pr-2 sm:pl-4 sm:pr-4 pb-4 sm:pb-8">
                {loading
                  ? Array.from({ length: 4 }).map((_, index) => (
                      <div key={index} className="skeleton-wrapper">
                        <Skeleton
                          width={200}
                          height={250}
                          style={{ margin: "10px" }}
                        />
                      </div>
                    ))
                  : groupedUsers[genre]
                      .slice(0, expandedGenres[genre] ? undefined : 4)
                      .map((user) => (
                        <Musician
                          key={user.id}
                          userId={user.id}
                          firstName={user.firstName}
                          lastName={user.lastName}
                          src={user.profileImage || defaultProfileImage}
                          role={user.role ? user.role.role : "N/A"}
                          genre={genre}
                          provider={
                            user.province ? user.province.province : "N/A"
                          }
                          district={
                            user.district ? user.district.district : "N/A"
                          }
                          budget={
                            user.budget ? formatBudget(user.budget) : "N/A"
                          }
                          isActive={user.isActive}
                        />
                      ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
