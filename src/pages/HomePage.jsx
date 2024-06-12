/* eslint-disable no-unused-vars */
import { useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import GetAllUserProfile from "../features/profile/components/GetAllUserProfile";
import Musician from "../components/MusicianCard";
import defaultProfileImage from "../assets/defaultProfile.png";
import welcome from "../assets/welcome.png";

export default function Homepage() {
  const [users, setUsers] = useState([]);
  const [expandedGenres, setExpandedGenres] = useState({});
  const navigate = useNavigate();

  const handleDataFetched = useCallback((data) => {
    setUsers(shuffleArray(data));
  }, []);

  const groupByGenre = (users) => {
    const orderedGenres = ["Pop", "Rock", "Jazz", "Blues"];
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

  const shuffleArray = (array) => {
    return array.sort(() => Math.random() - 0.5);
  };

  const formatBudget = (budget) => {
    return new Intl.NumberFormat("en-US", { style: "decimal" }).format(budget);
  };

  const handleGenreClick = (genreId) => {
    navigate(`/search?genreId=${genreId}`);
  };

  const groupedUsers = groupByGenre(users);

  return (
    <>
      <div className="block w-full h-[500px] mb-8 bg-gradient-to-b from-stone-500 to-white">
        <img
          src={welcome}
          className="w-full h-full object-contain"
          alt="Welcome"
        />
      </div>
      <div className="shadow-md mx-16 bg-white min-h-[1024px] -mt-8 pt-8">
        <GetAllUserProfile onDataFetched={handleDataFetched} />
        {Object.keys(groupedUsers).map((genre) => (
          <div key={genre} className="mb-8">
            <div className="flex justify-between items-center px-4">
              <h2
                className="text-xl font-bold cursor-pointer hover:text-blue-500"
                onClick={() =>
                  handleGenreClick(groupedUsers[genre][0].genre.id)
                }
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
                    userId={user.id}
                    firstName={user.firstName}
                    lastName={user.lastName}
                    src={user.profileImage || defaultProfileImage}
                    role={user.role ? user.role.role : "N/A"}
                    genre={genre}
                    provider={user.province ? user.province.province : "N/A"}
                    district={user.district ? user.district.district : "N/A"}
                    budget={user.budget ? formatBudget(user.budget) : "N/A"}
                    isActive={user.isActive}
                  />
                ))}
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
