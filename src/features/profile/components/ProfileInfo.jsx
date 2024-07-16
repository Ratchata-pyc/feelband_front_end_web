import defaultAvatar from "../../../assets/defaultProfile.png";
import useProfile from "../hooks/useProfile";
import AddLine from "./AddLine";
import banlogo from "../../../assets/Ban.png";

export default function ProfileInfo() {
  const { profileUser } = useProfile();

  if (!profileUser) {
    return <h1>404!!! User was not found</h1>;
  }

  const formatBudget = (budget) => {
    return new Intl.NumberFormat("en-US", { style: "decimal" }).format(budget);
  };

  return (
    <div className="relative flex justify-center items-center bg-white shadow-md mt-4 w-full p-2 sm:p-8 md:p-20 lg:p-20">
      <div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <div className="flex justify-center items-center relative">
            <div className="flex justify-center items-start w-full h-auto max-w-md overflow-hidden">
              <img
                className="w-full h-auto object-cover"
                src={profileUser?.profileImage || defaultAvatar}
                alt="Profile"
              />
              {!profileUser.isActive && (
                <div className="absolute inset-0 flex justify-center items-center pointer-events-none">
                  <img
                    src={banlogo}
                    className="rotate-[-45deg] w-1/2 h-1/2 object-contain sm:h-[400px]"
                    alt="Banned"
                  />
                </div>
              )}
            </div>
          </div>
          <div className="flex">
            <div className="overflow-hidden pt-4 w-full">
              <div className="grid gap-4 py-4 px-4 lg:px-8 w-full">
                <div className="flex items-center">
                  <p className="font-semibold mr-2">Name:</p>
                  <p className="w-full sm:w-auto">{`${profileUser?.firstName} ${profileUser?.lastName}`}</p>
                </div>
                <div className="flex items-center">
                  <p className="font-semibold mr-2">Role:</p>
                  <p className="w-full sm:w-auto">
                    {profileUser?.role?.role || "N/A"}
                  </p>
                </div>
                <div className="flex items-center">
                  <p className="font-semibold mr-2">Genre:</p>
                  <p className="w-full sm:w-auto">
                    {profileUser?.genre?.genre || "N/A"}
                  </p>
                </div>
                <div className="flex items-center">
                  <p className="font-semibold mr-2">Province:</p>
                  <p className="w-full sm:w-auto">
                    {profileUser?.province?.province || "N/A"}
                  </p>
                </div>
                <div className="flex items-center">
                  <p className="font-semibold mr-2">District:</p>
                  <p className="w-full sm:w-auto">
                    {profileUser?.district?.district || "N/A"}
                  </p>
                </div>
                <div className="flex items-center">
                  <p className="font-semibold mr-2">Budget:</p>
                  <p className="w-full sm:w-auto">
                    {profileUser?.budget
                      ? `${formatBudget(profileUser.budget)} Bath`
                      : "N/A"}
                  </p>
                </div>
              </div>
              <div className="py-4 px-4 lg:px-8">
                <AddLine contact={profileUser?.contact || "N/A"} />
              </div>
              <div className="border-none py-4 px-4 lg:px-8 mt-4 max-w-full lg:max-w-[600px]">
                <p>{profileUser?.description || ""}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
