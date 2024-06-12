import { Link } from "react-router-dom";
import defaultProfileImage from "../assets/defaultProfile.png";

export default function Musician({
  userId, // เพิ่ม userId ใน props
  firstName,
  lastName,
  role,
  genre,
  provider,
  district,
  budget,
  src = defaultProfileImage,
}) {
  return (
    <Link
      to={`/profile/${userId}`}
      className="relative flex flex-col border-4 border-stone-400 rounded-lg justify-between min-h-[430px] max-h-[430px] overflow-hidden"
    >
      <div className="relative h-full">
        <img className="w-full h-full object-cover" src={src} alt="Profile" />
        <div className="absolute -bottom-6 left-0 right-0 bg-white p-4 rounded-t-lg max-h-36 min-h-36">
          <p>{`${firstName} ${lastName}`}</p>
          <p>{`${role}, ${genre}`}</p>
          <p>{`${provider}, ${district}`}</p>
          <p>{`฿ ${budget} `}</p>
        </div>
      </div>
    </Link>
  );
}
