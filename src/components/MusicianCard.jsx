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
      className="relative flex flex-col border-4 border-stone-400 rounded-lg justify-between min-h-[650px] max-h-[650px] overflow-hidden"
    >
      <div className="relative h-full">
        <img className="w-full h-full object-cover" src={src} alt="Profile" />
        <div className="absolute -bottom-12 left-0 right-0 bg-stone-100 p-4 rounded-t-lg max-h-36 min-h-36">
          <p>{`${firstName} ${lastName}`}</p>
          <p>{`${role}, ${genre}`}</p>
          <p>{`${provider}, ${district}`}</p>
        </div>
        <div className=" absolute bottom-2 right-4">
          <p>{`฿ ${budget} `}</p>
        </div>
      </div>

      {!isActive && (
        <div className="absolute  flex justify-center items-center">
          <img src={banLogo} className="flex h-[600px]" />
        </div>
      )}
    </Link>
  );
}
