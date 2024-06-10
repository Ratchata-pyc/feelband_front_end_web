/* eslint-disable react/prop-types */
import defaultProfileImage from "../../../assets/defaultProfile.png";

export default function Musician({
  firstName,
  lastName,
  role,
  genre,
  provider,
  district,
  src = defaultProfileImage,
}) {
  return (
    <div className="relative flex flex-col border-4 border-stone-400 rounded-lg justify-between min-h-[430px] max-h-[430px] overflow-hidden">
      <div className="relative  h-full ">
        <img className="w-full h-full object-cover" src={src} alt="Profile" />
        <div
          className="absolute bottom-0 left-0 right-0 bg-white p-4 rounded-t-lg"
          style={{ bottom: "0px" }}
        >
          <p>{`${firstName} ${lastName}`}</p>
          <p>{`${role}, ${genre}`}</p>
          <p>{`${provider}, ${district}`}</p>
        </div>
      </div>
    </div>
  );
}
