import defaultAvatar from "../../../assets/defaultProfile.png";
import useProfile from "../hooks/useProfile";
import AddLine from "./AddLine";
import banlogo from "../../../assets/Ban.png";

export default function ProfileInfo() {
  const { profileUser } = useProfile();

  if (!profileUser) {
    console.log("Profile user not found"); // Log when profileUser is not found
    return <h1>404!!! User was not found</h1>;
  }

  console.log("Profile User Data:", profileUser); // Log profileUser data

  return (
    <div className="relative flex justify-center items-center bg-white shadow-md mt-4 max-w-[1300px]">
      <div className="grid grid-cols-2">
        <div className="flex justify-end items-center">
          <div className="flex justify-center items-start overflow-hidden">
            <img
              className="flex w-[600px] h-[700px]"
              src={profileUser?.profileImage || defaultAvatar}
              alt="Profile"
            />
          </div>
        </div>
        <div className="flex">
          <div className="overflow-hidden pt-4">
            <div className="grid grid-cols-4 gap-4 py-4 px-8 w-full">
              <p>Name:</p>
              <p className="w-full whitespace-nowrap col-span-3">{`${profileUser?.firstName} ${profileUser?.lastName}`}</p>
              <p>Role:</p>
              <p className="w-full whitespace-nowrap col-span-3">
                {profileUser?.role?.role || "N/A"}
              </p>
              <p>Genre:</p>
              <p className="w-full whitespace-nowrap col-span-3">
                {profileUser?.genre?.genre || "N/A"}
              </p>
              <p>Province:</p>
              <p className="w-full whitespace-nowrap col-span-3">
                {profileUser?.province?.province || "N/A"}
              </p>
              <p>District:</p>
              <p className="w-full whitespace-nowrap col-span-3">
                {profileUser?.district?.district || "N/A"}
              </p>
              <p>Budget:</p>
              {profileUser?.budget ? (
                <p className="w-full whitespace-nowrap col-span-3">{`${profileUser.budget} Bath`}</p>
              ) : (
                <p>N/A</p>
              )}
            </div>
            <div className="py-4 px-8">
              <AddLine contact={profileUser?.contact || "N/A"} />
            </div>
            <div className="border-none py-4 px-8 mt-4 max-w-[600px]">
              <p>{profileUser?.description || ""}</p>
            </div>
          </div>
        </div>
      </div>
      {!profileUser.isActive && (
        // <div className="absolute top-0 left-0 w-full h-full flex justify-center items-center">
        //   <img src={banlogo} className="h-[200px] rotate-[-45deg]" />
        // </div>
        <div className="absolute h-[120px] flex justify-center items-center">
          <img src={banlogo} className="flex h-[700px]" />
        </div>
      )}
    </div>
  );
}
