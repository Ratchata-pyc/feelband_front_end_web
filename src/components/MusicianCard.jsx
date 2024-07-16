import { Link } from "react-router-dom";
import defaultProfileImage from "../assets/defaultProfile.png";
import banLogo from "../assets/Ban.png";

export default function Musician({
  userId, // เพิ่ม userId ใน props
  firstName,
  lastName,
  role,
  genre,
  provider,
  district,
  budget,
  isActive,
  src = defaultProfileImage,
}) {
  return (
    <Link
      to={`/profile/${userId}`}
      className="relative flex flex-col border-4 border-stone-400 rounded-lg justify-between min-h-[300px] max-h-[800px] overflow-hidden  xs:w-[300px] xs:h-[400px]  sm:w-[400px] sm:h-[530px]"
    >
      <div className="relative flex justify-center items-center h-full w-full bg-gray-200">
        <div className=" absolute top-0">
          <img
            className="max-w-full max-h-full object-cover"
            src={src}
            alt="Profile"
          />
        </div>

        <div className="absolute bottom-0 left-0 right-0 bg-stone-100 p-4 rounded-t-lg max-h-36 min-h-36">
          <p className="truncate">{`${firstName} ${lastName}`}</p>
          <p className="">{`${role}, ${genre}`}</p>
          <p className="truncate">{`${provider}, ${district}`}</p>
        </div>
        <div className="absolute bottom-2 right-4">
          <p>{`฿ ${budget} `}</p>
        </div>
      </div>

      {!isActive && (
        <div className="absolute inset-0 flex justify-center items-center bg-white bg-opacity-75">
          <img src={banLogo} className="h-1/2" alt="Banned" />
        </div>
      )}
    </Link>
  );
}
